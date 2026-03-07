import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.about-swiper', {
  modules: [Navigation, Pagination, Keyboard],

  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '.about-button-next',
    prevEl: '.about-button-prev',
  },

  pagination: {
    el: '.about-swiper-container .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  watchOverflow: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
