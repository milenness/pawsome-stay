import { refs } from './refs';

function initScrollToTop() {
  const btn = refs.scrollToTopBtn;
  if (!btn) return;

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
    btn.classList.remove('dir-up', 'dir-down');
    btn.classList.add(direction === 'up' ? 'dir-up' : 'dir-down');

    btn.classList.add('tracks-burst');
    clearTimeout(burstTimer);
    burstTimer = setTimeout(
      () => btn.classList.remove('tracks-burst'),
      BURST_DURATION
    );
  };

  const toggle = () => {
    const shouldShow = window.scrollY > 400;

    if (shouldShow && !shown) {
      btn.classList.add('show');
      btn.classList.add('dir-up');
      shown = true;
      return;
    }

    if (!shouldShow && shown) {
      btn.classList.remove('show', 'tracks-burst');
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

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('load', initScrollToTop);
