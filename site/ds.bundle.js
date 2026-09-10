/* @ds-bundle:  {"format":4,"namespace":"FrankenplatzDesignSystem_144b92","components":[{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"ReliefBand","sourcePath":"components/cards/ReliefBand.jsx"},{"name":"SpeakerCard","sourcePath":"components/cards/SpeakerCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"Footer","sourcePath":"components/chrome/Footer.jsx"},{"name":"TopBar","sourcePath":"components/chrome/TopBar.jsx"},{"name":"ComparisonTable","sourcePath":"components/content/ComparisonTable.jsx"},{"name":"FAQItem","sourcePath":"components/content/FAQItem.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Marquee","sourcePath":"components/core/Marquee.jsx"}],"sourceHashes":{"components/cards/Card.jsx":"52cb5582c983","components/cards/ReliefBand.jsx":"a627ffe0d0bf","components/cards/SpeakerCard.jsx":"41595f9f5554","components/cards/StatCard.jsx":"e71aad0868b8","components/chrome/Footer.jsx":"529e1fc8b872","components/chrome/TopBar.jsx":"629c97969b23","components/content/ComparisonTable.jsx":"17fa441501b1","components/content/FAQItem.jsx":"0e96b7a892bc","components/core/Badge.jsx":"e3058260339b","components/core/Button.jsx":"84bfd7cecbb4","components/core/Eyebrow.jsx":"c7bea691a425","components/core/Marquee.jsx":"f696323a67dc","test/Day1Test.jsx":"3a7d04267b8b","test/Day2Test.jsx":"cb3f0ce83cef","test/LandingTest.jsx":"eef8d5650c3d","test/SpeakersTest.jsx":"f80247f2a577","test/kit.combined.js":"60a2eb2943a7","test/kit.js":"5452967c89dc","test/tweaks-panel.jsx":"6591467622ed","ui_kits/marketing/Day1.jsx":"00509ef68a61","ui_kits/marketing/Day2.jsx":"b0bbdd5ffb39","ui_kits/marketing/Landing.jsx":"9f136e277278","ui_kits/marketing/Speakers.jsx":"5a51b0998827","ui_kits/marketing/kit.js":"1d56a377e5c4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FrankenplatzDesignSystem_144b92 = window.FrankenplatzDesignSystem_144b92 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-card{position:relative;border:1px solid var(--line);border-radius:var(--r-xl);
  padding:26px;transition:transform var(--dur-base),border-color var(--dur-base),
  box-shadow var(--dur-base),background var(--dur-base);display:flex;flex-direction:column}
/* fills */
.fp-card--glass{background:var(--glass)}
.fp-card--lila{background:var(--grad-card-lila)}
.fp-card--gold{background:var(--grad-card-gold)}
/* hover lift + warmed border, tone-dependent */
.fp-card--hover.fp-card--t-lila:hover{transform:var(--lift-card);border-color:rgba(154,111,212,.50);box-shadow:var(--shadow-lila)}
.fp-card--hover.fp-card--t-gold:hover{transform:var(--lift-card);border-color:rgba(230,180,80,.45);box-shadow:var(--shadow-gold-soft)}
.fp-card--hover.fp-card--t-red:hover{transform:var(--lift-card);border-color:rgba(255,122,138,.40);background:rgba(255,122,138,.05)}
.fp-card--hover.fp-card--t-none:hover{transform:var(--lift-card);border-color:var(--line-strong)}
/* free tag corner */
.fp-card__free{position:absolute;top:18px;right:18px}
/* icon glyph */
.fp-card__icon{font-size:30px;margin-bottom:14px;line-height:1}
/* ordinal number (gold→lilac gradient, w/ underline rule) */
.fp-card__num{font-family:var(--font-display);font-weight:var(--fw-black);font-size:30px;line-height:1;
  background:var(--grad-gold-lila);-webkit-background-clip:text;background-clip:text;color:transparent;display:block}
.fp-card__num::after{content:"";display:block;width:30px;height:3px;border-radius:3px;margin-top:12px;
  background:var(--grad-gold-lila);opacity:.5}
