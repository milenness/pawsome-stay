import { refs } from './refs';

function initScrollToTop() {
  if (!refs.scrollToTopBtn) return;

  let shown = false;
  let burstTimer = null;

  // щоб розуміти напрямок скролла
  let lastY = window.scrollY;
  let rafId = null;

  // burst
  let lastBurstAt = 0;
  const BURST_DURATION = 250;
  const BURST_COOLDOWN = 220;

  const burst = direction => {
    const now = Date.now();
    if (now - lastBurstAt < BURST_COOLDOWN) return;
    lastBurstAt = now;

    // up – сліди над кнопкою, down – сліди під кнопкою
    refs.scrollToTopBtn.classList.remove('dir-up', 'dir-down');
    refs.scrollToTopBtn.classList.add(direction === 'up' ? 'dir-up' : 'dir-down');

    refs.scrollToTopBtn.classList.add('tracks-burst');
    clearTimeout(burstTimer);
    burstTimer = setTimeout(
      () => refs.scrollToTopBtn.classList.remove('tracks-burst'),
      BURST_DURATION
    );
  };

  const toggle = () => {
    const shouldShow = window.scrollY > 400;

    if (shouldShow && !shown) {
      refs.scrollToTopBtn.classList.add('show');
      refs.scrollToTopBtn.classList.add('dir-up');
      shown = true;
      return;
    }

    if (!shouldShow && shown) {
      refs.scrollToTopBtn.classList.remove('show', 'tracks-burst');
      clearTimeout(burstTimer);
      shown = false;
    }
  };

  const onScroll = () => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      rafId = null;

      toggle();

      const y = window.scrollY;
      const delta = y - lastY;

      // ігнорувати мікроскроли
      if (shown && Math.abs(delta) >= 12) {
        if (delta > 0) burst('up');
        else burst('down');
      }

      lastY = y;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  toggle();

  refs.scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('load', initScrollToTop);
