/* Frankenplatz — страница-досье одного спикера. Данные: site/speakers-data.js
   (?id=<id>). Экспорт: window.SpeakerDetail. */
const { TopBar, Footer, Button, Badge, Eyebrow } = window.FrankenplatzDesignSystem_144b92;

const SPD_NAV = window.FP_NAV(null);

function getSpeaker() {
  const id = new URLSearchParams(window.location.search).get("id");
  const list = window.FP_SPEAKERS || [];
  return list.find((s) => s.id === id) || null;
}

function SpeakerDetail() {
  const s = getSpeaker();

  React.useEffect(() => {
    if (s) document.title = "Frankenplatz 2026 · " + s.name;
  }, [s]);

  if (!s || !(s.topics && s.topics.length)) {
    return (
      <div className="kit">
        <div className="fp-backdrop"></div>
        <TopBar links={SPD_NAV} />
        <header className="hero gridbg spd-hero">
          <div className="inner">
            <a className="spd-back" href="/#lineup">← Ко всем спикерам</a>
            <h1>Спикер не найден</h1>
            <p className="sub">Возможно, ссылка устарела. Посмотри полный состав на главной.</p>
            <div style={{ marginTop: 24 }}>
              <Button variant="gold" href="/#lineup">Все спикеры</Button>
            </div>
          </div>
        </header>
        <Footer />
      </div>
    );
  }

  const dayLabel = s.dayLabel || ("День №" + s.day);
  const topics = (s.topics || []).map((t) => (typeof t === "string" ? { t } : t));

  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <div className="fp-glow fp-glow--amber"></div>

      <TopBar links={SPD_NAV} />

      <header className="hero gridbg spd-hero">
        <div className="inner">
          <a className="spd-back" href="/#lineup">← Ко всем спикерам</a>
          <div className="spd-grid">
            <div className="spd-photo">
              {s.img ? <img src={s.img} loading="lazy" alt={s.name} /> : <span className="spd-photo__ini" aria-hidden="true">{s.ini}</span>}
            </div>
            <div>
              <div className="spd-badges">
                <Badge variant="lila" dot>{dayLabel}</Badge>
                {s.type ? <Badge variant="gold">{s.type}</Badge> : null}
              </div>
              <h1 className="spd-name">{s.name}</h1>
              <p className="spd-role">{s.role}</p>
              <ul className="spd-meta">
                {s.city ? <li>Город: <b>{s.city}</b></li> : null}
                {s.langs ? <li>Языки: <b>{s.langs}</b></li> : null}
              </ul>
              {s.dossier && s.dossier.length ? (
                <ul className="spd-facts">{s.dossier.map((f, i) => <li key={i}>{f}</li>)}</ul>
              ) : null}
              {s.about ? <p className="spd-about">{s.about}</p> : null}
              {s.socials && s.socials.length ? (
                <div className="spd-socials">
                  {s.socials.map((x, i) => (
                    <a className="spd-social" key={i} href={x.href} target="_blank" rel="noopener">{x.label} →</a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <section id="talks">
        <div className="inner">
          <Eyebrow>О чём расскажет на сцене</Eyebrow>
          <h2>Темы выступлений</h2>
          <div className="spd-talks">
            {topics.map((tp, i) => (
              <article className="spd-talk" key={i}>
                <h3 className="spd-talk__t">{tp.t}</h3>
                {tp.d ? <p className="spd-talk__d">{tp.d}</p> : null}
              </article>
            ))}
          </div>
          <div style={{ marginTop: 34, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button variant="gold" href="/">Забронировать место на форуме</Button>
            <Button variant="ghost" href="/#lineup">Другие спикеры</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.SpeakerDetail = SpeakerDetail;