.fp-card__title{font-family:var(--font-body);font-weight:var(--fw-bold);color:#fff;font-size:18px;margin:12px 0 6px}
.fp-card__body{font-size:15px;color:var(--muted);margin:0;line-height:1.5}
`;

/**
 * Frankenplatz Card — the workhorse frosted panel.
 *  fill : glass (default) | lila | gold   — surface treatment
 *  tone : lila | gold | red | none        — hover border/glow color
 * Optional structured slots: `num` (gold ordinal), `icon` (emoji), `title`, `free`.
 * Pass raw children for full control.
 */
function Card({
  fill = "glass",
  tone = "lila",
  hover = true,
  num,
  icon,
  title,
  free,
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-card-css", CSS);
  const cls = ["fp-card", `fp-card--${fill}`, hover ? "fp-card--hover" : "", `fp-card--t-${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), free && /*#__PURE__*/React.createElement("span", {
    className: "fp-card__free"
  }, free), icon && /*#__PURE__*/React.createElement("div", {
    className: "fp-card__icon",
    "aria-hidden": "true"
  }, icon), num != null && /*#__PURE__*/React.createElement("span", {
    className: "fp-card__num"
  }, num), title && /*#__PURE__*/React.createElement("div", {
    className: "fp-card__title"
  }, title), title ? /*#__PURE__*/React.createElement("div", {
    className: "fp-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/ReliefBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-band{background:var(--grad-band);border:1px solid var(--line);border-radius:var(--r-2xl);padding:38px}
.fp-band--final{background:var(--grad-final);border-radius:var(--r-3xl);padding:64px 40px;text-align:center;
  position:relative;overflow:hidden}
.fp-band__title{font-family:var(--font-body);font-weight:var(--fw-bold);font-size:23px;color:#fff;margin:0 0 8px}
.fp-band--final .fp-band__title{font-family:var(--font-display);letter-spacing:var(--ls-display);
  font-size:clamp(32px,5vw,54px);line-height:1.04;margin:0 0 16px}
.fp-band__body{margin:0;color:var(--text);font-size:17px;line-height:1.5}
.fp-band--final .fp-band__body{font-size:20px;color:var(--muted);max-width:560px;margin:0 auto 28px}
.fp-band__body strong{color:#fff;font-weight:var(--fw-bold)}
.fp-band--split{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
@media (max-width:720px){
  .fp-band{padding:26px}
  .fp-band--final{padding:40px 22px}
}
`;

/**
 * Frankenplatz ReliefBand — the warm gold/lilac gradient callout used for
 * "выдохни" reassurance blocks, hard rules, and the big centered final CTA.
 *  variant: relief (default) | final
 *  split  : lay title/body and an action side-by-side (CTA band)
 */
function ReliefBand({
  variant = "relief",
  split = false,
  eyebrow,
  title,
  action,
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-band-css", CSS);
  const cls = ["fp-band", variant === "final" ? "fp-band--final" : "", split ? "fp-band--split" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", null, eyebrow, title && /*#__PURE__*/React.createElement("h3", {
    className: "fp-band__title"
  }, title), typeof children === "string" ? /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, children) : children), action);
}
Object.assign(__ds_scope, { ReliefBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ReliefBand.jsx", error: String((e && e.message) || e) }); }

// components/cards/SpeakerCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-spk{background:var(--glass);border:1px solid var(--line);border-radius:var(--r-xl);
  overflow:hidden;transition:transform var(--dur-base),border-color var(--dur-base);
  display:flex;flex-direction:column}
.fp-spk:hover{transform:var(--lift-card);border-color:rgba(230,180,80,.40)}
.fp-spk__ph{aspect-ratio:1/1;background:linear-gradient(160deg,#2A1E3D,#1A1026);
  display:flex;align-items:center;justify-content:center;position:relative}
.fp-spk__ava{font-size:56px;opacity:.5;line-height:1}
.fp-spk__ava img{width:100%;height:100%;object-fit:cover}
.fp-spk__link{position:absolute;left:14px;right:14px;bottom:14px;text-align:center;
  font-size:12px;font-weight:var(--fw-bold);letter-spacing:.06em;color:var(--gold);
  border:1px solid rgba(230,180,80,.5);border-radius:10px;padding:8px;
  background:rgba(20,10,31,.5);backdrop-filter:blur(4px);text-decoration:none}
.fp-spk__body{padding:20px 22px 24px}
.fp-spk__name{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:18px;
  color:#fff;line-height:1.15;margin-bottom:4px}
.fp-spk__role{font-size:13.5px;color:var(--muted-2);margin-bottom:12px}
.fp-spk__topic{font-size:14.5px;color:var(--lila-bright);line-height:1.45;margin:0}
.fp-spk__topic b{color:#fff;font-weight:var(--fw-bold)}
`;

/**
 * Frankenplatz SpeakerCard — square photo/avatar (with a platform link chip
 * over it) above name, role, and talk topic. `photo` fills the frame; without
 * it, `avatar` (default 🐮) is centered as a placeholder.
 */
function SpeakerCard({
  name,
  role,
  topic,
  topicLabel = "Тема доклада:",
  photo,
  avatar = "🐮",
  link,
  linkLabel = "LinkedIn",
  className = "",
  ...rest
}) {
  useFpStyle("fp-spk-css", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["fp-spk", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "fp-spk__ph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fp-spk__ava",
    "aria-hidden": !photo
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name
  }) : avatar), link !== undefined && /*#__PURE__*/React.createElement("a", {
    className: "fp-spk__link",
    href: link || "#"
  }, linkLabel)), /*#__PURE__*/React.createElement("div", {
    className: "fp-spk__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-spk__name"
  }, name), role && /*#__PURE__*/React.createElement("div", {
    className: "fp-spk__role"
  }, role), topic && /*#__PURE__*/React.createElement("p", {
    className: "fp-spk__topic"
  }, /*#__PURE__*/React.createElement("b", null, topicLabel), " ", topic)));
}
Object.assign(__ds_scope, { SpeakerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SpeakerCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-stat{background:var(--glass);border:1px solid var(--line);border-radius:var(--r-lg);
  padding:24px;text-align:center}
.fp-stat__big{font-family:var(--font-display);font-weight:var(--fw-black);font-size:34px;line-height:1;
  background:var(--grad-gold-lila);-webkit-background-clip:text;background-clip:text;color:transparent}
.fp-stat__lbl{font-size:13px;color:var(--muted);margin-top:10px;line-height:1.4}
`;

/**
 * Frankenplatz StatCard — a big gold→lilac gradient number with a one-line
 * human explanation beneath. Used in "цена молчания" stat rows.
 */
function StatCard({
  value,
  label,
  className = "",
  ...rest
}) {
  useFpStyle("fp-stat-css", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["fp-stat", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "fp-stat__big"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "fp-stat__lbl"
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/chrome/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-foot{background:#191026;border-top:1px solid var(--line);padding:64px clamp(24px,7vw,80px) 34px;font-size:14px;color:var(--muted-2);text-align:left}
.fp-foot__grid{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) minmax(0,.6fr) minmax(0,1.35fr);gap:40px;align-items:start}
.fp-foot__logo{width:200px;height:88px;border-radius:14px;border:1px dashed var(--line-strong);display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.03);font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-2);text-align:center;line-height:1.3}
.fp-foot__name{font-family:var(--font-display);font-weight:700;font-size:20px;color:#fff;margin:16px 0 8px}
.fp-foot__name a{min-height:44px;display:inline-flex;align-items:center}
.fp-foot__tag{font-size:14px;color:var(--muted);line-height:1.6;margin:0;max-width:300px}
.fp-foot__h{font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--gold);margin:0 0 16px}
.fp-foot__nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 44px}
.fp-foot__nav a{color:var(--muted);text-decoration:none;font-size:15px;width:fit-content;min-height:44px;display:inline-flex;align-items:center}
.fp-foot__nav a:hover{color:#fff}
@media(hover:hover) and (pointer:fine){.fp-foot__nav a{min-height:26px}}
.fp-foot__form{display:flex;gap:8px;max-width:440px}
.fp-foot__input{flex:1;min-width:0;background:rgba(255,255,255,.05);border:1px solid var(--line-strong);border-radius:999px;padding:12px 16px;min-height:44px;color:#fff;font-size:16px;font-family:inherit;outline:none}
.fp-foot__input::placeholder{color:var(--muted-2)}
.fp-foot__input:focus{border-color:var(--gold)}
.fp-foot__send{border:none;border-radius:999px;padding:12px 18px;min-height:44px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit;background:var(--grad-gold,linear-gradient(135deg,#f0c268,#d99a3e));color:#1a0f28;white-space:nowrap}
.fp-foot__send:hover{filter:brightness(1.08)}
.fp-foot__done{font-size:14.5px;color:var(--gold);margin:0;line-height:1.5}
.fp-foot__note{font-size:12.5px;color:var(--muted-2);margin:10px 0 0}
.fp-foot__soc{display:flex;flex-direction:column;gap:2px}
.fp-foot__soc a,.fp-foot__soc span{display:inline-flex;align-items:center;min-height:44px;gap:10px;color:var(--muted);text-decoration:none;font-size:15px;width:fit-content}
.fp-foot__soc a:hover{color:#fff}
@media(hover:hover) and (pointer:fine){.fp-foot__soc a,.fp-foot__soc span{min-height:26px}}
.fp-foot__soc svg{flex:0 0 auto;color:var(--gold)}
.fp-foot__soc .soon{color:var(--muted-2)}
.fp-foot__soc .soon svg{color:var(--muted-2)}
.fp-foot__bottom{max-width:1240px;margin:48px auto 0;padding-top:20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--muted-2)}
.fp-foot__bottom a{color:var(--gold);text-decoration:none}
@media(hover:none) and (pointer:coarse){.fp-foot__bottom a{display:inline-block;padding:7px 0;min-height:34px}}
.fp-foot__bottom a:hover{text-decoration:underline}
@media(max-width:1000px){.fp-foot__grid{grid-template-columns:minmax(0,1fr);gap:38px}}
`;

/**
 * Frankenplatz Footer — brand + logo slot, page links, newsletter form, socials.
 * `links`: Array<{ label, href }> — колонка «Страницы» (fallback: полный список).
 * `instagram`: URL или null.
 */
function __fpSwissFlag() {
  return React.createElement("svg", { className: "fp-flag", viewBox: "0 0 32 32", role: "img", "aria-label": "Швейцария" },
    React.createElement("rect", { width: 32, height: 32, fill: "#FF0000" }),
    React.createElement("rect", { x: 13, y: 6, width: 6, height: 20, fill: "#FFFFFF" }),
    React.createElement("rect", { x: 6, y: 13, width: 20, height: 6, fill: "#FFFFFF" }));
}
function __fpFlagify(t) {
  if (typeof t !== "string" || t.indexOf("🇨🇭") < 0) return t;
  const out = [];
  t.split("🇨🇭").forEach((p, i) => {
    if (i) out.push(React.createElement(__fpSwissFlag, { key: "f" + i }));
    if (p) out.push(React.createElement("span", { key: "t" + i }, p));
  });
  return out;
}
function Footer({
  brandLine = "Форум о деньгах в Швейцарии · 24–25.10.2026 · Baden 🇨🇭 · 15 мин от Zürich HB",
  links = [],
  instagram = "https://www.instagram.com/frankenplatz.ch/",
  socials = [
    { id: "instagram", label: "Instagram", href: instagram },
  ],
  className = "",
  ...rest
}) {
  useFpStyle("fp-foot-css", CSS);
  const [sent, setSent] = React.useState(false);
  const h = React.createElement;
  /* Футер = ровно то же, что в верхнем меню (site/nav.js), плюс «Билеты»
     (footer: true) и без золотой кнопки. «Калькуляторы» приходят из FP_NAV —
     вручную их дописывать не нужно, иначе на главной выходит дубль. */
  const fromNav = typeof window !== "undefined" && window.FP_NAV
    ? window.FP_NAV(null, { footer: true }).filter((l) => !l.cta).map((l) => ({ label: l.label, href: l.href }))
    : [
        { label: "Программа", href: "index.html#program" },
        { label: "День №1", href: "day1.html" },
        { label: "День №2", href: "day2.html" },
        { label: "Спикерам", href: "speakers.html" },
        { label: "Маркет", href: "brand-market.html" },
        { label: "Сотрудничество", href: "collaboration.html" },
        { label: "Другие форумы", href: "trips.html" },
      ];
  const nav = links.length ? links : fromNav;
  return h("footer", _extends({ className: ["fp-foot", className].filter(Boolean).join(" ") }, rest),
    h("div", { className: "fp-foot__grid" },
      h("div", null,
                h("p", { className: "fp-foot__name" }, h("a", { href: "index.html", style: { color: "inherit", textDecoration: "none" } }, "Frankenplatz.ch"))),
      h("nav", null,
        h("p", { className: "fp-foot__h" }, "Страницы"),
        h("div", { className: "fp-foot__nav" }, nav.map((l, i) => h("a", { key: i, href: l.href }, l.label)))),
      h("div", null,
        h("p", { className: "fp-foot__h" }, "Соцсети"),
        h("div", { className: "fp-foot__soc" }, socials.map((s, i) =>
          s.href
            ? h("a", { key: i, href: s.href, target: "_blank", rel: "noopener" }, s.label)
            : h("span", { key: i, className: "soon" }, s.label)))),
      h("div", null,
        h("p", { className: "fp-foot__h" }, "Новости форума"),
        sent
          ? h("p", { className: "fp-foot__done" }, "Спасибо! Напишем, когда будут новости о программе и спикерах.")
          : h("form", { className: "fp-foot__form", onSubmit: (e) => { e.preventDefault(); setSent(true); } },
              h("input", { className: "fp-foot__input", type: "email", required: true, placeholder: "Твой e-mail", "aria-label": "E-mail" }),
              h("button", { className: "fp-foot__send", type: "submit" }, "Подписаться")),
        !sent && h("p", { className: "fp-foot__note" }, "Никакого спама — только программа и спикеры."))),
    h("div", { className: "fp-foot__bottom" },
      h("span", null, "© 2026 Frankenplatz.ch · ", __fpFlagify(brandLine)), h("span", { className: "fp-foot__legal" }, h("a", { href: "legal.html#impressum" }, "Impressum"), " · ", h("a", { href: "legal.html#agb" }, "AGB"), " · ", h("a", { href: "legal.html#datenschutz" }, "Datenschutz")),
      h("span", null, h("a", { href: instagram || "#", target: "_blank", rel: "noopener" }, "@frankenplatz.ch"))));
}

Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/Footer.jsx", error: String((e && e.message) || e) }); }

// components/chrome/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-top{position:sticky;top:0;left:0;right:0;z-index:80;display:flex;align-items:center;
  justify-content:space-between;gap:16px;padding:16px 26px;background:rgba(20,10,31,.6);
  backdrop-filter:blur(var(--blur-nav));border-bottom:1px solid var(--line)}
.fp-top__logo{font-family:var(--font-display);font-weight:800;font-size:18px;letter-spacing:.01em;color:#fff;
  display:flex;align-items:center;gap:9px;min-height:44px;text-decoration:none}
.fp-top__nav{display:flex;gap:10px;align-items:center}
/* Логотип слева и золотая CTA справа стоят на месте; в две строки уходят
   ТОЛЬКО пункты меню — они лежат в своей группе .fp-top__links и переносятся
   внутри неё, центрируясь относительно друг друга. Группа должна быть
   сжимаемой (flex:0 1 auto; min-width:0), иначе перенос не сработает и меню
   уедет за край. Шапка держится своей колонки: логотип и CTA выровнены по
   контенту страницы — отрицательный «выдох» в отступ ломал бы эту сетку ради
   того, чтобы избежать переноса, а перенос здесь и есть нужное поведение. */
.fp-top__nav{flex:0 1 auto;min-width:0;flex-wrap:nowrap;margin-left:auto}
.fp-top__links{display:flex;flex-wrap:wrap;align-items:center;align-content:center;justify-content:center;gap:0px 10px;flex:0 1 auto;min-width:0}
.fp-top__nav > .fp-top__link--cta{flex:0 0 auto}
/* логотип: при наведении по надписи пробегает золото-лиловый градиент */
.fp-top__logo{background-image:none;background-size:220% 100%;background-position:220% 0;-webkit-background-clip:border-box;background-clip:border-box}
.fp-top__logo:hover,.fp-top__logo:focus-visible{background-image:linear-gradient(100deg,#fff 0%,var(--gold,#E6B450) 28%,var(--lila-bright,#B98BFF) 52%,#fff 78%);
  -webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;
  animation:fp-logo-sweep 2.8s ease-in-out infinite alternate}
@keyframes fp-logo-sweep{from{background-position:220% 0}to{background-position:-20% 0}}
@media(prefers-reduced-motion:reduce){.fp-top__logo:hover,.fp-top__logo:focus-visible{animation:none;background-position:60% 0}}
.fp-top__link{font-size:16px;color:var(--muted);text-decoration:none;padding:8px 13px;white-space:nowrap;
  border-radius:var(--r-sm);transition:color var(--dur-fast),background var(--dur-fast)}
.fp-top__link:hover{color:var(--gold-bright)}
.fp-top__link--active{color:var(--gold);font-weight:var(--fw-bold)}
.fp-top__link--active:hover{color:var(--gold-bright)}
.fp-top__link--cta{background:var(--grad-gold);color:var(--ink-on-gold);font-weight:var(--fw-bold);border-radius:var(--r-full);padding:12px 24px;font-size:16px}
.fp-top__link--cta:hover{transform:translateY(-1px);box-shadow:var(--shadow-gold-sm);color:var(--ink-on-gold)}
/* Узкий десктоп (до бургера): сначала уплотняем интервалы — на ~1366px этого
   хватает, чтобы всё осталось в одну строку. Если и так не влезает (≈1280px),
   меню переносится на вторую строку, строки центрируются относительно друг
   друга, шапка подрастает. Правила ниже базовых: при равной специфичности
   иначе победил бы базовый padding ссылки. */
@media (min-width:1280px) and (max-width:1599px){
  .fp-top .fp-top__link{padding:8px 10px}
  .fp-top .fp-top__link--cta{padding:12px 20px}
  .fp-top .fp-top__links{gap:0px 6px}
}

/* mobile menu */
.fp-top__burger{display:none;position:relative;background:none;border:none;color:#fff;font-size:0;line-height:1;
  cursor:pointer;padding:0;min-width:44px;min-height:44px;border-radius:var(--r-sm)}
.fp-top__burger::before,.fp-top__burger::after{content:"";position:absolute;left:50%;top:50%;width:20px;height:2px;border-radius:2px;background:#fff;transform:translate(-50%,-50%);transition:transform .22s,box-shadow .22s}
.fp-top__burger::before{box-shadow:0 -6px 0 #fff,0 6px 0 #fff}
.fp-top__burger[aria-expanded="true"]::before{box-shadow:none;transform:translate(-50%,-50%) rotate(45deg)}
.fp-top__burger[aria-expanded="true"]::after{transform:translate(-50%,-50%) rotate(-45deg)}
.fp-top__burger:hover{background:rgba(255,255,255,.06)}
.fp-top__menu{position:absolute;top:100%;left:0;right:0;display:none;flex-direction:column;gap:2px;
  padding:8px 16px 16px;background:rgba(20,10,31,.96);backdrop-filter:blur(var(--blur-nav));
  border-bottom:1px solid var(--line)}
.fp-top__menu.is-open{display:flex}
.fp-top__menu .fp-top__link{font-size:16px;padding:13px 12px}
.fp-top__menu .fp-top__link--cta{text-align:center;margin-top:6px}
/* мобильное меню — панель справа на всех «бургерных» ширинах */
.fp-top__menu{left:auto;right:12px;width:min(86vw,340px);margin-top:8px;border:1px solid rgba(255,255,255,.10);border-radius:18px;padding:14px 16px 18px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
/* выезжает справа, а не появляется рывком */
.fp-top__menu{display:flex;visibility:hidden;pointer-events:none;opacity:0;transform:translateX(22px);transition:transform .34s cubic-bezier(.2,.75,.2,1),opacity .22s ease,visibility .34s}
.fp-top__menu.is-open{visibility:visible;pointer-events:auto;opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.fp-top__menu{transition:none}}
.fp-top__menu-foot{display:flex;flex-direction:column;gap:14px;margin-top:14px;padding-top:16px;border-top:1px solid rgba(255,255,255,.10)}
.fp-top__menu-ig{align-self:flex-start;width:46px;height:46px;display:grid;place-items:center;border:1px solid rgba(230,180,80,.34);border-radius:50%}
.fp-top__menu-ig svg{width:22px;height:22px;fill:#E6B450}
.fp-top__menu-cta{display:flex;align-items:center;justify-content:center;min-height:50px;padding:0 18px;border-radius:999px;background:linear-gradient(135deg,#E6B450,#F5C969);color:#241703;font-weight:800;font-size:16px;text-decoration:none}
.fp-top__menu-legal{margin:0;font-size:15px;line-height:1.5;color:#9C90AE}
@media (max-width:1279px){
  .fp-top__nav{display:none}
  .fp-top__burger{display:block}
}
`;

/**
 * Frankenplatz TopBar — fixed frosted nav. Bold type wordmark left, links + one gold CTA
 * right on desktop; a hamburger menu that drops the full link list on mobile.
 * `links`: Array<{ label, href, cta?: boolean }>.
 */
function TopBar({
  brand = "Frankenplatz.ch",
  logoGlyph = null,
  brandHref = "index.html",
  links = [],
  className = "",
  ...rest
}) {
  useFpStyle("fp-top-css", CSS);
  const [open, setOpen] = React.useState(false);
  const menuCtaHref = /\/(trips|calculators)\//.test(typeof location === "undefined" ? "" : location.pathname) ? "../index.html#reg" : "index.html#reg";
  const linkEls = links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: ["fp-top__link", l.cta ? "fp-top__link--cta" : "", l.active ? "fp-top__link--active" : ""].filter(Boolean).join(" "),
    href: l.href,
    "aria-current": l.active ? "page" : undefined,
    onClick: () => setOpen(false)
  }, l.label));
  return /*#__PURE__*/React.createElement("header", _extends({
    className: ["fp-top", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("a", {
    className: "fp-top__logo",
    href: brandHref
  }, logoGlyph ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, logoGlyph) : null, brand), /*#__PURE__*/React.createElement("nav", {
    className: "fp-top__nav"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fp-top__links"
  }, linkEls.filter((_, i) => !links[i].cta)), linkEls.filter((_, i) => links[i].cta)), /*#__PURE__*/React.createElement("button", {
    className: "fp-top__burger",
    "aria-label": open ? "Закрыть меню" : "Открыть меню",
    "aria-expanded": open,
    onClick: () => setOpen(v => !v)
  }), /*#__PURE__*/React.createElement("div", {
    className: ["fp-top__menu", open ? "is-open" : ""].filter(Boolean).join(" ")
  }, linkEls, /*#__PURE__*/React.createElement("div", {
    className: "fp-top__menu-foot"
  }, /*#__PURE__*/React.createElement("a", {
    className: "fp-top__menu-ig",
    href: "https://www.instagram.com/frankenplatz.ch/",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Instagram Frankenplatz"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.23 1 .5 1.5.95.45.45.72.9.95 1.5.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.23.6-.5 1-.95 1.5-.45.45-.9.72-1.5.95-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.23-1-.5-1.5-.95-.45-.45-.72-.9-.95-1.5-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.23-.6.5-1 .95-1.5.45-.45.9-.72 1.5-.95.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.07-1 .04-1.5.2-1.9.35-.4.15-.7.34-1 .64-.3.3-.5.6-.64 1-.15.4-.3.9-.35 1.9C3.24 9.3 3.2 9.7 3.2 12s0 2.7.07 4c.04 1 .2 1.5.35 1.9.15.4.34.7.64 1 .3.3.6.5 1 .64.4.15.9.3 1.9.35 1.3.06 1.7.07 4.8.07s3.5 0 4.8-.07c1-.04 1.5-.2 1.9-.35.4-.15.7-.34 1-.64.3-.3.5-.6.64-1 .15-.4.3-.9.35-1.9.06-1.3.07-1.7.07-4s0-2.7-.07-4c-.04-1-.2-1.5-.35-1.9a2.7 2.7 0 0 0-.64-1 2.7 2.7 0 0 0-1-.64c-.4-.15-.9-.3-1.9-.35-1.3-.06-1.7-.07-4.8-.07zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.1-2.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"
  }))), links.some(l => l.cta) ? null : /*#__PURE__*/React.createElement("a", {
    className: "fp-top__menu-cta",
    href: menuCtaHref
  }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0444\u043E\u0440\u0443\u043C"), /*#__PURE__*/React.createElement("p", {
    className: "fp-top__menu-legal"
  }, "Frankenplatz \u00B7 24\u201325.10.2026 \u00B7 Baden", /*#__PURE__*/React.createElement("br", null), "\u00A9 2026 Frankenplatz.ch \u2014 \u0432\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B"))));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/content/ComparisonTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-tbl{width:100%;border-collapse:separate;border-spacing:0;border-radius:var(--r-lg);
  overflow:hidden;border:1px solid var(--line)}
.fp-tbl th{font-size:13px;text-transform:uppercase;letter-spacing:.06em;text-align:left;
  padding:16px 18px;font-weight:var(--fw-bold)}
.fp-tbl th.fp-tbl__yes{background:rgba(139,229,155,.14);color:var(--green-text)}
.fp-tbl th.fp-tbl__no{background:rgba(255,122,138,.12);color:var(--red)}
.fp-tbl td{padding:14px 18px;border-top:1px solid var(--line);vertical-align:top;
  font-size:15.5px;color:var(--muted);line-height:1.5}
@media (max-width:720px){
  .fp-tbl th{padding:12px 12px;font-size:12px}
  .fp-tbl td{padding:11px 12px;font-size:14px}
}
.fp-tbl td.fp-tbl__yes{background:rgba(139,229,155,.05);color:var(--text)}
`;

/**
 * Frankenplatz ComparisonTable — the "что будет / чего не будет" two-column
 * honesty table. Green "yes" column vs red "no" column.
 * rows: Array<{ yes: node, no: node }>.
 */
function ComparisonTable({
  yesHead = "✓ Что будет",
  noHead = "✗ Чего не будет",
  rows = [],
  className = "",
  ...rest
}) {
  useFpStyle("fp-tbl-css", CSS);
  return /*#__PURE__*/React.createElement("table", _extends({
    className: ["fp-tbl", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "fp-tbl__yes"
  }, yesHead), /*#__PURE__*/React.createElement("th", {
    className: "fp-tbl__no"
  }, noHead))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "fp-tbl__yes"
  }, r.yes), /*#__PURE__*/React.createElement("td", null, r.no)))));
}
Object.assign(__ds_scope, { ComparisonTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ComparisonTable.jsx", error: String((e && e.message) || e) }); }

// components/content/FAQItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-faq{background:var(--glass);border:1px solid var(--line);border-radius:var(--r-md);
  padding:22px 26px;transition:border-color var(--dur-btn)}
.fp-faq:hover{border-color:rgba(154,111,212,.35)}
.fp-faq__q{font-weight:var(--fw-bold);color:#fff;margin-bottom:7px;font-size:17px;line-height:1.35}
.fp-faq__a{margin:0;font-size:15.5px;color:var(--muted);line-height:1.5}
.fp-faq__a strong{color:#fff;font-weight:var(--fw-bold)}
/* pain-hook variant: red question, no radius change */
.fp-faq--hook .fp-faq__q{color:var(--red)}
`;

/**
 * Frankenplatz FAQItem — an objection / question card. The question is bold
 * white (or red-pink for the "pain hook" variant), answer is muted below.
 *  variant: faq (default) | hook  — hook makes the question red (pain framing)
 */
function FAQItem({
  q,
  variant = "faq",
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-faq-css", CSS);
  const cls = ["fp-faq", variant === "hook" ? "fp-faq--hook" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "fp-faq__q"
  }, q), typeof children === "string" ? /*#__PURE__*/React.createElement("p", {
    className: "fp-faq__a"
  }, children) : children);
}
Object.assign(__ds_scope, { FAQItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FAQItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-body);
  font-size:13px;font-weight:var(--fw-semibold);padding:8px 16px;border-radius:var(--r-round);
  line-height:1;white-space:nowrap}
.fp-badge--lila{color:var(--lila-bright);background:rgba(154,111,212,.12);border:1px solid rgba(154,111,212,.30)}
.fp-badge--gold{color:var(--gold);background:rgba(230,180,80,.12);border:1px solid transparent;
  font-size:11px;font-weight:var(--fw-bold);letter-spacing:.05em;text-transform:uppercase;padding:5px 12px;border-radius:20px}
.fp-badge--green{color:var(--ink-on-green);background:var(--green);border:none;
  font-size:11px;font-weight:var(--fw-bold);letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:20px}
.fp-badge__dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold)}
`;

/**
 * Frankenplatz Badge / pill label.
 *  - lila  : hero eyebrow pill with a glowing gold dot ("24–25 октября…")
 *  - gold  : small uppercase category tag ("🎯 Практик")
 *  - green : "Бесплатно" free-tag
 */
function Badge({
  variant = "lila",
  dot = false,
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-badge-css", CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["fp-badge", `fp-badge--${variant}`, className].filter(Boolean).join(" ")
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "fp-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once (self-contained; hover/press states need real CSS). */
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--font-body);font-weight:var(--fw-bold);font-size:16px;text-decoration:none;
  padding:16px 30px;border-radius:var(--r-full);border:none;cursor:pointer;
  transition:transform var(--dur-btn),box-shadow var(--dur-btn),background var(--dur-btn);
  white-space:nowrap;line-height:1}
.fp-btn--sm{padding:11px 20px;font-size:14px}
.fp-btn--block{width:100%}
.fp-btn--gold{background:var(--grad-gold);color:var(--ink-on-gold)}
.fp-btn--gold:hover{transform:var(--lift);box-shadow:var(--shadow-gold)}
.fp-btn--ghost{background:var(--glass);color:#fff;border:1px solid var(--line);backdrop-filter:blur(var(--blur-glass))}
.fp-btn--ghost:hover{background:var(--glass-2);transform:var(--lift)}
.fp-btn--gold:active,.fp-btn--ghost:active{transform:translateY(0)}
.fp-btn:disabled,.fp-btn[aria-disabled="true"]{opacity:.5;pointer-events:none}
`;

/**
 * Frankenplatz Button — pill CTA. Gold gradient (primary) or frosted ghost.
 */
function Button({
  variant = "gold",
  size = "md",
  block = false,
  as,
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-btn-css", CSS);
  const Tag = as || (rest.href ? "a" : "button");
  const cls = ["fp-btn", `fp-btn--${variant}`, size === "sm" ? "fp-btn--sm" : "", block ? "fp-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);
  font-size:12.5px;font-weight:var(--fw-bold);letter-spacing:var(--ls-eyebrow);
  text-transform:uppercase;color:var(--gold);margin-bottom:18px}
.fp-eyebrow::before{content:"";width:26px;height:1.5px;background:var(--gold);display:inline-block;flex:none}
.fp-eyebrow--center{justify-content:center}
`;

/**
 * Frankenplatz Eyebrow — the uppercase gold kicker above section titles,
 * with a short gold rule before the text. Set `center` inside centered cards.
 */
function Eyebrow({
  center = false,
  children,
  className = "",
  ...rest
}) {
  useFpStyle("fp-eyebrow-css", CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["fp-eyebrow", center ? "fp-eyebrow--center" : "", className].filter(Boolean).join(" ")
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Marquee.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useFpStyle(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
const CSS = `
.fp-marquee{overflow:hidden;white-space:nowrap;border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);background:rgba(255,255,255,.02);padding:16px 0}
.fp-marquee__track{display:inline-block;white-space:nowrap;animation:fp-marquee-scroll 32s linear infinite;will-change:transform}
.fp-marquee:hover .fp-marquee__track{animation-play-state:paused}
.fp-marquee__item{font-family:var(--font-display);font-size:14px;font-weight:var(--fw-semibold);
  letter-spacing:.02em;color:var(--lila-bright);text-transform:uppercase;padding:0 4px}
.fp-marquee__sep{color:var(--gold);padding:0 14px}
@keyframes fp-marquee-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.fp-marquee__track{animation:none}}
`;

/**
 * Frankenplatz Marquee — horizontally scrolling row of uppercase brand phrases
 * (lilac) separated by gold dots. Pauses on hover. Items are duplicated
 * internally for a seamless loop.
 */
function Marquee({
  items = [],
  className = "",
  ...rest
}) {
  useFpStyle("fp-marquee-css", CSS);
  const seq = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["fp-marquee", className].filter(Boolean).join(" "),
    "aria-hidden": "true"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "fp-marquee__track"
  }, seq.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "fp-marquee__item"
  }, it), /*#__PURE__*/React.createElement("span", {
    className: "fp-marquee__sep"
  }, "\xB7")))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marquee.jsx", error: String((e && e.message) || e) }); }

// test/Day1Test.jsx
try { (() => {
/* Frankenplatz — Day 1 page. Recreates uploads/day1.html. Exposes window.Day1. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Card,
  StatCard,
  ReliefBand,
  FAQItem
} = window.FrankenplatzDesignSystem_144b92;
const D1_NAV = [{
  label: "На главную",
  href: "index.html"
}, {
  label: "Программа",
  href: "index.html#program"
}, {
  label: "День 1",
  href: "day1.html",
  active: true
}, {
  label: "День 2",
  href: "day2.html"
}, {
  label: "Спикерам",
  href: "speakers.html"
}, {
  label: "Записаться",
  href: "index.html#reg",
  cta: true
}];
function Insp({
  k,
  t,
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "gold",
    tone: "gold",
    className: "insp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, children));
}
function Day1Test() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: D1_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0414\u0435\u043D\u044C 1 \xB7 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \xB7 \u0431\u0430\u0437\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0441\u0442\u043E\u0438\u0442 \u043D\u0430\u0447\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("h1", null, "\u0413\u0434\u0435 \u0431\u0430\u0431\u043A\u0438 \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0438 \u043A\u0430\u043A", /*#__PURE__*/React.createElement("br", null), "\u0438\u0445 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0414\u0435\u043D\u044C 1 \u2014 \u043F\u0440\u043E \u0441\u0430\u043C\u044B\u0435 \u0447\u0430\u0441\u0442\u044B\u0435 \u0438 \u0441\u0430\u043C\u044B\u0435 \u0442\u0438\u0445\u0438\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0435\u0441\u0442\u044C \u043F\u043E\u0447\u0442\u0438 \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E, \u043A\u0442\u043E \u0436\u0438\u0432\u0451\u0442 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u041C\u044B \u0438\u0445 \u043D\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0432\u0441\u043B\u0443\u0445. \u0422\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438\u0439\u0442\u0438 \u0438 \u043F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C \u2014 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u044F."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "pain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0423\u0437\u043D\u0430\u0451\u0448\u044C \u0441\u0435\u0431\u044F?"), /*#__PURE__*/React.createElement("h2", null, "\u0416\u0438\u0432\u0451\u0448\u044C \u0437\u0434\u0435\u0441\u044C \u2014 \u0430 \u0434\u0435\u043D\u044C\u0433\u0438", /*#__PURE__*/React.createElement("br", null), "\u0436\u0438\u0432\u0443\u0442 \u0441\u0432\u043E\u0435\u0439 \u0436\u0438\u0437\u043D\u044C\u044E"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u043D\u0435 \u043F\u0440\u0438\u043D\u044F\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u2014 \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0442\u0435\u0440\u044F\u0435\u0442 \u0442\u0438\u0445\u043E \u0438 \u0433\u043E\u0434\u0430\u043C\u0438.", /*#__PURE__*/React.createElement("br", null), "\u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043B \u0442\u0435\u0431\u0435 \u043A\u0430\u0440\u0442\u0443."), /*#__PURE__*/React.createElement("div", {
    className: "grid g2"
  }, /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0414\u0435\u043D\u044C\u0433\u0438 \u0443\u0445\u043E\u0434\u044F\u0442, \u0430 \u043A\u0443\u0434\u0430 \u2014 \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E\xBB"
  }, "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u0438\u043B\u0438\u0447\u043D\u0430\u044F, \u043A \u043A\u043E\u043D\u0446\u0443 \u043C\u0435\u0441\u044F\u0446\u0430 \u043D\u043E\u043B\u044C. Krankenkasse, \u043D\u0430\u043B\u043E\u0433\u0438, \u0430\u0440\u0435\u043D\u0434\u0430 \u2014 \u0431\u0443\u0434\u0442\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043A\u043E\u0440\u043C\u0438\u0448\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u041F\u043E\u0434\u0443\u0448\u043A\u0438 \u043D\u0435\u0442. \u0418\u043B\u0438 \u0435\u0441\u0442\u044C, \u043D\u043E \u0441\u043C\u0435\u0448\u043D\u0430\u044F\xBB"
  }, "\u041F\u043E\u0442\u0435\u0440\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0437\u0430\u0432\u0442\u0440\u0430 \u2014 \u043D\u0430 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0445\u0432\u0430\u0442\u0438\u0442? \u0418 \u043A\u0430\u043A \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u0441\u044A\u0435\u043B\u0430 \u0438\u043D\u0444\u043B\u044F\u0446\u0438\u044F."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0412\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u0435, \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0441\u0447\u0435\u0442\u0443\xBB"
  }, "\u041D\u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439, \u043D\u0438 3a \u2014 \u0432\u0441\u0451 \u043B\u0435\u0436\u0438\u0442 \u043D\u0430 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0441\u0447\u0451\u0442\u0435 \u0438 \u0442\u0438\u0445\u043E \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u0442\u0441\u044F."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0410 \u043F\u0435\u043D\u0441\u0438\u044F? \u0410 \u0441\u0442\u0430\u0440\u043E\u0441\u0442\u044C?\xBB"
  }, "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u2014 ", /*#__PURE__*/React.createElement("strong", null, "\u043E\u043D\u0430 \u0442\u0435\u0431\u0435 \u0432\u043E\u043E\u0431\u0449\u0435 \u043A\u0430\u043F\u0430\u0435\u0442?"), " AHV, 3a \u0438 BVG \u2014 \u0442\u0443\u043C\u0430\u043D, \u0430 \u043A\u0430\u0436\u0434\u044B\u0439 \u0443\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0439 \u0433\u043E\u0434 \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C.")))), /*#__PURE__*/React.createElement("section", {
    id: "couple"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0422\u043E\u043D\u043A\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("span", {
    className: "fifty-w"
  }, "\xAB\u0424\u044E\u043D\u0444\u0446\u0438\u0433-\u0444\u044E\u043D\u0444\u0446\u0438\u0433\xBB", /*#__PURE__*/React.createElement("span", {
    className: "fifty__tag",
    "aria-hidden": "true"
  }, "50/50")), /*#__PURE__*/React.createElement("br", null), " \u2014 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0432\u0435\u0449\u0438,", /*#__PURE__*/React.createElement("br", null), "\u043E \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u0443\u0442 \u043C\u043E\u043B\u0447\u0430\u0442"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0430\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u2014 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0434\u0430\u0436\u0435 \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u0430\u0440\u044B. \u041E\u0431\u0449\u0438\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u0437\u0434\u0435\u0441\u044C \u0441\u043A\u043E\u0440\u0435\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435. \u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E \u043D\u0435\u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u2014 \u044D\u0442\u043E \u043C\u0435\u043D\u0442\u0430\u043B\u0438\u0442\u0435\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "fifty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fifty__half fifty__half--l"
  }, /*#__PURE__*/React.createElement("b", null, "\xAB\u0424\u044E\u043D\u0444\u0446\u0438\u0433-\u0444\u044E\u043D\u0444\u0446\u0438\u0433\xBB"), /*#__PURE__*/React.createElement("p", null, "\u0420\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0447\u0435\u0442\u0430, \u0432\u0441\u0451 \u043F\u043E\u043F\u043E\u043B\u0430\u043C, \u0447\u0451\u0442\u043A\u0438\u0439 \u0443\u0447\u0451\u0442. \u0410 \u0438\u043D\u043E\u0433\u0434\u0430 \u0442\u044B \u0438 \u0441\u0430\u043C\u0430 \u0445\u043E\u0447\u0435\u0448\u044C \u0431\u044B\u0442\u044C \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0439 \u2014 \u043D\u043E \u043D\u0435 \u0437\u043D\u0430\u0435\u0448\u044C, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C.")), /*#__PURE__*/React.createElement("svg", {
    className: "fifty__cut",
    viewBox: "0 0 24 176",
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "12,0 6,28 18,52 8,84 17,116 6,148 12,176",
    pathLength: "300"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fifty__half fifty__half--r"
  }, /*#__PURE__*/React.createElement("b", null, "\u0420\u0430\u0437\u0434\u0435\u043B 50/50 \u2014 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"), /*#__PURE__*/React.createElement("p", null, "\u0411\u0435\u0437 \u0431\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \u0432\u0441\u0451 \u043D\u0430\u0436\u0438\u0442\u043E\u0435 \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043F\u043E\u0440\u043E\u0432\u043D\u0443. \u0414\u0435\u0442\u0430\u043B\u0438 (\u0447\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442, \u0447\u0442\u043E \u0441 3a) \u0437\u043D\u0430\u044E\u0442 \u0435\u0434\u0438\u043D\u0438\u0446\u044B."))), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E \u0440\u0430\u0441\u0447\u0451\u0442 \u0432\u043C\u0435\u0441\u0442\u043E \u043B\u044E\u0431\u0432\u0438 \u2014 \u044D\u0442\u043E \u043F\u0440\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0439 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440 \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u0432 \u043F\u0430\u0440\u0435"), ", \u043F\u043E\u043A\u0430 \u0432\u0441\u0451 \u0445\u043E\u0440\u043E\u0448\u043E."))), /*#__PURE__*/React.createElement("section", {
    id: "cost"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0426\u0435\u043D\u0430 \u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("h2", null, "\u041D\u0435 \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u0448\u044C\u0441\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u2014 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u0435\u0448\u0438\u0442 \u0437\u0430 \u0442\u0435\u0431\u044F"), /*#__PURE__*/React.createElement("div", {
    className: "statrow"
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "2 520",
    label: "CHF \u2014 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u043F\u0435\u043D\u0441\u0438\u0438 AHV \u0432 \u043C\u0435\u0441\u044F\u0446, \u0434\u0430\u0436\u0435 \u0437\u0430 44 \u0433\u043E\u0434\u0430 \u0441\u0442\u0430\u0436\u0430"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "134 000+",
    label: "\u043F\u0435\u043D\u0441\u0438\u043E\u043D\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0431\u0440\u0430\u043B\u0438\u0441\u044C \u0437\u0430 \u0433\u0440\u0430\u043D\u0438\u0446\u0443 \u2014 \u0442\u0430\u043C \u0442\u0435 \u0436\u0435 \u0444\u0440\u0430\u043D\u043A\u0438 \u0436\u0438\u0432\u0443\u0442 \u0434\u043E\u043B\u044C\u0448\u0435"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "+84%",
    label: "\u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0436\u0438\u0437\u043D\u044C \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0434\u043E\u0440\u043E\u0436\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u043E \u0415\u0421"
  })), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0433\u043E\u0441\u043F\u0435\u043D\u0441\u0438\u044E \u0440\u0438\u0441\u043A\u043E\u0432\u0430\u043D\u043D\u043E: \u0435\u0441\u043B\u0438 \u043C\u0435\u0441\u0442\u043D\u044B\u043C \u0441\u043E \u0441\u0442\u0430\u0436\u0435\u043C 44 \u0433\u043E\u0434\u0430 \u0431\u044B\u0432\u0430\u0435\u0442 \u043C\u0430\u043B\u043E \u2014 \u0442\u0435\u043C \u0431\u043E\u043B\u0435\u0435 \u0442\u0435\u043C, \u043A\u0442\u043E \u043D\u0430\u0447\u0430\u043B \u043F\u043E\u0437\u0436\u0435. ", /*#__PURE__*/React.createElement("strong", null, "\u041E \u043F\u0435\u043D\u0441\u0438\u0438 \u043B\u0443\u0447\u0448\u0435 \u043F\u043E\u0434\u0443\u043C\u0430\u0442\u044C, \u043F\u043E\u043A\u0430 \u0435\u0449\u0451 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C.")))), /*#__PURE__*/React.createElement("section", {
    id: "divorce"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0414\u0435\u043B\u0438\u043A\u0430\u0442\u043D\u0430\u044F \u0442\u0435\u043C\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0410 \u0447\u0442\u043E \u0435\u0441\u043B\u0438\u2026 \u0440\u0430\u0437\u0432\u043E\u0434?", /*#__PURE__*/React.createElement("span", {
    className: "dh",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "dhg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#F5484D"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#A81226"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "dhl"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0,0 50,0 50,24 44,41 55,56 46,71 52,90 52,100 0,100"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "dhr"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "50,0 100,0 100,100 52,100 52,90 46,71 55,56 44,41 50,24"
  }))), /*#__PURE__*/React.createElement("g", {
    className: "dh-l",
    clipPath: "url(#dhl)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M50 88 C22 66 10 52 10 36 A18 18 0 0 1 46 30 L50 36 L54 30 A18 18 0 0 1 90 36 C90 52 78 66 50 88 Z",
    fill: "url(#dhg)"
  })), /*#__PURE__*/React.createElement("g", {
    className: "dh-r",
    clipPath: "url(#dhr)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M50 88 C22 66 10 52 10 36 A18 18 0 0 1 46 30 L50 36 L54 30 A18 18 0 0 1 90 36 C90 52 78 66 50 88 Z",
    fill: "url(#dhg)"
  }))))), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0420\u0430\u0437\u0432\u043E\u0434. \u041D\u0435\u043F\u0440\u0438\u044F\u0442\u043D\u043E, \u043D\u0435 \u0445\u043E\u0447\u0435\u0442\u0441\u044F. \u041D\u043E \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u043E\u0447\u0442\u0438 4 \u0438\u0437 10 \u0431\u0440\u0430\u043A\u043E\u0432"), " \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0430\u043A \u2014 \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u0442\u044F\u0436\u0435\u043B\u0435\u0435 \u0442\u043E\u043C\u0443, \u043A\u0442\u043E \u043C\u0435\u043D\u044C\u0448\u0435 \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u043B. \u041F\u043E \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044E \u0411\u0435\u0440\u043D\u0441\u043A\u043E\u0439 \u0432\u044B\u0441\u0448\u0435\u0439 \u0448\u043A\u043E\u043B\u044B (BFH), \u043C\u0430\u043C\u044B \u0441 \u0434\u0435\u0442\u044C\u043C\u0438 \u0442\u0435\u0440\u044F\u044E\u0442 ", /*#__PURE__*/React.createElement("strong", null, "\u043E\u043A\u043E\u043B\u043E 38% \u0434\u043E\u0445\u043E\u0434\u0430"), " (\u043C\u0443\u0436\u0447\u0438\u043D\u044B \u2014 3%) \u2014 \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u043D\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u043B\u0438\u0441\u044C \u0437\u0430\u0440\u0430\u043D\u0435\u0435.")), /*#__PURE__*/React.createElement("div", {
    className: "statrow"
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "\u221238%",
    label: "\u0434\u043E\u0445\u043E\u0434\u0430 \u0443 \u043C\u0430\u043C\u044B \u0441 \u0434\u0435\u0442\u044C\u043C\u0438 \u0432 \u043F\u0435\u0440\u0432\u044B\u0435 2 \u0433\u043E\u0434\u0430 \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0432\u043E\u0434\u0430"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "~40%",
    label: "\u0431\u0440\u0430\u043A\u043E\u0432 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0440\u0430\u0437\u0432\u043E\u0434\u043E\u043C"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "50/50",
    label: "\u0442\u0430\u043A \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043D\u0430\u0436\u0438\u0442\u043E\u0435 \u2014 \u0431\u0435\u0437 \u0431\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "relief"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breath",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "\u0412\u044B\u0434\u043E\u0445\u043D\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438\u0439\u0442\u0438", /*#__PURE__*/React.createElement("br", null), "\u0438 \u043F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0422\u0435\u0431\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u043D\u0438 \u0432 \u0447\u0451\u043C \u043F\u0440\u0438\u0437\u043D\u0430\u0432\u0430\u0442\u044C\u0441\u044F. \u041C\u044B ", /*#__PURE__*/React.createElement("strong", null, "\u043D\u0435 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u0432\u043E\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u0441\u043E \u0441\u0446\u0435\u043D\u044B"), " \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0431\u043E\u043B\u044C \u0432\u0441\u043B\u0443\u0445. \u0422\u044B \u0437\u0430\u0431\u0438\u0440\u0430\u0435\u0448\u044C \u0431\u0430\u0437\u0443: \u043A\u0430\u043A \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E, \u0447\u0442\u043E \u0441 3a \u0438 \u043F\u0435\u043D\u0441\u0438\u0435\u0439."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u042D\u0442\u043E \u0441\u043D\u0438\u043C\u0430\u0435\u0442 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0431\u0430\u0440\u044C\u0435\u0440"
  }, "\u041E \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u0435\u0449\u0430\u0445 \u0441\u0442\u0440\u0430\u0448\u043D\u043E \u0441\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0430\u0436\u0435 \u0441\u0430\u043C\u044B\u043C \u0431\u043B\u0438\u0437\u043A\u0438\u043C \u2014 \u043D\u0435 \u0442\u043E \u0447\u0442\u043E \u0447\u0443\u0436\u043E\u043C\u0443 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0443. \u0410 \u0437\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0431\u0430\u0437\u0443, ", /*#__PURE__*/React.createElement("strong", null, "\u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044F\u0441\u044C \u0432\u043E\u043E\u0431\u0449\u0435 \u043D\u0438\u043A\u043E\u043C\u0443."), " \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0442\u0438\u0445\u043E \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u2014 \u043F\u043E\u0442\u043E\u043C \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0448\u0430\u0433.")))), /*#__PURE__*/React.createElement("section", {
    id: "inspire"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0418 \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E \u0442\u0440\u0435\u0432\u043E\u0433\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u0410 \u0435\u0449\u0451 \u2014 \u043F\u0440\u043E \u0442\u043E,", /*#__PURE__*/React.createElement("br", null), "\u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u043E-\u0434\u0440\u0443\u0433\u043E\u043C\u0443"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0414\u0435\u043D\u044C 1 \u2014 \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0437\u0431\u043E\u0440 \u0431\u043E\u043B\u0435\u0439.", /*#__PURE__*/React.createElement("br", null), "\u0420\u044F\u0434\u043E\u043C \u2014 \u043B\u044E\u0434\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0438 \u0441 \u0442\u0435\u0445 \u0436\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432, \u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E \u0438\u043C\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Insp, {
    k: "\u041F\u043E\u0434\u0443\u0448\u043A\u0430 \u0441 \u043D\u0443\u043B\u044F",
    t: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043E\u043F\u043E\u0440\u0443"
  }, "\u041A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u043B\u044E\u0434\u0438 \u0441 \u043E\u0431\u044B\u0447\u043D\u043E\u0439 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u043E\u0439 \u0441\u043E\u0431\u0440\u0430\u043B\u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0443\u044E \u043F\u043E\u0434\u0443\u0448\u043A\u0443 \u0438 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0438 \u0431\u043E\u044F\u0442\u044C\u0441\u044F \u0437\u0430\u0432\u0442\u0440\u0430\u0448\u043D\u0435\u0433\u043E \u0434\u043D\u044F."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u041F\u0435\u0440\u0432\u044B\u0435 \u0448\u0430\u0433\u0438",
    t: "\u0421\u0432\u043E\u0438 \u0434\u0435\u043D\u044C\u0433\u0438"
  }, "\u041A\u0430\u043A \u043D\u0430\u0447\u0430\u0442\u044C \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E 100 \u0444\u0440\u0430\u043D\u043A\u043E\u0432 \u0438 \u0437\u0430\u0432\u0435\u0441\u0442\u0438 \u0442\u043E, \u0447\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F, \u0430 \u043D\u0435 \u043B\u0435\u0436\u0438\u0442 \u043C\u0451\u0440\u0442\u0432\u044B\u043C \u0433\u0440\u0443\u0437\u043E\u043C."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0421\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435",
    t: "\u0417\u0430\u0449\u0438\u0442\u0438\u0442\u044C \u0441\u0435\u0431\u044F"
  }, "\u041A\u0430\u043A \u0437\u0430\u0440\u0430\u043D\u0435\u0435 \u0440\u0430\u0437\u043B\u043E\u0436\u0438\u0442\u044C \u0434\u0435\u043D\u044C\u0433\u0438 \u0432 \u043F\u0430\u0440\u0435 \u0438 \u0432 \u0441\u0435\u043C\u044C\u0435 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u043B\u044E\u0431\u043E\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043D\u0435 \u0441\u0442\u0430\u043B \u043A\u0430\u0442\u0430\u0441\u0442\u0440\u043E\u0444\u043E\u0439.")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, /*#__PURE__*/React.createElement("strong", null, "\u0417\u043D\u0430\u0442\u044C \u0431\u0430\u0437\u0443 \u2014 \u0437\u043D\u0430\u0447\u0438\u0442 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C \u0442\u0440\u0435\u0432\u043E\u0436\u0438\u0442\u044C\u0441\u044F."), " \u0418\u043C\u0435\u043D\u043D\u043E \u0437\u0430 \u044D\u0442\u0438\u043C \u0438 \u0441\u0442\u043E\u0438\u0442 \u043F\u0440\u0438\u0439\u0442\u0438."), /*#__PURE__*/React.createElement("div", {
    className: "cta-mid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cta-mid__note"
  }, "\u0412 \u0437\u0430\u043B\u0435 ", /*#__PURE__*/React.createElement("b", null, "\u0432\u0441\u0435\u0433\u043E 500 \u043C\u0435\u0441\u0442"), ". \u041D\u0430 \u0440\u0430\u043D\u043D\u0435\u0439 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0446\u0435\u043D\u0430 \u043D\u0438\u0436\u0435 \u2014 \u0430 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0414\u043D\u044F 1 \u043F\u0440\u0438\u0434\u0451\u0442 \u0442\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u043E\u0439."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0414\u0435\u043D\u044C 1 \xB7 Frankenplatz 2026"),
    title: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u0430\u0437\u0443 \u2014 \u0438 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C \u0442\u0435\u0440\u044F\u0442\u044C",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "index.html#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u042D\u0442\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0435\u0441\u0442\u044C \u043F\u043E\u0447\u0442\u0438 \u0443 \u0432\u0441\u0435\u0445 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043E \u043D\u0438\u0445 \u043C\u043E\u043B\u0447\u0430\u0442. \u041D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0438\u0445\u043E \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0438 \u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0432\u0435\u043A\u0442\u043E\u0440. \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0435\u0448\u0430\u0442\u044C \u0442\u0435\u0431\u0435.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "На главную",
      href: "index.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }));
}
window.Day1Test = Day1Test;
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/Day1Test.jsx", error: String((e && e.message) || e) }); }

