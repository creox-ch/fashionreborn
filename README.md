# Frankenplatz 2026 — сайт форума

Статический сайт: HTML + React (in-browser Babel), без сборки.

## Структура
- `index.html` — главная
- `day1.html`, `day2.html` — программы дней
- `speakers.html` — страница для спикеров
- `calculators/` — бесплатные калькуляторы (budget, rent-vs-buy, pension, taxes, shares)
- `styles.css` + `tokens/` — дизайн-токены
- `site/` — компоненты (ds.bundle.js), страницы (.jsx), стили, локальные React/Babel в `site/vendor/`

## Публикация на GitHub Pages
Залейте содержимое этой папки в корень репозитория, включите Pages (branch: main, folder: /). Никакой сборки не требуется.
