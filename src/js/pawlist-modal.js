import { notify, UA_TOAST } from './notifications';
import iconsSpriteUrl from '../img/icons.svg?url';
import { getPetById } from './pets-list/pet-list';
import { refs } from './refs';

/* --- 1. ГЕНЕРАЦІЯ РОЗМІТКИ --- */

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

function fetchPetDetails(petId) {
  const petData = getPetById(petId);

  if (petData) {
    refs.petModalOverlay.innerHTML = renderModalMarkup(petData);
    openModal();
  } else {
    notify.failure(UA_TOAST.LOAD_FAIL);
  }
}

/* --- 2. КЕРУВАННЯ ТА СЛУХАЧІ --- */

function openModal() {
  refs.petModalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);
}

function closeModal() {
  refs.petModalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  setTimeout(() => {
    refs.petModalOverlay.innerHTML = '';
  }, 300);
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}

document.addEventListener('click', e => {
  const eventTarget = e.target;
  const target =
    eventTarget instanceof Element ? eventTarget : eventTarget?.parentElement;

  if (!target) {
    return;
  }

  const openBtn = target.closest('.pet-more-info');
  if (openBtn) {
    const petItem = openBtn.closest('.pet-list-item');
    if (petItem?.id) fetchPetDetails(petItem.id);
    return;
  }

  if (target.closest('.pet-modal-close') || target === refs.petModalOverlay) {
    closeModal();
    return;
  }

  const actionBtn = target.closest('#petModalActionBtn');
  if (actionBtn) {
    const petId = actionBtn.dataset.id;

    closeModal();

    if (typeof window.openOrderModal === 'function') {
      setTimeout(() => {
        window.openOrderModal(petId);
      }, 350);
    }
  }
});