// test/Day2Test.jsx
try { (() => {
/* Frankenplatz — Day 2 page. Recreates uploads/day2.html. Exposes window.Day2. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Marquee,
  Card,
  ReliefBand
} = window.FrankenplatzDesignSystem_144b92;
const D2_NAV = [{
  label: "На главную",
  href: "index.html"
}, {
  label: "Программа",
  href: "index.html#program"
}, {
  label: "День 1",
  href: "day1.html"
}, {
  label: "День 2",
  href: "day2.html",
  active: true
}, {
  label: "Спикерам",
  href: "speakers.html"
}, {
  label: "Записаться",
  href: "index.html#reg",
  cta: true
}];
function Topic({
  badge,
  title,
  body,
  example
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "gold",
    className: "sp"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, body), /*#__PURE__*/React.createElement("div", {
    className: "ex"
  }, "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: ", /*#__PURE__*/React.createElement("b", null, example)));
}
function Insp({
  k,
  t,
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "gold",
    tone: "gold",
    className: "insp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, children));
}

/* риск ↔ доходность: каждый инструмент — точка (x=риск %, y=доходность %) */
const INSTRUMENTS = [{
  x: 16,
  y: 22,
  tone: "gold",
  name: "Твёрдые активы",
  note: "золото, ювелирка — держат стоимость"
}, {
  x: 32,
  y: 50,
  tone: "lila",
  name: "Недвижимость для жизни",
  note: "квартира под себя за рубежом"
}, {
  x: 60,
  y: 62,
  tone: "lila",
  name: "Портфель",
  note: "диверсификация, аллокация"
}, {
  x: 78,
  y: 91,
  tone: "gold",
  name: "Недвижимость под сдачу",
  note: "доход минус налоги и расходы"
}];
function RiskReturnMatrix() {
  return /*#__PURE__*/React.createElement("div", {
    className: "rrm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rrm__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rrm__ylab"
  }, "\u0414\u043E\u0445\u043E\u0434\u043D\u043E\u0441\u0442\u044C \u2192"), /*#__PURE__*/React.createElement("div", {
    className: "rrm__frame"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "rrm__lines",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "rrmG",
    x1: "0",
    y1: "1",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#E6B450"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#B98BFF"
  }))), /*#__PURE__*/React.createElement("polyline", {
    className: "rrm__line-base",
    points: "0,100 16,78 32,50 60,38 78,9"
  }), /*#__PURE__*/React.createElement("polyline", {
    className: "rrm__line-lit",
    points: "0,100 16,78 32,50 60,38 78,9"
  })), INSTRUMENTS.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.name,
    className: "rrm__pt " + it.tone,
    style: {
      left: it.x + "%",
      bottom: it.y + "%",
      "--d": (it.x / 100 * 2.6).toFixed(2) + "s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rrm__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rrm__lab"
  }, /*#__PURE__*/React.createElement("b", null, it.name), /*#__PURE__*/React.createElement("span", null, it.note))))), /*#__PURE__*/React.createElement("div", {
    className: "rrm__xlab"
  }, "\u0420\u0438\u0441\u043A \u2192")));
}
function CompareTable({
  left,
  right
}) {
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
    window.addEventListener("scroll", check, {
      passive: true
    });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "cmp",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmp__col"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cmp__h"
  }, left.title), /*#__PURE__*/React.createElement("ul", {
    className: "cmp__list"
  }, left.items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: t
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cmp__vs",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cmp__vs-txt"
  }, "VS")), /*#__PURE__*/React.createElement("div", {
    className: "cmp__col win"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cmp__h"
  }, right.title), /*#__PURE__*/React.createElement("ul", {
    className: "cmp__list"
  }, right.items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: t
    }
  })))));
}
const BIZ_STEPS = [{
  t: "Форма",
  d: "самозанятый или GmbH"
}, {
  t: "Регистрация",
  d: "счёт, страховки, учёт"
}, {
  t: "Первые клиенты",
  d: "продукт, цена, поток"
}, {
  t: "Система",
  d: "процессы вместо ручного"
}, {
  t: "Масштаб",
  d: "команда, новые рынки"
}];
function Timeline({
  steps
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tl"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "tl__step",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "tl__num"
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    className: "tl__t"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "tl__d"
  }, s.d))));
}
const BIZ_RISKS = ["Налоги и соц. взносы — <b>сколько реально закладывать</b>", "Кассовые разрывы первого года — <b>какой запас нужен</b>", "Личная ответственность — <b>чем рискуешь при разной форме</b>", "Зависимость от одного клиента — <b>как не подсесть</b>", "Выгорание — <b>почему бизнес ≠ свобода сразу</b>"];
const BIZ_RISK_TAGS = ["Налоги и взносы", "Кассовые разрывы", "Личная ответственность", "Зависимость от клиента", "Выгорание"];
function RiskList({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "risks"
  }, items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    className: "risk",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "risk__ic"
  }, "!"), /*#__PURE__*/React.createElement("span", {
    className: "risk__tx",
    dangerouslySetInnerHTML: {
      __html: t
    }
  }))));
}
const BIZ_CARDS = [{
  badge: "⚙️ Основа",
  title: "Ремесло или бизнес?",
  body: "В чём разница между самозанятым и предпринимателем — и почему это меняет всё: налоги, масштаб, свободу и потолок дохода.",
  msg: "«Самозанятый или GmbH: когда пора менять форму и сколько это стоит?»"
}, {
  badge: "🧰 Инструменты",
  title: "Бизнес-инструменты Швейцарии",
  body: "Что реально работает здесь: как устроена система, какие инструменты помогают, а какие съедают время и деньги.",
  msg: "«Что подключить в первый год бизнеса — и что окажется пустой тратой?»"
}, {
  badge: "⚠️ Риски",
  title: "Неочевидные приколюхи и риски",
  body: "То, о чём не пишут в гайдах: подводные камни, ошибки на старте, риски предпринимателя в Швейцарии.",
  warn: true,
  msg: "«Какие 5 ошибок чуть не закрыли мой бизнес в первый год?»"
}, {
  badge: "💬 Живой кейс",
  title: "Как это было на самом деле",
  body: "Реальная история своего дела в Швейцарии — без глянца: с чего начиналось, что пошло не так, что сработало.",
  msg: "«Моё дело в Швейцарии: путь от идеи до первой прибыли — как это было?»"
}];
function Day2Test() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: D2_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0414\u0435\u043D\u044C 2 \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \xB7 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 \u043C\u0438\u043A\u0441")), /*#__PURE__*/React.createElement("h1", null, "\u0414\u0435\u043D\u044C\u0433\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442", /*#__PURE__*/React.createElement("br", null), "\u043D\u0430 \u0442\u0435\u0431\u044F \u2014 ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0438\u043B\u0438 \u0442\u044B \u043D\u0430 \u0434\u0435\u043D\u044C\u0433\u0438?")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0414\u043B\u044F \u0442\u0435\u0445, \u0443 \u043A\u043E\u0433\u043E \u0431\u0430\u0437\u0430 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C: \u043D\u0435 \xAB\u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C\xBB, \u0430 \xAB\u043A\u0443\u0434\u0430 \u0440\u0430\u0441\u0442\u0438\xBB. \u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0440\u044C\u0451\u0437 \u2014 \u0438 \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E: \u0440\u0435\u043C\u0435\u0441\u043B\u043E, \u0431\u0438\u0437\u043D\u0435\u0441, \u0440\u0438\u0441\u043A\u0438 \u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438."), /*#__PURE__*/React.createElement("div", {
    className: "d2-marq"
  }, /*#__PURE__*/React.createElement(Marquee, {
    items: ["Инвестиции", "Своё дело", "Новый уровень", "Инвестиции", "Своё дело", "Новый уровень", "Инвестиции", "Своё дело", "Новый уровень"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "invest"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0430\u0441\u0442\u044C 1 \xB7 \u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041A\u043E\u0433\u0434\u0430 \u0431\u0430\u0437\u0430 \u0435\u0441\u0442\u044C \u2014 \u0432\u0441\u0442\u0430\u0451\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \xAB\u043A\u0443\u0434\u0430 \u0440\u0430\u0441\u0442\u0438\xBB"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041F\u043E\u0434\u0443\u0448\u043A\u0430 \u0441\u043E\u0431\u0440\u0430\u043D\u0430, \u0441\u0442\u0440\u0430\u0445\u0438 \u043F\u043E\u0437\u0430\u0434\u0438.", /*#__PURE__*/React.createElement("br", null), "\u0427\u0435\u0442\u044B\u0440\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u043D\u0430 \u043E\u0434\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u0435: \u0447\u0435\u043C \u0432\u044B\u0448\u0435 \u0440\u0438\u0441\u043A, \u0442\u0435\u043C \u0432\u044B\u0448\u0435 \u043F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043E\u0445\u043E\u0434\u043D\u043E\u0441\u0442\u044C."), /*#__PURE__*/React.createElement(RiskReturnMatrix, null), /*#__PURE__*/React.createElement("p", {
    className: "rrm__cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rrm__cap-lead"
  }, "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u2014 \u044D\u0442\u043E \u043A\u043E\u0433\u0434\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0434\u0435\u043D\u044C\u0433\u0438."), " \u0410 \u0431\u0438\u0437\u043D\u0435\u0441 \u2014 \u043A\u043E\u0433\u0434\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C \u0442\u044B, \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0434\u0435\u043D\u044C\u0433\u0438 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u0438\u0441\u0442\u0435\u043C\u0430. \u0412\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0434\u043D\u044F \u2014 \u043F\u0440\u043E \u0442\u043E, \u043A\u0430\u043A \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0432\u043B\u043E\u0436\u0438\u0442\u044C."))), /*#__PURE__*/React.createElement("section", {
    id: "business"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0430\u0441\u0442\u044C 2 \xB7 \u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0420\u0435\u043C\u0435\u0441\u043B\u043E, \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0432\u0441\u0451,", /*#__PURE__*/React.createElement("br", null), "\u043E \u0447\u0451\u043C \u043D\u0435 \u043F\u0438\u0448\u0443\u0442 \u0432 \u0433\u0430\u0439\u0434\u0430\u0445"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u044D\u0442\u043E \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E \xAB\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u0440\u043C\u0443\xBB. \u042D\u0442\u043E \u043F\u0440\u043E \u0440\u0430\u0437\u043D\u0438\u0446\u0443 \u043C\u0435\u0436\u0434\u0443 \u0440\u0435\u043C\u0435\u0441\u043B\u043E\u043C \u0438 \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C, \u043F\u0440\u043E \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442, \u0438 \u043F\u0440\u043E \u0440\u0438\u0441\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0437\u0430\u0440\u0430\u043D\u0435\u0435."), /*#__PURE__*/React.createElement("div", {
    className: "biz-grid"
  }, BIZ_CARDS.map(c => /*#__PURE__*/React.createElement("div", {
    className: "biz-card",
    key: c.title
  }, /*#__PURE__*/React.createElement("span", {
    className: "biz-card__badge" + (c.warn ? " biz-card__badge--warn" : "")
  }, c.badge), /*#__PURE__*/React.createElement("h3", null, c.title), /*#__PURE__*/React.createElement("p", null, c.body), /*#__PURE__*/React.createElement("div", {
    className: "biz-card__msg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "biz-card__bubble"
  }, c.msg))))), /*#__PURE__*/React.createElement("div", {
    className: "cta-mid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cta-mid__note"
  }, /*#__PURE__*/React.createElement("b", null, "\u0420\u0430\u043D\u043D\u044F\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u0430."), " \u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u0443\u0439 \u043C\u0435\u0441\u0442\u043E, \u043F\u043E\u043A\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u043B\u0443\u0447\u0448\u0430\u044F \u0446\u0435\u043D\u0430 \u2014 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0414\u043D\u044F 2 \u043F\u0440\u0438\u0434\u0451\u0442 \u0442\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u043E\u0439."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "inspire2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0417\u0430\u0447\u0435\u043C \u0442\u0435\u0431\u0435 \u0441\u044E\u0434\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0427\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C,", /*#__PURE__*/React.createElement("br", null), "\u043A\u0443\u0434\u0430 \u043C\u043E\u0436\u043D\u043E \u0440\u0430\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0414\u0435\u043D\u044C 2 \u2014 \u043F\u0440\u043E \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442: \u043D\u0435 \xAB\u0432\u044B\u0436\u0438\u0442\u044C \u0438 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C\xBB, \u0430 \xAB\u043F\u0440\u0438\u0443\u043C\u043D\u043E\u0436\u0438\u0442\u044C, \u0432\u043B\u043E\u0436\u0438\u0442\u044C, \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C\xBB."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Insp, {
    k: "\u0428\u0438\u0440\u0435",
    t: "\u041D\u043E\u0432\u044B\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u043E \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u044B, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u0443\u043C\u0430\u043B \u2014 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E \u043C\u0438\u0440\u0443, \u0442\u0432\u0451\u0440\u0434\u044B\u0435 \u0430\u043A\u0442\u0438\u0432\u044B, \u0441\u0432\u043E\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0413\u043B\u0443\u0431\u0436\u0435",
    t: "\u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E"
  }, "\u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u043A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u0438 \u0445\u0432\u0430\u0442\u0438\u0442 \u043B\u0438 \u044D\u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u0440\u0435\u0448\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0439."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0414\u0430\u043B\u044C\u0448\u0435",
    t: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442 \u043D\u0430 \u0433\u043E\u0434\u044B"
  }, "\u041D\u0435 \u043E\u0434\u043D\u0430 \u0438\u0434\u0435\u044F, \u0430 \u043A\u0430\u0440\u0442\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0435\u0439, \u043A \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F \u0438 \u0440\u0430\u0441\u0442\u0438 \u043F\u043E \u043D\u0435\u0439 \u043F\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E.")))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0414\u0435\u043D\u044C 2 \xB7 Frankenplatz 2026"),
    title: "\u0420\u0430\u0441\u0442\u0438 \u0434\u0430\u043B\u044C\u0448\u0435 \u2014 \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "index.html#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u0414\u0435\u043D\u044C 2 \u0434\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0433\u043E\u0442\u043E\u0432 \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C\u0443 \u0443\u0440\u043E\u0432\u043D\u044E. \u041E\u0441\u0442\u0430\u0432\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u2014 \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430, \u0446\u0435\u043D\u044B \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "На главную",
      href: "index.html"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }));
}
window.Day2Test = Day2Test;
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/Day2Test.jsx", error: String((e && e.message) || e) }); }

// test/LandingTest.jsx
try { (() => {
/* Frankenplatz — marketing UI kit: participant landing page.
   Recreates uploads/index.html using the design-system components.
   Exposes window.Landing. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Marquee,
  Card,
  StatCard,
  SpeakerCard,
  ReliefBand,
  ComparisonTable,
  FAQItem
} = window.FrankenplatzDesignSystem_144b92;
function DayCard({
  tag,
  title,
  sub,
  items,
  href,
  label
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "lila",
    className: "day"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, tag), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, sub), /*#__PURE__*/React.createElement("ul", null, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, it))), /*#__PURE__*/React.createElement("a", {
    className: "day__more",
    href: href
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    className: "day__arrow",
    "aria-hidden": "true"
  }, "\u2192")));
}
function SpeakerType({
  badge,
  title,
  body,
  example,
  accent
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "none",
    className: "sp sp--" + accent
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, body), /*#__PURE__*/React.createElement("div", {
    className: "ex"
  }, "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: ", /*#__PURE__*/React.createElement("b", null, example)));
}
function CalcModal({
  calc,
  onClose
}) {
  if (!calc) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fp-modal-bg",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "x",
    onClick: onClose,
    "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 8
    }
  }, calc.icon), /*#__PURE__*/React.createElement("h3", null, calc.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      fontSize: 15,
      margin: "0 0 4px"
    }
  }, calc.result), /*#__PURE__*/React.createElement("div", {
    className: "barwrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar",
    style: {
      width: calc.pct
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted-2)",
      fontSize: 13,
      margin: "0 0 20px"
    }
  }, "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    block: true,
    onClick: onClose
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043E\u0442\u0447\u0451\u0442")));
}
const CALCS = [{
  icon: "🧾",
  title: "Семейный бюджет",
  body: "Куда реально уходят деньги с поправкой на швейцарские реалии — Krankenkasse, налоги, аренда. Видно, где утечки.",
  result: "Твоя оценка утечек: заметная. В среднем можно откладывать больше.",
  pct: "62%",
  kind: "people"
}, {
  icon: "🏡",
  title: "Аренда или покупка",
  body: "Что выгоднее в твоей ситуации с учётом налогов и ставок. И оценка недвижимости как инвестиции под сдачу.",
  result: "В твоём сценарии аренда пока выгоднее покупки.",
  pct: "48%",
  kind: "house"
}, {
  icon: "👵",
  title: "Пенсия в Швейцарии",
  body: "Сколько ты реально получишь от AHV и BVG, что добавит 3a и какой будет дефицит. Особенно отрезвляет при позднем старте.",
  result: "Прогноз: заметный дефицит без 3a. Есть куда действовать.",
  pct: "40%",
  kind: "clock"
}, {
  icon: "📈",
  title: "Зрелость бизнеса",
  body: "На каком этапе твой бизнес или идея и что мешает следующему уровню. Покажет точки роста.",
  result: "Стадия: ранний рост. Узкое место — систематизация.",
  pct: "55%",
  kind: "money"
}, {
  icon: "🧮",
  title: "Семейные налоги",
  body: "Где, сколько и почему ты платишь. Иногда взгляд в сторону другого кантона меняет картину.",
  result: "Есть неочевидный резерв по кантону и вычетам.",
  pct: "58%",
  kind: "chart"
}];
const CALC_DECOS = {
  people: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "67",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 98v-16a7 7 0 0 1 14 0v16z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "53",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M32 101v-28a10 10 0 0 1 20 0v28z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "49.5",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M55 103v-32a11 11 0 0 1 22 0v32z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "62.5",
    r: "6.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M82 99v-20a8 8 0 0 1 16 0v20z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "69.5",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M103.5 98v-14a6.5 6.5 0 0 1 13 0v14z"
  })),
  house: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    fillRule: "evenodd",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 62 40 32 74 62 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 62 H64 V104 H16 Z M23 69 H34 V79 H23 Z M40 104 V82 H50 V104 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M80 46 H116 V104 H80 Z M86 53 H96 V62 H86 Z M100 53 H110 V62 H100 Z M86 68 H96 V77 H86 Z M100 68 H110 V77 H100 Z M86 83 H96 V92 H86 Z M100 83 H110 V92 H100 Z"
  })),
  clock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M64 16 a42 42 0 1 0 0.1 0 Z M64 21 a37 37 0 1 0 0.1 0 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "27",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "79.5",
    cy: "31.2",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90.8",
    cy: "42.5",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "95",
    cy: "58",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "90.8",
    cy: "73.5",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "79.5",
    cy: "84.8",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "89",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "48.5",
    cy: "84.8",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "37.2",
    cy: "73.5",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "33",
    cy: "58",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "37.2",
    cy: "42.5",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "48.5",
    cy: "31.2",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 58 L64 32 L66 58 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M64 56 L88 68 L64 60 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "64",
    cy: "58",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 81 H42 V84 H14 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 84 H40 L29.5 96.5 L40 109 H16 L26.5 96.5 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 109 H42 V112 H14 Z"
  })),
  money: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "rotate(-8 59 45)"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M29 30 H89 a5 5 0 0 1 5 5 V55 a5 5 0 0 1 -5 5 H29 a5 5 0 0 1 -5 -5 V35 a5 5 0 0 1 5 -5 Z M59 37 a8 8 0 1 0 0.1 0 Z M33 35 a2.2 2.2 0 1 0 0.1 0 Z M85 53 a2.2 2.2 0 1 0 0.1 0 Z"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "rotate(5 73 81)"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M43 66 H103 a5 5 0 0 1 5 5 V91 a5 5 0 0 1 -5 5 H43 a5 5 0 0 1 -5 -5 V71 a5 5 0 0 1 5 -5 Z M73 73 a8 8 0 1 0 0.1 0 Z M47 71 a2.2 2.2 0 1 0 0.1 0 Z M99 89 a2.2 2.2 0 1 0 0.1 0 Z"
  })), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M12 88 a12 4.5 0 0 1 24 0 V104 a12 4.5 0 0 1 -24 0 Z M14 93 H34 V94.5 H14 Z M14 98.5 H34 V100 H14 Z"
  })),
  chart: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M28 44 L28 26 A18 18 0 1 1 15.3 31.3 Z M28 39 a5 5 0 1 0 0.1 0 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "72",
    width: "13",
    height: "34",
    rx: "3.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "70",
    y: "58",
    width: "13",
    height: "48",
    rx: "3.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "44",
    width: "13",
    height: "62",
    rx: "3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M46 68 L68 46 L80 52 L96 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M102 24 L102 37 L90 28 Z"
  }))
};
function CalcDeco({
  kind
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "calc-deco calc-deco--" + kind,
    "aria-hidden": "true"
  }, CALC_DECOS[kind]);
}
function LandingTest() {
  const [calc, setCalc] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: [{
      label: "Программа",
      href: "#program"
    }, {
      label: "Спикеры",
      href: "#speakers"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }, {
      label: "Записаться",
      href: "#reg",
      cta: true
    }]
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero gridbg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cow",
    "aria-hidden": "true"
  }, "\uD83D\uDC2E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich \xB7 \u0444\u043E\u0440\u0443\u043C \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445")), /*#__PURE__*/React.createElement("h1", null, "\u0413\u0434\u0435 \u0434\u0435\u043D\u044C\u0433\u0438", /*#__PURE__*/React.createElement("br", null), "\u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u043A\u0430\u043A \u0438\u0445 \u043D\u0430\u0439\u0442\u0438 \u0438 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u041E\u0434\u043D\u0430 \u0438\u0437 \u0441\u0430\u043C\u044B\u0445 \u0431\u043E\u0433\u0430\u0442\u044B\u0445 \u0441\u0442\u0440\u0430\u043D \u043C\u0438\u0440\u0430 \u2014 \u0430 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u044F \u0431\u043E\u0433\u0430\u0442\u0441\u0442\u0432\u0430 \u043D\u0435\u0442? \u0414\u0432\u0430 \u0434\u043D\u044F \u0441\u0440\u0435\u0434\u0438 \u0441\u0432\u043E\u0438\u0445, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0432\u0441\u044E \u043A\u0430\u0440\u0442\u0443: \u043F\u0435\u043D\u0441\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438, \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0437\u0430\u0449\u0438\u0442\u0430 \u0441\u0435\u043C\u044C\u0438."), /*#__PURE__*/React.createElement("p", {
    className: "micro"
  }, "\u041C\u044B \u043D\u0430 \xAB\u0442\u044B\xBB \u2014 \u0438 \u0441 \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438, \u0438 \u0441 \u0442\u043E\u0431\u043E\u0439.", /*#__PURE__*/React.createElement("br", null), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u0430: \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0438 \u0446\u0435\u043D\u044B \u043F\u0440\u0438\u0434\u0443\u0442 \u0442\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u044B\u043C\u0438."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement(Marquee, {
    items: ["Говорим открыто", "Делимся прожитым опытом", "Только польза и инсайты", "Швейцарская конкретика", "Свои люди"]
  }), /*#__PURE__*/React.createElement("section", {
    id: "program",
    className: "gridbg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0414\u0432\u0430 \u0434\u043D\u044F \u2014 \u0434\u0432\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438"), /*#__PURE__*/React.createElement("div", {
    className: "grid g2"
  }, /*#__PURE__*/React.createElement(DayCard, {
    tag: "\u0414\u0435\u043D\u044C 1 \xB7 \u0434\u043B\u044F \u0432\u0441\u0435\u0445",
    title: "\u0413\u0434\u0435 \u0431\u0430\u0431\u043A\u0438 \u0438 \u043A\u0430\u043A \u0438\u0445 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C",
    sub: "\u0411\u0430\u0437\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0441\u0442\u043E\u0438\u0442 \u043D\u0430\u0447\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u043E\u043C\u0443.",
    href: "day1.html",
    label: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043C\u044B \u0414\u043D\u044F 1",
    items: ["Пенсия: AHV / BVG / 3a — реальные цифры", "Базовые инвестиции: ETF, VIAC, Finpension", "Налоги, кантоны, оптимизация", "Страховки: Krankenkasse и другие", "Банки, ипотека, недвижимость", "Любовь и деньги: брак, развод, защита"]
  }), /*#__PURE__*/React.createElement(DayCard, {
    tag: "\u0414\u0435\u043D\u044C 2 \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C",
    title: "\u0414\u0435\u043D\u044C\u0433\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F",
    sub: "\u0414\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0445\u043E\u0447\u0435\u0442 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441.",
    href: "day2.html",
    label: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043C\u044B \u0414\u043D\u044F 2",
    items: ["Портфельное инвестирование в Швейцарии", "Недвижимость как актив", "Продвинутые стратегии 3a и BVG", "Альтернативы: крипто, P2P, REIT", "Как открыть бизнес — в т.ч. без вложений", "Масштабирование и налоговое планирование"]
  })))), /*#__PURE__*/React.createElement("section", {
    id: "value"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0442\u043E \u0442\u044B \u0443\u043D\u043E\u0441\u0438\u0448\u044C"), /*#__PURE__*/React.createElement("h2", null, "\u0417\u043D\u0430\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F", /*#__PURE__*/React.createElement("br", null), "\u0441 \u0442\u043E\u0431\u043E\u0439 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0417\u0430 \u0434\u0432\u0430 \u0434\u043D\u044F \u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0448\u044C \u0442\u043E, \u043D\u0430 \u0447\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0443\u0445\u043E\u0434\u044F\u0442 \u0433\u043E\u0434\u044B.", /*#__PURE__*/React.createElement("br", null), "Frankenplatz \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0432\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u0439 \u0442\u043E\u0447\u043A\u0435 \u2014 \u0438 \u044D\u0442\u043E \u0437\u043D\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0441 \u0442\u043E\u0431\u043E\u0439 \u043D\u0430 \u0432\u0441\u044E \u0436\u0438\u0437\u043D\u044C."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "01",
    title: "\u041F\u043E\u043B\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432"
  }, "\u0412\u0441\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u0440\u0430\u0437\u0443 \u2014 \u043F\u0435\u043D\u0441\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438, \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0437\u0430\u0449\u0438\u0442\u0430 \u0441\u0435\u043C\u044C\u0438."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "02",
    title: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0442\u044B\u0441\u044F\u0447 \u0444\u0440\u0430\u043D\u043A\u043E\u0432"
  }, "\u041D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430\u0445 \u0441\u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043A\u043E\u0439, \u0438\u043F\u043E\u0442\u0435\u043A\u043E\u0439, \u043F\u0435\u043D\u0441\u0438\u043E\u043D\u043D\u043E\u0439 \u043A\u0430\u0441\u0441\u043E\u0439 \u0438 \u0443\u043F\u0443\u0449\u0435\u043D\u043D\u043E\u043C 3a."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "03",
    title: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
  }, "\u041D\u0435 \u0431\u043B\u0443\u0436\u0434\u0430\u0435\u0448\u044C \u0432 \u0447\u0443\u0436\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0432\u0441\u043B\u0435\u043F\u0443\u044E \u2014 \u0441\u0440\u0430\u0437\u0443 \u0432\u0438\u0434\u0438\u0448\u044C, \u0447\u0442\u043E \u0432\u0430\u0436\u043D\u043E \u043B\u0438\u0447\u043D\u043E \u0442\u0435\u0431\u0435."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "04",
    title: "\u041D\u0435 \u043E\u0434\u043D\u0430 \u0438\u0434\u0435\u044F, \u0430 \u043A\u043E\u043F\u0438\u043B\u043A\u0430"
  }, "\u0423\u0445\u043E\u0434\u0438\u0448\u044C \u0441 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u043C\u0438 \u043A\u0435\u0439\u0441\u0430\u043C\u0438 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438 \u043D\u0430 \u0433\u043E\u0434 \u0432\u043F\u0435\u0440\u0451\u0434."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "05",
    title: "\u041D\u0443\u0436\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  }, "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043C\u0435\u043D\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432, \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u2014 \u043A \u043A\u043E\u043C\u0443 \u0438\u0434\u0442\u0438 \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "06",
    title: "\u0421\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435"
  }, "\u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0448\u044C \u0442\u043E, \u0447\u0442\u043E \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043E, \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0448\u044C \u0442\u043E, \u0447\u0442\u043E \u0435\u0441\u0442\u044C.")), /*#__PURE__*/React.createElement("div", {
    className: "cta-mid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cta-mid__note"
  }, /*#__PURE__*/React.createElement("b", null, "\u0420\u0430\u043D\u043D\u044F\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0443\u0436\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0430."), " \u0426\u0435\u043D\u0430 \u043D\u0438\u0436\u0435, \u0430 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0447\u0451\u0442\u044B \u043F\u043E \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u0430\u043C \u043F\u0440\u0438\u0434\u0443\u0442 \u0442\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u044B\u043C\u0438."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "speakers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0432\u044B\u0439\u0434\u0435\u0442 \u043D\u0430 \u0441\u0446\u0435\u043D\u0443"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043F\u0438\u043A\u0435\u0440\u044B \u0441 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u043C \u043E\u043F\u044B\u0442\u043E\u043C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, /*#__PURE__*/React.createElement("strong", null, "\u041D\u0435 \u0432\u0435\u0440\u044C \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C."), " \u041C\u044B \u0437\u043E\u0432\u0451\u043C \u043D\u0435 \u043F\u043E \u0433\u0440\u043E\u043C\u043A\u0438\u043C \u0440\u0435\u0433\u0430\u043B\u0438\u044F\u043C, \u0430 \u043F\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443.", /*#__PURE__*/React.createElement("br", null), "\u0427\u0435\u0442\u044B\u0440\u0435 \u0442\u0438\u043F\u0430 \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u044B \u0443\u0441\u043B\u044B\u0448\u0438\u0448\u044C:"), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(SpeakerType, {
    accent: "practik",
    badge: "\uD83C\uDFAF \u041F\u0440\u0430\u043A\u0442\u0438\u043A",
    title: "\u0422\u043E\u0442, \u0443 \u043A\u043E\u0433\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C",
    body: "\u0421\u0432\u043E\u0439 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C, \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E\u0434 \u0441\u0434\u0430\u0447\u0443, \u043F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434. \u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u0442 \u043D\u0435 \u0442\u0435\u043E\u0440\u0438\u044E, \u0430 \u043A\u0430\u043A \u044D\u0442\u043E \u0431\u044B\u043B\u043E \u043D\u0430 \u0434\u0435\u043B\u0435.",
    example: "\xAB\u041A\u0430\u043A \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C ETF \u0441 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B \u0432 6k \u0438 \u0432\u044B\u0439\u0442\u0438 \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u043F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    accent: "spec",
    badge: "\uD83D\uDCDC \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442",
    title: "\u0422\u043E\u0442, \u043A\u0442\u043E \u0437\u043D\u0430\u0435\u0442 \u0441\u0438\u0441\u0442\u0435\u043C\u0443",
    body: "\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B \u0432 \u0441\u0432\u043E\u0435\u0439 \u0442\u0435\u043C\u0435 \u2014 \u043F\u0435\u043D\u0441\u0438\u0438, \u043D\u0430\u043B\u043E\u0433\u0438, \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435, \u043F\u0440\u0430\u0432\u043E \u2014 \u0441 \u043E\u043F\u044B\u0442\u043E\u043C \u0440\u0430\u0431\u043E\u0442\u044B \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438.",
    example: "\xAB3a, BVG \u0438 \u0432\u044B\u043A\u0443\u043F \u043F\u0435\u043D\u0441\u0438\u0438: \u043A\u0430\u043A \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u043E \u043F\u043B\u0430\u0442\u0438\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0430\u043B\u043E\u0433\u043E\u0432 \u0443\u0436\u0435 \u0432 \u044D\u0442\u043E\u043C \u0433\u043E\u0434\u0443\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    accent: "story",
    badge: "\uD83D\uDC94 \u041B\u0438\u0447\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F",
    title: "\u0422\u043E\u0442, \u0443 \u043A\u043E\u0433\u043E \u044D\u0442\u043E \u0443\u0436\u0435 \u043F\u043E\u0437\u0430\u0434\u0438",
    body: "\u041E\u0431\u044B\u0447\u043D\u044B\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A, \u043F\u0440\u043E\u0448\u0435\u0434\u0448\u0438\u0439 \u0447\u0435\u0440\u0435\u0437 \u0440\u0430\u0437\u0432\u043E\u0434, \u043F\u0435\u0440\u0435\u0435\u0437\u0434 \u0441 \u043D\u0443\u043B\u044F, \u043F\u0435\u0440\u0432\u044B\u0439 \u0431\u0438\u0437\u043D\u0435\u0441. \u0427\u0435\u0441\u0442\u043D\u043E \u2014 \u0447\u0442\u043E \u043F\u043E\u043C\u043E\u0433\u043B\u043E, \u0430 \u0447\u0442\u043E \u043D\u0435\u0442.",
    example: "\xAB\u0420\u0430\u0437\u0432\u043E\u0434 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438: \u0447\u0442\u043E \u044F \u0437\u043D\u0430\u044E \u0442\u0435\u043F\u0435\u0440\u044C \u0438 \u043E \u0447\u0451\u043C \u0436\u0430\u043B\u0435\u044E, \u0447\u0442\u043E \u043D\u0435 \u0443\u0437\u043D\u0430\u043B\u0430 \u0440\u0430\u043D\u044C\u0448\u0435\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    accent: "insp",
    badge: "\u2728 \u0412\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u0435",
    title: "\u0418\u0441\u0442\u043E\u0440\u0438\u0438, \u043F\u043E\u0441\u043B\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0445\u043E\u0447\u0435\u0442\u0441\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C",
    body: "\u0411\u0435\u0437 \u044F\u0437\u044B\u043A\u0430, \u0431\u0435\u0437 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0430, \u0431\u0435\u0437 \u0441\u0432\u044F\u0437\u0435\u0439 \u2014 \u0430 \u0432 \u0438\u0442\u043E\u0433\u0435 \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C, \u043D\u043E\u0432\u0430\u044F \u0436\u0438\u0437\u043D\u044C.",
    example: "\xAB\u041A\u0430\u043A \u0438\u0437 \u0445\u043E\u0431\u0431\u0438 \u0432\u044B\u0440\u043E\u0441 \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u0431\u0435\u0437 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0439\xBB"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    className: "band-ban",
    title: "\u0416\u0451\u0441\u0442\u043A\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0434\u043B\u044F \u0432\u0441\u0435\u0445, \u043A\u0442\u043E \u043D\u0430 \u0441\u0446\u0435\u043D\u0435"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ban",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "20",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "10",
    x2: "38",
    y2: "38",
    stroke: "currentColor",
    strokeWidth: "4"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u0422\u043E\u043B\u044C\u043A\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \xAB\u0431\u0435\u0440\u0438 \u0438 \u0434\u0435\u043B\u0430\u0439\xBB"), ": \u0441\u043C\u043E\u0442\u0440\u0438 \u0441\u044E\u0434\u0430, \u043F\u043E\u0442\u043E\u043C \u0441\u044E\u0434\u0430, \u0432\u043E\u0442 \u0446\u0438\u0444\u0440\u0430, \u0432\u043E\u0442 \u0448\u0430\u0433. ", /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("br", null), "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043E \u0441\u0446\u0435\u043D\u044B"), " \u2014 \u043D\u0438 \u043A\u0443\u0440\u0441\u043E\u0432, \u043D\u0438 \u043C\u0430\u0440\u0430\u0444\u043E\u043D\u043E\u0432. \u0422\u044B \u0443\u0445\u043E\u0434\u0438\u0448\u044C \u043D\u0435 \u0441 \u043E\u0434\u043D\u043E\u0439 \u0438\u0434\u0435\u0435\u0439, \u0430 \u0441 \u043A\u043E\u043F\u0438\u043B\u043A\u043E\u0439."))))), /*#__PURE__*/React.createElement("section", {
    id: "findnot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0435\u0441\u0442\u043D\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0427\u0442\u043E \u0442\u0435\u0431\u044F \u0436\u0434\u0451\u0442 \u2014 \u0438 \u0447\u0435\u0433\u043E \u0442\u043E\u0447\u043D\u043E", /*#__PURE__*/React.createElement("br", null), "\u043D\u0435 \u0431\u0443\u0434\u0435\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(ComparisonTable, {
    rows: [{
      yes: "Обращение на «ты» — по-дружески, без дистанции",
      no: "Официоза и обращения «на вы»"
    }, {
      yes: "Конкретные цифры: лимиты, налоги, ставки",
      no: "«Секретов богатых» и обещаний миллиона"
    }, {
      yes: "Реальные истории людей, которые уже прошли путь",
      no: "Воды и пустых разговоров «ни о чём»"
    }, {
      yes: "Несколько спикеров на тему — разные пути",
      no: "Одного «единственно верного» мнения сверху"
    }, {
      yes: "Швейцарская конкретика: 3a, AHV, BVG, кантоны",
      no: "Общих советов «как у всех», не про Швейцарию"
    }, {
      yes: "Сообщество, которое остаётся с тобой после",
      no: "«Послушал и забыл» — разового ивента"
    }]
  })))), /*#__PURE__*/React.createElement("section", {
    id: "calc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041C\u043E\u0436\u043D\u043E \u043D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441"), /*#__PURE__*/React.createElement("h2", null, "5 \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u043E\u0432 \u2014 \u0443\u0436\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041D\u0435 \u0436\u0434\u0438 \u0444\u043E\u0440\u0443\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043D\u044F\u0442\u044C, \u0433\u0434\u0435 \u0442\u044B \u0441\u0435\u0439\u0447\u0430\u0441. ", /*#__PURE__*/React.createElement("strong", null, "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.")), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, CALCS.map((c, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    fill: "lila",
    tone: "lila",
    icon: c.icon,
    title: c.title,
    className: "calc-card",
    free: /*#__PURE__*/React.createElement(Badge, {
      variant: "green"
    }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E")
  }, c.body, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setCalc(c)
  }, "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0440\u0430\u0441\u0447\u0451\u0442 \u2192")), /*#__PURE__*/React.createElement(CalcDeco, {
    kind: c.kind
  })))), /*#__PURE__*/React.createElement("div", {
    className: "calcnote"
  }, "\uD83D\uDD13 \u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044B \u0443\u0436\u0435 \u0441\u0435\u0439\u0447\u0430\u0441. \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 + \u0440\u0430\u0437\u0431\u043E\u0440 \u043D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 \u2014 \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438."))), /*#__PURE__*/React.createElement("section", {
    id: "svoi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u0432\u043E\u0438 \u043B\u044E\u0434\u0438 \u2014 \u044D\u0442\u043E \u043F\u0440\u0430\u0432\u0434\u0430 \xAB\u0441\u0432\u043E\u0438\xBB"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\xAB\u0421\u0432\u043E\u0438\xBB \u0437\u0434\u0435\u0441\u044C \u2014 \u043D\u0435 \u0444\u0438\u0433\u0443\u0440\u0430 \u0440\u0435\u0447\u0438: ", /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("br", null), "\u043E\u0434\u0438\u043D \u043C\u0435\u043D\u0442\u0430\u043B\u0438\u0442\u0435\u0442, \u043E\u0434\u0438\u043D \u044F\u0437\u044B\u043A, \u043E\u0431\u0449\u0438\u0439 \u0431\u044D\u043A\u0433\u0440\u0430\u0443\u043D\u0434 \u044D\u043C\u0438\u0433\u0440\u0430\u043D\u0442\u0430"), "."), /*#__PURE__*/React.createElement("div", {
    className: "svoi-unit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svoi-figure",
    "aria-hidden": "true"
  }, "\u041E\u0434\u0438\u043D"), /*#__PURE__*/React.createElement("div", {
    className: "svoi-facts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svoi-fact"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "svoi-fact__t"
  }, "\u044F\u0437\u044B\u043A"), /*#__PURE__*/React.createElement("p", {
    className: "svoi-fact__d"
  }, "\u041F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438 \u0438 \u043F\u043E-\u0447\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u043A\u0438, \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u0438\u0445 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u0432 \u0432 \u0433\u043E\u043B\u043E\u0432\u0435.")), /*#__PURE__*/React.createElement("div", {
    className: "svoi-fact"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "svoi-fact__t"
  }, "\u043F\u0443\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "svoi-fact__d"
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0448\u043B\u0438 \u043E\u0434\u043D\u0443 \u0434\u043E\u0440\u043E\u0433\u0443 \u044D\u043C\u0438\u0433\u0440\u0430\u043D\u0442\u0430 \u2014 \u043F\u043E\u043D\u0438\u043C\u0430\u044E\u0442 \u0441 \u043F\u043E\u043B\u0443\u0441\u043B\u043E\u0432\u0430.")), /*#__PURE__*/React.createElement("div", {
    className: "svoi-fact"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "svoi-fact__t"
  }, "\u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "svoi-fact__d"
  }, "\u0417\u0434\u0435\u0441\u044C \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043E\u043F\u044B\u0442\u043E\u043C, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u044E\u0442 \u043A\u0443\u0440\u0441\u044B. \u0418 \u043E\u0431\u0449\u0430\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u0440\u0443\u043C\u0430.")))))), /*#__PURE__*/React.createElement("section", {
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0410 \u0447\u0442\u043E \u0435\u0441\u043B\u0438\u2026"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043E\u043C\u043D\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435", /*#__PURE__*/React.createElement("br", null), "\u0443 \u0442\u0435\u0431\u044F \u0441\u0435\u0439\u0447\u0430\u0441 \u0432 \u0433\u043E\u043B\u043E\u0432\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: "1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u042F \u0441\u043E\u0432\u0441\u0435\u043C \u043D\u0435 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u044E\u0441\u044C \u0432 \u0444\u0438\u043D\u0430\u043D\u0441\u0430\u0445\xBB"
  }, "\u0412 \u044D\u0442\u043E\u043C \u0438 \u0441\u043C\u044B\u0441\u043B. \u041C\u044B \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u043C \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C, \u0441 \u043D\u0443\u043B\u044F. \u0415\u0441\u043B\u0438 \u043A\u043E\u0440\u043E\u0432\u0430 \u0432 \u0448\u0443\u0431\u0435 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u043B\u0430\u0441\u044C \u2014 \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u0448\u044C\u0441\u044F \u0438 \u0442\u044B."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u042D\u0442\u043E \u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u043A\u0443\u0440\u0441, \u0433\u0434\u0435 \u0431\u0443\u0434\u0443\u0442 \u0447\u0442\u043E-\u0442\u043E \u0432\u043F\u0430\u0440\u0438\u0432\u0430\u0442\u044C\xBB"
  }, "\u041D\u0435\u0442. \u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \xAB\u0431\u0435\u0440\u0438 \u0438 \u0434\u0435\u043B\u0430\u0439\xBB. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043E \u0441\u0446\u0435\u043D\u044B \u2014 \u043D\u0438 \u043A\u0443\u0440\u0441\u043E\u0432, \u043D\u0438 \u043C\u0430\u0440\u0430\u0444\u043E\u043D\u043E\u0432, \u043D\u0438 \xAB\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\xBB."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u0423 \u043C\u0435\u043D\u044F \u043D\u0435\u0442 \u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u0434\u0435\u043D\u0435\u0433, \u043C\u043D\u0435 \u0440\u0430\u043D\u043E\xBB"
  }, "\u0424\u043E\u0440\u0443\u043C \u043F\u0440\u043E \u0442\u043E, \u043A\u0430\u043A \u0440\u0430\u0437\u0443\u043C\u043D\u043E \u0440\u0430\u0441\u043F\u043E\u0440\u044F\u0434\u0438\u0442\u044C\u0441\u044F \u0442\u0435\u043C, \u0447\u0442\u043E \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u041D\u0430\u0447\u0430\u0442\u044C \u043C\u043E\u0436\u043D\u043E \u0441\u043E 100 \u0444\u0440\u0430\u043D\u043A\u043E\u0432."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u041C\u043D\u0435 \u043D\u0435\u043B\u043E\u0432\u043A\u043E \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0442\u044C \u043B\u0438\u0447\u043D\u043E\u0435\xBB"
  }, "\u0418 \u043D\u0435 \u043D\u0430\u0434\u043E. \u0422\u044B \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u043B\u0443\u0448\u0430\u0435\u0448\u044C. \u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u0441\u043F\u0440\u043E\u0441\u0438\u0442 \u043F\u0440\u043E \u0442\u0432\u043E\u044E \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044E.")))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center gridbg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich"),
    title: "\u041F\u0440\u0438\u0445\u043E\u0434\u0438 \u0441\u0442\u0430\u0442\u044C \u0431\u043E\u0433\u0430\u0447\u0435",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u0417\u043D\u0430\u0442\u044C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u2014 \u0443\u0436\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0443\u0441\u043F\u0435\u0445\u0430. \u0417\u0430\u0439\u0434\u0438 \u0432 \u0440\u0430\u043D\u043D\u044E\u044E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u2014 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0447\u0451\u0442\u044B \u043F\u0440\u0438\u0434\u0443\u0442 \u043F\u0435\u0440\u0432\u044B\u043C\u0438.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }), /*#__PURE__*/React.createElement(CalcModal, {
    calc: calc,
    onClose: () => setCalc(null)
  }));
}
window.LandingTest = LandingTest;
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/LandingTest.jsx", error: String((e && e.message) || e) }); }

