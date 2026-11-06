const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('.nav a')];
const nav=document.querySelector('.nav');
const toggle=document.querySelector('.menu-toggle');
function showPage(){
  const requested=location.hash.replace('#','')||'home';
  const page=document.getElementById(requested)||document.getElementById('home');
  pages.forEach(item=>item.classList.toggle('active',item===page));
  links.forEach(link=>link.classList.toggle('active',link.dataset.page===page.id));
  nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'smooth'});
}
window.addEventListener('hashchange',showPage);
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
links.forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
showPage();
