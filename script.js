const header=document.querySelector(".header");
const menuButton=document.querySelector(".menu-button");
const mobileMenu=document.querySelector(".mobile-menu");
const reveals=document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>25);
});

menuButton.addEventListener("click",()=>{
  mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link=>{
  link.addEventListener("click",()=>mobileMenu.classList.remove("open"));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

reveals.forEach(el=>observer.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});

const visual=document.querySelector(".hero-visual");

if(window.matchMedia("(pointer:fine)").matches){
  visual.addEventListener("mousemove",e=>{
    const rect=visual.getBoundingClientRect();
    const x=(e.clientX-rect.left-rect.width/2)/rect.width;
    const y=(e.clientY-rect.top-rect.height/2)/rect.height;

    document.querySelector(".core").style.transform=`translate(${x*16}px,${y*16}px)`;
    document.querySelector(".orbit-one").style.marginLeft=`${x*12}px`;
    document.querySelector(".orbit-one").style.marginTop=`${y*12}px`;

    document.querySelectorAll(".floating-info").forEach((card,index)=>{
      const amount=(index+1)*5;
      card.style.marginLeft=`${x*amount}px`;
      card.style.marginTop=`${y*amount}px`;
    });
  });

  visual.addEventListener("mouseleave",()=>{
    document.querySelector(".core").style.transform="";
    document.querySelector(".orbit-one").style.marginLeft="";
    document.querySelector(".orbit-one").style.marginTop="";

    document.querySelectorAll(".floating-info").forEach(card=>{
      card.style.marginLeft="";
      card.style.marginTop="";
    });
  });
}

document.querySelectorAll(".price-card").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const rect=card.getBoundingClientRect();
    const x=((e.clientX-rect.left)/rect.width)*100;
    const y=((e.clientY-rect.top)/rect.height)*100;
    card.style.background=`radial-gradient(circle at ${x}% ${y}%,rgba(0,151,255,.12),transparent 35%),linear-gradient(145deg,rgba(7,24,43,.94),rgba(2,8,17,.98))`;
  });

  card.addEventListener("mouseleave",()=>{
    card.style.background="";
  });
});