// test/SpeakersTest.jsx
try { (() => {
/* Frankenplatz — Speakers recruitment page. Recreates uploads/speakers.html.
   Exposes window.SpeakersTest. Тексты — дословно из исходника; меняется
   только компоновка и интерактив. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  SpeakerCard,
  ReliefBand
} = window.FrankenplatzDesignSystem_144b92;
const SP_NAV = [{
  label: "Для участников",
  href: "index.html"
}, {
  label: "Что даём",
  href: "#how"
}, {
  label: "Два дня",
  href: "#days"
}, {
  label: "Кто уже с нами",
  href: "#confirmed"
}, {
  label: "Подать заявку",
  href: "#apply",
  cta: true
}];
const GIVE = [{
  badge: "🎥 Контент",
  title: "Фото и видео, которые работают на тебя годами",
  body: "Профессиональная съёмка выступления со всех ракурсов и отдельная фотосессия. Готовый контент для соцсетей, сайта и портфолио."
}, {
  badge: "💇 Образ",
  title: "Стилист и парикмахер на площадке",
  body: "На месте работает парикмахер-стилист. На сцене и в кадре ты выглядишь на все сто."
}, {
  badge: "🎤 Прокачка",
  title: "Тренеры по выступлениям — лично для тебя",
  body: "Блок по кинетике — как держать сцену, и блок по речи и голосу. Навык останется с тобой на всю жизнь."
}, {
  badge: "🍽 Атмосфера",
  title: "Своя спикерская тусовка",
  body: "Кофе-брейки, обеды, ужины и отдельная спикерская атмосфера. Связи, которые дороже гонорара."
}, {
  badge: "📊 Фидбэк",
  title: "Живая реакция зала",
  body: "После выступления собираем оценки и отклики слушателей — увидишь в баллах и словах, как зашла твоя тема."
}, {
  badge: "📣 Охват",
  title: "500 человек твоей аудитории",
  body: "Самый большой известный русскоязычный форум был ~130 человек. Мы целимся в 500 — и они уже в зале."
}];
function GiveGrid() {
  return /*#__PURE__*/React.createElement("div", {
    className: "gives"
  }, GIVE.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "gcard",
    key: g.title
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: i % 2 ? "lila" : "gold"
  }, g.badge), /*#__PURE__*/React.createElement("h3", null, g.title), /*#__PURE__*/React.createElement("p", null, g.body))));
}

/* платформа — строки-леджер вместо одинаковых карточек */
const PLATFORM = [{
  badge: "🆓 Размещение",
  title: "Профиль, бизнес и услуги",
  body: "Разместись бесплатно — обычно это 199 франков."
}, {
  badge: "🛍 Продукты",
  title: "Гайды и курсы в продажу",
  body: "Есть гайд или курс — размести его в продажу на платформе."
}, {
  badge: "📈 Доля",
  title: "2000 акций каждому спикеру",
  body: "Под платформу запускаю AG — и выдаю спикерам долю в её будущем."
}];
function PlatformLedger() {
  return /*#__PURE__*/React.createElement("div", {
    className: "sp-ledger"
  }, PLATFORM.map(r => /*#__PURE__*/React.createElement("div", {
    className: "sp-lrow",
    key: r.title
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, r.badge)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.body)))));
}

/* два дня — карточки с буллет-списком тем */
const DAYS = [{
  tab: "День №1",
  title: "Для обычных людей",
  sub: "База, с которой начинает каждый.",
  items: ["Пенсия и налоги", "Страховки", "Подушка безопасности", "Деньги в семье"]
}, {
  tab: "День №2",
  title: "Для бизнеса и инвестиций",
  sub: "Для тех, кто заточен на рост и капитал.",
  items: ["Инвестиции", "Недвижимость", "Своё дело", "Бизнес-инструменты"],
  d2: true
}];
function Arr() {
  return /*#__PURE__*/React.createElement("span", {
    className: "sp-days__arr",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 8h11M9 3.5 13.5 8 9 12.5",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function DaysTabs() {
  return /*#__PURE__*/React.createElement("div", {
    className: "sp-days"
  }, DAYS.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.tab,
    className: "sp-days__panel" + (d.d2 ? " sp-days__panel--d2" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp-days__k"
  }, d.tab), /*#__PURE__*/React.createElement("h3", null, d.title), /*#__PURE__*/React.createElement("p", null, d.sub), /*#__PURE__*/React.createElement("ul", {
    className: "sp-days__list"
  }, d.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement(Arr, null), it))))));
}
const FORMAT = [{
  title: "Ближе к TED",
  body: "Единая канва презентаций — общий подход к тому, с чего начинаем и о чём говорим.",
  art: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M14 24 H106 a8 8 0 0 1 8 8 V88 a8 8 0 0 1 -8 8 H14 a8 8 0 0 1 -8 -8 V32 a8 8 0 0 1 8 -8 Z M48 42 L82 60 L48 78 Z"
  }))
}, {
  title: "Прикладно",
  body: "Поднимаем боли, делимся идеями и решениями. «Бери и делай».",
  art: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "rotate(45 60 60)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M52 5.7 A20 20 0 1 0 68 5.7 L68 24 A8 8 0 0 1 52 24 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "53",
    y: "40",
    width: "14",
    height: "40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52 114.3 A20 20 0 1 1 68 114.3 L68 96 A8 8 0 0 0 52 96 Z"
  })))
}, {
  title: "Никаких продаж со сцены",
  body: "Никаких «у меня на курсе». Кейсы и инсайты — если тема зацепит, человек сам найдёт тебя.",
  danger: true,
  art: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    fill: "currentColor",
    stroke: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M60 8 a52 52 0 1 0 0.1 0 Z M60 22 a38 38 0 1 0 0.1 0 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "53",
    width: "80",
    height: "14",
    rx: "7",
    transform: "rotate(45 60 60)"
  }))
}];
function FormatCards() {
  return /*#__PURE__*/React.createElement("div", {
    className: "sp-fmt"
  }, FORMAT.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title,
    className: "sp-fmt__card" + (f.danger ? " sp-fmt__card--danger" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp-fmt__deco",
    "aria-hidden": "true"
  }, f.art), /*#__PURE__*/React.createElement("h3", null, f.title), /*#__PURE__*/React.createElement("p", null, f.body))));
}
function SpeakersTest() {
  const [dealTab, setDealTab] = React.useState("bonuses");
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: SP_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0421\u043F\u0438\u043A\u0435\u0440\u0430\u043C \xB7 Frankenplatz 2026")), /*#__PURE__*/React.createElement("h1", null, "\u0421\u0430\u043C\u044B\u0439\xA0\u0431\u043E\u043B\u044C\u0448\u043E\u0439\xA0\u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0439\xA0\u0444\u043E\u0440\u0443\u043C \u043E\xA0\u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u0432\xA0\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0418\xA0\u0437\u043E\u0432\u0451\u043C \u0442\u0435\u0431\u044F \u043D\u0430\xA0\u0441\u0446\u0435\u043D\u0443.")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0417\u0430\u043B \u043D\u0430\xA0500 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u2014 \u0442\u0432\u043E\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F. \u041C\u044B \u0443\u0436\u0435 \u0437\u043D\u0430\u043A\u043E\u043C\u044B online, \u0438\xA0\u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u043C\u043E\u0436\u0435\u0442 \u0441\u0442\u0430\u0442\u044C \u043E\u0434\u043D\u043E\u0439 \u0438\u0437\xA0\u0441\u0438\u043B\u044C\u043D\u0435\u0439\u0448\u0438\u0445."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#apply"
  }, "\u0425\u043E\u0447\u0443 \u0432\u044B\u0441\u0442\u0443\u043F\u0438\u0442\u044C")))), /*#__PURE__*/React.createElement("section", {
    id: "mission",
    className: "gridbg sp-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0437\u0430 \u044D\u0442\u0438\u043C \u0441\u0442\u043E\u0438\u0442 \u2014 \u0438 \u0437\u0430\u0447\u0435\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u0412 \u043A\u0440\u0430\u0441\u0438\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0435", /*#__PURE__*/React.createElement("br", null), "\u2014 \u043A\u0440\u0430\u0441\u0438\u0432\u043E \u0436\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041A\u0440\u0430\u0441\u0438\u0432\u043E \u0436\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F, \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0434\u0435\u043D\u0435\u0433 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u2014 \u0438 \u043A\u043E\u0433\u0434\u0430 \u043D\u0435\u0442 \u0442\u0435\u0445 \u0441\u0430\u043C\u044B\u0445 \u0441\u0442\u0440\u0430\u0445\u043E\u0432 \u043F\u0440\u043E \u043D\u0438\u0445. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0443 Frankenplatz \u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043C\u0438\u0441\u0441\u0438\u044F: \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0441\u0432\u0435\u0449\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0445 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u041D\u0435 \xAB\u0443\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u0443\u0441\u043F\u0435\u0445\xBB, \u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F."), /*#__PURE__*/React.createElement("div", {
    className: "sp-org__card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-org__photo",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp-org__emoji"
  }, "\uD83D\uDE4B\u200D\u2640\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "sp-org__cap"
  }, "\u0424\u043E\u0442\u043E")), /*#__PURE__*/React.createElement("div", {
    className: "sp-org__body"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440 \u0444\u043E\u0440\u0443\u043C\u0430"), /*#__PURE__*/React.createElement("h3", {
    className: "sp-org__name"
  }, "\u041A\u0441\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u042F \u043D\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u043E\u0434 \u0441\u043E\u0431\u0438\u0440\u0430\u044E \u043B\u044E\u0434\u0435\u0439 \u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041E\u0434\u0438\u043D \u0438\u0437 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u043A\u0435\u0439\u0441\u043E\u0432 \u2014 MotoZurich \u0432 \u0444\u0435\u0432\u0440\u0430\u043B\u0435 2026 \u0433\u043E\u0434\u0430: \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435 \u043D\u0430 ", /*#__PURE__*/React.createElement("strong", null, "22 000 \u0447\u0435\u043B\u043E\u0432\u0435\u043A"), ". Frankenplatz \u0441\u043E\u0431\u0438\u0440\u0430\u044E \u0441 \u0442\u0435\u043C \u0436\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u043C: \u0441\u0435\u0440\u044C\u0451\u0437\u043D\u043E, \u043F\u043E \u0434\u0435\u043B\u0443, \u0434\u043E \u043C\u0435\u043B\u043E\u0447\u0435\u0439."), /*#__PURE__*/React.createElement("p", {
    className: "sp-org__why"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp-org__why-t"
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u044D\u0442\u043E \u0432\u0430\u0436\u043D\u043E \u0442\u0435\u0431\u0435:"), " \u0437\u0430 \u0444\u043E\u0440\u0443\u043C\u043E\u043C \u2014 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0441 \u043E\u043F\u044B\u0442\u043E\u043C \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439, \u0430 \u043D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u044D\u043D\u0442\u0443\u0437\u0438\u0430\u0437\u043C. \u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D, \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u2014 \u0432\u0441\u0451 \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435. \u0422\u044B \u0432\u044B\u0445\u043E\u0434\u0438\u0448\u044C \u043D\u0430 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0441\u0446\u0435\u043D\u0443 \u0438 \u043A \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."))))), /*#__PURE__*/React.createElement("section", {
    id: "days"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D \u0444\u043E\u0440\u0443\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u0414\u0432\u0430 \u0434\u043D\u044F \u2014 \u0438 \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E", /*#__PURE__*/React.createElement("br", null), "\u0441\u0432\u043E\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412\u044B\u0431\u0438\u0440\u0430\u0439 \u0434\u0435\u043D\u044C \u043F\u043E\u0434 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u2014 \u0430 \u0435\u0441\u043B\u0438 \u0442\u0435\u043C\u0430 \u043B\u043E\u0436\u0438\u0442\u0441\u044F \u0432 \u043E\u0431\u0430, \u0432\u044B\u0441\u0442\u0443\u043F\u0438 \u0438 \u0442\u0430\u043C, \u0438 \u0442\u0430\u043C."), /*#__PURE__*/React.createElement(DaysTabs, null), /*#__PURE__*/React.createElement("p", {
    className: "sp-daysnote"
  }, "\uD83D\uDCA1 \u0417\u0430\u043B \u0431\u044B\u0432\u0430\u0435\u0442 \u0440\u0430\u0437\u043D\u044B\u043C: \u0447\u0430\u0449\u0435 \u0436\u0435\u043D\u0449\u0438\u043D\u044B, \u043D\u043E \u0441\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u0438 \u0440\u043E\u0432\u043D\u043E 50 \u043D\u0430 50. \u0414\u0435\u043D\u044C \u0438 \u0442\u0430\u0439\u043C-\u0441\u043B\u043E\u0442\u044B \u043E\u0442\u043C\u0435\u0442\u0438\u0448\u044C \u0432 \u0430\u043D\u043A\u0435\u0442\u0435."), /*#__PURE__*/React.createElement("h2", {
    className: "sp-fmt-h"
  }, "\u0424\u043E\u0440\u043C\u0430\u0442 \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u043F\u043E\u043B\u044C\u0437\u0430"), ", \u0430 \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0436\u0430"), /*#__PURE__*/React.createElement(FormatCards, null))), /*#__PURE__*/React.createElement("section", {
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-deal"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0421\u0440\u0430\u0437\u0443 \u0447\u0435\u0441\u0442\u043D\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043F\u0438\u043A\u0435\u0440\u044B \u043D\u0435 \u043F\u043B\u0430\u0442\u044F\u0442 \u043D\u0430\u043C. \u041C\u044B \u043D\u0435 \u043F\u043B\u0430\u0442\u0438\u043C \u0441\u043F\u0438\u043A\u0435\u0440\u0430\u043C. \u041C\u044B \u0434\u0430\u0451\u043C \u0442\u043E, \u0447\u0442\u043E \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438 \u043D\u0435 \u043A\u0443\u043F\u0438\u0448\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u0435\u0439\u0447\u0430\u0441 \u043C\u043E\u0434\u043D\u043E, \u0447\u0442\u043E \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043B\u0430\u0442\u0438\u0442 \u0437\u0430 \u0432\u044B\u0445\u043E\u0434 \u043D\u0430 \u0441\u0446\u0435\u043D\u0443. \u0423 \u043D\u0430\u0441 \u0442\u0430\u043A\u043E\u0433\u043E \u043D\u0435\u0442 \u2014 \u0438 \u0433\u043E\u043D\u043E\u0440\u0430\u0440\u043E\u0432 \u043C\u044B \u0442\u043E\u0436\u0435 \u043D\u0435 \u043F\u043B\u0430\u0442\u0438\u043C. \u0412\u043C\u0435\u0441\u0442\u043E \u044D\u0442\u043E\u0433\u043E \u2014 \u0432\u043E\u0442 \u0447\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0441\u043F\u0438\u043A\u0435\u0440 \u0444\u043E\u0440\u0443\u043C\u0430.")), /*#__PURE__*/React.createElement("div", {
    className: "sp-switch",
    role: "tablist"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "tab",
    "aria-selected": dealTab === "bonuses",
    className: "sp-switch__btn" + (dealTab === "bonuses" ? " is-on" : ""),
    onClick: () => setDealTab("bonuses")
  }, "\u0411\u043E\u043D\u0443\u0441\u044B \u043A\u0430\u0436\u0434\u043E\u043C\u0443"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "tab",
    "aria-selected": dealTab === "more",
    className: "sp-switch__btn" + (dealTab === "more" ? " is-on" : ""),
    onClick: () => setDealTab("more")
  }, "\u0415\u0449\u0451 \u043A\u043E\u0435-\u0447\u0442\u043E\u2026 \uD83E\uDD2B")), dealTab === "bonuses" ? /*#__PURE__*/React.createElement(GiveGrid, null) : /*#__PURE__*/React.createElement("div", {
    className: "sp-more"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u042D\u0442\u043E \u0435\u0449\u0451 \u043D\u0435 \u0432\u0441\u0451"), /*#__PURE__*/React.createElement("h2", null, "\u041A\u043E\u0435-\u0447\u0442\u043E, \u0447\u0442\u043E \u043C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043F\u0438\u043A\u0435\u0440\u0430\u043C \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0444\u043E\u0440\u0443\u043C\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u044A\u0451\u043C\u043A\u0430 \u0438 \u0442\u0440\u0435\u043D\u0435\u0440\u044B \u2014 \u044D\u0442\u043E \u043F\u0440\u0438\u044F\u0442\u043D\u043E. \u041D\u043E \u0435\u0441\u0442\u044C \u043A\u043E\u0435-\u0447\u0442\u043E, \u0447\u0442\u043E \u0432\u044B\u0445\u043E\u0434\u0438\u0442 \u0434\u0430\u043B\u0435\u043A\u043E \u0437\u0430 \u0440\u0430\u043C\u043A\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0434\u043D\u044F \u043D\u0430 \u0441\u0446\u0435\u043D\u0435. \u042D\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442 ", /*#__PURE__*/React.createElement("strong", null, "\u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043F\u0438\u043A\u0435\u0440\u044B Frankenplatz 2026"), " \u2014 \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0442\u0430\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u0431\u0443\u0434\u0435\u0442, \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u0439 \u0444\u043E\u0440\u0443\u043C \u0431\u044B\u0432\u0430\u0435\u0442 \u043E\u0434\u0438\u043D \u0440\u0430\u0437."), /*#__PURE__*/React.createElement("div", {
    className: "sp-more__cards sp-more__cards--3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-more__card"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, "\uD83C\uDD93 \u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("h3", null, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C, \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0443\u0441\u043B\u0443\u0433\u0438"), /*#__PURE__*/React.createElement("p", null, "\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438 \u0441\u0435\u0431\u044F, \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E \u0441\u0442\u043E\u0438\u0442 ", /*#__PURE__*/React.createElement("strong", null, "199 \u0444\u0440\u0430\u043D\u043A\u043E\u0432"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "sp-more__card"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila"
  }, "\uD83D\uDECD \u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h3", null, "\u0413\u0430\u0439\u0434\u044B \u0438 \u043A\u0443\u0440\u0441\u044B \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443"), /*#__PURE__*/React.createElement("p", null, "\u0415\u0441\u0442\u044C \u0433\u0430\u0439\u0434, \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0443\u0440\u0441 \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442? \u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438 \u0435\u0433\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435.")), /*#__PURE__*/React.createElement("div", {
    className: "sp-more__card"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, "\uD83D\uDCC8 \u0414\u043E\u043B\u044F"), /*#__PURE__*/React.createElement("h3", null, "\u041F\u0430\u043A\u0435\u0442 \u0430\u043A\u0446\u0438\u0439 \u2014 \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0441\u043F\u0438\u043A\u0435\u0440\u0443"), /*#__PURE__*/React.createElement("p", null, "\u041F\u043E\u0434 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443 \u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u044E AG. \u041A\u0430\u0436\u0434\u044B\u0439 \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0444\u043E\u0440\u0443\u043C\u0430 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u0430\u043A\u0435\u0442 \u043D\u0430 2000 \u0430\u043A\u0446\u0438\u0439"), " \u2014 \u0434\u043E\u043B\u044E \u0432 \u0442\u043E\u043C, \u0447\u0442\u043E \u043C\u044B \u0441\u0442\u0440\u043E\u0438\u043C."))), /*#__PURE__*/React.createElement("p", {
    className: "sp-more__lock"
  }, "\uD83D\uDD12 \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432 \u0444\u043E\u0440\u0443\u043C\u0430 2026 \u0433\u043E\u0434\u0430.")))), /*#__PURE__*/React.createElement("section", {
    id: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u043E\u0433\u043E \u043C\u044B \u0438\u0449\u0435\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u041E\u043F\u044B\u0442 \u0446\u0435\u043D\u0438\u043C \u043F\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u043C \u2014 \u0442\u0435\u0445, \u043A\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u043E\u0439 \u0437\u0435\u043C\u043B\u0435, \u043D\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B \u0438 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u0435 \u043A\u0435\u0439\u0441\u044B. \u0412\u0430\u0436\u0435\u043D \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0438 \u043F\u043E\u043B\u044C\u0437\u0430 \u0437\u0430\u043B\u0443, \u0430 \u043D\u0435 \u0440\u0435\u0433\u0430\u043B\u0438\u0438. \u041E\u0434\u043D\u043E \u0436\u0451\u0441\u0442\u043A\u043E\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435: ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u0440\u0430\u0432\u043E, \u0431\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438 \u0438 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043E \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u0438\u043C \u0434\u0438\u043F\u043B\u043E\u043C\u043E\u043C \u0438 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0435\u0439"), ". \u041B\u0438\u0447\u043D\u043E\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0435\u0439 \u043C\u043E\u0436\u0435\u0442 \u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043A\u0430\u0436\u0434\u044B\u0439."), /*#__PURE__*/React.createElement("div", {
    className: "sp-slots"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cta-mid__note"
  }, /*#__PURE__*/React.createElement("b", null, "\u0417\u0432\u0443\u0447\u0438\u0442 \u043A\u0430\u043A \u0442\u0432\u043E\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F?"), " \u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438 \u043E \u0442\u0435\u043C\u0435 \u2014 \u0438 \u0437\u0430\u0439\u043C\u0438 \u043C\u0435\u0441\u0442\u043E \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432, \u043F\u043E\u043A\u0430 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442\u0441\u044F."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#apply"
  }, "\u0425\u043E\u0447\u0443 \u0432\u044B\u0441\u0442\u0443\u043F\u0438\u0442\u044C")))), /*#__PURE__*/React.createElement("section", {
    id: "confirmed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0443\u0436\u0435 \u0441 \u043D\u0430\u043C\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041F\u0435\u0440\u0432\u044B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u0435 \u0441\u043F\u0438\u043A\u0435\u0440\u044B"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0441\u043A\u043E\u0440\u043E \u0437\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0448\u044C \u0438\xA0\u0442\u044B."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-cta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "\u0415\u0441\u0442\u044C \u043E\xA0\u0447\u0451\u043C \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C?"), /*#__PURE__*/React.createElement("p", null, "\u041F\u043E\u0434\u043D\u0438\u043C\u0430\u0435\u043C \u0431\u043E\u043B\u0438 \u0438\xA0\u0440\u0435\u0448\u0435\u043D\u0438\u044F. \u0415\u0441\u043B\u0438 \u0442\u0432\u043E\u0439 \u043E\u043F\u044B\u0442 \u043F\u043E\u043B\u0435\u0437\u0435\u043D \u0437\u0430\u043B\u0443 \u2014 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0438 \u0434\u043E\u043A\u043B\u0430\u0434.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm",
    href: "#apply"
  }, "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u0442\u0435\u043C\u0443 \u2192"))), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\xA0\u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441\xA0\u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "LinkedIn"
  }), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\xA0\u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441\xA0\u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "LinkedIn"
  }), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\xA0\u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441\xA0\u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "YouTube"
  })), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: 14,
      color: "var(--muted-2)"
    }
  }, "\u0417\u0430\u043C\u0435\u043D\u0438 \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B \u043D\u0430\xA0\u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432: \u0444\u043E\u0442\u043E, \u0438\u043C\u044F, \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E, \u0442\u0435\u043C\u0443 \u0438\xA0\u0441\u0441\u044B\u043B\u043A\u0443."))), /*#__PURE__*/React.createElement("section", {
    id: "apply",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0421\u043F\u0438\u043A\u0435\u0440\u0430\u043C \xB7 Frankenplatz 2026"),
    title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438 \u043E \u0441\u0435\u0431\u0435",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "#apply"
    }, "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u043D\u043A\u0435\u0442\u0443 \u0441\u043F\u0438\u043A\u0435\u0440\u0430")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u0430\u043D\u043A\u0435\u0442\u0430: \u043E\xA0\u0442\u0435\u0431\u0435, \u0442\u0435\u043C\u0435 \u0438\xA0\u0443\u0434\u043E\u0431\u043D\u044B\u0445 \u0442\u0430\u0439\u043C-\u0441\u043B\u043E\u0442\u0430\u0445. \u0424\u043E\u0440\u043C\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u043C \u0441\u043A\u043E\u0440\u043E. \u0414\u0430\u0442\u0430: 24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "Для участников",
      href: "index.html"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }]
  }));
}
window.SpeakersTest = SpeakersTest;
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/SpeakersTest.jsx", error: String((e && e.message) || e) }); }

