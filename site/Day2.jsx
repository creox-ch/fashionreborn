/* Frankenplatz — День №2. Экспортирует window.Day2. */
const {
  TopBar, Footer, Button, Badge, Eyebrow, Marquee,
  Card, ReliefBand, SpeakerCard,
} = window.FrankenplatzDesignSystem_144b92;
const { SpeakerRows, FlipCard } = window.FPSpeakerBits;

const D2_NAV = window.FP_NAV("day2");

function Topic({ badge, title, body, example }) {
  return (
    <Card fill="glass" tone="gold" className="sp">
      <div style={{ marginBottom: 14 }}><Badge variant="gold">{badge}</Badge></div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="ex">Например: <b>{example}</b></div>
    </Card>
  );
}

function Insp({ k, t, children }) {
  return (
    <Card fill="gold" tone="gold" className="insp">
      <div className="k">{k}</div>
      <div className="t">{t}</div>
      <p className="d">{children}</p>
    </Card>
  );
}

/* риск ↔ доходность: каждый инструмент — точка (x=риск %, y=доходность %) */
const INSTRUMENTS = [
  { x: 16, y: 22, tone: "gold", name: "Твёрдые активы", note: "золото, ювелирка — держат стоимость" },
  { x: 32, y: 50, tone: "lila", name: "Недвижимость для жизни", note: "квартира под себя за рубежом" },
  { x: 60, y: 62, tone: "lila", name: "Портфель", note: "диверсификация, аллокация" },
  { x: 78, y: 91, tone: "gold", name: "Недвижимость под сдачу", note: "доход минус налоги и расходы" },
];

function RiskReturnMatrix() {
  return (
    <div className="rrm">
      <div className="rrm__grid">
        <div className="rrm__ylab">Доходность →</div>
        <div className="rrm__frame">
          <svg className="rrm__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="rrmG" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#E6B450"></stop><stop offset="1" stopColor="#B98BFF"></stop>
              </linearGradient>
            </defs>
            <polyline className="rrm__line-base" points="0,100 16,78 32,50 60,38 78,9"></polyline>
            <polyline className="rrm__line-lit" points="0,100 16,78 32,50 60,38 78,9"></polyline>
          </svg>
          {INSTRUMENTS.map((it) => (
            <div key={it.name} className={"rrm__pt " + it.tone}
              style={{ left: it.x + "%", bottom: it.y + "%", "--d": (it.x / 100 * 2.6).toFixed(2) + "s" }}>
              <span className="rrm__dot"></span>
              <span className="rrm__lab"><b>{it.name}</b><span>{it.note}</span></span>
            </div>
          ))}
        </div>
        <div className="rrm__xlab">Риск →</div>
      </div>
    </div>
  );
}

