/* Frankenplatz — анкета спикера: квиз по шагам. Экспортирует window.Anketa. */
(() => {
const { TopBar, Footer, Button, Eyebrow } = window.FrankenplatzDesignSystem_144b92;
const STEPS = window.FP_ANKETA.steps;
const LS = "fp_anketa_v1";

const NAV = window.FP_NAV("anketa");

function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
function gateOk(a) {
  return a.qfree && (a.qfree !== "Нет, эти даты не подходят" || a.q2027 === "Заполню анкету под даты 2027");
}
function condOk(cond, a) {
  if (!cond) return true;
  if (typeof cond === "function") return cond(a);
  const v = a[cond[0]];
  if (Array.isArray(cond[1])) return cond[1].indexOf(v) >= 0;
  if (Array.isArray(v)) return v.indexOf(cond[1]) >= 0;
  return v === cond[1];
}
function stepOk(s, a) { return (!s.gate || gateOk(a)) && condOk(s.cond, a); }

function Field({ q, a, set }) {
  const v = a[q.id];
  if (q.t === "note") return <div className="ank-note">{q.q}</div>;
  if (q.t === "t") return (
    <label className="ank-q">
      <span className="ank-q__label">{q.q}</span>
      {q.hint ? <span className="ank-q__hint">{q.hint}</span> : null}
      <input className="ank-in" type="text" value={v || ""} onChange={(e) => set(q.id, e.target.value)} />
    </label>
  );
  if (q.t === "ta") return (
    <label className="ank-q">
      <span className="ank-q__label">{q.q}</span>
      {q.hint ? <span className="ank-q__hint">{q.hint}</span> : null}
      {q.ex ? <span className="ank-q__ex">{q.ex.map((e, i) => <em key={i}>«{e}»</em>)}</span> : null}
      <textarea className="ank-in ank-in--ta" rows={4} value={v || ""} onChange={(e) => set(q.id, e.target.value)}></textarea>
    </label>
  );
  if (q.t === "r") return (
    <div className="ank-q">
      <span className="ank-q__label">{q.q}</span>
      {q.hint ? <span className="ank-q__hint">{q.hint}</span> : null}
      <div className="ank-opts">
        {q.opts.map((o) => (
          <button type="button" key={o} className={"ank-chip" + (v === o ? " is-on" : "")} onClick={() => set(q.id, o)}>{o}</button>
        ))}
      </div>
    </div>
  );
  // chips multi
  const arr = Array.isArray(v) ? v : [];
  const toggle = (o) => set(q.id, arr.indexOf(o) >= 0 ? arr.filter((x) => x !== o) : arr.concat(o));
  return (
    <div className="ank-q">
      <span className="ank-q__label">{q.q}</span>
      {q.hint ? <span className="ank-q__hint">{q.hint}</span> : null}
      <div className="ank-opts">
        {q.opts.map((o) => (
          <button type="button" key={o} className={"ank-chip" + (arr.indexOf(o) >= 0 ? " is-on" : "")} onClick={() => toggle(o)}>{o}</button>
        ))}
      </div>
      {q.other ? <input className="ank-in ank-in--other" type="text" placeholder="Другое: …" value={a[q.id + "_other"] || ""} onChange={(e) => set(q.id + "_other", e.target.value)} /> : null}
      {q.note ? <span className="ank-q__note">{q.note}</span> : null}
    </div>
  );
}

function summary(a) {
  const out = [];
  STEPS.forEach((s) => {
    if (!stepOk(s, a)) return;
    const lines = [];
    s.qs.forEach((q) => {
      if (!condOk(q.cond, a)) return;
      let v = a[q.id];
      if (Array.isArray(v)) v = v.join("; ");
      const other = a[q.id + "_other"];
      if (other) v = (v ? v + "; " : "") + "другое: " + other;
      if (v) lines.push("— " + q.q + ": " + v);
    });
    if (lines.length) out.push("## " + s.title + "\n" + lines.join("\n"));
  });
  return "АНКЕТА СПИКЕРА FRANKENPLATZ\n\n" + out.join("\n\n");
}

function Anketa() {
  const [a, setA] = React.useState(load);
  const [i, setI] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const set = (id, v) => setA((prev) => { const next = { ...prev, [id]: v }; try { localStorage.setItem(LS, JSON.stringify(next)); } catch (e) {} return next; });
  const steps = STEPS.filter((s) => stepOk(s, a));
  const step = steps[Math.min(i, steps.length - 1)];
  const pct = done ? 100 : Math.round((i / steps.length) * 100);
  const go = (d) => { const n = i + d; if (n < 0) return; if (n >= steps.length) { setDone(true); return; } setI(n); window.scrollTo({ top: 0 }); };
  const copy = () => { navigator.clipboard.writeText(summary(a)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); };
  const mail = "mailto:info@frankenplatz.ch?subject=" + encodeURIComponent("Анкета спикера — " + (a.q1 || "")) + "&body=" + encodeURIComponent(summary(a)).slice(0, 1800);
  return (
    <div className="kit">
      <div className="fp-backdrop"></div>
      <div className="fp-glow fp-glow--violet"></div>
      <TopBar links={NAV} />
      <header className="hero gridbg" style={{ paddingBottom: 0 }}>
        <div className="inner">
          <Eyebrow>Анкета спикера</Eyebrow>
          <h1 style={{ fontSize: "clamp(30px,4.4vw,50px)" }}>Есть тема для нас?<br /><span className="hl">Herzlich willkommen!</span></h1>
          <p className="sub">Место, где о деньгах в Швейцарии говорят открыто. Заполни, если чувствуешь, что есть чем поделиться — личным опытом, экспертизой, историей. Мы читаем всё сами, без ботов и фильтров. Ответы сохраняются в браузере — можно вернуться позже.</p>
        </div>
      </header>
      <section style={{ paddingTop: 40 }}>
        <div className="inner" style={{ maxWidth: 840 }}>
          <div className="ank-bar"><div className="ank-bar__fill" style={{ width: pct + "%" }}></div></div>
          {!done ? (
            <div className="ank-step" key={step.id}>
              <p className="ank-step__count">Шаг {i + 1} из {steps.length}</p>
              <h2 className="ank-step__title">{step.title}</h2>
              {step.intro ? <p className="ank-step__intro">{step.intro}</p> : null}
              <div className="ank-qs">
                {step.qs.filter((q) => condOk(q.cond, a)).map((q) => <Field key={q.id} q={q} a={a} set={set} />)}
              </div>
              <div className="ank-nav">
                {i > 0 ? <Button variant="ghost" onClick={() => go(-1)}>← Назад</Button> : <span></span>}
                <Button variant="gold" onClick={() => go(1)}>{i === steps.length - 1 ? "Завершить" : "Дальше →"}</Button>
              </div>
            </div>
          ) : (
            <div className="ank-step">
              <h2 className="ank-step__title">Спасибо! 🐄</h2>
              <p className="ank-step__intro">Читаю всё сама. Отвечу в течение 7 дней. Осталось отправить анкету: скопируй её и пришли на <a href="mailto:info@frankenplatz.ch">info@frankenplatz.ch</a> — или открой письмо кнопкой ниже.</p>
              <div className="ank-nav" style={{ justifyContent: "flex-start", gap: 12 }}>
                <Button variant="gold" onClick={copy}>{copied ? "Скопировано ✓" : "Скопировать анкету"}</Button>
                <Button variant="ghost" href={mail}>Открыть письмо</Button>
                <Button variant="ghost" onClick={() => { setDone(false); setI(0); }}>Править ответы</Button>
              </div>
              <pre className="ank-sum">{summary(a)}</pre>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

window.Anketa = Anketa;
})();
