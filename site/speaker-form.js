/* Frankenplatz — анкета спикера.
   Живёт ОТДЕЛЬНЫМ файлом (не внутри Speakers.jsx) специально: страницы и
   компоненты перезаписываются при синхронизации с дизайн-системой, а этот
   файл дизайнер не трогает — форма переживает обновления дизайна.
   В speakers.html нужен всего один <script src="site/speaker-form.js">.

   Заявка уходит в общий приёмник форм платформы (/api/forms) → Supabase
   `submissions` + письмо-уведомление. Анти-бот (honeypot + time-trap),
   жёсткий Origin-чек и GDPR-согласие проверяются на сервере.

   Ключи, по которым потом вычленяются спикеры ИМЕННО этого форума:
     event    = 'frankenplatz-2026-10'
     form_key = 'speaker'
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var STYLE_ID = 'fp-speaker-form-style';

  var CSS = [
    '.fp-sf{background:var(--glass,rgba(255,255,255,.045));border:1px solid var(--line,rgba(255,255,255,.10));',
    'border-radius:22px;padding:clamp(22px,3vw,34px);backdrop-filter:blur(8px);margin-top:26px;text-align:left}',
    '.fp-sf h3{font-family:"Unbounded","Manrope",sans-serif;font-size:clamp(19px,2.4vw,24px);font-weight:700;',
    'letter-spacing:-.02em;color:var(--heading,#fff);margin:0 0 6px}',
    '.fp-sf__sub{font-size:14px;color:var(--muted,#C3B7D4);margin:0 0 22px;line-height:1.5}',
    '.fp-sf__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}',
    '.fp-sf__f{display:flex;flex-direction:column;gap:6px}',
    '.fp-sf__f--wide{grid-column:1/-1}',
    '.fp-sf label{font-size:13px;font-weight:600;color:var(--text,#F3EEF9)}',
    '.fp-sf label .req{color:var(--gold,#E6B450)}',
    '.fp-sf input,.fp-sf textarea,.fp-sf select{background:rgba(0,0,0,.22);border:1px solid var(--line-strong,rgba(255,255,255,.16));',
    'border-radius:12px;padding:11px 13px;color:var(--text,#F3EEF9);font:inherit;font-size:15px;width:100%}',
    '.fp-sf textarea{min-height:96px;resize:vertical}',
    '.fp-sf input:focus,.fp-sf textarea:focus,.fp-sf select:focus{outline:none;border-color:var(--gold,#E6B450)}',
    '.fp-sf select option{background:#1b0f29;color:#F3EEF9}',
    '.fp-sf__consent{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:12.5px;',
    'color:var(--muted-2,#9A8BB3);line-height:1.45;margin-top:18px}',
    '.fp-sf__consent input{width:16px;height:16px;margin-top:1px;accent-color:var(--gold,#E6B450);flex:0 0 auto}',
    '.fp-sf__consent a{color:var(--lila-bright,#B98BFF)}',
    '.fp-sf__actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:20px}',
    '.fp-sf__btn{background:linear-gradient(92deg,var(--gold,#E6B450),var(--gold-bright,#F5C969));',
    'color:var(--ink-on-gold,#231433);border:0;border-radius:999px;padding:13px 28px;font:inherit;',
    'font-weight:700;font-size:15px;cursor:pointer}',
    '.fp-sf__btn:disabled{opacity:.55;cursor:default}',
    '.fp-sf__msg{font-size:14px;line-height:1.5}',
    '.fp-sf__msg.ok{color:var(--green,#8BE59B)}',
    '.fp-sf__msg.err{color:var(--red,#FF7A8A)}',
    '.fp-sf__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

  // Поля анкеты. text → в колонки submissions, остальные → в payload (jsonb).
  var FIELDS = [
    { key: 'name', label: 'Имя и фамилия', type: 'text', required: true, col: true, wide: false },
    { key: 'email', label: 'E-mail', type: 'email', required: true, col: true, wide: false },
    { key: 'telegram', label: 'Telegram или телефон', type: 'text', required: false, col: true, wide: false },
    { key: 'Ссылки', label: 'Сайт / соцсети', type: 'text', required: false, wide: false,
      placeholder: 'linkedin.com/in/… , instagram.com/…' },
    { key: 'Тема выступления', label: 'Тема выступления', type: 'text', required: true, wide: true,
      placeholder: 'Напр.: Säule 3a — сколько реально экономит на налогах' },
    { key: 'О себе и опыте', label: 'О себе и опыте', type: 'textarea', required: true, wide: true,
      placeholder: 'Пара фраз: чем занимаетесь, почему эта тема ваша, был ли опыт выступлений' },
    { key: 'Желаемый день', label: 'Желаемый день', type: 'select', wide: false,
      options: ['Любой', 'День №1 — база', 'День №2 — следующий уровень'] },
    { key: 'Формат', label: 'Формат', type: 'select', wide: false,
      options: ['Доклад', 'Мастер-класс', 'Панель / дискуссия', 'Пока не знаю'] }
  ];

  // Уникальный ASCII-id на поле. По ключу его строить нельзя: ключи
  // кириллические, и «только латиница» схлопнула бы их в одинаковые пустые id.
  FIELDS.forEach(function (f, i) { f.id = 'sf-' + i; });

  function byKey(key) {
    for (var i = 0; i < FIELDS.length; i++) if (FIELDS[i].key === key) return FIELDS[i];
    return null;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function fieldHtml(f) {
    var id = f.id;
    var req = f.required ? ' <span class="req">*</span>' : '';
    var ctrl;
    if (f.type === 'textarea') {
      ctrl = '<textarea id="' + id + '"' + (f.required ? ' required' : '') +
        (f.placeholder ? ' placeholder="' + f.placeholder + '"' : '') + '></textarea>';
    } else if (f.type === 'select') {
      ctrl = '<select id="' + id + '">' +
        f.options.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
    } else {
      ctrl = '<input id="' + id + '" type="' + f.type + '"' + (f.required ? ' required' : '') +
        (f.placeholder ? ' placeholder="' + f.placeholder + '"' : '') + '>';
    }
    return '<div class="fp-sf__f' + (f.wide ? ' fp-sf__f--wide' : '') + '">' +
      '<label for="' + id + '">' + f.label + req + '</label>' + ctrl + '</div>';
  }

  function build() {
    var card = document.createElement('div');
    card.className = 'fp-sf';
    card.id = 'speaker-form';
    card.innerHTML =
      '<h3>Анкета спикера</h3>' +
      '<p class="fp-sf__sub">Короткая форма — 2 минуты. Мы прочитаем каждую заявку и вернёмся с ответом.</p>' +
      '<form novalidate>' +
        '<div class="fp-sf__grid">' + FIELDS.map(fieldHtml).join('') + '</div>' +
        '<div class="fp-sf__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
        '<label class="fp-sf__consent"><input type="checkbox" name="consent">' +
          '<span>Даю согласие на обработку данных для рассмотрения заявки и связи со мной. Подробнее — в <a href="/legal#datenschutz">политике конфиденциальности</a>.</span>' +
        '</label>' +
        '<div class="fp-sf__actions">' +
          '<button type="submit" class="fp-sf__btn">Отправить анкету</button>' +
          '<span class="fp-sf__msg" role="status" aria-live="polite"></span>' +
        '</div>' +
      '</form>';
    return card;
  }

  function wire(card) {
    var form = card.querySelector('form');
    var btn = card.querySelector('.fp-sf__btn');
    var msg = card.querySelector('.fp-sf__msg');
    var shownAt = Date.now(); // старт time-trap

    function val(f) {
      var el = f && f.id ? card.querySelector('#' + f.id) : null;
      return el ? String(el.value || '').trim() : '';
    }
    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-sf__msg' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setMsg('');

      // Проверка обязательных — на клиенте, чтобы не гонять заведомо пустое.
      for (var i = 0; i < FIELDS.length; i++) {
        var f = FIELDS[i];
        if (f.required && !val(f)) {
          setMsg('Заполни поле «' + f.label + '».', 'err');
          var el = card.querySelector('#' + f.id);
          if (el) el.focus();
          return;
        }
      }
      var email = val(byKey('email'));
      if (email.indexOf('@') < 1) { setMsg('Проверь e-mail — кажется, есть опечатка.', 'err'); return; }
      if (!form.consent.checked) { setMsg('Нужно согласие на обработку данных.', 'err'); return; }

      // Контактные поля идут в колонки, содержательные — в payload.
      var payload = {};
      FIELDS.forEach(function (f) {
        if (!f.col && val(f)) payload[f.key] = val(f);
      });

      btn.disabled = true;
      btn.textContent = 'Отправляю…';

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,          // ← отличает спикеров ЭТОГО форума
          form_key: 'speaker',
          kind: 'application',
          role: 'Спикер',
          source_url: location.href,
          name: val(byKey('name')),
          email: email,
          telegram: val(byKey('telegram')),
          consent: true,
          website: form.website.value,       // honeypot
          elapsed_ms: Date.now() - shownAt,  // time-trap
          payload: payload
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (d) { return { status: r.status, data: d }; });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            // Конверсия в аналитику (уйдёт только при согласии на cookies)
            if (window.FPConsent) window.FPConsent.track('speaker_application', { form_key: 'speaker', event_slug: EVENT });
            form.innerHTML = '';
            card.querySelector('.fp-sf__sub').textContent = '';
            card.querySelector('h3').textContent = 'Спасибо! Анкета у нас 🎉';
            var p = document.createElement('p');
            p.className = 'fp-sf__msg ok';
            p.textContent = 'Мы прочитаем её и вернёмся на ' + email + '. Если тема подойдёт — обсудим формат и тайм-слот.';
            form.appendChild(p);
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
            btn.disabled = false;
            btn.textContent = 'Отправить анкету';
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          btn.disabled = false;
          btn.textContent = 'Отправить анкету';
        });
    });
  }

  /** Секция #apply рисуется React-ом асинхронно — ждём её появления. */
  function mount() {
    if (document.getElementById('speaker-form')) return true;
    var section = document.getElementById('apply');
    if (!section) return false;
    var host = section.querySelector('.inner') || section;

    injectStyle();
    var card = build();
    host.appendChild(card);
    wire(card);

    // Кнопка-заглушка ведёт на саму секцию — направим её на форму.
    var cta = section.querySelector('a[href="#apply"]');
    if (cta) {
      cta.setAttribute('href', '#speaker-form');
      cta.addEventListener('click', function () {
        var first = card.querySelector('input, textarea, select');
        if (first) setTimeout(function () { first.focus(); }, 400);
      });
    }
    // Убираем ставшую неверной фразу «Форму подключим скоро».
    Array.prototype.forEach.call(section.querySelectorAll('p'), function (p) {
      if (p.textContent.indexOf('Форму подключим скоро') !== -1) {
        p.textContent = p.textContent.replace(/\s*Форму подключим скоро\.?\s*/, ' ');
      }
    });
    return true;
  }

  function start() {
    if (mount()) return;
    var tries = 0;
    var timer = setInterval(function () {
      if (mount() || ++tries > 60) clearInterval(timer); // ~15 c максимум
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
