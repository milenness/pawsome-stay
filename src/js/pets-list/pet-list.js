import { getAnimalsByCategory } from '../api/api';
import { notify, UA_TOAST } from '../notifications';
import { refs } from '../refs';

const petList = refs.petList;
const loadMoreBtn = refs.petListLoadMoreBtn;
const loadMoreBtnWrapper = refs.petListLoadMoreBtnWrapper;

let currentPage = 1;
let currentCategory = null;
let isLoading = false;
let isFirstLoad = true;

export function clearPetList() {
  petList.innerHTML = '';
  currentPage = 1;
  currentCategory = null;

  loadMoreBtn.classList.add('is-hidden');
  loadMoreBtnWrapper.classList.add('is-hidden');
}

function hasPets() {
  return refs.petList.querySelectorAll('.pet-list-item').length > 0;
}

function updateButtonVisibility(shouldShow) {
  if (!loadMoreBtnWrapper) return;

  if (shouldShow) {
    loadMoreBtnWrapper.classList.remove('is-hidden');
  } else {
    loadMoreBtnWrapper.classList.add('is-hidden');
  }
}

const getLimit = () => {
  const width = window.innerWidth;
  return width >= 768 && width < 1440 ? 8 : 9;
};

function createLoaderMarkup() {
  return `
    <li class="pet-list-loader">
      <div class="loader-content">
        <div class="paw">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="pad"></div>
        </div>
      </div>
    </li>
  `;
}

function removeLoader() {
  const loader = refs.petList.querySelector('.pet-list-loader');
  if (loader) {
    loader.remove();
  }
}

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
          ${categories
            .map(
              ({ name }) =>
                `<li class="pet-info-categories-list-item">${name}</li>`
            )
            .join('')}
        </ul>

        <div class="pet-age-and-gender-wrapper">
          <span class="pet-age">${age} роки/років</span>
          <span class="pet-gender">${gender}</span>
        </div>

        <p class="pet-about">${behavior}</p>
      </div>

      <button class="pet-more-info" type="button">
        Дізнатись більше
      </button>
    </li>
  `
    )
    .join('');
}

export async function loadPets(categoryId = null, isNewCategory = false) {
  if (isLoading) return;

  if (isNewCategory) {
    currentPage = 1;
    currentCategory = categoryId;
    petList.innerHTML = '';
    // Hide wrapper when switching to new category
    if (loadMoreBtnWrapper) {
      loadMoreBtnWrapper.classList.add('is-hidden');
    }
  }

  petList.insertAdjacentHTML('beforeend', createLoaderMarkup());
  isLoading = true;

  try {
    const limit = getLimit();

    const { animals, totalItems } = await getAnimalsByCategory(
      currentCategory,
      currentPage,
      limit
    );

    if (!Array.isArray(animals) || animals.length === 0) {
      clearPetList();
      notify.failure(UA_TOAST.PETS_EMPTY);
      return;
    }

    removeLoader();
    petList.insertAdjacentHTML('beforeend', createPetListMarkup(animals));

    const totalPages = Math.ceil(totalItems / limit);

    if (currentPage >= totalPages || animals.length === 0) {
      if (loadMoreBtn) {
        loadMoreBtn.classList.add('is-hidden');
      }
    } else {
      if (loadMoreBtn) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    const isNetworkError = !error.response;
    if (isNetworkError) {
      notify.failure(UA_TOAST.NETWORK);
      return;
    }

    notify.failure(UA_TOAST.UNKNOWN_ERROR);

    removeLoader();
    if (loadMoreBtn) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } finally {
    isLoading = false;
    if (isFirstLoad) {
      isFirstLoad = false;
    }

    // Show wrapper only if there are pets in the list
    updateButtonVisibility(hasPets());
  }
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (isLoading) return;

    currentPage += 1;

    await loadPets(currentCategory);

    const firstItem = refs.petList.querySelector('.pet-list-item');
    if (firstItem) {
      const { height } = firstItem.getBoundingClientRect();

      window.scrollBy({
        top: height,
        behavior: 'smooth',
      });
    }
  });
}
