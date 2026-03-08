import{a as C,A as Se,S as E,b as ce,P as ue,N as Me,K as Be}from"./assets/vendor-N3sEl8X9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const s={cursor:document.querySelector(".cursor"),customCursor:document.querySelector(".custom-cursor"),navLogo:document.querySelector(".nav-logo"),footerLogo:document.querySelector(".footer__logo"),mobileMenu:document.querySelector(".mobile-menu"),menuBtnOpen:document.querySelector(".menu-btn-open"),menuBtnClose:document.querySelector(".menu-btn-close"),menuLinks:document.querySelectorAll(".mob-menu-link, .mob-menu-button"),orderForm:document.querySelector(".order-form"),orderOverlay:document.querySelector(".order-overlay"),petModalOverlay:document.querySelector(".pet-modal-overlay"),scrollToTopBtn:document.querySelector("[data-scroll-top]"),storiesLoadingEl:document.getElementById("stories-loading"),storiesSliderWrap:document.getElementById("stories-slider-wrap"),storiesSwiperEl:document.getElementById("stories-swiper"),storiesWrapperEl:document.getElementById("stories-swiper-wrapper"),storiesPaginationEl:document.getElementById("stories-pagination"),storiesBtnPrev:document.getElementById("stories-btn-prev"),storiesBtnNext:document.getElementById("stories-btn-next"),categoriesList:document.querySelector(".categories-list"),petList:document.querySelector(".pet-list"),petListLoadMoreBtn:document.querySelector(".load-more-pets-btn"),petListLoadMoreBtnWrapper:document.querySelector(".load-more-pets-btn-wrapper"),globalLoader:document.getElementById("global-loader"),devTeamBtn:document.querySelector(".dev-team-btn"),devTeamModalOverlay:document.querySelector(".dev-team-modal-overlay")};let y=0;function w(e){return!(e!=null&&e.skipGlobalLoader)}function F(){s.globalLoader&&(s.globalLoader.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function T(){s.globalLoader&&(y>0||(s.globalLoader.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{F()});window.addEventListener("load",()=>{setTimeout(()=>{T()},600)});const Ae=window.fetch;window.fetch=async(...e)=>{y++,F();try{return await Ae(...e)}finally{y--,setTimeout(()=>{T()},200)}};C.interceptors.request.use(e=>(w(e)&&(y++,F()),e));C.interceptors.response.use(e=>(w(e.config)&&(y--,setTimeout(()=>{T()},200)),e),e=>(w(e.config)&&(y--,setTimeout(()=>{T()},200)),Promise.reject(e)));const Oe=C.create;C.create=function(...e){const t=Oe.apply(this,e);return t.interceptors.request.use(n=>(w(n)&&(y++,F()),n)),t.interceptors.response.use(n=>(w(n.config)&&(y--,setTimeout(()=>{T()},200)),n),n=>(w(n.config)&&(y--,setTimeout(()=>{T()},200)),Promise.reject(n))),t};new Se("#faq-accordion",{duration:300,showMultiple:!1});const X=()=>s.mobileMenu.classList.toggle("is-open"),z=()=>document.body.classList.toggle("is-scroll-disabled"),ke=()=>{X(),z()};s.menuBtnOpen.addEventListener("click",X);s.menuBtnClose.addEventListener("click",X);s.menuBtnOpen.addEventListener("click",z);s.menuBtnClose.addEventListener("click",z);s.menuLinks.forEach(e=>{e.addEventListener("click",ke)});const $=C.create({baseURL:"https://paw-hut.b.goit.study/api"}),Ce="/categories",Ie="/animals",Ne="/orders",_e="/feedbacks";async function Pe(){const{data:e}=await $.get(Ce);return e}async function Re(e=null,t=1,n=9){const o={page:t,limit:n};e&&(o.categoryId=e);const{data:r}=await $.get(Ie,{params:o,skipGlobalLoader:!0});return r}const Fe=async e=>{const{data:t}=await $.post(Ne,e);return t},K=async(e=1,t=12)=>{const{data:n}=await $.get(_e,{params:{page:e,limit:t},skipGlobalLoader:!0});return n},m={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",ORDER_SUCCESS_TITLE:"Заявку успішно надіслано!",ORDER_SUCCESS_TEXT:"Ми зв’яжемося з вами найближчим часом.",ORDER_ERROR:"Не вдалося надіслати заявку. Щось пішло не так. Спробуйте ще раз або пізніше.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function N(e,t){E.close(),E.fire({toast:!0,position:"top-end",icon:e,title:t,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:n=>{n.style.borderRadius="16px",n.style.border="1px solid var(--color-scheme-1-border)",n.style.fontFamily="var(--font-family)",n.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",n.style.lineHeight="1.4",n.style.fontSize="15px",n.addEventListener("mouseenter",E.stopTimer),n.addEventListener("mouseleave",E.resumeTimer)}})}const f={success(e){N("success",e)},failure(e){N("error",e)},warning(e){N("warning",e)},info(e){N("info",e)}};document.addEventListener("DOMContentLoaded",()=>{var r;const e=(r=s.orderForm)==null?void 0:r.querySelector('button[type="submit"]');let t=null;window.openOrderModal=function(i){if(!i){console.warn("Спроба відкрити форму без ID тварини");return}t=i,s.orderOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",o)};function n(){s.orderOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",o),setTimeout(()=>{t=null,s.orderForm&&(s.orderForm.reset(),s.orderForm.classList.remove("was-validated"))},250)}function o(i){i.key==="Escape"&&n()}s.orderOverlay.addEventListener("click",i=>{(i.target.closest(".close-btn")||i.target===s.orderOverlay)&&n()}),s.orderForm&&s.orderForm.addEventListener("submit",async i=>{var l,d;if(i.preventDefault(),s.orderForm.classList.add("was-validated"),!s.orderForm.checkValidity())return;const a=new FormData(s.orderForm),u=Object.fromEntries(a.entries()),h={name:u.name.trim(),phone:u.phone.trim(),comment:u.comment?u.comment.trim():"Хочу стати другом",animalId:t};try{e&&(e.disabled=!0,e.textContent="Надсилаємо..."),await Fe(h),await E.fire({title:m.ORDER_SUCCESS_TITLE,text:m.ORDER_SUCCESS_TEXT,icon:"success",confirmButtonColor:"#2e2f42"}),n()}catch(p){const te=((d=(l=p.response)==null?void 0:l.data)==null?void 0:d.message)||m.ORDER_ERROR;E.fire({title:"Помилка!",text:te,icon:"error"})}finally{e&&(e.disabled=!1,e.textContent="Надіслати")}})});document.addEventListener("mousemove",e=>{s.cursor.style.left=e.clientX+"px",s.cursor.style.top=e.clientY+"px"});s.navLogo.addEventListener("mouseenter",()=>{s.cursor.classList.add("beating","small"),s.cursor.classList.remove("large"),s.cursor.style.transform="translate(-50%, -50%) scale(1)"});s.navLogo.addEventListener("mouseleave",()=>{s.cursor.classList.remove("beating","small"),s.cursor.style.transform="translate(-50%, -50%) scale(0)"});s.footerLogo.addEventListener("mouseenter",()=>{s.cursor.classList.add("beating","large"),s.cursor.classList.remove("small"),s.cursor.style.transform="translate(-50%, -50%) scale(1)"});s.footerLogo.addEventListener("mouseleave",()=>{s.cursor.classList.remove("beating","large"),s.cursor.style.transform="translate(-50%, -50%) scale(0)"});const me="petsByCategoryCache",V=1,$e=1e3*60*30;let L=null,k=!1,c=[],v=null,S=0,M=1,se=pe();function qe(e){return c.find(t=>String(t._id||t.id)===String(e))}function J(e,t){return Array.from(new Map([...e,...t].map(n=>[String(n._id||n.id),n])).values())}function U(){s.petList.innerHTML="",L=null,c=[],v=null,S=0,M=1,s.petListLoadMoreBtn.classList.add("is-hidden"),s.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function _(){return s.petList.querySelectorAll(".pet-list-item").length>0}function P(e){s.petListLoadMoreBtnWrapper&&(e?s.petListLoadMoreBtnWrapper.classList.remove("is-hidden"):s.petListLoadMoreBtnWrapper.classList.add("is-hidden"))}const xe=()=>{const e=window.innerWidth;return e>=768&&e<1440};function pe(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const We=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function De(){return`
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
  `}function H(){const e=s.petList.querySelector(".pet-list-loader");e&&e.remove()}function fe(e){return e||"__all__"}function G(){return{version:V,categories:{}}}function Ke(e){const t=G();if(!e||typeof e!="object")return t;if(e.version===V&&e.categories&&typeof e.categories=="object")return e;if(e.version!==void 0||e.categories!==void 0)return t;const o=Object.entries(e).reduce((r,[i,a])=>(!a||!Array.isArray(a.animals)||(r[i]={animals:a.animals,totalItems:Number.isFinite(a.totalItems)?a.totalItems:null,updatedAt:0}),r),{});return{version:V,categories:o}}function He(e){return!e||!Number.isFinite(e.updatedAt)?!1:Date.now()-e.updatedAt<$e}function ge(){try{const e=localStorage.getItem(me);if(!e)return G();const t=JSON.parse(e);return Ke(t)}catch{return G()}}function Le(e){try{localStorage.setItem(me,JSON.stringify(e))}catch{}}function q(e){const t=ge(),n=fe(e),o=t.categories[n];return!o||!Array.isArray(o.animals)?{animals:[],totalItems:null}:He(o)?{animals:o.animals,totalItems:Number.isFinite(o.totalItems)?o.totalItems:null}:(delete t.categories[n],Le(t),{animals:[],totalItems:null})}function je(e,t,n=null){const o=ge(),r=fe(e),i=o.categories[r],a=Array.isArray(i==null?void 0:i.animals)?i.animals:[],u=J(a,t);return o.categories[r]={animals:u,totalItems:Number.isFinite(n)&&n>=0?n:(i==null?void 0:i.totalItems)??null,updatedAt:Date.now()},Le(o),o.categories[r]}function Q(e){const{animals:t,totalItems:n}=q(L),o=c.length,r=t.length>o,i=Number.isFinite(v)&&v>=0?v:n,a=Number.isFinite(i)&&o<Number(i);return r||a?!0:o>0&&o%e===0}function ne(e){L=e,c=[],v=null,S=0,M=1}function oe(e){const{animals:t,totalItems:n}=q(L);if(!t.length)return!1;c=t.slice(0,e),v=n,S=1,M=S+1;const o=Q(e);return x(o),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.toggle("is-hidden",!o),!0}function Ve(e){const{animals:t}=q(L);if(t.length<=c.length)return!1;const n=t.slice(c.length,c.length+e);if(!n.length)return!1;c=J(c,n),S+=1,M=S+1;const o=Q(e);return x(o),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.toggle("is-hidden",!o),!0}function Ue(e){return e.map(({_id:t,name:n,age:o,gender:r,image:i,species:a,categories:u,behavior:h})=>`
    <li class="pet-list-item" id="${t}">
      <img src="${i}" alt="${n}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${a}</span>
        <h3 class="pet-info-name">${n}</h3>

        <ul class="pet-info-categories-list">
          ${u.map(({name:l})=>`<li class="pet-info-categories-list-item">${l}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${o} роки/років</span>
          <span class="pet-gender">${r}</span>
        </div>

        <p class="pet-about">${h}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}function x(e){const n=xe()&&e&&c.length%2!==0?c.slice(0,-1):c;s.petList.innerHTML=Ue(n)}function Ge(){if(!c.length||k)return;const e=pe();if(e===se)return;se=e;const t=!s.petListLoadMoreBtn.classList.contains("is-hidden");x(t)}async function Z(e=null,t=!1){if(k)return;const n=We();if(!t&&c.length===0&&L===null&&e===null&&(ne(e),oe(n))){P(_());return}if(t&&(ne(e),s.petList.innerHTML="",s.petListLoadMoreBtnWrapper&&s.petListLoadMoreBtnWrapper.classList.add("is-hidden"),oe(n))){P(_());return}if(!t&&c.length>0&&Ve(n)){P(_());return}s.petList.insertAdjacentHTML("beforeend",De()),k=!0;try{const{animals:r,totalItems:i}=await Re(L,M,n);if(!Array.isArray(r)||r.length===0){if(H(),c.length>0){s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden");return}U(),f.failure(m.PETS_EMPTY);return}const a=je(L,r,i);c=J(c,r),v=Number.isFinite(i)?i:a.totalItems,M+=1;const u=Q(n);H(),x(u),!u||r.length===0?s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden"):s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.remove("is-hidden")}catch(r){if(H(),!r.response){f.failure(m.NETWORK);return}f.failure(m.UNKNOWN_ERROR),s.petListLoadMoreBtn&&s.petListLoadMoreBtn.classList.add("is-hidden")}finally{k=!1,P(_())}}s.petListLoadMoreBtn&&s.petListLoadMoreBtn.addEventListener("click",async()=>{if(k)return;const{animals:e,totalItems:t}=q(L),n=Number.isFinite(v)&&v>=0?v:t;if(Number.isFinite(n)&&c.length>=n){s.petListLoadMoreBtn.classList.add("is-hidden");return}await Z(L);const o=s.petList.querySelector(".pet-list-item");if(o){const{height:r}=o.getBoundingClientRect();window.scrollBy({top:r,behavior:"smooth"})}});window.addEventListener("resize",Ge);Pe().then(e=>{if(!Array.isArray(e)||e.length===0){U(),f.failure(m.PETS_CATEGORY_LOAD_FAIL);return}const t=e.map(({_id:n,name:o})=>`<li class="categories-list-item" data-category-id="${n}">${o}</li>`);s.categoriesList.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+t.join(""),Z()}).catch(e=>{if(U(),!e.response){f.failure(m.NETWORK);return}f.failure(m.UNKNOWN_ERROR)});s.categoriesList.addEventListener("click",e=>{const t=e.target;if(t.nodeName!=="LI"||t.classList.contains("active"))return;const n=s.categoriesList.querySelector(".active");n&&n.classList.remove("active"),t.classList.add("active");const o=t.dataset.categoryId||null;Z(o,!0)});const ee="/pawsome-stay/assets/icons-Dk5vhMk4.svg";function Ye(e){const n={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",o=e._id||e.id;return`
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
            <span class="pet-modal-category-badge">${n}</span>
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

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${o}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `}function Xe(e){const t=qe(e);t?(s.petModalOverlay.innerHTML=Ye(t),ze()):f.failure(m.LOAD_FAIL)}function ze(){s.petModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",ve)}function Y(){s.petModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",ve),setTimeout(()=>{s.petModalOverlay.innerHTML=""},300)}function ve(e){e.key==="Escape"&&Y()}document.addEventListener("click",e=>{const t=e.target,n=t.closest(".pet-more-info");if(n){const r=n.closest(".pet-list-item");r!=null&&r.id&&Xe(r.id);return}if(t.closest(".pet-modal-close")||t===s.petModalOverlay){Y();return}const o=t.closest("#petModalActionBtn");if(o){const r=o.dataset.id;Y(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(r)},350)}});function Je(){if(!s.scrollToTopBtn)return;let e=!1,t=null,n=window.scrollY,o=null,r=0;const i=250,a=220,u=d=>{const p=Date.now();p-r<a||(r=p,s.scrollToTopBtn.classList.remove("dir-up","dir-down"),s.scrollToTopBtn.classList.add(d==="up"?"dir-up":"dir-down"),s.scrollToTopBtn.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>s.scrollToTopBtn.classList.remove("tracks-burst"),i))},h=()=>{const d=window.scrollY>400;if(d&&!e){s.scrollToTopBtn.classList.add("show"),s.scrollToTopBtn.classList.add("dir-up"),e=!0;return}!d&&e&&(s.scrollToTopBtn.classList.remove("show","tracks-burst"),clearTimeout(t),e=!1)},l=()=>{o||(o=requestAnimationFrame(()=>{o=null,h();const d=window.scrollY,p=d-n;e&&Math.abs(p)>=12&&(p>0?u("up"):u("down")),n=d}))};window.addEventListener("scroll",l,{passive:!0}),h(),s.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Je);const he="stories-feedbacks-cache",g=12,Qe=6*60*60*1e3;function re(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ze(e){let n=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let o=1;o<=5;o++){let r;e>=o?r="star-filled":e>=o-.5?r="star-half":r="star-outline",n+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${ee}#${r}"></use>
        </svg>
      </span>`}return n+="</div>",n}function B(e){const t=parseFloat(e.rating??e.rate)||5,n=re(e.comment||e.text||e.description||""),o=re(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Ze(t)}
        <p class="review-text">${n}</p>
        <p class="review-author">${o}</p>
      </article>
    </li>`}function A(e){s.storiesBtnPrev.disabled=e.isBeginning,s.storiesBtnNext.disabled=e.isEnd}function ie(){return window.innerWidth>=768?2:1}function ae(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function R(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}function et(){try{const e=localStorage.getItem(he);if(!e)return null;const t=JSON.parse(e);return!t||!Array.isArray(t.items)?null:{items:t.items,total:Number(t.total)||t.items.length,page:Number(t.page)||1,limit:Number(t.limit)||g,savedAt:Number(t.savedAt)||0}}catch{return null}}function O(e){try{const t=Array.isArray(e==null?void 0:e.items)?e.items:[],n=Number(e==null?void 0:e.total)||t.length;localStorage.setItem(he,JSON.stringify({...e,items:t,total:n,page:Number(e==null?void 0:e.page)||1,limit:Number(e==null?void 0:e.limit)||g,savedAt:Date.now()}))}catch{}}function tt(e){return e?Date.now()-e>Qe:!0}function le(e,t){return[...e,...t]}async function st(){let e=1,t=0,n=!1,o=[],r=!1;const i=et();if(i&&(o=i.items,t=i.total,e=i.page,r=tt(i.savedAt)),o.length){const l=o.slice(0,g);s.storiesWrapperEl.innerHTML=l.map(B).join(""),s.storiesLoadingEl.classList.add("is-hidden"),s.storiesSliderWrap.classList.add("is-visible")}else try{const l=await K(1,g),d=R(l);if(!d.length){f.info(m.NO_FEEDBACKS);return}o=d,e=1,t=Number(l==null?void 0:l.total)||d.length,O({items:o,total:t,page:e,limit:g}),s.storiesWrapperEl.innerHTML=d.map(B).join(""),s.storiesLoadingEl.classList.add("is-hidden"),s.storiesSliderWrap.classList.add("is-visible")}catch(l){if(!l.response){f.failure(m.NETWORK);return}f.failure(m.UNKNOWN_ERROR);return}const a=new ce(s.storiesSwiperEl,{modules:[ue],slidesPerView:ie(),spaceBetween:ae(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:s.storiesPaginationEl,clickable:!0,dynamicBullets:!0},on:{init(l){A(l)},slideChange(l){A(l),h(l)}}});r&&u(a);async function u(l){try{const d=await K(1,g),p=R(d);if(!p.length)return;o=le(o,p),e=Math.max(e,1),t=Math.max(Number(d==null?void 0:d.total)||0,t,o.length),O({items:o,total:t,page:e,limit:g}),s.storiesWrapperEl.innerHTML=p.map(B).join(""),l.slideTo(0,0),l.update(),A(l)}catch{}}async function h(l){if(n)return;const d=s.storiesWrapperEl.children.length;if(d>=t)return;const p=Math.ceil(Number(l.params.slidesPerView)||1);if(l.activeIndex+p>=l.slides.length){n=!0;try{const I=o.slice(d,d+g);if(I.length){s.storiesWrapperEl.insertAdjacentHTML("beforeend",I.map(B).join("")),l.update();return}const W=e+1,b=await K(W,g);if(!b||!R(b).length){f.info(m.NO_MORE_FEEDBACKS),t=d,O({items:o,total:t,page:e,limit:g});return}const D=R(b);if(t=Number(b==null?void 0:b.total)||t,!D.length){t=d,O({items:o,total:t,page:e,limit:g});return}o=le(o,D),e=W,O({items:o,total:t,page:e,limit:g}),s.storiesWrapperEl.insertAdjacentHTML("beforeend",D.map(B).join("")),l.update()}catch(I){if(!I.response){f.failure(m.NETWORK);return}f.failure(m.UNKNOWN_ERROR)}finally{n=!1,A(l)}}}window.addEventListener("resize",()=>{a.params.slidesPerView=ie(),a.params.spaceBetween=ae(),a.update(),A(a)}),s.storiesBtnPrev.addEventListener("click",()=>a.slidePrev()),s.storiesBtnNext.addEventListener("click",async()=>{a.isEnd&&await h(a),a.slideNext()})}st();new ce(".about-swiper",{modules:[Me,ue,Be],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:window.innerWidth<768},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});document.addEventListener("mousemove",e=>{const t=e.pageX,n=e.pageY;s.cursor.style.left=t+"px",s.cursor.style.top=n+"px",s.cursor.style.display="block"});document.addEventListener("mouseout",e=>{s.cursor.style.display="none"});const nt=[{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."}];s.devTeamBtn.addEventListener("click",e=>{s.devTeamModalOverlay.innerHTML=ot(),it()});const ot=()=>`
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${ee}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${rt()}
      </ul>
    </div>`,rt=()=>nt.map(t=>{const n=t.github?"":"disabled",o=t.linkedIn?"":"disabled";return`
        <li class="dev-team-modal-member">
          <div class="dev-team-modal-member-image-wrapper">
            <img class="dev-team-modal-member-photo" src="${t.photo||"../img/hero/hero-tel.webp"}" alt="${t.name}" />
          </div>

          <div class="dev-team-modal-member-content">
            <div class="dev-team-modal-member-header">
              <h2 class="dev-team-modal-member-name">${t.name}</h2>
              <span class="dev-team-modal-member-role">${t.role||"Роль відсутня"}</span>
            </div>
            
            <div class="dev-team-modal-member-socials">
              <a 
                class="dev-team-modal-member-socials-btn" ${n}
                href="${t.github}"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
              <a 
                class="dev-team-modal-member-socials-btn" ${o}
                href="${t.linkedIn}"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
            </div>

            <p class="dev-team-modal-member-description">${t.description||"Опис відсутній"}</p>
          </div>
        </li>
        `}).join(""),ye=e=>{e.key==="Escape"&&be()},it=()=>{s.devTeamModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",ye)},be=()=>{s.devTeamModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",ye),setTimeout(()=>{s.devTeamModalOverlay.innerHTML=""},300)};document.addEventListener("click",e=>{const t=e.target;if(t.closest(".dev-team-modal-close")||t===s.devTeamModalOverlay){be();return}});const Ee="theme",we=document.querySelectorAll(".theme-selector, #theme-toggle-mob, .checkbox"),de=document.body;function Te(e){e?de.setAttribute("data-theme","dark"):de.removeAttribute("data-theme"),we.forEach(t=>{"checked"in t&&(t.checked=e)})}function at(e){Te(e),localStorage.setItem(Ee,e?"dark":"light")}we.forEach(e=>{e.addEventListener("change",()=>{at(!!e.checked)})});const j=localStorage.getItem(Ee);(j==="dark"||j==="light")&&Te(j==="dark");
//# sourceMappingURL=index.js.map
