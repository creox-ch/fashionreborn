#!/usr/bin/env node
/**
 * validate_calc.js — DOM-stub прогон single-file калькулятора Frankenplatz.
 *
 *   node scripts/validate_calc.js calc.html
 *   node scripts/validate_calc.js calc.html --call calculate --call render
 *
 * Что делает:
 *   1. вынимает все инлайновые <script> из HTML;
 *   2. выполняет их через new Function под DOM-стабом;
 *   3. вызывает указанные глобальные функции и печатает результат;
 *   4. проверяет статические правила регламента (type="number", localStorage,
 *      внешние зависимости, отсутствие inputmode).
 *
 * Скрипт проверяет исполняемость и статику. Арифметику он НЕ проверяет:
 * типовой кейс пересчитывается руками, граничные значения прогоняются отдельно.
 */

const fs = require('fs');

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const calls = args.reduce((acc, a, i) => {
  if (a === '--call' && args[i + 1]) acc.push(args[i + 1]);
  return acc;
}, []);

if (!file) {
  console.error('Использование: node validate_calc.js <файл.html> [--call имяФункции ...]');
  process.exit(2);
}

const html = fs.readFileSync(file, 'utf8');
const problems = [];
const notes = [];

/* ---------- 1. Статические проверки регламента ---------- */

