import{a as S,A as fe,S as y,b as se,P as oe,N as ge,K as Le}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const t={cursor:document.querySelector(".cursor"),customCursor:document.querySelector(".custom-cursor"),navLogo:document.querySelector(".nav-logo"),footerLogo:document.querySelector(".footer__logo"),mobileMenu:document.querySelector(".mobile-menu"),menuBtnOpen:document.querySelector(".menu-btn-open"),menuBtnClose:document.querySelector(".menu-btn-close"),menuLinks:document.querySelectorAll(".mob-menu-link, .mob-menu-button"),orderForm:document.querySelector(".order-form"),orderOverlay:document.querySelector(".order-overlay"),petModalOverlay:document.querySelector(".pet-modal-overlay"),scrollToTopBtn:document.querySelector("[data-scroll-top]"),storiesLoadingEl:document.getElementById("stories-loading"),storiesSliderWrap:document.getElementById("stories-slider-wrap"),storiesSwiperEl:document.getElementById("stories-swiper"),storiesWrapperEl:document.getElementById("stories-swiper-wrapper"),storiesPaginationEl:document.getElementById("stories-pagination"),storiesBtnPrev:document.getElementById("stories-btn-prev"),storiesBtnNext:document.getElementById("stories-btn-next"),categoriesList:document.querySelector(".categories-list"),petList:document.querySelector(".pet-list"),petListLoadMoreBtn:document.querySelector(".load-more-pets-btn"),petListLoadMoreBtnWrapper:document.querySelector(".load-more-pets-btn-wrapper"),globalLoader:document.getElementById("global-loader"),devTeamBtn:document.querySelector(".dev-team-btn"),devTeamModalOverlay:document.querySelector(".dev-team-modal-overlay")};let L=0;function b(e){return!(e!=null&&e.skipGlobalLoader)}function P(){t.globalLoader&&(t.globalLoader.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function E(){t.globalLoader&&(L>0||(t.globalLoader.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{P()});window.addEventListener("load",()=>{setTimeout(()=>{E()},600)});const ve=window.fetch;window.fetch=async(...e)=>{L++,P();try{return await ve(...e)}finally{L--,setTimeout(()=>{E()},200)}};S.interceptors.request.use(e=>(b(e)&&(L++,P()),e));S.interceptors.response.use(e=>(b(e.config)&&(L--,setTimeout(()=>{E()},200)),e),e=>(b(e.config)&&(L--,setTimeout(()=>{E()},200)),Promise.reject(e)));const he=S.create;S.create=function(...e){const s=he.apply(this,e);return s.interceptors.request.use(o=>(b(o)&&(L++,P()),o)),s.interceptors.response.use(o=>(b(o.config)&&(L--,setTimeout(()=>{E()},200)),o),o=>(b(o.config)&&(L--,setTimeout(()=>{E()},200)),Promise.reject(o))),s};new fe("#faq-accordion",{duration:300,showMultiple:!1});const D=()=>t.mobileMenu.classList.toggle("is-open"),K=()=>document.body.classList.toggle("is-scroll-disabled"),ye=()=>{D(),K()};t.menuBtnOpen.addEventListener("click",D);t.menuBtnClose.addEventListener("click",D);t.menuBtnOpen.addEventListener("click",K);t.menuBtnClose.addEventListener("click",K);t.menuLinks.forEach(e=>{e.addEventListener("click",ye)});const C=S.create({baseURL:"https://paw-hut.b.goit.study/api"}),be="/categories",Ee="/animals",we="/orders",Te="/feedbacks";async function Me(){const{data:e}=await C.get(be);return e}async function Se(e=null,s=1,o=9){const r={page:s,limit:o};e&&(r.categoryId=e);const{data:n}=await C.get(Ee,{params:r,skipGlobalLoader:!0});return n}const Be=async e=>{const{data:s}=await C.post(we,e);return s},G=async(e=1,s=12)=>{const{data:o}=await C.get(Te,{params:{page:e,limit:s},skipGlobalLoader:!0});return o},c={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",ORDER_SUCCESS_TITLE:"Заявку успішно надіслано!",ORDER_SUCCESS_TEXT:"Ми зв’яжемося з вами найближчим часом.",ORDER_ERROR:"Не вдалося надіслати заявку. Щось пішло не так. Спробуйте ще раз або пізніше.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function O(e,s){y.close(),y.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:o=>{o.style.borderRadius="16px",o.style.border="1px solid var(--color-scheme-1-border)",o.style.fontFamily="var(--font-family)",o.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",o.style.lineHeight="1.4",o.style.fontSize="15px",o.addEventListener("mouseenter",y.stopTimer),o.addEventListener("mouseleave",y.resumeTimer)}})}const p={success(e){O("success",e)},failure(e){O("error",e)},warning(e){O("warning",e)},info(e){O("info",e)}};document.addEventListener("DOMContentLoaded",()=>{var n;const e=(n=t.orderForm)==null?void 0:n.querySelector('button[type="submit"]');let s=null;window.openOrderModal=function(i){if(!i){console.warn("Спроба відкрити форму без ID тварини");return}s=i,t.orderOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",r)};function o(){t.orderOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",r),setTimeout(()=>{s=null,t.orderForm&&(t.orderForm.reset(),t.orderForm.classList.remove("was-validated"))},250)}function r(i){i.key==="Escape"&&o()}t.orderOverlay.addEventListener("click",i=>{(i.target.closest(".close-btn")||i.target===t.orderOverlay)&&o()}),t.orderForm&&t.orderForm.addEventListener("submit",async i=>{var h,u;if(i.preventDefault(),t.orderForm.classList.add("was-validated"),!t.orderForm.checkValidity())return;const a=new FormData(t.orderForm),d=Object.fromEntries(a.entries()),v={name:d.name.trim(),phone:d.phone.trim(),comment:d.comment?d.comment.trim():"Хочу стати другом",animalId:s};try{e&&(e.disabled=!0,e.textContent="Надсилаємо..."),await Be(v),await y.fire({title:c.ORDER_SUCCESS_TITLE,text:c.ORDER_SUCCESS_TEXT,icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(m){const B=((u=(h=m.response)==null?void 0:h.data)==null?void 0:u.message)||c.ORDER_ERROR;y.fire({title:"Помилка!",text:B,icon:"error"})}finally{e&&(e.disabled=!1,e.textContent="Надіслати")}})});document.addEventListener("mousemove",e=>{t.cursor.style.left=e.clientX+"px",t.cursor.style.top=e.clientY+"px"});t.navLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","small"),t.cursor.classList.remove("large"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.navLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","small"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});t.footerLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","large"),t.cursor.classList.remove("small"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.footerLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","large"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});const ne="petsByCategoryCache",$=1,Oe=1e3*60*30;let f=null,M=!1,l=[],g=null,w=0,T=1,Y=re();function Ae(e){return l.find(s=>String(s._id||s.id)===String(e))}function V(e,s){return Array.from(new Map([...e,...s].map(o=>[String(o._id||o.id),o])).values())}function q(){t.petList.innerHTML="",f=null,l=[],g=null,w=0,T=1,t.petListLoadMoreBtn.classList.add("is-hidden"),t.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function A(){return t.petList.querySelectorAll(".pet-list-item").length>0}function k(e){t.petListLoadMoreBtnWrapper&&(e?t.petListLoadMoreBtnWrapper.classList.remove("is-hidden"):t.petListLoadMoreBtnWrapper.classList.add("is-hidden"))}const ke=()=>{const e=window.innerWidth;return e>=768&&e<1440};function re(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const Ie=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function Pe(){return`
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
  `}function R(){const e=t.petList.querySelector(".pet-list-loader");e&&e.remove()}function ie(e){return e||"__all__"}function x(){return{version:$,categories:{}}}function Ce(e){const s=x();if(!e||typeof e!="object")return s;if(e.version===$&&e.categories&&typeof e.categories=="object")return e;if(e.version!==void 0||e.categories!==void 0)return s;const r=Object.entries(e).reduce((n,[i,a])=>(!a||!Array.isArray(a.animals)||(n[i]={animals:a.animals,totalItems:Number.isFinite(a.totalItems)?a.totalItems:null,updatedAt:0}),n),{});return{version:$,categories:r}}function Ne(e){return!e||!Number.isFinite(e.updatedAt)?!1:Date.now()-e.updatedAt<Oe}function ae(){try{const e=localStorage.getItem(ne);if(!e)return x();const s=JSON.parse(e);return Ce(s)}catch{return x()}}function le(e){try{localStorage.setItem(ne,JSON.stringify(e))}catch{}}function N(e){const s=ae(),o=ie(e),r=s.categories[o];return!r||!Array.isArray(r.animals)?{animals:[],totalItems:null}:Ne(r)?{animals:r.animals,totalItems:Number.isFinite(r.totalItems)?r.totalItems:null}:(delete s.categories[o],le(s),{animals:[],totalItems:null})}function _e(e,s,o=null){const r=ae(),n=ie(e),i=r.categories[n],a=Array.isArray(i==null?void 0:i.animals)?i.animals:[],d=V(a,s);return r.categories[n]={animals:d,totalItems:Number.isFinite(o)&&o>=0?o:(i==null?void 0:i.totalItems)??null,updatedAt:Date.now()},le(r),r.categories[n]}function H(e){const{animals:s,totalItems:o}=N(f),r=l.length,n=s.length>r,i=Number.isFinite(g)&&g>=0?g:o,a=Number.isFinite(i)&&r<Number(i);return n||a?!0:r>0&&r%e===0}function X(e){f=e,l=[],g=null,w=0,T=1}function z(e){const{animals:s,totalItems:o}=N(f);if(!s.length)return!1;l=s.slice(0,e),g=o,w=1,T=w+1;const r=H(e);return _(r),t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.toggle("is-hidden",!r),!0}function Re(e){const{animals:s}=N(f);if(s.length<=l.length)return!1;const o=s.slice(l.length,l.length+e);if(!o.length)return!1;l=V(l,o),w+=1,T=w+1;const r=H(e);return _(r),t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.toggle("is-hidden",!r),!0}function Fe(e){return e.map(({_id:s,name:o,age:r,gender:n,image:i,species:a,categories:d,behavior:v})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${o}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${a}</span>
        <h3 class="pet-info-name">${o}</h3>

        <ul class="pet-info-categories-list">
          ${d.map(({name:h})=>`<li class="pet-info-categories-list-item">${h}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${r} роки/років</span>
          <span class="pet-gender">${n}</span>
        </div>

        <p class="pet-about">${v}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}function _(e){const o=ke()&&e&&l.length%2!==0?l.slice(0,-1):l;t.petList.innerHTML=Fe(o)}function $e(){if(!l.length||M)return;const e=re();if(e===Y)return;Y=e;const s=!t.petListLoadMoreBtn.classList.contains("is-hidden");_(s)}async function j(e=null,s=!1){if(M)return;const o=Ie();if(!s&&l.length===0&&f===null&&e===null&&(X(e),z(o))){k(A());return}if(s&&(X(e),t.petList.innerHTML="",t.petListLoadMoreBtnWrapper&&t.petListLoadMoreBtnWrapper.classList.add("is-hidden"),z(o))){k(A());return}if(!s&&l.length>0&&Re(o)){k(A());return}t.petList.insertAdjacentHTML("beforeend",Pe()),M=!0;try{const{animals:n,totalItems:i}=await Se(f,T,o);if(!Array.isArray(n)||n.length===0){if(R(),l.length>0){t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden");return}q(),p.failure(c.PETS_EMPTY);return}const a=_e(f,n,i);l=V(l,n),g=Number.isFinite(i)?i:a.totalItems,T+=1;const d=H(o);R(),_(d),!d||n.length===0?t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden"):t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.remove("is-hidden")}catch(n){if(R(),!n.response){p.failure(c.NETWORK);return}p.failure(c.UNKNOWN_ERROR),t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden")}finally{M=!1,k(A())}}t.petListLoadMoreBtn&&t.petListLoadMoreBtn.addEventListener("click",async()=>{if(M)return;const{animals:e,totalItems:s}=N(f),o=Number.isFinite(g)&&g>=0?g:s;if(Number.isFinite(o)&&l.length>=o){t.petListLoadMoreBtn.classList.add("is-hidden");return}await j(f);const r=t.petList.querySelector(".pet-list-item");if(r){const{height:n}=r.getBoundingClientRect();window.scrollBy({top:n,behavior:"smooth"})}});window.addEventListener("resize",$e);Me().then(e=>{if(!Array.isArray(e)||e.length===0){q(),p.failure(c.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:o,name:r})=>`<li class="categories-list-item" data-category-id="${o}">${r}</li>`);t.categoriesList.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),j()}).catch(e=>{if(q(),!e.response){p.failure(c.NETWORK);return}p.failure(c.UNKNOWN_ERROR)});t.categoriesList.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const o=t.categoriesList.querySelector(".active");o&&o.classList.remove("active"),s.classList.add("active");const r=s.dataset.categoryId||null;j(r,!0)});const U="/pawsome-stay/assets/icons-Dk5vhMk4.svg";function qe(e){const o={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",r=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${U}#close"></use>
        </svg>
      </button>

      <div class="pet-modal-content">
        <div class="pet-modal-image-wrapper">
          <img src="${e.image}" alt="${e.name}" class="pet-modal-image">
        </div>

        <div class="pet-modal-info">
          <div class="pet-modal-header">
            <span class="pet-modal-category-badge">${o}</span>
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
  `}function xe(e){const s=Ae(e);s?(t.petModalOverlay.innerHTML=qe(s),We()):p.failure(c.LOAD_FAIL)}function We(){t.petModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",de)}function W(){t.petModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",de),setTimeout(()=>{t.petModalOverlay.innerHTML=""},300)}function de(e){e.key==="Escape"&&W()}document.addEventListener("click",e=>{const s=e.target,o=s.closest(".pet-more-info");if(o){const n=o.closest(".pet-list-item");n!=null&&n.id&&xe(n.id);return}if(s.closest(".pet-modal-close")||s===t.petModalOverlay){W();return}const r=s.closest("#petModalActionBtn");if(r){const n=r.dataset.id;W(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function De(){if(!t.scrollToTopBtn)return;let e=!1,s=null,o=window.scrollY,r=null,n=0;const i=250,a=220,d=u=>{const m=Date.now();m-n<a||(n=m,t.scrollToTopBtn.classList.remove("dir-up","dir-down"),t.scrollToTopBtn.classList.add(u==="up"?"dir-up":"dir-down"),t.scrollToTopBtn.classList.add("tracks-burst"),clearTimeout(s),s=setTimeout(()=>t.scrollToTopBtn.classList.remove("tracks-burst"),i))},v=()=>{const u=window.scrollY>400;if(u&&!e){t.scrollToTopBtn.classList.add("show"),t.scrollToTopBtn.classList.add("dir-up"),e=!0;return}!u&&e&&(t.scrollToTopBtn.classList.remove("show","tracks-burst"),clearTimeout(s),e=!1)},h=()=>{r||(r=requestAnimationFrame(()=>{r=null,v();const u=window.scrollY,m=u-o;e&&Math.abs(m)>=12&&(m>0?d("up"):d("down")),o=u}))};window.addEventListener("scroll",h,{passive:!0}),v(),t.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",De);function J(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ke(e){let o=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let r=1;r<=5;r++){let n;e>=r?n="star-filled":e>=r-.5?n="star-half":n="star-outline",o+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${U}#${n}"></use>
        </svg>
      </span>`}return o+="</div>",o}function Q(e){const s=parseFloat(e.rating??e.rate)||5,o=J(e.comment||e.text||e.description||""),r=J(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Ke(s)}
        <p class="review-text">${o}</p>
        <p class="review-author">${r}</p>
      </article>
    </li>`}function I(e){t.storiesBtnPrev.disabled=e.isBeginning,t.storiesBtnNext.disabled=e.isEnd}function Z(){return window.innerWidth>=768?2:1}function ee(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function F(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}async function Ve(){let e=1,s=0,o=!1,r=[];try{const a=await G(e);if(r=F(a),!r.length){p.info(c.NO_FEEDBACKS);return}s=Number(a==null?void 0:a.total)||r.length}catch(a){if(!a.response){p.failure(c.NETWORK);return}p.failure(c.UNKNOWN_ERROR),s=0}t.storiesWrapperEl.innerHTML=r.map(Q).join(""),t.storiesLoadingEl.classList.add("is-hidden"),t.storiesSliderWrap.classList.add("is-visible");const n=new se(t.storiesSwiperEl,{modules:[oe],slidesPerView:Z(),spaceBetween:ee(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:t.storiesPaginationEl,clickable:!0,dynamicBullets:!0},on:{init(a){I(a)},slideChange(a){I(a),i(a)}}});async function i(a){if(o)return;const d=t.storiesWrapperEl.children.length;if(d>=s)return;const v=Math.ceil(Number(a.params.slidesPerView)||1);if(a.activeIndex+v>=a.slides.length){o=!0;try{const u=e+1,m=await G(u);if(!m||!F(m).length){p.info(c.NO_MORE_FEEDBACKS);return}const B=F(m);if(s=Number(m==null?void 0:m.total)||s,!B.length){s=d;return}t.storiesWrapperEl.insertAdjacentHTML("beforeend",B.map(Q).join("")),e=u,a.update()}catch(u){if(!u.response){p.failure(c.NETWORK);return}p.failure(c.UNKNOWN_ERROR)}finally{o=!1,I(a)}}}window.addEventListener("resize",()=>{n.params.slidesPerView=Z(),n.params.spaceBetween=ee(),n.update(),I(n)}),t.storiesBtnPrev.addEventListener("click",()=>n.slidePrev()),t.storiesBtnNext.addEventListener("click",async()=>{n.isEnd&&await i(n),n.slideNext()})}Ve();new se(".about-swiper",{modules:[ge,oe,Le],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:window.innerWidth<768},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});document.addEventListener("mousemove",e=>{const s=e.pageX,o=e.pageY;t.cursor.style.left=s+"px",t.cursor.style.top=o+"px",t.cursor.style.display="block"});document.addEventListener("mouseout",e=>{t.cursor.style.display="none"});const He=[{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."}];t.devTeamBtn.addEventListener("click",e=>{t.devTeamModalOverlay.innerHTML=je(),Ge()});const je=()=>`
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${U}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${Ue()}
      </ul>
    </div>`,Ue=()=>He.map(s=>{const o=s.github?"":"disabled",r=s.linkedIn?"":"disabled";return`
        <li class="dev-team-modal-member">
          <div class="dev-team-modal-member-image-wrapper">
            <img class="dev-team-modal-member-photo" src="${s.photo||"../img/hero/hero-tel.webp"}" alt="${s.name}" />
          </div>

          <div class="dev-team-modal-member-content">
            <div class="dev-team-modal-member-header">
              <h2 class="dev-team-modal-member-name">${s.name}</h2>
              <span class="dev-team-modal-member-role">${s.role||"Роль відсутня"}</span>
            </div>
            
            <div class="dev-team-modal-member-socials">
              <a 
                class="dev-team-modal-member-socials-btn" ${o}
                href="${s.github}"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
              <a 
                class="dev-team-modal-member-socials-btn" ${r}
                href="${s.linkedIn}"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
            </div>

            <p class="dev-team-modal-member-description">${s.description||"Опис відсутній"}</p>
          </div>
        </li>
        `}).join(""),ce=e=>{e.key==="Escape"&&ue()},Ge=()=>{t.devTeamModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",ce)},ue=()=>{t.devTeamModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",ce),setTimeout(()=>{t.devTeamModalOverlay.innerHTML=""},300)};document.addEventListener("click",e=>{const s=e.target;if(s.closest(".dev-team-modal-close")||s===t.devTeamModalOverlay){ue();return}});const me=document.querySelectorAll(".theme-selector, #theme-toggle-mob, .checkbox"),te=document.body;function pe(e){e?(te.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(te.removeAttribute("data-theme"),localStorage.setItem("theme","light")),me.forEach(s=>{s.checked=e})}me.forEach(e=>{e.addEventListener("change",()=>{pe(e.checked)})});const Ye=localStorage.getItem("theme");Ye==="dark"&&pe(!0);
//# sourceMappingURL=index.js.map
