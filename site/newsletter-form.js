/* Frankenplatz — подписка на рассылку в футере.

   Форма уже свёрстана дизайнером внутри компонента Footer (ds.bundle.js),
   но ничего не делала. Здесь мы её ОЖИВЛЯЕМ, не трогая сам компонент —
   поэтому синхронизация дизайна ничего не сломает.

   Подписчики идут в нашу единую базу аудитории (Supabase submissions)
   через общий приёмник /api/forms, а не в сторонний сервис: так человек,
   который считал калькулятор, подавал анкету и подписался, остаётся
   одним человеком в одной базе.

   Подключение: <script src="site/newsletter-form.js"></script>
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var STYLE_ID = 'fp-nl-style';

  var CSS = [
    '.fp-nl-note{font-size:11.5px;line-height:1.45;color:var(--muted-2,#9A8BB3);margin-top:16px;max-width:420px}',
    '.fp-nl-note a{color:var(--lila-bright,#B98BFF)}',
    '.fp-nl-msg{font-size:12.5px;line-height:1.45;margin-top:8px}',
    '.fp-nl-msg.ok{color:var(--green,#8BE59B)}',
    '.fp-nl-msg.err{color:var(--red,#FF7A8A)}',
    '.fp-nl-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function wire(form) {
    if (form.dataset.fpWired) return;
    form.dataset.fpWired = '1';
    injectStyle();

    // Якорь #subscribe: на форму подписки ведут ссылки из писем-отчётов
    // («Подписаться на новости форума»). Без него человек попадал бы на верх
    // страницы и искал форму сам.
    if (!form.id) form.id = 'subscribe';

    var input = form.querySelector('input[type=email]');
    var btn = form.querySelector('button[type=submit], button');
    if (!input) return;

    var shownAt = Date.now(); // time-trap

    // honeypot — человек это поле не видит
    var hp = document.createElement('div');
    hp.className = 'fp-nl-hp';
    hp.setAttribute('aria-hidden', 'true');
    hp.innerHTML = '<label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(hp);

    // Согласие: у формы одна-единственная цель — подписка, поэтому
    // явное действие (клик по «Подписаться») + видимая рядом сноска
    // и есть согласие. Отдельная галочка сломала бы вёрстку футера.
    var note = document.createElement('p');
    note.className = 'fp-nl-note';
    note.innerHTML = 'Нажимая «Подписаться», ты соглашаешься на обработку e-mail для писем форума. ' +
      'Отписаться можно в любой момент.<br><a href="/legal#datenschutz">Политика конфиденциальности</a>.';
    form.parentNode.insertBefore(note, form.nextSibling);

    var msg = document.createElement('p');
    msg.className = 'fp-nl-msg';
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');
    note.parentNode.insertBefore(msg, note.nextSibling);

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-nl-msg' + (kind ? ' ' + kind : '');
    }

    // ВАЖНО: слушаем в CAPTURE-фазе и глушим всплытие. React-компонент футера
    // из ds.bundle.js вешает СВОЙ onSubmit (e.preventDefault(); setSent(true)),
    // который показывает фейковое «Спасибо!» без всякого бэкенда (дизайн-заглушка).
    // React делегирует submit на корне в bubble-фазе — остановив всплытие здесь,
    // мы не даём фейковому обработчику сработать и шлём заявку по-настоящему.
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      setMsg('');

      var email = String(input.value || '').trim();
      if (!email || email.indexOf('@') < 1) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        input.focus();
        return;
      }

      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Отправляю…'; }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,
          form_key: 'newsletter',
          kind: 'lead',
          role: 'Подписка на рассылку',
          source_url: location.href,
          email: email,
          consent: true,
          website: hp.querySelector('input').value,
          elapsed_ms: Date.now() - shownAt
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (d) { return { status: r.status, data: d }; });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            if (window.FPConsent) window.FPConsent.track('newsletter_subscribe', { form_key: 'newsletter', event_slug: EVENT });
            form.style.display = 'none';
            note.style.display = 'none';
            // double opt-in: подписка активируется только после перехода по
            // ссылке из письма, поэтому обещать «подписали» ещё рано.
            setMsg('Почти готово! Мы отправили письмо на ' + email +
              ' — открой его и подтверди подписку.', 'ok');
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось подписаться. Попробуй ещё раз.', 'err');
            if (btn) { btn.disabled = false; btn.textContent = label; }
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    }, true);
  }

  /** Футер рисуется React-ом асинхронно — ждём появления формы. */
  function start() {
    var f = document.querySelector('.fp-foot__form');
    if (f) { wire(f); return; }
    var tries = 0;
    var timer = setInterval(function () {
      var el = document.querySelector('.fp-foot__form');
      if (el) { wire(el); clearInterval(timer); }
      else if (++tries > 60) clearInterval(timer); // ~15 c
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
