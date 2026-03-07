import { refs } from './refs';

document.addEventListener('mousemove', e => {
  refs.cursor.style.left = e.clientX + 'px';
  refs.cursor.style.top = e.clientY + 'px';
});

/* HEADER — маленька */
refs.navLogo.addEventListener('mouseenter', () => {
  refs.cursor.classList.add('beating', 'small');
  refs.cursor.classList.remove('large');
  refs.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

refs.navLogo.addEventListener('mouseleave', () => {
  refs.cursor.classList.remove('beating', 'small');
  refs.cursor.style.transform = 'translate(-50%, -50%) scale(0)';
});

/* FOOTER — велика */
refs.footerLogo.addEventListener('mouseenter', () => {
  refs.cursor.classList.add('beating', 'large');
  refs.cursor.classList.remove('small');
  refs.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

refs.footerLogo.addEventListener('mouseleave', () => {
  refs.cursor.classList.remove('beating', 'large');
  refs.cursor.style.transform = 'translate(-50%, -50%) scale(0)';
});
