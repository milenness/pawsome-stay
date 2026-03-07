import { refs } from './refs';

document.addEventListener('mousemove', evt => {
  const x = evt.pageX;
  const y = evt.pageY;
  refs.cursor.style.left = x + 'px';
  refs.cursor.style.top = y + 'px';
  refs.cursor.style.display = 'block';
});

document.addEventListener('mouseout', evt => {
  refs.cursor.style.display = 'none';
});
