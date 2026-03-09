const HERO_IMAGE_URLS = {
  tel: {
    '1x': new URL('../img/hero/hero-tel.webp', import.meta.url).href,
    '2x': new URL('../img/hero/hero-tel@2x.webp', import.meta.url).href,
  },
  tabl: {
    '1x': new URL('../img/hero/hero-tabl.webp', import.meta.url).href,
    '2x': new URL('../img/hero/hero-tabl@2x.webp', import.meta.url).href,
  },
  desk: {
    '1x': new URL('../img/hero/hero-desk.webp', import.meta.url).href,
    '2x': new URL('../img/hero/hero-desk@2x.webp', import.meta.url).href,
  },
};

(function preloadActiveHeroBackground() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const is2x = (window.devicePixelRatio || 1) >= 2;
  let breakpoint = 'tel';

  if (width >= 1440) {
    breakpoint = 'desk';
  } else if (width >= 768) {
    breakpoint = 'tabl';
  }

  const densityKey = is2x ? '2x' : '1x';
  const href = HERO_IMAGE_URLS[breakpoint][densityKey];

  if (
    document.querySelector(
      'link[rel="preload"][as="image"][href="' + href + '"]'
    )
  ) {
    return;
  }

  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'image';
  preload.type = 'image/webp';
  preload.fetchPriority = 'high';
  preload.href = href;

  document.head.appendChild(preload);
})();
