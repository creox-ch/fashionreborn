/* Frankenplatz marketing — COMBINED single-file build helper.
   Same visual effects as kit.js, but:
   - singletons (cursor glow, orb drift, magnetic buttons, active-menu scroll
     listener) are installed exactly once, using LIVE DOM queries so they keep
     working as the router swaps the page inside #root;
   - the per-page reveal / count-up / stagger effects are exposed as
     window.FPReArm(), which the router calls after each navigation so fresh
     page content animates in just like on the standalone pages.
   The original kit.js is left untouched and still used by the real pages. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Фоновые градиенты плавают сами (CSS в kit.css); огонёк за курсором убран. ── */

  /* ── Magnetic buttons — отключены по просьбе (дёрганье к курсору) ─────── */

  /* ── Active menu — scroll listener once, map rebuilt on navigation ───── */
  var menuMap = [];
  (function () {
    var ticking = false;
    function measure() {
      ticking = false;
      var mid = window.innerHeight * 0.42, best = null, bestD = Infinity;
      menuMap.forEach(function (m) {
        var r = m.sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var c = r.top + r.height / 2, d = Math.abs(c - mid);
        if (d < bestD) { bestD = d; best = m; }
      });
      menuMap.forEach(function (m) { m.a.classList.toggle("is-active", m === best); });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(measure); ticking = true; }
    }, { passive: true });
    window.__fpMenuMeasure = measure;
  })();
  function rebuildMenu() {
    menuMap = [];
    var links = Array.prototype.slice.call(document.querySelectorAll(".fp-top__nav .fp-top__link"));
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.charAt(0) === "#" && href.length > 1) {
        var sec = document.getElementById(href.slice(1));
        if (sec) menuMap.push({ a: a, sec: sec });
      }
    });
    if (window.__fpMenuMeasure) window.__fpMenuMeasure();
  }

  /* ── Re-armable per-page effects ─────────────────────────────────────── */
  function armReveal() {
    if (reduce) return;
    var roots = document.querySelectorAll(".kit > *:not(.fp-backdrop):not(.fp-glow):not(.fp-top):not(.hero)");
    if (!roots.length) return false;
    var targets = [];
    function prep(node, i) {
      if (node.classList.contains("fp-reveal")) return;
      node.classList.add("fp-reveal");
      node.style.animationDelay = Math.min(i, 6) * 70 + "ms";
      targets.push(node);
    }
    Array.prototype.forEach.call(roots, function (sec) {
      var inner = sec.querySelector(".inner");
      if (!inner) { prep(sec, 0); return; }
      var ti = 0;
      Array.prototype.forEach.call(inner.children, function (ch) {
        if (ch.matches && ch.matches(".grid, .statrow")) {
          Array.prototype.forEach.call(ch.children, function (c, i) { prep(c, i); });
        } else { prep(ch, ti++); }
      });
    });
    var io = ("IntersectionObserver" in window)
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add("fp-in"); io.unobserve(en.target); }
          });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
      : null;
    var vh = window.innerHeight || 800;
    targets.forEach(function (node) {
      if (node.getBoundingClientRect().top < vh * 0.95) node.classList.add("fp-in");
      else if (io) io.observe(node);
      else node.classList.add("fp-in");
    });
    setTimeout(function () {
      var vh2 = window.innerHeight || 800;
      targets.forEach(function (n) {
        if (n.getBoundingClientRect().top < vh2) n.classList.add("fp-in");
      });
    }, 2600);
    return true;
  }

  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([^\d]*)([\d\u00A0 ,\.]*\d)(.*)$/);
    if (!m) return;
    var prefix = m[1], numStr = m[2], suffix = m[3];
    var hasSep = /[\u00A0 ,]/.test(numStr);
    var target = parseInt(numStr.replace(/[^\d]/g, ""), 10);
    if (!isFinite(target) || target <= 0) return;
    var dur = target > 1000 ? 1300 : 1000, start = null;
    function fmt(n) { var s = String(n); if (hasSep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0"); return prefix + s + suffix; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) { el.textContent = fmt(Math.round(target * eased)); requestAnimationFrame(step); }
      else el.textContent = raw;
    }
    el.textContent = fmt(0); requestAnimationFrame(step);
  }
  function armCount() {
    if (reduce || !("IntersectionObserver" in window)) return true;
    var nums = document.querySelectorAll(".fp-stat__big:not([data-counted])");
    if (!nums.length) return false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.setAttribute("data-counted", "1"); countUp(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(nums, function (n) {
      if (n.getBoundingClientRect().top < (window.innerHeight || 800) * 0.85) { n.setAttribute("data-counted", "1"); countUp(n); }
      else io.observe(n);
    });
    return true;
  }
  function armStagger() {
    if (reduce || !("IntersectionObserver" in window)) return true;
    var groups = [];
    document.querySelectorAll(".rrm__frame:not([data-stagger])").forEach(function (f) { f.setAttribute("data-stagger", "1"); groups.push([f, ".rrm__pt", 90]); });
    document.querySelectorAll(".cmp__list:not([data-stagger]), .tl:not([data-stagger]), .risks:not([data-stagger])").forEach(function (g) {
      g.setAttribute("data-stagger", "1"); g.classList.add("fp-stagger"); groups.push([g, ":scope > *", 80]);
    });
    if (!groups.length) return true;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var g = en.target, sel = g.__sel, step = g.__step, kids = g.querySelectorAll(sel);
        Array.prototype.forEach.call(kids, function (k, i) { k.style.transitionDelay = (i * step) + "ms"; k.style.animationDelay = (i * step) + "ms"; });
        g.classList.add("fp-in"); io.unobserve(g);
      });
    }, { threshold: 0.25 });
    groups.forEach(function (t) { t[0].__sel = t[1]; t[0].__step = t[2]; io.observe(t[0]); });
    return true;
  }

  var focusIO = null;
  function armFocus() {
    if (!(window.matchMedia && window.matchMedia("(hover: none)").matches)) return true;
    if (!("IntersectionObserver" in window)) return true;
    if (!focusIO) {
      focusIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          en.target.classList.toggle("is-focus", en.isIntersecting);
        });
      }, { rootMargin: "-44% 0px -44% 0px", threshold: 0 });
    }
    var cards = document.querySelectorAll(".calc-card:not([data-focusob]), .sp-fmt__card:not([data-focusob])");
    Array.prototype.forEach.call(cards, function (c) {
      c.setAttribute("data-focusob", "1");
      focusIO.observe(c);
    });
    return true;
  }

  var pollIv = null;
  window.FPReArm = function () {
    rebuildMenu();
    if (window.__fpDriftUpdate) window.__fpDriftUpdate();
    if (pollIv) clearInterval(pollIv);
    var tries = 0;
    pollIv = setInterval(function () {
      tries++;
      var ok = armReveal();
      armCount(); armStagger(); armFocus();
      if (ok || tries > 40) { clearInterval(pollIv); pollIv = null; }
    }, 100);
  };
})();

