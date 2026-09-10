/* Frankenplatz — захват e-mail после расчёта в калькуляторах.
   Один модуль на все калькуляторы: рисует карточку, отсекает ботов
   (honeypot + time-trap), шлёт заявку на общий приёмник форм платформы.

   Данные уходят в единый Supabase «база аудитории» через эндпоинт
   slswiss-tickets /api/forms (тот же, что у chudina/atlasintegra/creox).
   На сервере уже есть: жёсткий Origin-чек, honeypot, time-trap, GDPR-согласие.

   Подключение в калькуляторе (внизу body, после его скрипта):
     <div id="report-capture"></div>
     <script src="report-capture.js"></script>
     <script>
       FPReport.init({
         mount: '#report-capture',
         formKey: 'calc-pension',                 // ключ формы в базе
         title: 'Прислать отчёт на почту?',       // опц.
         getSummary: function () {                 // снимок результатов → в письмо/базу
           return { 'Пенсия, CHF/мес': document.getElementById('totalV').textContent };
         }
       });
     </script>
*/
(function () {
  'use strict';

  // Общий приёмник форм платформы (Next-приложение slswiss-tickets).
  // Формы форума живут на другом домене → это кросс-доменный fetch (CORS).
  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';

  // Быстрее этого времени форму «заполняет» только бот (совпадает с сервером).
  var MIN_FILL_MS = 2500;

  var STYLE_ID = 'fp-report-style';
  var CSS = [
    '.fp-report{background:var(--glass,rgba(255,255,255,.045));border:1px solid var(--line,rgba(255,255,255,.10));',
    'border-radius:20px;padding:22px 24px;backdrop-filter:blur(8px);margin-top:18px}',
    '.fp-report h3{font-family:"Unbounded","Manrope",sans-serif;font-size:17px;font-weight:700;',
    'letter-spacing:-.02em;color:var(--heading,#fff);margin:0 0 4px}',
    '.fp-report p.fp-sub{font-size:13.5px;color:var(--muted,#C3B7D4);margin:0 0 16px}',
    '.fp-report .fp-row{display:flex;gap:10px;flex-wrap:wrap}',
    '.fp-report input[type=email]{flex:1 1 220px;background:rgba(0,0,0,.20);border:1px solid var(--line-strong,rgba(255,255,255,.16));',
    'border-radius:12px;padding:12px 14px;color:var(--ink,#F3EEF9);font:inherit;font-size:15px}',
    '.fp-report input[type=email]:focus{outline:none;border-color:var(--gold,#E6B450)}',
    '.fp-report button{background:linear-gradient(92deg,var(--gold,#E6B450),var(--gold-bright,#F5C969));',
    'color:#231433;border:0;border-radius:12px;padding:12px 20px;font:inherit;font-weight:700;font-size:15px;cursor:pointer}',
    '.fp-report button:disabled{opacity:.55;cursor:default}',
    '.fp-report label.fp-consent{display:flex;align-items:flex-start;gap:9px;cursor:pointer;',
    'font-size:12.5px;color:var(--muted2,#9A8BB3);line-height:1.4;margin-top:12px}',
    '.fp-report label.fp-consent input{accent-color:var(--gold,#E6B450);width:16px;height:16px;margin-top:1px;cursor:pointer}',
    '.fp-report .fp-msg{font-size:13.5px;margin-top:12px;line-height:1.45}',
    '.fp-report .fp-msg.ok{color:var(--green,#8BE59B)}',
    '.fp-report .fp-msg.err{color:var(--red,#FF7A8A)}',
    // honeypot: прячем надёжно (не display:none — некоторые боты его игнорят как «невидимое»)
    '.fp-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    // «поделиться» и подписка — вторичные действия, поэтому контурные кнопки
    '.fp-after{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}',
    '.fp-ghost{background:transparent;border:1px solid var(--line-strong,rgba(255,255,255,.16));',
    'color:var(--ink,#F3EEF9);border-radius:12px;padding:11px 18px;font:inherit;font-size:14px;font-weight:700;cursor:pointer}',
    '.fp-ghost:hover{border-color:var(--gold,#E6B450)}',
    '.fp-hint{font-size:12.5px;color:var(--muted2,#9A8BB3);line-height:1.45;margin-top:8px}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  // Ключ последнего инициализированного калькулятора — чтобы completed()
  // можно было звать без аргумента прямо из кода расчёта.
  var lastFormKey = null;
  var completedSent = {};

  /* Событие «расчёт завершён» — знаменатель конверсии «расчёт → e-mail».
     Без него отправку отчёта не с чем сравнивать: видно, сколько человек
     оставили адрес, и не видно, сколько вообще досчитали.
     Шлём один раз на загрузку страницы: пересчёт ползунком — не новый расчёт.
     FPConsent.track молчит, пока нет согласия на аналитику. */
  function completed(key) {
    var k = key || lastFormKey || 'calculator';
    if (completedSent[k]) return;
    completedSent[k] = true;
    if (window.FPConsent && window.FPConsent.track) {
      window.FPConsent.track('calculator_completed', { form_key: k });
    }
  }

  /* Событие «начал считать» — первое касание любого поля или ползунка.
     Даёт средний шаг воронки: открыл страницу → начал вводить → досчитал →
     оставил адрес. Без него не видно, где именно теряем: на пороге входа
     (страница пугает) или на результате (нечего давать за адрес).
     Ввод в самой карточке захвата e-mail не считается началом расчёта. */
  var startWatched = false;
  function watchStart() {
    if (startWatched) return;
    startWatched = true;
    var fire = function (e) {
      if (e && e.target && e.target.closest && e.target.closest('.fp-report')) return;
      document.removeEventListener('input', fire, true);
      document.removeEventListener('change', fire, true);
      if (window.FPConsent && window.FPConsent.track) {
        window.FPConsent.track('calculator_started', { form_key: lastFormKey || 'calculator' });
      }
    };
    document.addEventListener('input', fire, true);
    document.addEventListener('change', fire, true);
  }

  /** Главная цифра расчёта — первая непустая строка снимка. Для «поделиться». */
  function headline(summary) {
    var keys = Object.keys(summary || {});
    for (var i = 0; i < keys.length; i++) {
      var v = summary[keys[i]];
      if (v != null && String(v).trim()) return keys[i] + ': ' + String(v).trim();
    }
    return '';
  }

  /* Шерабельный результат: одна цифра, которую можно скинуть партнёру, —
     БЕЗ e-mail и без входа. На телефоне открывается системное «Поделиться»,
     на десктопе текст со ссылкой уходит в буфер обмена. */
  function shareRow(getSummary, formKey) {
    var wrap = document.createElement('div');
    wrap.className = 'fp-after';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fp-ghost';
    btn.textContent = '🔗 Поделиться результатом';
    var note = document.createElement('span');
    note.className = 'fp-hint';
    note.style.margin = '0';
    wrap.appendChild(btn);
    wrap.appendChild(note);

    btn.addEventListener('click', function () {
      var summary = {};
      try {
        summary = (typeof getSummary === 'function' && getSummary()) || {};
      } catch (e) {
        summary = {};
      }
      var line = headline(summary);
      var url = location.href.split('#')[0];
      var text = (line ? 'Мой расчёт на Frankenplatz — ' + line + '. ' : '') + 'Посчитай свой:';

      function done(how) {
        note.textContent = how === 'copy' ? 'Скопировано — вставляй в чат.' : '';
        if (window.FPConsent && window.FPConsent.track) {
          window.FPConsent.track('calculator_share', { form_key: formKey, method: how });
        }
      }

      if (navigator.share) {
        navigator.share({ title: 'Frankenplatz — калькуляторы', text: text, url: url })
          .then(function () { done('share'); })
          .catch(function () { /* человек передумал — это не ошибка */ });
        return;
      }
      var payload = text + ' ' + url;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).then(function () { done('copy'); },
          function () { note.textContent = payload; });
      } else {
        note.textContent = payload;
      }
    });

    return wrap;
  }

  function init(opts) {
    opts = opts || {};
    var mount = typeof opts.mount === 'string' ? document.querySelector(opts.mount) : opts.mount;
    if (!mount) return; // нет точки монтирования — тихо выходим
    injectStyle();

    var title = opts.title || 'Прислать отчёт на почту?';
    var sub = opts.sub || 'Оставь e-mail — пришлём результат расчёта и полезные разборы с форума. Без спама.';
    var formKey = opts.formKey || 'calculator';
    lastFormKey = formKey;
    var endpoint = opts.endpoint || ENDPOINT;
    // человекочитаемое имя расчёта — идёт в тему письма-отчёта
    var reportName = opts.reportName || document.title || formKey;

    var card = el(
      '<div class="fp-report">' +
        '<h3></h3>' +
        '<p class="fp-sub"></p>' +
        '<form novalidate>' +
          '<div class="fp-row">' +
            '<input type="email" name="email" placeholder="you@example.ch" autocomplete="email" required>' +
            '<button type="submit"></button>' +
          '</div>' +
          // honeypot — реальный человек это поле не видит и не заполняет
          '<div class="fp-hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
          '<label class="fp-consent"><input type="checkbox" name="consent"><span>Даю согласие на обработку e-mail для отправки отчёта и писем форума (можно отписаться в любой момент).</span></label>' +
          // Отдельное согласие на рассылку. Снята по умолчанию — предустановленная
          // галочка согласием не считается. Адрес выше человек оставляет ради
          // отчёта, новости форума — это другое, поэтому и спрашиваем отдельно.
          '<label class="fp-consent"><input type="checkbox" name="news"><span>Хочу новости форума: программа, спикеры, старт продаж. Отписка — одним кликом в любом письме.</span></label>' +
          '<div class="fp-msg" role="status" aria-live="polite"></div>' +
        '</form>' +
      '</div>'
    );
    card.querySelector('h3').textContent = title;
    card.querySelector('p.fp-sub').textContent = sub;
    card.querySelector('button').textContent = 'Прислать отчёт';
    mount.innerHTML = '';
    mount.appendChild(card);
    // «Поделиться» доступно сразу и без e-mail: результат должен уходить
    // партнёру скриншотом или ссылкой, не требуя от человека ничего взамен.
    mount.appendChild(shareRow(opts.getSummary, formKey));
    watchStart();

    var form = card.querySelector('form');
    var emailInput = form.email;
    var consentInput = form.consent;
    var hpInput = form.website;
    var btn = form.querySelector('button');
    var msg = card.querySelector('.fp-msg');
    var shownAt = Date.now(); // старт time-trap

    function setMsg(text, kind) {
      msg.textContent = text || '';
      msg.className = 'fp-msg' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setMsg('');

      var email = (emailInput.value || '').trim();
      if (!email || email.indexOf('@') < 1) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        emailInput.focus();
        return;
      }
      if (!consentInput.checked) {
        setMsg('Нужно согласие на обработку данных.', 'err');
        return;
      }

      var summary = {};
      try {
        summary = (typeof opts.getSummary === 'function' && opts.getSummary()) || {};
      } catch (err) {
        summary = {};
      }

      btn.disabled = true;
      btn.textContent = 'Отправляю…';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: 'frankenplatz-2026-10', // к какому форуму относится лид
          form_key: formKey,
          kind: 'lead',
          role: reportName,
          source_url: location.href,
          email: email,
          consent: true,
          send_report: true, // просим сервер прислать отчёт на почту юзера
          // отдельное согласие на рассылку → сервер заведёт подписку с
          // двойным подтверждением (письмо со ссылкой)
          newsletter_optin: !!(form.news && form.news.checked),
          website: hpInput.value, // honeypot → сервер отсечёт, если заполнено
          elapsed_ms: Date.now() - shownAt,
          payload: summary
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (data) {
            return { status: r.status, data: data };
          });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            // Конверсия «расчёт → e-mail» (уйдёт только при согласии на cookies)
            if (window.FPConsent) window.FPConsent.track('calculator_report_email', { form_key: formKey });
            card.querySelector('.fp-row').style.display = 'none';
            form.querySelector('.fp-consent').style.display = 'none';
            setMsg('Готово! Отчёт пришлём на ' + email + '.', 'ok');
          } else {
            var err = (res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.';
            setMsg(err, 'err');
            btn.disabled = false;
            btn.textContent = 'Прислать отчёт';
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          btn.disabled = false;
          btn.textContent = 'Прислать отчёт';
        });
    });
  }

  window.FPReport = { init: init, completed: completed, MIN_FILL_MS: MIN_FILL_MS };
})();
