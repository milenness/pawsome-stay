import{a as w,A as Z,S as g,b as H,P as V,N as ee,K as te}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const t={cursor:document.querySelector(".cursor"),customCursor:document.querySelector(".custom-cursor"),navLogo:document.querySelector(".nav-logo"),footerLogo:document.querySelector(".footer__logo"),mobileMenu:document.querySelector(".mobile-menu"),menuBtnOpen:document.querySelector(".menu-btn-open"),menuBtnClose:document.querySelector(".menu-btn-close"),menuLinks:document.querySelectorAll(".mob-menu-link, .mob-menu-button"),orderForm:document.querySelector(".order-form"),orderOverlay:document.querySelector(".order-overlay"),petModalOverlay:document.querySelector(".pet-modal-overlay"),scrollToTopBtn:document.querySelector("[data-scroll-top]"),storiesLoadingEl:document.getElementById("stories-loading"),storiesSliderWrap:document.getElementById("stories-slider-wrap"),storiesSwiperEl:document.getElementById("stories-swiper"),storiesWrapperEl:document.getElementById("stories-swiper-wrapper"),storiesPaginationEl:document.getElementById("stories-pagination"),storiesBtnPrev:document.getElementById("stories-btn-prev"),storiesBtnNext:document.getElementById("stories-btn-next"),categoriesList:document.querySelector(".categories-list"),petList:document.querySelector(".pet-list"),petListLoadMoreBtn:document.querySelector(".load-more-pets-btn"),petListLoadMoreBtnWrapper:document.querySelector(".load-more-pets-btn-wrapper"),globalLoader:document.getElementById("global-loader"),devTeamBtn:document.querySelector(".dev-team-btn"),devTeamModalOverlay:document.querySelector(".dev-team-modal-overlay")};let p=0;function y(e){return!(e!=null&&e.skipGlobalLoader)}function O(){t.globalLoader&&(t.globalLoader.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function h(){t.globalLoader&&(p>0||(t.globalLoader.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{O()});window.addEventListener("load",()=>{setTimeout(()=>{h()},600)});const se=window.fetch;window.fetch=async(...e)=>{p++,O();try{return await se(...e)}finally{p--,setTimeout(()=>{h()},200)}};w.interceptors.request.use(e=>(y(e)&&(p++,O()),e));w.interceptors.response.use(e=>(y(e.config)&&(p--,setTimeout(()=>{h()},200)),e),e=>(y(e.config)&&(p--,setTimeout(()=>{h()},200)),Promise.reject(e)));const oe=w.create;w.create=function(...e){const s=oe.apply(this,e);return s.interceptors.request.use(o=>(y(o)&&(p++,O()),o)),s.interceptors.response.use(o=>(y(o.config)&&(p--,setTimeout(()=>{h()},200)),o),o=>(y(o.config)&&(p--,setTimeout(()=>{h()},200)),Promise.reject(o))),s};new Z("#faq-accordion",{duration:300,showMultiple:!1});const P=()=>t.mobileMenu.classList.toggle("is-open"),N=()=>document.body.classList.toggle("is-scroll-disabled"),re=()=>{P(),N()};t.menuBtnOpen.addEventListener("click",P);t.menuBtnClose.addEventListener("click",P);t.menuBtnOpen.addEventListener("click",N);t.menuBtnClose.addEventListener("click",N);t.menuLinks.forEach(e=>{e.addEventListener("click",re)});const k=w.create({baseURL:"https://paw-hut.b.goit.study/api"}),ne="/categories",ie="/animals",ae="/orders",le="/feedbacks";async function de(){const{data:e}=await k.get(ne);return e}async function ce(e=null,s=1,o=9){const n={page:s,limit:o};e&&(n.categoryId=e);const{data:r}=await k.get(ie,{params:n,skipGlobalLoader:!0});return r}const ue=async e=>{const{data:s}=await k.post(ae,e);return s},q=async(e=1,s=12)=>{const{data:o}=await k.get(le,{params:{page:e,limit:s},skipGlobalLoader:!0});return o},l={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",ORDER_SUCCESS_TITLE:"Заявку успішно надіслано!",ORDER_SUCCESS_TEXT:"Ми зв’яжемося з вами найближчим часом.",ORDER_ERROR:"Не вдалося надіслати заявку. Щось пішло не так. Спробуйте ще раз або пізніше.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function M(e,s){g.close(),g.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:o=>{o.style.borderRadius="16px",o.style.border="1px solid var(--color-scheme-1-border)",o.style.fontFamily="var(--font-family)",o.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",o.style.lineHeight="1.4",o.style.fontSize="15px",o.addEventListener("mouseenter",g.stopTimer),o.addEventListener("mouseleave",g.resumeTimer)}})}const m={success(e){M("success",e)},failure(e){M("error",e)},warning(e){M("warning",e)},info(e){M("info",e)}};document.addEventListener("DOMContentLoaded",()=>{var r;const e=(r=t.orderForm)==null?void 0:r.querySelector('button[type="submit"]');let s=null;window.openOrderModal=function(i){if(!i){console.warn("Спроба відкрити форму без ID тварини");return}s=i,t.orderOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",n)};function o(){t.orderOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",n),setTimeout(()=>{s=null,t.orderForm&&(t.orderForm.reset(),t.orderForm.classList.remove("was-validated"))},250)}function n(i){i.key==="Escape"&&o()}t.orderOverlay.addEventListener("click",i=>{(i.target.closest(".close-btn")||i.target===t.orderOverlay)&&o()}),t.orderForm&&t.orderForm.addEventListener("submit",async i=>{var L,d;if(i.preventDefault(),t.orderForm.classList.add("was-validated"),!t.orderForm.checkValidity())return;const a=new FormData(t.orderForm),u=Object.fromEntries(a.entries()),v={name:u.name.trim(),phone:u.phone.trim(),comment:u.comment?u.comment.trim():"Хочу стати другом",animalId:s};try{e&&(e.disabled=!0,e.textContent="Надсилаємо..."),await ue(v),await g.fire({title:l.ORDER_SUCCESS_TITLE,text:l.ORDER_SUCCESS_TEXT,icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(c){const T=((d=(L=c.response)==null?void 0:L.data)==null?void 0:d.message)||l.ORDER_ERROR;g.fire({title:"Помилка!",text:T,icon:"error"})}finally{e&&(e.disabled=!1,e.textContent="Надіслати")}})});document.addEventListener("mousemove",e=>{t.cursor.style.left=e.clientX+"px",t.cursor.style.top=e.clientY+"px"});t.navLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","small"),t.cursor.classList.remove("large"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.navLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","small"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});t.footerLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","large"),t.cursor.classList.remove("small"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.footerLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","large"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});let b=1,B=null,E=!1,f=[],C=j();function me(e){return f.find(s=>String(s._id||s.id)===String(e))}function pe(e,s){return Array.from(new Map([...e,...s].map(o=>[String(o._id||o.id),o])).values())}function R(){t.petList.innerHTML="",b=1,B=null,f=[],t.petListLoadMoreBtn.classList.add("is-hidden"),t.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function fe(){return t.petList.querySelectorAll(".pet-list-item").length>0}function ve(e){t.petListLoadMoreBtnWrapper&&(e?t.petListLoadMoreBtnWrapper.classList.remove("is-hidden"):t.petListLoadMoreBtnWrapper.classList.add("is-hidden"))}const Le=()=>{const e=window.innerWidth;return e>=768&&e<1440};function j(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const ge=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function ye(){return`
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
  `}function x(){const e=t.petList.querySelector(".pet-list-loader");e&&e.remove()}function he(e){return e.map(({_id:s,name:o,age:n,gender:r,image:i,species:a,categories:u,behavior:v})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${o}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${a}</span>
        <h3 class="pet-info-name">${o}</h3>

        <ul class="pet-info-categories-list">
          ${u.map(({name:L})=>`<li class="pet-info-categories-list-item">${L}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${n} роки/років</span>
          <span class="pet-gender">${r}</span>
        </div>

        <p class="pet-about">${v}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}function G(e){const o=Le()&&e&&f.length%2!==0?f.slice(0,-1):f;t.petList.innerHTML=he(o)}function be(){if(!f.length||E)return;const e=j();if(e===C)return;C=e;const s=!t.petListLoadMoreBtn.classList.contains("is-hidden");G(s)}async function _(e=null,s=!1){if(!E){s&&(b=1,B=e,t.petList.innerHTML="",f=[],t.petListLoadMoreBtnWrapper&&t.petListLoadMoreBtnWrapper.classList.add("is-hidden")),t.petList.insertAdjacentHTML("beforeend",ye()),E=!0;try{const o=ge(),{animals:n,totalItems:r}=await ce(B,b,o);if(!Array.isArray(n)||n.length===0){R(),m.failure(l.PETS_EMPTY);return}f=pe(f,n);const i=Math.ceil(r/o),a=b<i;x(),G(a),!a||n.length===0?t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden"):t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.remove("is-hidden")}catch(o){if(!o.response){m.failure(l.NETWORK);return}m.failure(l.UNKNOWN_ERROR),x(),t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden")}finally{E=!1,ve(fe())}}}t.petListLoadMoreBtn&&t.petListLoadMoreBtn.addEventListener("click",async()=>{if(E)return;b+=1,await _(B);const e=t.petList.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});window.addEventListener("resize",be);de().then(e=>{if(!Array.isArray(e)||e.length===0){R(),m.failure(l.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:o,name:n})=>`<li class="categories-list-item" data-category-id="${o}">${n}</li>`);t.categoriesList.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),_()}).catch(e=>{if(R(),!e.response){m.failure(l.NETWORK);return}m.failure(l.UNKNOWN_ERROR)});t.categoriesList.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const o=t.categoriesList.querySelector(".active");o&&o.classList.remove("active"),s.classList.add("active");const n=s.dataset.categoryId||null;_(n,!0)});const $="/pawsome-stay/assets/icons-Qm2MgQTx.svg";function Ee(e){const o={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",n=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${$}#close"></use>
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
  `}function we(e){const s=me(e);s?(t.petModalOverlay.innerHTML=Ee(s),Te()):m.failure(l.LOAD_FAIL)}function Te(){t.petModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",Y)}function I(){t.petModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",Y),setTimeout(()=>{t.petModalOverlay.innerHTML=""},300)}function Y(e){e.key==="Escape"&&I()}document.addEventListener("click",e=>{const s=e.target,o=s.closest(".pet-more-info");if(o){const r=o.closest(".pet-list-item");r!=null&&r.id&&we(r.id);return}if(s.closest(".pet-modal-close")||s===t.petModalOverlay){I();return}const n=s.closest("#petModalActionBtn");if(n){const r=n.dataset.id;I(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(r)},350)}});function Me(){if(!t.scrollToTopBtn)return;let e=!1,s=null,o=window.scrollY,n=null,r=0;const i=250,a=220,u=d=>{const c=Date.now();c-r<a||(r=c,t.scrollToTopBtn.classList.remove("dir-up","dir-down"),t.scrollToTopBtn.classList.add(d==="up"?"dir-up":"dir-down"),t.scrollToTopBtn.classList.add("tracks-burst"),clearTimeout(s),s=setTimeout(()=>t.scrollToTopBtn.classList.remove("tracks-burst"),i))},v=()=>{const d=window.scrollY>400;if(d&&!e){t.scrollToTopBtn.classList.add("show"),t.scrollToTopBtn.classList.add("dir-up"),e=!0;return}!d&&e&&(t.scrollToTopBtn.classList.remove("show","tracks-burst"),clearTimeout(s),e=!1)},L=()=>{n||(n=requestAnimationFrame(()=>{n=null,v();const d=window.scrollY,c=d-o;e&&Math.abs(c)>=12&&(c>0?u("up"):u("down")),o=d}))};window.addEventListener("scroll",L,{passive:!0}),v(),t.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Me);function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Se(e){let o=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let n=1;n<=5;n++){let r;e>=n?r="star-filled":e>=n-.5?r="star-half":r="star-outline",o+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${$}#${r}"></use>
        </svg>
      </span>`}return o+="</div>",o}function W(e){const s=parseFloat(e.rating??e.rate)||5,o=F(e.comment||e.text||e.description||""),n=F(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Se(s)}
        <p class="review-text">${o}</p>
        <p class="review-author">${n}</p>
      </article>
    </li>`}function S(e){t.storiesBtnPrev.disabled=e.isBeginning,t.storiesBtnNext.disabled=e.isEnd}function D(){return window.innerWidth>=768?2:1}function K(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function A(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}async function Be(){let e=1,s=0,o=!1,n=[];try{const a=await q(e);if(n=A(a),!n.length){m.info(l.NO_FEEDBACKS);return}s=Number(a==null?void 0:a.total)||n.length}catch(a){if(!a.response){m.failure(l.NETWORK);return}m.failure(l.UNKNOWN_ERROR),s=0}t.storiesWrapperEl.innerHTML=n.map(W).join(""),t.storiesLoadingEl.classList.add("is-hidden"),t.storiesSliderWrap.classList.add("is-visible");const r=new H(t.storiesSwiperEl,{modules:[V],slidesPerView:D(),spaceBetween:K(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:t.storiesPaginationEl,clickable:!0,dynamicBullets:!0},on:{init(a){S(a)},slideChange(a){S(a),i(a)}}});async function i(a){if(o)return;const u=t.storiesWrapperEl.children.length;if(u>=s)return;const v=Math.ceil(Number(a.params.slidesPerView)||1);if(a.activeIndex+v>=a.slides.length){o=!0;try{const d=e+1,c=await q(d);if(!c||!A(c).length){m.info(l.NO_MORE_FEEDBACKS);return}const T=A(c);if(s=Number(c==null?void 0:c.total)||s,!T.length){s=u;return}t.storiesWrapperEl.insertAdjacentHTML("beforeend",T.map(W).join("")),e=d,a.update()}catch(d){if(!d.response){m.failure(l.NETWORK);return}m.failure(l.UNKNOWN_ERROR)}finally{o=!1,S(a)}}}window.addEventListener("resize",()=>{r.params.slidesPerView=D(),r.params.spaceBetween=K(),r.update(),S(r)}),t.storiesBtnPrev.addEventListener("click",()=>r.slidePrev()),t.storiesBtnNext.addEventListener("click",async()=>{r.isEnd&&await i(r),r.slideNext()})}Be();new H(".about-swiper",{modules:[ee,V,te],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:window.innerWidth<768},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});document.addEventListener("mousemove",e=>{const s=e.pageX,o=e.pageY;t.cursor.style.left=s+"px",t.cursor.style.top=o+"px",t.cursor.style.display="block"});document.addEventListener("mouseout",e=>{t.cursor.style.display="none"});const Oe=[{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."}];t.devTeamBtn.addEventListener("click",e=>{t.devTeamModalOverlay.innerHTML=ke(),Re()});const ke=()=>`
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${$}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${Ae()}
      </ul>
    </div>`,Ae=()=>Oe.map(s=>{const o=s.github?"":"disabled",n=s.linkedIn?"":"disabled";return`
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
                class="dev-team-modal-member-socials-btn" ${n}
                href="${s.linkedIn}"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
            </div>

            <p class="dev-team-modal-member-description">${s.description||"Опис відсутній"}</p>
          </div>
        </li>
        `}).join(""),X=e=>{e.key==="Escape"&&z()},Re=()=>{t.devTeamModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",X)},z=()=>{t.devTeamModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",X),setTimeout(()=>{t.devTeamModalOverlay.innerHTML=""},300)};document.addEventListener("click",e=>{const s=e.target;if(s.closest(".dev-team-modal-close")||s===t.devTeamModalOverlay){z();return}});const Q=document.querySelectorAll(".theme-selector, #theme-toggle-mob, .checkbox"),U=document.body;function J(e){e?(U.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(U.removeAttribute("data-theme"),localStorage.setItem("theme","light")),Q.forEach(s=>{s.checked=e})}Q.forEach(e=>{e.addEventListener("change",()=>{J(e.checked)})});const Ie=localStorage.getItem("theme");Ie==="dark"&&J(!0);
//# sourceMappingURL=index.js.map
