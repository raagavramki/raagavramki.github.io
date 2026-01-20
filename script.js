// ---------- TYPE-WRITER ----------
const txts=["ML Systems Engineer","AI for Healthcare","Researcher (HCI × ML)","Debater"];
let i=0,j=0,c=false;
const el=document.getElementById('type-writer');
function loop(){
  el.textContent=txts[i].substring(0,j);
  if(!c&&j<txts[i].length){j++;setTimeout(loop,90)}
  else if(!c&&j===txts[i].length){c=true;setTimeout(loop,1500)}
  else if(c&&j>0){j--;setTimeout(loop,40)}
  else{c=false;i=(i+1)%txts.length;setTimeout(loop,500)}
}
loop();

// ---------- NAV TOGGLE ----------
const toggle=document.getElementById('nav-toggle');
const menu=document.getElementById('nav-menu');
toggle.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',!open);
  menu.classList.toggle('open');
});

document.querySelectorAll('#nav-menu a').forEach(a=>{
  a.addEventListener('click', ()=>{
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// ---------- FILTER PROJECTS ----------
const buttons=document.querySelectorAll('.filter-buttons button');
const cards=document.querySelectorAll('.project-grid .card');
buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    cards.forEach(c=>{
      const show=filter==='all'||c.dataset.category===filter;
      // don't collapse the grid with display:none; animate opacity instead
      c.classList.toggle('is-hidden', !show);
      if(show) setTimeout(()=>c.classList.add('show'), 10);
    });
  });
});
// initial reveal
window.addEventListener('load',()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.add('show'),i*80)));

// ---------- COPY EMAIL ----------
const emailCard=document.getElementById('email-card');
emailCard.addEventListener('click',e=>{
  e.preventDefault();
  navigator.clipboard.writeText('raagav.ramakrishnan@students.iiit.ac.in').then(()=>{
    const toast=document.createElement('div');
    toast.textContent='Email copied!';
    toast.style.position='fixed';
    toast.style.bottom='20px';
    toast.style.left='50%';
    toast.style.transform='translateX(-50%)';
    toast.style.background='rgba(11,15,20,.8)';
    toast.style.backdropFilter='blur(10px)';
    toast.style.border='1px solid rgba(148,163,184,.22)';
    toast.style.color='#fff';
    toast.style.padding='.6rem 1.2rem';
    toast.style.borderRadius='999px';
    toast.style.zIndex='20000';
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),2000);
  });
});

// ---------- YEAR ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ---------- SCROLL PROGRESS + BACK TO TOP ----------
const progressEl = document.getElementById('scroll-progress');
const topBtn = document.getElementById('to-top');

function onScroll(){
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const p = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
  if (progressEl) progressEl.style.width = `${Math.min(1, Math.max(0, p)) * 100}%`;

  if (topBtn) topBtn.classList.toggle('show', scrollTop > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (topBtn){
  topBtn.addEventListener('click', ()=> window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- SCROLLSPY (ACTIVE NAV) ----------
const sectionIds = ['about','projects','research','experience','contact'];
const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));

function setActive(id){
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

if ('IntersectionObserver' in window && sections.length){
  const spy = new IntersectionObserver((entries)=>{
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b)=> (b.intersectionRatio - a.intersectionRatio))[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.2, 0.35, 0.5] });
  sections.forEach(s => spy.observe(s));
}

// ---------- REVEAL ON SCROLL ----------
const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
if ('IntersectionObserver' in window && revealEls.length){
  const reveal = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('reveal-in');
      reveal.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach(el => reveal.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('reveal-in'));
}
