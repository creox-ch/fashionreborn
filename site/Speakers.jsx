/* Frankenplatz — Speakers recruitment page. Recreates uploads/speakers.html.
   Exposes window.Speakers. Тексты — дословно из исходника; меняется
   только компоновка и интерактив. */
const {
  TopBar, Footer, Button, Badge, Eyebrow,
  SpeakerCard, ReliefBand,
} = window.FrankenplatzDesignSystem_144b92;

/* Флаг Швейцарии вместо эмодзи — вектор, одинаковый во всех системах. */
function SwissFlag() {
  return (
    <svg className="fp-flag" viewBox="0 0 32 32" role="img" aria-label="Швейцария"><rect width="32" height="32" fill="#FF0000"></rect><rect x="13" y="6" width="6" height="20" fill="#FFFFFF"></rect><rect x="6" y="13" width="20" height="6" fill="#FFFFFF"></rect></svg>
  );
}

const { SpeakerRows } = window.FPSpeakerBits;

const SP_NAV = window.FP_NAV("speakers");

const GIVE = [
  { badge: "Дорога", icon: "horn", title: "Отель и дорога — за наш счёт", body: "Спикерам из других стран оплачиваем отель и расходы на дорогу. Пока без бизнес-класса — но со всей заботой." },
  { badge: "Контент", icon: "cam", title: "Фото и видео, которые работают на тебя годами", body: "Профессиональная съёмка выступления со всех ракурсов и отдельная фотосессия. Готовый контент для соцсетей, сайта и портфолио." },
  { badge: "Образ", icon: "scissors", title: "Стилист и парикмахер на площадке", body: "На месте работает парикмахер-стилист. На сцене и в кадре выглядишь безупречно." },
  { badge: "Прокачка", icon: "mic", title: "Тренеры по выступлениям — лично для тебя", body: "Блок по кинетике — как держать сцену, и блок по речи и голосу. Навык останется с тобой на всю жизнь." },
  { badge: "Атмосфера", icon: "cup", title: "Своя спикерская тусовка", body: "Кофе-брейки, обеды, ужины и отдельная спикерская атмосфера. Связи, которые дороже гонорара." },
  { badge: "Фидбэк", icon: "chart", title: "Живая реакция зала", body: "После выступления собираем оценки и отклики слушателей — увидишь в баллах и словах, как зашла твоя тема." },
  { badge: "Охват", icon: "horn", title: "300 человек в зале — два дня, два контекста", body: "Самый большой известный русскоязычный форум был ~130 человек. У нас зал на 300 — и две разные аудитории за два дня." },
];

/* Тонкие линейные иконки для бейджей карточек «Что даём» (stroke = цвет бейджа) */
function GIcon({ name }) {
  const P = {
    cam: <g><rect x="1.5" y="4" width="9.5" height="8" rx="1.6"></rect><path d="M11 7.4 14.5 5v6L11 8.6"></path></g>,
    scissors: <g><circle cx="4" cy="4.4" r="2"></circle><circle cx="4" cy="11.6" r="2"></circle><path d="M5.7 5.6 14 12M5.7 10.4 14 4"></path></g>,
    mic: <g><rect x="6" y="1.5" width="4" height="7.5" rx="2"></rect><path d="M3.5 7.5a4.5 4.5 0 0 0 9 0M8 12v2.5"></path></g>,
    cup: <g><path d="M3 3h8v5a4 4 0 0 1-8 0V3z"></path><path d="M11 4.5h1.6a1.9 1.9 0 0 1 0 3.8H11M4.5 14h5"></path></g>,
    chart: <g><path d="M3 13V9M8 13V4M13 13V6.5"></path></g>,
    horn: <g><path d="M2 6.5v3h2.5L11 13V3L4.5 6.5H2z"></path><path d="M12.8 6a2.8 2.8 0 0 1 0 4"></path></g>,
  };
  return (
    <svg className="gico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[name]}</svg>
  );
}

