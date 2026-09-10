/* Frankenplatz — «Предложить спикера»: короткая форма вместо полной анкеты.

   Зачем отдельно от анкеты. Анкета (anketa.html) — это 37 вопросов о САМОМ
   человеке: опыт, темы, слоты, гонорар. Она правильная для того, кто хочет
   выступить сам. Но раньше на неё вела и ссылка «Предложить спикера» — а тот,
   кто просто советует хорошего человека, отвечать на 37 вопросов о себе не
   станет и уйдёт. Здесь нужно ровно два поля: кого зовём и где на него
   посмотреть.

   Письмо уходит ТОЛЬКО нам (info@frankenplatz.ch): автоответа отправителю нет
   и быть не должно — он ничего у нас не просил, он сделал одолжение.
   На сервере это обеспечено само: автоответы привязаны к form_key='speaker',
   а здесь ключ другой.

   Модуль перехватывает клики по ссылкам «Предложить спикера» и открывает
   модалку. Отдельным файлом — переживает синк дизайна.

     event    = 'frankenplatz-2026-10'
     form_key = 'speaker-suggest'
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var STYLE_ID = 'fp-sg-style';
  var PAGE_LOADED = Date.now(); // time-trap считаем от загрузки страницы,
  // а не от открытия модалки: с автозаполнением человек успевает быстрее порога.

  var CSS = [
    '.fp-sg-ov{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;justify-content:center;',
    'overflow:auto;padding:40px 16px;background:rgba(13,7,21,.72);backdrop-filter:blur(6px)}',
    '.fp-sg{width:100%;max-width:460px;background:#140A1F;border:1px solid rgba(255,255,255,.12);',
    'border-radius:20px;padding:26px 24px;color:#F3EEF9;font-family:inherit;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
    '.fp-sg h3{margin:0 0 4px;font-family:"Unbounded","Manrope",sans-serif;font-size:22px;font-weight:800}',
    '.fp-sg__sub{margin:0 0 18px;font-size:13.5px;color:#9A8BB3;line-height:1.5}',
    '.fp-sg__x{float:right;margin:-8px -6px 0 0;width:34px;height:34px;border:none;border-radius:50%;',
    'background:rgba(255,255,255,.07);color:#C3B7D4;font-size:20px;line-height:1;cursor:pointer}',
    '.fp-sg label{display:block;font-size:13px;font-weight:600;margin:14px 0 5px}',
    '.fp-sg label .req{color:#E6B450}',
    '.fp-sg input,.fp-sg textarea{width:100%;box-sizing:border-box;background:rgba(0,0,0,.22);',
    'border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:11px 13px;color:#F3EEF9;font:inherit;font-size:15px}',
    '.fp-sg textarea{min-height:76px;resize:vertical}',
    '.fp-sg input:focus,.fp-sg textarea:focus{outline:none;border-color:#E6B450}',
    '.fp-sg__consent{display:flex;gap:9px;align-items:flex-start;margin-top:16px;font-size:12.5px;',
    'line-height:1.45;color:#9A8BB3;cursor:pointer}',
    '.fp-sg__consent input{width:16px;height:16px;margin-top:1px;accent-color:#E6B450;flex:0 0 auto}',
    '.fp-sg__consent a{color:#B98BFF}',
    '.fp-sg__btn{width:100%;margin-top:18px;background:linear-gradient(92deg,#E6B450,#F5C969);color:#231433;',
    'border:0;border-radius:999px;padding:13px 24px;font:inherit;font-weight:800;font-size:15px;cursor:pointer}',
    '.fp-sg__btn:disabled{opacity:.55;cursor:default}',
    '.fp-sg__msg{margin-top:12px;font-size:13.5px;line-height:1.5;min-height:1em}',
    '.fp-sg__msg.ok{color:#8BE59B}.fp-sg__msg.err{color:#FF7A8A}',
    '.fp-sg__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

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
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  function open() {
    if (overlay) return;
    injectStyle();

    overlay = document.createElement('div');
    overlay.className = 'fp-sg-ov';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<form class="fp-sg" novalidate>' +
      '<button class="fp-sg__x" type="button" aria-label="Закрыть">&times;</button>' +
      '<h3>Предложить спикера</h3>' +
      '<p class="fp-sg__sub">Два поля — кого позвать и где на него посмотреть. Остальное выясним сами.</p>' +
      '<label>Кто это <span class="req">*</span></label>' +
      '<input type="text" name="who" placeholder="Имя и фамилия" autocomplete="off">' +
      '<label>Ссылка <span class="req">*</span></label>' +
      '<input type="text" name="link" placeholder="сайт, Instagram, LinkedIn, YouTube…" autocomplete="off">' +
      '<label>Почему стоит позвать</label>' +
      '<textarea name="why" placeholder="Пара слов — по желанию"></textarea>' +
      '<label>Твой e-mail</label>' +
      '<input type="email" name="email" placeholder="если хочешь, чтобы мы ответили" autocomplete="email">' +
      // honeypot — человек этого поля не видит
      '<div class="fp-sg__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="fp-sg__consent"><input type="checkbox" name="consent">' +
      '<span>Даю согласие на обработку данных этой заявки. Указывай только публичные ссылки на человека — личные контакты без его ведома не присылай. ' +
      '<a href="/legal#datenschutz">Политика конфиденциальности</a>.</span></label>' +
      '<button class="fp-sg__btn" type="submit">Отправить</button>' +
      '<p class="fp-sg__msg" role="status" aria-live="polite"></p>' +
      '</form>';

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.fp-sg__x').addEventListener('click', close);

    var form = overlay.querySelector('form');
    var msg = form.querySelector('.fp-sg__msg');
    var btn = form.querySelector('.fp-sg__btn');
    form.querySelector('input[name=who]').focus();

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-sg__msg' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setMsg('');
      var who = (form.who.value || '').trim();
      var link = (form.link.value || '').trim();
      if (!who) { setMsg('Напиши, кого предлагаешь.', 'err'); form.who.focus(); return; }
      if (!link) { setMsg('Нужна ссылка — где на него посмотреть.', 'err'); form.link.focus(); return; }
      if (!form.consent.checked) { setMsg('Нужно согласие на обработку данных.', 'err'); return; }

      btn.disabled = true;
      btn.textContent = 'Отправляю…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,
          form_key: 'speaker-suggest',
          kind: 'lead',
          role: 'Предложить спикера',
          source_url: location.href,
          email: (form.email.value || '').trim(),
          consent: true,
          website: form.website.value,
          elapsed_ms: Date.now() - PAGE_LOADED,
          payload: {
            'Кого предлагают': who,
            'Ссылка': link,
            'Почему стоит позвать': (form.why.value || '').trim()
          }
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.ok) {
            form.innerHTML =
              '<h3>Спасибо!</h3><p class="fp-sg__sub" style="margin-bottom:0">' +
              'Передали команде. Если человек подойдёт по теме — свяжемся с ним сами.</p>';
            if (window.FPConsent && window.FPConsent.track) {
              window.FPConsent.track('speaker_suggest', { form_key: 'speaker-suggest', event_slug: EVENT });
            }
            setTimeout(close, 2600);
          } else {
            btn.disabled = false;
            btn.textContent = 'Отправить';
            setMsg((data && data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'Отправить';
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
        });
    });
  }

  /* Перехватываем ссылки «Предложить спикера» — они ведут на полную анкету.
     Ловим по тексту, а не по href: разметку страниц переписывает дизайн-система,
     а формулировка кнопки живёт дольше. Делегирование на document — работает и
     для кнопок, которые React дорисовал позже. */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a,button');
    if (!el) return;
    if (!/предложить\s+спикера/i.test(el.textContent || '')) return;
    e.preventDefault();
    open();
  });
})();
