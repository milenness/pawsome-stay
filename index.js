import{a as A,A as oe,S as L,b as Y,P as V,N as ie,K as ae}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const le="global-loader";let v=0;function h(e){return!(e!=null&&e.skipGlobalLoader)}function X(){return document.getElementById(le)}function P(){const e=X();e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function E(){const e=X();e&&(v>0||(e.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{P()});window.addEventListener("load",()=>{setTimeout(()=>{E()},600)});const ce=window.fetch;window.fetch=async(...e)=>{v++,P();try{return await ce(...e)}finally{v--,setTimeout(()=>{E()},200)}};A.interceptors.request.use(e=>(h(e)&&(v++,P()),e));A.interceptors.response.use(e=>(h(e.config)&&(v--,setTimeout(()=>{E()},200)),e),e=>(h(e.config)&&(v--,setTimeout(()=>{E()},200)),Promise.reject(e)));const de=A.create;A.create=function(...e){const s=de.apply(this,e);return s.interceptors.request.use(t=>(h(t)&&(v++,P()),t)),s.interceptors.response.use(t=>(h(t.config)&&(v--,setTimeout(()=>{E()},200)),t),t=>(h(t.config)&&(v--,setTimeout(()=>{E()},200)),Promise.reject(t))),s};new oe("#faq-accordion",{duration:300,showMultiple:!1});const ue=document.querySelector(".mobile-menu"),z=document.querySelector(".menu-btn-open"),J=document.querySelector(".menu-btn-close"),me=document.querySelectorAll(".mob-menu-link, .mob-menu-button"),C=()=>ue.classList.toggle("is-open"),F=()=>document.body.classList.toggle("is-scroll-disabled"),pe=()=>{C(),F()};z.addEventListener("click",C);J.addEventListener("click",C);z.addEventListener("click",F);J.addEventListener("click",F);me.forEach(e=>{e.addEventListener("click",pe)});const _=A.create({baseURL:"https://paw-hut.b.goit.study/api"}),fe="/categories",ge="/animals",ve="/orders",ye="/feedbacks";async function Le(){const{data:e}=await _.get(fe);return e}async function we(e=null,s=1,t=9){const r={page:s,limit:t};e&&(r.categoryId=e);const{data:n}=await _.get(ge,{params:r,skipGlobalLoader:!0});return n}const he=async e=>{const{data:s}=await _.post(ve,e);return s},K=async(e=1,s=12)=>{const{data:t}=await _.get(ye,{params:{page:e,limit:s},skipGlobalLoader:!0});return t};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".order-form"),s=document.querySelector(".order-overlay"),t=e==null?void 0:e.querySelector('button[type="submit"]');let r=null;window.openOrderModal=function(o){if(!o){console.warn("Спроба відкрити форму без ID тварини");return}r=o,s.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",i)};function n(){s.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",i),setTimeout(()=>{r=null,e&&(e.reset(),e.classList.remove("was-validated"))},250)}function i(o){o.key==="Escape"&&n()}s.addEventListener("click",o=>{(o.target.closest(".close-btn")||o.target===s)&&n()}),e&&e.addEventListener("submit",async o=>{var f,a;if(o.preventDefault(),e.classList.add("was-validated"),!e.checkValidity())return;if(!r){L.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const p=new FormData(e),u=Object.fromEntries(p.entries()),y={name:u.name.trim(),phone:u.phone.trim(),comment:u.comment?u.comment.trim():"Хочу стати другом",animalId:r};try{t&&(t.disabled=!0,t.textContent="Надсилаємо..."),await he(y),await L.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),n()}catch(m){const re=((a=(f=m.response)==null?void 0:f.data)==null?void 0:a.message)||"Помилка при відправці.";L.fire({title:"Помилка!",text:re,icon:"error"})}finally{t&&(t.disabled=!1,t.textContent="Надіслати")}})});const l={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function N(e,s){L.close(),L.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:t=>{t.style.borderRadius="16px",t.style.border="1px solid var(--color-scheme-1-border)",t.style.fontFamily="var(--font-family)",t.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",t.style.lineHeight="1.4",t.style.fontSize="15px",t.addEventListener("mouseenter",L.stopTimer),t.addEventListener("mouseleave",L.resumeTimer)}})}const c={success(e){N("success",e)},failure(e){N("error",e)},warning(e){N("warning",e)},info(e){N("info",e)}},d=document.querySelector(".custom-cursor"),Q=document.querySelector(".nav-logo"),Z=document.querySelector(".footer__logo");document.addEventListener("mousemove",e=>{d.style.left=e.clientX+"px",d.style.top=e.clientY+"px"});Q.addEventListener("mouseenter",()=>{d.classList.add("beating","small"),d.classList.remove("large"),d.style.transform="translate(-50%, -50%) scale(1)"});Q.addEventListener("mouseleave",()=>{d.classList.remove("beating","small"),d.style.transform="translate(-50%, -50%) scale(0)"});Z.addEventListener("mouseenter",()=>{d.classList.add("beating","large"),d.classList.remove("small"),d.style.transform="translate(-50%, -50%) scale(1)"});Z.addEventListener("mouseleave",()=>{d.classList.remove("beating","large"),d.style.transform="translate(-50%, -50%) scale(0)"});const w=document.querySelector(".pet-list"),g=document.querySelector(".load-more-pets-btn"),b=document.querySelector(".load-more-pets-btn-wrapper");let S=1,B=null,M=!1,O=[];function be(e){return O.find(s=>String(s._id||s.id)===String(e))}function Ee(e,s){return Array.from(new Map([...e,...s].map(t=>[String(t._id||t.id),t])).values())}function x(){w.innerHTML="",S=1,B=null,O=[],g.classList.add("is-hidden"),b.classList.add("is-hidden")}function Se(){return w.querySelectorAll(".pet-list-item").length>0}function Oe(e){b&&(e?b.classList.remove("is-hidden"):b.classList.add("is-hidden"))}const Te=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function Ae(){return`
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
  `}function W(){const e=w.querySelector(".pet-list-loader");e&&e.remove()}function Ne(e){return e.map(({_id:s,name:t,age:r,gender:n,image:i,species:o,categories:p,behavior:u})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${t}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${o}</span>
        <h3 class="pet-info-name">${t}</h3>

        <ul class="pet-info-categories-list">
          ${p.map(({name:y})=>`<li class="pet-info-categories-list-item">${y}</li>`).join("")}
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
  `).join("")}async function D(e=null,s=!1){if(!M){s&&(S=1,B=e,w.innerHTML="",O=[],b&&b.classList.add("is-hidden")),w.insertAdjacentHTML("beforeend",Ae()),M=!0;try{const t=Te(),{animals:r,totalItems:n}=await we(B,S,t);if(!Array.isArray(r)||r.length===0){x(),c.failure(l.PETS_EMPTY);return}W(),w.insertAdjacentHTML("beforeend",Ne(r)),O=Ee(O,r);const i=Math.ceil(n/t);S>=i||r.length===0?g&&g.classList.add("is-hidden"):g&&g.classList.remove("is-hidden")}catch(t){if(!t.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR),W(),g&&g.classList.add("is-hidden")}finally{M=!1,Oe(Se())}}}g&&g.addEventListener("click",async()=>{if(M)return;S+=1,await D(B);const e=w.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});const q=document.querySelector(".categories-list");Le().then(e=>{if(!Array.isArray(e)||e.length===0){x(),c.failure(l.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:t,name:r})=>`<li class="categories-list-item" data-category-id="${t}">${r}</li>`);q.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),D()}).catch(e=>{if(x(),!e.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR)});q.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const t=q.querySelector(".active");t&&t.classList.remove("active"),s.classList.add("active");const r=s.dataset.categoryId||null;D(r,!0)});const ee="/pawsome-stay/assets/icons-4wqh6OW-.svg",T=document.querySelector(".pet-modal-overlay");function ke(e){const t={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",r=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${ee}#close"></use>
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
  `}function Me(e){const s=be(e);s?(T.innerHTML=ke(s),Be()):c.failure(l.LOAD_FAIL)}function Be(){T.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",te)}function $(){T.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",te),setTimeout(()=>{T.innerHTML=""},300)}function te(e){e.key==="Escape"&&$()}document.addEventListener("click",e=>{const s=e.target,t=s.closest(".pet-more-info");if(t){const n=t.closest(".pet-list-item");n!=null&&n.id&&Me(n.id);return}if(s.closest(".pet-modal-close")||s===T){$();return}const r=s.closest("#petModalActionBtn");if(r){const n=r.dataset.id;$(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function Pe(){const e=document.querySelector("[data-scroll-top]");if(!e)return;let s=!1,t=null,r=window.scrollY,n=null,i=0;const o=250,p=220,u=a=>{const m=Date.now();m-i<p||(i=m,e.classList.remove("dir-up","dir-down"),e.classList.add(a==="up"?"dir-up":"dir-down"),e.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>e.classList.remove("tracks-burst"),o))},y=()=>{const a=window.scrollY>400;if(a&&!s){e.classList.add("show"),e.classList.add("dir-up"),s=!0;return}!a&&s&&(e.classList.remove("show","tracks-burst"),clearTimeout(t),s=!1)},f=()=>{n||(n=requestAnimationFrame(()=>{n=null,y();const a=window.scrollY,m=a-r;s&&Math.abs(m)>=12&&(m>0?u("up"):u("down")),r=a}))};window.addEventListener("scroll",f,{passive:!0}),y(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Pe);const _e=document.getElementById("stories-loading"),Re=document.getElementById("stories-slider-wrap"),Ie=document.getElementById("stories-swiper"),R=document.getElementById("stories-swiper-wrapper"),xe=document.getElementById("stories-pagination"),se=document.getElementById("stories-btn-prev"),ne=document.getElementById("stories-btn-next");function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function qe(e){let t=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let r=1;r<=5;r++){let n;e>=r?n="star-filled":e>=r-.5?n="star-half":n="star-outline",t+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${ee}#${n}"></use>
        </svg>
      </span>`}return t+="</div>",t}function U(e){const s=parseFloat(e.rating??e.rate)||5,t=j(e.comment||e.text||e.description||""),r=j(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${qe(s)}
        <p class="review-text">${t}</p>
        <p class="review-author">${r}</p>
      </article>
    </li>`}function k(e){se.disabled=e.isBeginning,ne.disabled=e.isEnd}function H(){return window.innerWidth>=768?2:1}function G(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function I(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}async function $e(){let e=1,s=0,t=!1,r=[];try{const o=await K(e);if(r=I(o),!r.length){c.info(l.NO_FEEDBACKS);return}s=Number(o==null?void 0:o.total)||r.length}catch(o){if(!o.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR),s=0}R.innerHTML=r.map(U).join(""),_e.classList.add("is-hidden"),Re.classList.add("is-visible");const n=new Y(Ie,{modules:[V],slidesPerView:H(),spaceBetween:G(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:xe,clickable:!0,dynamicBullets:!0},on:{init(o){k(o)},slideChange(o){k(o),i(o)}}});async function i(o){if(t)return;const p=R.children.length;if(p>=s)return;const u=Math.ceil(Number(o.params.slidesPerView)||1);if(o.activeIndex+u>=o.slides.length){t=!0;try{const f=e+1,a=await K(f);if(!a||!I(a).length){c.info(l.NO_MORE_FEEDBACKS);return}const m=I(a);if(s=Number(a==null?void 0:a.total)||s,!m.length){s=p;return}R.insertAdjacentHTML("beforeend",m.map(U).join("")),e=f,o.update()}catch(f){if(!f.response){c.failure(l.NETWORK);return}c.failure(l.UNKNOWN_ERROR)}finally{t=!1,k(o)}}}window.addEventListener("resize",()=>{n.params.slidesPerView=H(),n.params.spaceBetween=G(),n.update(),k(n)}),se.addEventListener("click",()=>n.slidePrev()),ne.addEventListener("click",async()=>{n.isEnd&&await i(n),n.slideNext()})}$e();new Y(".about-swiper",{modules:[ie,V,ae],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-swiper-container .swiper-pagination",clickable:!0,dynamicBullets:!0},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});
//# sourceMappingURL=index.js.map
