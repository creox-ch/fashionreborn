/* Frankenplatz — marketing UI kit: participant landing page.
   Recreates uploads/index.html using the design-system components.
   Exposes window.Landing. */
const {
  TopBar, Footer, Button, Badge, Eyebrow, Marquee,
  Card, StatCard, SpeakerCard, ReliefBand, ComparisonTable, FAQItem,
} = window.FrankenplatzDesignSystem_144b92;
const { SpeakerRows, SpeakerDayBlock, SpeakerStrip } = window.FPSpeakerBits;

/* Флаг Швейцарии вместо эмодзи: вектор, поэтому резкий на любом кегле
   и одинаковый во всех системах (эмодзи каждая ОС рисует по-своему). */
/* Подменяет маркер-эмодзи в готовой строке на нарисованный флаг —
   нужно там, где строку разбирает код (tag у DayCard) и её нельзя порвать. */
function flagify(t) {
  if (typeof t !== "string" || t.indexOf("🇨🇭") < 0) return t;
  const out = [];
  t.split("🇨🇭").forEach((p, i) => {
    if (i) out.push(<SwissFlag key={"f" + i} />);
    if (p) out.push(<span key={"t" + i}>{p}</span>);
  });
  return out;
}

function SwissFlag() {
  return (
    <svg className="fp-flag" viewBox="0 0 32 32" role="img" aria-label="Швейцария">
      <rect width="32" height="32" fill="#FF0000"></rect>
      <rect x="13" y="6" width="6" height="20" fill="#FFFFFF"></rect>
      <rect x="6" y="13" width="20" height="6" fill="#FFFFFF"></rect>
    </svg>
  );
}

function DayCard({ tag, title, sub, items, href, label, d2 }) {
  return (
    <Card fill="glass" tone={d2 ? "lila" : "gold"} className={"day " + (d2 ? "day--d2" : "day--d1")}>
      <span className="tag">{tag.split(" · ")[0]}{tag.split(" · ").length > 1 ? <span className="tag__note"> · {tag.split(" · ").slice(1).join(" · ")}</span> : null}</span>
      <h3>{title}</h3>
      <p className="sub">{sub}</p>
      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
      <a className="day__more" href={href}>
        <span>{label}</span>
        <span className="day__arrow" aria-hidden="true">→</span>
      </a>
    </Card>
  );
}

function SpeakerType({ badge, title, body, example, accent }) {
  return (
    <Card fill="glass" tone="none" className={"sp sp--" + accent}>
      <div style={{ marginBottom: 14 }}><Badge variant="gold">{badge}</Badge></div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="ex">Например: <b>{example}</b></div>
    </Card>
  );
}

function CalcModal({ calc, onClose }) {
  if (!calc) return null;
  return (
    <div className="fp-modal-bg" onClick={onClose}>
      <div className="fp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Закрыть">✕</button>
        <div style={{ fontSize: 34, marginBottom: 8 }}>{calc.icon}</div>
        <h3>{calc.title}</h3>
        <p style={{ color: "var(--muted)", fontSize: 15, margin: "0 0 4px" }}>{calc.result}</p>
        <div className="barwrap"><div className="bar" style={{ width: calc.pct }}></div></div>
        <p style={{ color: "var(--muted-2)", fontSize: 13, margin: "0 0 20px" }}>Базовый результат — бесплатно. Полный отчёт откроется после регистрации.</p>
        <Button variant="gold" block onClick={onClose}>Купить билет и открыть отчёт</Button>
      </div>
    </div>
  );
}

