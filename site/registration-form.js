/* Frankenplatz — ранняя регистрация: модалка по клику на ссылки «…#reg».

   ⛔ ОТКЛЮЧЕНО 10.08.2026 — модуль не подключён ни на одной странице.

   Причина: продажи билетов открылись, и форма стала конкурировать с покупкой.
   На главной рядом стояли «Получить полную программу» (открывала эту форму) и
   «Купить билет» — два разных обещания без понятной разницы. А письмо-ответ
   регистрации сообщал, что продаж ещё нет, — самому готовому человеку.
   Теперь мягкий вход для тех, кто не готов покупать, — подписка (#subscribe).

   Куда делись входы: кнопка на главной ведёт на #subscribe, призыв в мобильном
   меню — на /tickets. Ссылки вида /#reg из старых писем и закладок открывают
   секцию id="reg" на главной — это блок «Приходи стать богаче» с кнопкой
   покупки, то есть человек попадает на призыв к билету.

   Как вернуть: добавить <script src="site/registration-form.js"></script> на
   нужные страницы и дать любой ссылке адрес, оканчивающийся на #reg. Серверная
   часть цела: form_key='registration' принимается, письмо отправляется.

   Почему «ранняя регистрация» вообще появилась: схемы билетов и цен ещё не
   было. Когда появились — вместо оплаты в этом блоке сделали отдельную
   страницу /tickets.

   Почему модалка по клику, а не автопопап: автопопапы раздражают, режут
   доверие и столкнулись бы с баннером кукисов внизу. Здесь окно открывают
   только сами кнопки «Забронировать место» / «Записаться» — их на сайте 10,
   и со страниц дней они раньше делали ПОЛНУЮ перезагрузку на index.html#reg.
   Теперь форма открывается на месте.

   Модуль отдельный — синхронизация дизайна его не сотрёт.
   Подключение: <script src="site/registration-form.js"></script>
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var STYLE_ID = 'fp-reg-style';
  var uid = 0; // чтобы id полей не дублировались (форма может быть на странице дважды)

  // Time-trap отсчитываем от ЗАГРУЗКИ СТРАНИЦЫ, а не от создания формы.
  // Иначе в модалке таймер стартовал бы в момент открытия окна, и человек
  // с автозаполнением успел бы отправить быстрее порога 2.5 с — сервер
  // молча отбросил бы заявку, показав «Готово». Тихая потеря лида.
  var PAGE_LOADED = Date.now();

  var CSS = [
    '.fp-reg{max-width:560px;margin:26px auto 0;text-align:left;background:var(--glass,rgba(255,255,255,.045));',
    'border:1px solid var(--line-strong,rgba(255,255,255,.16));border-radius:20px;padding:24px 26px;backdrop-filter:blur(8px)}',
    '.fp-reg h3{font-family:"Unbounded","Manrope",sans-serif;font-size:18px;font-weight:700;letter-spacing:-.02em;',
    'color:var(--heading,#fff);margin:0 0 6px}',
    '.fp-reg .fp-reg__sub{font-size:13.5px;color:var(--muted,#C3B7D4);margin:0 0 18px;line-height:1.5}',
    '.fp-reg__grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '@media(max-width:560px){.fp-reg__grid{grid-template-columns:1fr}}',
    '.fp-reg__f{display:flex;flex-direction:column;gap:5px}',
    '.fp-reg__f.wide{grid-column:1/-1}',
    '.fp-reg label{font-size:12.5px;font-weight:600;color:var(--ink,#F3EEF9)}',
    '.fp-reg input[type=text],.fp-reg input[type=email],.fp-reg select{background:rgba(0,0,0,.20);',
    'border:1px solid var(--line-strong,rgba(255,255,255,.16));border-radius:11px;padding:11px 13px;',
    'color:var(--ink,#F3EEF9);font:inherit;font-size:15px;width:100%}',
    '.fp-reg select option{background:#1A0E28;color:#F3EEF9}',
    '.fp-reg input:focus,.fp-reg select:focus{outline:none;border-color:var(--gold,#E6B450)}',
    '.fp-reg__consent{display:flex;align-items:flex-start;gap:9px;cursor:pointer;font-size:12.5px;',
    'color:var(--muted-2,#9A8BB3);line-height:1.45;margin-top:14px}',
    '.fp-reg__consent input{accent-color:var(--gold,#E6B450);width:16px;height:16px;margin-top:1px;cursor:pointer;flex:none}',
    '.fp-reg__consent a{color:var(--lila-bright,#B98BFF)}',
    '.fp-reg__btn{margin-top:16px;width:100%;border:0;border-radius:999px;padding:14px 22px;cursor:pointer;',
    'font:700 15px "Manrope",system-ui,sans-serif;color:#231433;',
    'background:linear-gradient(92deg,var(--gold,#E6B450),var(--gold-bright,#F5C969))}',
    '.fp-reg__btn:disabled{opacity:.55;cursor:default}',
    '.fp-reg__msg{font-size:13.5px;line-height:1.5;margin-top:12px}',
    '.fp-reg__msg.ok{color:var(--green,#8BE59B)}',
    '.fp-reg__msg.err{color:var(--red,#FF7A8A)}',
    '.fp-reg__hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    // модалка
    '.fp-modal{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;',
    'padding:18px;background:rgba(10,5,18,.72);backdrop-filter:blur(6px);overflow-y:auto}',
    '.fp-modal .fp-reg{margin:auto;position:relative;background:#1A0E28;max-height:none}',
    '.fp-modal__x{position:absolute;top:12px;right:14px;width:34px;height:34px;border-radius:50%;',
    'border:1px solid var(--line-strong,rgba(255,255,255,.16));background:rgba(255,255,255,.05);',
    'color:var(--muted,#C3B7D4);font-size:19px;line-height:1;cursor:pointer}',
    '.fp-modal__x:hover{color:#fff}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /** Из калькуляторов ссылка на legal лежит уровнем выше. */
  function legalHref() {
    return '/legal#datenschutz';
  }

  function buildForm() {
    var p = 'fpreg' + (++uid) + '-';
    var box = document.createElement('div');
    box.className = 'fp-reg';
    box.innerHTML =
      '<h3>Ранняя регистрация</h3>' +
      '<p class="fp-reg__sub">Продажи ещё не открыты. Оставь контакты — и ты узнаешь о старте и ценах первым, до публичного анонса.</p>' +
      '<form novalidate>' +
        '<div class="fp-reg__grid">' +
          '<div class="fp-reg__f"><label for="' + p + 'name">Имя</label>' +
            '<input id="' + p + 'name" type="text" name="name" autocomplete="name" placeholder="Как к тебе обращаться"></div>' +
          '<div class="fp-reg__f"><label for="' + p + 'email">E-mail *</label>' +
            '<input id="' + p + 'email" type="email" name="email" autocomplete="email" placeholder="you@example.ch" required></div>' +
          '<div class="fp-reg__f"><label for="' + p + 'day">Что интересует</label>' +
            '<select id="' + p + 'day" name="day">' +
              '<option value="Оба дня">Оба дня</option>' +
              '<option value="День 1 — где деньги и как их не потерять">День 1 — база</option>' +
              '<option value="День 2 — деньги работают на тебя">День 2 — следующий уровень</option>' +
              '<option value="Пока не решено">Пока не решено</option>' +
            '</select></div>' +
          '<div class="fp-reg__f"><label for="' + p + 'seats">Сколько мест</label>' +
            '<select id="' + p + 'seats" name="seats">' +
              '<option value="1">1</option><option value="2">2</option>' +
              '<option value="3">3</option><option value="4">4</option><option value="5+">5 и больше</option>' +
            '</select></div>' +
          '<div class="fp-reg__f wide"><label for="' + p + 'contact">Telegram или телефон (необязательно)</label>' +
            '<input id="' + p + 'contact" type="text" name="contact" placeholder="@nickname или +41 …"></div>' +
        '</div>' +
        '<div class="fp-reg__hp" aria-hidden="true"><label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
        '<label class="fp-reg__consent"><input type="checkbox" name="consent">' +
          '<span>Даю согласие на обработку контактов, чтобы получить информацию о старте продаж и программе. ' +
          'Отписаться можно в любой момент. <a href="' + legalHref() + '">Политика конфиденциальности</a>.</span></label>' +
        '<button type="submit" class="fp-reg__btn">Записаться в ранний список</button>' +
        '<p class="fp-reg__msg" role="status" aria-live="polite"></p>' +
      '</form>';
    wire(box);
    return box;
  }

  function wire(box) {
    var form = box.querySelector('form');
    var msg = box.querySelector('.fp-reg__msg');
    var btn = box.querySelector('.fp-reg__btn');

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-reg__msg' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setMsg('');

      var email = String(form.email.value || '').trim();
      if (!email || email.indexOf('@') < 1) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        form.email.focus();
        return;
      }
      if (!form.consent.checked) {
        setMsg('Нужно согласие на обработку данных.', 'err');
        return;
      }

      var contact = String(form.contact.value || '').trim();
      btn.disabled = true;
      btn.textContent = 'Отправляю…';

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,
          form_key: 'registration',
          kind: 'lead',
          role: 'Ранняя регистрация',
          source_url: location.href,
          name: String(form.name.value || '').trim(),
          email: email,
          // Telegram отличаем от телефона по @ — избавляет от лишнего поля.
          telegram: contact.indexOf('@') === 0 ? contact : '',
          phone: contact.indexOf('@') === 0 ? '' : contact,
          consent: true,
          website: form.website.value,
          elapsed_ms: Date.now() - PAGE_LOADED,
          payload: { 'Интересует': form.day.value, 'Мест': form.seats.value }
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (d) { return { status: r.status, data: d }; });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            if (window.FPConsent) window.FPConsent.track('registration_early', { form_key: 'registration', event_slug: EVENT });
            form.innerHTML = '';
            setMsg('Готово! Ты в раннем списке — подтверждение отправили на ' + email +
                   '. Напишем первым, как только откроются продажи.', 'ok');
            form.appendChild(msg);
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
            btn.disabled = false;
            btn.textContent = 'Записаться в ранний список';
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          btn.disabled = false;
          btn.textContent = 'Записаться в ранний список';
        });
    });
  }

  // ---------- модалка ----------
  var overlay = null;
  var lastFocus = null;

  function closeModal() {
    if (!overlay) return;
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus(); // возвращаем фокус куда был
    lastFocus = null;
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openModal() {
    if (overlay) return;
    injectStyle();
    lastFocus = document.activeElement;

    overlay = document.createElement('div');
    overlay.className = 'fp-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Ранняя регистрация');

    var box = buildForm();
    var x = document.createElement('button');
    x.type = 'button';
    x.className = 'fp-modal__x';
    x.setAttribute('aria-label', 'Закрыть');
    x.innerHTML = '&times;';
    x.addEventListener('click', closeModal);
    box.appendChild(x);

    overlay.appendChild(box);
    // клик мимо карточки закрывает
    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', onKey);

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden'; // фон не скроллим
    var first = box.querySelector('input[type=email]');
    if (first) first.focus();
  }

  /** Кнопки «Забронировать место» / «Записаться» — обычные <a href="...#reg">. */
  function interceptButtons() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href$="#reg"]');
      if (!a) return;
      e.preventDefault();
      openModal();
    });
  }

  // Инлайн-формы в блоке #reg СОЗНАТЕЛЬНО НЕТ: под полупрозрачным фоном
  // модалки просвечивала вторая такая же форма — выглядело как дубль.
  // Форма живёт только в модалке; в блоке #reg остаётся кнопка, которая
  // её открывает (перехватывается тем же обработчиком).

  function start() {
    interceptButtons();
    // Прямая ссылка вида frankenplatz.ch/#reg (из письма, закладки): клика
    // нет, а форма нужна — открываем сами. Это не автопопап: человек сам
    // пришёл по ссылке именно на регистрацию.
    if (location.hash === '#reg') {
      setTimeout(openModal, 600); // даём React дорисовать страницу
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
