/* Frankenplatz — баннер согласия на cookies + Google Analytics.
   Отдельный модуль (как speaker-form.js): переживает синхронизацию дизайна.

   Юридическая логика (revDSG / GDPR) и почему именно так:
   GA ставит cookies, поэтому её НЕЛЬЗЯ грузить до согласия. Здесь GA
   подключается только после явного «Принять». При отказе скрипт Google
   не загружается вообще. Это ровно то, что обещает наша страница
   legal.html#datenschutz — текст и поведение обязаны совпадать.

   Выбор хранится в localStorage; повторно баннер не показывается.
   Передумать: ссылка на #cookies или window.FPConsent.open().

   Подключение (на каждой странице, до </body>):
     <script src="site/cookie-consent.js"></script>          // корневые страницы
     <script src="../site/cookie-consent.js"></script>       // калькуляторы
*/
(function () {
  'use strict';

  var GA_ID = 'G-FLVYBPXJLT';
  var KEY = 'fp-consent-v1';   // 'granted' | 'denied'
  var STYLE_ID = 'fp-cc-style';

  /* Vercel Web Analytics — НАМЕРЕННО вне гейта согласия.
     В отличие от GA она не ставит cookies и не хранит идентификаторов,
     поэтому согласие не требуется и баннер её не касается. Грузится
     всегда, в том числе при отказе от cookies.
     Живёт здесь, а не в HTML, потому что этот модуль подключён на всех
     страницах и переживает синхронизацию дизайна. */
  try {
    var va = document.createElement('script');
    va.defer = true;
    va.src = '/_vercel/insights/script.js';
    (document.head || document.documentElement).appendChild(va);
  } catch (e) {}

  var CSS = [
    '.fp-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;',
    'padding:14px;pointer-events:none}',
    '.fp-cc__box{pointer-events:auto;max-width:760px;width:100%;display:flex;gap:16px;align-items:center;',
    'flex-wrap:wrap;background:rgba(26,14,40,.92);border:1px solid var(--line-strong,rgba(255,255,255,.16));',
    'border-radius:18px;padding:16px 20px;backdrop-filter:blur(12px);box-shadow:0 18px 50px rgba(0,0,0,.45)}',
    '.fp-cc__txt{flex:1 1 320px;font:400 13.5px/1.5 "Manrope",system-ui,sans-serif;color:var(--muted,#C3B7D4)}',
    '.fp-cc__txt a{color:var(--lila-bright,#B98BFF)}',
    '.fp-cc__btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.fp-cc__btn{border:0;border-radius:999px;padding:10px 18px;font:700 13.5px "Manrope",system-ui,sans-serif;cursor:pointer;white-space:nowrap}',
    '.fp-cc__btn--ok{background:linear-gradient(92deg,var(--gold,#E6B450),var(--gold-bright,#F5C969));color:var(--ink-on-gold,#231433)}',
    '.fp-cc__btn--no{background:transparent;color:var(--muted,#C3B7D4);border:1px solid var(--line-strong,rgba(255,255,255,.18))}',
    '.fp-cc__btn--no:hover{color:#fff}',
    '@media(max-width:560px){.fp-cc__btns{width:100%}.fp-cc__btn{flex:1}}'
  ].join('');

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* приватный режим — просто не запоминаем */ }
  }

  var gaLoaded = false;

  /** Подключает GA. Вызывается ТОЛЬКО при явном согласии. */
  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var st = document.createElement('style');
    st.id = STYLE_ID;
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var bannerEl = null;

  function closeBanner() {
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
    bannerEl = null;
  }

  function decide(v) {
    write(v);
    closeBanner();
    if (v === 'granted') loadGA();
  }

  // Ссылка на «Правовую информацию» — из калькуляторов на уровень выше.
  function legalHref() {
    return '/legal#datenschutz';
  }

  function showBanner() {
    if (bannerEl) return;
    injectStyle();
    var wrap = document.createElement('div');
    wrap.className = 'fp-cc';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Согласие на cookies');
    wrap.innerHTML =
      '<div class="fp-cc__box">' +
        '<div class="fp-cc__txt">Мы используем технически необходимые cookies, а с твоего согласия — ' +
        'аналитику, чтобы понимать, что на сайте полезно. Подробнее — в ' +
        '<a href="' + legalHref() + '">политике конфиденциальности</a>.</div>' +
        '<div class="fp-cc__btns">' +
          '<button type="button" class="fp-cc__btn fp-cc__btn--no" data-cc="denied">Только необходимые</button>' +
          '<button type="button" class="fp-cc__btn fp-cc__btn--ok" data-cc="granted">Принять</button>' +
        '</div>' +
      '</div>';
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-cc]') : null;
      if (b) decide(b.getAttribute('data-cc'));
    });
    document.body.appendChild(wrap);
    bannerEl = wrap;
  }

  function start() {
    var v = read();
    if (v === 'granted') { loadGA(); }
    else if (v !== 'denied') { showBanner(); }      // выбора ещё не было
    if (location.hash === '#cookies') showBanner(); // «передумать»
  }

  /** Публичный API: аналитика и повторный вызов баннера. */
  window.FPConsent = {
    granted: function () { return read() === 'granted'; },
    open: showBanner,
    /** Событие в GA. Молча игнорируется без согласия — так и должно быть. */
    track: function (name, params) {
      if (read() !== 'granted' || typeof window.gtag !== 'function') return;
      try { window.gtag('event', name, params || {}); } catch (e) { /* аналитика не должна ломать сайт */ }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
