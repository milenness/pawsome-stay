import { refs } from './refs';
const mobileMenu = refs.mobileMenu;
const menuBtnOpen = refs.menuBtnOpen;
const menuBtnClose = refs.menuBtnClose;

const menuLinks = refs.menuLinks;

const toggleMenu = () => mobileMenu.classList.toggle('is-open');
const disableScroll = () =>
  document.body.classList.toggle('is-scroll-disabled');

const handleLinkClick = () => {
  toggleMenu();
  disableScroll();
};

menuBtnOpen.addEventListener('click', toggleMenu);
menuBtnClose.addEventListener('click', toggleMenu);

menuBtnOpen.addEventListener('click', disableScroll);
menuBtnClose.addEventListener('click', disableScroll);

menuLinks.forEach(link => {
  link.addEventListener('click', handleLinkClick);
});