const CALCS = [
  { icon: "🧾", title: "Семейный бюджет, или куда испаряются франки", href: "/calculators/budget", body: "Зарплата швейцарская, а к 25-му числу на счету тишина? Krankenkasse, налоги, аренда — посмотри, где течёт, пока не утекло всё.", result: "Твоя оценка утечек: заметная. В среднем можно откладывать больше.", pct: "62%", kind: "people" },
  { icon: "🏡", title: "Аренда или покупка, или чью ипотеку ты платишь", href: "/calculators/rent-vs-buy", body: "Ипотеку ты платишь в любом случае — вопрос, свою или хозяина квартиры. Посчитай, что выгоднее в твоём случае, а не «как у всех».", result: "В твоём сценарии аренда пока выгоднее покупки.", pct: "48%", kind: "house" },
  { icon: "👵", title: "Пенсия в Швейцарии, или сколько тебе светит", href: "/calculators/pension", body: "Спойлер: меньше, чем ты думаешь. AHV и BVG без 3a — не старость мечты. Посчитай свой дефицит, пока есть время его закрыть.", result: "Прогноз: заметный дефицит без 3a. Есть куда действовать.", pct: "40%", kind: "clock" },
  { icon: "📈", title: "Зрелость бизнеса, или почему ты всё ещё делаешь всё сам", href: "/calculators/shares", body: "Идея есть, руки заняты, роста нет? Проверь, где застрял твой бизнес — и что честно мешает следующему уровню.", result: "Стадия: ранний рост. Узкое место — систематизация.", pct: "55%", kind: "money" },
  { icon: "🧮", title: "Семейные налоги, или сколько ты даришь кантону", href: "/calculators/taxes", body: "Платишь «как все» — значит, переплачиваешь. Вычеты, кантон, декларация: посмотри, где спрятан твой резерв.", result: "Есть неочевидный резерв по кантону и вычетам.", pct: "58%", kind: "chart" },
];

const CALC_DECOS = {
  people: (
    <svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <circle cx="20" cy="67" r="6" /><path d="M13 98v-16a7 7 0 0 1 14 0v16z" />
      <circle cx="42" cy="53" r="8" /><path d="M32 101v-28a10 10 0 0 1 20 0v28z" />
      <circle cx="66" cy="49.5" r="8.5" /><path d="M55 103v-32a11 11 0 0 1 22 0v32z" />
      <circle cx="90" cy="62.5" r="6.5" /><path d="M82 99v-20a8 8 0 0 1 16 0v20z" />
      <circle cx="110" cy="69.5" r="6" /><path d="M103.5 98v-14a6.5 6.5 0 0 1 13 0v14z" />
    </svg>
  ),
  house: (
    <svg viewBox="0 0 120 120" fill="currentColor" stroke="none" fillRule="evenodd" aria-hidden="true">
      <path d="M6 62 40 32 74 62 Z" />
      <path d="M16 62 H64 V104 H16 Z M23 69 H34 V79 H23 Z M40 104 V82 H50 V104 Z" />
      <path d="M80 46 H116 V104 H80 Z M86 53 H96 V62 H86 Z M100 53 H110 V62 H100 Z M86 68 H96 V77 H86 Z M100 68 H110 V77 H100 Z M86 83 H96 V92 H86 Z M100 83 H110 V92 H100 Z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <path fillRule="evenodd" d="M64 16 a42 42 0 1 0 0.1 0 Z M64 21 a37 37 0 1 0 0.1 0 Z" />
      <circle cx="64" cy="27" r="1.8" /><circle cx="79.5" cy="31.2" r="1.8" /><circle cx="90.8" cy="42.5" r="1.8" /><circle cx="95" cy="58" r="1.8" />
      <circle cx="90.8" cy="73.5" r="1.8" /><circle cx="79.5" cy="84.8" r="1.8" /><circle cx="64" cy="89" r="1.8" /><circle cx="48.5" cy="84.8" r="1.8" />
      <circle cx="37.2" cy="73.5" r="1.8" /><circle cx="33" cy="58" r="1.8" /><circle cx="37.2" cy="42.5" r="1.8" /><circle cx="48.5" cy="31.2" r="1.8" />
      <path d="M62 58 L64 32 L66 58 Z" />
      <path d="M64 56 L88 68 L64 60 Z" />
      <circle cx="64" cy="58" r="4" />
      <path d="M14 81 H42 V84 H14 Z" /><path d="M16 84 H40 L29.5 96.5 L40 109 H16 L26.5 96.5 Z" /><path d="M14 109 H42 V112 H14 Z" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <g transform="rotate(-8 59 45)">
        <path fillRule="evenodd" d="M29 30 H89 a5 5 0 0 1 5 5 V55 a5 5 0 0 1 -5 5 H29 a5 5 0 0 1 -5 -5 V35 a5 5 0 0 1 5 -5 Z M59 37 a8 8 0 1 0 0.1 0 Z M33 35 a2.2 2.2 0 1 0 0.1 0 Z M85 53 a2.2 2.2 0 1 0 0.1 0 Z" />
      </g>
      <g transform="rotate(5 73 81)">
        <path fillRule="evenodd" d="M43 66 H103 a5 5 0 0 1 5 5 V91 a5 5 0 0 1 -5 5 H43 a5 5 0 0 1 -5 -5 V71 a5 5 0 0 1 5 -5 Z M73 73 a8 8 0 1 0 0.1 0 Z M47 71 a2.2 2.2 0 1 0 0.1 0 Z M99 89 a2.2 2.2 0 1 0 0.1 0 Z" />
      </g>
      <path fillRule="evenodd" d="M12 88 a12 4.5 0 0 1 24 0 V104 a12 4.5 0 0 1 -24 0 Z M14 93 H34 V94.5 H14 Z M14 98.5 H34 V100 H14 Z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 120 120" fill="currentColor" stroke="none" aria-hidden="true">
      <path fillRule="evenodd" d="M28 44 L28 26 A18 18 0 1 1 15.3 31.3 Z M28 39 a5 5 0 1 0 0.1 0 Z" />
      <rect x="50" y="72" width="13" height="34" rx="3.5" />
      <rect x="70" y="58" width="13" height="48" rx="3.5" />
      <rect x="90" y="44" width="13" height="62" rx="3.5" />
      <path d="M46 68 L68 46 L80 52 L96 32" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 24 L102 37 L90 28 Z" />
    </svg>
  ),
};

