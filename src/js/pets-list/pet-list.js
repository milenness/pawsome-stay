import { getAnimalsByCategory } from '../api/api';
import { notify, UA_TOAST } from '../notifications';

const petList = document.querySelector('.pet-list');
const loadMoreBtnWrapper = document.querySelector('.load-more-pets-btn-wrapper');
const loadMoreBtn = document.querySelector('.load-more-pets-btn');
const pagination = document.querySelector('.pagination-wrapper .pagination');

let currentPage = 1;
let currentCategory = null;
let totalPages = 1;
let isLoading = false;
let loadedAnimals = [];
let lastViewportType = getViewportType();

// ====== Получить питомца по ID ======
export function getPetById(petId) {
  return loadedAnimals.find(
    animal => String(animal._id || animal.id) === String(petId)
  );
}

// ====== Объединение массивов без дубликатов ======
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

// ====== Определяем тип устройства ======
const isMobile = () => window.innerWidth < 768;
const isTabletViewport = () => window.innerWidth >= 768 && window.innerWidth < 1440;

function getViewportType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1440) return 'tablet';
  return 'desktop';
}

// ====== Лимит карточек ======
const getLimit = () => {
  const width = window.innerWidth;
  if (width < 768) return 8;
  if (width < 1440) return 9;
  return 9;
};

// ====== Loader ======
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
  const loaders = petList.querySelectorAll('.pet-list-loader');
  loaders.forEach(loader => loader.remove());
}

// ====== Разметка питомцев ======
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

// ====== Очистка списка ======
export function clearPetList() {
  petList.innerHTML = '';
  currentPage = 1;
  currentCategory = null;
  totalPages = 1;
  loadedAnimals = [];

  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
  if (loadMoreBtnWrapper) loadMoreBtnWrapper.classList.add('is-hidden');
  if (pagination) pagination.innerHTML = '';
}

// ====== Рендер списка ======
function renderPetList(hasMorePets) {
  const shouldKeepEvenCount =
    isTabletViewport() && hasMorePets && loadedAnimals.length % 2 !== 0;

  const animalsToRender = shouldKeepEvenCount
    ? loadedAnimals.slice(0, -1)
    : loadedAnimals;

  petList.innerHTML = createPetListMarkup(animalsToRender);
  updateButtonVisibility(hasMorePets);
}

// ====== Обновление видимости кнопки “Показати більше” ======
function updateButtonVisibility(shouldShow) {
  if (!loadMoreBtnWrapper) return;
  if (shouldShow) loadMoreBtnWrapper.classList.remove('is-hidden');
  else loadMoreBtnWrapper.classList.add('is-hidden');
}

// ====== Пагинация ======
function renderPagination(totalPages) {
  if (!pagination) return;
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let markup = `
    <button class="page-arrow prev" ${currentPage === 1 ? 'disabled' : ''}>
      <svg width="16" height="16"><use href="../../img/icons.svg#arrow_back"></use></svg>
    </button>
  `;

  // Определяем диапазон страниц вокруг текущей
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  // Если мы в начале списка, гарантируем показ страниц 2 и 3
  if (currentPage <= 3) {
    end = Math.min(totalPages - 1, 3);
  }

  // Если мы в конце списка, гарантируем показ трех последних страниц перед "total"
  if (currentPage >= totalPages - 2) {
    start = Math.max(2, totalPages - 2);
  }

  // 1. Всегда показываем первую страницу
  markup += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;

  // 2. Троеточие после первой страницы (только если есть разрыв)
  if (start > 2) {
    markup += `<span class="dots">...</span>`;
  }

  // 3. Центральный блок страниц
  for (let i = start; i <= end; i++) {
    markup += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  // 4. Троеточие перед последней страницей (только если есть разрыв)
  if (end < totalPages - 1) {
    markup += `<span class="dots">...</span>`;
  }

  // 5. Всегда показываем последнюю страницу
  markup += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;

  markup += `
    <button class="page-arrow next" ${currentPage === totalPages ? 'disabled' : ''}>
      <svg width="16" height="16"><use href="../../img/icons.svg#arrow_forward"></use></svg>
    </button>
  `;

  pagination.innerHTML = markup;
}

// ====== Загрузка питомцев ======
export function loadPets(categoryId = null, isNewCategory = false, replace = false) {
  if (isLoading) return;
  isLoading = true;

  // Только если новая категория, сбрасываем currentPage
  if (isNewCategory) {
    currentPage = 1;
    currentCategory = categoryId;
    loadedAnimals = [];
    petList.innerHTML = '';
    if (loadMoreBtnWrapper) loadMoreBtnWrapper.classList.add('is-hidden');
  } else if (replace) {
    loadedAnimals = [];
    petList.innerHTML = '';
  } else {
  }

  petList.insertAdjacentHTML('beforeend', createLoaderMarkup());
  const limit = getLimit();

  getAnimalsByCategory(currentCategory, currentPage, limit)
    .then(({ animals, totalItems }) => {
      if (!Array.isArray(animals) || animals.length === 0) {
        clearPetList();
        notify.failure(UA_TOAST.PETS_EMPTY);
        return;
      }

      loadedAnimals = replace ? animals : mergeUniqueAnimals(loadedAnimals, animals);
      totalPages = Math.ceil(totalItems / limit);
      const hasMorePets = currentPage < totalPages;

      renderPetList(hasMorePets);

      if (!isMobile()) renderPagination(totalPages);
    })
    .catch(error => {
      const isNetworkError = !error.response;
      if (isNetworkError) notify.failure(UA_TOAST.NETWORK);
      else notify.failure(UA_TOAST.UNKNOWN_ERROR);
    })
    .finally(() => {
      removeLoader();
      isLoading = false;
    });
}

// ====== Кнопка "Показати більше" ======
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    if (isLoading) return;
    currentPage += 1;
    loadPets(currentCategory);
  });
}

// ====== Пагинация и стрелки ======
if (pagination) {
  pagination.addEventListener('click', e => {
    const btn = e.target.closest('.page-btn, .page-arrow');
    if (!btn) return;

    let shouldLoad = false;

    if (btn.classList.contains('page-btn')) {
      const page = Number(btn.dataset.page);
      if (page !== currentPage) {
        currentPage = page;
        shouldLoad = true;
      }
    } else if (btn.classList.contains('prev') && currentPage > 1) {
      currentPage -= 1;
      shouldLoad = true;
    } else if (btn.classList.contains('next') && currentPage < totalPages) {
      currentPage += 1;
      shouldLoad = true;
    }

    if (!shouldLoad) return;

    // Подгружаем питомцев для текущей категории и страницы
    loadPets(currentCategory, false, true);

    window.scrollTo({
      top: document.querySelector('#pets-list').offsetTop,
      behavior: 'smooth',
    });
  });
}

// ====== Перезагрузка при изменении размера окна ======
window.addEventListener('resize', () => {
  const currentViewportType = getViewportType();
  if (currentViewportType !== lastViewportType) {
    lastViewportType = currentViewportType;
    renderPetList(!loadMoreBtn.classList.contains('is-hidden'));
  }
});