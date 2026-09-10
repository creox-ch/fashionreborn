#!/usr/bin/env node
/**
 * check_page_scripts.js — подключены ли на страницах их обязательные модули.
 *
 *   node scripts/check_page_scripts.js
 *
 * Зачем. Разметку страниц периодически перезаписывает выгрузка из Claude Design.
 * Дизайн не знает про серверную логику, и вместе с версткой уезжают <script>-теги
 * с боевыми модулями. Так уже было: выгрузка 11.08 вырезала site/market-buy.js из
 * brand-market.html — страница продолжала продавать пакеты, а кнопки покупки на
 * ней не было (единственная CTA вела на #apply, сама на себя). Потерю заметили
 * через неделю; всё это время оплаты были невозможны.
 *
 * Здесь перечислены только те модули, без которых страница ТЕРЯЕТ ДЕНЬГИ ИЛИ
 * ЗАЯВКИ: покупка, формы, согласие на куки. Косметику не сторожим — её пропажу
 * видно глазами, а лишние правила будут мешать дизайну.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/** страница → модули, без которых она сломана по сути, а не по виду. */
const REQUIRED = {
  'index.html': [
    'site/market-buy.js', // покупка пакета маркета → Payrexx
    'site/forum-form.js', // вопрос о маркете (#bmForm) → /api/forms
    'site/newsletter-form.js',
    'site/cookie-consent.js',
    'site/help-widget.js', // «Быстрые ответы» + вопрос → /api/forms
  ],
  'market-catalog.html': [
    'site/market-catalog.js', // каталог из базы кабинета продавца
    'site/forum-form.js', // бронь/очередь/вопрос по вещи (#mcBook) → /api/forms
    'site/cookie-consent.js',
    'site/help-widget.js',
  ],
  'brand-market-philosophy.html': ['site/newsletter-form.js', 'site/cookie-consent.js'],
  'brand-market-authenticity.html': ['site/newsletter-form.js', 'site/cookie-consent.js'],
  'brand-market-agb.html': ['site/newsletter-form.js', 'site/cookie-consent.js'],
  'legal.html': ['site/newsletter-form.js', 'site/cookie-consent.js'],
};

const problems = [];

for (const [page, modules] of Object.entries(REQUIRED)) {
  const pagePath = path.join(ROOT, page);
  if (!fs.existsSync(pagePath)) {
    problems.push(`${page}: страницы нет — обнови список в scripts/check_page_scripts.js`);
    continue;
  }
  const html = fs.readFileSync(pagePath, 'utf8');
  for (const mod of modules) {
    // src="site/x.js" и src="site/x.js?v=15" — версия в адресе допустима.
    // Страницы в подпапках (trips/, blog/) подключают модули как ../site/x.js —
    // необязательный префикс ../ покрывает и их.
    const re = new RegExp(`src=["'](\\.\\./)?${mod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?[^"']*)?["']`);
    if (!re.test(html)) {
      problems.push(`${page}: не подключён ${mod}`);
    }
    // модуль может быть подключён, но сам файл — потерян при синке
    if (!fs.existsSync(path.join(ROOT, mod))) {
      problems.push(`${page}: файла ${mod} нет в репозитории`);
    }
  }
}

if (problems.length) {
  console.error('Потерянные подключения:\n');
  for (const p of problems) console.error('  ✗ ' + p);
  console.error(
    '\nСкорее всего, теги вырезала выгрузка дизайна. Верни <script> на страницу' +
      '\n(и файл в site/, если пропал он) — иначе покупка или заявки не работают.'
  );
  process.exit(1);
}

const pages = Object.keys(REQUIRED).length;
const mods = Object.values(REQUIRED).reduce((n, m) => n + m.length, 0);
console.log(`Проверено ${pages} страниц, ${mods} обязательных подключений — все на месте.`);
