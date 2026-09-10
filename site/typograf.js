/* FP typograf: короткие слова (1–2 буквы) не остаются висеть в конце строки —
   после них ставится неразрывный пробел. Работает поверх React-рендера
   через MutationObserver, идемпотентно. */
(function(){
  var RX = /(^|[\s («"„—–-])([А-Яа-яЁёA-Za-z]{1,2}) +(?=\S)/g;
  var SKIP = {SCRIPT:1, STYLE:1, TEXTAREA:1, INPUT:1, SELECT:1, CODE:1, PRE:1};
  function fix(t){
    t = t.replace(/ ([—–]) /g, ' $1 '); /* тире не начинает строку */
    t = t.replace(/(\d) (?=\d)/g, '$1 ');    /* 22 000 не разрывается */
    t = t.replace(/ №/g, ' №');            /* День №2 не разрывается */
    var prev;
    do { prev = t; t = t.replace(RX, function(m, pre, w){ return pre + w + ' '; }); } while (t !== prev);
    return t;
  }
  function walk(node){
    if (node.nodeType === 3){
      var v = node.nodeValue;
      if (v && / /.test(v)){
        var nv = fix(v);
        if (nv !== v) node.nodeValue = nv;
      }
      return;
    }
    if (node.nodeType !== 1 || SKIP[node.nodeName]) return;
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }
  var scheduled = false;
  function run(){ scheduled = false; var r = document.getElementById('root'); if (r) walk(r); }
  function schedule(){ if (!scheduled){ scheduled = true; (window.requestAnimationFrame || setTimeout)(run, 0); } }
  function init(){
    var r = document.getElementById('root');
    if (!r){ setTimeout(init, 150); return; }
    new MutationObserver(schedule).observe(r, {childList:true, subtree:true, characterData:true});
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
