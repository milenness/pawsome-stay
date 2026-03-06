import axios from 'axios';

const modalOverlay = document.querySelector('.pet-modal-overlay');
const actionBtn = document.getElementById('petModalActionBtn');

let currentPetId = null;
let animalsCache = [];

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

/* --- 1. КЕШУВАННЯ ТВАРИН --- */

async function ensureAnimalsCache() {
  if (animalsCache.length > 0) return;

  try {
    let page = 1;
    const limit = 20;
    let totalItems = Infinity;
    let allAnimals = [];

    while (allAnimals.length < totalItems) {
      const response = await api.get('/animals', {
        params: { page, limit },
      });

      const { animals, totalItems: serverTotal } = response.data;

      if (Array.isArray(animals)) {
        allAnimals.push(...animals);
      }

      totalItems = serverTotal || allAnimals.length;
      if (animals.length === 0) break;
      page++;
    }

    animalsCache = allAnimals;
  } catch (err) {
    console.error('Помилка при завантаженні кешу:', err.message);
  }
}

/* --- 2. ВІДКРИТТЯ / ЗАКРИТТЯ --- */

function openModal(id) {
  if (!id) return;
  currentPetId = id;

  modalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);

  fetchPetDetails(id);
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}

/* --- 3. ОТРИМАННЯ ТА ЗАПОВНЕННЯ ДАНИХ --- */

async function fetchPetDetails(petId) {
  try {
    await ensureAnimalsCache();

    const pet = animalsCache.find(
      animal => String(animal._id || animal.id) === String(petId)
    );

    if (pet) {
      populateModal(pet);
      return;
    }

    const petItem = document.querySelector(`#${CSS.escape(petId)}`);
    if (petItem) {
      populateModal(extractPetDataFromDOM(petItem));
    }
  } catch (error) {
    console.error('Помилка обробки деталей тварини:', error);
  }
}

function populateModal(petData) {
  if (!petData) return;

  // Текстові поля
  document.getElementById('petModalName').textContent = petData.name || '';
  document.getElementById('petModalAge').textContent = petData.age || '';
  document.getElementById('petModalGender').textContent = petData.gender || '';
  document.getElementById('petModalDescription').textContent =
    petData.description || 'Опис відсутній';
  document.getElementById('petModalHealthStatus').textContent =
    petData.healthStatus || 'Здоровий(а)';
  document.getElementById('petModalBehavior').textContent =
    petData.behavior || 'Дружелюбний(а)';

  // КАТЕГОРІЯ (виправляємо проблему зі зникненням)
  const categoryBadge = document.getElementById('petModalCategory');
  if (categoryBadge) {
    let categoryText =
      petData.species ||
      (petData.categories && petData.categories[0]?.name) ||
      'Тварина';

    const categoryMap = {
      Собаки: 'Собака',
      Коти: 'Кіт',
      Кролики: 'Кролик',
      Птахи: 'Птах',
      Гризуни: 'Гризун',
    };

    categoryBadge.textContent = categoryMap[categoryText] || categoryText;
  }

  // Зображення
  const img = document.getElementById('petModalImage');
  if (img) {
    img.src = petData.image || '';
    img.alt = petData.name || 'Тварина';
  }

  // Передача ID в кнопку замовлення
  if (actionBtn) {
    actionBtn.setAttribute('data-id', petData._id || petData.id);
    actionBtn.classList.add('open-modal-btn');
  }
}

/* --- 4. ДОПОМІЖНІ ФУНКЦІЇ --- */

function extractPetDataFromDOM(petItem) {
  if (!petItem) return null;

  const getText = selector =>
    petItem.querySelector(selector)?.textContent?.trim() || '';

  return {
    _id: petItem.id,
    name: getText('.pet-info-name'),
    image: petItem.querySelector('.pet-image')?.src || '',
    age: getText('.pet-age')
      .replace(/роки|року/g, '')
      .trim(),
    gender: getText('.pet-gender'),
    description: petItem.getAttribute('data-description') || '',
    behavior: getText('.pet-about'),
    healthStatus: petItem.getAttribute('data-health-status') || '',
    species: getText('.pet-info-category'),
  };
}

/* --- 5. ОБРОБНИКИ КЛІКІВ --- */

document.addEventListener('click', e => {
  const openBtn = e.target.closest('.pet-more-info');
  if (openBtn) {
    const petItem = openBtn.closest('.pet-list-item');
    if (petItem?.id) openModal(petItem.id);
    return;
  }

  if (e.target.closest('#petModalActionBtn')) {
    closeModal();
  }

  if (e.target.closest('.pet-modal-close') || e.target === modalOverlay) {
    closeModal();
  }
});