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
  'brand-market.html': [
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
  'tickets.html': [
    'site/tickets-buy.js', // покупка билета форума → Payrexx
    'site/cookie-consent.js',
    'site/help-widget.js',
  ],
  'sponsor.html': ['site/forum-form.js', 'site/cookie-consent.js'],
  'collaboration.html': ['site/forum-form.js', 'site/cookie-consent.js'],
  'okaziya.html': ['site/okaziya-form.js', 'site/cookie-consent.js'],
  // «Быстрые ответы» (help-widget) — канал вопросов на страницах поездок;
  // на tony-robbins ещё и forum-form (запись в группу, .gform).
  'trips.html': ['site/help-widget.js', 'site/cookie-consent.js'],
  'trips/tony-robbins.html': ['site/forum-form.js', 'site/cookie-consent.js', 'site/help-widget.js'],
  'trips/megacampus.html': ['site/cookie-consent.js', 'site/help-widget.js'],
  'anketa.html': ['site/anketa-form.js', 'site/cookie-consent.js'],
  // «Предложить спикера» — модуль перехватывает ссылку на анкету и открывает
  // форму на два поля. Без него ссылка снова ведёт на 37 вопросов о самом
  // отправителе, и рекомендация теряется. Та же выгрузка 11.08 вырезала и его —
  // вместе с market-buy.js, только заметили позже.
  // Ссылка сейчас есть на index (Landing.jsx) и day1 (Day1.jsx); day2 и speakers
  // держим в списке, потому что формулировка кочует между страницами спикеров с
  // каждой выгрузкой, а без ссылки модуль просто молчит.
  // «Быстрые ответы» (site/help-widget.js) — канал вопросов с ключевых страниц:
  // без подключения заявки просто не поступают, а страница выглядит целой.
  'index.html': ['site/suggest-speaker.js', 'site/help-widget.js'],
  'day1.html': ['site/suggest-speaker.js', 'site/help-widget.js'],
  'day2.html': ['site/suggest-speaker.js', 'site/help-widget.js'],
  'speakers.html': ['site/suggest-speaker.js', 'site/help-widget.js'],
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
