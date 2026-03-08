import { getAnimalsByCategory } from '../api/api';
import { notify, UA_TOAST } from '../notifications';
import { refs } from '../refs';

let currentPage = 1;
let currentCategory = null;
let totalPages = 1;
let isLoading = false;
let loadedAnimals = [];
let lastViewportType = getViewportType();

// ===== Получить питомца по ID =====
export function getPetById(petId) {
  return loadedAnimals.find(
    animal => String(animal._id || animal.id) === String(petId)
  );
}

// ===== Объединение массивов без дубликатов =====
function mergeUniqueAnimals(existing, incoming) {
  return Array.from(
    new Map(
      [...existing, ...incoming].map(animal => [
        String(animal._id || animal.id),
        animal,
      ])
    ).values()
  );
}

// ===== Viewport =====
function getViewportType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1440) return 'tablet';
  return 'desktop';
}

const isTabletViewport = () => {
  const width = window.innerWidth;
  return width >= 768 && width < 1440;
};

// ===== Лимит карточек =====
const getLimit = () => {
  const width = window.innerWidth;
  if (width < 768) return 8;
  if (width < 1440) return 9;
  return 9;
};

// ===== Loader =====
function createLoaderMarkup() {
  return `
    <li class="pet-list-loader">
      <div class="loader-content">
        <div class="paw">
          <span></span><span></span><span></span><span></span>
          <div class="pad"></div>
        </div>
      </div>
    </li>
  `;
}

function removeLoader() {
  const loader = refs.petList.querySelector('.pet-list-loader');
  if (loader) loader.remove();
}

// ===== Разметка =====
function createPetListMarkup(animals) {
  return animals
    .map(
      ({ _id, name, age, gender, image, species, categories, behavior }) => `
    <li class="pet-list-item" id="${_id}">
      <img src="${image}" alt="${name}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${species}</span>
        <h3 class="pet-info-name">${name}</h3>
        <ul class="pet-info-categories-list">
          ${categories.map(({ name }) => `<li class="pet-info-categories-list-item">${name}</li>`).join('')}
        </ul>
        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${age} роки/років</span>
          <span class="pet-gender">${gender}</span>
        </div>
        <p class="pet-about">${behavior}</p>
      </div>
      <button class="pet-more-info" type="button">Дізнатись більше</button>
    </li>
  `
    )
    .join('');
}

// ===== Очистка =====
export function clearPetList() {
  refs.petList.innerHTML = '';
  currentPage = 1;
  currentCategory = null;
  totalPages = 1;
  loadedAnimals = [];

  refs.petListLoadMoreBtn?.classList.add('is-hidden');
  refs.petListLoadMoreBtnWrapper?.classList.add('is-hidden');
}

// ===== Рендер =====
function renderPetList(hasMorePets) {
  const shouldKeepEvenCount =
    isTabletViewport() && hasMorePets && loadedAnimals.length % 2 !== 0;

  const animalsToRender = shouldKeepEvenCount ? loadedAnimals.slice(0, -1) : loadedAnimals;

  refs.petList.innerHTML = createPetListMarkup(animalsToRender);

  if (refs.petListLoadMoreBtnWrapper) {
    if (hasMorePets) refs.petListLoadMoreBtnWrapper.classList.remove('is-hidden');
    else refs.petListLoadMoreBtnWrapper.classList.add('is-hidden');
  }
}

// ===== Pagination =====
function renderPagination(totalPages) {
  if (!refs.pagination) return;
  if (totalPages <= 1) {
    refs.pagination.innerHTML = '';
    return;
  }

  let markup = `<button class="page-arrow prev" ${currentPage === 1 ? 'disabled' : ''}>
      <svg width="16" height="16"><use href="../../img/icons.svg#arrow_back"></use></svg>
    </button>`;

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) end = Math.min(totalPages - 1, 3);
  if (currentPage >= totalPages - 2) start = Math.max(2, totalPages - 2);

  markup += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;

  if (start > 2) markup += `<span class="dots">...</span>`;

  for (let i = start; i <= end; i++) {
    markup += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  if (end < totalPages - 1) markup += `<span class="dots">...</span>`;

  markup += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;

  markup += `<button class="page-arrow next" ${currentPage === totalPages ? 'disabled' : ''}>
      <svg width="16" height="16"><use href="../../img/icons.svg#arrow_forward"></use></svg>
    </button>`;

  refs.pagination.innerHTML = markup;
}

// ===== Загрузка =====
export async function loadPets(categoryId = null, isNewCategory = false, replace = false) {
  if (isLoading) return;

  if (isNewCategory) {
    currentPage = 1;
    currentCategory = categoryId;
    refs.petList.innerHTML = '';
    loadedAnimals = [];
  }

  refs.petList.insertAdjacentHTML('beforeend', createLoaderMarkup());
  isLoading = true;

  try {
    const limit = getLimit();
    const { animals, totalItems } = await getAnimalsByCategory(currentCategory, currentPage, limit);

    if (!Array.isArray(animals) || animals.length === 0) {
      clearPetList();
      notify.failure(UA_TOAST.PETS_EMPTY);
      return;
    }

    loadedAnimals = replace ? animals : mergeUniqueAnimals(loadedAnimals, animals);

    totalPages = Math.ceil(totalItems / limit);
    const hasMorePets = currentPage < totalPages;

    renderPetList(hasMorePets);
    renderPagination(totalPages);

    if (!hasMorePets) refs.petListLoadMoreBtn?.classList.add('is-hidden');
    else refs.petListLoadMoreBtn?.classList.remove('is-hidden');
  } catch (error) {
    const isNetworkError = !error.response;
    if (isNetworkError) notify.failure(UA_TOAST.NETWORK);
    else notify.failure(UA_TOAST.UNKNOWN_ERROR);
  } finally {
    removeLoader();
    isLoading = false;
  }
}

// ===== Load More =====
refs.petListLoadMoreBtn?.addEventListener('click', async () => {
  if (isLoading) return;
  currentPage += 1;
  await loadPets(currentCategory);

  const firstItem = refs.petList.querySelector('.pet-list-item');
  if (firstItem) {
    const { height } = firstItem.getBoundingClientRect();
    window.scrollBy({ top: height, behavior: 'smooth' });
  }
});

// ===== Pagination click =====
refs.pagination?.addEventListener('click', e => {
  const btn = e.target.closest('.page-btn, .page-arrow');
  if (!btn) return;

  let shouldLoad = false;
  if (btn.classList.contains('page-btn')) {
    const page = Number(btn.dataset.page);
    if (page !== currentPage) {
      currentPage = page;
      shouldLoad = true;
    }
  }
  if (btn.classList.contains('prev') && currentPage > 1) {
    currentPage--;
    shouldLoad = true;
  }
  if (btn.classList.contains('next') && currentPage < totalPages) {
    currentPage++;
    shouldLoad = true;
  }
  if (!shouldLoad) return;

  loadPets(currentCategory, false, true);
  window.scrollTo({ top: document.querySelector('#pets-list').offsetTop, behavior: 'smooth' });
});

// ===== Resize =====
window.addEventListener('resize', () => {
  const currentViewportType = getViewportType();
  if (currentViewportType !== lastViewportType) {
    lastViewportType = currentViewportType;
    const hasMorePets = !refs.petListLoadMoreBtn.classList.contains('is-hidden');
    renderPetList(hasMorePets);
  }
});