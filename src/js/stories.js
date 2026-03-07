import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import iconsSpriteUrl from '../img/icons.svg?url';

// ─── Constants ───────────────────────────────────────────────────────────────

const API_URL = 'https://paw-hut.b.goit.study/api/feedbacks';

const DEMO_FEEDBACKS = [
  {
    rating: 4.5,
    comment:
      'Ми довго вагались, чи готові до собаки, але коли побачили на сайті Хатинки фото Арчі, зрозуміли — це наш. Тепер ми не уявляємо ранків без його веселого гавкоту та вечорів без спільних прогулянок. Він приніс у наш дім стільки сміху та любові! Дякуємо „Хатинці лапок" за нашого найкращого друга.',
    author: 'Марина та Сергій',
  },
  {
    rating: 5,
    comment:
      "Я завжди хотіла взяти котика, але боялась, що доросла тварина не зможе звикнути. Волонтери переконали мене дати шанс Алісі, і це було найкраще рішення! Її муркотіння — найкращий антистрес після робочого дня. Не бійтеся брати дорослих хвостиків, вони віддають вам безмежною любов'ю!",
    author: 'Олена',
  },
  {
    rating: 5,
    comment:
      'Ніколи не думала, що зважусь взяти собаку з притулку, але після першої зустрічі з Барсиком все змінилось. Він такий ніжний і вдячний! Дякую всій команді за підтримку та поради. Рекомендую всім — рятуйте тваринок, вони це заслуговують!',
    author: 'Наталія',
  },
  {
    rating: 4,
    comment:
      "Взяли кошеня на ім'я Рудик три місяці тому. Він вже повністю освоївся і став господарем квартири. Дуже вдячні волонтерам за допомогу та консультації з догляду. Прекрасна організація, яка дійсно піклується про тваринок!",
    author: 'Дмитро та Ірина',
  },
  {
    rating: 4.5,
    comment:
      'Лабрадор Бонні прийшла до нас два роки тому — і ми не уявляємо без неї жодного дня. Вона подружилась із нашими дітьми з першої хвилини. Щиро дякуємо за те, що зводите людей і тваринок разом!',
    author: "Сім'я Ковальських",
  },
];

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const loadingEl = document.getElementById('stories-loading');
const sliderWrap = document.getElementById('stories-slider-wrap');
const swiperEl = document.getElementById('stories-swiper');
const wrapperEl = document.getElementById('stories-swiper-wrapper');
const paginationEl = document.getElementById('stories-pagination');
const btnPrev = document.getElementById('stories-btn-prev');
const btnNext = document.getElementById('stories-btn-next');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render stars using SVG sprite icons from the project's icons.svg.
 * Supports whole and .5 values (star-filled / star-half / star-outline).
 * @param {number} rating
 * @returns {string}
 */
function renderStars(rating) {
  const MAX = 5;
  let html = `<div class="review-stars" aria-label="Оцінка ${rating} з ${MAX}">`;

  for (let i = 1; i <= MAX; i++) {
    let iconId;
    if (rating >= i) {
      iconId = 'star-filled';
    } else if (rating >= i - 0.5) {
      iconId = 'star-half';
    } else {
      iconId = 'star-outline';
    }
    html += `
      <span class="review-star">
        <svg class="review-star-icon" aria-hidden="true">
          <use href="${iconsSpriteUrl}#${iconId}"></use>
        </svg>
      </span>`;
  }

  html += '</div>';
  return html;
}

function buildSlide(review) {
  const rating = parseFloat(review.rating ?? review.rate) || 5;
  const comment = escHtml(
    review.comment || review.text || review.description || ''
  );
  const author = escHtml(review.author || review.name || 'Анонім');

  return `
    <li class="swiper-slide">
      <article class="review-card">
        ${renderStars(rating)}
        <p class="review-text">${comment}</p>
        <p class="review-author">${author}</p>
      </article>
    </li>`;
}

// ─── Nav buttons ──────────────────────────────────────────────────────────────

function updateNavButtons(swiperInstance) {
  btnPrev.disabled = swiperInstance.isBeginning;
  btnNext.disabled = swiperInstance.isEnd;
}

// ─── Responsive ───────────────────────────────────────────────────────────────

function getSlidesPerView() {
  return window.innerWidth >= 768 ? 2 : 1;
}

function getSpaceBetween() {
  if (window.innerWidth >= 1440) return 32;
  if (window.innerWidth >= 768) return 24;
  return 16;
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

async function fetchFeedbacks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.feedbacks || data.data || [];
    if (list.length >= 3) return list;
  } catch {
    // fallback to demo
  }
  return DEMO_FEEDBACKS;
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function initStories() {
  const feedbacks = await fetchFeedbacks();

  wrapperEl.innerHTML = feedbacks.map(buildSlide).join('');

  loadingEl.classList.add('is-hidden');
  sliderWrap.classList.add('is-visible');

  const swiperInstance = new Swiper(swiperEl, {
    modules: [Pagination],
    slidesPerView: getSlidesPerView(),
    spaceBetween: getSpaceBetween(),
    grabCursor: true,
    speed: 400,
    observer: true,
    observeParents: true,
    pagination: {
      el: paginationEl,
      clickable: true,
      dynamicBullets: true,
    },
    on: {
      init(swiper) {
        updateNavButtons(swiper);
      },
      slideChange(swiper) {
        updateNavButtons(swiper);
      },
    },
  });

  window.addEventListener('resize', () => {
    swiperInstance.params.slidesPerView = getSlidesPerView();
    swiperInstance.params.spaceBetween = getSpaceBetween();
    swiperInstance.update();
    updateNavButtons(swiperInstance);
  });

  btnPrev.addEventListener('click', () => swiperInstance.slidePrev());
  btnNext.addEventListener('click', () => swiperInstance.slideNext());
}

initStories();
