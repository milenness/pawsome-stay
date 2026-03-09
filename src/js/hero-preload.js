(function preloadActiveHeroBackground() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const is2x = (window.devicePixelRatio || 1) >= 2;
  let breakpoint = 'tel';

  if (width >= 1440) {
    breakpoint = 'desk';
  } else if (width >= 768) {
    breakpoint = 'tabl';
  }

  const suffix = is2x ? '@2x' : '';
  const href = './img/hero/hero-' + breakpoint + suffix + '.webp';

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
