/* Frankenplatz — список статей на /blog.
   Читает window.FP_BLOG (site/blog-data.js) и рисует карточки.
   Пусто → честная заглушка вместо выдуманных «скоро десять статей».

   Отдельным модулем: страницу может переписать дизайн-система, а логика
   списка переживёт. */
(function () {
  'use strict';

  var CSS = [
    '.fp-blog{display:grid;gap:16px;margin-top:28px}',
    '@media(min-width:760px){.fp-blog{grid-template-columns:1fr 1fr}}',
    '.fp-blog__card{display:flex;flex-direction:column;gap:10px;padding:24px;border-radius:20px;',
    'background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.10);text-decoration:none;',
    'color:inherit;transition:transform .22s,border-color .22s}',
    '.fp-blog__card:hover{transform:translateY(-4px);border-color:rgba(230,180,80,.45)}',
    '.fp-blog__meta{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:12px;color:#9A8BB3}',
    '.fp-blog__tag{color:#E6B450;font-weight:700;letter-spacing:.08em;text-transform:uppercase}',
    '.fp-blog__h{font-family:"Unbounded","Manrope",sans-serif;font-size:19px;font-weight:700;',
    'letter-spacing:-.02em;color:#fff;line-height:1.3;margin:0}',
    '.fp-blog__x{font-size:14.5px;color:#C3B7D4;line-height:1.55;margin:0}',
    '.fp-blog__go{font-size:13.5px;font-weight:700;color:#B98BFF}',
    '.fp-blog__empty{margin-top:26px;padding:26px;border-radius:20px;background:rgba(255,255,255,.04);',
    'border:1px dashed rgba(255,255,255,.16);color:#C3B7D4;font-size:15px;line-height:1.6}'
  ].join('');

  function injectStyle() {
    if (document.getElementById('fp-blog-style')) return;
    var s = document.createElement('style');
    s.id = 'fp-blog-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var MONTHS = ['января','февраля','марта','апреля','мая','июня',
                'июля','августа','сентября','октября','ноября','декабря'];

  function humanDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return '';
    return Number(m[3]) + ' ' + MONTHS[Number(m[2]) - 1] + ' ' + m[1];
  }

  function card(post) {
    var meta = [];
    if (post.tag) meta.push('<span class="fp-blog__tag">' + esc(post.tag) + '</span>');
    if (post.date) meta.push('<span>' + esc(humanDate(post.date)) + '</span>');
    if (post.minutes) meta.push('<span>' + esc(post.minutes) + ' мин чтения</span>');
    return (
      '<a class="fp-blog__card" href="/blog/' + esc(post.slug) + '">' +
      (meta.length ? '<div class="fp-blog__meta">' + meta.join('<span>·</span>') + '</div>' : '') +
      '<h2 class="fp-blog__h">' + esc(post.title) + '</h2>' +
      '<p class="fp-blog__x">' + esc(post.excerpt) + '</p>' +
      '<span class="fp-blog__go">Читать →</span>' +
      '</a>'
    );
  }

  function render() {
    var mount = document.getElementById('blog-list');
    if (!mount) return;
    injectStyle();

    var posts = (window.FP_BLOG || []).filter(function (p) {
      return p && p.slug && p.title;
    });
    // новые сверху, если дата указана
    posts.sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });

    if (!posts.length) {
      mount.innerHTML =
        '<div class="fp-blog__empty">Первые разборы готовим — про штрафы и сроки, ' +
        'регистрацию бизнеса, налоговую декларацию. Появятся здесь. ' +
        'Чтобы не пропустить, подпишись на новости форума в самом низу страницы.</div>';
      return;
    }
    mount.className = 'fp-blog';
    mount.innerHTML = posts.map(card).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