// test/kit.combined.js
try { (() => {
/* Frankenplatz marketing — COMBINED single-file build helper.
   Same visual effects as kit.js, but:
   - singletons (cursor glow, orb drift, magnetic buttons, active-menu scroll
     listener) are installed exactly once, using LIVE DOM queries so they keep
     working as the router swaps the page inside #root;
   - the per-page reveal / count-up / stagger effects are exposed as
     window.FPReArm(), which the router calls after each navigation so fresh
     page content animates in just like on the standalone pages.
   The original kit.js is left untouched and still used by the real pages. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Фоновые градиенты плавают сами (CSS в kit.css); огонёк за курсором убран. ── */

  /* ── Magnetic buttons — отключены по просьбе (дёрганье к курсору) ─────── */

  /* ── Active menu — scroll listener once, map rebuilt on navigation ───── */
  var menuMap = [];
  (function () {
    var ticking = false;
    function measure() {
      ticking = false;
      var mid = window.innerHeight * 0.42,
        best = null,
        bestD = Infinity;
      menuMap.forEach(function (m) {
        var r = m.sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var c = r.top + r.height / 2,
          d = Math.abs(c - mid);
        if (d < bestD) {
          bestD = d;
          best = m;
        }
      });
      menuMap.forEach(function (m) {
        m.a.classList.toggle("is-active", m === best);
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    }, {
      passive: true
    });
    window.__fpMenuMeasure = measure;
  })();
  function rebuildMenu() {
    menuMap = [];
    var links = Array.prototype.slice.call(document.querySelectorAll(".fp-top__nav .fp-top__link"));
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.charAt(0) === "#" && href.length > 1) {
        var sec = document.getElementById(href.slice(1));
        if (sec) menuMap.push({
          a: a,
          sec: sec
        });
      }
    });
    if (window.__fpMenuMeasure) window.__fpMenuMeasure();
  }

  /* ── Re-armable per-page effects ─────────────────────────────────────── */
  function armReveal() {
    if (reduce) return;
    var roots = document.querySelectorAll(".kit > *:not(.fp-backdrop):not(.fp-glow):not(.fp-top):not(.hero)");
    if (!roots.length) return false;
    var targets = [];
    function prep(node, i) {
      if (node.classList.contains("fp-reveal")) return;
      node.classList.add("fp-reveal");
      node.style.animationDelay = Math.min(i, 6) * 70 + "ms";
      targets.push(node);
    }
    Array.prototype.forEach.call(roots, function (sec) {
      var inner = sec.querySelector(".inner");
      if (!inner) {
        prep(sec, 0);
        return;
      }
      var ti = 0;
      Array.prototype.forEach.call(inner.children, function (ch) {
        if (ch.matches && ch.matches(".grid, .statrow")) {
          Array.prototype.forEach.call(ch.children, function (c, i) {
            prep(c, i);
          });
        } else {
          prep(ch, ti++);
        }
      });
    });
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("fp-in");
          io.unobserve(en.target);
        }
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    }) : null;
    var vh = window.innerHeight || 800;
    targets.forEach(function (node) {
      if (node.getBoundingClientRect().top < vh * 0.95) node.classList.add("fp-in");else if (io) io.observe(node);else node.classList.add("fp-in");
    });
    setTimeout(function () {
      var vh2 = window.innerHeight || 800;
      targets.forEach(function (n) {
        if (n.getBoundingClientRect().top < vh2) n.classList.add("fp-in");
      });
    }, 2600);
    return true;
  }
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([^\d]*)([\d\u00A0 ,\.]*\d)(.*)$/);
    if (!m) return;
    var prefix = m[1],
      numStr = m[2],
      suffix = m[3];
    var hasSep = /[\u00A0 ,]/.test(numStr);
    var target = parseInt(numStr.replace(/[^\d]/g, ""), 10);
    if (!isFinite(target) || target <= 0) return;
    var dur = target > 1000 ? 1300 : 1000,
      start = null;
    function fmt(n) {
      var s = String(n);
      if (hasSep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
      return prefix + s + suffix;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1),
        eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        el.textContent = fmt(Math.round(target * eased));
        requestAnimationFrame(step);
      } else el.textContent = raw;
    }
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  }
  function armCount() {
    if (reduce || !("IntersectionObserver" in window)) return true;
    var nums = document.querySelectorAll(".fp-stat__big:not([data-counted])");
    if (!nums.length) return false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.setAttribute("data-counted", "1");
          countUp(en.target);
          io.unobserve(en.target);
        }
      });
    }, {
      threshold: 0.6
    });
    Array.prototype.forEach.call(nums, function (n) {
      if (n.getBoundingClientRect().top < (window.innerHeight || 800) * 0.85) {
        n.setAttribute("data-counted", "1");
        countUp(n);
      } else io.observe(n);
    });
    return true;
  }
  function armStagger() {
    if (reduce || !("IntersectionObserver" in window)) return true;
    var groups = [];
    document.querySelectorAll(".rrm__frame:not([data-stagger])").forEach(function (f) {
      f.setAttribute("data-stagger", "1");
      groups.push([f, ".rrm__pt", 90]);
    });
    document.querySelectorAll(".cmp__list:not([data-stagger]), .tl:not([data-stagger]), .risks:not([data-stagger])").forEach(function (g) {
      g.setAttribute("data-stagger", "1");
      g.classList.add("fp-stagger");
      groups.push([g, ":scope > *", 80]);
    });
    if (!groups.length) return true;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var g = en.target,
          sel = g.__sel,
          step = g.__step,
          kids = g.querySelectorAll(sel);
        Array.prototype.forEach.call(kids, function (k, i) {
          k.style.transitionDelay = i * step + "ms";
          k.style.animationDelay = i * step + "ms";
        });
        g.classList.add("fp-in");
        io.unobserve(g);
      });
    }, {
      threshold: 0.25
    });
    groups.forEach(function (t) {
      t[0].__sel = t[1];
      t[0].__step = t[2];
      io.observe(t[0]);
    });
    return true;
  }
  var pollIv = null;
  window.FPReArm = function () {
    rebuildMenu();
    if (window.__fpDriftUpdate) window.__fpDriftUpdate();
    if (pollIv) clearInterval(pollIv);
    var tries = 0;
    pollIv = setInterval(function () {
      tries++;
      var ok = armReveal();
      armCount();
      armStagger();
      if (ok || tries > 40) {
        clearInterval(pollIv);
        pollIv = null;
      }
    }, 100);
  };
})();

/* переключатель «Участникам | Спикерам» убран — в меню обычная ссылка «Спикерам» */

/* ── 50/50 (день 1): скролл «разрезает» карточку ломаной линией ───────── */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  function update() {
    ticking = false;
    var card = document.querySelector(".fifty");
    if (!card) return;
    var vh = window.innerHeight;
    var r = card.getBoundingClientRect();
    var center = r.top + r.height / 2;
    // 0 — карточка по центру экрана, 1 — центр поднялся к верхней трети
    var p = (vh * 0.62 - center) / (vh * 0.42);
    p = Math.min(Math.max(p, 0), 1);
    card.style.setProperty("--split", p.toFixed(3));
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {
    passive: true
  });
  window.addEventListener("resize", update, {
    passive: true
  });
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (document.querySelector(".fifty")) {
      update();
      clearInterval(iv);
    } else if (tries > 50) clearInterval(iv);
  }, 150);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/kit.combined.js", error: String((e && e.message) || e) }); }

// test/kit.js
try { (() => {
/* Frankenplatz marketing — shared test-page effects. */
/* Фоновые градиентные пятна теперь плавают сами — чистый CSS (kit.css). */

/* ── 1 · Огонёк за курсором — убран по просьбе. ── */

/* ── 2 · Появление при скролле ─────────────────────────────────────────
   Секции и карточки всплывают (opacity + translateY) со стаггером
   через IntersectionObserver. Уважает prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  function setup() {
    // все крупные блоки всех страниц: секции, футер, марквиз — всё, кроме шапки и героя
    var roots = document.querySelectorAll(".kit > *:not(.fp-backdrop):not(.fp-glow):not(.fp-top):not(.hero)");
    if (!roots.length) return false;
    var targets = [];
    function prep(node, i) {
      if (node.classList.contains("fp-reveal")) return;
      node.classList.add("fp-reveal");
      node.style.animationDelay = Math.min(i, 6) * 70 + "ms";
      targets.push(node);
    }
    Array.prototype.forEach.call(roots, function (sec) {
      var inner = sec.querySelector(".inner");
      if (!inner) {
        prep(sec, 0);
        return;
      }
      var ti = 0;
      Array.prototype.forEach.call(inner.children, function (ch) {
        if (ch.matches && ch.matches(".grid, .statrow")) {
          Array.prototype.forEach.call(ch.children, function (c, i) {
            prep(c, i);
          });
        } else {
          prep(ch, ti++);
        }
      });
    });
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("fp-in");
          io.unobserve(en.target);
        }
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    }) : null;
    var vh = window.innerHeight || 800;
    targets.forEach(function (node) {
      // already in view on load → reveal now; the rest wait for the observer
      if (node.getBoundingClientRect().top < vh * 0.95) node.classList.add("fp-in");else if (io) io.observe(node);else node.classList.add("fp-in");
    });

    // failsafe: только для тех, кто уже в зоне видимости — остальные ждут observer,
    // иначе всё под сгибом раскрывалось заранее и не анимировалось при скролле
    setTimeout(function () {
      var vh2 = window.innerHeight || 800;
      targets.forEach(function (n) {
        if (n.getBoundingClientRect().top < vh2) n.classList.add("fp-in");
      });
    }, 2600);
    return true;
  }
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (setup() || tries > 50) clearInterval(iv);
  }, 120);
})();

/* ── 3 · Count-up чисел + стаггер-группы ───────────────────────────────
   Числа в StatCard плавно накручиваются при появлении; точки матрицы,
   строки таблиц/таймлайна/чек-листа проявляются со стаггером. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([^\d]*)([\d\u00A0 ,\.]*\d)(.*)$/);
    if (!m) return;
    var prefix = m[1],
      numStr = m[2],
      suffix = m[3];
    var hasSep = /[\u00A0 ,]/.test(numStr);
    var target = parseInt(numStr.replace(/[^\d]/g, ""), 10);
    if (!isFinite(target) || target <= 0) return;
    var dur = target > 1000 ? 1300 : 1000,
      start = null;
    function fmt(n) {
      var s = String(n);
      if (hasSep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
      return prefix + s + suffix;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        el.textContent = fmt(Math.round(target * eased));
        requestAnimationFrame(step);
      } else el.textContent = raw;
    }
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  }
  function armCount() {
    /* Тот же счётчик живёт в site/effects.js. Оба скрипта грузятся на странице,
       поэтому отметка data-counted обязательна: без неё второй проход читает
       число в середине анимации (напр. «1») и фиксирует его как финальное. */
    var nums = document.querySelectorAll(".fp-stat__big:not([data-counted])");
    if (!nums.length) return false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.setAttribute("data-counted", "1");
          countUp(en.target);
          io.unobserve(en.target);
        }
      });
    }, {
      threshold: 0.6
    });
    Array.prototype.forEach.call(nums, function (n) {
      if (n.getBoundingClientRect().top < (window.innerHeight || 800) * 0.85) {
        n.setAttribute("data-counted", "1");
        countUp(n);
      } else io.observe(n);
    });
    return true;
  }
  function armStagger() {
    var groups = [];
    document.querySelectorAll(".rrm__frame").forEach(function (f) {
      groups.push([f, ".rrm__pt", 90]);
    });
    document.querySelectorAll(".cmp__list, .tl, .risks").forEach(function (g) {
      g.classList.add("fp-stagger");
      groups.push([g, ":scope > *", 80]);
    });
    if (!groups.length) return false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var g = en.target;
        var sel = g.__sel,
          step = g.__step;
        var kids = g.querySelectorAll(sel);
        Array.prototype.forEach.call(kids, function (k, i) {
          k.style.transitionDelay = i * step + "ms";
          k.style.animationDelay = i * step + "ms";
        });
        g.classList.add("fp-in");
        io.unobserve(g);
      });
    }, {
      threshold: 0.25
    });
    groups.forEach(function (t) {
      t[0].__sel = t[1];
      t[0].__step = t[2];
      io.observe(t[0]);
    });
    return true;
  }
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    var a = armCount(),
      b = armStagger();
    if (a && b || tries > 50) clearInterval(iv);
  }, 140);
})();

/* ── 4 · Магнитные кнопки — отключены по просьбе (дёрганье к курсору).
   Достаточно hover-подсветки/лёгкого подъёма из CSS. ─────────────────── */

/* ── 5 · Подсветка активного пункта меню при скролле — убрана по просьбе. ── */

/* переключатель «Участникам | Спикерам» убран — в меню обычная ссылка «Спикерам» */

/* ── 50/50 (день 1): скролл «разрезает» карточку ломаной линией ───────── */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  function update() {
    ticking = false;
    var card = document.querySelector(".fifty");
    if (!card) return;
    var vh = window.innerHeight;
    var r = card.getBoundingClientRect();
    var center = r.top + r.height / 2;
    // 0 — карточка по центру экрана, 1 — центр поднялся к верхней трети
    var p = (vh * 0.62 - center) / (vh * 0.42);
    p = Math.min(Math.max(p, 0), 1);
    card.style.setProperty("--split", p.toFixed(3));
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {
    passive: true
  });
  window.addEventListener("resize", update, {
    passive: true
  });
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (document.querySelector(".fifty")) {
      update();
      clearInterval(iv);
    } else if (tries > 50) clearInterval(iv);
  }, 150);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/kit.js", error: String((e && e.message) || e) }); }

