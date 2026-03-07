import Swiper from 'swiper';
import 'swiper/css';


const API_URL      = 'https://paw-hut.b.goit.study/api/feedbacks?limit=25&page=1';
const GROUP_SIZE   = 3;


const loadingEl    = document.getElementById('stories-loading');
const sliderWrap   = document.getElementById('stories-slider-wrap');
const swiperEl     = document.getElementById('stories-swiper');
const wrapperEl    = document.getElementById('stories-swiper-wrapper');
const paginationEl = document.getElementById('stories-pagination');
const btnPrev      = document.getElementById('stories-btn-prev');
const btnNext      = document.getElementById('stories-btn-next');


function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStars(rating) {
  const MAX = 5;
  let html = `<div class="review-stars" aria-label="Оцінка ${rating} з ${MAX}">`;
  for (let i = 1; i <= MAX; i++) {
    let iconId;
    if (rating >= i) iconId = 'star-filled';
    else if (rating >= i - 0.5) iconId = 'star-half';
    else iconId = 'star-outline';

    html += `<span class="review-star">
      <svg class="review-star-icon" aria-hidden="true">
        <use href="/img/icons.svg#${iconId}"></use>
      </svg>
    </span>`;
  }
  html += '</div>';
  return html;
}

function buildCard(feedback) {
  const rating  = parseFloat(feedback.rate) || 5;
  const comment = escHtml(feedback.description || '');
  const author  = escHtml(feedback.author || 'Анонім');

  return `<article class="review-card">
    ${renderStars(rating)}
    <p class="review-text">${comment}</p>
    <p class="review-author">${author}</p>
  </article>`;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function buildGroupSlide(group) {
  const cards = group.map(buildCard).join('');
  return `<li class="swiper-slide"><div class="review-group">${cards}</div></li>`;
}

function buildPagination(count, swiperInstance) {
  paginationEl.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'stories-pagination-dot' + (i === 0 ? ' is-active' : '');
    dot.type      = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Група відгуків ${i + 1}`);
    dot.addEventListener('click', () => swiperInstance.slideTo(i));
    paginationEl.appendChild(dot);
  }
}

function updatePagination(activeIndex) {
  paginationEl.querySelectorAll('.stories-pagination-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === activeIndex);
  });
}

function updateNavButtons(swiperInstance) {
  btnPrev.disabled = swiperInstance.isBeginning;
  btnNext.disabled = swiperInstance.isEnd;
}

async function fetchFeedbacks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.feedbacks || [];
}

async function initStories() {
  try {
    const feedbacks = await fetchFeedbacks();
    const groups = chunkArray(feedbacks, GROUP_SIZE);

    wrapperEl.innerHTML = groups.map(buildGroupSlide).join('');
    loadingEl.classList.add('is-hidden');
    sliderWrap.classList.add('is-visible');

    const swiperInstance = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      speed: 400,
      observer: true,
      observeParents: true,
      on: {
        init(swiper) {
          buildPagination(groups.length, swiper);
          updateNavButtons(swiper);
        },
        slideChange(swiper) {
          updatePagination(swiper.activeIndex);
          updateNavButtons(swiper);
        },
      },
    });

    btnPrev.addEventListener('click', () => swiperInstance.slidePrev());
    btnNext.addEventListener('click', () => swiperInstance.slideNext());

  } catch (err) {
    console.error('Failed to load feedbacks:', err);
    loadingEl.classList.add('is-hidden');
  }
}

initStories();