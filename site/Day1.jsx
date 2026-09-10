/* Frankenplatz — День №1. Экспортирует window.Day1. */
const {
  TopBar, Footer, Button, Badge, Eyebrow,
  Card, StatCard, ReliefBand, FAQItem, SpeakerCard
} = window.FrankenplatzDesignSystem_144b92;

/* Флаг Швейцарии вместо эмодзи — вектор, одинаковый во всех системах. */
function SwissFlag() {
  return (
    <svg className="fp-flag" viewBox="0 0 32 32" role="img" aria-label="Швейцария"><rect width="32" height="32" fill="#FF0000"></rect><rect x="13" y="6" width="6" height="20" fill="#FFFFFF"></rect><rect x="6" y="13" width="20" height="6" fill="#FFFFFF"></rect></svg>);

}

const { SpeakerRows, FlipCard } = window.FPSpeakerBits;

const D1_NAV = window.FP_NAV("day1");


function Insp({ k, t, children }) {
  return (
    <Card fill="gold" tone="gold" className="insp">
      <div className="k">{k}</div>
      <div className="t">{t}</div>
      <p className="d">{children}</p>
    </Card>);

}

function Day1() {
  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <div className="fp-glow fp-glow--amber"></div>

      <TopBar links={D1_NAV} />

      <header className="hero gridbg">
        <div className="inner">
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
            <Badge variant="lila" dot>День №1<span className="bdg-tail"> · база <SwissFlag />, с которой стоит начать</span></Badge>
          </div>
          <h1>Где бабки — <span className="hl">и как<br />их не потерять</span></h1>
          <p className="sub">День 1 — про самые частые и самые тихие вопросы, которые есть почти у каждого, кто живёт в Швейцарии. Мы их называем вслух. Ты можешь просто прийти и послушать ответы на частые вопросы — а свой вопрос задать анонимно, онлайн или офлайн, на своё усмотрение.</p>
          <div style={{ marginTop: 28 }}>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </div>
        </div>
      </header>

      {/* ТЕМЫ ДНЯ */}
      <section id="topics">
        <div className="inner">
          <Eyebrow>Темы дня</Eyebrow>
          <h2>База <span className="hl">🇨🇭 финансов</span> —<br />с которой стоит начать каждому</h2>
          <p className="lead">Семь тем Дня №1. Всё прикладное: что проверить, что поменять и куда перестать платить лишнее.</p>
          <ul className="dprog">
            <li><span className="dprog__n">01</span>Работа: поиск, условия и типы контрактов в Швейцарии — и о каких пособиях ты не знаешь</li>
            <li><span className="dprog__n">02</span>Семейный бюджет: как он устроен — и как может быть устроен ещё</li>
            <li><span className="dprog__n">03</span>Пенсия AHV / BVG / 3a: сколько тебе реально светит (спойлер: меньше)</li>
            <li><span className="dprog__n">04</span>Налоги, страховки, ипотека: где ты переплачиваешь прямо сейчас</li>
            <li><span className="dprog__n">05</span>Самозанятость и ферайны: как начать и не налететь на штрафы</li>
            <li><span className="dprog__n">06</span>Любовь и деньги: что будет с твоим при браке и разводе</li>
            <li><span className="dprog__n">07</span>Неочевидные источники дохода и с чего начать свой бизнес</li>
          </ul>
        </div>
      </section>

      {/* УЗНАЁШЬ СЕБЯ */}
      <section id="pain">
        <div className="inner">
          <Eyebrow>Узнаёшь себя?</Eyebrow>
          <h2>Живёшь здесь — а деньги<br />живут своей жизнью</h2>
          <p className="lead">В Швейцарии не принято говорить о деньгах — поэтому большинство теряет тихо и годами.<br />Никто не показал тебе карту.</p>
          <div className="grid g2">
            <FAQItem variant="hook" q="«Деньги уходят, а куда — непонятно»">Зарплата приличная, к концу месяца ноль. Krankenkasse, налоги, аренда — будто просто кормишь систему.</FAQItem>
            <FAQItem variant="hook" q="«Подушки нет. Или есть, но смешная»">Потеря работы завтра — на сколько месяцев хватит? И как собирать, чтобы не съела инфляция.</FAQItem>
            <FAQItem variant="hook" q="«Всё в одной валюте, на одном счету»">Ни инвестиций, ни 3a — всё лежит на зарплатном счёте и тихо обесценивается.</FAQItem>
            <FAQItem variant="hook" q="«А пенсия? А старость?»">Главный вопрос — <strong>она тебе вообще капает?</strong> AHV, 3a и BVG — туман, а каждый упущенный год не вернуть.</FAQItem>
          </div>
        </div>
      </section>

      {/* ТОНКИЙ МОМЕНТ */}
      <section id="couple">
        <div className="inner">
          <Eyebrow>Тонкий момент</Eyebrow>
          <h2><span className="fifty-w">«Фюнфциг-фюнфциг»<span className="fifty__tag" aria-hidden="true">50/50</span></span><br /> — и другие вещи,<br />о которых тут молчат</h2>
          <p className="lead">В Швейцарии финансовая самостоятельность — ценность даже внутри пары. Общий бюджет здесь скорее исключение. Это не про недоверие — это менталитет.</p>
          <div className="fifty">
            <div className="fifty__half fifty__half--l">
              <b>«Фюнфциг-фюнфциг»</b>
              <p>Раздельные счета, всё пополам, чёткий учёт. А иногда ты и сама хочешь быть финансово независимой — но не знаешь, с чего начать.</p>
            </div>
            <svg className="fifty__cut" viewBox="0 0 24 176" preserveAspectRatio="none" aria-hidden="true"><polyline points="12,0 6,28 18,52 8,84 17,116 6,148 12,176" pathLength="300"></polyline></svg>
            <div className="fifty__half fifty__half--r">
              <b>Раздел 50/50 — по умолчанию</b>
              <p>Без брачного договора всё нажитое делится поровну. Детали (что входит, что с 3a) знают единицы.</p>
            </div>
          </div>
          <p className="para">Это не про расчёт вместо любви — это про <strong>взрослый разговор о деньгах в паре</strong>, пока всё хорошо.</p>
        </div>
      </section>

      {/* ЦЕНА МОЛЧАНИЯ */}
      <section id="cost">
        <div className="inner">
          <Eyebrow>Цена молчания</Eyebrow>
          <h2>Не разберёшься самостоятельно — система решит за тебя</h2>
          <div className="statrow">
            <StatCard value="2 520" label="CHF — максимум пенсии AHV в месяц, даже за 44 года стажа" />
            <StatCard value="134 000+" label="пенсионеров перебрались за границу — там те же франки живут дольше" />
            <StatCard value="+84%" label="насколько жизнь в Швейцарии дороже среднего по ЕС" />
          </div>
          <p className="para">Рассчитывать только на госпенсию рискованно: если местным со стажем 44 года бывает мало — тем более тем, кто начал позже. <strong><br />О пенсии лучше подумать, пока ещё работаешь.</strong></p>
        </div>
      </section>

      {/* РАЗВОД */}
      <section id="divorce">
        <div className="inner">
          <Eyebrow>Деликатная тема</Eyebrow>
          <h2>А что если… развод?<span className="dh" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <linearGradient id="dhg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F5484D"></stop><stop offset="1" stopColor="#A81226"></stop></linearGradient>
                <clipPath id="dhl"><polygon points="0,0 50,0 50,24 44,41 55,56 46,71 52,90 52,100 0,100"></polygon></clipPath>
                <clipPath id="dhr"><polygon points="50,0 100,0 100,100 52,100 52,90 46,71 55,56 44,41 50,24"></polygon></clipPath>
              </defs>
              <g className="dh-l" clipPath="url(#dhl)"><path d="M50 88 C22 66 10 52 10 36 A18 18 0 0 1 46 30 L50 36 L54 30 A18 18 0 0 1 90 36 C90 52 78 66 50 88 Z" fill="url(#dhg)"></path></g>
              <g className="dh-r" clipPath="url(#dhr)"><path d="M50 88 C22 66 10 52 10 36 A18 18 0 0 1 46 30 L50 36 L54 30 A18 18 0 0 1 90 36 C90 52 78 66 50 88 Z" fill="url(#dhg)"></path></g>
            </svg>
          </span></h2>
          <p className="lead">Развод. Неприятно, не хочется. Но в Швейцарии <strong>почти 4 из 10 браков</strong> заканчиваются именно так — чаще всего тяжелее тому, кто меньше зарабатывал. По исследованию Бернской высшей школы (BFH), мамы с детьми теряют <strong>около 38% дохода</strong> (мужчины — 3%) — потому что <strong>о деньгах не договорились заранее.</strong></p>
          <div className="statrow">
            <StatCard value="−38%" label="дохода у мамы с детьми в первые 2 года после развода" />
            <StatCard value="~40%" label="браков в Швейцарии заканчиваются разводом" />
            <StatCard value="50/50" label="так по умолчанию делится нажитое — без брачного договора" />
          </div>
        </div>
      </section>

      {/* ВЫДОХНИ */}
      <section id="relief">
        <div className="inner">
          <div className="breath" aria-hidden="true"></div>
          <Eyebrow>Выдохни</Eyebrow>
          <h2>Можно просто прийти<br />и послушать</h2>
          <p className="lead">Тебе не нужно ни в чём признаваться. Мы <strong>не разбираем твой случай со сцены</strong> — просто называем боль вслух. Ты забираешь базу: как делится имущество, что с 3a и пенсией.</p>
          <div style={{ marginTop: 28 }}>
            <ReliefBand title="Это снимает главный барьер">
              О некоторых вещах страшно сказать даже самым близким — не то что чужому консультанту. А здесь можно получить базу, <strong>не открываясь вообще никому.</strong> Сначала тихо разобраться — потом осознанно выбрать следующий шаг.
            </ReliefBand>
          </div>
        </div>
      </section>

      {/* СПИКЕРЫ ДНЯ 1 */}
      <section id="speakers1">
        <div className="inner">
          <Eyebrow>Кто выйдет на сцену</Eyebrow>
          <h2>Спикеры <span className="hl">Дня №1</span> —<br />по темам, которые болят</h2>
          <p className="lead">Небольшие карточки: фото, кто это и о чём доклад. Список пополняется.</p>
          <div className="spk-desk">
            <div className="grid gauto" style={{ marginTop: 26 }}>
              {window.FP_SPEAKERS.filter((s) => window.FP_IN_DAY(s, 1)).map((s) =>
              <FlipCard key={s.id} s={s} day={1} />
              )}
            </div>
          </div>
          <div className="spk-mob">
            <SpeakerRows speakers={window.FP_SPEAKERS.filter((s) => window.FP_IN_DAY(s, 1))} day={1} showDay />
          </div>
          <p className="spk-note">Знаешь, кого стоит позвать? <a href="/anketa">Предложить спикера →</a></p>
        </div>
      </section>

      {/* МОТИВАЦИЯ */}
      <section id="inspire">
        <div className="inner">
          <Eyebrow>И не только про тревоги</Eyebrow>
          <h2>А ещё — про то,<br />как можно по-другому</h2>
          <p className="lead">День 1 — не только разбор болей.<br />Рядом — люди, которые начинали с тех же вопросов, а сейчас спокойно ими управляют.</p>
          <div className="grid g3">
            <Insp k="Подушка с нуля" t="Собрать опору">Как обычные люди с обычной зарплатой собрали финансовую подушку и перестали бояться завтрашнего дня.</Insp>
            <Insp k="Первые шаги" t="Свои деньги">Как начать инвестировать со 100 франков и завести то, что работает на тебя, а не лежит мёртвым грузом.</Insp>
            <Insp k="Спокойствие" t="Защитить себя">Как заранее разложить деньги в паре и в семье так, чтобы любой сценарий не стал катастрофой.</Insp>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section id="reg" className="center gridbg">
        <div className="inner">
          <ReliefBand variant="final" className="band-shot"
          eyebrow={<Eyebrow center>День №1 · Frankenplatz 2026</Eyebrow>}
          title={<>Узнать базу<br />— и перестать терять</>}
          action={<div className="band-cows"><img src="site/img/cows-invite-w.png" alt="" aria-hidden="true" /></div>}>
            <p className="fp-band__body"><strong>Знать базу — значит перестать тревожиться.</strong> Эти вопросы есть почти у всех — просто о них молчат. На форуме можно тихо разобраться и забрать вектор.</p>
            <p className="cta-mid__note">В зале <b>всего 300 мест</b>.<br />Early Bird −25% — пока не объявлены все спикеры.</p>
            <Button variant="gold" href="/tickets">Купить билет</Button>
          </ReliefBand>
        </div>
      </section>

      <Footer />
    </div>);

}

window.Day1 = Day1;