// test/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "test/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Day1.jsx
try { (() => {
/* Frankenplatz — Day 1 page. Recreates uploads/day1.html. Exposes window.Day1. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Card,
  StatCard,
  ReliefBand,
  FAQItem
} = window.FrankenplatzDesignSystem_144b92;
const D1_NAV = [{
  label: "На главную",
  href: "index.html"
}, {
  label: "Программа",
  href: "index.html#program"
}, {
  label: "День 2",
  href: "day2.html"
}, {
  label: "Спикерам",
  href: "speakers.html"
}, {
  label: "Записаться",
  href: "index.html#reg",
  cta: true
}];
function Insp({
  k,
  t,
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "gold",
    tone: "gold",
    className: "insp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, children));
}
function Day1() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: D1_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0414\u0435\u043D\u044C 1 \xB7 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \xB7 \u0431\u0430\u0437\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0441\u0442\u043E\u0438\u0442 \u043D\u0430\u0447\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("h1", null, "\u0413\u0434\u0435 \u0431\u0430\u0431\u043A\u0438 \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0438 \u043A\u0430\u043A \u0438\u0445 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0414\u0435\u043D\u044C 1 \u2014 \u043F\u0440\u043E \u0441\u0430\u043C\u044B\u0435 \u0447\u0430\u0441\u0442\u044B\u0435 \u0438 \u0441\u0430\u043C\u044B\u0435 \u0442\u0438\u0445\u0438\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0435\u0441\u0442\u044C \u043F\u043E\u0447\u0442\u0438 \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E, \u043A\u0442\u043E \u0436\u0438\u0432\u0451\u0442 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u041C\u044B \u0438\u0445 \u043D\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0432\u0441\u043B\u0443\u0445. \u0422\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438\u0439\u0442\u0438 \u0438 \u043F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C \u2014 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u044F."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "pain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0423\u0437\u043D\u0430\u0451\u0448\u044C \u0441\u0435\u0431\u044F?"), /*#__PURE__*/React.createElement("h2", null, "\u0416\u0438\u0432\u0451\u0448\u044C \u0437\u0434\u0435\u0441\u044C \u2014 \u0430 \u0434\u0435\u043D\u044C\u0433\u0438 \u0436\u0438\u0432\u0443\u0442 \u0441\u0432\u043E\u0435\u0439 \u0436\u0438\u0437\u043D\u044C\u044E"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u043D\u0435 \u043F\u0440\u0438\u043D\u044F\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445. \u0418\u043C\u0435\u043D\u043D\u043E \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0442\u0435\u0440\u044F\u0435\u0442 \u2014 \u0442\u0438\u0445\u043E \u0438 \u0433\u043E\u0434\u0430\u043C\u0438. \u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043B \u0442\u0435\u0431\u0435 \u043A\u0430\u0440\u0442\u0443: \u0433\u0434\u0435 \u043B\u0435\u0436\u0430\u0442 \u0442\u0432\u043E\u0438 \u0434\u0435\u043D\u044C\u0433\u0438, \u0447\u0442\u043E \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043E \u043F\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u0435, \u0447\u0442\u043E \u0443\u0442\u0435\u043A\u0430\u0435\u0442 \u043C\u0438\u043C\u043E \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u041D\u0435 \u0437\u043D\u0430\u044E, \u043A\u0430\u043A \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F\xBB"
  }, "\u0416\u0438\u0432\u0451\u0448\u044C \u0442\u0443\u0442 \u0434\u0430\u0432\u043D\u043E, \u0430 \u0441\u0432\u043E\u0435\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0442\u0430\u043A \u0438 \u043D\u0435\u0442. \u041A\u0443\u0434\u0430 \u043F\u043E\u0434\u0430\u0442\u044C\u0441\u044F, \u043A\u0430\u043A \u043C\u043E\u043D\u0435\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u043F\u044B\u0442 \u2014 \u0441\u0430\u043C\u044B\u0439 \u0447\u0430\u0441\u0442\u044B\u0439 \u0438 \u0441\u0430\u043C\u044B\u0439 \u0442\u0438\u0445\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0425\u043E\u0447\u0443 \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441 \u2014 \u043D\u043E \u043E\u0442\u043A\u0443\u0434\u0430?\xBB"
  }, "\u0415\u0441\u0442\u044C \u0438\u0434\u0435\u044F, \u043D\u0435\u0442 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u044B. \u041A\u0430\u043A\u043E\u0435 \u044E\u0440\u043B\u0438\u0446\u043E, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u043B\u043E\u0433\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043B\u0438 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0437 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0430 \u2014 \u0438 \u043D\u0435 \u043F\u0440\u043E\u0433\u043E\u0440\u0435\u0442\u044C."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u041F\u043E\u0434\u0443\u0448\u043A\u0438 \u043D\u0435\u0442. \u0418\u043B\u0438 \u0435\u0441\u0442\u044C, \u043D\u043E \u0441\u043C\u0435\u0448\u043D\u0430\u044F\xBB"
  }, "\u041F\u043E\u0442\u0435\u0440\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0437\u0430\u0432\u0442\u0440\u0430 \u2014 \u043D\u0430 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0445\u0432\u0430\u0442\u0438\u0442? \u0418 \u043A\u0430\u043A \u044D\u0442\u0443 \u043F\u043E\u0434\u0443\u0448\u043A\u0443 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0435\u0451 \u043D\u0435 \u0441\u044A\u0435\u043B\u0430 \u0438\u043D\u0444\u043B\u044F\u0446\u0438\u044F."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0414\u0435\u043D\u044C\u0433\u0438 \u0443\u0445\u043E\u0434\u044F\u0442, \u0430 \u043A\u0443\u0434\u0430 \u2014 \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E\xBB"
  }, "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u0438\u043B\u0438\u0447\u043D\u0430\u044F, \u043A \u043A\u043E\u043D\u0446\u0443 \u043C\u0435\u0441\u044F\u0446\u0430 \u043D\u043E\u043B\u044C. Krankenkasse, \u043D\u0430\u043B\u043E\u0433\u0438, \u0430\u0440\u0435\u043D\u0434\u0430 \u2014 \u0431\u0443\u0434\u0442\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043A\u043E\u0440\u043C\u0438\u0448\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0412\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u0435, \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0441\u0447\u0435\u0442\u0443\xBB"
  }, "\u041D\u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439, \u043D\u0438 3a \u2014 \u0432\u0441\u0451 \u043B\u0435\u0436\u0438\u0442 \u043D\u0430 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0441\u0447\u0451\u0442\u0435 \u0438 \u0442\u0438\u0445\u043E \u043E\u0431\u0435\u0441\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u0442\u0441\u044F. \u0417\u0430\u0432\u0435\u0441\u0442\u0438 ETF \u0441\u0442\u0440\u0430\u0448\u043D\u043E \u0438 \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0421\u0432\u043E\u0438\u0445 \u0434\u0435\u043D\u0435\u0433 \u043A\u0430\u043A \u0431\u0443\u0434\u0442\u043E \u0438 \u043D\u0435\u0442\xBB"
  }, "\u0412\u0441\u0451 \u043E\u0431\u0449\u0435\u0435, \u0432\u0441\u0451 \u0432 \u043F\u0430\u0440\u0435. \u0410 \u0447\u0442\u043E \u043B\u0438\u0447\u043D\u043E \u0442\u0432\u043E\u0451, \u0447\u0442\u043E \u043E\u0441\u0442\u0430\u043D\u0435\u0442\u0441\u044F, \u0435\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0439\u0434\u0451\u0442 \u043D\u0435 \u0442\u0430\u043A \u2014 \u043E\u0431 \u044D\u0442\u043E\u043C \u0441\u0442\u0440\u0430\u0448\u043D\u043E \u0434\u0430\u0436\u0435 \u0434\u0443\u043C\u0430\u0442\u044C."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0410 \u043F\u0435\u043D\u0441\u0438\u044F? \u0410 \u0441\u0442\u0430\u0440\u043E\u0441\u0442\u044C?\xBB"
  }, "\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u2014 ", /*#__PURE__*/React.createElement("strong", null, "\u0430 \u043E\u043D\u0430 \u0442\u0435\u0431\u0435 \u0432\u043E\u043E\u0431\u0449\u0435 \u043A\u0430\u043F\u0430\u0435\u0442?"), " \u0427\u0442\u043E \u0441 AHV, 3a \u0438 BVG \u2014 \u0442\u0443\u043C\u0430\u043D, \u0438 \u043A\u0430\u0436\u0434\u044B\u0439 \u0443\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0439 \u0433\u043E\u0434 \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C.")))), /*#__PURE__*/React.createElement("section", {
    id: "couple"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0422\u043E\u043D\u043A\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("h2", null, "\xAB\u0424\u044E\u043D\u0444\u0446\u0438\u0433-\u0444\u044E\u043D\u0444\u0446\u0438\u0433\xBB \u2014 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0432\u0435\u0449\u0438, \u043E \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u0443\u0442 \u043C\u043E\u043B\u0447\u0430\u0442"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0412 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0430\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u2014 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0434\u0430\u0436\u0435 \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u0430\u0440\u044B. \u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0438\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u0437\u0434\u0435\u0441\u044C \u0441\u043A\u043E\u0440\u0435\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435. \u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E \u043D\u0435\u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u2014 \u044D\u0442\u043E \u043C\u0435\u043D\u0442\u0430\u043B\u0438\u0442\u0435\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0424\u044E\u043D\u0444\u0446\u0438\u0433-\u0444\u044E\u043D\u0444\u0446\u0438\u0433\xBB"
  }, "\u0420\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0447\u0435\u0442\u0430, \u0432\u0441\u0451 \u043F\u043E\u043F\u043E\u043B\u0430\u043C, \u0447\u0451\u0442\u043A\u0438\u0439 \u0443\u0447\u0451\u0442. \u0410 \u0438\u043D\u043E\u0433\u0434\u0430 \u0442\u044B \u0438 \u0441\u0430\u043C\u0430 \u0445\u043E\u0447\u0435\u0448\u044C \u0431\u044B\u0442\u044C \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0439 \u2014 \u043D\u043E \u043D\u0435 \u0437\u043D\u0430\u0435\u0448\u044C, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u041A\u0442\u043E \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u043E\u0441\u0438\u0442 \u0432 \u043E\u0431\u0449\u0438\u0439 \u043A\u043E\u0442\u0451\u043B?\xBB"
  }, "\u041F\u043E\u0440\u043E\u0432\u043D\u0443? \u041F\u043E \u0434\u043E\u0445\u043E\u0434\u0443? \u041A\u0430\u043A \u043F\u043E\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0447\u0435\u0441\u0442\u043D\u043E \u0432\u043A\u043B\u0430\u0434 \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438 \u0438 \u0432\u043A\u043B\u0430\u0434 \u0434\u043E\u043C\u043E\u043C \u0438 \u0434\u0435\u0442\u044C\u043C\u0438, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0442\u043E\u043C \u043D\u0435 \u0431\u044B\u043B\u043E \u043E\u0431\u0438\u0434."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\xAB\u0425\u043E\u0447\u0435\u0448\u044C \u2014 \u043C\u043E\u0433\u0443 \u043F\u043B\u0430\u0442\u0438\u0442\u044C\xBB \u2014 \u044D\u0442\u043E \u043D\u0435 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u0435"
  }, "\u0417\u0434\u0435\u0441\u044C \u043C\u043D\u043E\u0433\u043E\u0435 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0443 \u043D\u0430\u0441 \u043D\u0430 \u0441\u043B\u043E\u0432\u0430\u0445, \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u0441\u0443\u043C\u043C\u0430 \u0432 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0435. \u0416\u0435\u043B\u0430\u043D\u0438\u0435 \u2260 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F."), /*#__PURE__*/React.createElement(FAQItem, {
    variant: "hook",
    q: "\u0420\u0430\u0437\u0434\u0435\u043B 50/50 \u2014 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"
  }, "\u0411\u0435\u0437 \u0431\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \u0432\u0441\u0451 \u043D\u0430\u0436\u0438\u0442\u043E\u0435 \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043F\u043E\u0440\u043E\u0432\u043D\u0443. \u0414\u0435\u0442\u0430\u043B\u0438 (\u0447\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442, \u0447\u0442\u043E \u0441 3a) \u0437\u043D\u0430\u044E\u0442 \u0435\u0434\u0438\u043D\u0438\u0446\u044B.")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E \u0440\u0430\u0441\u0447\u0451\u0442 \u0432\u043C\u0435\u0441\u0442\u043E \u043B\u044E\u0431\u0432\u0438. \u042D\u0442\u043E \u043F\u0440\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0439 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440 \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u0432 \u043F\u0430\u0440\u0435"), " \u2014 \u043F\u043E\u043A\u0430 \u0432\u0441\u0451 \u0445\u043E\u0440\u043E\u0448\u043E. \u041D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0438\u0445\u043E \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0432 \u0431\u0430\u0437\u0435, \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u043D\u043E\u0441\u044F \u043D\u0430 \u043B\u044E\u0434\u0438."))), /*#__PURE__*/React.createElement("section", {
    id: "cost"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0426\u0435\u043D\u0430 \u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("h2", null, "\u041D\u0435 \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u0448\u044C\u0441\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u2014 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u0435\u0448\u0438\u0442 \u0437\u0430 \u0442\u0435\u0431\u044F"), /*#__PURE__*/React.createElement("div", {
    className: "statrow"
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "2 520",
    label: "CHF \u2014 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u043F\u0435\u043D\u0441\u0438\u0438 AHV \u0432 \u043C\u0435\u0441\u044F\u0446, \u0434\u0430\u0436\u0435 \u0437\u0430 44 \u0433\u043E\u0434\u0430 \u0441\u0442\u0430\u0436\u0430"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "134 000+",
    label: "\u043F\u0435\u043D\u0441\u0438\u043E\u043D\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0431\u0440\u0430\u043B\u0438\u0441\u044C \u0437\u0430 \u0433\u0440\u0430\u043D\u0438\u0446\u0443 \u2014 \u0442\u0430\u043C \u0442\u0435 \u0436\u0435 \u0444\u0440\u0430\u043D\u043A\u0438 \u0436\u0438\u0432\u0443\u0442 \u0434\u043E\u043B\u044C\u0448\u0435"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "+84%",
    label: "\u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0436\u0438\u0437\u043D\u044C \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0434\u043E\u0440\u043E\u0436\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u043E \u0415\u0421"
  })), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u043F\u0435\u043D\u0441\u0438\u044E \u0440\u0438\u0441\u043A\u043E\u0432\u0430\u043D\u043D\u043E: \u043C\u043D\u043E\u0433\u0438\u043C \u0435\u0451 \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442. \u0415\u0441\u043B\u0438 \u043C\u0435\u0441\u0442\u043D\u044B\u043C \u0441\u043E \u0441\u0442\u0430\u0436\u0435\u043C \u0432 44 \u0433\u043E\u0434\u0430 \u0431\u044B\u0432\u0430\u0435\u0442 \u043C\u0430\u043B\u043E \u2014 \u0441\u0442\u043E\u0438\u0442 \u0437\u0430\u0434\u0443\u043C\u0430\u0442\u044C\u0441\u044F \u0442\u0435\u043C, \u043A\u0442\u043E \u043D\u0430\u0447\u0430\u043B \u043F\u043B\u0430\u0442\u0438\u0442\u044C AHV \u0432 30, 35, 40. ", /*#__PURE__*/React.createElement("strong", null, "\u041E \u043F\u0435\u043D\u0441\u0438\u0438 \u043B\u0443\u0447\u0448\u0435 \u043F\u043E\u0434\u0443\u043C\u0430\u0442\u044C, \u043F\u043E\u043A\u0430 \u0435\u0449\u0451 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C.")))), /*#__PURE__*/React.createElement("section", {
    id: "divorce"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0414\u0435\u043B\u0438\u043A\u0430\u0442\u043D\u0430\u044F \u0442\u0435\u043C\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0410 \u0447\u0442\u043E \u0435\u0441\u043B\u0438\u2026 \u0440\u0430\u0437\u0432\u043E\u0434?"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0420\u0430\u0437\u0432\u043E\u0434. \u041D\u0435\u043F\u0440\u0438\u044F\u0442\u043D\u043E, \u043D\u0435 \u0445\u043E\u0447\u0435\u0442\u0441\u044F. \u041D\u043E \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u043E\u0447\u0442\u0438 4 \u0438\u0437 10 \u0431\u0440\u0430\u043A\u043E\u0432"), " \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0430\u043A \u2014 \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F \u0434\u043B\u044F \u0442\u043E\u0433\u043E, \u043A\u0442\u043E \u043C\u0435\u043D\u044C\u0448\u0435 \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u043B, \u0431\u044B\u0432\u0430\u044E\u0442 \u0442\u044F\u0436\u0451\u043B\u044B\u043C\u0438."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0427\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u044D\u0442\u043E \u0436\u0435\u043D\u0449\u0438\u043D\u0430. \u041F\u043E \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044E \u0411\u0435\u0440\u043D\u0441\u043A\u043E\u0433\u043E \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0430, \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0432\u043E\u0434\u0430 \u0436\u0435\u043D\u0449\u0438\u043D\u044B \u0442\u0435\u0440\u044F\u044E\u0442 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C ", /*#__PURE__*/React.createElement("strong", null, "\u043E\u043A\u043E\u043B\u043E 38% \u0434\u043E\u0445\u043E\u0434\u0430"), ". \u041D\u0435 \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u0437\u0430\u043A\u043E\u043D \u043D\u0435\u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432, \u0430 \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u0432 \u0431\u0440\u0430\u043A\u0435 \u043D\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u043B\u0438\u0441\u044C \u0437\u0430\u0440\u0430\u043D\u0435\u0435.")), /*#__PURE__*/React.createElement("div", {
    className: "statrow"
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "\u221238%",
    label: "\u0441\u0440\u0435\u0434\u043D\u044F\u044F \u043F\u043E\u0442\u0435\u0440\u044F \u0434\u043E\u0445\u043E\u0434\u0430 \u0443 \u0436\u0435\u043D\u0449\u0438\u043D\u044B \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0432\u043E\u0434\u0430"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "~40%",
    label: "\u0431\u0440\u0430\u043A\u043E\u0432 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0440\u0430\u0437\u0432\u043E\u0434\u043E\u043C"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "50/50",
    label: "\u0442\u0430\u043A \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043D\u0430\u0436\u0438\u0442\u043E\u0435 \u2014 \u0431\u0435\u0437 \u0431\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "relief"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0412\u044B\u0434\u043E\u0445\u043D\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438\u0439\u0442\u0438 \u0438 \u043F\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0422\u0435\u0431\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u043D\u0438 \u0432 \u0447\u0451\u043C \u043F\u0440\u0438\u0437\u043D\u0430\u0432\u0430\u0442\u044C\u0441\u044F, \u043D\u0438 \u043C\u0430\u043C\u0435, \u043D\u0438 \u043F\u043E\u0434\u0440\u0443\u0433\u0435, \u043D\u0438 \u044E\u0440\u0438\u0441\u0442\u0443. \u041C\u044B ", /*#__PURE__*/React.createElement("strong", null, "\u043D\u0435 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u0432\u043E\u0439 \u043B\u0438\u0447\u043D\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439 \u0441\u043E \u0441\u0446\u0435\u043D\u044B"), " \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0431\u043E\u043B\u044C \u0432\u0441\u043B\u0443\u0445. \u0422\u044B \u0437\u0430\u0431\u0438\u0440\u0430\u0435\u0448\u044C \u0431\u0430\u0437\u0443: \u043A\u0430\u043A \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E, \u0447\u0442\u043E \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0442 \u0431\u0440\u0430\u0447\u043D\u044B\u0439 \u0434\u043E\u0433\u043E\u0432\u043E\u0440, \u0447\u0442\u043E \u0441 3a \u0438 \u043F\u0435\u043D\u0441\u0438\u0435\u0439."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u042D\u0442\u043E \u0441\u043D\u0438\u043C\u0430\u0435\u0442 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0431\u0430\u0440\u044C\u0435\u0440"
  }, "\u041E \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u0435\u0449\u0430\u0445 \u0441\u0442\u0440\u0430\u0448\u043D\u043E \u0441\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0430\u0436\u0435 \u0441\u0430\u043C\u044B\u043C \u0431\u043B\u0438\u0437\u043A\u0438\u043C \u2014 \u043D\u0435 \u0442\u043E \u0447\u0442\u043E \u0447\u0443\u0436\u043E\u043C\u0443 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0443. \u0410 \u0437\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0431\u0430\u0437\u0443, ", /*#__PURE__*/React.createElement("strong", null, "\u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044F\u0441\u044C \u0432\u043E\u043E\u0431\u0449\u0435 \u043D\u0438\u043A\u043E\u043C\u0443."), " \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0442\u0438\u0445\u043E \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u2014 \u043F\u043E\u0442\u043E\u043C \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0448\u0430\u0433.")))), /*#__PURE__*/React.createElement("section", {
    id: "inspire"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0418 \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E \u0442\u0440\u0435\u0432\u043E\u0433\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u0410 \u0435\u0449\u0451 \u2014 \u043F\u0440\u043E \u0442\u043E, \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u043E-\u0434\u0440\u0443\u0433\u043E\u043C\u0443"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0414\u0435\u043D\u044C 1 \u2014 \u044D\u0442\u043E \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0437\u0431\u043E\u0440 \u0431\u043E\u043B\u0435\u0439. \u042D\u0442\u043E \u043F\u0440\u043E \u0442\u043E, \u0447\u0442\u043E \u0432\u044B\u0445\u043E\u0434 \u0435\u0441\u0442\u044C \u043F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435\u0433\u0434\u0430. \u0420\u044F\u0434\u043E\u043C \u2014 \u043B\u044E\u0434\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0438 \u0441 \u0442\u0435\u0445 \u0436\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432, \u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E \u0438\u043C\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Insp, {
    k: "\u041F\u043E\u0434\u0443\u0448\u043A\u0430 \u0441 \u043D\u0443\u043B\u044F",
    t: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043E\u043F\u043E\u0440\u0443"
  }, "\u041A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u043B\u044E\u0434\u0438 \u0441 \u043E\u0431\u044B\u0447\u043D\u043E\u0439 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u043E\u0439 \u0441\u043E\u0431\u0440\u0430\u043B\u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0443\u044E \u043F\u043E\u0434\u0443\u0448\u043A\u0443 \u0438 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0438 \u0431\u043E\u044F\u0442\u044C\u0441\u044F \u0437\u0430\u0432\u0442\u0440\u0430\u0448\u043D\u0435\u0433\u043E \u0434\u043D\u044F."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u041F\u0435\u0440\u0432\u044B\u0435 \u0448\u0430\u0433\u0438",
    t: "\u0421\u0432\u043E\u0438 \u0434\u0435\u043D\u044C\u0433\u0438"
  }, "\u041A\u0430\u043A \u043D\u0430\u0447\u0430\u0442\u044C \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E 100 \u0444\u0440\u0430\u043D\u043A\u043E\u0432 \u0438 \u0437\u0430\u0432\u0435\u0441\u0442\u0438 \u0442\u043E, \u0447\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F, \u0430 \u043D\u0435 \u043B\u0435\u0436\u0438\u0442 \u043C\u0451\u0440\u0442\u0432\u044B\u043C \u0433\u0440\u0443\u0437\u043E\u043C."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0421\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435",
    t: "\u0417\u0430\u0449\u0438\u0442\u0438\u0442\u044C \u0441\u0435\u0431\u044F"
  }, "\u041A\u0430\u043A \u0437\u0430\u0440\u0430\u043D\u0435\u0435 \u0440\u0430\u0437\u043B\u043E\u0436\u0438\u0442\u044C \u0434\u0435\u043D\u044C\u0433\u0438 \u0432 \u043F\u0430\u0440\u0435 \u0438 \u0432 \u0441\u0435\u043C\u044C\u0435 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u043B\u044E\u0431\u043E\u0439 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043D\u0435 \u0441\u0442\u0430\u043B \u043A\u0430\u0442\u0430\u0441\u0442\u0440\u043E\u0444\u043E\u0439.")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, /*#__PURE__*/React.createElement("strong", null, "\u0417\u043D\u0430\u0442\u044C \u0431\u0430\u0437\u0443 \u2014 \u0437\u043D\u0430\u0447\u0438\u0442 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C \u0442\u0440\u0435\u0432\u043E\u0436\u0438\u0442\u044C\u0441\u044F."), " \u0418\u043C\u0435\u043D\u043D\u043E \u0437\u0430 \u044D\u0442\u0438\u043C \u0438 \u0441\u0442\u043E\u0438\u0442 \u043F\u0440\u0438\u0439\u0442\u0438."))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0414\u0435\u043D\u044C 1 \xB7 Frankenplatz 2026"),
    title: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u0430\u0437\u0443 \u2014 \u0438 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C \u0442\u0435\u0440\u044F\u0442\u044C",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "index.html#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u042D\u0442\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0435\u0441\u0442\u044C \u043F\u043E\u0447\u0442\u0438 \u0443 \u0432\u0441\u0435\u0445 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043E \u043D\u0438\u0445 \u043C\u043E\u043B\u0447\u0430\u0442. \u041D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0438\u0445\u043E \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0438 \u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0432\u0435\u043A\u0442\u043E\u0440. \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0435\u0448\u0430\u0442\u044C \u0442\u0435\u0431\u0435.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "На главную",
      href: "index.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }));
}
window.Day1 = Day1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Day1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Day2.jsx
try { (() => {
/* Frankenplatz — Day 2 page. Recreates uploads/day2.html. Exposes window.Day2. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Card,
  ReliefBand
} = window.FrankenplatzDesignSystem_144b92;
const D2_NAV = [{
  label: "На главную",
  href: "index.html"
}, {
  label: "Программа",
  href: "index.html#program"
}, {
  label: "День 1",
  href: "day1.html"
}, {
  label: "Спикерам",
  href: "speakers.html"
}, {
  label: "Записаться",
  href: "index.html#reg",
  cta: true
}];
function Topic({
  badge,
  title,
  body,
  example
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "gold",
    className: "sp"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, body), /*#__PURE__*/React.createElement("div", {
    className: "ex"
  }, "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: ", /*#__PURE__*/React.createElement("b", null, example)));
}
function Insp({
  k,
  t,
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "gold",
    tone: "gold",
    className: "insp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, children));
}
function Day2() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: D2_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0414\u0435\u043D\u044C 2 \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \xB7 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 \u043C\u0438\u043A\u0441")), /*#__PURE__*/React.createElement("h1", null, "\u0414\u0435\u043D\u044C\u0433\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0438\u043B\u0438 \u0442\u044B \u043D\u0430 \u0434\u0435\u043D\u044C\u0433\u0438?")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0414\u0435\u043D\u044C 2 \u2014 \u0434\u043B\u044F \u0442\u0435\u0445, \u0443 \u043A\u043E\u0433\u043E \u0431\u0430\u0437\u0430 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u0417\u0434\u0435\u0441\u044C \u043D\u0435 \u043F\u0440\u043E \xAB\u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0430\u0442\u044C\xBB, \u0430 \u043F\u0440\u043E \xAB\u043A\u0443\u0434\u0430 \u0440\u0430\u0441\u0442\u0438\xBB."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u041F\u0435\u0440\u0432\u0430\u044F \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u2014 \u043F\u0440\u043E \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F, \u0432 \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432\u0441\u0435\u0440\u044C\u0451\u0437. \u0412\u0442\u043E\u0440\u0430\u044F \u2014 \u043F\u0440\u043E \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E: \u0440\u0435\u043C\u0435\u0441\u043B\u043E, \u0431\u0438\u0437\u043D\u0435\u0441, \u0440\u0438\u0441\u043A\u0438 \u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438."), /*#__PURE__*/React.createElement("p", {
    className: "tagline"
  }, "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438.", /*#__PURE__*/React.createElement("br", null), "\u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E.", /*#__PURE__*/React.createElement("br", null), "\u041D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "index.html#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement("section", {
    id: "invest"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0430\u0441\u0442\u044C 1 \xB7 \u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041A\u043E\u0433\u0434\u0430 \u0431\u0430\u0437\u0430 \u0435\u0441\u0442\u044C \u2014 \u0432\u0441\u0442\u0430\u0451\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \xAB\u043A\u0443\u0434\u0430 \u0440\u0430\u0441\u0442\u0438\xBB"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u0434\u0443\u0448\u043A\u0430 \u0441\u043E\u0431\u0440\u0430\u043D\u0430 \u0438 \u0441\u0442\u0440\u0430\u0445\u0438 \u043F\u043E\u0437\u0430\u0434\u0438, \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0434\u0440\u0443\u0433\u043E\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441: \u0432\u043E \u0447\u0442\u043E \u0432\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0442\u044C, \u043A\u0430\u043A \u0434\u0438\u0432\u0435\u0440\u0441\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0433\u0434\u0435 \u0434\u0435\u043D\u044C\u0433\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83C\uDFE0 \u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C",
    title: "\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0433\u0440\u0430\u043D\u0438\u0446",
    body: "\u041D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044F: \u0418\u0442\u0430\u043B\u0438\u044F, \u041A\u0438\u043F\u0440, \u0434\u0440\u0443\u0433\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u044B. \u0413\u0434\u0435 \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442 \u0434\u043B\u044F \u0436\u0438\u0437\u043D\u0438, \u0433\u0434\u0435 \u043F\u043E\u0434 \u0441\u0434\u0430\u0447\u0443, \u0433\u0434\u0435 \u043A\u0430\u043A \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044E.",
    example: "\xAB\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0432 \u0418\u0442\u0430\u043B\u0438\u0438 \u043F\u043E\u0434 \u0441\u0434\u0430\u0447\u0443: \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u0438\u043D\u043E\u0441\u0438\u0442 \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u043E\u0438\u0442 \u0432\u043B\u0430\u0434\u0435\u0442\u044C\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83D\uDC8E \u0422\u0432\u0451\u0440\u0434\u044B\u0435 \u0430\u043A\u0442\u0438\u0432\u044B",
    title: "\u0422\u043E, \u0447\u0442\u043E \u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C",
    body: "\u0417\u043E\u043B\u043E\u0442\u043E, \u044E\u0432\u0435\u043B\u0438\u0440\u043A\u0430, \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438. \u041A\u043E\u0433\u0434\u0430 \u044D\u0442\u043E \u0438\u043C\u0435\u0435\u0442 \u0441\u043C\u044B\u0441\u043B, \u0430 \u043A\u043E\u0433\u0434\u0430 \u2014 \u043A\u0440\u0430\u0441\u0438\u0432\u0430\u044F \u0438\u043B\u043B\u044E\u0437\u0438\u044F.",
    example: "\xAB\u042E\u0432\u0435\u043B\u0438\u0440\u043A\u0430 \u043A\u0430\u043A \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044F: \u0447\u0442\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u044C, \u0430 \u0447\u0442\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u043E\u0441\u0438\u0442\u044C\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83D\uDCCA \u041F\u043E\u0440\u0442\u0444\u0435\u043B\u044C",
    title: "\u041F\u043E\u0440\u0442\u0444\u0435\u043B\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F",
    body: "\u041D\u0435 \xAB\u043A\u0443\u043F\u0438 ETF\xBB, \u0430 \u043A\u0430\u043A \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443: \u0434\u0438\u0432\u0435\u0440\u0441\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F, \u0430\u043B\u043B\u043E\u043A\u0430\u0446\u0438\u044F, \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u044B.",
    example: "\xAB\u041A\u0430\u043A \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0451\u0442 \u043B\u044E\u0431\u043E\u0439 \u043A\u0440\u0438\u0437\u0438\u0441\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83D\uDD11 \u0414\u043E\u0445\u043E\u0434\u043D\u043E\u0441\u0442\u044C",
    title: "\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u0430\u043A \u0430\u043A\u0442\u0438\u0432",
    body: "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u044C \u043B\u0438 \u043F\u043E\u0434 \u0441\u0434\u0430\u0447\u0443 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438, \u043A\u0430\u043A \u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u0443\u044E \u0434\u043E\u0445\u043E\u0434\u043D\u043E\u0441\u0442\u044C \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043D\u0430\u043B\u043E\u0433\u043E\u0432 \u0438 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432.",
    example: "\xAB\u0421\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C: \u0447\u0442\u043E \u0432\u044B\u0433\u043E\u0434\u043D\u0435\u0435 \u0432 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u0438\u0445 \u0440\u0435\u0430\u043B\u0438\u044F\u0445\xBB"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "bridge",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u2014 \u044D\u0442\u043E \u043A\u043E\u0433\u0434\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0434\u0435\u043D\u044C\u0433\u0438"
  }, "\u0410 \u0431\u0438\u0437\u043D\u0435\u0441 \u2014 \u043A\u043E\u0433\u0434\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C \u0442\u044B, \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0434\u0435\u043D\u044C\u0433\u0438 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u0438\u0441\u0442\u0435\u043C\u0430. \u0412\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0434\u043D\u044F \u2014 \u043F\u0440\u043E \u0442\u043E, \u043A\u0430\u043A \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0432\u043B\u043E\u0436\u0438\u0442\u044C."))), /*#__PURE__*/React.createElement("section", {
    id: "business"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0430\u0441\u0442\u044C 2 \xB7 \u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0420\u0435\u043C\u0435\u0441\u043B\u043E, \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0432\u0441\u0451, \u043E \u0447\u0451\u043C \u043D\u0435 \u043F\u0438\u0448\u0443\u0442 \u0432 \u0433\u0430\u0439\u0434\u0430\u0445"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u044D\u0442\u043E \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E \xAB\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u0440\u043C\u0443\xBB. \u042D\u0442\u043E \u043F\u0440\u043E \u0440\u0430\u0437\u043D\u0438\u0446\u0443 \u043C\u0435\u0436\u0434\u0443 \u0440\u0435\u043C\u0435\u0441\u043B\u043E\u043C \u0438 \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C, \u043F\u0440\u043E \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442, \u0438 \u043F\u0440\u043E \u0440\u0438\u0441\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0437\u0430\u0440\u0430\u043D\u0435\u0435."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(Topic, {
    badge: "\u2699\uFE0F \u041E\u0441\u043D\u043E\u0432\u0430",
    title: "\u0420\u0435\u043C\u0435\u0441\u043B\u043E \u0438\u043B\u0438 \u0431\u0438\u0437\u043D\u0435\u0441?",
    body: "\u0412 \u0447\u0451\u043C \u0440\u0430\u0437\u043D\u0438\u0446\u0430 \u043C\u0435\u0436\u0434\u0443 \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u044B\u043C \u0438 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u0435\u043C \u2014 \u0438 \u043F\u043E\u0447\u0435\u043C\u0443 \u044D\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u0442 \u0432\u0441\u0451: \u043D\u0430\u043B\u043E\u0433\u0438, \u043C\u0430\u0441\u0448\u0442\u0430\u0431, \u0441\u0432\u043E\u0431\u043E\u0434\u0443 \u0438 \u043F\u043E\u0442\u043E\u043B\u043E\u043A \u0434\u043E\u0445\u043E\u0434\u0430.",
    example: "\xAB\u0421\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u044B\u0439 \u0438\u043B\u0438 GmbH: \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u0440\u0430 \u043C\u0435\u043D\u044F\u0442\u044C \u0444\u043E\u0440\u043C\u0443 \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E \u0441\u0442\u043E\u0438\u0442\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83E\uDDF0 \u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B",
    title: "\u0411\u0438\u0437\u043D\u0435\u0441-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438",
    body: "\u0427\u0442\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0437\u0434\u0435\u0441\u044C: \u043A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0430, \u043A\u0430\u043A\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442, \u0430 \u043A\u0430\u043A\u0438\u0435 \u0441\u044A\u0435\u0434\u0430\u044E\u0442 \u0432\u0440\u0435\u043C\u044F \u0438 \u0434\u0435\u043D\u044C\u0433\u0438.",
    example: "\xAB\u0427\u0442\u043E \u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u043B \u0432 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u043E\u0434 \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u2014 \u0438 \u0447\u0442\u043E \u043E\u043A\u0430\u0437\u0430\u043B\u043E\u0441\u044C \u043F\u0443\u0441\u0442\u043E\u0439 \u0442\u0440\u0430\u0442\u043E\u0439\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\u26A0\uFE0F \u0420\u0438\u0441\u043A\u0438",
    title: "\u041D\u0435\u043E\u0447\u0435\u0432\u0438\u0434\u043D\u044B\u0435 \u043F\u0440\u0438\u043A\u043E\u043B\u044E\u0445\u0438 \u0438 \u0440\u0438\u0441\u043A\u0438",
    body: "\u0422\u043E, \u043E \u0447\u0451\u043C \u043D\u0435 \u043F\u0438\u0448\u0443\u0442 \u0432 \u0433\u0430\u0439\u0434\u0430\u0445: \u043F\u043E\u0434\u0432\u043E\u0434\u043D\u044B\u0435 \u043A\u0430\u043C\u043D\u0438, \u043E\u0448\u0438\u0431\u043A\u0438 \u043D\u0430 \u0441\u0442\u0430\u0440\u0442\u0435, \u0440\u0438\u0441\u043A\u0438 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044F \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438.",
    example: "\xAB5 \u043E\u0448\u0438\u0431\u043E\u043A, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0447\u0443\u0442\u044C \u043D\u0435 \u0437\u0430\u043A\u0440\u044B\u043B\u0438 \u043C\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u043E\u0434\xBB"
  }), /*#__PURE__*/React.createElement(Topic, {
    badge: "\uD83D\uDCAC \u0416\u0438\u0432\u043E\u0439 \u043A\u0435\u0439\u0441",
    title: "\u041A\u0430\u043A \u044D\u0442\u043E \u0431\u044B\u043B\u043E \u043D\u0430 \u0441\u0430\u043C\u043E\u043C \u0434\u0435\u043B\u0435",
    body: "\u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u0431\u0435\u0437 \u0433\u043B\u044F\u043D\u0446\u0430: \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u0447\u0442\u043E \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u043E.",
    example: "\xAB\u041C\u043E\u0451 \u0434\u0435\u043B\u043E \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438: \u043F\u0443\u0442\u044C \u043E\u0442 \u0438\u0434\u0435\u0438 \u0434\u043E \u043F\u0435\u0440\u0432\u043E\u0439 \u043F\u0440\u0438\u0431\u044B\u043B\u0438\xBB"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "inspire2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0417\u0430\u0447\u0435\u043C \u0442\u0435\u0431\u0435 \u0441\u044E\u0434\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0427\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C, \u043A\u0443\u0434\u0430 \u043C\u043E\u0436\u043D\u043E \u0440\u0430\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0414\u0435\u043D\u044C 2 \u2014 \u044D\u0442\u043E \u043F\u0440\u043E \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442. \u041D\u0435 \xAB\u0432\u044B\u0436\u0438\u0442\u044C \u0438 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C\xBB, \u0430 \xAB\u0430 \u0447\u0442\u043E, \u0435\u0441\u043B\u0438 \u043F\u0440\u0438\u0443\u043C\u043D\u043E\u0436\u0438\u0442\u044C, \u0432\u043B\u043E\u0436\u0438\u0442\u044C, \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C?\xBB. \u0418\u043D\u043E\u0433\u0434\u0430 \u043E\u0434\u043D\u043E \u043D\u043E\u0432\u043E\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u043D\u044F\u0435\u0442 \u0432\u0441\u044E \u0442\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u044E."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Insp, {
    k: "\u0428\u0438\u0440\u0435",
    t: "\u041D\u043E\u0432\u044B\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"
  }, "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u043E \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u044B, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u0443\u043C\u0430\u043B \u2014 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E \u043C\u0438\u0440\u0443, \u0442\u0432\u0451\u0440\u0434\u044B\u0435 \u0430\u043A\u0442\u0438\u0432\u044B, \u0441\u0432\u043E\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0413\u043B\u0443\u0431\u0436\u0435",
    t: "\u0421\u0432\u043E\u0451 \u0434\u0435\u043B\u043E"
  }, "\u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u043A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u0438 \u0445\u0432\u0430\u0442\u0438\u0442 \u043B\u0438 \u044D\u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u0440\u0435\u0448\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0439."), /*#__PURE__*/React.createElement(Insp, {
    k: "\u0414\u0430\u043B\u044C\u0448\u0435",
    t: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442 \u043D\u0430 \u0433\u043E\u0434\u044B"
  }, "\u041D\u0435 \u043E\u0434\u043D\u0430 \u0438\u0434\u0435\u044F, \u0430 \u043A\u0430\u0440\u0442\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0435\u0439, \u043A \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F \u0438 \u0440\u0430\u0441\u0442\u0438 \u043F\u043E \u043D\u0435\u0439 \u043F\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E.")))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0414\u0435\u043D\u044C 2 \xB7 Frankenplatz 2026"),
    title: "\u0420\u0430\u0441\u0442\u0438 \u0434\u0430\u043B\u044C\u0448\u0435 \u2014 \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "index.html#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u0414\u0435\u043D\u044C 2 \u0434\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0433\u043E\u0442\u043E\u0432 \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C\u0443 \u0443\u0440\u043E\u0432\u043D\u044E. \u041E\u0441\u0442\u0430\u0432\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u2014 \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430, \u0446\u0435\u043D\u044B \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "На главную",
      href: "index.html"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }));
}
window.Day2 = Day2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Day2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Landing.jsx
try { (() => {
/* Frankenplatz — marketing UI kit: participant landing page.
   Recreates uploads/index.html using the design-system components.
   Exposes window.Landing. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Marquee,
  Card,
  StatCard,
  SpeakerCard,
  ReliefBand,
  ComparisonTable,
  FAQItem
} = window.FrankenplatzDesignSystem_144b92;
function DayCard({
  tag,
  title,
  sub,
  items,
  href,
  label
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "lila",
    className: "day"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, tag), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, sub), /*#__PURE__*/React.createElement("ul", null, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, it))), /*#__PURE__*/React.createElement("a", {
    className: "day__more",
    href: href
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    className: "day__arrow",
    "aria-hidden": "true"
  }, "\u2192")));
}
function SpeakerType({
  badge,
  title,
  body,
  example
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "gold",
    className: "sp"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, body), /*#__PURE__*/React.createElement("div", {
    className: "ex"
  }, "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: ", /*#__PURE__*/React.createElement("b", null, example)));
}
function CalcModal({
  calc,
  onClose
}) {
  if (!calc) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fp-modal-bg",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "x",
    onClick: onClose,
    "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      marginBottom: 8
    }
  }, calc.icon), /*#__PURE__*/React.createElement("h3", null, calc.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      fontSize: 15,
      margin: "0 0 4px"
    }
  }, calc.result), /*#__PURE__*/React.createElement("div", {
    className: "barwrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar",
    style: {
      width: calc.pct
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted-2)",
      fontSize: 13,
      margin: "0 0 20px"
    }
  }, "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438."), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    block: true,
    onClick: onClose
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043E\u0442\u0447\u0451\u0442")));
}
const CALCS = [{
  icon: "🧾",
  title: "Семейный бюджет",
  body: "Куда реально уходят деньги с поправкой на швейцарские реалии — Krankenkasse, налоги, аренда. Видно, где утечки.",
  result: "Твоя оценка утечек: заметная. В среднем можно откладывать больше.",
  pct: "62%"
}, {
  icon: "🏡",
  title: "Аренда или покупка",
  body: "Что выгоднее в твоей ситуации с учётом налогов и ставок. И оценка недвижимости как инвестиции под сдачу.",
  result: "В твоём сценарии аренда пока выгоднее покупки.",
  pct: "48%"
}, {
  icon: "👵",
  title: "Пенсия в Швейцарии",
  body: "Сколько ты реально получишь от AHV и BVG, что добавит 3a и какой будет дефицит. Особенно отрезвляет при позднем старте.",
  result: "Прогноз: заметный дефицит без 3a. Есть куда действовать.",
  pct: "40%"
}, {
  icon: "📈",
  title: "Зрелость бизнеса",
  body: "На каком этапе твой бизнес или идея и что мешает следующему уровню. Покажет точки роста.",
  result: "Стадия: ранний рост. Узкое место — систематизация.",
  pct: "55%"
}, {
  icon: "🧮",
  title: "Семейные налоги",
  body: "Где, сколько и почему ты платишь. Иногда взгляд в сторону другого кантона меняет картину.",
  result: "Есть неочевидный резерв по кантону и вычетам.",
  pct: "58%"
}];
function Landing() {
  const [calc, setCalc] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: [{
      label: "Программа",
      href: "#program"
    }, {
      label: "Спикеры",
      href: "#speakers"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }, {
      label: "Записаться",
      href: "#reg",
      cta: true
    }]
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cow",
    "aria-hidden": "true"
  }, "\uD83D\uDC2E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich \xB7 \u0444\u043E\u0440\u0443\u043C \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445")), /*#__PURE__*/React.createElement("h1", null, "\u0413\u0434\u0435 \u0434\u0435\u043D\u044C\u0433\u0438", /*#__PURE__*/React.createElement("br", null), "\u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u043A\u0430\u043A \u0438\u0445 \u043D\u0430\u0439\u0442\u0438 \u0438 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0422\u044B \u0436\u0438\u0432\u0451\u0448\u044C \u0432 \u043E\u0434\u043D\u043E\u0439 \u0438\u0437 \u0441\u0430\u043C\u044B\u0445 \u0431\u043E\u0433\u0430\u0442\u044B\u0445 \u0441\u0442\u0440\u0430\u043D \u043C\u0438\u0440\u0430 \u2014 \u0430 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u044F \u0431\u043E\u0433\u0430\u0442\u0441\u0442\u0432\u0430 \u043D\u0435\u0442?"), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0414\u0432\u0430 \u0434\u043D\u044F \u0441\u0440\u0435\u0434\u0438 \u0441\u0432\u043E\u0438\u0445, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043A\u043E\u043D\u0435\u0446 \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0432\u0441\u044E \u043A\u0430\u0440\u0442\u0443: \u043F\u0435\u043D\u0441\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438, \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0437\u0430\u0449\u0438\u0442\u0430 \u0441\u0435\u043C\u044C\u0438."), /*#__PURE__*/React.createElement("p", {
    className: "tagline"
  }, "\u0411\u0435\u0437 \u0432\u043E\u0434\u044B.", /*#__PURE__*/React.createElement("br", null), "\u041F\u043E \u0434\u0435\u043B\u0443.", /*#__PURE__*/React.createElement("br", null), "\u0421 \u044E\u043C\u043E\u0440\u043E\u043C."), /*#__PURE__*/React.createElement("p", {
    className: "micro"
  }, "\u041C\u044B \u043D\u0430 \xAB\u0442\u044B\xBB \u2014 \u0438 \u0441 \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438, \u0438 \u0441 \u0442\u043E\u0431\u043E\u0439.", /*#__PURE__*/React.createElement("br", null), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u0430: \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0438 \u0446\u0435\u043D\u044B \u043F\u0440\u0438\u0434\u0443\u0442 \u0442\u0435\u0431\u0435 \u043F\u0435\u0440\u0432\u044B\u043C\u0438."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#reg"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")))), /*#__PURE__*/React.createElement(Marquee, {
    items: ["Говорим открыто", "Делимся прожитым опытом", "Без воды", "По делу", "С юмором", "Только польза и инсайты", "Никаких продаж со сцены"]
  }), /*#__PURE__*/React.createElement("section", {
    id: "program"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430"), /*#__PURE__*/React.createElement("h2", null, "\u0414\u0432\u0430 \u0434\u043D\u044F \u2014 \u0434\u0432\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438"), /*#__PURE__*/React.createElement("div", {
    className: "grid g2"
  }, /*#__PURE__*/React.createElement(DayCard, {
    tag: "\u0414\u0435\u043D\u044C 1 \xB7 \u0434\u043B\u044F \u0432\u0441\u0435\u0445",
    title: "\u0413\u0434\u0435 \u0431\u0430\u0431\u043A\u0438 \u0438 \u043A\u0430\u043A \u0438\u0445 \u043D\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C",
    sub: "\u0411\u0430\u0437\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0441\u0442\u043E\u0438\u0442 \u043D\u0430\u0447\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u043E\u043C\u0443.",
    href: "day1.html",
    label: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043C\u044B \u0414\u043D\u044F 1",
    items: ["Пенсия: AHV / BVG / 3a — реальные цифры", "Базовые инвестиции: ETF, VIAC, Finpension", "Налоги, кантоны, оптимизация", "Страховки: Krankenkasse и другие", "Банки, ипотека, недвижимость", "Любовь и деньги: брак, развод, защита"]
  }), /*#__PURE__*/React.createElement(DayCard, {
    tag: "\u0414\u0435\u043D\u044C 2 \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C",
    title: "\u0414\u0435\u043D\u044C\u0433\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F",
    sub: "\u0414\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0445\u043E\u0447\u0435\u0442 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441.",
    href: "day2.html",
    label: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0435\u043C\u044B \u0414\u043D\u044F 2",
    items: ["Портфельное инвестирование в Швейцарии", "Недвижимость как актив", "Продвинутые стратегии 3a и BVG", "Альтернативы: крипто, P2P, REIT", "Как открыть бизнес — в т.ч. без вложений", "Масштабирование и налоговое планирование"]
  })))), /*#__PURE__*/React.createElement("section", {
    id: "value"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0442\u043E \u0442\u044B \u0443\u043D\u043E\u0441\u0438\u0448\u044C"), /*#__PURE__*/React.createElement("h2", null, "\u0417\u043D\u0430\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F", /*#__PURE__*/React.createElement("br", null), "\u0441 \u0442\u043E\u0431\u043E\u0439 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0417\u0430 \u0434\u0432\u0430 \u0434\u043D\u044F \u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0448\u044C \u0442\u043E, \u043D\u0430 \u0447\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0443\u0445\u043E\u0434\u044F\u0442 \u0433\u043E\u0434\u044B. Frankenplatz \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0432\u0441\u0451 \u0432 \u043E\u0434\u043D\u043E\u0439 \u0442\u043E\u0447\u043A\u0435 \u2014 \u0438 \u044D\u0442\u043E \u0437\u043D\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0441 \u0442\u043E\u0431\u043E\u0439 \u043D\u0430 \u0432\u0441\u044E \u0436\u0438\u0437\u043D\u044C."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "01",
    title: "\u041F\u043E\u043B\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432"
  }, "\u0412\u0441\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u0440\u0430\u0437\u0443 \u2014 \u043F\u0435\u043D\u0441\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438, \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0437\u0430\u0449\u0438\u0442\u0430 \u0441\u0435\u043C\u044C\u0438."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "02",
    title: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0442\u044B\u0441\u044F\u0447 \u0444\u0440\u0430\u043D\u043A\u043E\u0432"
  }, "\u041D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430\u0445 \u0441\u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043A\u043E\u0439, \u0438\u043F\u043E\u0442\u0435\u043A\u043E\u0439, \u043F\u0435\u043D\u0441\u0438\u043E\u043D\u043D\u043E\u0439 \u043A\u0430\u0441\u0441\u043E\u0439 \u0438 \u0443\u043F\u0443\u0449\u0435\u043D\u043D\u043E\u043C 3a."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "03",
    title: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
  }, "\u041D\u0435 \u0431\u043B\u0443\u0436\u0434\u0430\u0435\u0448\u044C \u0432 \u0447\u0443\u0436\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0432\u0441\u043B\u0435\u043F\u0443\u044E \u2014 \u0441\u0440\u0430\u0437\u0443 \u0432\u0438\u0434\u0438\u0448\u044C, \u0447\u0442\u043E \u0432\u0430\u0436\u043D\u043E \u043B\u0438\u0447\u043D\u043E \u0442\u0435\u0431\u0435."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "04",
    title: "\u041D\u0435 \u043E\u0434\u043D\u0430 \u0438\u0434\u0435\u044F, \u0430 \u043A\u043E\u043F\u0438\u043B\u043A\u0430"
  }, "\u0423\u0445\u043E\u0434\u0438\u0448\u044C \u0441 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u043C\u0438 \u043A\u0435\u0439\u0441\u0430\u043C\u0438 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438 \u043D\u0430 \u0433\u043E\u0434 \u0432\u043F\u0435\u0440\u0451\u0434."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "05",
    title: "\u041D\u0443\u0436\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  }, "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043C\u0435\u043D\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432, \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u2014 \u043A \u043A\u043E\u043C\u0443 \u0438\u0434\u0442\u0438 \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "06",
    title: "\u0421\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435"
  }, "\u041F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0448\u044C \u0442\u043E, \u0447\u0442\u043E \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043E, \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0448\u044C \u0442\u043E, \u0447\u0442\u043E \u0435\u0441\u0442\u044C.")))), /*#__PURE__*/React.createElement("section", {
    id: "speakers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0432\u044B\u0439\u0434\u0435\u0442 \u043D\u0430 \u0441\u0446\u0435\u043D\u0443"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043F\u0438\u043A\u0435\u0440\u044B \u0441 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u043C \u043E\u043F\u044B\u0442\u043E\u043C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, /*#__PURE__*/React.createElement("strong", null, "\u041D\u0435 \u0432\u0435\u0440\u044C \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C."), " \u041C\u044B \u0437\u043E\u0432\u0451\u043C \u043D\u0435 \u043F\u043E \u0433\u0440\u043E\u043C\u043A\u0438\u043C \u0440\u0435\u0433\u0430\u043B\u0438\u044F\u043C, \u0430 \u043F\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443. \u0427\u0435\u0442\u044B\u0440\u0435 \u0442\u0438\u043F\u0430 \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0442\u044B \u0443\u0441\u043B\u044B\u0448\u0438\u0448\u044C:"), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(SpeakerType, {
    badge: "\uD83C\uDFAF \u041F\u0440\u0430\u043A\u0442\u0438\u043A",
    title: "\u0422\u043E\u0442, \u0443 \u043A\u043E\u0433\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C",
    body: "\u0421\u0432\u043E\u0439 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C, \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E\u0434 \u0441\u0434\u0430\u0447\u0443, \u043F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434. \u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u0442 \u043D\u0435 \u0442\u0435\u043E\u0440\u0438\u044E, \u0430 \u043A\u0430\u043A \u044D\u0442\u043E \u0431\u044B\u043B\u043E \u043D\u0430 \u0434\u0435\u043B\u0435.",
    example: "\xAB\u041A\u0430\u043A \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C ETF \u0441 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B \u0432 6k \u0438 \u0432\u044B\u0439\u0442\u0438 \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u043F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    badge: "\uD83D\uDCDC \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442",
    title: "\u0422\u043E\u0442, \u043A\u0442\u043E \u0437\u043D\u0430\u0435\u0442 \u0441\u0438\u0441\u0442\u0435\u043C\u0443",
    body: "\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B \u0432 \u0441\u0432\u043E\u0435\u0439 \u0442\u0435\u043C\u0435 \u2014 \u043F\u0435\u043D\u0441\u0438\u0438, \u043D\u0430\u043B\u043E\u0433\u0438, \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435, \u043F\u0440\u0430\u0432\u043E \u2014 \u0441 \u043E\u043F\u044B\u0442\u043E\u043C \u0440\u0430\u0431\u043E\u0442\u044B \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438.",
    example: "\xAB3a, BVG \u0438 \u0432\u044B\u043A\u0443\u043F \u043F\u0435\u043D\u0441\u0438\u0438: \u043A\u0430\u043A \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u043E \u043F\u043B\u0430\u0442\u0438\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u043D\u0430\u043B\u043E\u0433\u043E\u0432 \u0443\u0436\u0435 \u0432 \u044D\u0442\u043E\u043C \u0433\u043E\u0434\u0443\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    badge: "\uD83D\uDC94 \u041B\u0438\u0447\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F",
    title: "\u0422\u043E\u0442, \u0443 \u043A\u043E\u0433\u043E \u044D\u0442\u043E \u0443\u0436\u0435 \u043F\u043E\u0437\u0430\u0434\u0438",
    body: "\u041E\u0431\u044B\u0447\u043D\u044B\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A, \u043F\u0440\u043E\u0448\u0435\u0434\u0448\u0438\u0439 \u0447\u0435\u0440\u0435\u0437 \u0440\u0430\u0437\u0432\u043E\u0434, \u043F\u0435\u0440\u0435\u0435\u0437\u0434 \u0441 \u043D\u0443\u043B\u044F, \u043F\u0435\u0440\u0432\u044B\u0439 \u0431\u0438\u0437\u043D\u0435\u0441. \u0427\u0435\u0441\u0442\u043D\u043E \u2014 \u0447\u0442\u043E \u043F\u043E\u043C\u043E\u0433\u043B\u043E, \u0430 \u0447\u0442\u043E \u043D\u0435\u0442.",
    example: "\xAB\u0420\u0430\u0437\u0432\u043E\u0434 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438: \u0447\u0442\u043E \u044F \u0437\u043D\u0430\u044E \u0442\u0435\u043F\u0435\u0440\u044C \u0438 \u043E \u0447\u0451\u043C \u0436\u0430\u043B\u0435\u044E, \u0447\u0442\u043E \u043D\u0435 \u0443\u0437\u043D\u0430\u043B\u0430 \u0440\u0430\u043D\u044C\u0448\u0435\xBB"
  }), /*#__PURE__*/React.createElement(SpeakerType, {
    badge: "\u2728 \u0412\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u0435",
    title: "\u0418\u0441\u0442\u043E\u0440\u0438\u0438, \u043F\u043E\u0441\u043B\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0445\u043E\u0447\u0435\u0442\u0441\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C",
    body: "\u0411\u0435\u0437 \u044F\u0437\u044B\u043A\u0430, \u0431\u0435\u0437 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0430, \u0431\u0435\u0437 \u0441\u0432\u044F\u0437\u0435\u0439 \u2014 \u0430 \u0432 \u0438\u0442\u043E\u0433\u0435 \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441, \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u044C, \u043D\u043E\u0432\u0430\u044F \u0436\u0438\u0437\u043D\u044C.",
    example: "\xAB\u041A\u0430\u043A \u0438\u0437 \u0445\u043E\u0431\u0431\u0438 \u0432\u044B\u0440\u043E\u0441 \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438 \u2014 \u0431\u0435\u0437 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0439\xBB"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u0416\u0451\u0441\u0442\u043A\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0434\u043B\u044F \u0432\u0441\u0435\u0445, \u043A\u0442\u043E \u043D\u0430 \u0441\u0446\u0435\u043D\u0435"
  }, "\u0422\u043E\u043B\u044C\u043A\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \xAB\u0431\u0435\u0440\u0438 \u0438 \u0434\u0435\u043B\u0430\u0439\xBB"), ": \u0441\u043C\u043E\u0442\u0440\u0438 \u0441\u044E\u0434\u0430, \u043F\u043E\u0442\u043E\u043C \u0441\u044E\u0434\u0430, \u0432\u043E\u0442 \u0446\u0438\u0444\u0440\u0430, \u0432\u043E\u0442 \u0448\u0430\u0433. ", /*#__PURE__*/React.createElement("strong", null, "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043E \u0441\u0446\u0435\u043D\u044B"), " \u2014 \u043D\u0438 \u043A\u0443\u0440\u0441\u043E\u0432, \u043D\u0438 \u043C\u0430\u0440\u0430\u0444\u043E\u043D\u043E\u0432. \u0422\u044B \u0443\u0445\u043E\u0434\u0438\u0448\u044C \u043D\u0435 \u0441 \u043E\u0434\u043D\u043E\u0439 \u0438\u0434\u0435\u0435\u0439, \u0430 \u0441 \u043A\u043E\u043F\u0438\u043B\u043A\u043E\u0439.")))), /*#__PURE__*/React.createElement("section", {
    id: "findnot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0435\u0441\u0442\u043D\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0427\u0442\u043E \u0442\u0435\u0431\u044F \u0436\u0434\u0451\u0442 \u2014 \u0438 \u0447\u0435\u0433\u043E \u0442\u043E\u0447\u043D\u043E", /*#__PURE__*/React.createElement("br", null), "\u043D\u0435 \u0431\u0443\u0434\u0435\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(ComparisonTable, {
    rows: [{
      yes: "Обращение на «ты» — по-дружески, без дистанции",
      no: "Официоза и обращения «на вы»"
    }, {
      yes: "Конкретные цифры: лимиты, налоги, ставки",
      no: "«Секретов богатых» и обещаний миллиона"
    }, {
      yes: "Реальные истории людей, которые уже прошли путь",
      no: "Воды и пустых разговоров «ни о чём»"
    }, {
      yes: "Несколько спикеров на тему — разные пути",
      no: "Одного «единственно верного» мнения сверху"
    }, {
      yes: "Швейцарская конкретика: 3a, AHV, BVG, кантоны",
      no: "Общих советов «как у всех», не про Швейцарию"
    }, {
      yes: "Сообщество, которое остаётся с тобой после",
      no: "«Послушал и забыл» — разового ивента"
    }]
  })))), /*#__PURE__*/React.createElement("section", {
    id: "calc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041C\u043E\u0436\u043D\u043E \u043D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441"), /*#__PURE__*/React.createElement("h2", null, "5 \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u043E\u0432 \u2014 \u0443\u0436\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041D\u0435 \u0436\u0434\u0438 \u0444\u043E\u0440\u0443\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043D\u044F\u0442\u044C, \u0433\u0434\u0435 \u0442\u044B \u0441\u0435\u0439\u0447\u0430\u0441. \u041F\u0440\u043E\u0439\u0434\u0438 \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0437\u0430 \u043F\u0430\u0440\u0443 \u043C\u0438\u043D\u0443\u0442. ", /*#__PURE__*/React.createElement("strong", null, "\u0420\u0430\u0437\u0432\u0451\u0440\u043D\u0443\u0442\u044B\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.")), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, CALCS.map((c, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    fill: "lila",
    tone: "lila",
    icon: c.icon,
    title: c.title,
    free: /*#__PURE__*/React.createElement(Badge, {
      variant: "green"
    }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E")
  }, c.body, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setCalc(c)
  }, "\u041F\u0440\u043E\u0439\u0442\u0438 \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "calcnote"
  }, "\uD83D\uDD13 \u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044B \u0443\u0436\u0435 \u0441\u0435\u0439\u0447\u0430\u0441. \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0447\u0451\u0442 + \u0440\u0430\u0437\u0431\u043E\u0440 \u043D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 \u2014 \u043F\u043E\u0441\u043B\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438."))), /*#__PURE__*/React.createElement("section", {
    id: "svoi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u0432\u043E\u0438 \u043B\u044E\u0434\u0438 \u2014 \u044D\u0442\u043E \u043F\u0440\u0430\u0432\u0434\u0430 \xAB\u0441\u0432\u043E\u0438\xBB"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\xAB\u0421\u0432\u043E\u0438\xBB \u0437\u0434\u0435\u0441\u044C \u2014 \u043D\u0435 \u0444\u0438\u0433\u0443\u0440\u0430 \u0440\u0435\u0447\u0438. \u042D\u0442\u043E \u043B\u044E\u0434\u0438 \u0441 ", /*#__PURE__*/React.createElement("strong", null, "\u043E\u0434\u043D\u0438\u043C \u043C\u0435\u043D\u0442\u0430\u043B\u0438\u0442\u0435\u0442\u043E\u043C, \u043E\u0434\u043D\u0438\u043C \u044F\u0437\u044B\u043A\u043E\u043C \u0438 \u043E\u0431\u0449\u0438\u043C \u0431\u044D\u043A\u0433\u0440\u0430\u0443\u043D\u0434\u043E\u043C \u044D\u043C\u0438\u0433\u0440\u0430\u043D\u0442\u0430"), "."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "01",
    title: "\u041E\u0434\u0438\u043D \u044F\u0437\u044B\u043A"
  }, "\u041F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438 \u0438 \u043F\u043E-\u0447\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u043A\u0438, \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u0438\u0445 \u0442\u0435\u0440\u043C\u0438\u043D\u043E\u0432 \u0432 \u0433\u043E\u043B\u043E\u0432\u0435."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "02",
    title: "\u041E\u0434\u0438\u043D \u043F\u0443\u0442\u044C"
  }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0448\u043B\u0438 \u043E\u0434\u043D\u0443 \u0434\u043E\u0440\u043E\u0433\u0443 \u044D\u043C\u0438\u0433\u0440\u0430\u043D\u0442\u0430 \u2014 \u043F\u043E\u043D\u0438\u043C\u0430\u044E\u0442 \u0441 \u043F\u043E\u043B\u0443\u0441\u043B\u043E\u0432\u0430."), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    num: "03",
    title: "\u041E\u0434\u043D\u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438"
  }, "\u0417\u0434\u0435\u0441\u044C \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043E\u043F\u044B\u0442\u043E\u043C, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u044E\u0442 \u043A\u0443\u0440\u0441\u044B. \u0418 \u043E\u0431\u0449\u0430\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u0440\u0443\u043C\u0430.")))), /*#__PURE__*/React.createElement("section", {
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0410 \u0447\u0442\u043E \u0435\u0441\u043B\u0438\u2026"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043E\u043C\u043D\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0443 \u0442\u0435\u0431\u044F \u0441\u0435\u0439\u0447\u0430\u0441 \u0432 \u0433\u043E\u043B\u043E\u0432\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: "1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u042F \u0441\u043E\u0432\u0441\u0435\u043C \u043D\u0435 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u044E\u0441\u044C \u0432 \u0444\u0438\u043D\u0430\u043D\u0441\u0430\u0445\xBB"
  }, "\u0412 \u044D\u0442\u043E\u043C \u0438 \u0441\u043C\u044B\u0441\u043B. \u041C\u044B \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u043C \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C, \u0441 \u043D\u0443\u043B\u044F. \u0415\u0441\u043B\u0438 \u043A\u043E\u0440\u043E\u0432\u0430 \u0432 \u0448\u0443\u0431\u0435 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u043B\u0430\u0441\u044C \u2014 \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u0448\u044C\u0441\u044F \u0438 \u0442\u044B."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u042D\u0442\u043E \u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u043A\u0443\u0440\u0441, \u0433\u0434\u0435 \u0431\u0443\u0434\u0443\u0442 \u0447\u0442\u043E-\u0442\u043E \u0432\u043F\u0430\u0440\u0438\u0432\u0430\u0442\u044C\xBB"
  }, "\u041D\u0435\u0442. \u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \xAB\u0431\u0435\u0440\u0438 \u0438 \u0434\u0435\u043B\u0430\u0439\xBB. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043E \u0441\u0446\u0435\u043D\u044B \u2014 \u043D\u0438 \u043A\u0443\u0440\u0441\u043E\u0432, \u043D\u0438 \u043C\u0430\u0440\u0430\u0444\u043E\u043D\u043E\u0432, \u043D\u0438 \xAB\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\xBB."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u0423 \u043C\u0435\u043D\u044F \u043D\u0435\u0442 \u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u0434\u0435\u043D\u0435\u0433, \u043C\u043D\u0435 \u0440\u0430\u043D\u043E\xBB"
  }, "\u0424\u043E\u0440\u0443\u043C \u043F\u0440\u043E \u0442\u043E, \u043A\u0430\u043A \u0440\u0430\u0437\u0443\u043C\u043D\u043E \u0440\u0430\u0441\u043F\u043E\u0440\u044F\u0434\u0438\u0442\u044C\u0441\u044F \u0442\u0435\u043C, \u0447\u0442\u043E \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u041D\u0430\u0447\u0430\u0442\u044C \u043C\u043E\u0436\u043D\u043E \u0441\u043E 100 \u0444\u0440\u0430\u043D\u043A\u043E\u0432."), /*#__PURE__*/React.createElement(FAQItem, {
    q: "\xAB\u041C\u043D\u0435 \u043D\u0435\u043B\u043E\u0432\u043A\u043E \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0442\u044C \u043B\u0438\u0447\u043D\u043E\u0435\xBB"
  }, "\u0418 \u043D\u0435 \u043D\u0430\u0434\u043E. \u0422\u044B \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u043B\u0443\u0448\u0430\u0435\u0448\u044C. \u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u0441\u043F\u0440\u043E\u0441\u0438\u0442 \u043F\u0440\u043E \u0442\u0432\u043E\u044E \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044E.")))), /*#__PURE__*/React.createElement("section", {
    id: "reg",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich"),
    title: "\u041F\u0440\u0438\u0445\u043E\u0434\u0438 \u0441\u0442\u0430\u0442\u044C \u0431\u043E\u0433\u0430\u0447\u0435",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "#reg"
    }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u0417\u043D\u0430\u0442\u044C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u2014 \u044D\u0442\u043E \u0443\u0436\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0443\u0441\u043F\u0435\u0445\u0430. \u041E\u0441\u0442\u0430\u0432\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u0441\u0435\u0439\u0447\u0430\u0441 \u2014 \u0432\u043E\u0439\u0434\u0451\u0448\u044C \u0432 \u0440\u0430\u043D\u043D\u044E\u044E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E. \u041F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430, \u0446\u0435\u043D\u044B \u0438 \u043F\u043E\u043B\u043D\u044B\u0435 \u043E\u0442\u0447\u0451\u0442\u044B \u043F\u043E \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u0430\u043C.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }, {
      label: "Спикерам",
      href: "speakers.html"
    }]
  }), /*#__PURE__*/React.createElement(CalcModal, {
    calc: calc,
    onClose: () => setCalc(null)
  }));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Speakers.jsx
