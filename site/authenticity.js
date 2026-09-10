/* Проверка подлинности — карточки-шаги: отметки «проверено» и модалка с деталями */
(function(){
  'use strict';
  var KEY='fp-au-checked';
  var grid=document.getElementById('auGrid');
  if(!grid)return;
  var cards=[].slice.call(grid.querySelectorAll('.au-step-card'));
  var counter=document.getElementById('auCount');
  var bar=document.getElementById('auBar');
  var reset=document.getElementById('auReset');
  var modal=document.getElementById('auModal');
  var mNum=document.getElementById('auMNum'),mTitle=document.getElementById('auMTitle'),mBody=document.getElementById('auMBody'),mMark=document.getElementById('auMMark');
  var current=null;

  function read(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
  function write(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
  var state=read();

  function paint(){
    var done=0;
    cards.forEach(function(c){
      var id=c.getAttribute('data-step');
      var on=!!state[id];
      c.classList.toggle('is-done',on);
      var box=c.querySelector('.au-step-card__check');
      if(box){box.setAttribute('aria-pressed',on?'true':'false');box.title=on?'Снять отметку':'Отметить как проверенное'}
      if(on)done++;
    });
    if(counter)counter.innerHTML='Проверено <b>'+done+'</b> из '+cards.length;
    if(bar)bar.style.width=(done/cards.length*100)+'%';
    if(reset)reset.hidden=done===0;
    if(current&&mMark)setMarkLabel(!!state[current]);
  }
  function toggle(id){state[id]=!state[id];if(!state[id])delete state[id];write(state);paint()}
  function setMarkLabel(on){
    mMark.textContent=on?'✓ Проверено':'Отметить как проверенное';
    mMark.classList.toggle('is-done',on);
  }

  function open(card){
    current=card.getAttribute('data-step');
    mNum.textContent=card.getAttribute('data-num')||'';
    mTitle.textContent=card.querySelector('.au-step-card__t').textContent;
    mBody.innerHTML=card.querySelector('.au-full').innerHTML;
    setMarkLabel(!!state[current]);
    modal.classList.add('is-open');
    document.body.style.overflow='hidden';
  }
  function close(){modal.classList.remove('is-open');document.body.style.overflow='';current=null}

  grid.addEventListener('click',function(e){
    var box=e.target.closest('.au-step-card__check');
    if(box){e.preventDefault();toggle(box.closest('.au-step-card').getAttribute('data-step'));return}
    var card=e.target.closest('.au-step-card');
    if(card)open(card);
  });
  grid.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' ')return;
    var card=e.target.closest('.au-step-card');
    if(!card||e.target.closest('.au-step-card__check'))return;
    e.preventDefault();open(card);
  });
  if(modal){
    modal.addEventListener('click',function(e){if(e.target.hasAttribute('data-au-close'))close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
    mMark.addEventListener('click',function(){if(current)toggle(current)});
  }
  if(reset)reset.addEventListener('click',function(){state={};write(state);paint()});
  paint();

  /* мобильный: подсветка карточки-сигнала, оказавшейся в центре экрана */
  var sigs=[].slice.call(document.querySelectorAll('.au-sig'));
  if(sigs.length&&'IntersectionObserver'in window){
    var mq=window.matchMedia('(max-width:959px)');
    var io=null;
    function focusNearest(){
      var mid=window.innerHeight/2,best=null,bd=Infinity;
      sigs.forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.bottom<0||r.top>window.innerHeight){el.classList.remove('is-focus');return}
        var d=Math.abs((r.top+r.bottom)/2-mid);
        if(d<bd){bd=d;best=el}
      });
      sigs.forEach(function(el){el.classList.toggle('is-focus',el===best&&bd<window.innerHeight*0.42)});
    }
    var ticking=false;
    function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(function(){focusNearest();ticking=false})}
    function enable(on){
      if(on){window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);focusNearest()}
      else{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);sigs.forEach(function(el){el.classList.remove('is-focus')})}
    }
    enable(mq.matches);
    (mq.addEventListener?mq.addEventListener.bind(mq,'change'):mq.addListener.bind(mq))(function(e){enable(e.matches)});
  }
})();
