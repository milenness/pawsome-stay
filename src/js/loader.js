import axios from 'axios';

const LOADER_ID = 'global-loader';
let activeRequests = 0;

function shouldTrackRequest(config) {
  return !config?.skipGlobalLoader;
}

function getLoader() {
  return document.getElementById(LOADER_ID);
}

function showLoader() {
  const loader = getLoader();
  if (!loader) return;

  loader.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function hideLoader() {
  const loader = getLoader();
  if (!loader) return;

  if (activeRequests > 0) return;

  loader.classList.add('is-hidden');
  document.body.style.overflow = '';
}

/* ===============================
   PAGE LOAD
=============================== */

document.addEventListener('DOMContentLoaded', () => {
  showLoader();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    hideLoader();
  }, 600);
});

/* ===============================
   FETCH INTERCEPTOR
=============================== */

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  activeRequests++;
  showLoader();

  try {
    const response = await originalFetch(...args);
    return response;
  } finally {
    activeRequests--;

    setTimeout(() => {
      hideLoader();
    }, 200);
  }
};

/* ===============================
   AXIOS GLOBAL INTERCEPTOR
=============================== */

axios.interceptors.request.use(config => {
  if (!shouldTrackRequest(config)) return config;

  activeRequests++;
  showLoader();
  return config;
});

axios.interceptors.response.use(
  response => {
    if (!shouldTrackRequest(response.config)) {
      return response;
    }

    activeRequests--;

    setTimeout(() => {
      hideLoader();
    }, 200);

    return response;
  },
  error => {
    if (!shouldTrackRequest(error.config)) {
      return Promise.reject(error);
    }

    activeRequests--;

    setTimeout(() => {
      hideLoader();
    }, 200);

    return Promise.reject(error);
  }
);

/* ===============================
   PATCH axios.create()
=============================== */

const originalCreate = axios.create;

axios.create = function (...args) {
  const instance = originalCreate.apply(this, args);

  instance.interceptors.request.use(config => {
    if (!shouldTrackRequest(config)) return config;

    activeRequests++;
    showLoader();
    return config;
  });

  instance.interceptors.response.use(
    response => {
      if (!shouldTrackRequest(response.config)) {
        return response;
      }

      activeRequests--;

      setTimeout(() => {
        hideLoader();
      }, 200);

      return response;
    },
    error => {
      if (!shouldTrackRequest(error.config)) {
        return Promise.reject(error);
      }

      activeRequests--;

      setTimeout(() => {
        hideLoader();
      }, 200);

      return Promise.reject(error);
    }
  );

  return instance;
};
