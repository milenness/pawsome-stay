import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import iconsSpriteUrl from '../img/icons.svg?url';

const modalOverlay = document.querySelector('.pet-modal-overlay');

let animalsCache = [];

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

const UA_MESSAGES = {
  NETWORK: 'Відсутній зв’язок з сервером. Перевірте інтернет.',
  EMPTY_DATA: 'Інформацію про тварин не знайдено.',
  LOAD_FAIL: 'Не вдалося завантажити деталі тварини.',
};

/* --- 1. КЕШУВАННЯ --- */

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

      if (!Array.isArray(animals) || (page === 1 && animals.length === 0))
        break;

      allAnimals.push(...animals);
      totalItems = serverTotal || allAnimals.length;
      page++;
    }
    animalsCache = allAnimals;
  } catch (err) {
    if (!err.response) {
      Swal.fire({ title: 'Мережа', text: UA_MESSAGES.NETWORK, icon: 'error' });
    }
  }
}

/* --- 2. ГЕНЕРАЦІЯ РОЗМІТКИ --- */

function renderModalMarkup(petData) {
  const categoryMap = {
    Dogs: 'Собака',
    Cats: 'Кіт',
    Rabbits: 'Кролик',
    Birds: 'Птах',
    Other: 'Тварина',
  };

  const category = categoryMap[petData.species] || petData.species || 'Тварина';
  const id = petData._id || petData.id;

  return `
    <div class="pet-modal">
      <button class="pet-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${iconsSpriteUrl}#close"></use>
        </svg>
      </button>

      <div class="pet-modal-content">
        <div class="pet-modal-image-wrapper">
          <img src="${petData.image}" alt="${petData.name}" class="pet-modal-image">
        </div>

        <div class="pet-modal-info">
          <div class="pet-modal-header">
            <span class="pet-modal-category-badge">${category}</span>
            <h2 class="pet-modal-name">${petData.name}</h2>
            <div class="pet-modal-meta">
              <span class="pet-modal-meta-item">${petData.age}</span>
              <span class="pet-modal-meta-item">${petData.gender}</span>
            </div>
          </div>

          <div class="pet-modal-sections">
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Опис:</h3>
              <p class="pet-modal-section-text">${petData.description || 'Опис відсутній'}</p>
            </div>
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Здоров'я:</h3>
              <p class="pet-modal-section-text">${petData.healthStatus || 'Здоровий(а)'}</p>
            </div>
            <div class="pet-modal-section">
              <h3 class="pet-modal-section-title">Поведінка:</h3>
              <p class="pet-modal-section-text">${petData.behavior || 'Дружелюбний(а)'}</p>
            </div>
          </div>

          <button id="petModalActionBtn" class="info-pet-btn" type="button" data-id="${id}">
            Взяти додому
          </button>
        </div>
      </div>
    </div>
  `;
}

async function fetchPetDetails(petId) {
  await ensureAnimalsCache();
  const petData = animalsCache.find(
    a => String(a._id || a.id) === String(petId)
  );

  if (petData) {
    modalOverlay.innerHTML = renderModalMarkup(petData);
    openModal();
  } else {
    Swal.fire({
      title: 'Помилка',
      text: UA_MESSAGES.LOAD_FAIL,
      icon: 'warning',
    });
  }
}

/* --- 3. КЕРУВАННЯ ТА СЛУХАЧІ --- */

function openModal() {
  modalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  setTimeout(() => {
    modalOverlay.innerHTML = '';
  }, 300);
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}

document.addEventListener('click', e => {
  const target = e.target;

  const openBtn = target.closest('.pet-more-info');
  if (openBtn) {
    const petItem = openBtn.closest('.pet-list-item');
    if (petItem?.id) fetchPetDetails(petItem.id);
    return;
  }

  if (target.closest('.pet-modal-close') || target === modalOverlay) {
    closeModal();
    return;
  }

  if (target.closest('#petModalActionBtn')) {
    const petId = target.closest('#petModalActionBtn').dataset.id;

    closeModal();

    if (typeof window.openOrderModal === 'function') {
      setTimeout(() => {
        window.openOrderModal(petId);
      }, 350);
    }
  }
});
