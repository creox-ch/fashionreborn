/* Frankenplatz — компактные карточки спикеров для мобилки (≤480px).
   Слева фото-прямоугольник, справа имя и должность; ниже — короткая тема крупно
   и кнопка «Подробнее», раскрывающая полное название доклада и описание.
   Экспорт: window.FPSpeakerBits.SpeakerRows. Данные: site/speakers-data.js. */
(() => {
  function Row({ s, showDay, day }) {
    const theDay = day || (s.days && s.days[0]) || s.day;
    const dayTopic = (s.dayTopics && s.dayTopics[theDay]) || s.short || s.topic;
    return (
      <div className="spk-row" role="listitem">
        <span className={"spk-row__ph spk-row__ph--" + (s.tone || "gold")} aria-hidden="true">
          {s.img ? <img src={s.img} loading="lazy" alt="" /> : s.ini}
        </span>
        <span className="spk-row__who">
          <span className="spk-row__name">{s.name}</span>
          <span className="spk-row__role">{s.role}</span>
          {showDay ? <span className="spk-row__day">День {theDay} · {s.theme}</span> : null}
          <span className="spk-row__topic">{dayTopic}</span>
        </span>
        <p className="spk-row__about">{s.about}{s.topics && s.topics.length ? <a href={"/speaker?id=" + encodeURIComponent(s.id)} style={{ marginLeft: 6 }}>Подробнее о спикере →</a> : (s.link ? <a href={s.link} target="_blank" rel="noopener" style={{ marginLeft: 6 }}>{s.linkLabel || "Ссылка"}</a> : null)}</p>
      </div>
    );
  }
  function Topics({ topics, front }) {
  const norm = topics.map((t) => (typeof t === "string" ? { t } : t));
  const [pop, setPop] = React.useState(null);
  return (
    <ul className={front ? "fsc__ftopics" : "fsc__topics"}>
      {norm.map((tp, i) => (
        <li key={i} onClick={(e) => { e.stopPropagation(); if (tp.d) setPop(tp); }}>
          {front ? <>{tp.t}{tp.d ? <span className="fsc__topic-tgl" aria-hidden="true"> +</span> : null}</> :
          <span className="fsc__topic-t">{tp.t}{tp.d ? <span className="fsc__topic-tgl" aria-hidden="true">+</span> : null}</span>}
        </li>
      ))}
      {pop ? ReactDOM.createPortal(
        <div className="fsc-pop" onClick={(e) => { e.stopPropagation(); setPop(null); }}>
          <div className="fsc-pop__card" onClick={(e) => e.stopPropagation()}>
            <button className="fsc-pop__x" aria-label="Закрыть" onClick={(e) => { e.stopPropagation(); setPop(null); }}>✕</button>
            <h4 className="fsc-pop__t">{pop.t}</h4>
            <p className="fsc-pop__d">{pop.d}</p>
          </div>
        </div>, document.body) : null}
    </ul>
  );
}
function FlipCard({ s, day }) {
    const theDay = day || (s.days && s.days[0]) || s.day;
    const dayTopic = (s.dayTopics && s.dayTopics[theDay]) || s.short;
    const [on, setOn] = React.useState(false);
    const hasDetail = !!(s.topics && s.topics.length);
    return (
      <div className={"fsc" + (hasDetail ? "" : " fsc--tba") + (on && hasDetail ? " is-flip" : "")}
        onClick={hasDetail ? () => setOn(!on) : undefined}
        role={hasDetail ? "button" : undefined}
        tabIndex={hasDetail ? 0 : undefined}
        aria-label={hasDetail ? s.name + " — досье спикера" : undefined}>
        <div className="fsc__in">
          <div className="fsc__face fsc__front">
            {dayTopic ? (
              <div className="fsc__toplab">
                <span className="fsc__toplab__day">День {theDay}</span>
                <span className="fsc__toplab__t">{dayTopic}</span>
              </div>
            ) : null}
            <div className={"fsc__photo fsc__photo--" + (s.tone || "gold")}>
              {s.img ? <img src={s.img} loading="lazy" alt={s.name} /> : <span className="fsc__ini" aria-hidden="true">{s.ini}</span>}
            </div>
            <div className="fsc__scrim">
              <h3 className="fsc__name">{s.name}</h3>
              <p className="fsc__role">{s.role}</p>
              <span className="fsc__hint">{hasDetail ? "Наведи — досье спикера" : "Имя объявим скоро"}</span>
            </div>
          </div>
          {hasDetail ? (
          <div className="fsc__face fsc__back">
            <span className="fsc__eyebrow">Досье спикера</span>
            <h3 className="fsc__name">{s.name}</h3>
            <p className="fsc__role">{s.role}</p>
            {s.dossier && s.dossier.length ? (
              <ul className="fsc__facts">{s.dossier.map((f, i) => <li key={i}>{f}</li>)}</ul>
            ) : null}
            <a className="fsc__more" href={"/speaker?id=" + encodeURIComponent(s.id)} onClick={(e) => e.stopPropagation()}>Подробнее о спикере →</a>
          </div>
          ) : null}
        </div>
      </div>
    );
  }
  function SpeakerRows({ speakers, showDay, day }) {
    const list = speakers || window.FP_SPEAKERS || [];
    return (
      <div className="spk-rows" role="list">
        {list.map((s) => <Row s={s} showDay={showDay} day={day} key={s.id} />)}
      </div>
    );
  }
  function SpeakerDayBlock() {
    const [day, setDay] = React.useState(1);
    
    return (
      <div>
        <div className="spk-daysw" role="tablist">
          <button type="button" role="tab" aria-selected={day === 1}
                  className={"spk-daysw__tab" + (day === 1 ? " is-on" : "")}
                  onClick={() => setDay(1)}>День №1</button>
          <button type="button" role="tab" aria-selected={day === 2}
                  className={"spk-daysw__tab spk-daysw__tab--d2" + (day === 2 ? " is-on" : "")}
                  onClick={() => setDay(2)}>День №2</button>
        </div>
        <div className="spk-daysw__panel">
        <div className="spk-desk">
          <div className="grid gauto" style={{ marginTop: 8 }}>
            {(window.FP_SPEAKERS || []).filter((s) => window.FP_IN_DAY(s, day)).map((s) => (
              <FlipCard key={s.id} s={s} day={day} />
            ))}
          </div>
        </div>
        <div className="spk-mob">
          <SpeakerRows speakers={(window.FP_SPEAKERS || []).filter((s) => window.FP_IN_DAY(s, day))} day={day} showDay />
        </div>
        </div>
      </div>
    );
  }
  function SpeakerStrip({ speakers }) {
    const list = speakers || window.FP_SPEAKERS || [];
    const ref = React.useRef(null);
    const step = (dir) => {
      const el = ref.current; if (!el) return;
      const card = el.querySelector(".spk-slide");
      const w = card ? card.getBoundingClientRect().width + 18 : 340;
      el.scrollBy({ left: dir * w * 2, behavior: "smooth" });
    };
    return (
      <div className="spk-strip">
        <div className="spk-strip__rail" ref={ref} role="list">
          {list.map((s) => (
            <article className="spk-slide spk-slide--flip" role="listitem" key={s.id}>
              <FlipCard s={s} />
            </article>
          ))}
        </div>
        <div className="spk-strip__nav" aria-hidden="true">
          <button type="button" className="spk-strip__btn" onClick={() => step(-1)} aria-label="Назад">←</button>
          <button type="button" className="spk-strip__btn" onClick={() => step(1)} aria-label="Вперёд">→</button>
        </div>
      </div>
    );
  }
  window.FPSpeakerBits = { SpeakerRows, SpeakerDayBlock, SpeakerStrip, FlipCard };
})();
