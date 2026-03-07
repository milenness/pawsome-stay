import{a as k,A as le,S as L,b as Y,P as z,N as ce,K as de}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const ue="global-loader";let v=0;function b(e){return!(e!=null&&e.skipGlobalLoader)}function X(){return document.getElementById(ue)}function P(){const e=X();e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function T(){const e=X();e&&(v>0||(e.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{P()});window.addEventListener("load",()=>{setTimeout(()=>{T()},600)});const me=window.fetch;window.fetch=async(...e)=>{v++,P();try{return await me(...e)}finally{v--,setTimeout(()=>{T()},200)}};k.interceptors.request.use(e=>(b(e)&&(v++,P()),e));k.interceptors.response.use(e=>(b(e.config)&&(v--,setTimeout(()=>{T()},200)),e),e=>(b(e.config)&&(v--,setTimeout(()=>{T()},200)),Promise.reject(e)));const pe=k.create;k.create=function(...e){const s=pe.apply(this,e);return s.interceptors.request.use(t=>(b(t)&&(v++,P()),t)),s.interceptors.response.use(t=>(b(t.config)&&(v--,setTimeout(()=>{T()},200)),t),t=>(b(t.config)&&(v--,setTimeout(()=>{T()},200)),Promise.reject(t))),s};new le("#faq-accordion",{duration:300,showMultiple:!1});const fe=document.querySelector(".mobile-menu"),J=document.querySelector(".menu-btn-open"),Q=document.querySelector(".menu-btn-close"),ge=document.querySelectorAll(".mob-menu-link, .mob-menu-button"),$=()=>fe.classList.toggle("is-open"),F=()=>document.body.classList.toggle("is-scroll-disabled"),ve=()=>{$(),F()};J.addEventListener("click",$);Q.addEventListener("click",$);J.addEventListener("click",F);Q.addEventListener("click",F);ge.forEach(e=>{e.addEventListener("click",ve)});const R=k.create({baseURL:"https://paw-hut.b.goit.study/api"}),ye="/categories",we="/animals",Le="/orders",he="/feedbacks";async function be(){const{data:e}=await R.get(ye);return e}async function Ee(e=null,s=1,t=9){const r={page:s,limit:t};e&&(r.categoryId=e);const{data:n}=await R.get(we,{params:r,skipGlobalLoader:!0});return n}const Te=async e=>{const{data:s}=await R.post(Le,e);return s},W=async(e=1,s=12)=>{const{data:t}=await R.get(he,{params:{page:e,limit:s},skipGlobalLoader:!0});return t};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".order-form"),s=document.querySelector(".order-overlay"),t=e==null?void 0:e.querySelector('button[type="submit"]');let r=null;window.openOrderModal=function(o){if(!o){console.warn("Спроба відкрити форму без ID тварини");return}r=o,s.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",i)};function n(){s.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",i),setTimeout(()=>{r=null,e&&(e.reset(),e.classList.remove("was-validated"))},250)}function i(o){o.key==="Escape"&&n()}s.addEventListener("click",o=>{(o.target.closest(".close-btn")||o.target===s)&&n()}),e&&e.addEventListener("submit",async o=>{var g,a;if(o.preventDefault(),e.classList.add("was-validated"),!e.checkValidity())return;if(!r){L.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const f=new FormData(e),u=Object.fromEntries(f.entries()),w={name:u.name.trim(),phone:u.phone.trim(),comment:u.comment?u.comment.trim():"Хочу стати другом",animalId:r};try{t&&(t.disabled=!0,t.textContent="Надсилаємо..."),await Te(w),await L.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),n()}catch(m){const ae=((a=(g=m.response)==null?void 0:g.data)==null?void 0:a.message)||"Помилка при відправці.";L.fire({title:"Помилка!",text:ae,icon:"error"})}finally{t&&(t.disabled=!1,t.textContent="Надіслати")}})});const l={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function N(e,s){L.close(),L.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:t=>{t.style.borderRadius="16px",t.style.border="1px solid var(--color-scheme-1-border)",t.style.fontFamily="var(--font-family)",t.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",t.style.lineHeight="1.4",t.style.fontSize="15px",t.addEventListener("mouseenter",L.stopTimer),t.addEventListener("mouseleave",L.resumeTimer)}})}const c={success(e){N("success",e)},failure(e){N("error",e)},warning(e){N("warning",e)},info(e){N("info",e)}},d=document.querySelector(".custom-cursor"),Z=document.querySelector(".nav-logo"),ee=document.querySelector(".footer__logo");document.addEventListener("mousemove",e=>{d.style.left=e.clientX+"px",d.style.top=e.clientY+"px"});Z.addEventListener("mouseenter",()=>{d.classList.add("beating","small"),d.classList.remove("large"),d.style.transform="translate(-50%, -50%) scale(1)"});Z.addEventListener("mouseleave",()=>{d.classList.remove("beating","small"),d.style.transform="translate(-50%, -50%) scale(0)"});ee.addEventListener("mouseenter",()=>{d.classList.add("beating","large"),d.classList.remove("small"),d.style.transform="translate(-50%, -50%) scale(1)"});ee.addEventListener("mouseleave",()=>{d.classList.remove("beating","large"),d.style.transform="translate(-50%, -50%) scale(0)"});const h=document.querySelector(".pet-list"),p=document.querySelector(".load-more-pets-btn"),E=document.querySelector(".load-more-pets-btn-wrapper");let S=1,B=null,O=!1,y=[],D=te();function Se(e){return y.find(s=>String(s._id||s.id)===String(e))}function Oe(e,s){return Array.from(new Map([...e,...s].map(t=>[String(t._id||t.id),t])).values())}function x(){h.innerHTML="",S=1,B=null,y=[],p.classList.add("is-hidden"),E.classList.add("is-hidden")}function Ae(){return h.querySelectorAll(".pet-list-item").length>0}function ke(e){E&&(e?E.classList.remove("is-hidden"):E.classList.add("is-hidden"))}const Ne=()=>{const e=window.innerWidth;return e>=768&&e<1440};function te(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const Me=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function Be(){return`
    <li class="pet-list-loader">
      <div class="loader-content">
        <div class="paw">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="pad"></div>
        </div>
      </div>
    </li>
  `}function j(){const e=h.querySelector(".pet-list-loader");e&&e.remove()}function Pe(e){return e.map(({_id:s,name:t,age:r,gender:n,image:i,species:o,categories:f,behavior:u})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${t}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${o}</span>
        <h3 class="pet-info-name">${t}</h3>

        <ul class="pet-info-categories-list">
          ${f.map(({name:w})=>`<li class="pet-info-categories-list-item">${w}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${r} роки/років</span>
          <span class="pet-gender">${n}</span>
        </div>

        <p class="pet-about">${u}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}function se(e){const t=Ne()&&e&&y.length%2!==0?y.slice(0,-1):y;h.innerHTML=Pe(t)}function Re(){if(!y.length||O)return;const e=te();if(e===D)return;D=e;const s=!p.classList.contains("is-hidden");se(s)}async function K(e=null,s=!1){if(!O){s&&(S=1,B=e,h.innerHTML="",y=[],E&&E.classList.add("is-hidden")),h.insertAdjacentHTML("beforeend",Be()),O=!0;try{const t=Me(),{animals:r,totalItems:n}=await Ee(B,S,t);if(!Array.isArray(r)||r.length===0){x(),c.failure(l.PETS_EMPTY);return}y=Oe(y,r);const i=Math.ceil(n/t),o=S<i;j(),se(o),!o||r.length===0?p&&p.classList.add("is-hidden"):p&&p.classList.remove("is-hidden")}catch(t){if(!t.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR),j(),p&&p.classList.add("is-hidden")}finally{O=!1,ke(Ae())}}}p&&p.addEventListener("click",async()=>{if(O)return;S+=1,await K(B);const e=h.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});window.addEventListener("resize",Re);const q=document.querySelector(".categories-list");be().then(e=>{if(!Array.isArray(e)||e.length===0){x(),c.failure(l.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:t,name:r})=>`<li class="categories-list-item" data-category-id="${t}">${r}</li>`);q.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),K()}).catch(e=>{if(x(),!e.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR)});q.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const t=q.querySelector(".active");t&&t.classList.remove("active"),s.classList.add("active");const r=s.dataset.categoryId||null;K(r,!0)});const ne="/pawsome-stay/assets/icons-4wqh6OW-.svg",A=document.querySelector(".pet-modal-overlay");function _e(e){const t={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",r=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${ne}#close"></use>
        </svg>
      </button>

      <div class="pet-modal-content">
        <div class="pet-modal-image-wrapper">
          <img src="${e.image}" alt="${e.name}" class="pet-modal-image">
        </div>

        <div class="pet-modal-info">
          <div class="pet-modal-header">
            <span class="pet-modal-category-badge">${t}</span>
            <h2 class="pet-modal-name">${e.name}</h2>
            <div class="pet-modal-meta">
              <span class="pet-modal-meta-item">${e.age}</span>
              <span class="pet-modal-meta-item">${e.gender}</span>
            </div>
          </div>

          <div class="pet-modal-sections">
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Опис:</h3>
              <p class="pet-modal-section-text">${e.description||"Опис відсутній"}</p>
            </div>
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Здоров'я:</h3>
              <p class="pet-modal-section-text">${e.healthStatus||"Здоровий(а)"}</p>
            </div>
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Поведінка:</h3>
              <p class="pet-modal-section-text">${e.behavior||"Дружелюбний(а)"}</p>
            </div>
          </div>

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${r}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `}function Ie(e){const s=Se(e);s?(A.innerHTML=_e(s),xe()):c.failure(l.LOAD_FAIL)}function xe(){A.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",re)}function C(){A.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",re),setTimeout(()=>{A.innerHTML=""},300)}function re(e){e.key==="Escape"&&C()}document.addEventListener("click",e=>{const s=e.target,t=s.closest(".pet-more-info");if(t){const n=t.closest(".pet-list-item");n!=null&&n.id&&Ie(n.id);return}if(s.closest(".pet-modal-close")||s===A){C();return}const r=s.closest("#petModalActionBtn");if(r){const n=r.dataset.id;C(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function qe(){const e=document.querySelector("[data-scroll-top]");if(!e)return;let s=!1,t=null,r=window.scrollY,n=null,i=0;const o=250,f=220,u=a=>{const m=Date.now();m-i<f||(i=m,e.classList.remove("dir-up","dir-down"),e.classList.add(a==="up"?"dir-up":"dir-down"),e.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>e.classList.remove("tracks-burst"),o))},w=()=>{const a=window.scrollY>400;if(a&&!s){e.classList.add("show"),e.classList.add("dir-up"),s=!0;return}!a&&s&&(e.classList.remove("show","tracks-burst"),clearTimeout(t),s=!1)},g=()=>{n||(n=requestAnimationFrame(()=>{n=null,w();const a=window.scrollY,m=a-r;s&&Math.abs(m)>=12&&(m>0?u("up"):u("down")),r=a}))};window.addEventListener("scroll",g,{passive:!0}),w(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",qe);const Ce=document.getElementById("stories-loading"),$e=document.getElementById("stories-slider-wrap"),Fe=document.getElementById("stories-swiper"),_=document.getElementById("stories-swiper-wrapper"),Ke=document.getElementById("stories-pagination"),oe=document.getElementById("stories-btn-prev"),ie=document.getElementById("stories-btn-next");function U(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function We(e){let t=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let r=1;r<=5;r++){let n;e>=r?n="star-filled":e>=r-.5?n="star-half":n="star-outline",t+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${ne}#${n}"></use>
        </svg>
      </span>`}return t+="</div>",t}function V(e){const s=parseFloat(e.rating??e.rate)||5,t=U(e.comment||e.text||e.description||""),r=U(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${We(s)}
        <p class="review-text">${t}</p>
        <p class="review-author">${r}</p>
      </article>
    </li>`}function M(e){oe.disabled=e.isBeginning,ie.disabled=e.isEnd}function H(){return window.innerWidth>=768?2:1}function G(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function I(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}async function De(){let e=1,s=0,t=!1,r=[];try{const o=await W(e);if(r=I(o),!r.length){c.info(l.NO_FEEDBACKS);return}s=Number(o==null?void 0:o.total)||r.length}catch(o){if(!o.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR),s=0}_.innerHTML=r.map(V).join(""),Ce.classList.add("is-hidden"),$e.classList.add("is-visible");const n=new Y(Fe,{modules:[z],slidesPerView:H(),spaceBetween:G(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:Ke,clickable:!0,dynamicBullets:!0},on:{init(o){M(o)},slideChange(o){M(o),i(o)}}});async function i(o){if(t)return;const f=_.children.length;if(f>=s)return;const u=Math.ceil(Number(o.params.slidesPerView)||1);if(o.activeIndex+u>=o.slides.length){t=!0;try{const g=e+1,a=await W(g);if(!a||!I(a).length){c.info(l.NO_MORE_FEEDBACKS);return}const m=I(a);if(s=Number(a==null?void 0:a.total)||s,!m.length){s=f;return}_.insertAdjacentHTML("beforeend",m.map(V).join("")),e=g,o.update()}catch(g){if(!g.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR)}finally{t=!1,M(o)}}}window.addEventListener("resize",()=>{n.params.slidesPerView=H(),n.params.spaceBetween=G(),n.update(),M(n)}),oe.addEventListener("click",()=>n.slidePrev()),ie.addEventListener("click",async()=>{n.isEnd&&await i(n),n.slideNext()})}De();new Y(".about-swiper",{modules:[ce,z,de],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-swiper-container .swiper-pagination",clickable:!0,dynamicBullets:!0},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});
//# sourceMappingURL=index.js.map
