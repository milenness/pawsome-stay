import { refs } from './refs';

const toggleMenu = () => refs.mobileMenu.classList.toggle('is-open');
const disableScroll = () =>
  document.body.classList.toggle('is-scroll-disabled');

const handleLinkClick = () => {
  toggleMenu();
  disableScroll();
};

refs.menuBtnOpen.addEventListener('click', toggleMenu);
refs.menuBtnClose.addEventListener('click', toggleMenu);

refs.menuBtnOpen.addEventListener('click', disableScroll);
refs.menuBtnClose.addEventListener('click', disableScroll);

refs.menuLinks.forEach(link => {
  link.addEventListener('click', handleLinkClick);
});
