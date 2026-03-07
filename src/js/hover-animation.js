import { refs } from './refs';
const cursor = refs.customCursor;
const headerLogo = refs.navLogo;
const footerLogo = refs.footerLogo;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* HEADER — маленька */
headerLogo.addEventListener('mouseenter', () => {
  cursor.classList.add('beating', 'small');
  cursor.classList.remove('large');
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

headerLogo.addEventListener('mouseleave', () => {
  cursor.classList.remove('beating', 'small');
  cursor.style.transform = 'translate(-50%, -50%) scale(0)';
});

/* FOOTER — велика */
footerLogo.addEventListener('mouseenter', () => {
  cursor.classList.add('beating', 'large');
  cursor.classList.remove('small');
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

footerLogo.addEventListener('mouseleave', () => {
  cursor.classList.remove('beating', 'large');
  cursor.style.transform = 'translate(-50%, -50%) scale(0)';
});
