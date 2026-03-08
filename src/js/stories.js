import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import iconsSpriteUrl from '../img/icons.svg?url';
import { fetchFeedbacks } from './api/api';
import { notify, UA_TOAST } from './notifications';
import { refs } from './refs';

const FEEDBACKS_CACHE_KEY = 'stories-feedbacks-cache';
const FEEDBACKS_LIMIT = 12;
const FEEDBACKS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

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
  refs.storiesBtnPrev.disabled = swiperInstance.isBeginning;
  refs.storiesBtnNext.disabled = swiperInstance.isEnd;
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

function loadFeedbackCache() {
  try {
    const raw = localStorage.getItem(FEEDBACKS_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return null;

    return {
      items: parsed.items,
      total: Number(parsed.total) || parsed.items.length,
      page: Number(parsed.page) || 1,
      limit: Number(parsed.limit) || FEEDBACKS_LIMIT,
      savedAt: Number(parsed.savedAt) || 0,
    };
  } catch {
    return null;
  }
}

function saveFeedbackCache(cache) {
  try {
    const items = Array.isArray(cache?.items) ? cache.items : [];
    const total = Number(cache?.total) || items.length;

    localStorage.setItem(
      FEEDBACKS_CACHE_KEY,
      JSON.stringify({
        ...cache,
        items,
        total,
        page: Number(cache?.page) || 1,
        limit: Number(cache?.limit) || FEEDBACKS_LIMIT,
        savedAt: Date.now(),
      })
    );
  } catch {
    // Skip cache writes if storage is unavailable.
  }
}

function isCacheStale(savedAt) {
  if (!savedAt) return true;
  return Date.now() - savedAt > FEEDBACKS_CACHE_TTL_MS;
}

function appendFeedbacks(existingItems, incomingItems) {
  return [...existingItems, ...incomingItems];
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function initStories() {
  let currentPage = 1;
  let totalFeedbacks = 0;
  let isLoadingMore = false;
  let cachedItems = [];
  let shouldRefreshStaleCache = false;

  const cachedData = loadFeedbackCache();
  if (cachedData) {
    cachedItems = cachedData.items;
    totalFeedbacks = cachedData.total;
    currentPage = cachedData.page;
    shouldRefreshStaleCache = isCacheStale(cachedData.savedAt);
  }

  if (cachedItems.length) {
    // Show only one API-sized chunk from cache on initial load.
    const firstChunk = cachedItems.slice(0, FEEDBACKS_LIMIT);
    refs.storiesWrapperEl.innerHTML = firstChunk.map(buildSlide).join('');
    refs.storiesLoadingEl.classList.add('is-hidden');
    refs.storiesSliderWrap.classList.add('is-visible');
  } else {
    try {
      const data = await fetchFeedbacks(1, FEEDBACKS_LIMIT);
      const firstBatch = extractFeedbackList(data);
      if (!firstBatch.length) {
        notify.info(UA_TOAST.NO_FEEDBACKS);
        return;
      }

      cachedItems = firstBatch;
      currentPage = 1;
      totalFeedbacks = Number(data?.total) || firstBatch.length;

      saveFeedbackCache({
        items: cachedItems,
        total: totalFeedbacks,
        page: currentPage,
        limit: FEEDBACKS_LIMIT,
      });

      refs.storiesWrapperEl.innerHTML = firstBatch.map(buildSlide).join('');
      refs.storiesLoadingEl.classList.add('is-hidden');
      refs.storiesSliderWrap.classList.add('is-visible');
    } catch (err) {
      const isNetworkError = !err.response;
      if (isNetworkError) {
        notify.failure(UA_TOAST.NETWORK);
        return;
      }
      notify.failure(UA_TOAST.UNKNOWN_ERROR);
      return;
    }
  }

  const swiperInstance = new Swiper(refs.storiesSwiperEl, {
    modules: [Pagination],
    slidesPerView: getSlidesPerView(),
    spaceBetween: getSpaceBetween(),
    grabCursor: true,
    speed: 400,
    observer: true,
    observeParents: true,
    pagination: {
      el: refs.storiesPaginationEl,
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

  if (shouldRefreshStaleCache) {
    void refreshStaleCache(swiperInstance);
  }

  async function refreshStaleCache(swiper) {
    try {
      const data = await fetchFeedbacks(1, FEEDBACKS_LIMIT);
      const freshBatch = extractFeedbackList(data);
      if (!freshBatch.length) return;

      cachedItems = appendFeedbacks(cachedItems, freshBatch);
      currentPage = Math.max(currentPage, 1);
      totalFeedbacks = Math.max(
        Number(data?.total) || 0,
        totalFeedbacks,
        cachedItems.length
      );

      saveFeedbackCache({
        items: cachedItems,
        total: totalFeedbacks,
        page: currentPage,
        limit: FEEDBACKS_LIMIT,
      });

      refs.storiesWrapperEl.innerHTML = freshBatch.map(buildSlide).join('');
      swiper.slideTo(0, 0);
      swiper.update();
      updateNavButtons(swiper);
    } catch {
      // Keep already rendered cache if refresh fails.
    }
  }

  async function maybeLoadMore(swiper) {
    if (isLoadingMore) return;

    const loadedCount = refs.storiesWrapperEl.children.length;
    if (loadedCount >= totalFeedbacks) return;

    const visibleSlides = Math.ceil(Number(swiper.params.slidesPerView) || 1);
    const isNearEnd =
      swiper.activeIndex + visibleSlides >= swiper.slides.length;
    if (!isNearEnd) return;

    isLoadingMore = true;

    try {
      const nextCachedChunk = cachedItems.slice(
        loadedCount,
        loadedCount + FEEDBACKS_LIMIT
      );

      if (nextCachedChunk.length) {
        refs.storiesWrapperEl.insertAdjacentHTML(
          'beforeend',
          nextCachedChunk.map(buildSlide).join('')
        );
        swiper.update();
        return;
      }

      const nextPage = currentPage + 1;
      const data = await fetchFeedbacks(nextPage, FEEDBACKS_LIMIT);
      if (!data || !extractFeedbackList(data).length) {
        notify.info(UA_TOAST.NO_MORE_FEEDBACKS);
        totalFeedbacks = loadedCount;
        saveFeedbackCache({
          items: cachedItems,
          total: totalFeedbacks,
          page: currentPage,
          limit: FEEDBACKS_LIMIT,
        });
        return;
      }

      const nextFeedbacks = extractFeedbackList(data);
      totalFeedbacks = Number(data?.total) || totalFeedbacks;

      if (!nextFeedbacks.length) {
        totalFeedbacks = loadedCount;
        saveFeedbackCache({
          items: cachedItems,
          total: totalFeedbacks,
          page: currentPage,
          limit: FEEDBACKS_LIMIT,
        });
        return;
      }

      cachedItems = appendFeedbacks(cachedItems, nextFeedbacks);
      currentPage = nextPage;

      saveFeedbackCache({
        items: cachedItems,
        total: totalFeedbacks,
        page: currentPage,
        limit: FEEDBACKS_LIMIT,
      });

      refs.storiesWrapperEl.insertAdjacentHTML(
        'beforeend',
        nextFeedbacks.map(buildSlide).join('')
      );
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

  refs.storiesBtnPrev.addEventListener('click', () =>
    swiperInstance.slidePrev()
  );
  refs.storiesBtnNext.addEventListener('click', async () => {
    if (swiperInstance.isEnd) {
      await maybeLoadMore(swiperInstance);
    }
    swiperInstance.slideNext();
  });
}

initStories();
