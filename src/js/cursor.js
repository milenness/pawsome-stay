import { refs } from './refs';

const interactiveSelector =
  'a, button, input, textarea, select, label, summary, [role="button"], [tabindex], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .categories-list-item, .review-card';

document.addEventListener('pointermove', evt => {
  if (!refs.cursor) return;

  refs.cursor.style.left = `${evt.clientX}px`;
  refs.cursor.style.top = `${evt.clientY}px`;

  const isLogo = evt.target.closest('.nav-logo, .footer__logo');
  const isInteractive = evt.target.closest(interactiveSelector);

  if (isLogo) {
    refs.cursor.classList.remove('is-hover');
    return;
  }

  if (isInteractive) {
    refs.cursor.classList.add('is-hover');
  } else {
    refs.cursor.classList.remove('is-hover');
  }
});

document.addEventListener('mouseleave', () => {
  if (!refs.cursor) return;
  refs.cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
  if (!refs.cursor) return;
  refs.cursor.style.display = 'block';
});