const inputTags = html.match(/<input[^>]*>/gi) || [];
inputTags.forEach((tag) => {
  if (/type\s*=\s*["']number["']/i.test(tag)) {
    problems.push('type="number" запрещён (ломает навигацию на мобильном): ' + tag.slice(0, 90));
  }
  const isTextual = /type\s*=\s*["']text["']/i.test(tag) || !/type\s*=/i.test(tag);
  const looksNumeric = /(sum|amount|betrag|income|price|value|chf|jahr|year|proz|percent)/i.test(tag);
  if (isTextual && looksNumeric && !/inputmode/i.test(tag)) {
    notes.push('поле выглядит числовым, но без inputmode="decimal": ' + tag.slice(0, 90));
  }
});

if (/localStorage|sessionStorage/.test(html)) {
  problems.push('используется localStorage/sessionStorage — запрещено регламентом');
}

// <link rel="canonical" href="https://frankenplatz.ch/…"> — не зависимость, а SEO-метка:
// браузер по ней ничего не грузит, с диска файл работает как прежде.
const htmlNoCanonical = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
const externals = htmlNoCanonical.match(/(?:src|href)\s*=\s*["']https?:\/\/[^"']+/gi) || [];
externals.forEach((u) => {
  problems.push('внешняя зависимость (файл обязан работать с диска): ' + u.slice(0, 100));
});

if (!/inputmode\s*=\s*["']decimal["']/i.test(html) && inputTags.length) {
  notes.push('ни одного inputmode="decimal" во всём файле');
}
if (!/TODO/.test(html)) {
  notes.push('нет ни одной пометки // TODO: — точки интеграции Supabase/Resend/Stripe отмечены?');
}

/* ---------- 2. DOM-стаб ---------- */

function makeEl(id) {
  const el = {
    id: id || '',
    value: '',
    checked: false,
    // Наша правка: узлы-потомки. Калькуляторы правят подпись через
    // childNodes[0].textContent (label с вложенным <span>); без этого
    // стаб падает там, где в браузере всё работает.
    childNodes: [{ textContent: '' }],
    firstChild: { textContent: '' },
    parentNode: null,
    remove() {},
    textContent: '',
    innerHTML: '',
    innerText: '',
    className: '',
    style: {},
    dataset: {},
    children: [],
    options: [],
    selectedIndex: 0,
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    addEventListener() {},
    removeEventListener() {},
    appendChild(c) { this.children.push(c); return c; },
    removeChild() {},
    insertAdjacentHTML() {},
    setAttribute() {},
    getAttribute: () => null,
    removeAttribute() {},
    querySelector: () => makeEl(),
    querySelectorAll: () => [],
    closest: () => null,
    focus() {},
    scrollIntoView() {},
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0, right: 0, bottom: 0 }),
    getContext: () => ({
      clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {},
      fillRect() {}, arc() {}, fillText() {}, save() {}, restore() {}, setTransform() {},
      createLinearGradient: () => ({ addColorStop() {} }),
    }),
  };
  return el;
}

const elCache = new Map();
const documentStub = {
  getElementById(id) {
    if (!elCache.has(id)) elCache.set(id, makeEl(id));
    return elCache.get(id);
  },
  querySelector: () => makeEl(),
  querySelectorAll: () => [],
  getElementsByClassName: () => [],
  getElementsByTagName: () => [],
  createElement: (tag) => makeEl('created-' + tag),
  createElementNS: (ns, tag) => makeEl('created-' + tag),
  createTextNode: (t) => ({ textContent: t }),
  addEventListener() {},
  removeEventListener() {},
  body: makeEl('body'),
  documentElement: makeEl('html'),
  head: makeEl('head'),
  readyState: 'complete',
  cookie: '',
};

const windowStub = {
  document: documentStub,
  addEventListener() {},
  removeEventListener() {},
  location: { href: 'https://frankenplatz.local/calc', search: '', hash: '', pathname: '/calc' },
  navigator: { language: 'ru-RU', userAgent: 'node-dom-stub' },
  innerWidth: 390,
  innerHeight: 844,
  matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
  scrollTo() {},
  alert(msg) { notes.push('вызван alert(): ' + String(msg).slice(0, 80)); },
  fetch: async () => ({ ok: true, json: async () => ({}), text: async () => '' }),
  requestAnimationFrame: (cb) => setTimeout(cb, 0),
  setTimeout,
  setInterval: () => 0,
  clearInterval() {},
  clearTimeout,
  Intl,
  console,
};
windowStub.window = windowStub;
windowStub.self = windowStub;
windowStub.globalThis = windowStub;

/* ---------- 3. Извлечение и выполнение скриптов ---------- */

const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const blocks = [];
let m;
while ((m = scriptRe.exec(html)) !== null) {
  const attrs = m[1] || '';
  if (/\bsrc\s*=/i.test(attrs)) continue;
  if (/type\s*=\s*["'](?!text\/javascript|module|application\/javascript)/i.test(attrs)) continue;
  if (m[2].trim()) blocks.push(m[2]);
}

if (!blocks.length) {
  problems.push('в файле нет инлайновых <script> — нечего валидировать');
}

/* Наша правка: калькуляторы Frankenplatz подключают общий слой отдельными
   файлами (report-capture.js — сбор e-mail, cookie-consent.js — согласие и GA,
   calc-nav.js — меню). Так сделано намеренно: отдельные модули переживают синк
   дизайна, тогда как код внутри HTML затирается выгрузкой. Валидатор внешние
   <script src> не исполняет, поэтому объявляем их глобали заглушками — иначе он
   сообщает не об ошибке в файле, а о нашей архитектуре. */
/* Сигнатура повторяет реальный экспорт calculators/report-capture.js:
   window.FPReport = { init, MIN_FILL_MS } — при смене API поправить здесь. */
globalThis.FPReport = { init() {}, completed() {}, MIN_FILL_MS: 2500 };
globalThis.FPConsent = { granted: () => false, open() {}, track() {} };
globalThis.FP_NAV = () => [];

const sandbox = Object.create(null);
const runner = new Function(
  'window', 'document', 'navigator', 'location', 'fetch', 'alert',
  'localStorage', 'sessionStorage', 'requestAnimationFrame', 'matchMedia',
  'globalThis_', '__code',
  '"use strict"; return eval(__code);'
);

let executed = 0;
blocks.forEach((code, i) => {
  try {
    runner.call(
      windowStub,
      windowStub, documentStub, windowStub.navigator, windowStub.location,
      windowStub.fetch, windowStub.alert,
      undefined, undefined,
      windowStub.requestAnimationFrame, windowStub.matchMedia,
      windowStub, code
    );
    executed += 1;
  } catch (e) {
    problems.push('<script> #' + (i + 1) + ' падает: ' + e.message);
  }
});

/* ---------- 4. Вызов указанных функций ---------- */

if (calls.length) {
  const joined = blocks.join('\n;\n');
  calls.forEach((fnName) => {
    try {
      const out = runner.call(
        windowStub,
        windowStub, documentStub, windowStub.navigator, windowStub.location,
        windowStub.fetch, windowStub.alert,
        undefined, undefined,
        windowStub.requestAnimationFrame, windowStub.matchMedia,
        windowStub,
        joined + '\n; typeof ' + fnName + ' === "function" ? ' + fnName + '() : "__NOT_A_FUNCTION__";'
      );
      if (out === '__NOT_A_FUNCTION__') {
        problems.push('функция ' + fnName + '() не найдена в глобальной области');
      } else {
        console.log('→ ' + fnName + '() =', typeof out === 'object' ? JSON.stringify(out) : out);
      }
    } catch (e) {
      problems.push(fnName + '() падает: ' + e.message);
    }
  });
}

/* ---------- 5. Отчёт ---------- */

console.log('\nФайл: ' + file);
console.log('Инлайновых <script>: ' + blocks.length + ', выполнено без ошибок: ' + executed);

if (notes.length) {
  console.log('\nВнимание (' + notes.length + '):');
  notes.forEach((n) => console.log('  · ' + n));
}

if (problems.length) {
  console.log('\nНАРУШЕНИЯ (' + problems.length + '):');
  problems.forEach((p) => console.log('  ✗ ' + p));
  console.log('\nФайл не отдаётся, пока нарушения не устранены.');
  process.exit(1);
}

console.log('\n✓ Исполняемость и статические правила — в порядке.');
console.log('  Осталось вручную: типовой кейс пересчитать, граничные значения и монотонность прогнать.');
