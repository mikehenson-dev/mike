
document.addEventListener('DOMContentLoaded',()=>{

const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('nav a[data-page]')];
const nav=document.querySelector('nav');
const menu=document.querySelector('.menu');

function show(id){
if(!pages.some(p=>p.id===id))id='home';

pages.forEach(p=>p.classList.toggle('active',p.id===id));
links.forEach(a=>a.classList.toggle('active',a.dataset.page===id));

nav.classList.remove('open');
menu.textContent='☰';

window.scrollTo({top:0,behavior:'smooth'});
}

document.addEventListener('click',e=>{
const a=e.target.closest('a[href^="#"]');
if(!a)return;

const id=a.getAttribute('href').slice(1);
if(!pages.some(p=>p.id===id))return;

e.preventDefault();

if(location.hash!=='#'+id){
history.pushState(null,'','#'+id);
}

show(id);
});

menu.addEventListener('click',()=>{
nav.classList.toggle('open');
});

addEventListener('popstate',()=>{
show(location.hash.slice(1)||'home');
});

show(location.hash.slice(1)||'home');

document.getElementById('year').textContent=new Date().getFullYear();

const c=document.getElementById('stars');
const ctx=c.getContext('2d');
let dots=[];

function resize(){
let d=Math.min(devicePixelRatio||1,2);

c.width=innerWidth*d;
c.height=innerHeight*d;
c.style.width=innerWidth+'px';
c.style.height=innerHeight+'px';

ctx.setTransform(d,0,0,d,0,0);

dots=Array.from(
{length:Math.min(100,Math.floor(innerWidth/10))},
()=>({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
r:Math.random()+.25,
a:Math.random()*.55+.15,
v:Math.random()*.18+.04
})
);
}

function draw(){
ctx.clearRect(0,0,innerWidth,innerHeight);

dots.forEach(s=>{
ctx.beginPath();
ctx.fillStyle=`rgba(170,220,255,${s.a})`;
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.y-=s.v;

if(s.y<0){
s.y=innerHeight;
s.x=Math.random()*innerWidth;
}
});

requestAnimationFrame(draw);
}

resize();
addEventListener('resize',resize);

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
draw();
}

});

