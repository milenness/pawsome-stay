document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('global-loader');
  if (!loader) return;

  const showLoader = () => {
    loader.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  };

  const hideLoader = () => {
    loader.classList.add('is-hidden');
    document.body.style.overflow = '';
  };

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    showLoader();
    try {
      const response = await originalFetch(...args);
      return response;
    } finally {
      hideLoader();
    }
  };
});