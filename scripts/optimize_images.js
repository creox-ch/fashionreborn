#!/usr/bin/env node
/**
 * optimize_images.js — разовое пережатие картинок сайта.
 *
 *   node scripts/optimize_images.js          # пережать и записать
 *   node scripts/optimize_images.js --dry    # только показать, что сделает
 *
 * Зачем. Синк дизайна 10.08.2026 вернул несжатые оригиналы: графика выросла
 * с 16.4 до 33.2 МБ. Часть файлов — тот же кадр, просто тяжелее закодирован
 * (чистый откат), часть — реально более крупный оригинал от дизайнера.
 * Поэтому не откатываем к старым файлам, а пережимаем всё по одной схеме:
 * длинная сторона ≤ 2400px, JPEG q80 (mozjpeg), PNG — палитра.
 *
 * PNG-фото без прозрачности переводим в JPEG: PNG для фотографии — неверный
 * формат, разница в разы. Файл переименовывается, ссылки в разметке и стилях
 * правятся здесь же — иначе получим тихий 404 на картинке.
 *
 * Правило безопасности: результат записывается ТОЛЬКО если он меньше
 * исходного. Пережатие, которое делает файл тяжелее, молча пропускаем.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');

const MAX_SIDE = 2400;
const MIN_BYTES = 100 * 1024; // мелочь не трогаем — только шум в диффе
const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'scripts', 'vendor']);
const CODE_EXT = /\.(html|css|js|jsx|json)$/;

/** Файлы, которые ни на что не влияют: ноль ссылок в коде. Решение Иванны 2026-08-10. */
const DELETE_UNUSED = ['site/img/market-rack.png', 'site/img/ksenia-crop.jpg'];

function walk(dir, test, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, test, out);
    else if (test.test(e.name)) out.push(full);
  }
  return out;
}

const codeFiles = walk(ROOT, CODE_EXT);

/** Сколько раз имя файла встречается в коде (ссылки на картинку). */
function refCount(basename) {
  let n = 0;
  for (const f of codeFiles) {
    const text = fs.readFileSync(f, 'utf8');
    n += text.split(basename).length - 1;
  }
  return n;
}

function replaceRefs(oldName, newName) {
  let files = 0;
  for (const f of codeFiles) {
    const text = fs.readFileSync(f, 'utf8');
    if (!text.includes(oldName)) continue;
    if (!DRY) fs.writeFileSync(f, text.split(oldName).join(newName));
    files += 1;
  }
  return files;
}

const kb = (b) => Math.round(b / 1024);
const rows = [];
let before = 0;
let after = 0;

(async () => {
  // 1. Мёртвый груз
  const removed = new Set();
  for (const rel of DELETE_UNUSED) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const base = path.basename(rel);
    const refs = refCount(base);
    if (refs > 0) {
      console.log(`ПРОПУСК удаления ${rel}: на него ${refs} ссылок — файл используется`);
      continue;
    }
    const size = fs.statSync(abs).size;
    if (!DRY) fs.unlinkSync(abs);
    removed.add(rel);
    rows.push({ file: rel, was: kb(size), now: 0, note: 'удалён — ноль ссылок' });
    before += size;
  }

  // 2. Пережатие
  for (const abs of walk(ROOT, /\.(png|jpe?g)$/i)) {
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    // В dry-run удалённые файлы ещё лежат на диске — иначе они попадут
    // и в список удаления, и в список пережатия, и итог будет завышен.
    if (removed.has(rel)) continue;
    const orig = fs.statSync(abs).size;
    if (orig < MIN_BYTES) continue;

    const img = sharp(abs, { failOn: 'none' });
    const meta = await img.metadata();
    const tooBig = Math.max(meta.width || 0, meta.height || 0) > MAX_SIDE;
    const pipeline = tooBig
      ? img.resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      : img;

    const isPng = /\.png$/i.test(abs);
    // Прозрачность решает формат: с альфой PNG обязателен, без неё — JPEG.
    const hasAlpha = !!meta.hasAlpha;

    let buf;
    let outAbs = abs;
    let renamedFrom = null;

    if (isPng && !hasAlpha) {
      buf = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      outAbs = abs.replace(/\.png$/i, '.jpg');
      renamedFrom = path.basename(abs);
    } else if (isPng) {
      buf = await pipeline.png({ palette: true, quality: 80, effort: 8 }).toBuffer();
    } else {
      buf = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }

    if (buf.length >= orig) {
      // Пережатие не помогло — оставляем как было, чтобы не портить качество зря.
      before += orig;
      after += orig;
      continue;
    }

    if (!DRY) {
      fs.writeFileSync(outAbs, buf);
      if (renamedFrom) fs.unlinkSync(abs);
    }
    let note = tooBig ? `${meta.width}×${meta.height} → ≤${MAX_SIDE}` : '';
    if (renamedFrom) {
      const files = replaceRefs(renamedFrom, path.basename(outAbs));
      note = `${note}${note ? ', ' : ''}PNG→JPEG, ссылок правлено в ${files} файлах`;
    }
    rows.push({ file: rel, was: kb(orig), now: kb(buf.length), note });
    before += orig;
    after += buf.length;
  }

  rows.sort((a, b) => b.was - b.now - (a.was - a.now));
  console.log(`\n${DRY ? '[dry-run] ' : ''}Изменено файлов: ${rows.length}\n`);
  for (const r of rows) {
    console.log(`  ${r.file.padEnd(38)} ${String(r.was).padStart(5)} КБ → ${String(r.now).padStart(5)} КБ  ${r.note}`);
  }
  console.log(
    `\nИтого: ${(before / 1024 / 1024).toFixed(1)} МБ → ${(after / 1024 / 1024).toFixed(1)} МБ ` +
      `(−${((before - after) / 1024 / 1024).toFixed(1)} МБ)`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
