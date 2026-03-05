import { getAnimalsByCategory } from '../api/api';

export const petList = document.querySelector('.pet-list');
const loadMoreBtn = document.querySelector('.load-more-pets-btn');

let currentPage = 1;
let currentCategory = null;
let isLoading = false;

const getLimit = () => {
  const width = window.innerWidth;
  return width >= 768 && width < 1440 ? 8 : 9;
};

export function createPetListMarkup(animals) {
  return animals.map(({ _id, name, age, gender, image, species, categories, behavior }) => `
    <li class="pet-list-item" id="${_id}">
      <img src="${image}" alt="${name}" class="pet-image">
      <div class="pet-info">
        <span class="pet-info-category">${species}</span>
        <h3 class="pet-info-name">${name}</h3>

        <ul class="pet-info-categories-list">
          ${categories.map(c =>
            `<li class="pet-info-categories-list-item">${c.name}</li>`
          ).join('')}
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
  `).join('');
}

export async function loadPets(categoryId = null, isNewCategory = false) {

  if (isLoading) return;

  if (isNewCategory) {
    currentPage = 1;
    currentCategory = categoryId;
    petList.innerHTML = '';
    loadMoreBtn.classList.remove('is-hidden');
  }

  isLoading = true;

  try {
    const limit = getLimit();

    const { animals, totalItems } =
      await getAnimalsByCategory(currentCategory, currentPage, limit);

    petList.insertAdjacentHTML(
      'beforeend',
      createPetListMarkup(animals)
    );

    const totalPages = Math.ceil(totalItems / limit);

    if (currentPage >= totalPages || animals.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    loadMoreBtn.classList.add('is-hidden');
  } finally {
    isLoading = false;
  }
}

loadMoreBtn.addEventListener('click', async () => {

  if (isLoading) return;

  currentPage += 1;

  await loadPets(currentCategory);

  const { height } = petList.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height,
    behavior: 'smooth'
  });
});

loadPets();