function CalcDeco({ kind }) {
  return <span className={"calc-deco calc-deco--" + kind} aria-hidden="true">{CALC_DECOS[kind]}</span>;
}

function ruDays(n) {
  const a = n % 10, b = n % 100;
  if (b >= 11 && b <= 14) return "дней";
  if (a === 1) return "день";
  if (a >= 2 && a <= 4) return "дня";
  return "дней";
}

const CAL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2.5"></rect>
    <path d="M3 9.5h18M8 3v4M16 3v4"></path>
    <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2"></path>
  </svg>
);

const FORUM_START = new Date("2026-10-24T09:00:00");

function cdParts() {
  const left = Math.max(0, FORUM_START - Date.now());
  const pad = (v) => String(v).padStart(2, "0");
  const d = Math.floor(left / 864e5);
  return [[String(d), ruDays(d)], [pad(Math.floor(left / 36e5) % 24), "часов"], [pad(Math.floor(left / 6e4) % 60), "минут"], [pad(Math.floor(left / 1e3) % 60), "секунд"]];
}

function Countdown() {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    // тикаем без setState: меняем только текст цифр, React-дерево не перерисовывается
    const tick = () => {
      if (!rootRef.current) return;
      const ns = rootRef.current.querySelectorAll(".cd-tile__n");
      const ls = rootRef.current.querySelectorAll(".cd-tile__l");
      cdParts().forEach((sg, i) => {
        if (ns[i] && ns[i].textContent !== sg[0]) ns[i].textContent = sg[0];
        if (ls[i] && ls[i].textContent !== sg[1]) ls[i].textContent = sg[1];
      });
    };
    const iv = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(iv); document.removeEventListener("visibilitychange", tick); };
  }, []);
  const SEGS = cdParts();
  return (
    <a className="cd-tix" href="/tickets" ref={rootRef}>
      <span className="cd-tix__top">
        <span className="cd-tix__brand">Frankenplatz ’26</span>
        <span className="cd-tix__loc">Baden <SwissFlag /></span>
      </span>
      <span className="cd-tix__cap">До форума осталось</span>
      <span className="cd-tiles">
        {SEGS.map((sg, i) => (
          <span key={i} className="cd-tile"><span className="cd-tile__n">{sg[0]}</span><span className="cd-tile__l">{sg[1]}</span></span>
        ))}
      </span>
      <span className="cd-tix__cut" aria-hidden="true"></span>
      <span className="cd-tix__stub">
        <span className="cd-tix__date">24–25 октября 2026</span>
        <span className="cd-tix__go">Купить билет <span aria-hidden="true">→</span></span>
      </span>
    </a>
  );
}

