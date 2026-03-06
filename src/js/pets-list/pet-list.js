import { getAnimalsByCategory } from '../api/api';

export const petList = document.querySelector('.pet-list');
const loadMoreBtn = document.querySelector('.load-more-pets-btn');

let currentPage = 1;
let currentCategory = null;
let isLoading = false;
let isFirstLoad = true;

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
  const loader = petList.querySelector('.pet-list-loader');
  if (loader) {
    loader.remove();
  }
}

export function createPetListMarkup(animals) {
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
              c => `<li class="pet-info-categories-list-item">${c.name}</li>`
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
    if (loadMoreBtn) {
      loadMoreBtn.classList.remove('is-hidden');
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
    console.error('Ошибка загрузки:', error);
    removeLoader();
    if (loadMoreBtn) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } finally {
    isLoading = false;
    if (isFirstLoad) {
      isFirstLoad = false;
    }
  }
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (isLoading) return;

    currentPage += 1;

    await loadPets(currentCategory);

    const firstItem = petList.querySelector('.pet-list-item');
    if (firstItem) {
      const { height } = firstItem.getBoundingClientRect();

      window.scrollBy({
        top: height,
        behavior: 'smooth',
      });
    }
  });
}

loadPets();