/* Переключатель «Участникам | Спикерам» убран 29.07.2026 — в меню обычная
   ссылка «Спикерам» (site/nav.js). Чистим остатки, если старая сборка их создала. */
(function () {
  function clean() {
    document.querySelectorAll(".fp-seg").forEach(function (s) {
      var a = document.createElement("a");
      a.className = "fp-top__link";
      a.href = "/speakers";
      a.textContent = "Спикерам";
      s.replaceWith(a);
    });
  }
  setInterval(clean, 600); clean();
})();

/* ── 50/50 (день 1): скролл «разрезает» карточку ломаной линией ───────── */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  function update() {
    ticking = false;
    var card = document.querySelector(".fifty");
    if (!card) return;
    var vh = window.innerHeight;
    var r = card.getBoundingClientRect();
    var center = r.top + r.height / 2;
    // 0 — карточка по центру экрана, 1 — центр поднялся к верхней трети
    var p = (vh * 0.62 - center) / (vh * 0.42);
    p = Math.min(Math.max(p, 0), 1);
    card.style.setProperty("--split", p.toFixed(3));
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (document.querySelector(".fifty")) { update(); clearInterval(iv); }
    else if (tries > 50) clearInterval(iv);
  }, 150);
})();

/* ── Email-capture по "#reg": УДАЛЕНО намеренно ──────────────────────────
   Дизайн-выгрузка приносит здесь свою модалку fpRegModal («Узнай цены и
   программу первым»), которая перехватывает те же клики по a[href$="#reg"].
   Но #reg уже обрабатывает site/registration-form.js — полноценная форма
   ранней регистрации с галочкой согласия (GDPR/revDSG), honeypot/time-trap
   и отправкой лида в базу через /api/forms. Модалка отсюда была лишь
   фронт-заглушкой (localStorage, без согласия, без записи в базу) и давала
   ДВЕ модалки на один клик. Оставляем один рабочий обработчик.
   ⚠ При следующем синке дизайна этот блок вернётся из effects.js — удалить снова. */
