/* Frankenplatz — авто-отправка анкеты спикера в базу.

   Анкета (Anketa.jsx) — это React-квиз: ответы копятся в состоянии и в
   localStorage('fp_anketa_v1'), а в конце показывается экран «Спасибо».
   Дизайнер задумал ручную отправку (скопировать → письмо на info@), но так
   теряются те, кто не дожал ручной шаг.

   Этот модуль НЕ трогает Anketa.jsx (переживает синк дизайна): он ловит
   появление финального экрана (в нём есть <pre class="ank-sum">) и
   дорисовывает блок с галочкой согласия и кнопкой «Отправить организаторам».
   По клику собирает ответы из localStorage и POST-ит в общий приёмник форм
   /api/forms с form_key='speaker' — тот же путь, что рабочая форма спикера:
   заявка садится в базу аудитории, спикеру уходит письмо-подтверждение.
   Ручные кнопки «Скопировать / Открыть письмо» остаются как запасной путь.

   Подключение (в anketa.html, после Anketa.jsx): <script src="site/anketa-form.js"></script>
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var LS = 'fp_anketa_v1';
  var STYLE_ID = 'fp-ank-style';
  var MAX_ANSWER = 1500; // client-side обрезка длинных ответов (лимит payload на сервере)

  // Time-trap от загрузки страницы: анкету из 14 шагов быстрее 2.5 с не пройти,
  // так что живого спикера не отсечём, а прямой скрипт-сабмит — да.
  var PAGE_LOADED = Date.now();

  var CSS = [
    '.fp-ank{background:linear-gradient(135deg,rgba(230,180,80,.10),rgba(185,139,255,.08));',
    'border:1px solid rgba(230,180,80,.35);border-radius:18px;padding:22px 24px;margin:20px 0}',
    '.fp-ank h3{font-family:"Unbounded","Manrope",sans-serif;font-size:18px;font-weight:700;',
    'letter-spacing:-.02em;color:var(--heading,#fff);margin:0 0 6px}',
    '.fp-ank p.fp-ank__sub{font-size:13.5px;color:var(--muted,#C3B7D4);margin:0 0 14px;line-height:1.5}',
    '.fp-ank__row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}',
    '.fp-ank input[type=email]{flex:1 1 240px;background:rgba(0,0,0,.20);',
    'border:1px solid var(--line-strong,rgba(255,255,255,.16));border-radius:12px;padding:12px 14px;',
    'color:var(--ink,#F3EEF9);font:inherit;font-size:15px}',
    '.fp-ank input[type=email]:focus{outline:none;border-color:var(--gold,#E6B450)}',
    '.fp-ank__btn{border:0;border-radius:999px;padding:13px 22px;cursor:pointer;',
    'font:700 15px "Manrope",system-ui,sans-serif;color:#231433;',
    'background:linear-gradient(92deg,var(--gold,#E6B450),var(--gold-bright,#F5C969))}',
    '.fp-ank__btn:disabled{opacity:.55;cursor:default}',
    '.fp-ank__consent{display:flex;align-items:flex-start;gap:9px;cursor:pointer;font-size:12.5px;',
    'color:var(--muted-2,#9A8BB3);line-height:1.45;margin-top:12px}',
    '.fp-ank__consent input{accent-color:var(--gold,#E6B450);width:16px;height:16px;margin-top:1px;cursor:pointer;flex:none}',
    '.fp-ank__consent a{color:var(--lila-bright,#B98BFF)}',
    '.fp-ank__msg{font-size:13.5px;line-height:1.5;margin-top:12px}',
    '.fp-ank__msg.ok{color:var(--green,#8BE59B)}',
    '.fp-ank__msg.err{color:var(--red,#FF7A8A)}',
    '.fp-ank__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function loadAnswers() {
    try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; }
  }

  /** Карта id вопроса → его формулировка, из window.FP_ANKETA. */
  function questionLabels() {
    var map = {};
    var data = window.FP_ANKETA;
    if (!data || !Array.isArray(data.steps)) return map;
    data.steps.forEach(function (s) {
      (s.qs || []).forEach(function (q) {
        if (q && q.id && q.t !== 'note') map[q.id] = q.q || q.id;
      });
    });
    return map;
  }

  function clip(v) {
    var s = String(v);
    return s.length > MAX_ANSWER ? s.slice(0, MAX_ANSWER) + '…' : s;
  }

  /**
   * Плоский payload {формулировка вопроса: ответ} из ответов квиза.
   * Массивы (мультивыбор) склеиваем; поля "<id>_other" дописываем как «другое».
   * Контактные поля (имя/почта/телефон/telegram) уходят top-level, не в payload.
   */
  function buildPayload(answers, labels) {
    var skip = { q1: 1, q41a: 1, q41b: 1, q41c: 1 }; // контакт — отдельно
    var out = {};
    Object.keys(answers).forEach(function (id) {
      if (skip[id]) return;
      if (/_other$/.test(id)) return; // приклеим к базовому ключу ниже
      var label = labels[id];
      if (!label) return; // неизвестный/служебный ключ — пропускаем
      var v = answers[id];
      if (Array.isArray(v)) v = v.join('; ');
      if (v == null || v === '') return;
      var other = answers[id + '_other'];
      if (other) v = (v ? v + '; ' : '') + 'другое: ' + other;
      out[label] = clip(v);
    });
    return out;
  }

  function isEmail(v) {
    return typeof v === 'string' && v.indexOf('@') > 0 && v.indexOf('.') > 0;
  }

  function buildBody(answers, labels, email) {
    return {
      source: 'forum',
      event: EVENT,
      form_key: 'speaker',
      kind: 'application',
      role: 'Анкета спикера',
      source_url: location.href,
      name: answers.q1 || '',
      email: email,
      phone: answers.q41b || '',
      telegram: answers.q41c || '',
      consent: true,
      elapsed_ms: Date.now() - PAGE_LOADED,
      payload: buildPayload(answers, labels)
    };
  }

  function buildCard() {
    injectStyle();
    var answers = loadAnswers();
    var savedEmail = answers.q41a || '';

    var card = document.createElement('div');
    card.className = 'fp-ank';
    card.innerHTML =
      '<h3>Отправить анкету организаторам</h3>' +
      '<p class="fp-ank__sub">Нажми — и анкета уйдёт нам напрямую, копировать вручную не нужно. ' +
      'Подтверждение придёт тебе на почту.</p>' +
      '<div class="fp-ank__row">' +
        '<input type="email" placeholder="e-mail для связи" value="' + savedEmail.replace(/"/g, '&quot;') + '">' +
        '<button type="button" class="fp-ank__btn">Отправить организаторам</button>' +
      '</div>' +
      '<div class="fp-ank__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="fp-ank__consent"><input type="checkbox">' +
        '<span>Даю согласие на обработку данных анкеты для рассмотрения заявки спикера. ' +
        'Отписаться можно в любой момент. <a href="/legal#datenschutz">Политика конфиденциальности</a>.</span></label>' +
      '<p class="fp-ank__msg" role="status" aria-live="polite"></p>';

    var emailInput = card.querySelector('input[type=email]');
    var hpInput = card.querySelector('input[name=website]');
    var consent = card.querySelector('.fp-ank__consent input');
    var btn = card.querySelector('.fp-ank__btn');
    var msg = card.querySelector('.fp-ank__msg');

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-ank__msg' + (kind ? ' ' + kind : '');
    }

    btn.addEventListener('click', function () {
      setMsg('');
      var email = String(emailInput.value || '').trim();
      if (!isEmail(email)) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        emailInput.focus();
        return;
      }
      if (!consent.checked) {
        setMsg('Нужно согласие на обработку данных.', 'err');
        return;
      }
      if (hpInput.value) return; // honeypot заполнен — тихо выходим

      var body = buildBody(loadAnswers(), questionLabels(), email);
      btn.disabled = true;
      btn.textContent = 'Отправляю…';

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
            if (window.FPConsent) window.FPConsent.track('speaker_anketa', { form_key: 'speaker', event_slug: EVENT });
            card.querySelector('.fp-ank__row').style.display = 'none';
            card.querySelector('.fp-ank__consent').style.display = 'none';
            setMsg('Готово! Анкета у нас — подтверждение отправили на ' + email +
                   '. Ответим в течение недели.', 'ok');
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
            btn.disabled = false;
            btn.textContent = 'Отправить организаторам';
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          btn.disabled = false;
          btn.textContent = 'Отправить организаторам';
        });
    });

    return card;
  }

  /** Финальный экран квиза содержит <pre class="ank-sum">. Дорисовываем карточку туда. */
  function enhance() {
    var sum = document.querySelector('.ank-sum');
    if (!sum) return;
    var step = sum.closest ? sum.closest('.ank-step') : sum.parentNode;
    if (!step || step.querySelector('.fp-ank')) return; // уже вставили
    // Ставим карточку авто-отправки ПЕРЕД ручными кнопками (делаем её основным путём).
    var nav = step.querySelector('.ank-nav');
    var card = buildCard();
    if (nav) step.insertBefore(card, nav);
    else step.insertBefore(card, sum);
  }

  function start() {
    enhance(); // вдруг экран уже отрисован
    // Квиз перерисовывается React-ом — следим за появлением финального экрана.
    if (!('MutationObserver' in window)) {
      setInterval(enhance, 500);
      return;
    }
    var mo = new MutationObserver(function () { enhance(); });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // экспорт чистых хелперов — на случай отладки/тестов
  window.FPAnketa = { buildPayload: buildPayload, buildBody: buildBody, questionLabels: questionLabels };
})();
