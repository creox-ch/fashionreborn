/* Frankenplatz — шапка сайта для раздела «Калькуляторы».
   Калькуляторы — самодостаточные страницы: свои токены и шрифты в <style>,
   без kit.css/chrome.css. Поэтому шапку сюда инжектит этот модуль.

   ВАЖНО: это НЕ второе меню. Модуль рисует ту же самую шапку сайта —
   классы .fp-top* и CSS дословно из site/chrome.css (блок TopBar), список
   ссылок берётся из window.FP_NAV (site/nav.js подгружается ниже). Раньше
   здесь был рукописный клон с собственной геометрией: отбивка 11px вместо
   16px и max(26px,(100% - 1240px)/2), кегль 13.5px вместо 16px, бургер на
   900px вместо 1279px — из-за этого меню не вставало на сетку контента,
   а на планшете ссылки уезжали во вторую строку. Клон удалён.

   Подключение — одной строкой в конце <body> страницы:
     <script src="../site/calc-nav.js"></script>   (внутри /calculators/)

   ⚠ Ссылки АБСОЛЮТНЫЕ от корня: на сайте включён cleanUrls (vercel.json),
   относительные пути из подпапки /calculators/ уводят в 404.

   Правки состава меню — только в site/nav.js. Здесь их нет и быть не должно. */
