import{a as P,A as qe,S as w,b as Ee,P as we,N as We,K as De}from"./assets/vendor-N3sEl8X9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const Ke={tel:{"1x":new URL("/pawsome-stay/assets/hero-tel-Bf2gcILm.webp",import.meta.url).href,"2x":new URL("/pawsome-stay/assets/hero-tel@2x-xGXWyzS1.webp",import.meta.url).href},tabl:{"1x":new URL("/pawsome-stay/assets/hero-tabl-APtCn5zU.webp",import.meta.url).href,"2x":new URL("/pawsome-stay/assets/hero-tabl@2x-CWixtYCP.webp",import.meta.url).href},desk:{"1x":new URL("/pawsome-stay/assets/hero-desk-qMSZZwKA.webp",import.meta.url).href,"2x":new URL("/pawsome-stay/assets/hero-desk@2x-Bc3lL1Mr.webp",import.meta.url).href}};(function(){const t=window.innerWidth||document.documentElement.clientWidth,o=(window.devicePixelRatio||1)>=2;let n="tel";t>=1440?n="desk":t>=768&&(n="tabl");const r=o?"2x":"1x",i=Ke[n][r];if(document.querySelector('link[rel="preload"][as="image"][href="'+i+'"]'))return;const a=document.createElement("link");a.rel="preload",a.as="image",a.type="image/webp",a.fetchPriority="high",a.href=i,document.head.appendChild(a)})();const s={cursor:document.querySelector(".cursor"),customCursor:document.querySelector(".custom-cursor"),navLogo:document.querySelector(".nav-logo"),footerLogo:document.querySelector(".footer__logo"),mobileMenu:document.querySelector(".mobile-menu"),menuBtnOpen:document.querySelector(".menu-btn-open"),menuBtnClose:document.querySelector(".menu-btn-close"),menuLinks:document.querySelectorAll(".mob-menu-link, .mob-menu-button"),orderForm:document.querySelector(".order-form"),orderOverlay:document.querySelector(".order-overlay"),petModalOverlay:document.querySelector(".pet-modal-overlay"),scrollToTopBtn:document.querySelector("[data-scroll-top]"),storiesLoadingEl:document.getElementById("stories-loading"),storiesSliderWrap:document.getElementById("stories-slider-wrap"),storiesSwiperEl:document.getElementById("stories-swiper"),storiesWrapperEl:document.getElementById("stories-swiper-wrapper"),storiesPaginationEl:document.getElementById("stories-pagination"),storiesBtnPrev:document.getElementById("stories-btn-prev"),storiesBtnNext:document.getElementById("stories-btn-next"),categoriesList:document.querySelector(".categories-list"),petList:document.querySelector(".pet-list"),petListLoadMoreBtn:document.querySelector(".load-more-pets-btn"),petListLoadMoreBtnWrapper:document.querySelector(".load-more-pets-btn-wrapper"),globalLoader:document.getElementById("global-loader"),devTeamBtn:document.querySelector(".dev-team-btn"),devTeamModalOverlay:document.querySelector(".dev-team-modal-overlay")};let y=0;function T(e){return!(e!=null&&e.skipGlobalLoader)}function W(){s.globalLoader&&(s.globalLoader.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function M(){s.globalLoader&&(y>0||(s.globalLoader.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{W()});window.addEventListener("load",()=>{setTimeout(()=>{M()},600)});const He=window.fetch;window.fetch=async(...e)=>{y++,W();try{return await He(...e)}finally{y--,setTimeout(()=>{M()},200)}};P.interceptors.request.use(e=>(T(e)&&(y++,W()),e));P.interceptors.response.use(e=>(T(e.config)&&(y--,setTimeout(()=>{M()},200)),e),e=>(T(e.config)&&(y--,setTimeout(()=>{M()},200)),Promise.reject(e)));const Ue=P.create;P.create=function(...e){const t=Ue.apply(this,e);return t.interceptors.request.use(o=>(T(o)&&(y++,W()),o)),t.interceptors.response.use(o=>(T(o.config)&&(y--,setTimeout(()=>{M()},200)),o),o=>(T(o.config)&&(y--,setTimeout(()=>{M()},200)),Promise.reject(o))),t};new qe("#faq-accordion",{duration:300,showMultiple:!1});const te=()=>s.mobileMenu.classList.toggle("is-open"),se=()=>document.body.classList.toggle("is-scroll-disabled"),je=()=>{te(),se()};s.menuBtnOpen.addEventListener("click",te);s.menuBtnClose.addEventListener("click",te);s.menuBtnOpen.addEventListener("click",se);s.menuBtnClose.addEventListener("click",se);s.menuLinks.forEach(e=>{e.addEventListener("click",je)});const D=P.create({baseURL:"https://paw-hut.b.goit.study/api"}),Ve="/categories",Ge="/animals",Ye="/orders",ze="/feedbacks";async function Xe(){const{data:e}=await D.get(Ve);return e}async function Te(e=null,t=1,o=9){const n={page:t,limit:o};e&&(n.categoryId=e);const{data:r}=await D.get(Ge,{params:n,skipGlobalLoader:!0});return r}const Je=async e=>{const{data:t}=await D.post(Ye,e);return t},V=async(e=1,t=12)=>{const{data:o}=await D.get(ze,{params:{page:e,limit:t},skipGlobalLoader:!0});return o},u={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",ORDER_SUCCESS_TITLE:"Заявку успішно надіслано!",ORDER_SUCCESS_TEXT:"Ми зв’яжемося з вами найближчим часом.",ORDER_ERROR:"Не вдалося надіслати заявку. Щось пішло не так. Спробуйте ще раз або пізніше.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function R(e,t){w.close(),w.fire({toast:!0,position:"top-end",icon:e,title:t,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:o=>{o.style.borderRadius="16px",o.style.border="1px solid var(--color-scheme-1-border)",o.style.fontFamily="var(--font-family)",o.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",o.style.lineHeight="1.4",o.style.fontSize="15px",o.addEventListener("mouseenter",w.stopTimer),o.addEventListener("mouseleave",w.resumeTimer)}})}const p={success(e){R("success",e)},failure(e){R("error",e)},warning(e){R("warning",e)},info(e){R("info",e)}};document.addEventListener("DOMContentLoaded",()=>{var r;const e=(r=s.orderForm)==null?void 0:r.querySelector('button[type="submit"]');let t=null;window.openOrderModal=function(i){if(!i){console.warn("Спроба відкрити форму без ID тварини");return}t=i,s.orderOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",n)};function o(){s.orderOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",n),setTimeout(()=>{t=null,s.orderForm&&(s.orderForm.reset(),s.orderForm.classList.remove("was-validated"))},250)}function n(i){i.key==="Escape"&&o()}s.orderOverlay.addEventListener("click",i=>{(i.target.closest(".close-btn")||i.target===s.orderOverlay)&&o()}),s.orderForm&&s.orderForm.addEventListener("submit",async i=>{var l,c;if(i.preventDefault(),s.orderForm.classList.add("was-validated"),!s.orderForm.checkValidity())return;const a=new FormData(s.orderForm),m=Object.fromEntries(a.entries()),L={name:m.name.trim(),phone:m.phone.trim(),comment:m.comment?m.comment.trim():"Хочу стати другом",animalId:t};try{e&&(e.disabled=!0,e.textContent="Надсилаємо..."),await Je(L),await w.fire({title:u.ORDER_SUCCESS_TITLE,text:u.ORDER_SUCCESS_TEXT,icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(f){const de=((c=(l=f.response)==null?void 0:l.data)==null?void 0:c.message)||u.ORDER_ERROR;w.fire({title:"Помилка!",text:de,icon:"error"})}finally{e&&(e.disabled=!1,e.textContent="Надіслати")}})});document.addEventListener("pointermove",e=>{s.customCursor&&(s.customCursor.style.left=`${e.clientX}px`,s.customCursor.style.top=`${e.clientY}px`)});s.navLogo&&(s.navLogo.addEventListener("mouseenter",()=>{s.cursor&&s.cursor.classList.add("is-hidden-on-logo"),s.customCursor.classList.add("beating","small"),s.customCursor.classList.remove("large"),s.customCursor.style.transform="translate(-50%, -50%) scale(1)"}),s.navLogo.addEventListener("mouseleave",()=>{s.cursor&&s.cursor.classList.remove("is-hidden-on-logo"),s.customCursor.classList.remove("beating","small"),s.customCursor.style.transform="translate(-50%, -50%) scale(0)"}));s.footerLogo&&(s.footerLogo.addEventListener("mouseenter",()=>{s.cursor&&s.cursor.classList.add("is-hidden-on-logo"),s.customCursor.classList.add("beating","large"),s.customCursor.classList.remove("small"),s.customCursor.style.transform="translate(-50%, -50%) scale(1)"}),s.footerLogo.addEventListener("mouseleave",()=>{s.cursor&&s.cursor.classList.remove("is-hidden-on-logo"),s.customCursor.classList.remove("beating","large"),s.customCursor.style.transform="translate(-50%, -50%) scale(0)"}));const Me="petsByCategoryCache",X=1,Ze=1e3*60*30;let h=null,O=!1,d=[],v=null,S=0,B=1,ue=Se();function Qe(e){return d.find(t=>String(t._id||t.id)===String(e))}function oe(e,t){return Array.from(new Map([...e,...t].map(o=>[String(o._id||o.id),o])).values())}function J(){s.petList.innerHTML="",h=null,d=[],v=null,S=0,B=1,s.petListLoadMoreBtn.classList.add("is-hidden"),s.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function $(){return s.petList.querySelectorAll(".pet-list-item").length>0}function x(e){s.petListLoadMoreBtnWrapper&&(e?s.petListLoadMoreBtnWrapper.classList.remove("is-hidden"):s.petListLoadMoreBtnWrapper.classList.add("is-hidden"))}const et=()=>{const e=window.innerWidth;return e>=768&&e<1440};function Se(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const tt=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function st(){return`
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
  `}function G(){const e=s.petList.querySelector(".pet-list-loader");e&&e.remove()}function Be(e){return e||"__all__"}function Z(){return{version:X,categories:{}}}function ot(e){const t=Z();if(!e||typeof e!="object")return t;if(e.version===X&&e.categories&&typeof e.categories=="object")return e;if(e.version!==void 0||e.categories!==void 0)return t;const n=Object.entries(e).reduce((r,[i,a])=>(!a||!Array.isArray(a.animals)||(r[i]={animals:a.animals,totalItems:Number.isFinite(a.totalItems)?a.totalItems:null,updatedAt:0}),r),{});return{version:X,categories:n}}function nt(e){return!e||!Number.isFinite(e.updatedAt)?!1:Date.now()-e.updatedAt<Ze}function Ce(){try{const e=localStorage.getItem(Me);if(!e)return Z();const t=JSON.parse(e);return ot(t)}catch{return Z()}}function ke(e){try{localStorage.setItem(Me,JSON.stringify(e))}catch{}}function K(e){const t=Ce(),o=Be(e),n=t.categories[o];return!n||!Array.isArray(n.animals)?{animals:[],totalItems:null}:nt(n)?{animals:n.animals,totalItems:Number.isFinite(n.totalItems)?n.totalItems:null}:(delete t.categories[o],ke(t),{animals:[],totalItems:null})}function rt(e,t,o=null){const n=Ce(),r=Be(e),i=n.categories[r],a=Array.isArray(i==null?void 0:i.animals)?i.animals:[],m=oe(a,t);return n.categories[r]={animals:m,totalItems:Number.isFinite(o)&&o>=0?o:(i==null?void 0:i.totalItems)??null,updatedAt:Date.now()},ke(n),n.categories[r]}function ne(e){const{animals:t,totalItems:o}=K(h),n=d.length,r=t.length>n,i=Number.isFinite(v)&&v>=0?v:o,a=Number.isFinite(i)&&n<Number(i);return r||a?!0:n>0&&n%e===0}function me(e){h=e,d=[],v=null,S=0,B=1}function pe(e){const{animals:t,totalItems:o}=K(h);if(!t.length)return!1;d=t.slice(0,e),v=o,S=1,B=S+1;const n=ne(e);return H(n),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.toggle("is-hidden",!n),!0}function it(e){const{animals:t}=K(h);if(t.length<=d.length)return!1;const o=t.slice(d.length,d.length+e);if(!o.length)return!1;d=oe(d,o),S+=1,B=S+1;const n=ne(e);return H(n),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.toggle("is-hidden",!n),!0}function at(e){return e.map(({_id:t,name:o,age:n,gender:r,image:i,species:a,categories:m,behavior:L})=>`
    <li class="pet-list-item" id="${t}">
      <img src="${i}" alt="${o}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${a}</span>
        <h3 class="pet-info-name">${o}</h3>

        <ul class="pet-info-categories-list">
          ${m.map(({name:l})=>`<li class="pet-info-categories-list-item">${l}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${n} роки/років</span>
          <span class="pet-gender">${r}</span>
        </div>

        <p class="pet-about">${L}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}function H(e){const o=et()&&e&&d.length%2!==0?d.slice(0,-1):d;s.petList.innerHTML=at(o)}function lt(){if(!d.length||O)return;const e=Se();if(e===ue)return;ue=e;const t=!s.petListLoadMoreBtn.classList.contains("is-hidden");H(t)}async function re(e=null,t=!1){if(O)return;const o=tt();if(!t&&d.length===0&&h===null&&e===null&&(me(e),pe(o))){x($());return}if(t&&(me(e),s.petList.innerHTML="",s.petListLoadMoreBtnWrapper&&s.petListLoadMoreBtnWrapper.classList.add("is-hidden"),pe(o))){x($());return}if(!t&&d.length>0&&it(o)){x($());return}s.petList.insertAdjacentHTML("beforeend",st()),O=!0;try{const{animals:r,totalItems:i}=await Te(h,B,o);if(!Array.isArray(r)||r.length===0){if(G(),d.length>0){s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden");return}J(),p.failure(u.PETS_EMPTY);return}const a=rt(h,r,i);d=oe(d,r),v=Number.isFinite(i)?i:a.totalItems,B+=1;const m=ne(o);G(),H(m),!m||r.length===0?s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden"):s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.remove("is-hidden")}catch(r){if(G(),!r.response){p.failure(u.NETWORK);return}p.failure(u.UNKNOWN_ERROR),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden")}finally{O=!1,x($())}}s.petListLoadMoreBtn&&s.petListLoadMoreBtn.addEventListener("click",async()=>{if(O)return;const{animals:e,totalItems:t}=K(h),o=Number.isFinite(v)&&v>=0?v:t;if(Number.isFinite(o)&&d.length>=o){s.petListLoadMoreBtn.classList.add("is-hidden");return}await re(h);const n=s.petList.querySelector(".pet-list-item");if(n){const{height:r}=n.getBoundingClientRect();window.scrollBy({top:r,behavior:"smooth"})}});window.addEventListener("resize",lt);Xe().then(e=>{if(!Array.isArray(e)||e.length===0){J(),p.failure(u.PETS_CATEGORY_LOAD_FAIL);return}const t=e.map(({_id:o,name:n})=>`<li class="categories-list-item" data-category-id="${o}">${n}</li>`);s.categoriesList.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+t.join(""),re()}).catch(e=>{if(J(),!e.response){p.failure(u.NETWORK);return}p.failure(u.UNKNOWN_ERROR)});s.categoriesList.addEventListener("click",e=>{const t=e.target;if(t.nodeName!=="LI"||t.classList.contains("active"))return;const o=s.categoriesList.querySelector(".active");o&&o.classList.remove("active"),t.classList.add("active");const n=t.dataset.categoryId||null;re(n,!0)});const ct=1440,fe=9;let b=1,I=1,q=null,Y=!1,ge=!1;function N(){return window.innerWidth>=ct}function Ae(){return document.querySelector(".pagination-wrapper")}function ie(){return document.querySelector(".pagination")}function dt(e){return e.map(({_id:t,name:o,age:n,gender:r,image:i,species:a,categories:m,behavior:L})=>`
        <li class="pet-list-item" id="${t}">
          <img src="${i}" alt="${o}" class="pet-image">
          <div class="pet-info">
            <span class="pet-info-category">${a}</span>
            <h3 class="pet-info-name">${o}</h3>

            <ul class="pet-info-categories-list">
              ${m.map(({name:l})=>`<li class="pet-info-categories-list-item">${l}</li>`).join("")}
            </ul>

            <div class="pet-age-and-gender-wrapper">
              <span class="pet-age">${n} роки/років</span>
              <span class="pet-gender">${r}</span>
            </div>

            <p class="pet-about">${L}</p>
          </div>

          <button class="pet-more-info" type="button">
            Дізнатись більше
          </button>
        </li>
      `).join("")}function ut(e){s.petList&&(s.petList.innerHTML=dt(e))}function Q(){s.petListLoadMoreBtnWrapper&&s.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function mt(){s.petListLoadMoreBtnWrapper&&s.petListLoadMoreBtnWrapper.classList.remove("is-hidden")}function Oe(){const e=Ae();e&&e.classList.remove("is-hidden")}function ae(){const e=Ae();e&&e.classList.add("is-hidden")}function pt(e,t=!1){return`
    <button
      type="button"
      class="pagination-btn ${t?"active":""}"
      data-page="${e}"
      aria-label="Page ${e}"
      ${t?'aria-current="page"':""}
    >
      ${e}
    </button>
  `}function ft(e){return`
    <button
      type="button"
      class="pagination-dots"
      data-page="${e}"
      aria-label="Jump to page ${e}"
    >
      ...
    </button>
  `}function gt(e,t){return e<=4?Array.from({length:e},(o,n)=>n+1):t<=3?[1,2,3,{type:"dots",page:4},e]:t>=e-1?[e-3,e-2,e-1,e]:[t-2,t-1,t,{type:"dots",page:t+1},e]}function Lt(){const e=ie();if(!e)return;if(!N()||I<=1){e.innerHTML="",ae();return}const t=gt(I,b);e.innerHTML=`
    <button
      type="button"
      class="pagination-nav pagination-prev"
      data-page="${b-1}"
      aria-label="Previous page"
      ${b===1?"disabled":""}
    >
      ←
    </button>

    ${t.map(o=>typeof o=="object"&&o.type==="dots"?ft(o.page):pt(o,o===b)).join("")}

    <button
      type="button"
      class="pagination-nav pagination-next"
      data-page="${b+1}"
      aria-label="Next page"
      ${b===I?"disabled":""}
    >
      →
    </button>
  `,Oe()}async function le(e=1,t=null){if(!(!N()||Y)){Y=!0;try{const{animals:o,totalItems:n}=await Te(t,e,fe);if(!Array.isArray(o)||o.length===0){s.petList.innerHTML="";const r=ie();r&&(r.innerHTML=""),ae(),Q(),p.failure(u.PETS_EMPTY);return}b=e,q=t,I=Math.ceil(n/fe),ut(o),Lt(),Q()}catch(o){if(!o.response){p.failure(u.NETWORK);return}p.failure(u.UNKNOWN_ERROR)}finally{Y=!1}}}function ht(e){const t=e.target.closest("[data-page]");if(!t||!N())return;const o=Number(t.dataset.page);if(!o||o<1||o>I||o===b)return;le(o,q);const n=document.getElementById("pets-list");n&&n.scrollIntoView({behavior:"smooth",block:"start"})}function vt(e){const t=s.categoriesList.querySelector(".active");t&&t.classList.remove("active"),e.classList.add("active")}function yt(e){if(!N())return;const t=e.target.closest(".categories-list-item");if(!t||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),t.classList.contains("active")))return;vt(t);const o=t.dataset.categoryId||null;le(1,o)}function bt(){var t;Q(),Oe();const e=(t=s.categoriesList)==null?void 0:t.querySelector(".categories-list-item.active");q=(e==null?void 0:e.dataset.categoryId)||null,le(1,q)}function Et(){ae(),mt()}function Ie(){!s.petList||!s.categoriesList||(N()?bt():Et())}function wt(){if(ge)return;const e=new MutationObserver(()=>{s.categoriesList&&s.categoriesList.querySelector(".categories-list-item")&&(ge=!0,e.disconnect(),Ie())});e.observe(s.categoriesList,{childList:!0,subtree:!0})}function Tt(){const e=ie();if(!s.petList||!s.categoriesList||!e)return;e.addEventListener("click",ht),s.categoriesList.addEventListener("click",yt,!0);let t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>{Ie()},150)}),wt()}Tt();const ce="/pawsome-stay/assets/icons-33t6cozr.svg";function Mt(e){const o={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",n=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${ce}#close"></use>
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

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${n}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `}function St(e){const t=Qe(e);t?(s.petModalOverlay.innerHTML=Mt(t),Bt()):p.failure(u.LOAD_FAIL)}function Bt(){s.petModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",Pe)}function ee(){s.petModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",Pe),setTimeout(()=>{s.petModalOverlay.innerHTML=""},300)}function Pe(e){e.key==="Escape"&&ee()}document.addEventListener("click",e=>{const t=e.target,o=t.closest(".pet-more-info");if(o){const r=o.closest(".pet-list-item");r!=null&&r.id&&St(r.id);return}if(t.closest(".pet-modal-close")||t===s.petModalOverlay){ee();return}const n=t.closest("#petModalActionBtn");if(n){const r=n.dataset.id;ee(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(r)},350)}});function Ct(){if(!s.scrollToTopBtn)return;let e=!1,t=null,o=window.scrollY,n=null,r=0;const i=250,a=220,m=c=>{const f=Date.now();f-r<a||(r=f,s.scrollToTopBtn.classList.remove("dir-up","dir-down"),s.scrollToTopBtn.classList.add(c==="up"?"dir-up":"dir-down"),s.scrollToTopBtn.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>s.scrollToTopBtn.classList.remove("tracks-burst"),i))},L=()=>{const c=window.scrollY>400;if(c&&!e){s.scrollToTopBtn.classList.add("show"),s.scrollToTopBtn.classList.add("dir-up"),e=!0;return}!c&&e&&(s.scrollToTopBtn.classList.remove("show","tracks-burst"),clearTimeout(t),e=!1)},l=()=>{n||(n=requestAnimationFrame(()=>{n=null,L();const c=window.scrollY,f=c-o;e&&Math.abs(f)>=12&&(f>0?m("up"):m("down")),o=c}))};window.addEventListener("scroll",l,{passive:!0}),L(),s.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Ct);const Ne="stories-feedbacks-cache",g=12,kt=6*60*60*1e3;function Le(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function At(e){let o=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let n=1;n<=5;n++){let r;e>=n?r="star-filled":e>=n-.5?r="star-half":r="star-outline",o+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${ce}#${r}"></use>
        </svg>
      </span>`}return o+="</div>",o}function C(e){const t=parseFloat(e.rating??e.rate)||5,o=Le(e.comment||e.text||e.description||""),n=Le(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${At(t)}
        <p class="review-text">${o}</p>
        <p class="review-author">${n}</p>
      </article>
    </li>`}function k(e){s.storiesBtnPrev.disabled=e.isBeginning,s.storiesBtnNext.disabled=e.isEnd}function he(){return window.innerWidth>=768?2:1}function ve(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function F(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}function Ot(){try{const e=localStorage.getItem(Ne);if(!e)return null;const t=JSON.parse(e);return!t||!Array.isArray(t.items)?null:{items:t.items,total:Number(t.total)||t.items.length,page:Number(t.page)||1,limit:Number(t.limit)||g,savedAt:Number(t.savedAt)||0}}catch{return null}}function A(e){try{const t=Array.isArray(e==null?void 0:e.items)?e.items:[],o=Number(e==null?void 0:e.total)||t.length;localStorage.setItem(Ne,JSON.stringify({...e,items:t,total:o,page:Number(e==null?void 0:e.page)||1,limit:Number(e==null?void 0:e.limit)||g,savedAt:Date.now()}))}catch{}}function It(e){return e?Date.now()-e>kt:!0}function ye(e,t){return[...e,...t]}async function Pt(){let e=1,t=0,o=!1,n=[],r=!1;const i=Ot();if(i&&(n=i.items,t=i.total,e=i.page,r=It(i.savedAt)),n.length){const l=n.slice(0,g);s.storiesWrapperEl.innerHTML=l.map(C).join(""),s.storiesLoadingEl.classList.add("is-hidden"),s.storiesSliderWrap.classList.add("is-visible")}else try{const l=await V(1,g),c=F(l);if(!c.length){p.info(u.NO_FEEDBACKS);return}n=c,e=1,t=Number(l==null?void 0:l.total)||c.length,A({items:n,total:t,page:e,limit:g}),s.storiesWrapperEl.innerHTML=c.map(C).join(""),s.storiesLoadingEl.classList.add("is-hidden"),s.storiesSliderWrap.classList.add("is-visible")}catch(l){if(!l.response){p.failure(u.NETWORK);return}p.failure(u.UNKNOWN_ERROR);return}const a=new Ee(s.storiesSwiperEl,{modules:[we],slidesPerView:he(),spaceBetween:ve(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:s.storiesPaginationEl,clickable:!0,dynamicBullets:!0},on:{init(l){k(l)},slideChange(l){k(l),L(l)}}});r&&m(a);async function m(l){try{const c=await V(1,g),f=F(c);if(!f.length)return;n=ye(n,f),e=Math.max(e,1),t=Math.max(Number(c==null?void 0:c.total)||0,t,n.length),A({items:n,total:t,page:e,limit:g}),s.storiesWrapperEl.innerHTML=f.map(C).join(""),l.slideTo(0,0),l.update(),k(l)}catch{}}async function L(l){if(o)return;const c=s.storiesWrapperEl.children.length;if(c>=t)return;const f=Math.ceil(Number(l.params.slidesPerView)||1);if(l.activeIndex+f>=l.slides.length){o=!0;try{const _=n.slice(c,c+g);if(_.length){s.storiesWrapperEl.insertAdjacentHTML("beforeend",_.map(C).join("")),l.update();return}const U=e+1,E=await V(U,g);if(!E||!F(E).length){p.info(u.NO_MORE_FEEDBACKS),t=c,A({items:n,total:t,page:e,limit:g});return}const j=F(E);if(t=Number(E==null?void 0:E.total)||t,!j.length){t=c,A({items:n,total:t,page:e,limit:g});return}n=ye(n,j),e=U,A({items:n,total:t,page:e,limit:g}),s.storiesWrapperEl.insertAdjacentHTML("beforeend",j.map(C).join("")),l.update()}catch(_){if(!_.response){p.failure(u.NETWORK);return}p.failure(u.UNKNOWN_ERROR)}finally{o=!1,k(l)}}}window.addEventListener("resize",()=>{a.params.slidesPerView=he(),a.params.spaceBetween=ve(),a.update(),k(a)}),s.storiesBtnPrev.addEventListener("click",()=>a.slidePrev()),s.storiesBtnNext.addEventListener("click",async()=>{a.isEnd&&await L(a),a.slideNext()})}Pt();new Ee(".about-swiper",{modules:[We,we,De],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:window.innerWidth<768},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});const Nt='a, button, input, textarea, select, label, summary, [role="button"], [tabindex], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .categories-list-item, .review-card';document.addEventListener("pointermove",e=>{if(!s.cursor)return;s.cursor.style.left=`${e.clientX}px`,s.cursor.style.top=`${e.clientY}px`;const t=e.target.closest(".nav-logo, .footer__logo"),o=e.target.closest(Nt);if(t){s.cursor.classList.remove("is-hover");return}o?s.cursor.classList.add("is-hover"):s.cursor.classList.remove("is-hover")});document.addEventListener("mouseleave",()=>{s.cursor&&(s.cursor.style.display="none")});document.addEventListener("mouseenter",()=>{s.cursor&&(s.cursor.style.display="block")});const _t=new URL("/pawsome-stay/assets/hero-tel-Bf2gcILm.webp",import.meta.url).href,Rt=[{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."}];s.devTeamBtn.addEventListener("click",e=>{s.devTeamModalOverlay.innerHTML=$t(),Ft()});const $t=()=>`
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${ce}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${xt()}
      </ul>
    </div>`,xt=()=>Rt.map(t=>{const o=t.github?"":"disabled",n=t.linkedIn?"":"disabled";return`
        <li class="dev-team-modal-member">
          <div class="dev-team-modal-member-image-wrapper">
            <img class="dev-team-modal-member-photo" src="${t.photo||_t}" alt="${t.name}" />
          </div>

          <div class="dev-team-modal-member-content">
            <div class="dev-team-modal-member-header">
              <h2 class="dev-team-modal-member-name">${t.name}</h2>
              <span class="dev-team-modal-member-role">${t.role||"Роль відсутня"}</span>
            </div>
            
            <div class="dev-team-modal-member-socials">
              <a 
                class="dev-team-modal-member-socials-btn" ${o}
                href="${t.github}"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
              <a 
                class="dev-team-modal-member-socials-btn" ${n}
                href="${t.linkedIn}"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
            </div>

            <p class="dev-team-modal-member-description">${t.description||"Опис відсутній"}</p>
          </div>
        </li>
        `}).join(""),_e=e=>{e.key==="Escape"&&Re()},Ft=()=>{s.devTeamModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",_e)},Re=()=>{s.devTeamModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",_e),setTimeout(()=>{s.devTeamModalOverlay.innerHTML=""},300)};document.addEventListener("click",e=>{const t=e.target;if(t.closest(".dev-team-modal-close")||t===s.devTeamModalOverlay){Re();return}});const $e="theme",xe=document.querySelectorAll(".theme-selector, #theme-toggle-mob, .checkbox"),be=document.body;function Fe(e){e?be.setAttribute("data-theme","dark"):be.removeAttribute("data-theme"),xe.forEach(t=>{"checked"in t&&(t.checked=e)})}function qt(e){Fe(e),localStorage.setItem($e,e?"dark":"light")}xe.forEach(e=>{e.addEventListener("change",()=>{qt(!!e.checked)})});const z=localStorage.getItem($e);(z==="dark"||z==="light")&&Fe(z==="dark");
//# sourceMappingURL=index.js.map