function GiveGrid() {
  /* Карточки-перевёртыши: на десктопе — hover + «подмигивание» волной
     при появлении в кадре; на тач-устройствах — автопереворот: карточка,
     попавшая в центральную полосу экрана при скролле, показывает оборот
     и возвращается, когда уходит из центра. Тап тоже работает. */
  const [flipped, setFlipped] = React.useState(() => new Set());
  const gridRef = React.useRef(null);
  const isTouch = React.useMemo(
    () => window.matchMedia("(hover: none)").matches, []
  );

  // десктоп: разовая волна-подсказка
  React.useEffect(() => {
    if (isTouch) return;
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.classList.add("gives--peek");
        io.disconnect();
        // подсказка разовая: снимаем класс после проигрывания,
        // чтобы анимация не мешала hover-перевороту
        setTimeout(() => el.classList.remove("gives--peek"), 1800);
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [isTouch]);

  // мобилка: автопереворот карточек в центральной полосе экрана
  React.useEffect(() => {
    if (!isTouch) return;
    const cards = gridRef.current
      ? gridRef.current.querySelectorAll(".gcard") : [];
    const io = new IntersectionObserver((entries) => {
      setFlipped((prev) => {
        const next = new Set(prev);
        entries.forEach((e) => {
          const i = Number(e.target.dataset.gi);
          if (e.isIntersecting) next.add(i); else next.delete(i);
        });
        return next;
      });
    }, { rootMargin: "-36% 0px -36% 0px", threshold: 0 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [isTouch]);

  const toggle = (i) => setFlipped((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div className="gives" ref={gridRef}>
      {GIVE.map((g, i) => (
        <div
          className={"gcard" + (flipped.has(i) ? " is-flipped" : "")}
          data-gi={i}
          key={g.title}
          onClick={() => toggle(i)}
        >
          <div className="gflip">
            <div className="gface gfront">
              <Badge variant={i % 2 ? "lila" : "gold"}><GIcon name={g.icon} /> {g.badge}</Badge>
              <h3>{g.title}</h3>
            </div>
            <div className="gface gback">
              <p>{g.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* платформа — строки-леджер вместо одинаковых карточек */
const PLATFORM = [
  { badge: "🆓 Размещение", title: "Профиль, бизнес и услуги", body: "Разместись бесплатно — обычно это 199 франков." },
  { badge: "🛍 Продукты", title: "Гайды и курсы в продажу", body: "Есть гайд или курс — размести его в продажу на платформе." },
  { badge: "📈 Доля", title: "Акции AG платформы SVOI", body: "Пакет акций — 5 спикерам с лучшими рейтингами по результатам форума." },
];

function PlatformLedger() {
  return (
    <div className="sp-ledger">
      {PLATFORM.map((r) => (
        <div className="sp-lrow" key={r.title}>
          <div><Badge variant="gold">{r.badge}</Badge></div>
          <div>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* два дня — карточки с буллет-списком тем */
const DAYS = [
  { tab: "День №1", title: "Для обычных людей", sub: "База, с которой начинает каждый.", items: ["Пенсия и налоги", "Страховки", "Подушка безопасности", "Деньги в семье"] },
  { tab: "День №2", title: "Для бизнеса и инвестиций", sub: "Для тех, кто заточен на рост и капитал.", items: ["Инвестиции", "Недвижимость", "Своё дело", "Бизнес-инструменты"], d2: true },
];

function Arr() {
  return (<span className="sp-days__arr" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>);
}

function DaysTabs() {
  return (
    <div className="sp-days">
      {DAYS.map((d) => (
        <div key={d.tab} className={"sp-days__panel" + (d.d2 ? " sp-days__panel--d2" : "")}>
          <span className="sp-days__k">{d.tab}</span>
          <h3>{d.title}</h3>
          <p>{d.sub}</p>
          <ul className="sp-days__list">
            {d.items.map((it) => (<li key={it}><Arr />{it}</li>))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const FORMAT = [
  { title: "Ближе к TED", body: "Единая канва презентаций — общий подход к тому, с чего начинаем и о чём говорим. Все презентации согласовываются и модерируются заранее: будь готова отправить свою не позднее чем за месяц до события.",
    art: (<svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <path fillRule="evenodd" d="M14 24 H106 a8 8 0 0 1 8 8 V88 a8 8 0 0 1 -8 8 H14 a8 8 0 0 1 -8 -8 V32 a8 8 0 0 1 8 -8 Z M48 42 L82 60 L48 78 Z"></path>
    </svg>) },
  { title: "Прикладно", body: "Поднимаем боли, делимся идеями и решениями, заряжаем мотивацией. «Бери и делай»: конкретные шаги, цифры и инструменты, которые зал сможет применить уже на следующей неделе.",
    art: (<svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <g transform="rotate(45 60 60)">
        <path d="M52 5.7 A20 20 0 1 0 68 5.7 L68 24 A8 8 0 0 1 52 24 Z"></path>
        <rect x="53" y="40" width="14" height="40"></rect>
        <path d="M52 114.3 A20 20 0 1 1 68 114.3 L68 96 A8 8 0 0 0 52 96 Z"></path>
      </g>
    </svg>) },
  { title: "Никаких продаж со сцены", body: "Никаких «у меня на курсе». Кейсы и инсайты — если тема зацепит, человек сам найдёт тебя.", more: "Зато есть возможность продавать свои сервисы и услуги через нашу платформу и после ивента — тем, кого твоя тема зацепила.", danger: true,
    art: (<svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <path fillRule="evenodd" d="M60 8 a52 52 0 1 0 0.1 0 Z M60 22 a38 38 0 1 0 0.1 0 Z"></path>
      <rect x="20" y="53" width="80" height="14" rx="7" transform="rotate(45 60 60)"></rect>
    </svg>) },
];

function FormatCards() {
  return (
    <div className="sp-fmt">
      {FORMAT.map((f) => (
        <div key={f.title} className={"sp-fmt__card" + (f.danger ? " sp-fmt__card--danger" : "")}>
          <span className="sp-fmt__deco" aria-hidden="true">{f.art}</span>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
          {f.more ? <details className="sp-fmt__more"><summary>Зато…</summary><p>{f.more}</p></details> : null}
        </div>
      ))}
    </div>
  );
}

function Speakers() {
  const [dealTab, setDealTab] = React.useState("bonuses");
  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <div className="fp-glow fp-glow--amber"></div>

      <TopBar links={SP_NAV} />

      <header className="hero gridbg">
        <div className="inner">
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
            <Badge variant="lila" dot>Спикерам · Frankenplatz 2026</Badge>
          </div>
          <h1>Самый большой русскоязычный форум о деньгах в Швейцарии.<br /><span className="hl">И у тебя есть возможность выйти на его сцену.</span></h1>
          <p className="sub">Зал на 300 человек — и два дня с разным контекстом: до 600 участников за форум. Мы уже знакомы online, и твоя тема может стать одной из сильнейших.</p>
          <div style={{ marginTop: 28 }}>
            <Button variant="gold" href="/anketa">Хочу выступить</Button>
          </div>
        </div>
      </header>

      {/* КТО СТОИТ + МИССИЯ — одна секция: заголовок миссии + карточка организатора */}
      <section id="mission" className="gridbg sp-about">
        <div className="inner">
          <Eyebrow>Кто за этим стоит — и зачем</Eyebrow>
          <h2>В красивой стране<br />— красиво жить</h2>
          <p className="lead">Красиво жить получается, только когда денег достаточно — и когда нет тех самых страхов про них. Поэтому у Frankenplatz большая миссия: прикладное финансовое просвещение для русскоязычных в Швейцарии. Не «успешный успех», а реальные знания.</p>
          <div className="sp-org__card">
            <div className="sp-org__photo sp-org__photo--real"><img src="site/img/moto-event.jpg" width="1280" height="855" loading="lazy" alt="Ксения — организатор форума" /></div>
            <div className="sp-org__body">
              <Eyebrow>Организатор форума</Eyebrow>
              <h3 className="sp-org__name">Ксения Чудина</h3>
              <p className="lead">Я не первый год собираю людей и события.<br />Один из последних кейсов — <a className="grad-link" href="https://motozuerich.ch/" target="_blank" rel="noopener">MOTO-ZÜRICH</a>: событие, которое мы с мужем сделали вдвоём, условно с нуля за полгода — <strong>22 000 человек</strong> в феврале 2026-го. Frankenplatz собираю с тем же подходом: серьёзно, по делу, до мелочей.<br />Другие проекты — на <a className="grad-link" href="https://chudina.me/proekty" target="_blank" rel="noopener">chudina.me</a>.</p>
              <p className="sp-org__why"><span className="sp-org__why-t">Почему это важно тебе:</span> за форумом — человек с опытом крупных мероприятий, а не любительский энтузиазм. Организация, площадка, продакшн, продвижение — всё на уровне. Ты выходишь на подготовленную сцену и к собранной аудитории.</p>
            </div>
          </div>
        </div>
      </section>

      {/* КАК УСТРОЕН ФОРУМ: два дня + формат */}
      <section id="days">
        <div className="inner">
          <Eyebrow>Как устроен форум</Eyebrow>
          <h2>Два дня — и у каждого<br />своя аудитория</h2>
          <p className="lead">Выбирай день под свой профиль — а если тема ложится в оба, выступи и там, и там.</p>
          <DaysTabs />
          <p className="sp-daysnote">💡 Зал бывает разным: чаще женщины, но случается и ровно 50 на 50. День и тайм-слоты отметишь в анкете.</p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", marginTop: 26 }}>
            <Button variant="ghost" href="https://youtube.com/shorts/KDvD4gQr9QQ" target="_blank">▶ Посмотреть локацию — видео</Button>
            <p className="lead" style={{ flex: "1 1 280px", minWidth: 240 }}>Посмотри локацию: <strong>Konnex</strong>, Brown Boveri Str. 7, Baden — сцена, зал и фойе, где всё будет происходить.</p>
          </div>
          <h2 className="sp-fmt-h">Формат — <span className="hl">польза</span>, а не продажа</h2>
          <FormatCards />
        </div>
      </section>

      {/* СДЕЛКА: единый блок с переключателем «Бонусы каждому / А также…» */}
      <section id="how">
        <div className="inner">
          <div className="sp-deal">
            <Eyebrow>Сразу честно</Eyebrow>
            <h2><span className="hl">Спикеры не платят нам. Мы не платим спикерам.</span> Мы даём то, что деньгами не купишь</h2>
            <p className="lead">Сейчас модно, что спикер платит за выход на сцену. У нас такого нет — и гонораров мы тоже не платим. Вместо этого — вот что получает каждый спикер форума.</p>
          </div>

          <div className="sp-switch" role="tablist">
            <button type="button" role="tab" aria-selected={dealTab === "bonuses"}
                    className={"sp-switch__btn" + (dealTab === "bonuses" ? " is-on" : "")}
                    onClick={() => setDealTab("bonuses")}>Бонусы каждому</button>
            <button type="button" role="tab" aria-selected={dealTab === "more"}
                    className={"sp-switch__btn" + (dealTab === "more" ? " is-on" : "")}
                    onClick={() => setDealTab("more")}>Ещё кое-что… 🤫</button>
          </div>

          {dealTab === "bonuses" ? (
            <GiveGrid />
          ) : (
            <div className="sp-more">
              <Eyebrow>Это ещё не всё</Eyebrow>
              <h2>Кое-что, что мы предлагаем только спикерам первого форума</h2>
              <p className="lead">Съёмка и тренеры — это приятно. Но есть кое-что, что выходит далеко за рамки одного дня на сцене. Это получают <strong>только спикеры Frankenplatz 2026</strong> — второго такого предложения не будет, потому что первый форум бывает один раз.</p>
              <div className="sp-more__cards sp-more__cards--3">
                <div className="sp-more__card">
                  <Badge variant="gold">🆓 Размещение</Badge>
                  <h3>Профиль, бизнес и услуги</h3>
                  <p>Размести себя, свой бизнес и услуги на платформе — бесплатно. Обычно это стоит <strong>199 франков</strong>.</p>
                </div>
                <div className="sp-more__card">
                  <Badge variant="lila">🛍 Продукты</Badge>
                  <h3>Гайды и курсы в продажу</h3>
                  <p>Есть гайд, онлайн-курс или продукт? Размести его отдельно в продажу прямо на платформе.</p>
                </div>
                <div className="sp-more__card">
                  <Badge variant="gold">📈 Доля</Badge>
                  <h3>Пакет акций AG платформы SVOI</h3>
                  <p>Под платформу я запускаю AG. Пакет акций — доля в том, что мы строим.</p>
                  <p className="sp-more__mini">Получают 5 спикеров с лучшими рейтингами по результатам форума.</p>
                </div>
              </div>
              <p className="sp-more__lock">🔒 Предложение действует только для спикеров форума 2026 года.</p>
            </div>
          )}
        </div>
      </section>

      {/* КОГО ИЩЕМ */}
      <section id="who">
        <div className="inner">
          <Eyebrow>Кого мы ищем</Eyebrow>
          <h2>Опыт ценим по результату</h2>
          <p className="lead">В основном — тех, кто работает на швейцарской земле, но интересны и европейские кейсы. Регалии вторичны, но <strong>подтверждение финансового или бренд-успеха важно</strong> — будь готова показать его хотя бы организаторам. Говоришь о деньгах или инвестициях — <strong>они у тебя должны быть в количестве выше среднего</strong>. Одно жёсткое исключение: <strong>право, бухгалтерия, налоги и страхование — только со швейцарским дипломом и лицензией</strong>. Личной историей может делиться каждый. А ещё ждём <strong>мотивирующие истории и необычные направления по получению денег</strong> — пока из Европы =)</p>
        </div>
      </section>

      {/* ФИНАЛ: дефицит слотов + заявка */}
      <section id="apply" className="center gridbg">
        <div className="inner">
          <ReliefBand variant="final"
            eyebrow={<Eyebrow center>Спикерам · Frankenplatz 2026</Eyebrow>}
            title={<>Есть тема для нас?<br />Herzlich willkommen!</>}
            action={<Button variant="gold" href="/anketa">Заполнить анкету спикера</Button>}>
            <p className="fp-band__body">Расскажи подробнее — да-да, прямо сразу подробно: о себе, теме и удобных тайм-слотах. Анкета уже открыта. Дата: 24–25 октября 2026 · Baden <SwissFlag /> · 15 мин от Zürich HB.</p>
          </ReliefBand>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.Speakers = Speakers;