function SpeakBox() {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState("");
  const [v, setV] = React.useState(() => localStorage.getItem("fp_speak_email") || "");
  if (done) return (
    <div className="speakbox">
      <p className="speakbox__ok">Готово! Письмо с деталями — что, как и в каком формате — уже летит на <strong>{done}</strong>.</p>
    </div>
  );
  return (
    <div className="speakbox">
      {!open ? (
        <Button variant="ghost" onClick={() => setOpen(true)}>Хочу выступить — как?</Button>
      ) : (
        <form className="speakbox__form" onSubmit={(e) => { e.preventDefault(); if (!v.trim()) return; localStorage.setItem("fp_speak_email", v.trim()); setDone(v.trim()); }}>
          <input type="email" required placeholder="Твой e-mail" value={v} onChange={(e) => setV(e.target.value)} />
          <Button variant="gold" type="submit">Получить инфо для спикера</Button>
        </form>
      )}
    </div>
  );
}

function SponsorBox() {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState("");
  const [v, setV] = React.useState("");
  if (done) return <p className="speakbox__ok">Готово! В ответ пришлём прайс и план фойе — на <strong>{done}</strong>.</p>;
  if (!open) return <Button variant="ghost" onClick={() => setOpen(true)}>Спонсорам и маркету</Button>;
  return (
    <form className="speakbox__form" onSubmit={(e) => { e.preventDefault(); if (!v.trim()) return; localStorage.setItem("fp_sponsor_email", v.trim()); setDone(v.trim()); }}>
      <input type="email" required placeholder="Твой e-mail — пришлём условия" value={v} onChange={(e) => setV(e.target.value)} />
      <Button variant="gold" type="submit">Получить условия маркета</Button>
    </form>
  );
}

