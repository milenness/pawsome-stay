import { refs } from './refs';

const cursor = refs.cursor;

document.addEventListener('mousemove', evt => {
  const x = evt.pageX;
  const y = evt.pageY;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  cursor.style.display = 'block';
});

document.addEventListener('mouseout', evt => {
  cursor.style.display = 'none';
});