try { (() => {
/* Frankenplatz — Speakers recruitment page. Recreates uploads/speakers.html.
   Exposes window.Speakers. */
const {
  TopBar,
  Footer,
  Button,
  Badge,
  Eyebrow,
  Card,
  SpeakerCard,
  ReliefBand
} = window.FrankenplatzDesignSystem_144b92;
const SP_NAV = [{
  label: "Для участников",
  href: "index.html"
}, {
  label: "Что даём",
  href: "#how"
}, {
  label: "Два дня",
  href: "#days"
}, {
  label: "Кто уже с нами",
  href: "#confirmed"
}, {
  label: "Подать заявку",
  href: "#apply",
  cta: true
}];
function Perk({
  badge,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    fill: "glass",
    tone: "gold",
    className: "sp"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, children));
}
function Speakers() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fp-backdrop"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fp-glow fp-glow--amber"
  }), /*#__PURE__*/React.createElement(TopBar, {
    links: SP_NAV
  }), /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "lila",
    dot: true
  }, "\u0421\u043F\u0438\u043A\u0435\u0440\u0430\u043C \xB7 Frankenplatz 2026")), /*#__PURE__*/React.createElement("h1", null, "\u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C ", /*#__PURE__*/React.createElement("span", {
    className: "hl"
  }, "\u0441\u0430\u043C\u044B\u0439 \u0431\u043E\u043B\u044C\u0448\u043E\u0439"), " \u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0439 \u0444\u043E\u0440\u0443\u043C \u043E \u0434\u0435\u043D\u044C\u0433\u0430\u0445 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u0418 \u0437\u043E\u0432\u0451\u043C \u0442\u0435\u0431\u044F \u043D\u0430 \u0441\u0446\u0435\u043D\u0443."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0417\u0430\u043B \u043D\u0430 500 \u0447\u0435\u043B\u043E\u0432\u0435\u043A. \u0422\u0432\u043E\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F. \u0422\u0430\u043A\u043E\u0433\u043E \u0437\u0434\u0435\u0441\u044C \u0435\u0449\u0451 \u043D\u0435 \u0431\u044B\u043B\u043E \u2014 \u0438 \u0442\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u043E\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u0441\u0440\u0435\u0434\u0438 \u0442\u0435\u0445, \u043A\u043E\u0433\u043E \u0437\u0430\u043F\u043E\u043C\u043D\u044F\u0442."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "\u0415\u0441\u043B\u0438 \u0442\u044B \u0432\u0438\u0434\u0438\u0448\u044C \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u2014 \u043C\u044B \u0443\u0436\u0435 online-\u0437\u043D\u0430\u043A\u043E\u043C\u044B, \u0438 \u043D\u0430\u043C \u043A\u0430\u0436\u0435\u0442\u0441\u044F, \u0447\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u043C\u043E\u0436\u0435\u0442 \u0441\u0442\u0430\u0442\u044C \u043E\u0434\u043D\u043E\u0439 \u0438\u0437 \u0441\u0430\u043C\u044B\u0445 \u0441\u0438\u043B\u044C\u043D\u044B\u0445 \u043D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    href: "#apply"
  }, "\u0425\u043E\u0447\u0443 \u0432\u044B\u0441\u0442\u0443\u043F\u0438\u0442\u044C")))), /*#__PURE__*/React.createElement("section", {
    id: "mission"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0417\u0430\u0447\u0435\u043C \u0432\u0441\u0451 \u044D\u0442\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0412 \u043A\u0440\u0430\u0441\u0438\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0435 \u2014 \u043A\u0440\u0430\u0441\u0438\u0432\u043E \u0436\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041A\u0440\u0430\u0441\u0438\u0432\u043E \u0436\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0434\u0435\u043D\u0435\u0433 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u2014 \u0438 \u043A\u043E\u0433\u0434\u0430 \u043D\u0435\u0442 \u0442\u0435\u0445 \u0441\u0430\u043C\u044B\u0445 \u0441\u0442\u0440\u0430\u0445\u043E\u0432 \u043F\u0440\u043E \u043D\u0438\u0445. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0443 Frankenplatz \u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043C\u0438\u0441\u0441\u0438\u044F: \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0441\u0432\u0435\u0449\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0445 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u041D\u0435 \xAB\u0443\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u0443\u0441\u043F\u0435\u0445\xBB, \u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0427\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u0432 \u0437\u0430\u043B\u0435 \u2014 \u0436\u0435\u043D\u0449\u0438\u043D\u044B. \u041D\u043E \u043D\u0435 \u0432\u0441\u0435\u0433\u0434\u0430: \u043A\u043E\u0433\u0434\u0430 \u044F \u0434\u0435\u043B\u0430\u043B\u0430 \u0432\u0435\u0447\u0435\u0440 \u043F\u0440\u043E \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u0432 \u0441\u0432\u043E\u0435\u0439 \u0433\u0430\u043B\u0435\u0440\u0435\u0435, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0431\u044B\u043B\u0430 \u0440\u043E\u0432\u043D\u043E 50 \u043D\u0430 50. \u0422\u0430\u043A \u0447\u0442\u043E \u0437\u0430\u043B \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0447\u0435\u043D\u044C \u0440\u0430\u0437\u043D\u044B\u043C \u2014 \u0438 \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u043D\u0430\u0439\u0434\u0451\u0442 \u0441\u0432\u043E\u0438\u0445."))), /*#__PURE__*/React.createElement("section", {
    id: "organizer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0437\u0430 \u044D\u0442\u0438\u043C \u0441\u0442\u043E\u0438\u0442"), /*#__PURE__*/React.createElement("h2", null, "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440 \u2014 \u041A\u0441\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u042F \u043D\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u043E\u0434 \u0441\u043E\u0431\u0438\u0440\u0430\u044E \u043B\u044E\u0434\u0435\u0439 \u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041E\u0434\u0438\u043D \u0438\u0437 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u043A\u0435\u0439\u0441\u043E\u0432 \u2014 ", /*#__PURE__*/React.createElement("strong", null, "MotoZurich \u0432 \u0444\u0435\u0432\u0440\u0430\u043B\u0435 2026 \u0433\u043E\u0434\u0430: \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435 \u043D\u0430 22 000 \u0447\u0435\u043B\u043E\u0432\u0435\u043A"), ". Frankenplatz \u0441\u043E\u0431\u0438\u0440\u0430\u044E \u0441 \u0442\u0435\u043C \u0436\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u043C: \u0441\u0435\u0440\u044C\u0451\u0437\u043D\u043E, \u043F\u043E \u0434\u0435\u043B\u0443, \u0434\u043E \u043C\u0435\u043B\u043E\u0447\u0435\u0439."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u041F\u043E\u0447\u0435\u043C\u0443 \u044D\u0442\u043E \u0432\u0430\u0436\u043D\u043E \u0434\u043B\u044F \u0442\u0435\u0431\u044F \u043A\u0430\u043A \u0441\u043F\u0438\u043A\u0435\u0440\u0430"
  }, "\u0417\u0430 \u0444\u043E\u0440\u0443\u043C\u043E\u043C \u0441\u0442\u043E\u0438\u0442 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0441 \u043E\u043F\u044B\u0442\u043E\u043C \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439, \u0430 \u043D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u044D\u043D\u0442\u0443\u0437\u0438\u0430\u0437\u043C. \u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D, \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u2014 \u0432\u0441\u0451 \u0431\u0443\u0434\u0435\u0442 \u0441\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435. \u0422\u044B \u0432\u044B\u0445\u043E\u0434\u0438\u0448\u044C \u043D\u0430 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0441\u0446\u0435\u043D\u0443 \u0438 \u043A \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.")))), /*#__PURE__*/React.createElement("section", {
    id: "money"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0421\u0440\u0430\u0437\u0443 \u0447\u0435\u0441\u0442\u043D\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u0421\u043F\u0438\u043A\u0435\u0440\u044B \u043D\u0435 \u043F\u043B\u0430\u0442\u044F\u0442 \u043D\u0430\u043C. \u0418 \u043C\u044B \u043D\u0435 \u043F\u043B\u0430\u0442\u0438\u043C \u0441\u043F\u0438\u043A\u0435\u0440\u0430\u043C \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u0435\u0439\u0447\u0430\u0441 \u043C\u043E\u0434\u043D\u043E, \u0447\u0442\u043E \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043B\u0430\u0442\u0438\u0442 \u0437\u0430 \u0432\u044B\u0445\u043E\u0434 \u043D\u0430 \u0441\u0446\u0435\u043D\u0443. \u0423 \u043D\u0430\u0441 \u0442\u0430\u043A\u043E\u0433\u043E \u043D\u0435\u0442 \u2014 \u0438 \u0433\u043E\u043D\u043E\u0440\u0430\u0440\u043E\u0432 \u043C\u044B \u0442\u043E\u0436\u0435 \u043D\u0435 \u043F\u043B\u0430\u0442\u0438\u043C. \u0417\u0430\u0442\u043E \u043C\u044B \u0434\u0430\u0451\u043C \u0442\u043E, \u0447\u0442\u043E \u0434\u0435\u043D\u044C\u0433\u0430\u043C\u0438 \u043D\u0435 \u043A\u0443\u043F\u0438\u0448\u044C: \u0441\u0446\u0435\u043D\u0443 \u043F\u0435\u0440\u0435\u0434 \u0441\u043E\u0442\u043D\u044F\u043C\u0438 \u0442\u0432\u043E\u0438\u0445 \u043B\u044E\u0434\u0435\u0439, \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043F\u0440\u043E\u043A\u0430\u0447\u043A\u0443 \u0438 \u043C\u0435\u0441\u0442\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435."))), /*#__PURE__*/React.createElement("section", {
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0427\u0442\u043E \u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0448\u044C"), /*#__PURE__*/React.createElement("h2", null, "\u041D\u0435 \u0433\u043E\u043D\u043E\u0440\u0430\u0440 \u2014 \u0430 \u0432\u0441\u0451, \u0447\u0442\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u0432\u0438\u0433\u0430\u0435\u0442 \u0432\u043F\u0435\u0440\u0451\u0434"), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83C\uDFA5 \u041A\u043E\u043D\u0442\u0435\u043D\u0442",
    title: "\u0424\u043E\u0442\u043E \u0438 \u0432\u0438\u0434\u0435\u043E, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043D\u0430 \u0442\u0435\u0431\u044F \u0433\u043E\u0434\u0430\u043C\u0438"
  }, "\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u044A\u0451\u043C\u043A\u0430 \u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0444\u043E\u0442\u043E\u0441\u0435\u0441\u0441\u0438\u044F \u0434\u043B\u044F \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432. \u0413\u043E\u0442\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439, \u0441\u0430\u0439\u0442\u0430 \u0438 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDC87 \u041E\u0431\u0440\u0430\u0437",
    title: "\u0421\u0442\u0438\u043B\u0438\u0441\u0442 \u0438 \u043F\u0430\u0440\u0438\u043A\u043C\u0430\u0445\u0435\u0440 \u043D\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435"
  }, "\u041D\u0430 \u043C\u0435\u0441\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043F\u0430\u0440\u0438\u043A\u043C\u0430\u0445\u0435\u0440-\u0441\u0442\u0438\u043B\u0438\u0441\u0442. \u041D\u0430 \u0441\u0446\u0435\u043D\u0435 \u0438 \u0432 \u043A\u0430\u0434\u0440\u0435 \u0442\u044B \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0448\u044C \u043D\u0430 \u0432\u0441\u0435 \u0441\u0442\u043E \u2014 \u0431\u0435\u0437 \u0435\u0434\u0438\u043D\u043E\u0439 \u043C\u044B\u0441\u043B\u0438 \xAB\u043A\u0430\u043A \u044F \u043F\u043E\u043B\u0443\u0447\u0443\u0441\u044C\xBB."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83C\uDFA4 \u041F\u0440\u043E\u043A\u0430\u0447\u043A\u0430",
    title: "\u0422\u0440\u0435\u043D\u0435\u0440\u044B \u043F\u043E \u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F\u043C \u2014 \u043B\u0438\u0447\u043D\u043E \u0434\u043B\u044F \u0442\u0435\u0431\u044F"
  }, "\u0411\u043B\u043E\u043A \u043F\u043E \u043A\u0438\u043D\u0435\u0442\u0438\u043A\u0435 \u2014 \u043A\u0430\u043A \u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0441\u0446\u0435\u043D\u0443, \u0438 \u0431\u043B\u043E\u043A \u043F\u043E \u0440\u0435\u0447\u0438 \u0438 \u0433\u043E\u043B\u043E\u0441\u0443. \u041D\u0430\u0432\u044B\u043A, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043E\u0441\u0442\u0430\u043D\u0435\u0442\u0441\u044F \u0441 \u0442\u043E\u0431\u043E\u0439 \u043D\u0430 \u0432\u0441\u044E \u0436\u0438\u0437\u043D\u044C."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83C\uDF7D \u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430",
    title: "\u0421\u0432\u043E\u044F \u0441\u043F\u0438\u043A\u0435\u0440\u0441\u043A\u0430\u044F \u0442\u0443\u0441\u043E\u0432\u043A\u0430"
  }, "\u041A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u0438, \u043E\u0431\u0435\u0434\u044B, \u0443\u0436\u0438\u043D\u044B \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u043F\u0438\u043A\u0435\u0440\u0441\u043A\u0430\u044F \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430. \u0421\u0432\u044F\u0437\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0434\u043E\u0440\u043E\u0436\u0435 \u0433\u043E\u043D\u043E\u0440\u0430\u0440\u0430."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDCCA \u0424\u0438\u0434\u0431\u044D\u043A",
    title: "\u0416\u0438\u0432\u0430\u044F \u0440\u0435\u0430\u043A\u0446\u0438\u044F \u0437\u0430\u043B\u0430"
  }, "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0446\u0435\u043D\u043A\u0438 \u0438 \u043E\u0442\u043A\u043B\u0438\u043A\u0438. \u0422\u044B \u0443\u0432\u0438\u0434\u0438\u0448\u044C \u0432 \u0431\u0430\u043B\u043B\u0430\u0445 \u0438 \u0441\u043B\u043E\u0432\u0430\u0445, \u043A\u0430\u043A \u0437\u0430\u0448\u043B\u0430 \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDCE3 \u041E\u0445\u0432\u0430\u0442",
    title: "500 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0442\u0432\u043E\u0435\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438"
  }, "\u0421\u0430\u043C\u044B\u0439 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0439 \u0444\u043E\u0440\u0443\u043C \u0431\u044B\u043B ~130 \u0447\u0435\u043B\u043E\u0432\u0435\u043A. \u041C\u044B \u0446\u0435\u043B\u0438\u043C\u0441\u044F \u0432 500 \u2014 \u043E\u043D\u0438 \u0443\u0436\u0435 \u0432 \u0437\u0430\u043B\u0435.")))), /*#__PURE__*/React.createElement("section", {
    id: "format"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0430\u043A \u043C\u044B \u0432\u044B\u0441\u0442\u0443\u043F\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u0424\u043E\u0440\u043C\u0430\u0442 \u0431\u043B\u0438\u0436\u0435 \u043A TED \u2014 \u043F\u043E\u043B\u044C\u0437\u0430, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0436\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0423 \u043D\u0430\u0441 \u0435\u0434\u0438\u043D\u0430\u044F \u043A\u0430\u043D\u0432\u0430 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0439: \u043E\u0431\u0449\u0438\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u0442\u043E\u043C\u0443, \u0441 \u0447\u0435\u0433\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u0438 \u043E \u0447\u0451\u043C \u0433\u043E\u0432\u043E\u0440\u0438\u043C. \u041C\u044B \u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0435\u043C \u0431\u043E\u043B\u0438, \u0434\u0435\u043B\u0438\u043C\u0441\u044F \u0438\u0434\u0435\u044F\u043C\u0438 \u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F\u043C\u0438 \u2014 \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u043D\u043E, \xAB\u0431\u0435\u0440\u0438 \u0438 \u0434\u0435\u043B\u0430\u0439\xBB."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u0441\u043E \u0441\u0446\u0435\u043D\u044B"
  }, "\u0412\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435 \u2014 \u044D\u0442\u043E ", /*#__PURE__*/React.createElement("strong", null, "\u043D\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0442\u0432\u043E\u0438\u0445 \u0443\u0441\u043B\u0443\u0433"), ". \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u0443 \u043C\u0435\u043D\u044F \u043D\u0430 \u043A\u0443\u0440\u0441\u0435\xBB, \xAB\u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u0435 \u043A\u043E \u043C\u043D\u0435\xBB. \u041C\u044B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u043A\u0435\u0439\u0441\u044B, \u043F\u0440\u0438\u043C\u0435\u0440\u044B, \u0438\u043D\u0441\u0430\u0439\u0442\u044B. \u0415\u0441\u043B\u0438 \u0442\u0435\u043C\u0430 \u0437\u0430\u0446\u0435\u043F\u0438\u0442 \u2014 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0441\u0430\u043C \u043D\u0430\u0439\u0434\u0451\u0442 \u0442\u0435\u0431\u044F. \u0422\u0430\u043A \u0447\u0435\u0441\u0442\u043D\u0435\u0435 \u2014 \u0438 \u0442\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0435.")))), /*#__PURE__*/React.createElement("section", {
    id: "platform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u0418 \u0435\u0449\u0451 \u043A\u043E\u0435-\u0447\u0442\u043E"), /*#__PURE__*/React.createElement("h2", null, "\u041C\u0435\u0441\u0442\u043E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u2014 \u0438 \u0434\u043E\u043B\u044F \u0432 \u043D\u0435\u0439"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u041C\u044B \u0441\u0442\u0440\u043E\u0438\u043C \u0431\u043E\u043B\u044C\u0448\u0443\u044E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443 \u0434\u043B\u044F \u0440\u0443\u0441\u0441\u043A\u043E\u044F\u0437\u044B\u0447\u043D\u044B\u0445 \u0432 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u0438. \u041A\u0430\u043A \u0441\u043F\u0438\u043A\u0435\u0440 \u0442\u044B \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0448\u044C \u0442\u0443\u0434\u0430 \u043F\u0435\u0440\u0432\u044B\u043C \u2014 \u043D\u0430 \u043E\u0441\u043E\u0431\u044B\u0445 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u0445. \u0410 \u0435\u0449\u0451 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0448\u044C \u0434\u043E\u043B\u044E \u0432 \u0435\u0451 \u0431\u0443\u0434\u0443\u0449\u0435\u043C."), /*#__PURE__*/React.createElement("div", {
    className: "grid g3"
  }, /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83C\uDD93 \u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435",
    title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C, \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0443\u0441\u043B\u0443\u0433\u0438"
  }, "\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438 \u0441\u0435\u0431\u044F, \u0441\u0432\u043E\u0439 \u0431\u0438\u0437\u043D\u0435\u0441 \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E \u0441\u0442\u043E\u0438\u0442 199 \u0444\u0440\u0430\u043D\u043A\u043E\u0432."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDECD \u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B",
    title: "\u0413\u0430\u0439\u0434\u044B \u0438 \u043A\u0443\u0440\u0441\u044B \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443"
  }, "\u0415\u0441\u043B\u0438 \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u0433\u0430\u0439\u0434, \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0443\u0440\u0441 \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u2014 \u0435\u0433\u043E \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDCC8 \u0414\u043E\u043B\u044F",
    title: "\u041F\u0430\u043A\u0435\u0442 \u0430\u043A\u0446\u0438\u0439 \u2014 \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0441\u043F\u0438\u043A\u0435\u0440\u0443"
  }, "\u041F\u043E\u0434 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443 \u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u044E AG. \u041A\u0430\u0436\u0434\u043E\u043C\u0443 \u0441\u043F\u0438\u043A\u0435\u0440\u0443 \u043C\u044B \u0432\u044B\u0434\u0430\u0451\u043C ", /*#__PURE__*/React.createElement("strong", null, "\u043F\u0430\u043A\u0435\u0442 \u043D\u0430 2000 \u0430\u043A\u0446\u0438\u0439"), " \u2014 \u043A\u0430\u043A \u0434\u043E\u043B\u044E \u0432 \u043E\u0431\u0449\u0435\u043C \u0431\u0443\u0434\u0443\u0449\u0435\u043C.")))), /*#__PURE__*/React.createElement("section", {
    id: "days"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D \u0444\u043E\u0440\u0443\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u0414\u0432\u0430 \u0434\u043D\u044F \u2014 \u0438 \u0442\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043B\u044E\u0431\u043E\u0439"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0424\u043E\u0440\u0443\u043C \u0438\u0434\u0451\u0442 \u0434\u0432\u0430 \u0434\u043D\u044F, \u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0443 \u043D\u0438\u0445 \u0440\u0430\u0437\u043D\u0430\u044F. \u0412\u044B\u0431\u0438\u0440\u0430\u0439 \u0434\u0435\u043D\u044C \u043F\u043E\u0434 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u2014 \u0430 \u0435\u0441\u043B\u0438 \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u043B\u043E\u0436\u0438\u0442\u0441\u044F \u0432 \u043E\u0431\u0430, \u043C\u043E\u0436\u0435\u0448\u044C \u0432\u044B\u0441\u0442\u0443\u043F\u0438\u0442\u044C \u0438 \u0442\u0430\u043C, \u0438 \u0442\u0430\u043C."), /*#__PURE__*/React.createElement("div", {
    className: "grid g2"
  }, /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDCC5 \u0414\u0435\u043D\u044C 1",
    title: "\u0414\u043B\u044F \u043E\u0431\u044B\u0447\u043D\u044B\u0445 \u043B\u044E\u0434\u0435\u0439"
  }, "\u041F\u0435\u043D\u0441\u0438\u044F, \u043D\u0430\u043B\u043E\u0433\u0438, \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043A\u0438, \u043F\u043E\u0434\u0443\u0448\u043A\u0430, \u0434\u0435\u043D\u044C\u0433\u0438 \u0432 \u0441\u0435\u043C\u044C\u0435. \u0411\u0430\u0437\u0430, \u0441 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439. \u0415\u0441\u043B\u0438 \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u2014 \u043F\u0440\u043E \u043F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0442\u0435\u0431\u0435 \u0441\u044E\u0434\u0430."), /*#__PURE__*/React.createElement(Perk, {
    badge: "\uD83D\uDCC5 \u0414\u0435\u043D\u044C 2",
    title: "\u0414\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439"
  }, "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E, \u0431\u0438\u0437\u043D\u0435\u0441-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B. \u0414\u043B\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u0437\u0430\u0442\u043E\u0447\u0435\u043D \u043D\u0430 \u0440\u043E\u0441\u0442 \u0438 \u043A\u0430\u043F\u0438\u0442\u0430\u043B.")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\u0412 \u0430\u043D\u043A\u0435\u0442\u0435 \u043D\u0438\u0436\u0435 \u043E\u0442\u043C\u0435\u0442\u0438\u0448\u044C, \u043A\u0430\u043A\u043E\u0439 \u0434\u0435\u043D\u044C (\u0438\u043B\u0438 \u043E\u0431\u0430) \u0442\u0435\u0431\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u2014 \u0438 \u0443\u0434\u043E\u0431\u043D\u044B\u0435 \u0442\u0430\u0439\u043C-\u0441\u043B\u043E\u0442\u044B."))), /*#__PURE__*/React.createElement("section", {
    id: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u043E\u0433\u043E \u043C\u044B \u0438\u0449\u0435\u043C"), /*#__PURE__*/React.createElement("h2", null, "\u041E\u043F\u044B\u0442 \u0446\u0435\u043D\u0438\u043C \u043F\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u043F\u0438\u043A\u0435\u0440\u043E\u0432 \u0431\u0435\u0440\u0451\u043C \u0432 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u043C \u0442\u0435\u0445, \u043A\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u043E\u0439 \u0437\u0435\u043C\u043B\u0435 \u2014 \u043D\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B \u0438 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u0435 \u043A\u0435\u0439\u0441\u044B. \u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u2014 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0438 \u043F\u043E\u043B\u044C\u0437\u0430 \u0434\u043B\u044F \u0437\u0430\u043B\u0430, \u0430 \u043D\u0435 \u0433\u0440\u043E\u043C\u043A\u0438\u0435 \u0440\u0435\u0433\u0430\u043B\u0438\u0438."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    title: "\u0412\u0430\u0436\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u043F\u0440\u043E \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u0442\u0435\u043C\u044B"
  }, "\u0412 \u0442\u0435\u043C\u0430\u0445 \u0432\u0440\u043E\u0434\u0435 \u043F\u0440\u0430\u0432\u0430, \u0431\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440\u0438\u0438, \u043D\u0430\u043B\u043E\u0433\u043E\u0432 \u0438 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F ", /*#__PURE__*/React.createElement("strong", null, "\u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u043A\u0438\u0439 \u0434\u0438\u043F\u043B\u043E\u043C \u0438 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"), " \u2014 \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u043E\u0432\u0435\u0442\u044B \u0434\u0430\u0451\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0439 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442. \u0410 \u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043B\u0438\u0447\u043D\u043E\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0435\u0439 \u0438 \u043E\u043F\u044B\u0442\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439.")))), /*#__PURE__*/React.createElement("section", {
    id: "confirmed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u041A\u0442\u043E \u0443\u0436\u0435 \u0441 \u043D\u0430\u043C\u0438"), /*#__PURE__*/React.createElement("h2", null, "\u041F\u0435\u0440\u0432\u044B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u0435 \u0441\u043F\u0438\u043A\u0435\u0440\u044B"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0440\u044F\u0434\u043E\u043C \u0441 \u043D\u0438\u043C\u0438 \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0448\u044C \u0438 \u0442\u044B."), /*#__PURE__*/React.createElement("div", {
    className: "grid gauto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-cta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "\u0415\u0441\u0442\u044C \u043E \u0447\u0451\u043C \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C?"), /*#__PURE__*/React.createElement("p", null, "\u041F\u043E\u0434\u043D\u0438\u043C\u0430\u0435\u043C \u0431\u043E\u043B\u0438, \u0434\u0435\u043B\u0438\u043C\u0441\u044F \u0438\u0434\u0435\u044F\u043C\u0438 \u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F\u043C\u0438. \u0415\u0441\u043B\u0438 \u0442\u0432\u043E\u044F \u0442\u0435\u043C\u0430 \u0438 \u043E\u043F\u044B\u0442 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u0435\u0437\u043D\u044B \u0437\u0430\u043B\u0443 \u2014 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0438 \u0434\u043E\u043A\u043B\u0430\u0434.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm",
    href: "#apply"
  }, "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u0442\u0435\u043C\u0443 \u2192"))), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E \u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441 \u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "LinkedIn"
  }), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E \u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441 \u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "LinkedIn"
  }), /*#__PURE__*/React.createElement(SpeakerCard, {
    name: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    role: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \xB7 \u043A\u0430\u043D\u0442\u043E\u043D / \u0441\u0442\u0440\u0430\u043D\u0430",
    topic: "\u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0446\u0435\u043F\u043B\u044F\u044E\u0449\u0435\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E \u0442\u043E\u043C, \u0447\u0435\u043C \u0441\u043F\u0438\u043A\u0435\u0440 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0441\u044F \u0441 \u0437\u0430\u043B\u043E\u043C.",
    link: "#",
    linkLabel: "YouTube"
  })), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: 14,
      color: "var(--muted-2)"
    }
  }, "\u0417\u0430\u043C\u0435\u043D\u0438 \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B \u043D\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u043F\u0438\u043A\u0435\u0440\u043E\u0432: \u0444\u043E\u0442\u043E, \u0438\u043C\u044F, \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E, \u0442\u0435\u043C\u0443 \u0438 \u0441\u0441\u044B\u043B\u043A\u0443."))), /*#__PURE__*/React.createElement("section", {
    id: "apply",
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(ReliefBand, {
    variant: "final",
    eyebrow: /*#__PURE__*/React.createElement(Eyebrow, {
      center: true
    }, "\u0421\u043F\u0438\u043A\u0435\u0440\u0430\u043C \xB7 Frankenplatz 2026"),
    title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438 \u043E \u0441\u0435\u0431\u0435",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      href: "#apply"
    }, "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0430\u043D\u043A\u0435\u0442\u0443 \u0441\u043F\u0438\u043A\u0435\u0440\u0430")
  }, /*#__PURE__*/React.createElement("p", {
    className: "fp-band__body"
  }, "\u041D\u0438\u0436\u0435 \u0431\u0443\u0434\u0435\u0442 \u043A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u0430\u043D\u043A\u0435\u0442\u0430: \u043E \u0442\u0435\u0431\u0435, \u0442\u0432\u043E\u0435\u0439 \u0442\u0435\u043C\u0435 \u0438 \u0443\u0434\u043E\u0431\u043D\u044B\u0445 \u0442\u0430\u0439\u043C-\u0441\u043B\u043E\u0442\u0430\u0445. \u0424\u043E\u0440\u043C\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u043C \u0441\u043E\u0432\u0441\u0435\u043C \u0441\u043A\u043E\u0440\u043E. \u0414\u0430\u0442\u0430 \u0444\u043E\u0440\u0443\u043C\u0430: 24\u201325 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 2026 \xB7 Z\xFCrich.")))), /*#__PURE__*/React.createElement(Footer, {
    links: [{
      label: "Для участников",
      href: "index.html"
    }, {
      label: "День 1",
      href: "day1.html"
    }, {
      label: "День 2",
      href: "day2.html"
    }]
  }));
}
window.Speakers = Speakers;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Speakers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/kit.js
try { (() => {
/* Frankenplatz marketing — scroll-reactive background.
   Makes the two blurred glow orbs drift horizontally + parallax vertically
   as you scroll, so the violet/gold gradient "walks" across the page.
   Respects prefers-reduced-motion. Loaded by every marketing page. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var violet = null,
    amber = null,
    ticking = false;
  function grab() {
    if (!violet) violet = document.querySelector(".fp-glow--violet");
    if (!amber) amber = document.querySelector(".fp-glow--amber");
  }
  function update() {
    grab();
    var y = window.scrollY || window.pageYOffset || 0;
    var h = Math.max((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight, 1);
    var p = Math.min(Math.max(y / h, 0), 1); // scroll progress 0..1
    var wave = p * Math.PI * 2; // one full drift over the page

    if (violet) {
      violet.style.transform = "translate(" + (Math.sin(wave) * 160).toFixed(1) + "px, " + (y * 0.14).toFixed(1) + "px)";
    }
    if (amber) {
      amber.style.transform = "translate(" + (Math.cos(wave) * -150).toFixed(1) + "px, " + (-y * 0.07).toFixed(1) + "px)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {
    passive: true
  });

  // Orbs are rendered by React, so poll briefly until they exist, then sync once.
  var tries = 0;
  var iv = setInterval(function () {
    grab();
    tries++;
    if (violet && amber || tries > 25) {
      update();
      clearInterval(iv);
    }
  }, 160);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/kit.js", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ReliefBand = __ds_scope.ReliefBand;

__ds_ns.SpeakerCard = __ds_scope.SpeakerCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.ComparisonTable = __ds_scope.ComparisonTable;

__ds_ns.FAQItem = __ds_scope.FAQItem;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Marquee = __ds_scope.Marquee;

})();