function Landing() {
  const [calc, setCalc] = React.useState(null);
  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <div className="fp-glow fp-glow--amber"></div>

      <TopBar links={window.FP_NAV("index")} />

      {/* HERO */}
      <header className="hero gridbg">
        <div className="inner hero-split">
          <div>
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
              <Badge variant="lila" dot><span className="bdg-stack"><span className="fp-nb">24–25 октября 2026</span><span className="bdg-sep"> · </span><span className="bdg-row"><span className="fp-nb">Baden <SwissFlag /></span> · <span className="fp-nb">15 мин от Zürich HB</span></span></span></Badge>
            </div>
            <h1>Самый большой<br />русскоязычный форум<br />о деньгах <span className="hl">в Швейцарии</span></h1>
            <p className="hero-sub2">Где деньги в Швейцарии — как их найти и не потерять</p>
            <p className="sub">Одна из самых богатых стран мира — а ощущения богатства нет? Два дня среди своих, чтобы увидеть всю карту: пенсия, налоги, инвестиции, бизнес, недвижимость, защита семьи.</p>
            <div style={{ marginTop: 28 }}>
              <Button variant="gold" href="/tickets">Купить билет</Button>
            </div>
          </div>
        </div>
        <div className="inner">
          <div className="hero-figure">
            <img className="hero-cows" src="site/img/cows-porsche-road.jpg" width="1672" height="941" alt="" aria-hidden="true" />
            <Countdown />
          </div>
        </div>
      </header>

      <Marquee items={["Самый большой русскоязычный форум о деньгах в Швейцарии", "Говорим открыто", "Делимся прожитым опытом", "Только польза и инсайты", "Швейцарская конкретика", "Свои люди"]} />

      {/* ПРОГРАММА */}
      <section id="program" className="gridbg">
        <div className="inner">
          <Eyebrow>Программа</Eyebrow>
          <h2>Два дня — <span className="hl">полное погружение</span> в структуру и возможности швейцарских финансов</h2>
          <div className="grid g2">
            <DayCard tag="День №1 · база 🇨🇭" title="База 🇨🇭 финансов"
              sub="С которой стоит начать каждому в Швейцарии." href="/day1" label="Смотреть темы Дня № 1"
              items={["Работа: поиск, условия и типы контрактов в Швейцарии — и о каких пособиях ты не знаешь", "Семейный бюджет: как он устроен — и как может быть устроен ещё", "Пенсия AHV / BVG / 3a: сколько тебе реально светит (спойлер: меньше)", "Налоги, страховки, ипотека: где ты переплачиваешь прямо сейчас", "Самозанятость и ферайны: как начать и не налететь на штрафы", "Любовь и деньги: что будет с твоим при браке и разводе", "Неочевидные источники дохода и с чего начать свой бизнес"]} />
            <DayCard d2 tag="День №2 · LvL UP" title="LvL UP: следующий уровень"
              sub="Для тех, кто готов расти дальше." href="/day2" label="Смотреть темы Дня № 2"
              items={["Деньги лежат на счету и тают? Портфельное инвестирование в Швейцарии", "Недвижимость: где и какая недвижимость — актив. ROI и сделки", "Неочевидные инвестиции", "Клиенты не приходят сами: маркетинг, PR и развитие бизнеса", "Тебя никто не знает — личный бренд и нетворкинг («витамин B»)", "Партнёрства: как не потерять деньги и дружбу", "Масштабирование и налоговое планирование", "Финансовая стратегия: как из отдельных решений собирается система", "Откуда и сколько денег нужно на бизнес в Швейцарии", "Бизнес-стратегии и жизнь: как расти, не выгорая"]} />
          </div>
        </div>
      </section>

      {/* ПОЛЬЗА */}
      <section id="value" className="gridbg">
        <div className="inner">
          <Eyebrow>Что ты уносишь</Eyebrow>
          <h2>Знания, которые останутся<br />с тобой навсегда</h2>
          <p className="lead">За два дня ты получаешь то, на что обычно уходят годы.<br />Frankenplatz собирает всё в одной точке — и это знание остаётся с тобой на всю жизнь.</p>
          <div className="grid g3">
            <Card tone="gold" num="01" title="Полная карта финансов"><strong>Все области сразу</strong> — пенсия, налоги, инвестиции, бизнес, недвижимость, защита семьи.</Card>
            <Card tone="gold" num="02" title="Экономия тысяч франков">На ошибках со <strong>страховкой, ипотекой, пенсионной кассой</strong> и упущенном 3a.</Card>
            <Card tone="gold" num="03" title="Экономия месяцев">Не блуждаешь в чужой системе вслепую — <strong>сразу видишь, что важно лично тебе</strong>.</Card>
            <Card tone="gold" num="04" title="Не одна идея, а копилка">Уходишь с <strong>конкретными кейсами и направлениями</strong> на год вперёд.</Card>
            <Card tone="gold" num="05" title="Нужные контакты"><strong>Реальные имена специалистов</strong>, проверенных другими — к кому идти осознанно.</Card>
            <Card tone="gold" num="06" title="Спокойствие">Понимание, что <strong>используешь то, что положено</strong>, и защищаешь то, что есть.</Card>
          </div>
          <div style={{ marginTop: 34 }}>
            <ReliefBand variant="final" className="band-cow band-cow--mid"
              eyebrow={<Eyebrow center><span><span className="fp-nb">24–25 октября 2026</span> · <span className="fp-nb">Baden <SwissFlag /></span> · <span className="fp-nb">15 мин от Zürich HB</span></span></Eyebrow>}
              title="Приходи стать богаче"
              action={<span className="band-cow__slot"><img className="band-cow__img" src="site/img/cow-coquette.png" width="1024" height="1536" alt="" aria-hidden="true" /></span>}>
              <p className="fp-band__body">Билеты уже в продаже — Early Bird −25%, пока не объявлены все спикеры. А ещё мы подготовили <a href="#calc">калькуляторы</a> — можно начать прямо сейчас, не дожидаясь форума.</p>
              <Button variant="gold" href="/tickets">Купить билет</Button>
            </ReliefBand>
          </div>
        </div>
      </section>

      {/* СПИКЕРЫ */}
      <section id="speakers">
        <div className="inner">
          <Eyebrow>Кто выйдет на сцену</Eyebrow>
          <h2>Спикеры с подтверждённым опытом</h2>
          <p className="lead"><strong>Не верь — проверь.</strong> Мы зовём не по громким регалиям, а по реальному результату.<br />Четыре типа спикеров, которых ты услышишь:</p>
          <div className="grid g2">
            <SpeakerType accent="practik" badge="🎯 Практик" title="Тот, у кого получилось" body="Свой портфель, свой бизнес, недвижимость под сдачу, пассивный доход. Расскажет не теорию, а как это было на деле." example="«Как собрать портфель ETF с зарплаты в 6k и выйти на первый пассивный доход»" />
            <SpeakerType accent="spec" badge="📜 Специалист" title="Тот, кто знает систему" body="Профессионал в своей теме — пенсии, налоги, страхование, право — с опытом работы в Швейцарии." example="«3a, BVG и выкуп пенсии: как легально платить меньше налогов уже в этом году»" />
            <SpeakerType accent="story" badge="💔 Личная история" title="Тот, у кого это уже позади" body="Обычный человек, прошедший через развод, переезд с нуля, первый бизнес. Честно — что помогло, а что нет." example="«Развод в Швейцарии: что я знаю теперь и о чём жалею, что не узнала раньше»" />
            <SpeakerType accent="insp" badge="✨ Вдохновение" title="Истории, после которых хочется действовать" body="Без языка, без капитала, без связей — а в итоге свой бизнес, нестандартный портфель, новая жизнь." example="«Как из хобби вырос бизнес в Швейцарии — без вложений»" />
          </div>
          <div style={{ marginTop: 28 }}>
            <ReliefBand className="band-ban" title="Жёсткое правило для всех, кто на сцене">
              <span className="ban" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4"></circle><line x1="10" y1="10" x2="38" y2="38" stroke="currentColor" strokeWidth="4"></line></svg></span>
              <p className="fp-band__body">Только <strong>прикладное «бери и делай»</strong>: смотри сюда, потом сюда, вот цифра, вот шаг. <strong><br />Никаких продаж со сцены</strong> — ни курсов, ни марафонов. Ты уходишь не с одной идеей, а с копилкой.</p>
            </ReliefBand>
          </div>
        </div>
      </section>

      {/* СПИКЕРЫ ФОРУМА */}
      <section id="lineup" className="gridbg">
        <div className="inner">
          <Eyebrow>Лица форума</Eyebrow>
          <h2>Спикеры форума —<br /><span className="hl">люди, у которых получилось</span></h2>
          <p className="lead">Не теоретики со слайдами, а свои люди с результатом: свой портфель, свой бизнес, свой пройденный путь. Каждый выходит на сцену с одной целью — <strong>чтобы получилось и у тебя</strong>.</p>
          <SpeakerStrip />
          <p className="spk-note">Состав пополняется каждую неделю.<br />Темы по дням: <a href="/day1">День №1</a> · <a href="/day2">День №2</a>.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 22 }}>
            {/* Ведёт на подписку, а не на билеты: обещание кнопки — про
                информацию, и рядом уже стоит «Купить билет». Раньше здесь
                открывалась форма ранней регистрации — отключена 10.08.2026. */}
            <Button variant="gold" href="#subscribe">Получить полную программу</Button>
            <Button variant="ghost" href="/tickets">Купить билет</Button>
            <Button variant="ghost" href="/anketa">Предложить спикера</Button>
            <SponsorBox />
          </div>
        </div>
      </section>

      {/* КОРОВЫ */}
      <section id="cows">
        <div className="inner">
          <Eyebrow>Символ</Eyebrow>
          <h2>Лучшая жизнь в Швейцарии —<br /><span className="hl">у коровы</span>. Поэтому наш символ именно она</h2>
          <p className="lead">Зонт от солнца, музыка в коровнике, массажная щётка. И доплата от государства за то, чтобы она жила дольше.</p>
          <div style={{ marginTop: 28 }}>
            <Button variant="gold" href="/cows">Узнать почему →</Button>
          </div>
        </div>
      </section>

      {/* ЧЕСТНО */}
      <section id="findnot" style={{ paddingTop: 0 }}>
        <div className="inner">
          <Eyebrow>Честно</Eyebrow>
          <h2>Что тебя ждёт — и чего точно<br />не будет</h2>
          <div style={{ marginTop: 34 }}>
            <ComparisonTable rows={[
              { yes: "Обращение на «ты» — по-дружески, без дистанции", no: "Официоза и обращения «на вы»" },
              { yes: "Конкретные цифры: лимиты, налоги, ставки", no: "«Секретов богатых» и обещаний миллиона" },
              { yes: "Реальные истории людей, которые уже прошли путь", no: "Воды и пустых разговоров «ни о чём»" },
              { yes: "Несколько спикеров на тему — разные пути", no: "Одного «единственно верного» мнения сверху" },
              { yes: "Швейцарская конкретика: 3a, AHV, BVG, кантоны", no: "Общих советов «как у всех», не про Швейцарию" },
              { yes: "Сообщество, которое остаётся с тобой после", no: "«Послушал и забыл» — разового ивента" },
            ]} />
          </div>
        </div>
      </section>

      {/* КАЛЬКУЛЯТОРЫ */}
      <section id="calc">
        <div className="inner">
          <Eyebrow>Можно начать прямо сейчас</Eyebrow>
          <h2>Швейцарию нельзя<br />посчитать <span className="hl">на глаз</span></h2>
          <p className="lead">Одиннадцать калькуляторов про деньги здесь: налоги по коммунам, ипотека, пенсия, бюджет, GmbH. <strong>Пять уже открыты</strong> и считают твой случай, а не среднее по стране.</p>
          <div style={{ margin: "22px 0 6px" }}>
            <Button variant="gold" href="/calculators">Открыть калькуляторы →</Button>
          </div>
        </div>
      </section>

      {/* СВОИ ЛЮДИ */}
      <section id="svoi" className="gridbg">
        <div className="inner">
          <Eyebrow>Сообщество</Eyebrow>
          <h2>Свои люди — это правда «свои»</h2>
          <p className="lead">«Свои» здесь — не фигура речи: <strong><br />один менталитет, один язык, общий бэкграунд эмигранта</strong>.</p>
          <div className="svoi-unit">
            <div className="svoi-figure" aria-hidden="true">Один</div>
            <div className="svoi-facts">
              <div className="svoi-fact"><h3 className="svoi-fact__t">язык</h3><p className="svoi-fact__d">По-русски и по-человечески, без перевода швейцарских терминов в голове.</p></div>
              <div className="svoi-fact"><h3 className="svoi-fact__t">путь</h3><p className="svoi-fact__d">Все прошли одну дорогу эмигранта — понимают с полуслова.</p></div>
              <div className="svoi-fact"><h3 className="svoi-fact__t">ценности</h3><p className="svoi-fact__d">Здесь делятся опытом, а не продают курсы. И общаются после форума.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ВОЗРАЖЕНИЯ */}
      <section id="faq">
        <div className="inner">
          <Eyebrow>А что если…</Eyebrow>
          <h2>Сомнения, которые<br />у тебя сейчас в голове</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
            <FAQItem q="«Я совсем не разбираюсь в финансах»">В этом и смысл. Мы объясняем простым языком, с нуля. Если корова в шубе разобралась — разберёшься и ты.</FAQItem>
            <FAQItem q="«Это очередной курс, где будут что-то впаривать»">Нет. Только прикладное «бери и делай». Никаких продаж со сцены — ни курсов, ни марафонов, ни «оставьте контакт». Зато — мотивация и живые истории реальных людей: честно и открыто.</FAQItem>
            <FAQItem q="«У меня нет больших денег, мне рано»">Наоборот — именно поэтому очень надо. Форум про то, как разумно распорядиться тем, что уже есть, и начать двигаться в этом направлении. Начать можно со 100 франков.</FAQItem>
            <FAQItem q="«Мне неловко обсуждать личное»">И не надо. Ты просто слушаешь. Никто не спросит про твою ситуацию.</FAQItem>
          </div>
        </div>
      </section>

      {/* ОФФЕР */}
      <section id="reg" className="center gridbg">
        <div className="inner">
          <ReliefBand variant="final" className="band-cow" style={{height:500}}
            eyebrow={<Eyebrow center><span><span className="fp-nb">24–25 октября 2026</span> · <span className="fp-nb">Baden <SwissFlag /></span> · <span className="fp-nb">15 мин от Zürich HB</span></span></Eyebrow>}
            title="Приходи стать богаче"
            action={<span className="band-cow__slot"><img className="band-cow__img" src="site/img/cow-money-wall-2.png" width="647" height="1007" alt="" aria-hidden="true" /></span>}>
            <p className="fp-band__body">Знать направление — уже половина успеха. Билеты уже в продаже — Early Bird −25%, пока не объявлены все спикеры.</p>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </ReliefBand>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="gridbg">
        <div className="inner">
          <Eyebrow>Локация</Eyebrow>
          <h2>Konnex, Baden —<br /><span className="hl">15 минут от Zürich HB</span></h2>
          <div className="loc">
            <div className="loc__venue">
              <span className="loc__k">Площадка</span>
              <h3>Konnex</h3>
              <p className="loc__addr">Brown Boveri Str. 7<br />5400 Baden, Schweiz</p>
              <div className="loc__links">
                <Button variant="ghost" size="sm" href="https://www.google.com/maps/search/?api=1&query=Konnex%2C+Brown+Boveri+Strasse+7%2C+5400+Baden" target="_blank" rel="noopener">Открыть в Google Maps →</Button>
                <Button variant="ghost" size="sm" href="https://konnex-baden.ch/" target="_blank" rel="noopener">Сайт площадки →</Button>
                <Button variant="ghost" size="sm" href="https://www.google.com/maps/search/?api=1&query=Parkhaus+Trafo+Baden" target="_blank" rel="noopener">Парковка Trafo на карте →</Button>
              </div>
              <iframe className="loc__map" title="Konnex, Brown Boveri Strasse 7, Baden — карта" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Konnex%2C%20Brown%20Boveri%20Strasse%207%2C%205400%20Baden%2C%20Schweiz&z=16&hl=ru&output=embed"></iframe>
            </div>
          </div>
          <div className="loc__times">
              <div className="loc__row"><span className="loc__place">Вокзал Baden</span><span className="loc__chips"><span className="loc__chip">пешком 5’</span></span></div>
              <div className="loc__row"><span className="loc__place">Парковка</span><span className="loc__chips"><span className="loc__chip">пешком 10’</span></span></div>
              <div className="loc__row"><span className="loc__place">Zürich HB</span><span className="loc__chips"><span className="loc__chip">поезд 15’</span><span className="loc__chip">авто 30’</span></span></div>
              <div className="loc__row"><span className="loc__place">Аэропорт Цюриха</span><span className="loc__chips"><span className="loc__chip">поезд 35’</span><span className="loc__chip">авто 20’</span></span></div>
              <div className="loc__row"><span className="loc__place">Zug</span><span className="loc__chips"><span className="loc__chip">поезд 50’</span><span className="loc__chip">авто 40’</span></span></div>
              <div className="loc__row"><span className="loc__place">Basel</span><span className="loc__chips"><span className="loc__chip">поезд 55’</span><span className="loc__chip">авто 55’</span></span></div>
            </div>
        </div>
      </section>

      <Footer />

      <CalcModal calc={calc} onClose={() => setCalc(null)} />
    </div>
  );
}

window.Landing = Landing;
