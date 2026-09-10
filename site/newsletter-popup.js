/* Frankenplatz — окно подписки для тех, кто на сайте впервые.

   Решение Иванны 2026-08-07. В registration-form.js записано обратное
   решение — «автопопапы раздражают и режут доверие»; оно остаётся верным
   для окна регистрации, которое открывается только по клику. Здесь другое:
   разовое предложение подписки. Чтобы оно не превратилось в раздражитель,
   ограничители жёсткие:

   • только ПЕРВЫЙ визит: показали один раз — больше никогда, даже если
     человек не подписался. Отметка в localStorage;
   • через 40 секунд после загрузки: если человек ушёл раньше, ему нечего
     предлагать;
   • НЕ показываем, пока висит баннер кукисов: два окна разом — это спор
     сайта с самим собой. Ждём решения человека и только потом считаем время;
   • НЕ показываем в калькуляторах: там своя форма отчёта, второе предложение
     поверх неё выглядит как выпрашивание;
   • НЕ показываем, если на странице открыто другое модальное окно
     (покупка билета, «Оказия», предложить спикера);
   • закрывается крестиком, Esc и кликом мимо. Никаких «нет, я не хочу
     экономить» вместо кнопки закрытия.

   Подписка идёт общим путём: form_key='newsletter' → двойное подтверждение,
   письмо со ссылкой. Подписчиком человек становится только после перехода
   по ней.
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var LS_KEY = 'fp-nl-popup-v1';   // «уже показывали» — чтобы не повторяться
  var DELAY_MS = 40000;            // 40 секунд после загрузки
  var STYLE_ID = 'fp-nlp-style';

  // Страницы со своей формой сбора e-mail — там окно лишнее.
  var SKIP_PATHS = /^\/calculators(\/|$)/;

  var CSS = [
    '.fp-nlp{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;',
    'padding:20px;background:rgba(13,7,21,.72);backdrop-filter:blur(6px);animation:fp-nlp-in .25s ease-out}',
    '@keyframes fp-nlp-in{from{opacity:0}to{opacity:1}}',
    '.fp-nlp__card{position:relative;width:100%;max-width:440px;background:#140A1F;color:#F3EEF9;',
    'border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:30px 26px 26px;',
    'box-shadow:0 30px 80px rgba(0,0,0,.55);font-family:inherit}',
    '.fp-nlp__x{position:absolute;top:12px;right:12px;width:34px;height:34px;border:none;border-radius:50%;',
    'background:rgba(255,255,255,.07);color:#C3B7D4;font-size:20px;line-height:1;cursor:pointer}',
    '.fp-nlp__x:hover{background:rgba(255,255,255,.13)}',
    '.fp-nlp__eyebrow{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#E6B450;margin-bottom:12px}',
    '.fp-nlp h3{margin:0 0 8px;font-family:"Unbounded","Manrope",sans-serif;font-size:22px;font-weight:800;line-height:1.25}',
    '.fp-nlp p{margin:0 0 18px;font-size:14px;line-height:1.6;color:#C3B7D4}',
    '.fp-nlp input[type=email]{width:100%;box-sizing:border-box;background:rgba(0,0,0,.22);',
    'border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:12px 14px;color:#F3EEF9;font:inherit;font-size:16px}',
    '.fp-nlp input[type=email]:focus{outline:none;border-color:#E6B450}',
    '.fp-nlp__btn{width:100%;margin-top:12px;background:linear-gradient(92deg,#E6B450,#F5C969);color:#231433;',
    'border:0;border-radius:999px;padding:13px 24px;font:inherit;font-weight:800;font-size:15px;cursor:pointer}',
    '.fp-nlp__btn:disabled{opacity:.55;cursor:default}',
    '.fp-nlp__note{margin:12px 0 0;font-size:12px;color:#7A6C93;line-height:1.5}',
    '.fp-nlp__msg{margin-top:12px;font-size:13.5px;line-height:1.5;min-height:1em}',
    '.fp-nlp__msg.ok{color:#8BE59B}.fp-nlp__msg.err{color:#FF7A8A}',
    '.fp-nlp__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

  function seen() {
    try { return !!localStorage.getItem(LS_KEY); } catch (e) { return false; }
  }
  function remember() {
    try { localStorage.setItem(LS_KEY, String(Date.now())); } catch (e) { /* приватный режим */ }
  }

  /** Баннер кукисов ещё на экране? Пока да — своё окно не открываем.
      Геометрия, а не offsetParent: у position:fixed-баннера offsetParent
      всегда null, и проверка молча отвечала «не виден» (найдено 09.09
      на кнопке «Задать вопрос», здесь тот же код). */
  function cookieBannerVisible() {
    var b = document.querySelector('.fp-cc, #fp-cookie, [data-fp-cookie]');
    return !!(b && b.getBoundingClientRect().height > 0);
  }

  /** Уже открыто чужое модальное окно — не лезем поверх. */
  function otherModalOpen() {
    return !!document.querySelector('.tk-modal, .mk-modal, .fp-sg-ov, .ok-modal, .fp-reg-modal, .fp-hw.is-open');
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var overlay = null;
  function close() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  function show() {
    if (overlay || seen() || otherModalOpen()) return;
    injectStyle();
    remember(); // отмечаем сразу: показали — второй раз не покажем

    overlay = document.createElement('div');
    overlay.className = 'fp-nlp';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Подписка на новости форума');
    overlay.innerHTML =
      '<form class="fp-nlp__card" novalidate>' +
      '<button class="fp-nlp__x" type="button" aria-label="Закрыть">&times;</button>' +
      '<div class="fp-nlp__eyebrow">Frankenplatz · 24–25 октября, Баден</div>' +
      '<h3>Узнавать первым</h3>' +
      '<p>Программа, спикеры и старт продаж — письмом, когда появятся. ' +
      'Пара писем в месяц, отписка одним кликом в любом из них.</p>' +
      '<input type="email" name="email" placeholder="твой@email.ch" autocomplete="email" required>' +
      '<div class="fp-nlp__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<button class="fp-nlp__btn" type="submit">Подписаться</button>' +
      '<p class="fp-nlp__note">Отправляя, соглашаешься на обработку e-mail для рассылки. ' +
      'Подтверждение придёт письмом.</p>' +
      '<p class="fp-nlp__msg" role="status" aria-live="polite"></p>' +
      '</form>';

    document.body.appendChild(overlay);
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.fp-nlp__x').addEventListener('click', close);

    var form = overlay.querySelector('form');
    var msg = form.querySelector('.fp-nlp__msg');
    var btn = form.querySelector('.fp-nlp__btn');
    var input = form.querySelector('input[type=email]');
    input.focus();

    if (window.FPConsent && window.FPConsent.track) {
      window.FPConsent.track('newsletter_popup_shown', { event_slug: EVENT });
    }

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-nlp__msg' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = String(input.value || '').trim();
      if (!email || email.indexOf('@') < 1) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        input.focus();
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Отправляю…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,
          form_key: 'newsletter',
          kind: 'lead',
          role: 'Подписка из окна',
          source_url: location.href,
          email: email,
          consent: true,
          website: form.website.value,
          elapsed_ms: Date.now() - PAGE_LOADED
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.ok) {
            if (window.FPConsent && window.FPConsent.track) {
              window.FPConsent.track('newsletter_subscribe', { form_key: 'newsletter', source: 'popup' });
            }
            form.querySelector('input[type=email]').style.display = 'none';
            btn.style.display = 'none';
            // double opt-in: подписчиком человек станет только после перехода
            // по ссылке — обещать «подписали» рано.
            setMsg('Почти готово! Отправили письмо на ' + email +
              ' — открой его и подтверди подписку.', 'ok');
            setTimeout(close, 5000);
          } else {
            btn.disabled = false;
            btn.textContent = 'Подписаться';
            setMsg((data && data.error) || 'Не получилось. Попробуй ещё раз чуть позже.', 'err');
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'Подписаться';
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
        });
    });
  }

  var PAGE_LOADED = Date.now();

  function start() {
    if (seen()) return;                        // уже видел — больше не показываем
    if (SKIP_PATHS.test(location.pathname)) return;  // в калькуляторах своя форма

    // Пока человек не разобрался с баннером кукисов, отсчёт не идёт:
    // два окна одновременно — это спор сайта с самим собой.
    var waited = 0;
    var tick = setInterval(function () {
      if (cookieBannerVisible()) { waited = 0; return; }
      waited += 1000;
      if (waited >= DELAY_MS) {
        clearInterval(tick);
        show();
      }
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
