#!/usr/bin/env node
/**
 * check_links.js — внутренние ссылки сайта: ведут ли они куда-то и чистые ли.
 *
 *   node scripts/check_links.js
 *
 * Ловит две вещи, которые иначе видно только в браузере и обычно уже в проде:
 *
 *  1. БИТЫЕ ССЫЛКИ. На сайте включён cleanUrls, поэтому адрес /trips/megacampus
 *     должен соответствовать файлу trips/megacampus.html. Опечатка в пути даёт
 *     404, который никто не заметит, пока не кликнет.
 *
 *  2. АДРЕСА С .html. Соглашение платформы: при cleanUrls ссылки пишем чистыми,
 *     иначе каждый клик идёт через лишний 301-редирект. Правило легко нарушить
 *     копипастом шапки со старой страницы — так и случилось со страницей блога.
 *
 * Проверяются литеральные href в .html, .js и .jsx. Ссылки, которые код
 * собирает конкатенацией, скрипт не видит — это его известный предел.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'scripts']);
const SKIP_FILES = /vendor|ds\.bundle\.js|babel-standalone/;

/** Все файлы, где могут быть ссылки. */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(html|js|jsx)$/.test(entry.name) && !SKIP_FILES.test(full)) out.push(full);
  }
  return out;
}

/**
 * Адрес → файл, который его отдаёт. null, если такого файла нет.
 * @param {string} url ссылка как написана
 * @param {string} base папка файла со ссылкой (для относительных адресов)
 */
function resolveTarget(url, base = '') {
  let p = url.split('#')[0].split('?')[0];
  if (!p || p === '/') p = '/index';
  if (p.endsWith('/')) p = p.slice(0, -1);
  let rel = p.replace(/^\//, '');
  if (!url.startsWith('/') && base) rel = path.posix.normalize(path.posix.join(base, rel));
  const candidates = [rel + '.html', path.join(rel, 'index.html'), rel];
  for (const c of candidates) {
    const abs = path.join(ROOT, c);
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return c;
  }
  return null;
}

/* Три формы записи одной и той же ссылки:
     href="/day1"            — атрибут в разметке
     href: "/day1"           — поле объекта в JS (карточки, меню)
     href={"/speaker?id=" +…} — выражение в JSX
   Третью проверка сначала не видела, и синк дизайна вернул через неё
   speaker.html?id= — незаметно, потому что редирект всё равно открывает
   страницу. Ищем все три. */
const HREF_RE = /href\s*[:=]\s*\{?\s*["']([^"']+)["']/g;
const EXTERNAL = /^(https?:|\/\/|mailto:|tel:|data:|javascript:)/i;
/* href бывает не только у ссылок: <link rel=stylesheet href="styles.css">,
   иконки, манифест. Это ресурсы, а не страницы — их пути относительные и
   такими и должны остаться. */
const ASSET = /\.(css|js|mjs|png|jpe?g|webp|gif|svg|ico|webmanifest|xml|txt|pdf|zip|mp4|webm|woff2?|ttf)($|[#?])/i;

const broken = [];
const dotHtml = [];
let checked = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const text = fs.readFileSync(file, 'utf8');
  let m;
  HREF_RE.lastIndex = 0;
  while ((m = HREF_RE.exec(text)) !== null) {
    const url = m[1].trim();
    if (!url || EXTERNAL.test(url) || url.startsWith('#')) continue;
    if (ASSET.test(url)) continue; // стили, иконки, манифест — не страницы
    // Не адреса: примеры в комментариях (href="...#reg") и куски, которые код
    // склеивает во время работы (' + root + ', ${slug}).
    if (/\.\.\.|\$\{|['"]\s*\+|\+\s*['"]/.test(url)) continue;

    // Соглашение: адреса без .html
    if (/\.html($|[#?])/.test(url)) {
      dotHtml.push(`${rel}: ${url}`);
      continue; // такой адрес всё равно откроется (301), битым его не считаем
    }

    checked += 1;
    // абсолютный адрес — от корня; относительный — от папки самого файла
    const base = url.startsWith('/') ? '' : path.dirname(rel);
    if (!resolveTarget(url, base)) {
      broken.push(`${rel}: ${url} — нет страницы под этот адрес`);
    }
  }
}

console.log(`Проверено внутренних ссылок: ${checked}`);

if (dotHtml.length) {
  console.log(`\nАДРЕСА С .html (${dotHtml.length}) — на сайте cleanUrls, пишем чистыми:`);
  dotHtml.forEach((x) => console.log('  ✗ ' + x));
}
if (broken.length) {
  console.log(`\nБИТЫЕ ССЫЛКИ (${broken.length}):`);
  broken.forEach((x) => console.log('  ✗ ' + x));
}

if (dotHtml.length || broken.length) {
  console.log('\nСсылки чинятся до мержа: битый адрес в проде находит человек, а не мы.');
  process.exit(1);
}
console.log('✓ Все внутренние ссылки ведут на существующие страницы и написаны чисто.');
