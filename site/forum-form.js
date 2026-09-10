/* Frankenplatz — оживление форм на самостоятельных страницах форума
   (collaboration / brand-market / trips-подстраницы).

   Эти страницы — статичный HTML со своей инлайн-формой, которая в дизайне
   лишь имитирует отправку (заменяет разметку, никуда не шлёт). Модуль
   подключается ОТДЕЛЬНЫМ файлом (переживает синк дизайна) и по реестру ниже
   находит нужную форму, добавляет галочку согласия + honeypot и шлёт заявку
   в общий приёмник /api/forms (единая база аудитории), как остальные формы
   платформы. Инлайн-заглушку с этих страниц при выкладке удаляем.

   Подключение (в конце body страницы): <script src="site/forum-form.js"></script>
   ⚠ При ре-синке дизайна: заново убрать инлайн-заглушку и вернуть этот <script>.
*/
(function () {
  'use strict';

  var ENDPOINT = 'https://slswiss-tickets.vercel.app/api/forms';
  var EVENT = 'frankenplatz-2026-10';
  var STYLE_ID = 'fp-ff-style';
  // Time-trap от загрузки страницы (не от создания формы) — иначе автозаполнение
  // отправило бы быстрее MIN_FILL_MS и сервер тихо отбросил бы лид.
  var PAGE_LOADED = Date.now();

  // Реестр форм: селектор формы → куда и как слать. Контактные поля уходят
  // top-level, остальные — в payload; чекбокс-группа склеивается в строку.
  var FORMS = [
    {
      form: '#cwForm', form_key: 'collaboration', role: 'Заявка на сотрудничество',
      name: '#cwName', email: '#cwEmail', telegram: '#cwTg',
      fields: [
        ['#cwRole', 'Кто'], ['#cwRefs', 'Референсы'],
        ['#cwPriceType', 'Формат оплаты'], ['#cwPrice', 'Стоимость'], ['#cwMore', 'О себе']
      ],
      checkboxGroup: { container: '.cw-dates', label: 'Даты' }
    },
    {
      // brand-market.html — «У меня вопрос»; поле #bmName приведено к type=email
      form: '#bmForm', form_key: 'market', role: 'Вопрос о маркете',
      email: '#bmName',
      fields: [['#bmWhat', 'Вопрос']]
    },
    {
      // trips/tony-robbins.html — «Забронировать место в группе»; поля без id → по типу
      form: '.gform', form_key: 'trip', role: 'Заявка на поездку · Тони Роббинс',
      name: 'input[type=text]', email: 'input[type=email]', phone: 'input[type=tel]',
      fields: [['select', 'Тип билета'], ['.field.full input', 'Сколько человек едет']]
    },
    {
      /* market-catalog.html — бронь/предложить цену/вопрос по вещи из каталога.
         Одна форма на три сценария: заголовок #mcBookT меняется кнопкой, по нему
         и понятно, чего человек хочет. Что за вещь — берём из открытой карточки
         (она вне формы, поэтому в outside). */
      form: '#mcBook', form_key: 'market-item', role: 'Заявка по вещи · маркет',
      name: '#mcBName', email: '#mcBMail',
      /* Цель обработки называем прямо: контакт уходит продавцу — частному лицу,
         и человек должен узнать об этом до отправки, а не из письма. Условия
         участия рядом, потому что по §1.3 бронирование означает согласие с
         ними — а лежали они только в шапке страницы, не у кнопки. */
      consentNote: 'Имя и e-mail получит продавец вещи, чтобы ответить напрямую.',
      terms: { href: '/brand-market-agb', label: 'Условия участия' },
      /* Код вещи, продавец, цена и ссылка — из скрытых полей, которые кладёт
         site/market-catalog.js. Выскабливание их из вёрстки давало мусор:
         «Продавец: Продавец: Иванна» и слипшиеся старую с новой ценой. */
      fields: [
        ['#mcBookT', 'Тип обращения'], ['#mcBItem', 'Код вещи'],
        ['#mcBPrice', 'Предложенная цена, CHF'], ['#mcBNote', 'Комментарий'],
        ['#mcBSellerN', 'Продавец'], ['#mcBPriceC', 'Цена в каталоге'],
        ['#mcBLink', 'Карточка вещи']
      ],
      outside: [['#mcMName', 'Вещь'], ['#mcMBrand', 'Бренд']]
    },
    {
      // sponsor.html — «Хочу место в фойе»
      form: '#spForm', form_key: 'sponsor', role: 'Заявка спонсора/маркета',
      email: '#spEmail',
      fields: [
        ['#spProduct', 'Продукт/бренд'], ['#spLinks', 'Ссылки'],
        ['#spPrice', 'Ценовая категория'], ['#spMore', 'Подробнее']
      ]
    }
  ];

  // Ссылка на страницу с политикой: из подпапки (trips/) уровнем выше.
  function legalHref() {
    return '/legal#datenschutz';
  }

  var CSS = [
    '.fp-ff-consent{display:flex;align-items:flex-start;gap:9px;cursor:pointer;font-size:12.5px;',
    'color:var(--muted-2,#9A8BB3);line-height:1.45;margin:4px 0 2px}',
    /* Селектор с [type] намеренно: на странице может лежать своё правило вида
       `.kit .mc-book input{width:100%;padding:11px 13px;border:…}` — оно бьёт по
       любому input в форме, включая наш чекбокс. У каталога так и вышло 19.08:
       галочка раздувалась на всю ширину формы (422px вместо 16), а текст
       согласия сжимался в колонку и уезжал за карточку. Поэтому здесь и
       специфичность выше, и все свойства коробки сбрасываются явно. */
    '.fp-ff-consent input[type="checkbox"]{accent-color:var(--gold,#E6B450);',
    'appearance:auto;-webkit-appearance:checkbox;width:16px;min-width:16px;height:16px;min-height:0;',
    'padding:0;margin:1px 0 0;border:0;border-radius:0;background:none;cursor:pointer;flex:none;box-sizing:border-box}',
    /* Текст занимает остаток строки: без этого он тоже сжимается чужим правилом. */
    '.fp-ff-consent span{flex:1 1 auto;min-width:0}',
    '.fp-ff-consent a{color:var(--lila-bright,#B98BFF)}',
    '.fp-ff-msg{font-size:13.5px;line-height:1.5;margin:6px 0 0}',
    '.fp-ff-msg.ok{color:var(--green-text,#8BE59B);font-weight:700}',
    '.fp-ff-msg.err{color:var(--red,#FF7A8A)}',
    '.fp-ff-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Значение поля. Читаем и value, и текст: часть «полей» — это не инпуты,
     а заголовки, по которым и понятно, чего человек хочет. Раньше тут стоял
     только value, и «Тип обращения» из заголовка #mcBookT терялся всегда —
     бронь, торг и вопрос приезжали в почту неразличимыми. */
  function val(root, sel) {
    var el = sel && root.querySelector(sel);
    if (!el) return '';
    var v = el.value != null && el.value !== '' ? el.value : el.textContent || '';
    return String(v).trim();
  }

  function wire(cfg) {
    var form = document.querySelector(cfg.form);
    if (!form || form.dataset.fpWired) return;
    form.dataset.fpWired = '1';
    injectStyle();

    var btn = form.querySelector('button[type=submit]') || form.querySelector('button');

    var hp = document.createElement('div');
    hp.className = 'fp-ff-hp';
    hp.setAttribute('aria-hidden', 'true');
    hp.innerHTML = '<label>Не заполняйте<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';

    /* Текст согласия. Собирается из частей, потому что у форм разные цели.
       Про отписку тут больше ни слова: все формы этого реестра — разовые
       заявки, а не подписка, и фраза «отписаться можно в любой момент»
       создавала впечатление, что человек подписывается на рассылку.
       consentNote — цель обработки, если она не очевидна из формы.
       terms — документ, с которым человек соглашается действием. */
    var consentParts = ['Даю согласие на обработку данных заявки.'];
    if (cfg.consentNote) consentParts.push(cfg.consentNote);
    var links = '<a href="' + legalHref() + '">Политика конфиденциальности</a>';
    if (cfg.terms) links += ' · <a href="' + cfg.terms.href + '">' + cfg.terms.label + '</a>';
    var consentLabel = document.createElement('label');
    consentLabel.className = 'fp-ff-consent';
    consentLabel.innerHTML =
      '<input type="checkbox"><span>' + consentParts.join(' ') + '<br>' + links + '.</span>';

    var msg = document.createElement('p');
    msg.className = 'fp-ff-msg';
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');

    if (btn) { form.insertBefore(hp, btn); form.insertBefore(consentLabel, btn); }
    else { form.appendChild(hp); form.appendChild(consentLabel); }
    form.appendChild(msg);

    var consent = consentLabel.querySelector('input');
    var hpInput = hp.querySelector('input');

    function setMsg(t, kind) {
      msg.textContent = t || '';
      msg.className = 'fp-ff-msg' + (kind ? ' ' + kind : '');
    }

    var btnLabel = btn ? btn.textContent : '';

    /* Возврат формы в исходное состояние.

       Нужен там, где форма одна на много карточек: в каталоге бренд-маркета
       #mcBook живёт в модалке и переиспользуется для каждой вещи. После
       успешной отправки поля скрыты, поэтому на следующей вещи человек видел
       чужое «Готово! Заявка у нас» и не видел формы вообще — отправить заявку
       по второй вещи было нельзя до перезагрузки страницы. */
    function reset() {
      Array.prototype.forEach.call(form.children, function (c) { c.style.display = ''; });
      setMsg('');
      if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
      // Контакты оставляем: человек смотрит несколько вещей подряд и вводить
      // их заново незачем. Остальное относилось к прошлой вещи.
      // Селекторы есть не у всех форм (у «Вопроса о маркете» только email),
      // а querySelector(undefined) бросает исключение.
      var keep = [cfg.name, cfg.email, cfg.telegram, cfg.phone]
        .filter(Boolean)
        .map(function (sel) { return form.querySelector(sel); });
      Array.prototype.forEach.call(form.querySelectorAll('input,textarea'), function (el) {
        if (el === hpInput || el === consent || el.type === 'hidden') return;
        if (keep.indexOf(el) >= 0) return;
        el.value = '';
      });
      // Согласие снимаем: новая заявка — новое согласие, а не унаследованное
      // от предыдущей вещи.
      if (consent) consent.checked = false;
    }

    /* Сбрасываем в момент, когда форму снова показывают. Слушаем сам атрибут
       hidden, а не событие страницы: так модуль не знает про каталог, его
       модалку и кнопки — и работает на любой странице, где форму прячут. */
    if (typeof MutationObserver === 'function') {
      new MutationObserver(function () {
        if (!form.hidden) reset();
      }).observe(form, { attributes: true, attributeFilter: ['hidden'] });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setMsg('');

      var email = val(form, cfg.email);
      if (email.indexOf('@') < 1) {
        setMsg('Проверь e-mail — кажется, есть опечатка.', 'err');
        return;
      }
      if (!consent.checked) {
        setMsg('Нужно согласие на обработку данных.', 'err');
        return;
      }
      if (hpInput.value) return; // honeypot заполнен — тихо выходим

      var payload = {};
      (cfg.fields || []).forEach(function (f) {
        var v = val(form, f[0]);
        if (v) payload[f[1]] = v;
      });
      /* Контекст за пределами формы: карточка товара, выбранный тариф и т.п.
         Без него заявка «хочу забронировать» не говорит, ЧТО забронировать. */
      (cfg.outside || []).forEach(function (f) {
        var el = document.querySelector(f[0]);
        var v = el ? String(el.value != null && el.value !== '' ? el.value : el.textContent || '').trim() : '';
        if (v) payload[f[1]] = v;
      });
      if (cfg.checkboxGroup) {
        var cont = form.querySelector(cfg.checkboxGroup.container);
        if (cont) {
          var chosen = Array.prototype.slice
            .call(cont.querySelectorAll('input[type=checkbox]:checked'))
            .map(function (c) { return c.value; });
          if (chosen.length) payload[cfg.checkboxGroup.label] = chosen.join('; ');
        }
      }

      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Отправляю…'; }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'forum',
          event: EVENT,
          form_key: cfg.form_key,
          kind: 'lead',
          role: cfg.role,
          source_url: location.href,
          name: val(form, cfg.name),
          email: email,
          telegram: val(form, cfg.telegram),
          phone: val(form, cfg.phone),
          consent: true,
          website: hpInput.value,
          elapsed_ms: Date.now() - PAGE_LOADED,
          payload: payload
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (d) { return { status: r.status, data: d }; });
        })
        .then(function (res) {
          if (res.status >= 200 && res.status < 300 && res.data && res.data.ok) {
            if (window.FPConsent) window.FPConsent.track('forum_form', { form_key: cfg.form_key });
            // прячем все поля формы, оставляем сообщение об успехе
            Array.prototype.forEach.call(form.children, function (c) {
              if (c !== msg) c.style.display = 'none';
            });
            setMsg('Готово! Заявка у нас — ответим на ' + email + '.', 'ok');
          } else {
            setMsg((res.data && res.data.error) || 'Не получилось отправить. Попробуй ещё раз.', 'err');
            if (btn) { btn.disabled = false; btn.textContent = label; }
          }
        })
        .catch(function () {
          setMsg('Сеть недоступна. Попробуй ещё раз чуть позже.', 'err');
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  }

  function start() {
    FORMS.forEach(function (cfg) {
      if (document.querySelector(cfg.form)) wire(cfg);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.FPForumForm = { wire: wire, FORMS: FORMS };
})();
