import '/js/loader.js';
import '/js/mobile-menu.js';
import '/js/notifications';
import '/js/hover-animation.js';
import '/js/pets-list/categories-list.js';
import '/js/pets-list/pet-list.js';
import '/js/pawlist-modal.js';
import '/js/scroll-to-top.js';
import '/js/stories.js';
import '/js/cursor.js';
import '/js/footer.js';

function createModuleLoader(modulePath) {
  let modulePromise;

  return function loadModule() {
    if (!modulePromise) {
      modulePromise = import(modulePath);
    }

    return modulePromise;
  };
}

function loadModuleWhenVisible(selector, loadModule, rootMargin = '300px 0px') {
  const section = document.querySelector(selector);

  if (!section) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    loadModule();
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadModule();
        observer.disconnect();
      }
    },
    { rootMargin }
  );

  observer.observe(section);
}

function setupAnchorIntentPrewarm(prewarmConfig) {
  const events = ['pointerenter', 'focusin', 'touchstart', 'click'];

  const prewarmByTarget = new Map(Object.entries(prewarmConfig));
  const warmedTargets = new Set();

  const normalizePathname = pathname => {
    const normalized = pathname.replace(/\/+$/, '') || '/';

    if (normalized.endsWith('/index.html')) {
      return normalized.slice(0, -'/index.html'.length) || '/';
    }

    return normalized;
  };

  const getSamePageHashTarget = anchor => {
    const rawHref = anchor.getAttribute('href');

    if (!rawHref || !rawHref.includes('#')) {
      return null;
    }

    if (rawHref.startsWith('#')) {
      return rawHref;
    }

    try {
      const targetUrl = new URL(rawHref, window.location.href);
      const currentUrl = new URL(window.location.href);

      const isSameOrigin = targetUrl.origin === currentUrl.origin;
      const isSamePathname =
        normalizePathname(targetUrl.pathname) ===
        normalizePathname(currentUrl.pathname);

      if (!isSameOrigin || !isSamePathname) {
        return null;
      }

      return targetUrl.hash || null;
    } catch {
      return null;
    }
  };

  const handleIntent = event => {
    const eventTarget = event.target;
    const targetElement =
      eventTarget instanceof Element ? eventTarget : eventTarget?.parentElement;

    if (!targetElement) {
      return;
    }

    const anchor = targetElement.closest('a[href]');

    if (!anchor) {
      return;
    }

    const targetId = getSamePageHashTarget(anchor);

    if (!targetId) {
      return;
    }

    const prewarm = prewarmByTarget.get(targetId);

    if (!prewarm || warmedTargets.has(targetId)) {
      return;
    }

    warmedTargets.add(targetId);
    prewarm();
  };

  events.forEach(eventName => {
    document.addEventListener(eventName, handleIntent, {
      passive: true,
      capture: eventName === 'focusin',
    });
  });
}

function setupHashPrewarm(prewarmConfig) {
  const prewarmByTarget = new Map(Object.entries(prewarmConfig));

  const prewarmFromHash = () => {
    const prewarm = prewarmByTarget.get(window.location.hash);

    if (prewarm) {
      prewarm();
    }
  };

  prewarmFromHash();
  window.addEventListener('hashchange', prewarmFromHash, { passive: true });
}

function loadDeferredFeatureModules() {
  const loadOrderModal = createModuleLoader('/js/order-modal.js');
  const loadFaq = createModuleLoader('/js/faq.js');
  const loadAboutSlider = createModuleLoader('/js/about-slider.js');

  loadOrderModal();

  loadModuleWhenVisible('#faq', loadFaq);
  loadModuleWhenVisible('#about', loadAboutSlider);

  setupAnchorIntentPrewarm({
    '#faq': loadFaq,
    '#about': loadAboutSlider,
  });

  setupHashPrewarm({
    '#faq': loadFaq,
    '#about': loadAboutSlider,
  });
}

if (document.readyState === 'complete') {
  setTimeout(loadDeferredFeatureModules, 0);
} else {
  window.addEventListener('load', loadDeferredFeatureModules, { once: true });
}
