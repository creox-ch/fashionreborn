/* Монета-интро: один раз в сутки, ~1.6с. Одна картинка на все устройства, пропуск тапом или Esc. */
(function () {
  var KEY = 'fp_coin_intro_day';
  var base = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^/]*$/, '') : 'site/';
  })();
  var src = base + 'coin.webp';
  var css, el, timer, fired = false, done = false;

  function today() { return new Date().toISOString().slice(0, 10); }
  function seen() { try { return localStorage.getItem(KEY) === today(); } catch (e) { return true; } }
  function mark() { try { localStorage.setItem(KEY, today()); } catch (e) {} }

  var conn = navigator.connection;
  var blocked = seen()
    || matchMedia('(prefers-reduced-motion: reduce)').matches
    || !!(conn && (conn.saveData || /^(slow-)?2g$/.test(conn.effectiveType || '')));

  function styles() {
    return [
      '#fp-coin{position:fixed;inset:0;z-index:99999;background:radial-gradient(120% 90% at 50% 45%,#241138 0%,#140A1F 70%);display:grid;place-items:center;perspective:1200px;animation:fpCoinOut .34s cubic-bezier(.4,0,.2,1) 1.5s forwards}',
      '#fp-coin .fp-stage{width:min(50vmin,260px);aspect-ratio:1;position:relative;transform-style:preserve-3d;will-change:transform;animation:fpCoinJump 1.5s cubic-bezier(.22,.68,.32,1) both,fpCoinSpin 1.5s cubic-bezier(.15,.75,.2,1) both,fpCoinPop .34s cubic-bezier(.4,0,.2,1) 1.5s forwards}',
      '#fp-coin .fp-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:50%;background:url("' + src + '") center/contain no-repeat}',
      '#fp-coin .fp-back{transform:rotateY(180deg) scaleX(-1)}',
      '#fp-coin .fp-glow{position:absolute;inset:-45%;border-radius:50%;background:radial-gradient(circle,rgba(230,180,80,.34) 0%,rgba(230,180,80,0) 62%);animation:fpCoinGlow .9s ease-out .2s both;pointer-events:none}',
      '@keyframes fpCoinJump{0%{opacity:0;transform:translate3d(0,105svh,0) scale(.4)}42%{opacity:1;transform:translate3d(0,-9%,0) scale(1.06)}62%{transform:translate3d(0,2%,0) scale(.98)}80%{transform:translate3d(0,-2%,0) scale(1.01)}100%{opacity:1;transform:translate3d(0,0,0) scale(1)}}',
      '@keyframes fpCoinSpin{from{rotate:y 0deg}to{rotate:y 720deg}}',
      '@keyframes fpCoinGlow{0%{opacity:0;transform:scale(.5)}45%{opacity:1}100%{opacity:.35;transform:scale(1)}}',
      '@keyframes fpCoinPop{to{transform:scale(1.3);opacity:0}}',
      '@keyframes fpCoinOut{to{opacity:0;visibility:hidden}}',
      '@media (min-width:561px){#fp-coin .fp-face{filter:drop-shadow(0 18px 44px rgba(230,180,80,.34))}',
      '#fp-coin .fp-shine{position:absolute;inset:0;border-radius:50%;overflow:hidden;transform:translateZ(1px);mix-blend-mode:screen;pointer-events:none}',
      '#fp-coin .fp-shine::after{content:"";position:absolute;top:-60%;left:-120%;width:60%;height:220%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);transform:rotate(18deg);animation:fpCoinShine 1.1s cubic-bezier(.3,0,.2,1) .12s 1}',
      '@keyframes fpCoinShine{0%{left:-120%}55%,100%{left:160%}}}'
    ].join('');
  }

  function end() {
    if (done) return; done = true;
    clearTimeout(timer);
    if (el) { el.remove(); el = null; }
    if (css) { css.remove(); css = null; }
    removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') end(); }

  function play() {
    mark();
    done = false;
    css = document.createElement('style'); css.textContent = styles();
    document.head.appendChild(css);
    el = document.createElement('div');
    el.id = 'fp-coin';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="fp-stage"><div class="fp-glow"></div><div class="fp-face"></div><div class="fp-face fp-back"></div><div class="fp-shine"></div></div>';
    el.addEventListener('pointerdown', end);
    addEventListener('keydown', onKey);
    (document.body || document.documentElement).appendChild(el);
    timer = setTimeout(end, 1940);
  }

  window.FP_COIN_PLAY = function () { fired = true; end(); done = false; play(); };
  if (blocked) { mark(); return; }

  // Ждём картинку максимум 600 мс. Если не успела или не загрузилась — интро не показываем,
  // чтобы вместо монеты не висел пустой экран. День помечаем в любом случае.
  var im = new Image(); im.src = src;
  var skip = setTimeout(function () { fired = true; mark(); }, 600);
  function ok() { clearTimeout(skip); if (!fired) { fired = true; play(); } }
  function fail() { clearTimeout(skip); if (!fired) { fired = true; mark(); } }
  (im.decode ? im.decode() : new Promise(function (r, j) { im.onload = r; im.onerror = j; })).then(ok, fail);
})();
