/* FASHION REBORN — каталог: данные из базы, рендер, фильтры.

   ⚠ ФАЙЛ ЛОГИКИ. Из выгрузки дизайна не брать: до 17.08.2026 здесь лежали 19
   придуманных вещей, и синк вернёт именно их. Каталог тянет настоящие вещи из
   кабинета продавца (шаг 6 ТЗ docs/TZ-market-cabinet.md в репо slswiss-tickets):
   наружу отдаются только одобренные модератором позиции.

   Вёрстка карточки, модалки и фильтров — дизайнерская, ей мы следуем; меняется
   только источник данных и то, чего в демо не было: настоящие фотографии.
*/
(function(){
  'use strict';
  var ENDPOINT='https://slswiss-tickets.vercel.app/api/market/catalog';
  var CATS={clothes:'Одежда',shoes:'Обувь',bags:'Сумки',acc:'Аксессуары'};
  var COND={new:'Новое',ideal:'Идеальное',good:'Хорошее',fair:'Обычное'};
  var AVAIL_M={online:'Онлайн',market:'Онлайн + маркет 27.09'};
  var ITEMS=[];
  function $(s,c){return (c||document).querySelector(s)}
  function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
  var grid=$('#mcGrid'),count=$('#mcCount'),empty=$('#mcEmpty');
  if(!grid)return;
  var state={cat:'all',brand:'all',sizes:[],price:'all',sex:'all',canton:'all',avail:'all',verified:false};

  /* Свой CSS, а не правка market-catalog.css: тот файл приезжает из дизайна и
     синк затрёт добавленное. Здесь ровно то, чего в демо быть не могло, —
     раскладка настоящих фотографий в готовых рамках вёрстки. */
  function injectCss(){
    if(document.getElementById('mc-photo-css'))return;
    var st=document.createElement('style');st.id='mc-photo-css';
    st.textContent=
      /* В сетке кадрируем: карточки держат единый квадрат, иначе ряд «прыгает».
         В модалке — наоборот, вещь должна быть видна целиком. Вертикальное фото
         пальто или сумки в квадрате теряет верх и подол, а решение о покупке
         принимается именно по этой картинке. */
      '.kit .mc-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}'+
      '.mc-modal__main img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}'+
      '.mc-modal__thumb{padding:0;overflow:hidden;border-style:solid;cursor:pointer}'+
      '.mc-modal__thumb img{width:100%;height:100%;object-fit:cover;display:block}'+
      '.mc-modal__thumb.is-on{border-color:var(--gold,#E6B450)}'+
      '.mc-state{margin:0 0 22px;padding:18px 20px;border-radius:14px;line-height:1.6;font-size:15px;'+
      'background:rgba(230,180,80,.10);border:1px solid rgba(230,180,80,.34);color:#F0DCB4}'+
      '.mc-state b{color:#F5C969}';
    document.head.appendChild(st);
  }

  /* Сообщение вместо сетки: каталог ещё пуст или не загрузился. */
  function say(html){
    var box=$('#mcState');
    if(!box){box=document.createElement('p');box.className='mc-state';box.id='mcState';
      var bar=$('.mc-bar')||grid;bar.parentNode.insertBefore(box,bar)}
    box.innerHTML=html;box.hidden=false;
  }
  function hush(){var box=$('#mcState');if(box)box.hidden=true}

  /* Фильтры имеют смысл, только когда есть что фильтровать. */
  function showControls(on){
    var f=$('.mc-filters');if(f)f.style.display=on?'':'none';
    var b=$('.mc-bar');if(b)b.style.display=on?'':'none';
  }

  /* Карточка из базы → то, с чем работают фильтры и рендер.
     Города в схеме продавца нет: фильтр по городу прячется, пока поле не появится. */
  function adapt(it){
    return {no:it.no,cat:it.category,brand:it.brand||'',sex:it.sex||'f',name:it.title||'',
      mat:it.material||'',col:it.color||'',size:it.size||'',cond:it.condition,
      price:it.price,orig:it.originalPrice,avail:it.availability,verified:!!it.verified,
      st:it.state==='available'?'':it.state,note:it.description||'',
      photos:Array.isArray(it.photos)?it.photos:[],seller:it.seller&&it.seller.name?it.seller.name:'',
      city:it.city||''};
  }

  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function money(n){return n==null?'—':String(n).replace(/\.00$/,'')}

  /* Фото вещи: настоящее, если продавец загрузил. Пустой карточки в каталоге
     быть не должно (модерация требует минимум одно фото), но верстаем так,
     чтобы отсутствие картинки не ломало плитку. */
  function photo(it,cls){
    if(!it.photos.length)return '<span>фото готовится</span>';
    return '<img src="'+esc(it.photos[0])+'" alt="'+esc(it.brand+' — '+it.name)+'" loading="lazy" class="'+(cls||'')+'">';
  }

  function card(it,i){
    var a=document.createElement('article');a.className='mc-card';a.setAttribute('data-i',i);a.tabIndex=0;a.setAttribute('role','button');
    a.innerHTML=
      '<div class="mc-ph'+(it.st==='booked'?' is-booked':'')+'">'+photo(it)+
      '<span class="mc-tags"><span class="mc-cond mc-cond--'+it.cond+'">'+(COND[it.cond]||'')+'</span>'+(it.verified?'<span class="mc-verif" title="Чек предоставлен продавцом">✓ Чек</span>':'')+'</span>'+
      (it.st==='booked'?'<span class="mc-stb">Бронь</span>':'')+(it.avail!=='online'?'<span class="mc-mk" title="Вещь будет на маркете 27.09">Маркет · 27.09</span>':'')+'</div>'+
      '<div class="mc-body"><p class="mc-brand">'+esc(it.brand)+'</p>'+
      '<h3 class="mc-name">'+esc(it.name)+'</h3>'+
      '<p class="mc-meta">Материал: <b>'+esc(it.mat||'—')+'</b><br>Цвет: <b>'+esc(it.col||'—')+'</b><br>Размер: <b>'+esc(it.size||'—')+'</b></p>'+
      (it.city?'<p class="mc-city">'+esc(it.city)+'</p>':'')+
      '<div class="mc-foot"><span class="mc-price">'+(it.orig?'<s class="mc-old">'+money(it.orig)+'</s> ':'')+money(it.price)+' <span>CHF</span></span></div>'+
      '<button class="mc-more'+(it.st==='booked'?' mc-more--q':'')+'" type="button">'+(it.st==='booked'?'В очередь':'Подробнее')+'</button></div>';
    return a;
  }
  function priceOk(p){
    if(state.price==='all')return true;
    if(p==null)return false;
    if(state.price==='p1')return p<200;
    if(state.price==='p2')return p>=200&&p<=500;
    return p>500;
  }
  function sizeTags(it){
    var s=it.size||'';var t=[];
    if(it.cat==='shoes'){var n=parseFloat(s);if(n)t.push('sh'+n);return t}
    var m=s.match(/^(\d{2,3})/);if(m)t.push('eu'+m[1]);
    var l=s.match(/\((XS|S|M|L|XL|XXL|\d+\s*лет|\d+\s*год[а-я]*)\)/i);
    if(l)t.push('int'+l[1].replace(/\s/g,'').toUpperCase());
    else if(/^(XS|S|M|L|XL|XXL)$/.test(s))t.push('int'+s);
    return t;
  }
  function sizeOk(it){
    if(!state.sizes.length)return true;
    var tags=sizeTags(it);
    return state.sizes.some(function(sz){return tags.indexOf(sz)>=0});
  }
  function render(){
    grid.innerHTML='';
    var shown=ITEMS.filter(function(it){
      return it.st!=='sold'&&
             (state.cat==='all'||it.cat===state.cat)&&
             (state.brand==='all'||it.brand===state.brand)&&
             sizeOk(it)&&
             (state.canton==='all'||it.city===state.canton)&&
             (state.avail==='all'||(state.avail==='market'?it.avail==='market':it.avail==='online'))&&
             (!state.verified||it.verified)&&
             (state.sex==='all'||it.sex===state.sex||(state.sex!=='k'&&it.sex==='u'))&&
             priceOk(it.price);
    });
    shown.forEach(function(it){grid.appendChild(card(it,ITEMS.indexOf(it)))});
    var total=ITEMS.filter(function(it){return it.st!=='sold'}).length;
    if(count)count.innerHTML='Показано <b>'+shown.length+'</b> из '+total+' вещей';
    if(empty)empty.style.display=shown.length?'none':'block';
  }

  /* Селекты, которые собираются из данных: бренды и города. Пока продавец не
     указывает город, список пуст — прячем фильтр, а не показываем пустой. */
  function fillSelect(sel,values){
    if(!sel)return false;
    values.filter(function(v,i,arr){return v&&arr.indexOf(v)===i}).sort().forEach(function(v){
      var o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o);
    });
    return sel.options.length>1;
  }

  /* чипы категорий */
  $$('#mcCats .mc-chip').forEach(function(c){
    c.addEventListener('click',function(){
      $$('#mcCats .mc-chip').forEach(function(x){x.classList.remove('is-on')});
      c.classList.add('is-on');state.cat=c.getAttribute('data-cat');var cs=$('#mcCatSel');if(cs)cs.value=state.cat;render();
    });
  });
  var bSel=$('#mcBrand');
  if(bSel)bSel.addEventListener('change',function(){state.brand=bSel.value;render()});
  var xSel=$('#mcSex');if(xSel)xSel.addEventListener('change',function(){state.sex=xSel.value;render()});
  var sizePanel=$('#mcSizes');
  if(sizePanel){
    sizePanel.addEventListener('click',function(e){
      var b=e.target.closest('button[data-sz]');if(!b)return;
      b.classList.toggle('is-on');
      var v=b.getAttribute('data-sz');var i=state.sizes.indexOf(v);
      if(i>=0)state.sizes.splice(i,1);else state.sizes.push(v);
      var lbl=$('#mcSizeBtn .mc-szcount');if(lbl)lbl.textContent=state.sizes.length?' · '+state.sizes.length:'';
      render();
    });
    var sb=$('#mcSizeBtn');
    if(sb)sb.addEventListener('click',function(e){e.stopPropagation();sizePanel.classList.toggle('is-open');sb.classList.toggle('is-open')});
    document.addEventListener('click',function(e){if(sizePanel.classList.contains('is-open')&&!sizePanel.contains(e.target)&&!e.target.closest('#mcSizeBtn')){sizePanel.classList.remove('is-open');var sb2=$('#mcSizeBtn');if(sb2)sb2.classList.remove('is-open')}});
  }
  var kSel=$('#mcCanton');
  if(kSel)kSel.addEventListener('change',function(){state.canton=kSel.value;render()});
  var aSel=$('#mcAvailF');if(aSel)aSel.addEventListener('change',function(){state.avail=aSel.value;render()});
  var vChk=$('#mcVerifF');if(vChk)vChk.addEventListener('change',function(){state.verified=vChk.checked;render()});
  var clr=$('#mcClear');
  if(clr)clr.addEventListener('click',function(){
    state.cat='all';state.brand='all';state.sizes=[];state.price='all';state.sex='all';state.canton='all';state.avail='all';state.verified=false;
    $$('#mcCats .mc-chip').forEach(function(x){x.classList.toggle('is-on',x.getAttribute('data-cat')==='all')});
    var cs=$('#mcCatSel');if(cs)cs.value='all';
    ['mcSex','mcBrand','mcPrice','mcCanton','mcAvailF'].forEach(function(id){var el=$('#'+id);if(el)el.value='all'});
    if(vChk)vChk.checked=false;
    $$('#mcSizes button.is-on').forEach(function(b){b.classList.remove('is-on')});
    var lbl=$('#mcSizeBtn .mc-szcount');if(lbl)lbl.textContent='';
    render();
  });
  var pSel=$('#mcPrice');if(pSel)pSel.addEventListener('change',function(){state.price=pSel.value;render()});
  var cSel=$('#mcCatSel');
  if(cSel)cSel.addEventListener('change',function(){
    state.cat=cSel.value;
    $$('#mcCats .mc-chip').forEach(function(x){x.classList.toggle('is-on',x.getAttribute('data-cat')===cSel.value)});
    render();
  });
  var gv=$('#mcView');
  if(gv){
    var applyView=function(v){
      grid.classList.toggle('is-list',v==='list');
      $$('#mcView button').forEach(function(b){b.classList.toggle('is-on',b.getAttribute('data-view')===v)});
      try{localStorage.setItem('mcView',v)}catch(e){}
    };
    gv.addEventListener('click',function(e){var b=e.target.closest('button[data-view]');if(b)applyView(b.getAttribute('data-view'))});
    var sv;try{sv=localStorage.getItem('mcView')}catch(e){}
    if(sv==='list')applyView('list');
  }
  var ft=$('#mcFToggle');if(ft)ft.addEventListener('click',function(){ft.closest('.mc-filters').classList.toggle('is-open')});
  var fd=$('#mcFDone');if(fd)fd.addEventListener('click',function(){var f=fd.closest('.mc-filters');if(f)f.classList.remove('is-open')});
  document.addEventListener('click',function(e){var f=document.querySelector('.mc-filters.is-open');if(f&&!f.contains(e.target))f.classList.remove('is-open')});

  /* модалка товара */
  var modal=$('#mcModal');
  function gallery(it){
    var main=$('.mc-modal__main');
    if(main)main.innerHTML=it.photos.length?photo(it):'<span id="mcMPh">фото готовится</span>';
    var thumbs=$('.mc-modal__thumbs');
    if(!thumbs)return;
    thumbs.innerHTML='';
    if(it.photos.length<2){thumbs.hidden=true;return}
    thumbs.hidden=false;
    it.photos.forEach(function(src,i){
      var d=document.createElement('div');d.className='mc-modal__thumb'+(i?'':' is-on');
      d.innerHTML='<img src="'+esc(src)+'" alt="" loading="lazy">';
      d.addEventListener('click',function(){
        if(main)main.innerHTML='<img src="'+esc(src)+'" alt="'+esc(it.brand+' — '+it.name)+'">';
        $$('.mc-modal__thumb',thumbs).forEach(function(t){t.classList.remove('is-on')});
        d.classList.add('is-on');
      });
      thumbs.appendChild(d);
    });
  }
  /* Скрытое поле формы: заводим сами, чтобы не трогать разметку страницы —
     её приносит выгрузка дизайна и перезапишет при следующем синке. */
  function stash(form,id,value){
    var el=form.querySelector('#'+id);
    if(!el){el=document.createElement('input');el.type='hidden';el.id=id;form.appendChild(el)}
    el.value=value==null?'':String(value);
  }
  function openModal(it){
    if(!modal)return;
    gallery(it);
    $('#mcMBrand').textContent=it.brand;
    $('#mcMName').textContent=it.name;
    $('#mcMPrice').innerHTML=(it.orig?'<s class="mc-old">'+money(it.orig)+' CHF</s> ':'')+money(it.price)+' <small>CHF</small>';
    var av=$('#mcMAvail');if(av)av.innerHTML=AVAIL_M[it.avail]||'—';
    var vf=$('#mcMVerif');if(vf)vf.style.display=it.verified?'inline-flex':'none';
    $('#mcMCond').textContent=COND[it.cond]||'—';
    $('#mcMSize').textContent=it.size||'—';
    $('#mcMCat').textContent=CATS[it.cat]||'—';
    var mm=$('#mcMMat');if(mm)mm.textContent=it.mat||'—';
    var mc=$('#mcMCol');if(mc)mc.textContent=it.col||'—';
    /* Город продавца в базе не хранится — строку прячем целиком,
       а не показываем «Город: —» на каждой вещи. */
    var ct=$('#mcMCity');if(ct){ct.textContent=it.city||'';var row=ct.closest('.mc-modal__spec');if(row)row.style.display=it.city?'':'none'}
    $('#mcMNote').textContent=it.note||'Все данные — состояние, чеки, качество — видно на фотографиях. Осталось что-то неясным — задай вопрос продавцу.';
    /* Продавец: только имя. Рейтингов и истории продаж у нас нет — в демо они
       были придуманы, и возвращать их до появления реальной статистики нельзя. */
    var se=$('#mcMSeller');
    if(se){se.innerHTML=it.seller?'Продавец: <b>'+esc(it.seller)+'</b>':'';se.style.display=it.seller?'block':'none'}
    /* Что за вещь — в скрытые поля формы, а не выскабливанием из вёрстки.
       Раньше заявка собирала текст карточки, и в письмо приезжало
       «Продавец: Продавец: Иванна» и «Цена в каталоге: 1000 CHF 500 CHF»
       (зачёркнутая и настоящая цена слиплись). Кода вещи не было вовсе —
       при сотне позиций по заявке не понять, о чём речь. */
    var bf=$('#mcBook');
    if(bf){
      bf.hidden=true;var ok=$('#mcBookOk');if(ok)ok.hidden=true;
      stash(bf,'mcBItem',it.no||'');
      stash(bf,'mcBSellerN',it.seller||'');
      stash(bf,'mcBPriceC',money(it.price)+' CHF');
      stash(bf,'mcBLink',location.origin+location.pathname+(it.no?'#'+it.no:''));
    }
    var bb=$('#mcMBook');if(bb){bb.querySelector('span').textContent=it.st==='booked'?'Встать в очередь':'Забронировать';bb.querySelector('small').textContent=it.st==='booked'?'если бронь сорвётся — ты следующая':'без оплаты · ни к чему не обязывает';bb.setAttribute('data-mode',it.st==='booked'?'queue':'book')}
    modal.classList.add('is-open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){if(!modal)return;modal.classList.remove('is-open');document.body.style.overflow=''}
  if(modal){
    modal.addEventListener('click',function(e){if(e.target.hasAttribute('data-mc-close'))closeModal()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});
  }
  grid.addEventListener('click',function(e){
    var c=e.target.closest('.mc-card');if(!c)return;
    openModal(ITEMS[+c.getAttribute('data-i')]);
  });
  grid.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' ')return;
    var c=e.target.closest('.mc-card');if(!c)return;
    e.preventDefault();openModal(ITEMS[+c.getAttribute('data-i')]);
  });
  var bookBtn=$('#mcMBook'),offerBtn=$('#mcMOffer'),bookF=$('#mcBook');
  function showBook(mode){if(!bookF)return;bookF.hidden=false;
    $('#mcBookT').textContent=mode==='offer'?'Предложи свою цену':mode==='q'?'Вопрос продавцу':mode==='queue'?'Очередь на вещь':'Бронь на маркете · 27.09';
    $('#mcBPrice').hidden=mode!=='offer';
    if(mode==='offer')$('#mcBPrice').setAttribute('required','');else $('#mcBPrice').removeAttribute('required');
    var nt=$('#mcBNote');if(nt){nt.placeholder=mode==='q'?'Твой вопрос — замеры, состояние, чек':'Комментарий (необязательно)';if(mode==='q')nt.setAttribute('required','');else nt.removeAttribute('required')}
  }
  if(bookBtn)bookBtn.addEventListener('click',function(){showBook(bookBtn.getAttribute('data-mode')==='queue'?'queue':'book')});
  if(offerBtn)offerBtn.addEventListener('click',function(){showBook('offer')});
  var qBtn=$('#mcMAsk');if(qBtn)qBtn.addEventListener('click',function(){showBook('q')});
  /* Демо-отправка формы #mcBook УДАЛЕНА намеренно (2026-08-11).
     Она прятала поля и писала «Готово! Передали продавцу» — не отправляя ничего:
     тихая потеря заявок. Живая отправка живёт в site/forum-form.js
     (form_key='market-item'), он же добавляет согласие и honeypot.
     ⚠ При ре-синке дизайна эту строку снова вырезать. */

  /* Загрузка каталога. Три исхода, и каждый должен быть honest-состоянием, а не
     пустой сеткой: вещи есть, вещей ещё нет, каталог не отвечает. */
  injectCss();
  showControls(false);
  say('Загружаем каталог…');
  fetch(ENDPOINT,{headers:{accept:'application/json'}})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
    .then(function(data){
      if(!data||!data.ok||!Array.isArray(data.items))throw new Error('bad payload');
      ITEMS=data.items.map(adapt);
      window.MC_ITEMS=ITEMS;
      if(!ITEMS.length){
        showControls(false);
        if(empty)empty.style.display='none';
        /* Не обещаем того, чего нет: продавцов пока может не быть вовсе.
           Говорим, чего ждать, и даём то, что человек может сделать сейчас. */
        say('<b>Каталог наполняется.</b> Первые вещи появятся здесь, когда продавцы загрузят их, '+
            'а мы проверим каждую. Хочешь продать свою — <a href="/brand-market">вот как это устроено</a>.');
        return;
      }
      hush();
      showControls(true);
      /* Селекты собираем по тому, что реально показывается: проданное из сетки
         уходит, и бренд, оставшийся только у проданной вещи, дал бы фильтр,
         который всегда возвращает пустоту. */
      var live=ITEMS.filter(function(i){return i.st!=='sold'});
      var brandsOk=fillSelect(bSel,live.map(function(i){return i.brand}));
      if(bSel&&!brandsOk)bSel.style.display='none';
      var cityOk=fillSelect(kSel,live.map(function(i){return i.city}));
      if(kSel&&!cityOk)kSel.style.display='none';
      render();
    })
    .catch(function(e){
      showControls(false);
      if(empty)empty.style.display='none';
      say('<b>Каталог сейчас не открывается.</b> Это на нашей стороне — обнови страницу через минуту. '+
          'Если не поможет, напиши нам, и мы починим.');
      if(window.console&&console.warn)console.warn('[market-catalog]',e);
    });
})();
