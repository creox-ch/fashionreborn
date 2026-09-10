/* Типографика: одиночные буквы не остаются в конце строки.
   Предлоги и союзы из одной буквы (в, и, с, у, о, а, я, к, a) склеиваются
   с последующим словом неразрывным пробелом — строка не может закончиться
   висящей буквой. Работает на всех страницах, ничего в разметке не меняет.
   Динамически добавленный текст (каталог, модалки) обрабатывается наблюдателем. */
(function(){
  'use strict';
  var SKIP = /^(SCRIPT|STYLE|PRE|CODE|TEXTAREA|INPUT|SELECT|NOSCRIPT|SVG)$/;
  var NB = '\u00A0';
  // одиночная буква (кириллица/латиница) + пробел -> буква + неразрывный пробел
  var RE = /(^|[\s(«"„\u00A0])([аиксуояжвАИКСУОЯЖВaAiIoO])[ \t\n\r]+(?=[^\s])/g;

  function fix(node){
    var v = node.nodeValue;
    if (!v || v.indexOf(' ') === -1) return;
    var out = v.replace(RE, function(_, pre, ch){ return pre + ch + NB });
    if (out !== v) node.nodeValue = out;
  }

  function walk(root){
    if (!root) return;
    if (root.nodeType === 3) { fix(root); return }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1 && (SKIP.test(root.tagName) || root.hasAttribute('data-no-nbsp'))) return;
    var it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var p = n.parentNode;
        return (p && p.nodeType === 1 && (SKIP.test(p.tagName) || p.closest('[data-no-nbsp]')))
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n, list = [];
    while ((n = it.nextNode())) list.push(n);
    list.forEach(fix);
  }

  window.FP_NBSP = walk;

  function start(){
    walk(document.body);
    if (!window.MutationObserver) return;
    var queue = [], timer = null;
    new MutationObserver(function(muts){
      muts.forEach(function(m){
        if (m.type === 'characterData') queue.push(m.target);
        else for (var i = 0; i < m.addedNodes.length; i++) queue.push(m.addedNodes[i]);
      });
      if (timer) return;
      timer = setTimeout(function(){
        timer = null;
        var batch = queue; queue = [];
        batch.forEach(walk);
      }, 60);
    }).observe(document.body, {childList:true, subtree:true, characterData:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
