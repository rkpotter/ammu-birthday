const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
qsa('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>qs(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});
qsa('.reveal').forEach(el=>revealObserver.observe(el));

window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
  qs('#progressBar').style.width=`${Math.min(100,pct)}%`;
},{passive:true});

const dialog=qs('#waistDialog');
qs('#waistBtn')?.addEventListener('click',()=>dialog.showModal());
qsa('.dialog-close,.dialog-ok').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

qsa('.quiz').forEach(btn=>btn.addEventListener('click',()=>{
  qsa('.quiz').forEach(b=>b.disabled=true);
  const ans=qs('#quizAnswer'); ans.hidden=false;
  requestAnimationFrame(()=>ans.scrollIntoView({behavior:'smooth',block:'center'}));
}));

qs('#surpriseBtn')?.addEventListener('click',()=>{
  const s=qs('#surprise'); s.hidden=false;
  qs('#surpriseBtn').textContent='💖';
  makeHearts(18);
  setTimeout(()=>s.scrollIntoView({behavior:'smooth',block:'center'}),120);
});

function makeHearts(n=10){
  for(let i=0;i<n;i++){
    const h=document.createElement('span');
    h.textContent=['❤️','💗','💕','💖'][Math.floor(Math.random()*4)];
    h.style.cssText=`position:fixed;left:${Math.random()*100}vw;bottom:-30px;font-size:${18+Math.random()*22}px;z-index:99;pointer-events:none;transition:transform ${3+Math.random()*2}s linear,opacity ${3+Math.random()*2}s linear;`;
    document.body.appendChild(h);
    requestAnimationFrame(()=>{h.style.transform=`translate(${(Math.random()-.5)*120}px,-110vh) rotate(${Math.random()*180}deg)`;h.style.opacity='0'});
    setTimeout(()=>h.remove(),5200);
  }
}

setInterval(()=>{if(document.visibilityState==='visible' && Math.random()>.72)makeHearts(1)},4500);
