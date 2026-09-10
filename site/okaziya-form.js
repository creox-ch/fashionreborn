/* Оказия — реальная отправка обеих форм в общий приёмник /api/forms.

   Дизайн страницы (okaziya) отправку лишь имитирует: кнопки .ok-submit просто
   показывали экран «готово». Этот модуль подключается ОТДЕЛЬНЫМ файлом (как
   site/forum-form.js и site/speaker-form.js) и переживает ре-синк дизайна:
   он сам находит формы, добавляет honeypot и шлёт заявку в базу аудитории.

   Конверт сохранён от прежней рабочей версии страницы (form_key
   okaziya-request / okaziya-listing, kind: application) — чтобы заявки
   продолжали попадать в те же отчёты.

   Поля собираются по разметке дизайна: .ok-fgroup → выбранные чипы,
   label > .ok-flabel → значение поля. Отдельные id есть только у контактных
   полей — остальное берётся по лейблам, поэтому вёрстку можно менять свободно.

   ⚠ При ре-синке дизайна: снова убрать инлайн-демо (см. site/okaziya-ui.js)
   и вернуть <script src="site/okaziya-form.js" defer></script>.
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  // Time-trap считаем от загрузки страницы: форма могла быть открыта давно,
  // иначе сервер отбросил бы нормального человека как бота.
  var PAGE_LOADED = Date.now();

  var FORMS = [
    {
      root: '#okReqForm', done: '#okReqDone', button: '.ok-submit[data-form="okReqForm"]',
      form_key: 'okaziya-request', role: 'Оказия · заявка',
      name: '#okReqName', email: '#okReqEmail', contact: '#okReqContact',
      sending: 'Отправляю…'
    },
    {
      root: '#okPlaceForm', done: '#okPlaceDone', button: '.ok-submit[data-form="okPlaceForm"]',
      form_key: 'okaziya-listing', role: 'Оказия · объявление',
      name: '#okPlaceName', email: '#okPlaceEmail', contact: '#okPlaceContact',
      sending: 'Размещаю…'
    }
  ];

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function txt(el) { return el ? String(el.textContent || '').trim() : ''; }
  function val(el) { return el ? String(el.value || '').trim() : ''; }

  // Telegram отличаем от телефона по ведущему @ — без лишнего поля в форме.
  function splitContact(v) {
    var c = String(v || '').trim();
    return c.charAt(0) === '@' ? { telegram: c, phone: '' } : { telegram: '', phone: c };
  }

  // Скрытое поле-приманка: боты его заполняют, люди — нет.
  function addHoneypot(root) {
    var wrap = document.createElement('div');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';
    wrap.innerHTML = '<label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
    root.appendChild(wrap);
    return wrap.querySelector('input');
  }

  function labelFor(field) {
    var lab = field.closest('label');
    var span = lab && lab.querySelector('.ok-flabel');
    if (span) return txt(span);
    return String(field.getAttribute('placeholder') || '').trim();
  }

  // Собираем человекочитаемый payload прямо из разметки дизайна.
  function collect(root, skip) {
    var out = {};
    function put(k, v) {
      if (!k || !v) return;
      out[k] = out[k] ? out[k] + ' · ' + v : v;
    }

    $$('.ok-fgroup', root).forEach(function (g) {
      var chosen = $$('.ok-chip.is-on', g).map(txt).filter(Boolean);
      if (chosen.length) put(txt(g.querySelector('.ok-flabel')), chosen.join(', '));
    });

    $$('input, textarea, select', root).forEach(function (f) {
      if (f.type === 'checkbox' || f.type === 'hidden' || f.type === 'radio') return;
      if (f.name === 'website') return;                       // honeypot
      if (skip.indexOf('#' + f.id) > -1) return;              // контакты уходят top-level
      if (f.classList.contains('ok-fsel')) return;            // мобильный дубль чипов
      if (f.closest('.ok-fgroup')) return;                    // уже учтено чипами
      var v = val(f);
      if (!v) return;
      // Скрытые блоки (например адрес при «Это я») в заявку не попадают.
      if (f.offsetParent === null && f.type !== 'hidden') return;
      put(labelFor(f), v);
    });

    return out;
  }

  function wire(cfg) {
    var root = $(cfg.root), btn = $(cfg.button), done = $(cfg.done);
    if (!root || !btn || root.dataset.fpWired) return;
    root.dataset.fpWired = '1';

    var hp = addHoneypot(root);
    var err = $('.ok-msg-err', root);
    var label = txt(btn) || 'Отправить';

    function showErr(t) {
      if (err) { err.textContent = t; err.style.display = 'block'; }
      else window.alert(t);
    }
    function clearErr() { if (err) err.style.display = 'none'; }

    btn.addEventListener('click', function () {
      clearErr();

      var emailEl = $(cfg.email, root);
      var email = val(emailEl);
      if (email.indexOf('@') < 1) {
        showErr('Проверь e-mail — кажется, есть опечатка.');
        if (emailEl) emailEl.focus();
        return;
      }

      var unchecked = $$('input[type=checkbox][required]', root).filter(function (c) { return !c.checked; });
      if (unchecked.length) {
        showErr('Отметь оба согласия — без них не отправить.');
        unchecked[0].focus();
        return;
      }

      if (hp && hp.value) return; // приманка заполнена — тихо выходим

      var c = splitContact(val($(cfg.contact, root)));
      var body = {
        source: 'forum',
        form_key: cfg.form_key,
        kind: 'application',
        role: cfg.role,
        source_url: location.href,
        name: val($(cfg.name, root)),
        email: email,
        telegram: c.telegram,
        phone: c.phone,
        consent: true,
        website: hp ? hp.value : '',
        elapsed_ms: Date.now() - PAGE_LOADED,
        payload: collect(root, [cfg.name, cfg.email, cfg.contact])
      };

      btn.disabled = true;
      btn.textContent = cfg.sending;

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (d) { return { status: r.status, data: d }; });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            if (window.FPConsent && window.FPConsent.track) {
              window.FPConsent.track('okaziya_form', { form_key: cfg.form_key });
            }
            root.style.display = 'none';
            btn.style.display = 'none';
            if (done) done.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            showErr((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.');
            btn.disabled = false;
            btn.textContent = label;
          }
        })
        .catch(function () {
          showErr('Сеть недоступна. Попробуй ещё раз чуть позже.');
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  }

  function start() { FORMS.forEach(wire); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