(function () {
  'use strict';

  if (window.__fpCalcNav) return;
  window.__fpCalcNav = true;

  var here = (document.currentScript && document.currentScript.src) || '../site/calc-nav.js';
  var base = here.replace(/calc-nav\.js.*$/, '');

  /* ---- Место под фиксированную шапку резервируем СРАЗУ ----
     Шапка position:fixed, поэтому место под неё держит padding-top у body.
     Раньше он добавлялся в build(), то есть после DOMContentLoaded и после
     сетевой загрузки nav.js — страница к этому моменту уже отрисована и
     отцентрирована (body у калькуляторов display:flex + justify-content:center),
     и контент прыгал вниз на высоту шапки.

     Теперь резерв ставится в момент выполнения скрипта, до отрисовки. Исходный
     padding страницы clamp-овый и держит вертикальный ритм, поэтому он не
     переписывается, а запоминается и складывается с высотой шапки.
     HEADER_H — высота шапки в одну строку: 16 + 44 + 16 + 1px границы. */
  var HEADER_H = 77;
  var pad0 = null;

  function reservePad(h) {
    if (!document.body) return;
    if (pad0 === null) pad0 = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = (pad0 + h) + 'px';
  }
  reservePad(HEADER_H);

  /* ---- CSS: блок TopBar из site/chrome.css, значения дословно ----
     Отличие одно и осознанное: header у калькуляторов fixed, а не sticky —
     их body центрирует контент флексом, sticky-ребёнок встал бы в колонку. */
  var CSS = [
    /* Отбивка — та же, что на остальном сайте. На пятнадцати страницах её
       задаёт align-left.css: max(var(--fp-gutter),(100% - 1240px)/2), где
       --fp-gutter это clamp(20px,6vw,80px). Страницы калькуляторов не грузят
       ни одного CSS-файла, токена там нет, поэтому clamp вписан значением.
       Разница видна на планшете и узком десктопе: на 768px логотип отступает
       на 46px, на 1000px — на 60px, как на главной, а не на 26px. */
    '.fp-top{position:fixed;top:0;left:0;right:0;z-index:80;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px max(clamp(20px,6vw,80px),(100% - 1240px)/2);background:rgba(20,10,31,.6);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.10);box-sizing:border-box;min-height:0;overflow:visible}',
    '.fp-top::before,.fp-top::after{content:none;display:none}',
    '.fp-top .fp-top__nav{position:static;inset:auto;background:none;border:none;box-shadow:none;border-radius:0;clip-path:none;max-width:none;padding:0;margin:0 0 0 auto;min-height:0;height:auto;width:auto;backdrop-filter:none;-webkit-backdrop-filter:none}',
    '.fp-top__logo{font-family:"Unbounded","Manrope",system-ui,sans-serif;font-weight:800;font-size:18px;letter-spacing:.01em;color:#fff;display:flex;align-items:center;gap:9px;min-height:44px;text-decoration:none}',
    '.fp-top__nav{display:flex;gap:10px;align-items:center;flex:0 1 auto;min-width:0;flex-wrap:nowrap;margin-left:auto}',
    '.fp-top__links{display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:center;gap:0px 10px;flex:0 1 auto;min-width:0}',
    '.fp-top__nav > .fp-top__link--cta{flex:0 0 auto}',
    '@media (min-width:1280px) and (max-width:1599px){.fp-top .fp-top__link{padding:8px 10px}.fp-top .fp-top__link--cta{padding:12px 20px}.fp-top .fp-top__links{gap:0px 6px}}',
    '.fp-top__logo{background-image:none;background-size:220% 100%;background-position:220% 0;-webkit-background-clip:border-box;background-clip:border-box}',
    '.fp-top__logo:hover,.fp-top__logo:focus-visible{background-image:linear-gradient(100deg,#fff 0%,var(--gold,#E6B450) 28%,var(--lila-bright,#B98BFF) 52%,#fff 78%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:fp-logo-sweep 2.8s ease-in-out infinite alternate}',
    '@keyframes fp-logo-sweep{from{background-position:220% 0}to{background-position:-20% 0}}',
    '@media(prefers-reduced-motion:reduce){.fp-top__logo:hover,.fp-top__logo:focus-visible{animation:none;background-position:60% 0}}',
    '.fp-top__link{font-family:"Manrope",system-ui,sans-serif;font-size:16px;color:#C3B7D4;text-decoration:none;padding:8px 13px;border-radius:10px;transition:color .18s,background .18s;white-space:nowrap}',
    '.fp-top__link:hover{color:#F5C969}',
    '.fp-top__link--active{color:#E6B450;font-weight:700}',
    '.fp-top__link--active:hover{color:#F5C969}',
    '.fp-top__link--cta{background:linear-gradient(135deg,#E6B450,#F5C969);color:#2A1A05;font-weight:700;border-radius:9999px;padding:12px 24px;font-size:16px}',
    '.fp-top__link--cta:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(230,180,80,.30);color:#2A1A05}',
    '.fp-top__burger{display:none;position:relative;background:none;border:none;color:#fff;font-size:0;line-height:1;cursor:pointer;padding:6px 8px;min-width:44px;min-height:44px;border-radius:10px}',
    '.fp-top__burger::before,.fp-top__burger::after{content:"";position:absolute;left:50%;top:50%;width:20px;height:2px;border-radius:2px;background:#fff;transform:translate(-50%,-50%);transition:transform .22s,box-shadow .22s}',
    '.fp-top__burger::before{box-shadow:0 -6px 0 #fff,0 6px 0 #fff}',
    '.fp-top__burger[aria-expanded="true"]::before{box-shadow:none;transform:translate(-50%,-50%) rotate(45deg)}',
    '.fp-top__burger[aria-expanded="true"]::after{transform:translate(-50%,-50%) rotate(-45deg)}',
    '.fp-top__burger:hover{background:rgba(255,255,255,.06)}',
    '.fp-top__menu{position:absolute;top:100%;flex-direction:column;gap:2px;background:rgba(20,10,31,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);left:auto;right:12px;width:min(86vw,340px);margin-top:8px;border:1px solid rgba(255,255,255,.10);border-radius:18px;padding:14px 16px 18px;box-shadow:0 24px 60px rgba(0,0,0,.5);display:flex;visibility:hidden;pointer-events:none;opacity:0;transform:translateX(22px);transition:transform .34s cubic-bezier(.2,.75,.2,1),opacity .22s ease,visibility .34s}',
    '.fp-top__menu.is-open{visibility:visible;pointer-events:auto;opacity:1;transform:none}',
    '@media(prefers-reduced-motion:reduce){.fp-top__menu{transition:none}}',
    '.fp-top__menu .fp-top__link{font-size:16px;padding:13px 12px}',
    '.fp-top__menu .fp-top__link--cta{text-align:center;margin-top:6px}',
    '@media (max-width:1279px){.fp-top__nav{display:none}.fp-top__burger{display:block;padding:0}}',
    '.fp-top__menu-foot{display:flex;flex-direction:column;gap:14px;margin-top:14px;padding-top:16px;border-top:1px solid rgba(255,255,255,.10)}',
    '.fp-top__menu-ig{align-self:flex-start;width:46px;height:46px;display:grid;place-items:center;border:1px solid rgba(230,180,80,.34);border-radius:50%}',
    '.fp-top__menu-ig svg{width:22px;height:22px;fill:#E6B450}',
    '.fp-top__menu-legal{margin:0;font-size:15px;line-height:1.5;color:#9C90AE}'
  ].join('\n');

  var IG_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 .9.2 1.4.3 1.7.2.4.4.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"/></svg>';

  function linkEl(item, cls) {
    var a = document.createElement('a');
    a.className = 'fp-top__link' + (item.cta ? ' fp-top__link--cta' : '') + (item.active ? ' fp-top__link--active' : '');
    a.href = item.href;
    a.textContent = item.label;
    if (item.active) a.setAttribute('aria-current', 'page');
    return a;
  }

  function build() {
    if (document.querySelector('.fp-top')) return;

    var links = typeof window.FP_NAV === 'function'
      ? window.FP_NAV('calculators')
      /* аварийный минимум, если nav.js не загрузился: одна кнопка домой */
      : [{ label: 'На главную', href: '/' }, { label: 'Купить билет', href: '/tickets', cta: true }];

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var header = document.createElement('header');
    header.className = 'fp-top';

    var logo = document.createElement('a');
    logo.className = 'fp-top__logo';
    logo.href = '/';
    logo.textContent = 'Frankenplatz.ch';
    header.appendChild(logo);

    var nav = document.createElement('nav');
    nav.className = 'fp-top__nav';
    nav.setAttribute('aria-label', 'Основное меню');

    var group = document.createElement('span');
    group.className = 'fp-top__links';
    nav.appendChild(group);

    var menu = document.createElement('div');
    menu.className = 'fp-top__menu';

    links.forEach(function (item) {
      /* пункты — в своей группе (переносятся внутри неё), CTA и логотип стоят на месте */
      (item.cta ? nav : group).appendChild(linkEl(item));
      menu.appendChild(linkEl(item));
    });
    header.appendChild(nav);

    var burger = document.createElement('button');
    burger.className = 'fp-top__burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Открыть меню');
    burger.setAttribute('aria-expanded', 'false');
    header.appendChild(burger);

    /* подвал мобильного меню — как в site/chrome.js */
    var foot = document.createElement('div');
    foot.className = 'fp-top__menu-foot';
    foot.innerHTML =
      '<a class="fp-top__menu-ig" href="https://www.instagram.com/frankenplatz.ch/" target="_blank" rel="noopener" aria-label="Instagram Frankenplatz">' + IG_SVG + '</a>' +
      '<p class="fp-top__menu-legal">Frankenplatz · 24–25.10.2026 · Baden<br>© 2026 Frankenplatz.ch — все права защищены</p>';
    menu.appendChild(foot);
    header.appendChild(menu);

    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    menu.querySelectorAll('a:not(.fp-top__menu-ig)').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });

    document.body.insertBefore(header, document.body.firstChild);

    /* Уточняем резерв по фактической высоте: она меняется с шириной окна —
       на узком десктопе меню уходит в две строки и шапка подрастает.
       Базовое значение уже стоит с момента выполнения скрипта, поэтому здесь
       обычно ничего не сдвигается. */
    var fit = function () { reservePad(header.offsetHeight); };
    fit();
    window.addEventListener('resize', fit);
    if (window.ResizeObserver) new ResizeObserver(fit).observe(header);
  }

  function start() {
    if (typeof window.FP_NAV === 'function') { build(); return; }
    var s = document.createElement('script');
    s.src = base + 'nav.js';
    s.onload = build;
    s.onerror = build;
    document.head.appendChild(s);
  }

  /* Собираем сразу, не дожидаясь DOMContentLoaded: скрипт подключён последним
     в <body>, так что document.body и весь контент страницы уже разобраны.
     Ждать было нечего, а из-за ожидания шапка появлялась после отрисовки, и
     уточнение резерва по её фактической высоте дёргало страницу — заметно на
     узком десктопе, где меню уходит в две строки и шапка выше обычного.
     Если тела ещё нет (скрипт перенесли в <head>) — работает прежний путь. */
  if (document.body) {
    start();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
