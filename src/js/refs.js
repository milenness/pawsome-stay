export const refs = {
  //cursor
  cursor: document.querySelector('.cursor'),

  // Hover animation
  customCursor: document.querySelector('.custom-cursor'),
  navLogo: document.querySelector('.nav-logo'),
  footerLogo: document.querySelector('.footer__logo'),

  // mobile-menu
  mobileMenu: document.querySelector('.mobile-menu'),
  menuBtnOpen: document.querySelector('.menu-btn-open'),
  menuBtnClose: document.querySelector('.menu-btn-close'),
  menuLinks: document.querySelectorAll('.mob-menu-link, .mob-menu-button'),

  // order-modal
  orderForm: document.querySelector('.order-form'),
  orderOverlay: document.querySelector('.order-overlay'),

  //pawlist-modal
  petModalOverlay: document.querySelector('.pet-modal-overlay'),

  //scroll-to-top
  scrollToTopBtn: document.querySelector('[data-scroll-top]'),

  // stories
  storiesLoadingEl: document.getElementById('stories-loading'),
  storiesSliderWrap: document.getElementById('stories-slider-wrap'),
  storiesSwiperEl: document.getElementById('stories-swiper'),
  storiesWrapperEl: document.getElementById('stories-swiper-wrapper'),
  storiesPaginationEl: document.getElementById('stories-pagination'),
  storiesBtnPrev: document.getElementById('stories-btn-prev'),
  storiesBtnNext: document.getElementById('stories-btn-next'),

  // categories-list
  categoriesList: document.querySelector('.categories-list'),

  //pet-list
  petList: document.querySelector('.pet-list'),
  petListLoadMoreBtn: document.querySelector('.load-more-pets-btn'),
  petListLoadMoreBtnWrapper: document.querySelector(
    '.load-more-pets-btn-wrapper'
  ),

  // global-loader
  globalLoader: document.getElementById('global-loader'),

  //dev-team-btn
  devTeamBtn: document.querySelector('.dev-team-btn'),
  devTeamModalOverlay: document.querySelector('.dev-team-modal-overlay'),
};
