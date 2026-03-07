import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import iconsSpriteUrl from '../img/icons.svg?url';
import { refs } from './refs';
import { fetchFeedbacks } from './api/api';
import { notify, UA_TOAST } from './notifications';

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const loadingEl = refs.storiesLoadingEl;
const sliderWrap = refs.storiesSliderWrap;
const swiperEl = refs.storiesSwiperEl;
const wrapperEl = refs.storiesWrapperEl;
const paginationEl = refs.storiesPaginationEl;
const btnPrev = refs.storiesBtnPrev;
const btnNext = refs.storiesBtnNext;

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
  const rating = parseFloat(review.rating) || 5;
  const comment = escHtml(review.comment || review.text || '');
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

// ─── Pagination ───────────────────────────────────────────────────────────────

function buildPagination(count, swiperInstance) {
  paginationEl.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'stories-pagination-dot' + (i === 0 ? ' is-active' : '');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Відгук ${i + 1}`);
    dot.addEventListener('click', () => swiperInstance.slideTo(i));
    paginationEl.appendChild(dot);
  }
}

function updatePagination(activeIndex) {
  paginationEl.querySelectorAll('.stories-pagination-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === activeIndex);
  });
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

function extractFeedbackList(data) {
  return Array.isArray(data) ? data : data.feedbacks || data.data || [];
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function initStories() {
  let currentPage = 1;
  let totalFeedbacks = 0;
  let isLoadingMore = false;
  let feedbacks = [];

  try {
    const data = await fetchFeedbacks(currentPage);
    feedbacks = extractFeedbackList(data);
    if (!feedbacks.length) {
      notify.info(UA_TOAST.NO_FEEDBACKS);
      return;
    }
    totalFeedbacks = Number(data?.total) || feedbacks.length;
  } catch (err) {
    const isNetworkError = !err.response;
    if (isNetworkError) {
      notify.failure(UA_TOAST.NETWORK);
      return;
    }
    notify.failure(UA_TOAST.UNKNOWN_ERROR);
    totalFeedbacks = 0;
  }

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
        void maybeLoadMore(swiper);
      },
    },
  });

  async function maybeLoadMore(swiper) {
    if (isLoadingMore) return;

    const loadedCount = wrapperEl.children.length;
    if (loadedCount >= totalFeedbacks) return;

    const visibleSlides = Math.ceil(Number(swiper.params.slidesPerView) || 1);
    const isNearEnd =
      swiper.activeIndex + visibleSlides >= swiper.slides.length;
    if (!isNearEnd) return;

    isLoadingMore = true;

    try {
      const nextPage = currentPage + 1;
      const data = await fetchFeedbacks(nextPage);
      if (!data || !extractFeedbackList(data).length) {
        notify.info(UA_TOAST.NO_MORE_FEEDBACKS);
        return;
      }
      const nextFeedbacks = extractFeedbackList(data);
      totalFeedbacks = Number(data?.total) || totalFeedbacks;

      if (!nextFeedbacks.length) {
        totalFeedbacks = loadedCount;
        return;
      }

      wrapperEl.insertAdjacentHTML(
        'beforeend',
        nextFeedbacks.map(buildSlide).join('')
      );
      currentPage = nextPage;
      swiper.update();
    } catch (err) {
      const isNetworkError = !err.response;
      if (isNetworkError) {
        notify.failure(UA_TOAST.NETWORK);
        return;
      }
      notify.failure(UA_TOAST.UNKNOWN_ERROR);
    } finally {
      isLoadingMore = false;
      updateNavButtons(swiper);
    }
  }

  window.addEventListener('resize', () => {
    swiperInstance.params.slidesPerView = getSlidesPerView();
    swiperInstance.params.spaceBetween = getSpaceBetween();
    swiperInstance.update();
    updateNavButtons(swiperInstance);
  });

  btnPrev.addEventListener('click', () => swiperInstance.slidePrev());
  btnNext.addEventListener('click', async () => {
    if (swiperInstance.isEnd) {
      await maybeLoadMore(swiperInstance);
    }
    swiperInstance.slideNext();
  });
}

initStories();
