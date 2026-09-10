/* Frankenplatz — «Быстрые ответы»: плавающая кнопка «?» справа снизу.
   Открывает панель с готовыми ответами на частые вопросы; пункт «Другое»
   раскрывает форму (вопрос + e-mail) → общий приёмник /api/forms, как
   остальные формы сайта (см. forum-form.js). Ответ обещаем в течение 24 часов.

   Подключение (в конце body, после cookie-consent.js):
     <script src="site/help-widget.js" defer></script>
   Из подпапки (blog/, trips/) — ../site/help-widget.js.
   Ссылки в ответах — абсолютные от корня (cleanUrls на Vercel). */
(function () {
  'use strict';
  if (window.__fpHelpWidget) return;
  window.__fpHelpWidget = true;

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var PAGE_LOADED = Date.now();

  var QA = [
    { q: 'Когда и где проходит форум?',
      a: '<b>24–25 октября 2026</b>, Baden — 15 минут на поезде от Zürich HB. Два дня: День №1 — база швейцарских финансов, День №2 — LvL UP.',
      link: ['/#program', 'Программа'] },
    { q: 'Сколько стоит билет?',
      a: 'Сейчас действует <b>Early Bird −25%</b>: Standard от <b>112 CHF</b>, Premium от <b>149</b>, VIP от <b>209</b> за день. Оба дня — от 239 CHF. Скидка до объявления всех спикеров.',
      link: ['/tickets', 'Все цены'] },
    { q: 'Чем отличаются Standard, Premium и VIP?',
      a: 'Рядами и дополнениями: Premium — ближе к сцене, записи лекций и отдельная зона нетворкинга; VIP — первые ряды, именная рассадка, подарки партнёров и мини-афтепати со спикерами.',
      link: ['/tickets', 'Сравнить категории'] },
    { q: 'Можно прийти только на один день?',
      a: 'Да. Билеты продаются на День №1, День №2 или сразу на оба — комплект выгоднее до 99 CHF.',
      link: ['/tickets', 'Выбрать день'] },
    { q: 'На каком языке форум?',
      a: 'Все выступления — на русском. Немецкие термины (AHV, Steuererklärung, Säule 3a) объясняем по ходу, не переводя.' },
    { q: 'Будет ли еда?',
      a: 'Кофе-брейк и аперо включены в любой билет. Ланч — <b>+35 CHF за день</b>, добавляется при покупке.',
      link: ['/tickets', 'Подробнее'] },
    { q: 'Не попадаю на октябрь — что делать?',
      a: 'Следующий форум — <b>6–7 марта 2027</b>, тот же формат. Подпишись на новости в футере, и мы напишем, когда откроем продажу.' },
    { q: 'Хочу выступить или стать партнёром',
      a: 'Спикерам — анкета, брендам — маркет и партнёрские форматы. Ответим лично.',
      link: ['/anketa', 'Анкета спикера'], link2: ['/collaboration', 'Партнёрство'] }
  ];

  var CSS = [
    '.fp-hw{position:fixed;right:22px;bottom:22px;z-index:9990;font-family:var(--font-body,"Manrope",system-ui,sans-serif);opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .3s,transform .3s}',
    '.fp-hw.is-ready{opacity:1;transform:none;pointer-events:auto}',
    '.fp-hw__btn{width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;background:var(--grad-gold,linear-gradient(135deg,#E6B450,#F5C969));color:var(--ink-on-gold,#2A1A05);',
    'font:800 19px/1 var(--font-body,"Manrope",system-ui,sans-serif);box-shadow:0 8px 22px rgba(230,180,80,.26),0 2px 6px rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}',
    '.fp-hw__btn:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(230,180,80,.42),0 2px 6px rgba(0,0,0,.35)}',
    '.fp-hw__btn span{display:block;transition:transform .25s}',
    '.fp-hw.is-open .fp-hw__btn span{transform:rotate(45deg)}',
    '.fp-hw__panel{position:absolute;right:0;bottom:58px;width:min(400px,calc(100vw - 32px));max-height:min(72vh,640px);display:flex;flex-direction:column;',
    'background:#2A1B3D;border:1px solid var(--line-strong,rgba(255,255,255,.18));border-radius:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);overflow:hidden;',
    'opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .22s,transform .22s;transform-origin:bottom right}',
    '.fp-hw.is-open .fp-hw__panel{opacity:1;transform:none;pointer-events:auto}',
    '.fp-hw__head{padding:20px 22px 14px;border-bottom:1px solid rgba(255,255,255,.12)}',
    '.fp-hw__eyebrow{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--gold,#E6B450)}',
    '.fp-hw__eyebrow::before{content:"";width:22px;height:1.5px;background:var(--gold,#E6B450)}',
    '.fp-hw__h{margin:8px 0 0;font:800 19px/1.2 var(--font-display,"Unbounded",sans-serif);color:#fff;letter-spacing:-.01em}',
    '.fp-hw__sub{margin:6px 0 0;font-size:13.5px;line-height:1.5;color:#C9BCDC}',
    '.fp-hw__body{overflow-y:auto;padding:8px 10px 10px;scrollbar-width:thin}',
    '.fp-hw__q{width:100%;text-align:left;background:none;border:0;border-radius:12px;padding:13px 12px;cursor:pointer;display:flex;gap:12px;align-items:flex-start;justify-content:space-between;color:#fff;font:600 15px/1.4 inherit;font-family:inherit}',
    '.fp-hw__q:hover{background:rgba(255,255,255,.07)}',
    '.fp-hw__q::after{content:"+";flex:none;color:var(--gold,#E6B450);font:700 18px/1.2 var(--font-display,sans-serif);transition:transform .2s}',
    '.fp-hw__item.is-open .fp-hw__q::after{transform:rotate(45deg)}',
    '.fp-hw__item{border-bottom:1px solid rgba(255,255,255,.10)}',
    '.fp-hw__item:last-child{border-bottom:0}',
    '.fp-hw__a{display:none;padding:0 12px 16px;font-size:14.5px;line-height:1.6;color:#D7CDE6}',
    '.fp-hw__a b{color:#fff}',
    '.fp-hw__item.is-open .fp-hw__a{display:block}',
    '.fp-hw__links{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.fp-hw__links a{display:inline-flex;align-items:center;padding:8px 14px;border-radius:999px;border:1px solid rgba(230,180,80,.4);color:var(--gold,#E6B450);font-weight:700;font-size:13.5px;text-decoration:none}',
    '.fp-hw__links a:hover{background:rgba(230,180,80,.1)}',
    '.fp-hw__other{margin:8px 2px 2px;border:1px dashed rgba(230,180,80,.45);border-radius:14px;overflow:hidden}',
    '.fp-hw__other .fp-hw__q{color:var(--gold,#E6B450)}',
    '.fp-hw__other .fp-hw__q::after{content:"→";transform:none}',
    '.fp-hw__other.is-open .fp-hw__q::after{content:"–"}',
    '.fp-hw__form{display:none;padding:2px 12px 14px}',
    '.fp-hw__other.is-open .fp-hw__form{display:block}',
    '.fp-hw__form textarea,.fp-hw__form input{width:100%;box-sizing:border-box;background:rgba(0,0,0,.28);border:1px solid var(--line-strong,rgba(255,255,255,.16));border-radius:12px;padding:11px 13px;color:#F3EEF9;font:inherit;font-size:14.5px;margin-top:8px}',
    '.fp-hw__form textarea{min-height:88px;resize:vertical}',
    '.fp-hw__form textarea:focus,.fp-hw__form input:focus{outline:none;border-color:var(--gold,#E6B450)}',
    '.fp-hw__consent{display:flex;gap:9px;align-items:flex-start;font-size:12px;line-height:1.45;color:#BFB2D2;margin-top:10px;cursor:pointer}',
    '.fp-hw__consent input{width:16px;height:16px;margin:1px 0 0;accent-color:var(--gold,#E6B450);flex:none}',
    '.fp-hw__consent a{color:var(--lila-bright,#B98BFF)}',
    '.fp-hw__send{width:100%;margin-top:12px;border:0;border-radius:999px;padding:13px 20px;cursor:pointer;font:800 15px var(--font-body,inherit);color:var(--ink-on-gold,#2A1A05);background:var(--grad-gold,linear-gradient(135deg,#E6B450,#F5C969))}',
    '.fp-hw__send:disabled{opacity:.55;cursor:default}',
    '.fp-hw__note{margin:10px 0 0;font-size:12.5px;line-height:1.5;color:#BFB2D2}',
    '.fp-hw__msg{margin:10px 0 0;font-size:13.5px;line-height:1.5}',
    '.fp-hw__msg.ok{color:var(--green-text,#9DEFAD);font-weight:700}',
    '.fp-hw__msg.err{color:var(--red,#FF7A8A)}',
    '.fp-hw__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    '@media(max-width:600px){.fp-hw{right:14px;bottom:14px}.fp-hw__btn{width:46px;height:46px;font-size:18px}',
    '.fp-hw__panel{position:fixed;right:0;left:0;bottom:0;width:auto;max-height:82vh;border-radius:22px 22px 0 0;transform:translateY(100%);transform-origin:bottom center}',
    '.fp-hw.is-open .fp-hw__panel{transform:none}',
    '.fp-hw__panel::before{content:"";display:block;flex:none;width:44px;height:4px;border-radius:99px;background:rgba(255,255,255,.28);margin:10px auto 2px}',
    '.fp-hw__head{padding:12px 20px 14px}',
    '.fp-hw__q{padding:15px 12px;font-size:15.5px}',
    '.fp-hw__body{padding-bottom:max(14px,env(safe-area-inset-bottom))}',
    '.fp-hw__form textarea,.fp-hw__form input{font-size:16px}}',
    '@media(prefers-reduced-motion:reduce){.fp-hw__panel,.fp-hw__btn,.fp-hw__btn span,.fp-hw__q::after{transition:none}}'
  ].join('');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function itemHTML(it, i) {
    var links = '';
    if (it.link || it.link2) {
      links = '<div class="fp-hw__links">' +
        (it.link ? '<a href="' + it.link[0] + '">' + esc(it.link[1]) + ' →</a>' : '') +
        (it.link2 ? '<a href="' + it.link2[0] + '">' + esc(it.link2[1]) + ' →</a>' : '') + '</div>';
    }
    return '<div class="fp-hw__item"><button type="button" class="fp-hw__q" aria-expanded="false" aria-controls="fp-hw-a' + i + '">' + esc(it.q) + '</button>' +
      '<div class="fp-hw__a" id="fp-hw-a' + i + '">' + it.a + links + '</div></div>';
  }

  function build() {
    var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
    var root = document.createElement('div');
    root.className = 'fp-hw';
    root.innerHTML =
      '<div class="fp-hw__panel" role="dialog" aria-label="Быстрые ответы" aria-hidden="true">' +
        '<div class="fp-hw__head"><div class="fp-hw__eyebrow">Frankenplatz</div><p class="fp-hw__h">Быстрые ответы</p>' +
        '<p class="fp-hw__sub">Нажми на вопрос — ответ сразу. Не нашёл своего — напиши, ответим в течение 24 часов.</p></div>' +
        '<div class="fp-hw__body">' + QA.map(itemHTML).join('') +
          '<div class="fp-hw__item fp-hw__other"><button type="button" class="fp-hw__q" aria-expanded="false">Другое — задать свой вопрос</button>' +
          '<form class="fp-hw__form" novalidate>' +
            '<div class="fp-hw__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
            '<textarea name="question" placeholder="Твой вопрос…" required aria-label="Вопрос"></textarea>' +
            '<input type="email" name="email" placeholder="E-mail для ответа" required autocomplete="email" aria-label="E-mail">' +
            '<label class="fp-hw__consent"><input type="checkbox" name="consent"><span>Даю согласие на обработку данных. <a href="/legal#datenschutz">Политика конфиденциальности</a>.</span></label>' +
            '<button type="submit" class="fp-hw__send">Отправить вопрос</button>' +
            '<p class="fp-hw__note">Отвечаем лично, в течение 24 часов. Без рассылок и спама.</p>' +
            '<p class="fp-hw__msg" role="status" aria-live="polite"></p>' +
          '</form></div>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="fp-hw__btn" aria-label="Быстрые ответы" aria-expanded="false"><span>?</span></button>';
    document.body.appendChild(root);
    return root;
  }

  function init() {
    var root = build();
    var btn = root.querySelector('.fp-hw__btn');
    var panel = root.querySelector('.fp-hw__panel');
    var form = root.querySelector('.fp-hw__form');
    var msg = form.querySelector('.fp-hw__msg');
    var send = form.querySelector('.fp-hw__send');

    /* Кнопка не маячит с первого экрана — появляется после пары экранов прокрутки.
       И не показывается, пока внизу висит баннер кукисов (его z-index выше, кнопка
       оказалась бы под ним). Видимость баннера меряем геометрией, НЕ offsetParent:
       у position:fixed-элементов offsetParent всегда null (грабля, пойманная в ask.js). */
    function cookieBannerVisible() {
      var el = document.querySelector('.fp-cc, #fp-cookie, [data-fp-cookie]');
      return !!(el && el.getBoundingClientRect().height > 0);
    }
    /* На короткой странице порог скролла недостижим — там кнопка появляется
       по таймеру (как только баннер закрыт), иначе её не увидеть никогда. */
    var START = Date.now();
    function shortPage() { return document.documentElement.scrollHeight <= window.innerHeight * 1.8; }
    function checkScroll() {
      var scrolled = window.scrollY > window.innerHeight * 1.6;
      var waited = shortPage() && Date.now() - START > 3000;
      if ((scrolled || waited) && !cookieBannerVisible()) {
        root.classList.add('is-ready');
        window.removeEventListener('scroll', checkScroll);
        clearInterval(bannerTimer);
      }
    }
    var bannerTimer = setInterval(checkScroll, 700); // баннер закрыли без скролла / короткая страница
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    function setOpen(v) {
      root.classList.toggle('is-open', v);
      btn.setAttribute('aria-expanded', String(v));
      panel.setAttribute('aria-hidden', String(!v));
      if (v && window.FPConsent) window.FPConsent.track('help_open', {});
    }
    btn.addEventListener('click', function () { setOpen(!root.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', function (e) { if (root.classList.contains('is-open') && !root.contains(e.target)) setOpen(false); });

    root.querySelectorAll('.fp-hw__q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.parentNode, open = !item.classList.contains('is-open');
        root.querySelectorAll('.fp-hw__item.is-open').forEach(function (o) { if (o !== item) { o.classList.remove('is-open'); o.querySelector('.fp-hw__q').setAttribute('aria-expanded', 'false'); } });
        item.classList.toggle('is-open', open);
        q.setAttribute('aria-expanded', String(open));
        if (open && item.classList.contains('fp-hw__other')) form.querySelector('textarea').focus();
        if (open && window.FPConsent) window.FPConsent.track('help_question', { q: q.textContent });
      });
    });

    function setMsg(t, kind) { msg.textContent = t || ''; msg.className = 'fp-hw__msg' + (kind ? ' ' + kind : ''); }

    form.addEventListener('submit', function (e) {
      e.preventDefault(); setMsg('');
      var question = form.question.value.trim(), email = form.email.value.trim();
      if (question.length < 5) { setMsg('Напиши вопрос чуть подробнее.', 'err'); form.question.focus(); return; }
      if (email.indexOf('@') < 1) { setMsg('Проверь e-mail — кажется, есть опечатка.', 'err'); form.email.focus(); return; }
      if (!form.consent.checked) { setMsg('Нужно согласие на обработку данных.', 'err'); return; }
      if (form.website.value) return;
      send.disabled = true; send.textContent = 'Отправляю…';
      fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // form_key 'question' — единый канал вопросов сайта: так они попадают
          // в лист «Вопросы» таблицы заявок и в сводку рутины. Ключа 'help'
          // в карте таблицы НЕТ — не переименовывать.
          source: 'forum', event: EVENT, form_key: 'question', kind: 'lead', role: 'Вопрос с сайта (быстрые ответы)',
          source_url: location.href, email: email, consent: true, website: form.website.value,
          elapsed_ms: Date.now() - PAGE_LOADED, payload: { 'Вопрос': question, 'Страница': location.pathname }
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, data: d }; }); })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            if (window.FPConsent) window.FPConsent.track('forum_form', { form_key: 'question' });
            Array.prototype.forEach.call(form.children, function (c) { if (c !== msg) c.style.display = 'none'; });
            setMsg('Готово! Вопрос у нас — ответим на ' + email + ' в течение 24 часов.', 'ok');
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
            send.disabled = false; send.textContent = 'Отправить вопрос';
          }
        })
        .catch(function () { setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err'); send.disabled = false; send.textContent = 'Отправить вопрос'; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
