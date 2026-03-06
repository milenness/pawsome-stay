import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const modalOverlay = document.querySelector('.pet-modal-overlay');
const actionBtn = document.getElementById('petModalActionBtn');

let animalsCache = [];

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

const UA_MESSAGES = {
  NETWORK: 'Відсутній зв’язок з сервером. Перевірте інтернет.',
  EMPTY_DATA: 'Інформацію про тварин не знайдено.',
  LOAD_FAIL: 'Не вдалося завантажити деталі тварини.',
};

/* --- 1. КЕШУВАННЯ З ГНУЧКОЮ ОБРОБКОЮ --- */

async function ensureAnimalsCache() {
  if (animalsCache.length > 0) return;

  try {
    let page = 1;
    const limit = 20;
    let totalItems = Infinity;
    let allAnimals = [];

    while (allAnimals.length < totalItems) {
      const response = await api.get('/animals', { params: { page, limit } });
      const { animals, totalItems: serverTotal } = response.data;

      if (!Array.isArray(animals) || (page === 1 && animals.length === 0)) {
        break;
      }

      allAnimals.push(...animals);
      totalItems = serverTotal || allAnimals.length;
      if (animals.length === 0) break;
      page++;
    }
    animalsCache = allAnimals;
  } catch (err) {
    const isNetworkError = !err.response;
    if (isNetworkError) {
      Swal.fire({ title: 'Мережа', text: UA_MESSAGES.NETWORK, icon: 'error' });
    }
  }
}

/* --- 2. ВІДКРИТТЯ ТА ЗАПОВНЕННЯ (ОСНОВНА ЛОГІКА) --- */

async function fetchPetDetails(petId) {
  await ensureAnimalsCache();

  let petData = animalsCache.find(a => String(a._id || a.id) === String(petId));

  if (!petData) {
    const petItem = document.querySelector(`#${CSS.escape(petId)}`);
    if (petItem) {
      petData = extractPetDataFromDOM(petItem);
    }
  }

  if (petData) {
    populateModal(petData);
  } else {
    Swal.fire({
      title: 'Помилка',
      text: UA_MESSAGES.LOAD_FAIL,
      icon: 'warning',
    });
    closeModal();
  }
}

function populateModal(petData) {
  if (!petData) return;

  // Текстові поля
  const textFields = {
    petModalName: petData.name,
    petModalAge: petData.age,
    petModalGender: petData.gender,
    petModalDescription: petData.description || 'Опис відсутній',
    petModalHealthStatus: petData.healthStatus || 'Здоровий(а)',
    petModalBehavior: petData.behavior || 'Дружелюбний(а)',
  };

  Object.entries(textFields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '';
  });

  // Категорія
  const categoryBadge = document.getElementById('petModalCategory');
  if (categoryBadge) {
    const raw =
      petData.species ||
      (petData.categories && petData.categories[0]?.name) ||
      'Тварина';
    const map = {
      Собаки: 'Собака',
      Коти: 'Кіт',
      Кролики: 'Кролик',
      Птахи: 'Птах',
      Гризуни: 'Гризун',
    };
    categoryBadge.textContent = map[raw] || raw;
  }

  // Зображення
  const img = document.getElementById('petModalImage');
  if (img) {
    img.src = petData.image || '';
    img.alt = petData.name || 'Pet';
  }

  if (actionBtn) {
    const id = petData._id || petData.id;
    actionBtn.setAttribute('data-id', id);
    if (!actionBtn.classList.contains('open-modal-btn')) {
      actionBtn.classList.add('open-modal-btn');
    }
  }
}

/* --- 3. ДОПОМІЖНІ ТА СЛУХАЧІ --- */

function openModal(id) {
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

document.addEventListener('click', e => {
  const openBtn = e.target.closest('.pet-more-info');
  if (openBtn) {
    const petItem = openBtn.closest('.pet-list-item');
    if (petItem?.id) openModal(petItem.id);
    return;
  }

  if (e.target.closest('#petModalActionBtn')) {
    closeModal();
    return;
  }

  if (e.target.closest('.pet-modal-close') || e.target === modalOverlay) {
    closeModal();
  }
});

function extractPetDataFromDOM(petItem) {
  const getText = s => petItem.querySelector(s)?.textContent?.trim() || '';
  return {
    id: petItem.id,
    name: getText('.pet-info-name'),
    image: petItem.querySelector('.pet-image')?.src || '',
    age: getText('.pet-age')
      .replace(/роки|року/g, '')
      .trim(),
    gender: getText('.pet-gender'),
    description: petItem.getAttribute('data-description'),
    behavior: getText('.pet-about'),
    healthStatus: petItem.getAttribute('data-health-status'),
    species: getText('.pet-info-category'),
  };
}