import{a as A,A as te,S as p,b as H,P as U,N as se,K as ne}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const oe="global-loader";let u=0;function L(e){return!(e!=null&&e.skipGlobalLoader)}function K(){return document.getElementById(oe)}function P(){const e=K();e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function h(){const e=K();e&&(u>0||(e.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{P()});window.addEventListener("load",()=>{setTimeout(()=>{h()},600)});const ie=window.fetch;window.fetch=async(...e)=>{u++,P();try{return await ie(...e)}finally{u--,setTimeout(()=>{h()},200)}};A.interceptors.request.use(e=>(L(e)&&(u++,P()),e));A.interceptors.response.use(e=>(L(e.config)&&(u--,setTimeout(()=>{h()},200)),e),e=>(L(e.config)&&(u--,setTimeout(()=>{h()},200)),Promise.reject(e)));const re=A.create;A.create=function(...e){const s=re.apply(this,e);return s.interceptors.request.use(t=>(L(t)&&(u++,P()),t)),s.interceptors.response.use(t=>(L(t.config)&&(u--,setTimeout(()=>{h()},200)),t),t=>(L(t.config)&&(u--,setTimeout(()=>{h()},200)),Promise.reject(t))),s};new te("#faq-accordion",{duration:300,showMultiple:!1});const ae=document.querySelector(".mobile-menu"),Y=document.querySelector(".menu-btn-open"),G=document.querySelector(".menu-btn-close"),ce=document.querySelectorAll(".mob-menu-link, .mob-menu-button"),N=()=>ae.classList.toggle("is-open"),R=()=>document.body.classList.toggle("is-scroll-disabled"),le=()=>{N(),R()};Y.addEventListener("click",N);G.addEventListener("click",N);Y.addEventListener("click",R);G.addEventListener("click",R);ce.forEach(e=>{e.addEventListener("click",le)});const x=A.create({baseURL:"https://paw-hut.b.goit.study/api"}),de="/categories",ue="/animals",me="/orders";async function pe(){const{data:e}=await x.get(de);return e}async function fe(e=null,s=1,t=9){const o={page:s,limit:t};e&&(o.categoryId=e);const{data:n}=await x.get(ue,{params:o,skipGlobalLoader:!0});return n}const ge=async e=>{const{data:s}=await x.post(me,e);return s};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".order-form"),s=document.querySelector(".order-overlay"),t=e==null?void 0:e.querySelector('button[type="submit"]');let o=null;window.openOrderModal=function(r){if(!r){console.warn("Спроба відкрити форму без ID тварини");return}o=r,s.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",i)};function n(){s.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",i),setTimeout(()=>{o=null,e&&(e.reset(),e.classList.remove("was-validated"))},250)}function i(r){r.key==="Escape"&&n()}s.addEventListener("click",r=>{(r.target.closest(".close-btn")||r.target===s)&&n()}),e&&e.addEventListener("submit",async r=>{var O,c;if(r.preventDefault(),e.classList.add("was-validated"),!e.checkValidity())return;if(!o){p.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const b=new FormData(e),l=Object.fromEntries(b.entries()),y={name:l.name.trim(),phone:l.phone.trim(),comment:l.comment?l.comment.trim():"Хочу стати другом",animalId:o};try{t&&(t.disabled=!0,t.textContent="Надсилаємо..."),await ge(y),await p.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),n()}catch(m){const ee=((c=(O=m.response)==null?void 0:O.data)==null?void 0:c.message)||"Помилка при відправці.";p.fire({title:"Помилка!",text:ee,icon:"error"})}finally{t&&(t.disabled=!1,t.textContent="Надіслати")}})});const f={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",LOAD_FAIL:"Не вдалося завантажити детальну інформацію про тварину.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function k(e,s){p.close(),p.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:t=>{t.style.borderRadius="16px",t.style.border="1px solid var(--color-scheme-1-border)",t.style.fontFamily="var(--font-family)",t.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",t.style.lineHeight="1.4",t.style.fontSize="15px",t.addEventListener("mouseenter",p.stopTimer),t.addEventListener("mouseleave",p.resumeTimer)}})}const g={success(e){k("success",e)},failure(e){k("error",e)},warning(e){k("warning",e)},info(e){k("info",e)}},a=document.querySelector(".custom-cursor"),V=document.querySelector(".nav-logo"),X=document.querySelector(".footer__logo");document.addEventListener("mousemove",e=>{a.style.left=e.clientX+"px",a.style.top=e.clientY+"px"});V.addEventListener("mouseenter",()=>{a.classList.add("beating","small"),a.classList.remove("large"),a.style.transform="translate(-50%, -50%) scale(1)"});V.addEventListener("mouseleave",()=>{a.classList.remove("beating","small"),a.style.transform="translate(-50%, -50%) scale(0)"});X.addEventListener("mouseenter",()=>{a.classList.add("beating","large"),a.classList.remove("small"),a.style.transform="translate(-50%, -50%) scale(1)"});X.addEventListener("mouseleave",()=>{a.classList.remove("beating","large"),a.style.transform="translate(-50%, -50%) scale(0)"});const v=document.querySelector(".pet-list"),d=document.querySelector(".load-more-pets-btn"),w=document.querySelector(".load-more-pets-btn-wrapper");let E=1,B=null,M=!1,S=[];function ve(e){return S.find(s=>String(s._id||s.id)===String(e))}function ye(e,s){return Array.from(new Map([...e,...s].map(t=>[String(t._id||t.id),t])).values())}function _(){v.innerHTML="",E=1,B=null,S=[],d.classList.add("is-hidden"),w.classList.add("is-hidden")}function Le(){return v.querySelectorAll(".pet-list-item").length>0}function we(e){w&&(e?w.classList.remove("is-hidden"):w.classList.add("is-hidden"))}const he=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function be(){return`
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
  `}function D(){const e=v.querySelector(".pet-list-loader");e&&e.remove()}function Ee(e){return e.map(({_id:s,name:t,age:o,gender:n,image:i,species:r,categories:b,behavior:l})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${t}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${r}</span>
        <h3 class="pet-info-name">${t}</h3>

        <ul class="pet-info-categories-list">
          ${b.map(({name:y})=>`<li class="pet-info-categories-list-item">${y}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${o} роки/років</span>
          <span class="pet-gender">${n}</span>
        </div>

        <p class="pet-about">${l}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}async function C(e=null,s=!1){if(!M){s&&(E=1,B=e,v.innerHTML="",S=[],w&&w.classList.add("is-hidden")),v.insertAdjacentHTML("beforeend",be()),M=!0;try{const t=he(),{animals:o,totalItems:n}=await fe(B,E,t);if(!Array.isArray(o)||o.length===0){_(),g.failure(f.PETS_EMPTY);return}D(),v.insertAdjacentHTML("beforeend",Ee(o)),S=ye(S,o);const i=Math.ceil(n/t);E>=i||o.length===0?d&&d.classList.add("is-hidden"):d&&d.classList.remove("is-hidden")}catch(t){if(!t.response){g.failure(f.NETWORK);return}g.failure(f.UNKNOWN_ERROR),D(),d&&d.classList.add("is-hidden")}finally{M=!1,we(Le())}}}d&&d.addEventListener("click",async()=>{if(M)return;E+=1,await C(B);const e=v.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});const q=document.querySelector(".categories-list");pe().then(e=>{if(!Array.isArray(e)||e.length===0){_(),g.failure(f.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:t,name:o})=>`<li class="categories-list-item" data-category-id="${t}">${o}</li>`);q.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),C()}).catch(e=>{if(_(),!e.response){g.failure(f.NETWORK);return}g.failure(f.UNKNOWN_ERROR)});q.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const t=q.querySelector(".active");t&&t.classList.remove("active"),s.classList.add("active");const o=s.dataset.categoryId||null;C(o,!0)});const z="/pawsome-stay/assets/icons-4wqh6OW-.svg",T=document.querySelector(".pet-modal-overlay");function Se(e){const t={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",o=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${z}#close"></use>
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

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${o}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `}function Te(e){const s=ve(e);s?(T.innerHTML=Se(s),Ae()):g.failure(f.LOAD_FAIL)}function Ae(){T.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",J)}function $(){T.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",J),setTimeout(()=>{T.innerHTML=""},300)}function J(e){e.key==="Escape"&&$()}document.addEventListener("click",e=>{const s=e.target,t=s.closest(".pet-more-info");if(t){const n=t.closest(".pet-list-item");n!=null&&n.id&&Te(n.id);return}if(s.closest(".pet-modal-close")||s===T){$();return}const o=s.closest("#petModalActionBtn");if(o){const n=o.dataset.id;$(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function Oe(){const e=document.querySelector("[data-scroll-top]");if(!e)return;let s=!1,t=null,o=window.scrollY,n=null,i=0;const r=250,b=220,l=c=>{const m=Date.now();m-i<b||(i=m,e.classList.remove("dir-up","dir-down"),e.classList.add(c==="up"?"dir-up":"dir-down"),e.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>e.classList.remove("tracks-burst"),r))},y=()=>{const c=window.scrollY>400;if(c&&!s){e.classList.add("show"),e.classList.add("dir-up"),s=!0;return}!c&&s&&(e.classList.remove("show","tracks-burst"),clearTimeout(t),s=!1)},O=()=>{n||(n=requestAnimationFrame(()=>{n=null,y();const c=window.scrollY,m=c-o;s&&Math.abs(m)>=12&&(m>0?l("up"):l("down")),o=c}))};window.addEventListener("scroll",O,{passive:!0}),y(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Oe);const ke="https://paw-hut.b.goit.study/api/feedbacks",Me=[{rating:4.5,comment:'Ми довго вагались, чи готові до собаки, але коли побачили на сайті Хатинки фото Арчі, зрозуміли — це наш. Тепер ми не уявляємо ранків без його веселого гавкоту та вечорів без спільних прогулянок. Він приніс у наш дім стільки сміху та любові! Дякуємо „Хатинці лапок" за нашого найкращого друга.',author:"Марина та Сергій"},{rating:5,comment:"Я завжди хотіла взяти котика, але боялась, що доросла тварина не зможе звикнути. Волонтери переконали мене дати шанс Алісі, і це було найкраще рішення! Її муркотіння — найкращий антистрес після робочого дня. Не бійтеся брати дорослих хвостиків, вони віддають вам безмежною любов'ю!",author:"Олена"},{rating:5,comment:"Ніколи не думала, що зважусь взяти собаку з притулку, але після першої зустрічі з Барсиком все змінилось. Він такий ніжний і вдячний! Дякую всій команді за підтримку та поради. Рекомендую всім — рятуйте тваринок, вони це заслуговують!",author:"Наталія"},{rating:4,comment:"Взяли кошеня на ім'я Рудик три місяці тому. Він вже повністю освоївся і став господарем квартири. Дуже вдячні волонтерам за допомогу та консультації з догляду. Прекрасна організація, яка дійсно піклується про тваринок!",author:"Дмитро та Ірина"},{rating:4.5,comment:"Лабрадор Бонні прийшла до нас два роки тому — і ми не уявляємо без неї жодного дня. Вона подружилась із нашими дітьми з першої хвилини. Щиро дякуємо за те, що зводите людей і тваринок разом!",author:"Сім'я Ковальських"}],Be=document.getElementById("stories-loading"),Pe=document.getElementById("stories-slider-wrap"),Ie=document.getElementById("stories-swiper"),_e=document.getElementById("stories-swiper-wrapper"),qe=document.getElementById("stories-pagination"),Q=document.getElementById("stories-btn-prev"),Z=document.getElementById("stories-btn-next");function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $e(e){let t=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let o=1;o<=5;o++){let n;e>=o?n="star-filled":e>=o-.5?n="star-half":n="star-outline",t+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${z}#${n}"></use>
        </svg>
      </span>`}return t+="</div>",t}function Ne(e){const s=parseFloat(e.rating??e.rate)||5,t=F(e.comment||e.text||e.description||""),o=F(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${$e(s)}
        <p class="review-text">${t}</p>
        <p class="review-author">${o}</p>
      </article>
    </li>`}function I(e){Q.disabled=e.isBeginning,Z.disabled=e.isEnd}function W(){return window.innerWidth>=768?2:1}function j(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}async function Re(){try{const e=await fetch(ke);if(!e.ok)throw new Error(`HTTP ${e.status}`);const s=await e.json(),t=Array.isArray(s)?s:s.feedbacks||s.data||[];if(t.length>=3)return t}catch{}return Me}async function xe(){const e=await Re();_e.innerHTML=e.map(Ne).join(""),Be.classList.add("is-hidden"),Pe.classList.add("is-visible");const s=new H(Ie,{modules:[U],slidesPerView:W(),spaceBetween:j(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:qe,clickable:!0,dynamicBullets:!0},on:{init(t){I(t)},slideChange(t){I(t)}}});window.addEventListener("resize",()=>{s.params.slidesPerView=W(),s.params.spaceBetween=j(),s.update(),I(s)}),Q.addEventListener("click",()=>s.slidePrev()),Z.addEventListener("click",()=>s.slideNext())}xe();new H(".about-swiper",{modules:[se,U,ne],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-swiper-container .swiper-pagination",clickable:!0,dynamicBullets:!0},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});
//# sourceMappingURL=index.js.map
