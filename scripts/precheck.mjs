#!/usr/bin/env node
/**
 * Локальный гейт перед push — то же, что гоняют workflow сайта, только на машине.
 *
 *   node scripts/precheck.mjs
 *
 * Зачем (2026-09-05): аккаунты GitHub заблокированы, PR открыть некому, а
 * проверки сайта запускаются только на pull_request и push в main. Ветка,
 * запушенная deploy-ключом, не проверяется ничем.
 *
 *   1. секреты          — ключи в отслеживаемых файлах
 *   2. Ссылки           — scripts/check_links.js
 *   3. Подключения      — scripts/check_page_scripts.js
 *   4. Калькуляторы     — scripts/validate_calc.js по каждому + test_parsers.js
 *   5. вес графики      — предупреждение, не провал (см. CLAUDE.md: выгрузка
 *                         дизайна возвращает несжатые оригиналы, 10.08 графика
 *                         выросла с 16 до 33 МБ)
 */
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const NL = String.fromCharCode(10);
const t0 = Date.now();
const results = [];
const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[90m${s}\x1b[0m`,
};

function summary(code) {
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  console.log('');
  if (code === 0) {
    console.log(c.ok(`✔ Всё зелёное за ${secs} с — можно пушить.`));
    console.log(c.dim('  Проверки на GitHub запустятся только на PR или push в main.'));
  } else {
    console.log(c.bad(`✘ Гейт не пройден (${secs} с). Push не делаем, пока не почините.`));
  }
  process.exit(code);
}

function step(name, fn) {
  process.stdout.write(`${c.dim('▸')} ${name}… `);
  const started = Date.now();
  try {
    const note = fn();
    const secs = ((Date.now() - started) / 1000).toFixed(0);
    console.log(`${c.ok('ок')} ${c.dim(`(${secs} с)`)}${note ? ` ${c.dim(note)}` : ''}`);
    results.push({ name, ok: true });
  } catch (e) {
    console.log(c.bad('ПРОВАЛ'));
    console.log(`${NL}${c.bad('┌─ ' + name)}`);
    console.log(String(e.message || e).split(NL).map((l) => `${c.bad('│')} ${l}`).join(NL));
    console.log(c.bad('└─'));
    summary(1);
  }
}

function node(script, args = []) {
  const r = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error((r.stdout || '') + (r.stderr || ''));
  return r.stdout;
}

// ─── 1. секреты ──────────────────────────────────────────────────────────────
// Сайт статический и живёт в публичном репозитории: ключ, положенный сюда,
// раздаётся с прода как обычный файл.
const SECRET_PATTERNS = [
  [/\bre_[A-Za-z0-9_]{16,}/, 'ключ Resend (re_…)'],
  [/\beyJhbGciOi[A-Za-z0-9_.\-]{20,}/, 'JWT — похоже на ключ Supabase'],
  [/-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/, 'приватный ключ'],
  [/\bsk_(?:live|test)_[A-Za-z0-9]{16,}/, 'секретный ключ платёжной системы'],
  [/\bwhsec_[A-Za-z0-9]{16,}/, 'ключ подписи вебхука'],
  [/\bghp_[A-Za-z0-9]{30,}/, 'токен GitHub (ghp_…)'],
  [/\bgithub_pat_[A-Za-z0-9_]{30,}/, 'токен GitHub (github_pat_…)'],
];

step('секреты в файлах', () => {
  const files = execSync('git ls-files', { encoding: 'utf8' }).split(NL).filter(Boolean);
  const hits = [];
  let scanned = 0;
  for (const f of files) {
    if (/\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|mp4|pdf|zip)$/i.test(f)) continue;
    let text;
    try { text = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (text.includes('\0')) continue;
    scanned++;
    text.split(NL).forEach((line, i) => {
      for (const [re, what] of SECRET_PATTERNS) {
        if (re.test(line)) hits.push(`${f}:${i + 1} — ${what}`);
      }
    });
  }
  if (hits.length) {
    throw new Error(`Похоже на секреты (значения намеренно не показаны):${NL}${hits.join(NL)}`);
  }
  return `${scanned} файлов`;
});

// ─── 2-4. то же, что в workflow ──────────────────────────────────────────────
step('внутренние ссылки', () => { node('scripts/check_links.js'); return null; });
step('обязательные модули на страницах', () => { node('scripts/check_page_scripts.js'); return null; });

const CALCULATORS = [
  'calculators/budget.html',
  'calculators/pension.html',
  'calculators/rent-vs-buy.html',
  'calculators/taxes.html',
  'calculators/shares.html',
];
step('калькуляторы (DOM-stub)', () => {
  const broken = [];
  for (const f of CALCULATORS) {
    try { node('scripts/validate_calc.js', [f]); } catch (e) { broken.push(`${f}${NL}${e.message}`); }
  }
  if (broken.length) throw new Error(broken.join(NL));
  return `${CALCULATORS.length} шт.`;
});
step('парсер чисел', () => { node('scripts/test_parsers.js'); return null; });

// ─── 5. вес графики (предупреждение) ─────────────────────────────────────────
step('вес графики', () => {
  const LIMIT_MB = 20;
  let total = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(png|jpe?g|gif|webp|avif)$/i.test(e.name)) total += fs.statSync(full).size;
    }
  };
  walk('.');
  const mb = total / 1024 / 1024;
  if (mb > LIMIT_MB) {
    console.log('');
    console.log(c.warn(`  ⚠ Картинки весят ${mb.toFixed(1)} МБ (порог ${LIMIT_MB}).`));
    console.log(c.warn('    Похоже на несжатые оригиналы из выгрузки дизайна —'));
    console.log(c.warn('    прогнать workflow «Сжать картинки». Провалом не считаю.'));
    process.stdout.write('  ');
  }
  return `${mb.toFixed(1)} МБ`;
});

summary(0);