function CompareTable({ left, right }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("cmp--mid");
      return;
    }
    const mid = el.querySelector(".cmp__vs") || el;
    let done = false;
    function check() {
      if (done) return;
      const r = mid.getBoundingClientRect();
      const cy = r.top + r.height / 2;
      if (cy <= window.innerHeight / 2) {
        done = true;
        el.classList.add("cmp--mid");
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return (
    <div className="cmp" ref={ref}>
      <div className="cmp__col">
        <h3 className="cmp__h">{left.title}</h3>
        <ul className="cmp__list">
          {left.items.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
        </ul>
      </div>
      <div className="cmp__vs" aria-hidden="true">
        <span className="cmp__vs-txt">VS</span>
      </div>
      <div className="cmp__col win">
        <h3 className="cmp__h">{right.title}</h3>
        <ul className="cmp__list">
          {right.items.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
        </ul>
      </div>
    </div>
  );
}

const BIZ_STEPS = [
  { t: "Форма", d: "самозанятый или GmbH" },
  { t: "Регистрация", d: "счёт, страховки, учёт" },
  { t: "Первые клиенты", d: "продукт, цена, поток" },
  { t: "Система", d: "процессы вместо ручного" },
  { t: "Масштаб", d: "команда, новые рынки" },
];

function Timeline({ steps }) {
  return (
    <div className="tl">
      {steps.map((s, i) => (
        <div className="tl__step" key={i}>
          <span className="tl__num">{i + 1}</span>
          <div className="tl__t">{s.t}</div>
          <p className="tl__d">{s.d}</p>
        </div>
      ))}
    </div>
  );
}

const BIZ_RISKS = [
  "Налоги и соц. взносы — <b>сколько реально закладывать</b>",
  "Кассовые разрывы первого года — <b>какой запас нужен</b>",
  "Личная ответственность — <b>чем рискуешь при разной форме</b>",
  "Зависимость от одного клиента — <b>как не подсесть</b>",
  "Выгорание — <b>почему бизнес ≠ свобода сразу</b>",
];

const BIZ_RISK_TAGS = [
  "Налоги и взносы",
  "Кассовые разрывы",
  "Личная ответственность",
  "Зависимость от клиента",
  "Выгорание",
];

function RiskList({ items }) {
  return (
    <div className="risks">
      {items.map((t, i) => (
        <div className="risk" key={i}>
          <span className="risk__ic">!</span>
          <span className="risk__tx" dangerouslySetInnerHTML={{ __html: t }} />
        </div>
      ))}
    </div>
  );
}

const BIZ_CARDS = [
  { badge: "⚙️ Основа", title: "Ремесло или бизнес?", body: "В чём разница между самозанятым и предпринимателем — и почему это меняет всё: налоги, масштаб, свободу и потолок дохода.", msg: "«Самозанятый или GmbH: когда пора менять форму и сколько это стоит?»" },
  { badge: "🧰 Инструменты", title: "Бизнес-инструменты Швейцарии", body: "Что реально работает здесь: как устроена система, какие инструменты помогают, а какие съедают время и деньги.", msg: "«Что подключить в первый год бизнеса — и что окажется пустой тратой?»" },
  { badge: "⚠️ Риски", title: "Неочевидные приколюхи и риски", body: "То, о чём не пишут в гайдах: подводные камни, ошибки на старте, риски предпринимателя в Швейцарии.", warn: true, msg: "«Какие 5 ошибок чуть не закрыли мой бизнес в первый год?»" },
  { badge: "💬 Живой кейс", title: "Как это было на самом деле", body: "Реальная история своего дела в Швейцарии — без глянца: с чего начиналось, что пошло не так, что сработало.", msg: "«Моё дело в Швейцарии: путь от идеи до первой прибыли — как это было?»" },
];

function Day2() {
  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <div className="fp-glow fp-glow--amber"></div>

      <TopBar links={D2_NAV} />

      <header className="hero gridbg">
        <div className="inner">
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
            <Badge variant="lila" dot>День №2<span className="bdg-tail"> · следующий уровень · продвинутый микс</span></Badge>
          </div>
          <h1>Деньги работают<br />на тебя — <br /><span className="hl">или ты на деньги?</span></h1>
          <p className="sub">Для тех, у кого база уже есть: не «с чего начать», а «куда расти». Инвестиции и направления всерьёз — и своё дело: ремесло, бизнес, риски и возможности.</p>
          <div className="d2-marq"><Marquee items={["Инвестиции", "Своё дело", "Новый уровень", "Инвестиции", "Своё дело", "Новый уровень", "Инвестиции", "Своё дело", "Новый уровень"]} /></div>
          <div style={{ marginTop: 44 }}>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </div>
        </div>
      </header>

      {/* ТЕМЫ ДНЯ */}
      <section id="topics">
        <div className="inner">
          <Eyebrow>Темы дня</Eyebrow>
          <h2>LvL UP: <span className="hl">следующий уровень</span> —<br />для тех, кто готов расти дальше</h2>
          <p className="lead">Десять тем Дня №2. Деньги, которые уже есть, начинают работать — портфель, недвижимость, бизнес и личный бренд.</p>
          <ul className="dprog">
            <li><span className="dprog__n">01</span>Деньги лежат на счету и тают? Портфельное инвестирование в Швейцарии</li>
            <li><span className="dprog__n">02</span>Недвижимость: где и какая недвижимость — актив. ROI и сделки</li>
            <li><span className="dprog__n">03</span>Неочевидные инвестиции</li>
            <li><span className="dprog__n">04</span>Клиенты не приходят сами: маркетинг, PR и развитие бизнеса</li>
            <li><span className="dprog__n">05</span>Тебя никто не знает — личный бренд и нетворкинг («витамин B»)</li>
            <li><span className="dprog__n">06</span>Партнёрства: как не потерять деньги и дружбу</li>
            <li><span className="dprog__n">07</span>Масштабирование и налоговое планирование</li>
            <li><span className="dprog__n">08</span>Финансовая стратегия: как из отдельных решений собирается система</li>
            <li><span className="dprog__n">09</span>Откуда и сколько денег нужно на бизнес в Швейцарии</li>
            <li><span className="dprog__n">10</span>Бизнес-стратегии и жизнь: как расти, не выгорая</li>
          </ul>
        </div>
      </section>

      {/* ЧАСТЬ 1 · ИНВЕСТИЦИИ */}
      <section id="invest">
        <div className="inner">
          <Eyebrow>Часть 1 · Инвестиции</Eyebrow>
          <h2>Когда база есть — встаёт вопрос<br />«куда расти»</h2>
          <p className="lead">Подушка собрана, страхи позади.<br />Четыре инструмента на одной карте: чем выше риск, тем выше потенциальная доходность.</p>
          <RiskReturnMatrix />
          <p className="rrm__cap"><span className="rrm__cap-lead">Инвестиции — это когда работают деньги.</span> А бизнес — когда работаешь ты, работают деньги и работает система. Вторая половина дня — про то, как построить своё дело, а не просто вложить.</p>
        </div>
      </section>

      {/* ПЕРЕХОД */}
      {/* ЧАСТЬ 2 · СВОЁ ДЕЛО */}
      <section id="business">
        <div className="inner">
          <Eyebrow>Часть 2 · Своё дело</Eyebrow>
          <h2>Ремесло, бизнес и всё,<br />о чём не пишут в гайдах</h2>
          <p className="lead">Своё дело в Швейцарии — это не только про «открыть фирму». Это про разницу между ремеслом и бизнесом, про инструменты, которые реально работают, и про риски, которые никто не показывает заранее.</p>

          <div className="biz-grid">
            {BIZ_CARDS.map((c) => (
              <div className="biz-card" key={c.title}>
                <span className={"biz-card__badge" + (c.warn ? " biz-card__badge--warn" : "")}>{c.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="biz-card__msg">
                  <div className="biz-card__bubble">{c.msg}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-mid">
            <p className="cta-mid__note"><b>Билеты уже в продаже.</b> Early Bird −25% — пока не объявлены все спикеры.</p>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </div>
        </div>
      </section>

      {/* СПИКЕРЫ ДНЯ 2 */}
      <section id="speakers2">
        <div className="inner">
          <Eyebrow>Кто выйдет на сцену</Eyebrow>
          <h2>Спикеры <span className="hl">Дня №2</span> —<br />коротко и по делу</h2>
          <p className="lead">Небольшие карточки: фото, кто это и о чём доклад. Состав пополняется.</p>
          <div className="spk-desk">
            <div className="grid gauto" style={{ marginTop: 26 }}>
              {window.FP_SPEAKERS.filter((s) => window.FP_IN_DAY(s, 2)).map((s) => (
                <FlipCard key={s.id} s={s} day={2} />
              ))}
            </div>
          </div>
          <div className="spk-mob">
            <SpeakerRows speakers={window.FP_SPEAKERS.filter((s) => window.FP_IN_DAY(s, 2))} day={2} showDay />
          </div>
        </div>
      </section>

      {/* МОТИВАЦИЯ */}
      <section id="inspire2">
        <div className="inner">
          <Eyebrow>Зачем тебе сюда</Eyebrow>
          <h2>Чтобы увидеть,<br />куда можно расти</h2>
          <p className="lead">День 2 — про горизонт: не «выжить и не потерять», а «приумножить, вложить, построить».</p>
          <div className="grid g3">
            <Insp k="Шире" t="Новые направления">Инвестиции, о которых ты, возможно, даже не думал — недвижимость по миру, твёрдые активы, своя система.</Insp>
            <Insp k="Глубже" t="Своё дело">Понимание, как устроен бизнес в Швейцарии — и хватит ли этого, чтобы решиться на свой.</Insp>
            <Insp k="Дальше" t="Горизонт на годы">Не одна идея, а карта возможностей, к которой можно возвращаться и расти по ней постепенно.</Insp>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section id="reg" className="center gridbg">
        <div className="inner">
          <ReliefBand variant="final" className="band-shot"
            eyebrow={<Eyebrow center>День №2 · Frankenplatz 2026</Eyebrow>}
            title={<>Расти дальше<br />— осознанно</>}
            action={<div className="band-cows band-cows--work"><img src="site/img/cow-work.png" width="1122" height="1402" alt="" aria-hidden="true" /></div>}>
            <p className="fp-band__body">День 2 для тех, кто готов к следующему уровню. Билеты уже в продаже — Early Bird −25%, пока не объявлены все спикеры.</p>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </ReliefBand>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.Day2 = Day2;
