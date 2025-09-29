// ---------- TYPE-WRITER ----------
const txts=["Machine-Learning Engineer","Researcher", "Debater"];
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
      c.style.display=show?'block':'none';
      if(show)setTimeout(()=>c.classList.add('show'),50);
      else c.classList.remove('show');
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
    toast.style.background='var(--primary)';
    toast.style.color='#fff';
    toast.style.padding='.6rem 1.2rem';
    toast.style.borderRadius='var(--radius)';
    toast.style.zIndex='200';
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),2000);
  });
});
