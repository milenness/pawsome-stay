import { refs } from './refs';

document.addEventListener('pointermove', e => {
  if (!refs.customCursor) return;

  refs.customCursor.style.left = `${e.clientX}px`;
  refs.customCursor.style.top = `${e.clientY}px`;
});

/* HEADER — маленька */
if (refs.navLogo) {
  refs.navLogo.addEventListener('mouseenter', () => {
    if (refs.cursor) refs.cursor.classList.add('is-hidden-on-logo');

    refs.customCursor.classList.add('beating', 'small');
    refs.customCursor.classList.remove('large');
    refs.customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  refs.navLogo.addEventListener('mouseleave', () => {
    if (refs.cursor) refs.cursor.classList.remove('is-hidden-on-logo');

    refs.customCursor.classList.remove('beating', 'small');
    refs.customCursor.style.transform = 'translate(-50%, -50%) scale(0)';
  });
}

/* FOOTER — велика */
if (refs.footerLogo) {
  refs.footerLogo.addEventListener('mouseenter', () => {
    if (refs.cursor) refs.cursor.classList.add('is-hidden-on-logo');

    refs.customCursor.classList.add('beating', 'large');
    refs.customCursor.classList.remove('small');
    refs.customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  refs.footerLogo.addEventListener('mouseleave', () => {
    if (refs.cursor) refs.cursor.classList.remove('is-hidden-on-logo');

    refs.customCursor.classList.remove('beating', 'large');
    refs.customCursor.style.transform = 'translate(-50%, -50%) scale(0)';
  });
}
