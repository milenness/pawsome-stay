import { getAnimalsByCategory } from '../api/api';
import { notify, UA_TOAST } from '../notifications';

const petList = document.querySelector('.pet-list');
const loadMoreBtnWrapper = document.querySelector('.load-more-pets-btn-wrapper');
const loadMoreBtn = document.querySelector('.load-more-pets-btn');
const pagination = document.querySelector('.pagination-wrapper .pagination');

let currentPage = 1;
let currentCategory = null;
let isLoading = false;

// ====== Определяем мобильную версию ======
const isMobile = () => window.innerWidth < 768;

// ====== Очистка списка питомцев ======
export function clearPetList() {
  petList.innerHTML = '';
  currentPage = 1;
  currentCategory = null;
  if (loadMoreBtnWrapper) loadMoreBtnWrapper.classList.add('is-hidden');
  if (pagination) pagination.innerHTML = '';
}

// ====== Лимит карточек в зависимости от экрана ======
const getLimit = () => {
  const width = window.innerWidth;
  return width >= 768 && width < 1440 ? 8 : 9;
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
  const loader = petList.querySelector('.pet-list-loader');
  if (loader) loader.remove();
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

// ====== Пагинация для планшета и ПК с стрелками ======
function renderPagination(totalPages) {
  if (!pagination) return;

  let markup = `
    <button class="page-arrow prev" ${currentPage === 1 ? 'disabled' : ''}><svg width="16" height="16">
      <use href="../../img/icons.svg#arrow_back"></use>
    </svg></button>
  `;

  // Всегда показываем первую страницу
  markup += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;

  // Добавляем троеточие, если нужно
  if (currentPage > 3) {
    markup += `<span class="dots">...</span>`;
  }

  // Показываем две страницы до и после текущей (если они есть)
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      markup += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
  }

  // Добавляем троеточие перед последней страницей, если нужно
  if (currentPage < totalPages - 2) {
    markup += `<span class="dots">...</span>`;
  }

  // Всегда показываем последнюю страницу, если их больше 1
  if (totalPages > 1) {
    markup += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
  }

  // Кнопка «Вперед»
  markup += `<button class="page-arrow next" ${currentPage === totalPages ? 'disabled' : ''}><svg width="16" height="16">
      <use href="../../img/icons.svg#arrow_forward"></use>
    </svg></button>`;

  pagination.innerHTML = markup;
}

// ====== Загрузка питомцев ======
export function loadPets(categoryId = null, isNewCategory = false) {
  if (isLoading) return;

  if (isNewCategory) {
    currentPage = 1;
    currentCategory = categoryId;
    petList.innerHTML = '';
  }

  petList.insertAdjacentHTML('beforeend', createLoaderMarkup());
  isLoading = true;

  const limit = getLimit();

  requestAnimationFrame(() => {
    getAnimalsByCategory(currentCategory, currentPage, limit)
      .then(({ animals, totalItems }) => {
        if (!Array.isArray(animals) || animals.length === 0) {
          clearPetList();
          notify.failure(UA_TOAST.PETS_EMPTY);
          return;
        }

        petList.insertAdjacentHTML('beforeend', createPetListMarkup(animals));

        const totalPages = Math.ceil(totalItems / limit);

        if (isMobile()) {
          if (loadMoreBtnWrapper) loadMoreBtnWrapper.classList.remove('is-hidden');
          if (pagination) pagination.innerHTML = '';
        } else {
          if (loadMoreBtnWrapper) loadMoreBtnWrapper.classList.add('is-hidden');
          renderPagination(totalPages);
        }
      })
      .catch(error => {
        const isNetworkError = !error.response;

        if (isNetworkError) {
          notify.failure(UA_TOAST.NETWORK);
          return;
        }

        notify.failure(UA_TOAST.UNKNOWN_ERROR);
      })
      .finally(() => {
        removeLoader();
        isLoading = false;
      });
  });
}

// ====== Кнопка "Показати більше" ======
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (isLoading) return;
    currentPage += 1;
    await loadPets(currentCategory);
  });
}

// ====== Кнопки пагинации и стрелки для планшета и ПК ======
if (pagination) {
  pagination.addEventListener('click', async (e) => {
    const btn = e.target.closest('.page-btn, .page-arrow');
    if (!btn) return;

    const totalPages = pagination.querySelectorAll('.page-btn').length;

    if (btn.classList.contains('page-btn')) {
      currentPage = Number(btn.dataset.page);
    } else if (btn.classList.contains('prev') && currentPage > 1) {
      currentPage -= 1;
    } else if (btn.classList.contains('next') && currentPage < totalPages) {
      currentPage += 1;
    } else {
      return;
    }

    petList.innerHTML = '';
    await loadPets(currentCategory);

    window.scrollTo({
      top: document.querySelector('#pets-list').offsetTop,
      behavior: 'smooth',
    });
  });
}

// ====== Перезагрузка при изменении размера окна ======
window.addEventListener('resize', () => {
  loadPets(currentCategory);
});