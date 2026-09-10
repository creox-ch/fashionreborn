/* Frankenplatz — покупка пакета бренд-маркета с brand-market.html.

   Добавляет кнопку «Выбрать» в карточки «.bm2-pack», чинит битую «выбрать пакет →»
   (вела на #apply — саму на себя) и открывает модалку выбора пакета:
   Онлайн 89 / Маркет 159 (первым 20 — 109) / Под ключ 249 → POST на общий приёмник
   платежей стенда (slswiss-tickets /api/market/create) → редирект на оплату Payrexx.

   Цену тут показываем ТОЛЬКО для UX — итог считает сервер по каталогу
   (lib/market-packages), клиентской цене он не верит; Early Bird «Маркет» сервер
   включает сам, пока продано меньше 20 EB-пакетов (на Payrexx видна реальная сумма).

   Самодостаточный модуль (свой CSS, не в разметке) — переживает синк дизайна.
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/market/create';

  // Пакеты для показа. price — обычная; eb — цена «первым N» (сервер решает, активна ли).
  var PACKS = [
    { key: 'online', name: 'Онлайн', sub: 'Витрина в каталоге · без офлайн-маркета', price: 89 },
    { key: 'market', name: 'Маркет · основной', sub: 'Каталог + два офлайн-маркета', price: 159, eb: 109, ebNote: 'первым 20' },
    { key: 'turnkey', name: 'Под ключ', sub: 'Отправь коробку — приём/фото/описания на нас', price: 249 },
  ];
  var BY_PRICE = { 89: 'online', 159: 'market', 249: 'turnkey' };
  function pack(key) { for (var i = 0; i < PACKS.length; i++) if (PACKS[i].key === key) return PACKS[i]; return null; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- CSS (самодостаточный, тёмная тема Frankenplatz с фоллбэками) ----------
  function injectCss() {
    if (document.getElementById('mk-css')) return;
    var css =
      '.mk-pick{display:inline-flex;align-items:center;gap:6px;margin-top:16px;padding:11px 20px;border:none;border-radius:999px;font:800 14px/1 inherit;color:#2A1A05;background:linear-gradient(100deg,#E6B450,#F5C969 60%,#D9A9FF 130%);cursor:pointer}' +
      '.mk-pick:hover{filter:brightness(1.05)}' +
      '.mk-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:40px 16px;background:rgba(13,7,21,.72);backdrop-filter:blur(6px)}' +
      '.mk-card{width:100%;max-width:460px;background:#140A1F;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:26px 24px;color:#F3EEF9;font-family:inherit;box-shadow:0 30px 80px rgba(0,0,0,.5)}' +
      '.mk-card h3{margin:0 0 4px;font-size:22px;font-weight:800}' +
      '.mk-card__sub{margin:0 0 18px;font-size:13.5px;color:#9A8BB3}' +
      '.mk-x{float:right;margin:-8px -6px 0 0;width:34px;height:34px;border:none;border-radius:50%;background:rgba(255,255,255,.07);color:#C3B7D4;font-size:20px;line-height:1;cursor:pointer}' +
      '.mk-opt{display:flex;align-items:center;gap:12px;padding:14px 15px;margin-bottom:10px;border:1px solid rgba(255,255,255,.14);border-radius:14px;cursor:pointer}' +
      '.mk-opt.is-on{border-color:#E6B450;background:rgba(230,180,80,.12)}' +
      '.mk-opt input{accent-color:#E6B450;width:18px;height:18px;margin:0;flex:0 0 auto}' +
      '.mk-opt__t{flex:1;min-width:0}' +
      '.mk-opt__n{font-weight:800;font-size:15px}' +
      '.mk-opt__s{display:block;font-weight:500;font-size:12px;color:#9A8BB3;margin-top:2px}' +
      '.mk-opt__p{font-weight:800;font-size:16px;white-space:nowrap;color:#F3EEF9}' +
      '.mk-opt__p s{display:block;font-weight:600;font-size:12px;color:#7A6C93}' +
      '.mk-opt__eb{display:block;font-weight:700;font-size:11px;color:#86E0B0}' +
      '.mk-field{width:100%;box-sizing:border-box;margin-top:10px;padding:13px 15px;border:1px solid rgba(255,255,255,.2);border-radius:12px;background:rgba(255,255,255,.06);color:#fff;font-size:16px;font-family:inherit}' +
      '.mk-field:focus{outline:none;border-color:#B98BFF}' +
      '.mk-consent{display:flex;gap:9px;align-items:flex-start;margin-top:14px;font-size:12.5px;line-height:1.5;color:#C3B7D4}' +
      '.mk-consent input{accent-color:#E6B450;width:16px;height:16px;margin-top:1px;flex:0 0 auto}' +
      '.mk-consent a{color:#B98BFF}' +
      '.mk-pay{width:100%;margin-top:16px;padding:14px;border:none;border-radius:999px;font:800 15px/1 inherit;color:#2A1A05;background:linear-gradient(100deg,#E6B450,#F5C969 60%,#D9A9FF 130%);cursor:pointer}' +
      '.mk-pay:disabled{opacity:.55;cursor:default}' +
      '.mk-note{margin:12px 2px 0;font-size:11.5px;line-height:1.5;color:#7A6C93}' +
      '.mk-msg{margin:12px 2px 0;font-size:13px;min-height:1em}' +
      '.mk-msg.err{color:#FF9B9B}' +
      '.mk-banner{margin:0 0 22px;padding:14px 18px;border-radius:14px;font-size:15px;font-weight:600;line-height:1.5}' +
      '.mk-banner--ok{background:rgba(134,224,176,.14);border:1px solid rgba(134,224,176,.4);color:#B8F0CE}' +
      '.mk-banner--warn{background:rgba(230,180,80,.12);border:1px solid rgba(230,180,80,.4);color:#F5D9A0}';
    var st = document.createElement('style');
    st.id = 'mk-css';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ---------- модалка ----------
  var overlay = null;
  function closeModal() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') closeModal(); }

  function priceHtml(p) {
    if (p.eb) {
      return '<span class="mk-opt__p">' + p.eb + ' CHF<s>' + p.price + ' CHF</s>' +
        '<span class="mk-opt__eb">' + esc(p.ebNote) + '</span></span>';
    }
    return '<span class="mk-opt__p">' + p.price + ' CHF</span>';
  }

  function openModal(preKey) {
    if (overlay) return;
    injectCss();

    var opts = PACKS.map(function (p) {
      return (
        '<label class="mk-opt" data-pack="' + p.key + '">' +
        '<input type="radio" name="mkpack" value="' + p.key + '"' + (p.key === preKey ? ' checked' : '') + '>' +
        '<span class="mk-opt__t"><span class="mk-opt__n">' + esc(p.name) + '</span>' +
        '<span class="mk-opt__s">' + esc(p.sub) + '</span></span>' +
        priceHtml(p) +
        '</label>'
      );
    }).join('');

    overlay = document.createElement('div');
    overlay.className = 'mk-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<div class="mk-card">' +
      '<button class="mk-x" type="button" aria-label="Закрыть">&times;</button>' +
      '<h3>Выбрать пакет</h3>' +
      '<p class="mk-card__sub">Бренд-маркет FASHION REBORN · Baden</p>' +
      '<div class="mk-opts">' + opts + '</div>' +
      '<input class="mk-field" type="email" name="mkemail" placeholder="E-mail — на него придёт подтверждение" autocomplete="email" required>' +
      '<input class="mk-field" type="text" name="mkname" placeholder="Имя (по желанию)" autocomplete="name">' +
      '<label class="mk-consent"><input type="checkbox" name="mkconsent"><span>Даю согласие на обработку данных для оформления. <a href="/legal#datenschutz">Политика конфиденциальности</a>.</span></label>' +
      '<button class="mk-pay" type="button" disabled>Выбери пакет</button>' +
      /* Дату открытия кабинета здесь не называем: обещанное «с 10.08» протухло и
         неделю висело на боевой странице. Вернуть конкретный срок можно, когда он
         будет решён — тогда же поправить письмо в slswiss-tickets (lib/forms.js). */
      '<p class="mk-note">Комиссия 12% берётся отдельно, только с реальных продаж. Ссылку на личный кабинет пришлём письмом. Точную сумму подтвердишь на странице оплаты.</p>' +
      '<p class="mk-msg" role="status" aria-live="polite"></p>' +
      '</div>';

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeModal(); });
    overlay.querySelector('.mk-x').addEventListener('click', closeModal);

    var card = overlay.querySelector('.mk-card');
    var payBtn = card.querySelector('.mk-pay');
    var msg = card.querySelector('.mk-msg');
    var emailInput = card.querySelector('input[name=mkemail]');
    var nameInput = card.querySelector('input[name=mkname]');
    var consentInput = card.querySelector('input[name=mkconsent]');

    function selectedPack() {
      var r = card.querySelector('input[name=mkpack]:checked');
      return r ? r.value : null;
    }
    function refresh() {
      var key = selectedPack();
      card.querySelectorAll('.mk-opt').forEach(function (o) {
        o.classList.toggle('is-on', o.getAttribute('data-pack') === key);
      });
      if (!key) { payBtn.disabled = true; payBtn.textContent = 'Выбери пакет'; return; }
      var p = pack(key);
      var price = p.eb ? p.eb : p.price;
      payBtn.disabled = false;
      payBtn.textContent = 'Оплатить ' + price + ' CHF →';
    }
    card.querySelectorAll('input[name=mkpack]').forEach(function (r) { r.addEventListener('change', refresh); });

    function setMsg(t, kind) { msg.textContent = t || ''; msg.className = 'mk-msg' + (kind ? ' ' + kind : ''); }

    payBtn.addEventListener('click', function () {
      setMsg('');
      var key = selectedPack();
      if (!key) { setMsg('Выбери пакет.', 'err'); return; }
      var email = (emailInput.value || '').trim();
      if (email.indexOf('@') < 1) { setMsg('Проверь e-mail — на него придёт подтверждение.', 'err'); emailInput.focus(); return; }
      if (!consentInput.checked) { setMsg('Нужно согласие на обработку данных.', 'err'); return; }

      payBtn.disabled = true;
      payBtn.textContent = 'Открываю оплату…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: key, email: email, name: (nameInput.value || '').trim() }),
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, data: d }; }); })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok && res.data.payUrl) {
            if (window.FPConsent) window.FPConsent.track('market_checkout', { form_key: 'market', package: key });
            window.location.href = res.data.payUrl;
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось открыть оплату. Попробуй ещё раз.', 'err');
            refresh();
          }
        })
        .catch(function () { setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err'); refresh(); });
    });

    refresh();
    setTimeout(function () {
      var f = card.querySelector('input[name=mkpack]:checked') ? emailInput : card.querySelector('input[name=mkpack]');
      if (f) f.focus();
    }, 60);
  }

  // ---------- баннер после возврата с оплаты ----------
  function statusBanner() {
    var m = (location.search.match(/[?&]status=(paid|failed|cancelled)/) || [])[1];
    if (!m) return;
    var text = {
      paid: '✅ Оплата пакета прошла! Подтверждение отправили на почту. Ссылку на личный кабинет пришлём письмом.',
      failed: 'Оплата не прошла. Попробуй ещё раз или напиши info@frankenplatz.ch.',
      cancelled: 'Оплата отменена — пакет можно оформить в любой момент.',
    }[m];
    /* Итог оплаты пакета — см. пояснение в tickets-buy.js: событие занижает
       продажи (кто не вернулся с банка, не считается), точное число — в БД. */
    if (window.FPConsent && window.FPConsent.track) {
      window.FPConsent.track('market_' + m, { form_key: 'market', product: 'brand-market' });
    }
    var host = document.querySelector('.hero .inner') || document.querySelector('.inner') || document.body;
    var b = document.createElement('div');
    b.className = 'mk-banner mk-banner--' + (m === 'paid' ? 'ok' : 'warn');
    b.textContent = text;
    host.insertBefore(b, host.firstChild);
    if (window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.hash);
    }
  }

  // ---------- подключение к странице ----------
  function packKeyOfCard(card) {
    var priceEl = card.querySelector('.bm2-pack__p, .bm2-num');
    if (priceEl) {
      var n = parseInt((priceEl.textContent || '').replace(/[^0-9]/g, ''), 10);
      if (BY_PRICE[n]) return BY_PRICE[n];
    }
    return null; // без явной цены — общий выбор в модалке
  }

  function enhanceCards() {
    var cards = document.querySelectorAll('.bm2-pack');
    cards.forEach(function (c, i) {
      if (c.querySelector('.mk-pick')) return;
      var key = packKeyOfCard(c) || PACKS[i] && PACKS[i].key;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mk-pick';
      btn.setAttribute('data-pack', key || '');
      btn.textContent = 'Выбрать этот пакет →';
      c.appendChild(btn);
    });
  }

  function start() {
    injectCss();
    enhanceCards();
    statusBanner();
    document.addEventListener('click', function (e) {
      var pick = e.target.closest && e.target.closest('.mk-pick');
      if (pick) { e.preventDefault(); openModal(pick.getAttribute('data-pack') || null); return; }
      // чиним битую «Я в деле — выбрать пакет →» (href=#apply, вела сама на себя)
      var a = e.target.closest && e.target.closest('a[href="#apply"]');
      if (a && /выбрать пакет/i.test(a.textContent || '')) { e.preventDefault(); openModal(null); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
