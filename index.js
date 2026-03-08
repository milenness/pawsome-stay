import{a as E,A as z,S as g,b as H,P as V,N as J,K as Q}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const t={cursor:document.querySelector(".cursor"),customCursor:document.querySelector(".custom-cursor"),navLogo:document.querySelector(".nav-logo"),footerLogo:document.querySelector(".footer__logo"),mobileMenu:document.querySelector(".mobile-menu"),menuBtnOpen:document.querySelector(".menu-btn-open"),menuBtnClose:document.querySelector(".menu-btn-close"),menuLinks:document.querySelectorAll(".mob-menu-link, .mob-menu-button"),orderForm:document.querySelector(".order-form"),orderOverlay:document.querySelector(".order-overlay"),petModalOverlay:document.querySelector(".pet-modal-overlay"),scrollToTopBtn:document.querySelector("[data-scroll-top]"),storiesLoadingEl:document.getElementById("stories-loading"),storiesSliderWrap:document.getElementById("stories-slider-wrap"),storiesSwiperEl:document.getElementById("stories-swiper"),storiesWrapperEl:document.getElementById("stories-swiper-wrapper"),storiesPaginationEl:document.getElementById("stories-pagination"),storiesBtnPrev:document.getElementById("stories-btn-prev"),storiesBtnNext:document.getElementById("stories-btn-next"),categoriesList:document.querySelector(".categories-list"),petList:document.querySelector(".pet-list"),petListLoadMoreBtn:document.querySelector(".load-more-pets-btn"),petListLoadMoreBtnWrapper:document.querySelector(".load-more-pets-btn-wrapper"),globalLoader:document.getElementById("global-loader"),devTeamBtn:document.querySelector(".dev-team-btn"),devTeamModalOverlay:document.querySelector(".dev-team-modal-overlay")};let p=0;function y(e){return!(e!=null&&e.skipGlobalLoader)}function k(){t.globalLoader&&(t.globalLoader.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function b(){t.globalLoader&&(p>0||(t.globalLoader.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{k()});window.addEventListener("load",()=>{setTimeout(()=>{b()},600)});const Z=window.fetch;window.fetch=async(...e)=>{p++,k();try{return await Z(...e)}finally{p--,setTimeout(()=>{b()},200)}};E.interceptors.request.use(e=>(y(e)&&(p++,k()),e));E.interceptors.response.use(e=>(y(e.config)&&(p--,setTimeout(()=>{b()},200)),e),e=>(y(e.config)&&(p--,setTimeout(()=>{b()},200)),Promise.reject(e)));const ee=E.create;E.create=function(...e){const s=ee.apply(this,e);return s.interceptors.request.use(o=>(y(o)&&(p++,k()),o)),s.interceptors.response.use(o=>(y(o.config)&&(p--,setTimeout(()=>{b()},200)),o),o=>(y(o.config)&&(p--,setTimeout(()=>{b()},200)),Promise.reject(o))),s};new z("#faq-accordion",{duration:300,showMultiple:!1});const I=()=>t.mobileMenu.classList.toggle("is-open"),$=()=>document.body.classList.toggle("is-scroll-disabled"),te=()=>{I(),$()};t.menuBtnOpen.addEventListener("click",I);t.menuBtnClose.addEventListener("click",I);t.menuBtnOpen.addEventListener("click",$);t.menuBtnClose.addEventListener("click",$);t.menuLinks.forEach(e=>{e.addEventListener("click",te)});const S=E.create({baseURL:"https://paw-hut.b.goit.study/api"}),se="/categories",oe="/animals",re="/orders",ne="/feedbacks";async function ie(){const{data:e}=await S.get(se);return e}async function ae(e=null,s=1,o=9){const n={page:s,limit:o};e&&(n.categoryId=e);const{data:r}=await S.get(oe,{params:n,skipGlobalLoader:!0});return r}const le=async e=>{const{data:s}=await S.post(re,e);return s},R=async(e=1,s=12)=>{const{data:o}=await S.get(ne,{params:{page:e,limit:s},skipGlobalLoader:!0});return o};document.addEventListener("DOMContentLoaded",()=>{var r;const e=(r=t.orderForm)==null?void 0:r.querySelector('button[type="submit"]');let s=null;window.openOrderModal=function(i){if(!i){console.warn("Спроба відкрити форму без ID тварини");return}s=i,t.orderOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",n)};function o(){t.orderOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",n),setTimeout(()=>{s=null,t.orderForm&&(t.orderForm.reset(),t.orderForm.classList.remove("was-validated"))},250)}function n(i){i.key==="Escape"&&o()}t.orderOverlay.addEventListener("click",i=>{(i.target.closest(".close-btn")||i.target===t.orderOverlay)&&o()}),t.orderForm&&t.orderForm.addEventListener("submit",async i=>{var L,l;if(i.preventDefault(),t.orderForm.classList.add("was-validated"),!t.orderForm.checkValidity())return;if(!s){g.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const a=new FormData(t.orderForm),c=Object.fromEntries(a.entries()),v={name:c.name.trim(),phone:c.phone.trim(),comment:c.comment?c.comment.trim():"Хочу стати другом",animalId:s};try{e&&(e.disabled=!0,e.textContent="Надсилаємо..."),await le(v),await g.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(d){const T=((l=(L=d.response)==null?void 0:L.data)==null?void 0:l.message)||"Помилка при відправці.";g.fire({title:"Помилка!",text:T,icon:"error"})}finally{e&&(e.disabled=!1,e.textContent="Надіслати")}})});const u={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NO_FEEDBACKS:"Поки що немає відгуків.",NO_MORE_FEEDBACKS:"Більше відгуків немає.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function M(e,s){g.close(),g.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:o=>{o.style.borderRadius="16px",o.style.border="1px solid var(--color-scheme-1-border)",o.style.fontFamily="var(--font-family)",o.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",o.style.lineHeight="1.4",o.style.fontSize="15px",o.addEventListener("mouseenter",g.stopTimer),o.addEventListener("mouseleave",g.resumeTimer)}})}const m={success(e){M("success",e)},failure(e){M("error",e)},warning(e){M("warning",e)},info(e){M("info",e)}};document.addEventListener("mousemove",e=>{t.cursor.style.left=e.clientX+"px",t.cursor.style.top=e.clientY+"px"});t.navLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","small"),t.cursor.classList.remove("large"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.navLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","small"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});t.footerLogo.addEventListener("mouseenter",()=>{t.cursor.classList.add("beating","large"),t.cursor.classList.remove("small"),t.cursor.style.transform="translate(-50%, -50%) scale(1)"});t.footerLogo.addEventListener("mouseleave",()=>{t.cursor.classList.remove("beating","large"),t.cursor.style.transform="translate(-50%, -50%) scale(0)"});let h=1,O=null,w=!1,f=[],x=j();function de(e){return f.find(s=>String(s._id||s.id)===String(e))}function ce(e,s){return Array.from(new Map([...e,...s].map(o=>[String(o._id||o.id),o])).values())}function P(){t.petList.innerHTML="",h=1,O=null,f=[],t.petListLoadMoreBtn.classList.add("is-hidden"),t.petListLoadMoreBtnWrapper.classList.add("is-hidden")}function ue(){return t.petList.querySelectorAll(".pet-list-item").length>0}function me(e){t.petListLoadMoreBtnWrapper&&(e?t.petListLoadMoreBtnWrapper.classList.remove("is-hidden"):t.petListLoadMoreBtnWrapper.classList.add("is-hidden"))}const pe=()=>{const e=window.innerWidth;return e>=768&&e<1440};function j(){const e=window.innerWidth;return e<768?"mobile":e<1440?"tablet":"desktop"}const fe=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function ve(){return`
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
  `}function C(){const e=t.petList.querySelector(".pet-list-loader");e&&e.remove()}function Le(e){return e.map(({_id:s,name:o,age:n,gender:r,image:i,species:a,categories:c,behavior:v})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${o}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${a}</span>
        <h3 class="pet-info-name">${o}</h3>

        <ul class="pet-info-categories-list">
          ${c.map(({name:L})=>`<li class="pet-info-categories-list-item">${L}</li>`).join("")}
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
  `).join("")}function G(e){const o=pe()&&e&&f.length%2!==0?f.slice(0,-1):f;t.petList.innerHTML=Le(o)}function ge(){if(!f.length||w)return;const e=j();if(e===x)return;x=e;const s=!t.petListLoadMoreBtn.classList.contains("is-hidden");G(s)}async function q(e=null,s=!1){if(!w){s&&(h=1,O=e,t.petList.innerHTML="",f=[],t.petListLoadMoreBtnWrapper&&t.petListLoadMoreBtnWrapper.classList.add("is-hidden")),t.petList.insertAdjacentHTML("beforeend",ve()),w=!0;try{const o=fe(),{animals:n,totalItems:r}=await ae(O,h,o);if(!Array.isArray(n)||n.length===0){P(),m.failure(u.PETS_EMPTY);return}f=ce(f,n);const i=Math.ceil(r/o),a=h<i;C(),G(a),!a||n.length===0?t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden"):t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.remove("is-hidden")}catch(o){if(!o.response){m.failure(u.NETWORK);return}m.failure(u.UNKNOWN_ERROR),C(),t.petListLoadMoreBtn&&t.petListLoadMoreBtn.classList.add("is-hidden")}finally{w=!1,me(ue())}}}t.petListLoadMoreBtn&&t.petListLoadMoreBtn.addEventListener("click",async()=>{if(w)return;h+=1,await q(O);const e=t.petList.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});window.addEventListener("resize",ge);ie().then(e=>{if(!Array.isArray(e)||e.length===0){P(),m.failure(u.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:o,name:n})=>`<li class="categories-list-item" data-category-id="${o}">${n}</li>`);t.categoriesList.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),q()}).catch(e=>{if(P(),!e.response){m.failure(u.NETWORK);return}m.failure(u.UNKNOWN_ERROR)});t.categoriesList.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const o=t.categoriesList.querySelector(".active");o&&o.classList.remove("active"),s.classList.add("active");const n=s.dataset.categoryId||null;q(n,!0)});const _="/pawsome-stay/assets/icons-AswN4jwa.svg";function ye(e){const o={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",n=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${_}#close"></use>
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
  `}function be(e){const s=de(e);s?(t.petModalOverlay.innerHTML=ye(s),he()):m.failure(u.LOAD_FAIL)}function he(){t.petModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",U)}function N(){t.petModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",U),setTimeout(()=>{t.petModalOverlay.innerHTML=""},300)}function U(e){e.key==="Escape"&&N()}document.addEventListener("click",e=>{const s=e.target,o=s.closest(".pet-more-info");if(o){const r=o.closest(".pet-list-item");r!=null&&r.id&&be(r.id);return}if(s.closest(".pet-modal-close")||s===t.petModalOverlay){N();return}const n=s.closest("#petModalActionBtn");if(n){const r=n.dataset.id;N(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(r)},350)}});function we(){if(!t.scrollToTopBtn)return;let e=!1,s=null,o=window.scrollY,n=null,r=0;const i=250,a=220,c=l=>{const d=Date.now();d-r<a||(r=d,t.scrollToTopBtn.classList.remove("dir-up","dir-down"),t.scrollToTopBtn.classList.add(l==="up"?"dir-up":"dir-down"),t.scrollToTopBtn.classList.add("tracks-burst"),clearTimeout(s),s=setTimeout(()=>t.scrollToTopBtn.classList.remove("tracks-burst"),i))},v=()=>{const l=window.scrollY>400;if(l&&!e){t.scrollToTopBtn.classList.add("show"),t.scrollToTopBtn.classList.add("dir-up"),e=!0;return}!l&&e&&(t.scrollToTopBtn.classList.remove("show","tracks-burst"),clearTimeout(s),e=!1)},L=()=>{n||(n=requestAnimationFrame(()=>{n=null,v();const l=window.scrollY,d=l-o;e&&Math.abs(d)>=12&&(d>0?c("up"):c("down")),o=l}))};window.addEventListener("scroll",L,{passive:!0}),v(),t.scrollToTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",we);function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ee(e){let o=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let n=1;n<=5;n++){let r;e>=n?r="star-filled":e>=n-.5?r="star-half":r="star-outline",o+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${_}#${r}"></use>
        </svg>
      </span>`}return o+="</div>",o}function W(e){const s=parseFloat(e.rating??e.rate)||5,o=F(e.comment||e.text||e.description||""),n=F(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Ee(s)}
        <p class="review-text">${o}</p>
        <p class="review-author">${n}</p>
      </article>
    </li>`}function B(e){t.storiesBtnPrev.disabled=e.isBeginning,t.storiesBtnNext.disabled=e.isEnd}function D(){return window.innerWidth>=768?2:1}function K(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}function A(e){return Array.isArray(e)?e:e.feedbacks||e.data||[]}async function Te(){let e=1,s=0,o=!1,n=[];try{const a=await R(e);if(n=A(a),!n.length){m.info(u.NO_FEEDBACKS);return}s=Number(a==null?void 0:a.total)||n.length}catch(a){if(!a.response){m.failure(u.NETWORK);return}m.failure(u.UNKNOWN_ERROR),s=0}t.storiesWrapperEl.innerHTML=n.map(W).join(""),t.storiesLoadingEl.classList.add("is-hidden"),t.storiesSliderWrap.classList.add("is-visible");const r=new H(t.storiesSwiperEl,{modules:[V],slidesPerView:D(),spaceBetween:K(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:t.storiesPaginationEl,clickable:!0,dynamicBullets:!0},on:{init(a){B(a)},slideChange(a){B(a),i(a)}}});async function i(a){if(o)return;const c=t.storiesWrapperEl.children.length;if(c>=s)return;const v=Math.ceil(Number(a.params.slidesPerView)||1);if(a.activeIndex+v>=a.slides.length){o=!0;try{const l=e+1,d=await R(l);if(!d||!A(d).length){m.info(u.NO_MORE_FEEDBACKS);return}const T=A(d);if(s=Number(d==null?void 0:d.total)||s,!T.length){s=c;return}t.storiesWrapperEl.insertAdjacentHTML("beforeend",T.map(W).join("")),e=l,a.update()}catch(l){if(!l.response){m.failure(u.NETWORK);return}m.failure(u.UNKNOWN_ERROR)}finally{o=!1,B(a)}}}window.addEventListener("resize",()=>{r.params.slidesPerView=D(),r.params.spaceBetween=K(),r.update(),B(r)}),t.storiesBtnPrev.addEventListener("click",()=>r.slidePrev()),t.storiesBtnNext.addEventListener("click",async()=>{r.isEnd&&await i(r),r.slideNext()})}Te();new H(".about-swiper",{modules:[J,V,Q],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:window.innerWidth<768},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});document.addEventListener("mousemove",e=>{const s=e.pageX,o=e.pageY;t.cursor.style.left=s+"px",t.cursor.style.top=o+"px",t.cursor.style.display="block"});document.addEventListener("mouseout",e=>{t.cursor.style.display="none"});const Me=[{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."},{photo:"",name:"Марина",github:"https://github.com/ImMima",linkedIn:"",role:"",description:"Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor."}];t.devTeamBtn.addEventListener("click",e=>{t.devTeamModalOverlay.innerHTML=Be(),ke()});const Be=()=>`
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${_}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${Oe()}
      </ul>
    </div>`,Oe=()=>Me.map(s=>{const o=s.github?"":"disabled",n=s.linkedIn?"":"disabled";return`
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
        `}).join(""),Y=e=>{e.key==="Escape"&&X()},ke=()=>{t.devTeamModalOverlay.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",Y)},X=()=>{t.devTeamModalOverlay.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",Y),setTimeout(()=>{t.devTeamModalOverlay.innerHTML=""},300)};document.addEventListener("click",e=>{const s=e.target;if(s.closest(".dev-team-modal-close")||s===t.devTeamModalOverlay){X();return}});
//# sourceMappingURL=index.js.map
