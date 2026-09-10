#!/usr/bin/env node
/**
 * test_parsers.js — проверка парсера чисел fpNum() в калькуляторах.
 *
 *   node scripts/test_parsers.js
 *
 * Зачем отдельный тест: валидатор (validate_calc.js) проверяет исполняемость и
 * статические правила, но НЕ арифметику. Парсер fpNum — единственное место, где
 * пользовательский ввод превращается в число, и ошибка здесь не падает, а тихо
 * даёт 0: расчёт «работает», но врёт. Швейцарская запись 1'200'000 приходит
 * вставкой из документов, поэтому апостроф проверяется отдельно.
 *
 * Функция объявлена инлайном в каждом файле (внешний модуль ломал бы прогон
 * валидатора), поэтому тест достаёт её исходник из HTML и исполняет.
 */

const fs = require('fs');
const path = require('path');

const FILES = ['taxes.html', 'shares.html', 'rent-vs-buy.html'];
const SRC_RE = /function fpNum\(v\)\s*\{[\s\S]*?return isFinite\(n\)\s*\?\s*n\s*:\s*0;\s*\}/;

/* [ввод, ожидание, что проверяем] */
const CASES = [
  ["1'200'000", 1200000, 'швейцарский апостроф — вставка из документа'],
  ['1’200’000', 1200000, 'типографский апостроф — вставка из PDF/Word'],
  ['2 500', 2500, 'разряды обычным пробелом'],
  ['2\u00A0500', 2500, 'разряды неразрывным пробелом'],
  ['2\u2009500', 2500, 'разряды тонким пробелом'],
  ['2,5', 2.5, 'запятая как десятичный разделитель'],
  ['2.5', 2.5, 'точка как десятичный разделитель'],
  ['680', 680, 'обычное целое'],
  ['0', 0, 'ноль остаётся нулём'],
  ['', 0, 'пустое поле'],
  ['   ', 0, 'одни пробелы'],
  ['абв', 0, 'мусор вместо числа'],
  [null, 0, 'null'],
  [undefined, 0, 'undefined'],
  ['-1500', -1500, 'отрицательное значение'],
];

let failed = 0;
let checked = 0;

for (const file of FILES) {
  const full = path.join(__dirname, '..', 'calculators', file);
  const html = fs.readFileSync(full, 'utf8');
  const m = html.match(SRC_RE);

  if (!m) {
    console.log(`✗ ${file}: функция fpNum не найдена — её убрали или переименовали?`);
    failed += 1;
    continue;
  }

  const fpNum = new Function('return ' + m[0])();
  const bad = [];

  for (const [input, expected, what] of CASES) {
    const got = fpNum(input);
    checked += 1;
    if (got !== expected) {
      bad.push(`    ${what}: fpNum(${JSON.stringify(input)}) = ${got}, ожидалось ${expected}`);
    }
  }

  if (bad.length) {
    console.log(`✗ ${file}: ${bad.length} из ${CASES.length}`);
    bad.forEach((b) => console.log(b));
    failed += 1;
  } else {
    console.log(`✓ ${file}: ${CASES.length} случаев`);
  }
}

console.log(`\nПроверок: ${checked}, файлов с ошибками: ${failed}`);
process.exit(failed ? 1 : 0);
