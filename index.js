import{a as b,A as se,S as u,b as K,P as U,N as ne,K as oe}from"./assets/vendor-N3sEl8X9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const ie="global-loader";let m=0;function v(e){return!(e!=null&&e.skipGlobalLoader)}function H(){return document.getElementById(ie)}function P(){const e=H();e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function L(){const e=H();e&&(m>0||(e.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{P()});window.addEventListener("load",()=>{setTimeout(()=>{L()},600)});const re=window.fetch;window.fetch=async(...e)=>{m++,P();try{return await re(...e)}finally{m--,setTimeout(()=>{L()},200)}};b.interceptors.request.use(e=>(v(e)&&(m++,P()),e));b.interceptors.response.use(e=>(v(e.config)&&(m--,setTimeout(()=>{L()},200)),e),e=>(v(e.config)&&(m--,setTimeout(()=>{L()},200)),Promise.reject(e)));const ae=b.create;b.create=function(...e){const s=ae.apply(this,e);return s.interceptors.request.use(t=>(v(t)&&(m++,P()),t)),s.interceptors.response.use(t=>(v(t.config)&&(m--,setTimeout(()=>{L()},200)),t),t=>(v(t.config)&&(m--,setTimeout(()=>{L()},200)),Promise.reject(t))),s};new se("#faq-accordion",{duration:300,showMultiple:!1});const ce=document.querySelector(".mobile-menu"),Y=document.querySelector(".menu-btn-open"),G=document.querySelector(".menu-btn-close"),le=document.querySelectorAll(".mob-menu-link, .mob-menu-button"),N=()=>ce.classList.toggle("is-open"),q=()=>document.body.classList.toggle("is-scroll-disabled"),de=()=>{N(),q()};Y.addEventListener("click",N);G.addEventListener("click",N);Y.addEventListener("click",q);G.addEventListener("click",q);le.forEach(e=>{e.addEventListener("click",de)});const x=b.create({baseURL:"https://paw-hut.b.goit.study/api"}),ue="/categories",me="/animals",pe="/orders";async function fe(){const{data:e}=await x.get(ue);return e}async function ge(e=null,s=1,t=9){const n={page:s,limit:t};e&&(n.categoryId=e);const{data:o}=await x.get(me,{params:n,skipGlobalLoader:!0});return o}const ve=async e=>{const{data:s}=await x.post(pe,e);return s};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".order-form"),s=document.querySelector(".order-overlay"),t=e==null?void 0:e.querySelector('button[type="submit"]');let n=null;window.openOrderModal=function(r){if(!r){console.warn("Спроба відкрити форму без ID тварини");return}n=r,s.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",i)};function o(){s.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",i),setTimeout(()=>{n=null,e&&(e.reset(),e.classList.remove("was-validated"))},250)}function i(r){r.key==="Escape"&&o()}s.addEventListener("click",r=>{(r.target.closest(".close-btn")||r.target===s)&&o()}),e&&e.addEventListener("submit",async r=>{var S,c;if(r.preventDefault(),e.classList.add("was-validated"),!e.checkValidity())return;if(!n){u.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const E=new FormData(e),l=Object.fromEntries(E.entries()),g={name:l.name.trim(),phone:l.phone.trim(),comment:l.comment?l.comment.trim():"Хочу стати другом",animalId:n};try{t&&(t.disabled=!0,t.textContent="Надсилаємо..."),await ve(g),await u.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(p){const te=((c=(S=p.response)==null?void 0:S.data)==null?void 0:c.message)||"Помилка при відправці.";u.fire({title:"Помилка!",text:te,icon:"error"})}finally{t&&(t.disabled=!1,t.textContent="Надіслати")}})});const y={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function O(e,s){u.close(),u.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:t=>{t.style.borderRadius="16px",t.style.border="1px solid var(--color-scheme-1-border)",t.style.fontFamily="var(--font-family)",t.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",t.style.lineHeight="1.4",t.style.fontSize="15px",t.addEventListener("mouseenter",u.stopTimer),t.addEventListener("mouseleave",u.resumeTimer)}})}const w={success(e){O("success",e)},failure(e){O("error",e)},warning(e){O("warning",e)},info(e){O("info",e)}},a=document.querySelector(".custom-cursor"),V=document.querySelector(".nav-logo"),X=document.querySelector(".footer__logo");document.addEventListener("mousemove",e=>{a.style.left=e.clientX+"px",a.style.top=e.clientY+"px"});V.addEventListener("mouseenter",()=>{a.classList.add("beating","small"),a.classList.remove("large"),a.style.transform="translate(-50%, -50%) scale(1)"});V.addEventListener("mouseleave",()=>{a.classList.remove("beating","small"),a.style.transform="translate(-50%, -50%) scale(0)"});X.addEventListener("mouseenter",()=>{a.classList.add("beating","large"),a.classList.remove("small"),a.style.transform="translate(-50%, -50%) scale(1)"});X.addEventListener("mouseleave",()=>{a.classList.remove("beating","large"),a.style.transform="translate(-50%, -50%) scale(0)"});const f=document.querySelector(".pet-list"),d=document.querySelector(".load-more-pets-btn"),h=document.querySelector(".load-more-pets-btn-wrapper");let T=1,M=null,k=!1;function I(){f.innerHTML="",T=1,M=null,d.classList.add("is-hidden"),h.classList.add("is-hidden")}function ye(){return f.querySelectorAll(".pet-list-item").length>0}function we(e){h&&(e?h.classList.remove("is-hidden"):h.classList.add("is-hidden"))}const he=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function Le(){return`
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
  `}function D(){const e=f.querySelector(".pet-list-loader");e&&e.remove()}function be(e){return e.map(({_id:s,name:t,age:n,gender:o,image:i,species:r,categories:E,behavior:l})=>`
    <li class="pet-list-item" id="${s}">
      <img src="${i}" alt="${t}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${r}</span>
        <h3 class="pet-info-name">${t}</h3>

        <ul class="pet-info-categories-list">
          ${E.map(({name:g})=>`<li class="pet-info-categories-list-item">${g}</li>`).join("")}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${n} роки/років</span>
          <span class="pet-gender">${o}</span>
        </div>

        <p class="pet-about">${l}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `).join("")}async function C(e=null,s=!1){if(!k){s&&(T=1,M=e,f.innerHTML="",h&&h.classList.add("is-hidden")),f.insertAdjacentHTML("beforeend",Le()),k=!0;try{const t=he(),{animals:n,totalItems:o}=await ge(M,T,t);if(!Array.isArray(n)||n.length===0){I(),w.failure(y.PETS_EMPTY);return}D(),f.insertAdjacentHTML("beforeend",be(n));const i=Math.ceil(o/t);T>=i||n.length===0?d&&d.classList.add("is-hidden"):d&&d.classList.remove("is-hidden")}catch(t){if(!t.response){w.failure(y.NETWORK);return}w.failure(y.UNKNOWN_ERROR),D(),d&&d.classList.add("is-hidden")}finally{k=!1,we(ye())}}}d&&d.addEventListener("click",async()=>{if(k)return;T+=1,await C(M);const e=f.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});const _=document.querySelector(".categories-list");fe().then(e=>{if(!Array.isArray(e)||e.length===0){I(),w.failure(y.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:t,name:n})=>`<li class="categories-list-item" data-category-id="${t}">${n}</li>`);_.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),C()}).catch(e=>{if(I(),!e.response){w.failure(y.NETWORK);return}w.failure(y.UNKNOWN_ERROR)});_.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const t=_.querySelector(".active");t&&t.classList.remove("active"),s.classList.add("active");const n=s.dataset.categoryId||null;C(n,!0)});const z="/pawsome-stay/assets/icons-4wqh6OW-.svg",A=document.querySelector(".pet-modal-overlay");let R=[];const Ee=b.create({baseURL:"https://paw-hut.b.goit.study/api"}),J={NETWORK:"Відсутній зв’язок з сервером. Перевірте інтернет.",EMPTY_DATA:"Інформацію про тварин не знайдено.",LOAD_FAIL:"Не вдалося завантажити деталі тварини."};async function Te(){if(!(R.length>0))try{let e=1;const s=20;let t=1/0,n=[];for(;n.length<t;){const o=await Ee.get("/animals",{params:{page:e,limit:s}}),{animals:i,totalItems:r}=o.data;if(!Array.isArray(i)||e===1&&i.length===0)break;n.push(...i),t=r||n.length,e++}R=n}catch(e){e.response||u.fire({title:"Мережа",text:J.NETWORK,icon:"error"})}}function Ae(e){const t={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",n=e._id||e.id;return`
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

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${n}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `}async function Se(e){await Te();const s=R.find(t=>String(t._id||t.id)===String(e));s?(A.innerHTML=Ae(s),Oe()):u.fire({title:"Помилка",text:J.LOAD_FAIL,icon:"warning"})}function Oe(){A.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",Q)}function $(){A.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",Q),setTimeout(()=>{A.innerHTML=""},300)}function Q(e){e.key==="Escape"&&$()}document.addEventListener("click",e=>{const s=e.target,t=s.closest(".pet-more-info");if(t){const n=t.closest(".pet-list-item");n!=null&&n.id&&Se(n.id);return}if(s.closest(".pet-modal-close")||s===A){$();return}if(s.closest("#petModalActionBtn")){const n=s.closest("#petModalActionBtn").dataset.id;$(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function ke(){const e=document.querySelector("[data-scroll-top]");if(!e)return;let s=!1,t=null,n=window.scrollY,o=null,i=0;const r=250,E=220,l=c=>{const p=Date.now();p-i<E||(i=p,e.classList.remove("dir-up","dir-down"),e.classList.add(c==="up"?"dir-up":"dir-down"),e.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>e.classList.remove("tracks-burst"),r))},g=()=>{const c=window.scrollY>400;if(c&&!s){e.classList.add("show"),e.classList.add("dir-up"),s=!0;return}!c&&s&&(e.classList.remove("show","tracks-burst"),clearTimeout(t),s=!1)},S=()=>{o||(o=requestAnimationFrame(()=>{o=null,g();const c=window.scrollY,p=c-n;s&&Math.abs(p)>=12&&(p>0?l("up"):l("down")),n=c}))};window.addEventListener("scroll",S,{passive:!0}),g(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",ke);const Me="https://paw-hut.b.goit.study/api/feedbacks",Pe=[{rating:4.5,comment:'Ми довго вагались, чи готові до собаки, але коли побачили на сайті Хатинки фото Арчі, зрозуміли — це наш. Тепер ми не уявляємо ранків без його веселого гавкоту та вечорів без спільних прогулянок. Він приніс у наш дім стільки сміху та любові! Дякуємо „Хатинці лапок" за нашого найкращого друга.',author:"Марина та Сергій"},{rating:5,comment:"Я завжди хотіла взяти котика, але боялась, що доросла тварина не зможе звикнути. Волонтери переконали мене дати шанс Алісі, і це було найкраще рішення! Її муркотіння — найкращий антистрес після робочого дня. Не бійтеся брати дорослих хвостиків, вони віддають вам безмежною любов'ю!",author:"Олена"},{rating:5,comment:"Ніколи не думала, що зважусь взяти собаку з притулку, але після першої зустрічі з Барсиком все змінилось. Він такий ніжний і вдячний! Дякую всій команді за підтримку та поради. Рекомендую всім — рятуйте тваринок, вони це заслуговують!",author:"Наталія"},{rating:4,comment:"Взяли кошеня на ім'я Рудик три місяці тому. Він вже повністю освоївся і став господарем квартири. Дуже вдячні волонтерам за допомогу та консультації з догляду. Прекрасна організація, яка дійсно піклується про тваринок!",author:"Дмитро та Ірина"},{rating:4.5,comment:"Лабрадор Бонні прийшла до нас два роки тому — і ми не уявляємо без неї жодного дня. Вона подружилась із нашими дітьми з першої хвилини. Щиро дякуємо за те, що зводите людей і тваринок разом!",author:"Сім'я Ковальських"}],Be=document.getElementById("stories-loading"),Ie=document.getElementById("stories-slider-wrap"),_e=document.getElementById("stories-swiper"),Re=document.getElementById("stories-swiper-wrapper"),$e=document.getElementById("stories-pagination"),Z=document.getElementById("stories-btn-prev"),ee=document.getElementById("stories-btn-next");function W(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ne(e){let t=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let n=1;n<=5;n++){let o;e>=n?o="star-filled":e>=n-.5?o="star-half":o="star-outline",t+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${z}#${o}"></use>
        </svg>
      </span>`}return t+="</div>",t}function qe(e){const s=parseFloat(e.rating??e.rate)||5,t=W(e.comment||e.text||e.description||""),n=W(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Ne(s)}
        <p class="review-text">${t}</p>
        <p class="review-author">${n}</p>
      </article>
    </li>`}function B(e){Z.disabled=e.isBeginning,ee.disabled=e.isEnd}function F(){return window.innerWidth>=768?2:1}function j(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}async function xe(){try{const e=await fetch(Me);if(!e.ok)throw new Error(`HTTP ${e.status}`);const s=await e.json(),t=Array.isArray(s)?s:s.feedbacks||s.data||[];if(t.length>=3)return t}catch{}return Pe}async function Ce(){const e=await xe();Re.innerHTML=e.map(qe).join(""),Be.classList.add("is-hidden"),Ie.classList.add("is-visible");const s=new K(_e,{modules:[U],slidesPerView:F(),spaceBetween:j(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,pagination:{el:$e,clickable:!0,dynamicBullets:!0},on:{init(t){B(t)},slideChange(t){B(t)}}});window.addEventListener("resize",()=>{s.params.slidesPerView=F(),s.params.spaceBetween=j(),s.update(),B(s)}),Z.addEventListener("click",()=>s.slidePrev()),ee.addEventListener("click",()=>s.slideNext())}Ce();new K(".about-swiper",{modules:[ne,U,oe],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".about-swiper-container .swiper-pagination",clickable:!0,dynamicBullets:!0},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});
//# sourceMappingURL=index.js.map
