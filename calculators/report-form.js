/* Frankenplatz — email-report form for calculators */
(function(){
  var css='.fp-rep{margin:34px 0 10px;padding:26px 24px;border-radius:18px;background:linear-gradient(135deg,rgba(230,180,80,.10),rgba(185,139,255,.08));border:1px solid rgba(230,180,80,.35)}'+
  '.fp-rep h3{margin:0 0 8px;font-size:20px;color:#fff;font-family:inherit}'+
  '.fp-rep p{margin:0 0 16px;font-size:14.5px;line-height:1.6;color:var(--muted,#C3B7D4)}'+
  '.fp-rep form{display:flex;gap:10px;flex-wrap:wrap}'+
  '.fp-rep input{flex:1 1 220px;padding:13px 15px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font-size:15px;font-family:inherit}'+
  '.fp-rep input:focus{outline:none;border-color:#B98BFF}'+
  '.fp-rep button{padding:13px 22px;border:none;border-radius:999px;font-weight:800;font-size:14.5px;font-family:inherit;color:#2A1A05;background:linear-gradient(135deg,#E6B450,#F5C969);cursor:pointer}'+
  '.fp-rep .fp-rep-forum{display:inline-block;margin-top:14px;font-size:14px;font-weight:700;color:#E6B450;text-decoration:none}'+
  '.fp-rep .fp-rep-forum:hover{text-decoration:underline}'+
  '.fp-rep .ok{font-size:15px;color:#8BE59B;font-weight:700}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var mount=document.getElementById('fp-report');
  if(!mount){mount=document.createElement('div');
    var res=document.getElementById('result')||document.querySelector('.result');
    var cta=document.querySelector('.cta');
    var foot=document.querySelector('.foot,footer');
    if(res){res.appendChild(mount);}
    else if(cta&&cta.parentNode){cta.parentNode.insertBefore(mount,cta);}
    else if(foot&&foot.parentNode){foot.parentNode.insertBefore(mount,foot);}
    else{document.body.appendChild(mount);}}
  var saved=localStorage.getItem('fp_report_email')||'';
  mount.innerHTML='<div class="fp-rep"><h3>Полный расчёт и подробный разбор — на почту</h3>'+
    '<p>Оставь e-mail — пришлём полный расчёт по твоим цифрам и подробную информацию по теме: всё, что осталось «между строк» калькулятора.</p>'+
    '<form><input type="email" required placeholder="Твой e-mail" value="'+saved.replace(/"/g,'&quot;')+'">'+
    '<button type="submit">Получить полный расчёт</button></form>'+
    '<a class="fp-rep-forum" href="/">А узнать больше — на форуме Frankenplatz →</a></div>';
  mount.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
    var em=mount.querySelector('input').value.trim();if(!em)return;
    localStorage.setItem('fp_report_email',em);
    mount.querySelector('.fp-rep').innerHTML='<p class="ok">Готово! Полный расчёт и разбор придут на '+em.replace(/</g,'&lt;')+'.</p>'+
      '<a class="fp-rep-forum" href="/">А узнать больше — на форуме Frankenplatz →</a>';
  });
})();