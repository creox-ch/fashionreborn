/* Оказия — интерфейс страницы: вкладки, чипы, подвкладки, свап направления.

   Пришло из дизайна (okaziya). Демо-отправку форм отсюда убрали намеренно:
   реальная отправка в /api/forms живёт в site/okaziya-form.js — как и на
   остальных страницах форума (site/forum-form.js, site/speaker-form.js).
   ⚠ При ре-синке дизайна: снова убрать инлайн-демо и оставить эту пару файлов. */
(function(){
  function $(s,c){return (c||document).querySelector(s)}
  function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}

  /* вкладки */
  var views=$$('.ok-view'), tabs=$$('.ok-tab[data-view]');
  function show(v){
    views.forEach(function(x){x.classList.toggle('is-on',x.id==='ok-'+v)});
    tabs.forEach(function(t){t.classList.toggle('is-on',t.getAttribute('data-view')===v)});
    if(history.replaceState)history.replaceState(null,'','#'+v);
    window.scrollTo({top:0});
  }
  tabs.forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();show(t.getAttribute('data-view'))})});
  $$('[data-goto]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();show(b.getAttribute('data-goto'))})});
  // Живые разделы: доска / разместить / заявка. «Мои заявки» и «Профиль» скрыты
  // до появления аккаунтов — вёрстка осталась в разметке, но в навигацию не входит.
  var LIVE=['board','place','request'];
  var h=(location.hash||'').replace('#','');
  show(LIVE.indexOf(h)>-1?h:'board');

  /* чипы: data-single = эксклюзив в группе, иначе мультивыбор */
  $$('.ok-fgroup').forEach(function(g){
    var single=g.hasAttribute('data-single');
    $$('.ok-chip',g).forEach(function(c){
      c.addEventListener('click',function(){
        if(single){$$('.ok-chip',g).forEach(function(x){x.classList.remove('is-on')});c.classList.add('is-on')}
        else c.classList.toggle('is-on');
      });
    });
  });

  /* подвкладки «Мои заявки» */
  $$('.ok-subtabs .ok-tab[data-sub]').forEach(function(t){
    t.addEventListener('click',function(){
      $$('.ok-subtabs .ok-tab').forEach(function(x){x.classList.remove('is-on')});
      t.classList.add('is-on');
      var k=t.getAttribute('data-sub');
      $$('[data-subview]').forEach(function(v){v.style.display=v.getAttribute('data-subview')===k?'':'none'});
    });
  });

  /* «Это я / Другой человек» — прячем адресные поля */
  $$('[data-me-toggle]').forEach(function(g){
    var target=$(g.getAttribute('data-me-toggle'));
    $$('.ok-chip',g).forEach(function(c){
      c.addEventListener('click',function(){
        if(target)target.style.display=(c.getAttribute('data-me')==='1')?'none':'';
      });
    });
  });

  /* мобильный select ↔ чипы той же группы */
  $$('.ok-fgroup .ok-fsel').forEach(function(sel){
    sel.addEventListener('change',function(){
      var g=sel.closest('.ok-fgroup');
      $$('.ok-chip',g).forEach(function(c){c.classList.toggle('is-on',c.textContent.trim()===sel.value)});
    });
  });

  /* свап направления */
  var swap=$('#okSwap');
  if(swap)swap.addEventListener('click',function(){
    var a=$('#okFrom'),b=$('#okTo'),v=a.value;a.value=b.value;b.value=v;
  });
})();
