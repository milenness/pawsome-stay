import{a as b,A as oe,S as u,b as G,N as ie,P as re,K as ae}from"./assets/vendor-7fgJCozV.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const ce="global-loader";let m=0;function v(e){return!(e!=null&&e.skipGlobalLoader)}function V(){return document.getElementById(ce)}function B(){const e=V();e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function w(){const e=V();e&&(m>0||(e.classList.add("is-hidden"),document.body.style.overflow=""))}document.addEventListener("DOMContentLoaded",()=>{B()});window.addEventListener("load",()=>{setTimeout(()=>{w()},600)});const le=window.fetch;window.fetch=async(...e)=>{m++,B();try{return await le(...e)}finally{m--,setTimeout(()=>{w()},200)}};b.interceptors.request.use(e=>(v(e)&&(m++,B()),e));b.interceptors.response.use(e=>(v(e.config)&&(m--,setTimeout(()=>{w()},200)),e),e=>(v(e.config)&&(m--,setTimeout(()=>{w()},200)),Promise.reject(e)));const de=b.create;b.create=function(...e){const s=de.apply(this,e);return s.interceptors.request.use(t=>(v(t)&&(m++,B()),t)),s.interceptors.response.use(t=>(v(t.config)&&(m--,setTimeout(()=>{w()},200)),t),t=>(v(t.config)&&(m--,setTimeout(()=>{w()},200)),Promise.reject(t))),s};new oe("#faq-accordion",{duration:300,showMultiple:!1});const ue=document.querySelector(".mobile-menu"),X=document.querySelector(".menu-btn-open"),z=document.querySelector(".menu-btn-close"),me=document.querySelectorAll(".mob-menu-link, .mob-menu-button"),C=()=>ue.classList.toggle("is-open"),D=()=>document.body.classList.toggle("is-scroll-disabled"),pe=()=>{C(),D()};X.addEventListener("click",C);z.addEventListener("click",C);X.addEventListener("click",D);z.addEventListener("click",D);me.forEach(e=>{e.addEventListener("click",pe)});const W=b.create({baseURL:"https://paw-hut.b.goit.study/api"}),fe="/categories",ge="/animals",ve="/orders";async function ye(){const{data:e}=await W.get(fe);return e}async function he(e=null,s=1,t=9){const n={page:s,limit:t};e&&(n.categoryId=e);const{data:o}=await W.get(ge,{params:n,skipGlobalLoader:!0});return o}const Le=async e=>{const{data:s}=await W.post(ve,e);return s};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".order-form"),s=document.querySelector(".order-overlay"),t=e==null?void 0:e.querySelector('button[type="submit"]');let n=null;window.openOrderModal=function(r){if(!r){console.warn("Спроба відкрити форму без ID тварини");return}n=r,s.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",i)};function o(){s.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",i),setTimeout(()=>{n=null,e&&(e.reset(),e.classList.remove("was-validated"))},250)}function i(r){r.key==="Escape"&&o()}s.addEventListener("click",r=>{(r.target.closest(".close-btn")||r.target===s)&&o()}),e&&e.addEventListener("submit",async r=>{var S,c;if(r.preventDefault(),e.classList.add("was-validated"),!e.checkValidity())return;if(!n){u.fire({title:"Помилка",text:"Не вдалося визначити ID тварини.",icon:"error",confirmButtonColor:"#2e2f42"});return}const E=new FormData(e),l=Object.fromEntries(E.entries()),g={name:l.name.trim(),phone:l.phone.trim(),comment:l.comment?l.comment.trim():"Хочу стати другом",animalId:n};try{t&&(t.disabled=!0,t.textContent="Надсилаємо..."),await Le(g),await u.fire({title:"Заявку успішно надіслано!",text:"Ми зв’яжемося з вами найближчим часом.",icon:"success",confirmButtonColor:"#2e2f42"}),o()}catch(p){const ne=((c=(S=p.response)==null?void 0:S.data)==null?void 0:c.message)||"Помилка при відправці.";u.fire({title:"Помилка!",text:ne,icon:"error"})}finally{t&&(t.disabled=!1,t.textContent="Надіслати")}})});const y={PETS_END:"Це всі хвостики за цим фільтром 🐾",PETS_EMPTY:"Хвостиків у цій категорії ще немає. Спробуйте іншу.",PETS_LOAD_FAIL:"Не вдалося завантажити хвостиків. Спробуйте ще раз.",PETS_CATEGORY_LOAD_FAIL:"Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.",NETWORK:"Немає з’єднання з інтернетом.",PET_DETAILS_FAIL:"Не вдалося завантажити дані хвостика. Спробуйте ще раз.",UNKNOWN_ERROR:"Щось пішло не так. Перезавантажте сайт та спробуйте ще раз."};function k(e,s){u.close(),u.fire({toast:!0,position:"top-end",icon:e,title:s,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"var(--color-mariner-lightest)",color:"var(--color-scheme-1-text)",width:"420px",padding:"18px 20px",customClass:{popup:"swal2-toast"},didOpen:t=>{t.style.borderRadius="16px",t.style.border="1px solid var(--color-scheme-1-border)",t.style.fontFamily="var(--font-family)",t.style.boxShadow="0 10px 30px var(--opacity-neutral-darkest-15)",t.style.lineHeight="1.4",t.style.fontSize="15px",t.addEventListener("mouseenter",u.stopTimer),t.addEventListener("mouseleave",u.resumeTimer)}})}const h={success(e){k("success",e)},failure(e){k("error",e)},warning(e){k("warning",e)},info(e){k("info",e)}},a=document.querySelector(".custom-cursor"),Z=document.querySelector(".nav-logo"),J=document.querySelector(".footer__logo");document.addEventListener("mousemove",e=>{a.style.left=e.clientX+"px",a.style.top=e.clientY+"px"});Z.addEventListener("mouseenter",()=>{a.classList.add("beating","small"),a.classList.remove("large"),a.style.transform="translate(-50%, -50%) scale(1)"});Z.addEventListener("mouseleave",()=>{a.classList.remove("beating","small"),a.style.transform="translate(-50%, -50%) scale(0)"});J.addEventListener("mouseenter",()=>{a.classList.add("beating","large"),a.classList.remove("small"),a.style.transform="translate(-50%, -50%) scale(1)"});J.addEventListener("mouseleave",()=>{a.classList.remove("beating","large"),a.style.transform="translate(-50%, -50%) scale(0)"});const f=document.querySelector(".pet-list"),d=document.querySelector(".load-more-pets-btn"),L=document.querySelector(".load-more-pets-btn-wrapper");let T=1,P=null,I=!1;function x(){f.innerHTML="",T=1,P=null,d.classList.add("is-hidden"),L.classList.add("is-hidden")}function we(){return f.querySelectorAll(".pet-list-item").length>0}function be(e){L&&(e?L.classList.remove("is-hidden"):L.classList.add("is-hidden"))}const Ee=()=>{const e=window.innerWidth;return e>=768&&e<1440?8:9};function Te(){return`
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
  `}function j(){const e=f.querySelector(".pet-list-loader");e&&e.remove()}function Ae(e){return e.map(({_id:s,name:t,age:n,gender:o,image:i,species:r,categories:E,behavior:l})=>`
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
  `).join("")}async function F(e=null,s=!1){if(!I){s&&(T=1,P=e,f.innerHTML="",L&&L.classList.add("is-hidden")),f.insertAdjacentHTML("beforeend",Te()),I=!0;try{const t=Ee(),{animals:n,totalItems:o}=await he(P,T,t);if(!Array.isArray(n)||n.length===0){x(),h.failure(y.PETS_EMPTY);return}j(),f.insertAdjacentHTML("beforeend",Ae(n));const i=Math.ceil(o/t);T>=i||n.length===0?d&&d.classList.add("is-hidden"):d&&d.classList.remove("is-hidden")}catch(t){if(!t.response){h.failure(y.NETWORK);return}h.failure(y.UNKNOWN_ERROR),j(),d&&d.classList.add("is-hidden")}finally{I=!1,be(we())}}}d&&d.addEventListener("click",async()=>{if(I)return;T+=1,await F(P);const e=f.querySelector(".pet-list-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s,behavior:"smooth"})}});const N=document.querySelector(".categories-list");ye().then(e=>{if(!Array.isArray(e)||e.length===0){x(),h.failure(y.PETS_CATEGORY_LOAD_FAIL);return}const s=e.map(({_id:t,name:n})=>`<li class="categories-list-item" data-category-id="${t}">${n}</li>`);N.innerHTML='<li class="categories-list-item active" data-category-id="">Всі</li>'+s.join(""),F()}).catch(e=>{if(x(),!e.response){h.failure(y.NETWORK);return}h.failure(y.UNKNOWN_ERROR)});N.addEventListener("click",e=>{const s=e.target;if(s.nodeName!=="LI"||s.classList.contains("active"))return;const t=N.querySelector(".active");t&&t.classList.remove("active"),s.classList.add("active");const n=s.dataset.categoryId||null;F(n,!0)});const A=document.querySelector(".pet-modal-overlay");let R=[];const Se=b.create({baseURL:"https://paw-hut.b.goit.study/api"}),Q={NETWORK:"Відсутній зв’язок з сервером. Перевірте інтернет.",EMPTY_DATA:"Інформацію про тварин не знайдено.",LOAD_FAIL:"Не вдалося завантажити деталі тварини."};async function ke(){if(!(R.length>0))try{let e=1;const s=20;let t=1/0,n=[];for(;n.length<t;){const o=await Se.get("/animals",{params:{page:e,limit:s}}),{animals:i,totalItems:r}=o.data;if(!Array.isArray(i)||e===1&&i.length===0)break;n.push(...i),t=r||n.length,e++}R=n}catch(e){e.response||u.fire({title:"Мережа",text:Q.NETWORK,icon:"error"})}}function Oe(e){const t={Dogs:"Собака",Cats:"Кіт",Rabbits:"Кролик",Birds:"Птах",Other:"Тварина"}[e.species]||e.species||"Тварина",n=e._id||e.id;return`
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="/img/icons.svg#close"></use>
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
  `}async function Me(e){await ke();const s=R.find(t=>String(t._id||t.id)===String(e));s?(A.innerHTML=Oe(s),Ie()):u.fire({title:"Помилка",text:Q.LOAD_FAIL,icon:"warning"})}function Ie(){A.classList.add("is-open"),document.body.classList.add("modal-open"),document.addEventListener("keydown",ee)}function $(){A.classList.remove("is-open"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",ee),setTimeout(()=>{A.innerHTML=""},300)}function ee(e){e.key==="Escape"&&$()}document.addEventListener("click",e=>{const s=e.target,t=s.closest(".pet-more-info");if(t){const n=t.closest(".pet-list-item");n!=null&&n.id&&Me(n.id);return}if(s.closest(".pet-modal-close")||s===A){$();return}if(s.closest("#petModalActionBtn")){const n=s.closest("#petModalActionBtn").dataset.id;$(),typeof window.openOrderModal=="function"&&setTimeout(()=>{window.openOrderModal(n)},350)}});function Pe(){const e=document.querySelector("[data-scroll-top]");if(!e)return;let s=!1,t=null,n=window.scrollY,o=null,i=0;const r=250,E=220,l=c=>{const p=Date.now();p-i<E||(i=p,e.classList.remove("dir-up","dir-down"),e.classList.add(c==="up"?"dir-up":"dir-down"),e.classList.add("tracks-burst"),clearTimeout(t),t=setTimeout(()=>e.classList.remove("tracks-burst"),r))},g=()=>{const c=window.scrollY>400;if(c&&!s){e.classList.add("show"),e.classList.add("dir-up"),s=!0;return}!c&&s&&(e.classList.remove("show","tracks-burst"),clearTimeout(t),s=!1)},S=()=>{o||(o=requestAnimationFrame(()=>{o=null,g();const c=window.scrollY,p=c-n;s&&Math.abs(p)>=12&&(p>0?l("up"):l("down")),n=c}))};window.addEventListener("scroll",S,{passive:!0}),g(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Pe);const O=document.getElementById("theme-toggle");if(O){const e=document.documentElement;localStorage.getItem("theme")==="dark"&&(e.classList.add("darkmode"),O.checked=!0),O.addEventListener("change",()=>{const t=O.checked;e.classList.toggle("darkmode",t),localStorage.setItem("theme",t?"dark":"light")})}const Be="/pawsome-stay/assets/icons-xp8yXZvV.svg",_e="/feedbacks",xe=[{rating:4.5,comment:'Ми довго вагались, чи готові до собаки, але коли побачили на сайті Хатинки фото Арчі, зрозуміли — це наш. Тепер ми не уявляємо ранків без його веселого гавкоту та вечорів без спільних прогулянок. Він приніс у наш дім стільки сміху та любові! Дякуємо „Хатинці лапок" за нашого найкращого друга.',author:"Марина та Сергій"},{rating:5,comment:"Я завжди хотіла взяти котика, але боялась, що доросла тварина не зможе звикнути. Волонтери переконали мене дати шанс Алісі, і це було найкраще рішення! Її муркотіння — найкращий антистрес після робочого дня. Не бійтеся брати дорослих хвостиків, вони віддають вам безмежною любов'ю!",author:"Олена"},{rating:5,comment:"Ніколи не думала, що зважусь взяти собаку з притулку, але після першої зустрічі з Барсиком все змінилось. Він такий ніжний і вдячний! Дякую всій команді за підтримку та поради. Рекомендую всім — рятуйте тваринок, вони це заслуговують!",author:"Наталія"},{rating:4,comment:"Взяли кошеня на ім'я Рудик три місяці тому. Він вже повністю освоївся і став господарем квартири. Дуже вдячні волонтерам за допомогу та консультації з догляду. Прекрасна організація, яка дійсно піклується про тваринок!",author:"Дмитро та Ірина"},{rating:4.5,comment:"Лабрадор Бонні прийшла до нас два роки тому — і ми не уявляємо без неї жодного дня. Вона подружилась із нашими дітьми з першої хвилини. Щиро дякуємо за те, що зводите людей і тваринок разом!",author:"Сім'я Ковальських"}],Ne=document.getElementById("stories-loading"),Re=document.getElementById("stories-slider-wrap"),$e=document.getElementById("stories-swiper"),qe=document.getElementById("stories-swiper-wrapper"),q=document.getElementById("stories-pagination"),te=document.getElementById("stories-btn-prev"),se=document.getElementById("stories-btn-next");function H(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ce(e){let t=`<div class="review-stars" aria-label="Оцінка ${e} з 5">`;for(let n=1;n<=5;n++){let o;e>=n?o="star-filled":e>=n-.5?o="star-half":o="star-outline",t+=`
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${Be}#${o}"></use>
        </svg>
      </span>`}return t+="</div>",t}function De(e){const s=parseFloat(e.rating)||5,t=H(e.comment||e.text||""),n=H(e.author||e.name||"Анонім");return`
    <li class="swiper-slide">
      <article class="review-card">
        ${Ce(s)}
        <p class="review-text">${t}</p>
        <p class="review-author">${n}</p>
      </article>
    </li>`}function K(e,s){q.innerHTML="";for(let t=0;t<e;t++){const n=document.createElement("button");n.className="stories-pagination-dot"+(t===0?" is-active":""),n.type="button",n.setAttribute("role","tab"),n.setAttribute("aria-label",`Відгук ${t+1}`),n.addEventListener("click",()=>s.slideTo(t)),q.appendChild(n)}}function U(e){q.querySelectorAll(".stories-pagination-dot").forEach((s,t)=>{s.classList.toggle("is-active",t===e)})}function _(e){te.disabled=e.isBeginning,se.disabled=e.isEnd}function M(){return window.innerWidth>=768?2:1}function Y(){return window.innerWidth>=1440?32:window.innerWidth>=768?24:16}async function We(){try{const e=await fetch(_e);if(!e.ok)throw new Error(`HTTP ${e.status}`);const s=await e.json(),t=Array.isArray(s)?s:s.feedbacks||s.data||[];if(t.length>=3)return t}catch{}return xe}async function Fe(){const e=await We();qe.innerHTML=e.map(De).join(""),Ne.classList.add("is-hidden"),Re.classList.add("is-visible");const s=new G($e,{slidesPerView:M(),spaceBetween:Y(),grabCursor:!0,speed:400,observer:!0,observeParents:!0,on:{init(t){K(e.length-M()+1,t),_(t)},slideChange(t){U(t.activeIndex),_(t)}}});window.addEventListener("resize",()=>{s.params.slidesPerView=M(),s.params.spaceBetween=Y(),s.update(),K(e.length-M()+1,s),U(s.activeIndex),_(s)}),te.addEventListener("click",()=>s.slidePrev()),se.addEventListener("click",()=>s.slideNext())}Fe();new G(".about-swiper",{modules:[ie,re,ae],slidesPerView:1,spaceBetween:20,navigation:{nextEl:".about-button-next",prevEl:".about-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!0}});
//# sourceMappingURL=index.js.map
