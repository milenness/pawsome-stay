/* ============================================
   PET MODAL JS - FINAL PRODUCTION VERSION
============================================ */

const modalOverlay = document.querySelector('.pet-modal-overlay');

let currentPetId = null;
let animalsCache = [];

/* ============================================
   CACHE LOADER (PAGINATED API)
============================================ */

async function ensureAnimalsCache() {
  if (animalsCache.length > 0) return;

  try {
    let page = 1;
    const limit = 10;
    let totalItems = Infinity;

    let allAnimals = [];

    while (allAnimals.length < totalItems) {
      const response = await fetch(
        `https://paw-hut.b.goit.study/api/animals?page=${page}&limit=${limit}`
      );

      if (!response.ok) break;

      const data = await response.json();

      if (Array.isArray(data.animals)) {
        allAnimals.push(...data.animals);
      }

      totalItems = data.totalItems || allAnimals.length;

      page++;
    }

    animalsCache = allAnimals;

    console.log('Animals cache loaded:', animalsCache.length);
  } catch (err) {
    console.error('Cache preload error', err);
  }
}

/* ============================================
   OPEN MODAL
============================================ */

function openModal(id) {
  if (!id) return;

  currentPetId = id;

modalOverlay.classList.add('is-open');
document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapePress);

  fetchPetDetails(id);
}

/* ============================================
   CLOSE MODAL
============================================ */

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}

/* ============================================
   FETCH PET DATA
============================================ */

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

    console.warn('Pet not found in backend cache');

    /* fallback DOM */

    const petItem = document.querySelector(`#${CSS.escape(petId)}`);

    if (petItem) {
      populateModal(extractPetDataFromDOM(petItem));
    }
  } catch (error) {
    console.error('Modal fetch error:', error);
  }
}

/* ============================================
   DOM FALLBACK
============================================ */

function extractPetDataFromDOM(petItem) {
  if (!petItem) return null;

  return {
    _id: petItem.id,

    name:
      petItem.querySelector('.pet-info-name')?.textContent?.trim() ||
      'Невідомо',

    image: petItem.querySelector('.pet-image')?.src || '',

    age:
      petItem.querySelector('.pet-age')?.textContent
        ?.replace('роки', '')
        .replace('року', '')
        .trim() || '',

    gender:
      petItem.querySelector('.pet-gender')?.textContent?.trim() || '',

    description: petItem.getAttribute('data-description') || '',

    behavior:
      petItem.querySelector('.pet-about')?.textContent?.trim() || '',

    healthStatus: petItem.getAttribute('data-health-status') || '',

    species:
      petItem.querySelector('.pet-info-category')?.textContent?.trim() || '',

    categories: Array.from(
      petItem.querySelectorAll('.pet-info-categories-list-item')
    ).map(el => ({
      name: el.textContent.trim()
    }))
  };
}

/* ============================================
   POPULATE MODAL UI
============================================ */

function populateModal(petData) {
  if (!petData) return;

  const refs = {
    img: document.getElementById('petModalImage'),
    category: document.getElementById('petModalCategory'),
    name: document.getElementById('petModalName'),
    age: document.getElementById('petModalAge'),
    gender: document.getElementById('petModalGender'),
    description: document.getElementById('petModalDescription'),
    healthStatus: document.getElementById('petModalHealthStatus'),
    behavior: document.getElementById('petModalBehavior')
  };

  Object.values(refs).forEach(el => {
    if (el) el.textContent = '';
  });

  /* IMAGE */

  if (refs.img && petData.image) {
    refs.img.src = petData.image;
    refs.img.alt = petData.name || '';
  }

  /* CATEGORY NORMALIZATION (singular) */

  const categoryMap = {
    Собаки: 'Собака',
    Коти: 'Кіт',
    Кролики: 'Кролик',
    Гризуни: 'Гризун',
    Птахи: 'Птах',
    'Тварини з особливими потребами': 'Особливі потреби',
    'Терміново шукають дім': 'Терміново'
  };

  let categoryText = 'Невизначено';

  if (petData.categories?.length) {
    const found = petData.categories.find(cat => categoryMap[cat.name]);

    if (found) {
      categoryText = categoryMap[found.name];
    }
  }

  if (categoryText === 'Невизначено' && petData.species) {
    const speciesMap = {
      Собака: 'Собака',
      Кіт: 'Кіт',
      'Кіт / Кішка': 'Кіт',
      Кролик: 'Кролик',
      Гризун: 'Гризун',
      Птах: 'Птах'
    };

    categoryText = speciesMap[petData.species] || 'Невизначено';
  }

  refs.category.textContent = categoryText;

  /* BASIC INFO */

  refs.name.textContent = petData.name || '';
  refs.age.textContent = petData.age || '';
  refs.gender.textContent = petData.gender || '';

  /* DESCRIPTION */

  refs.description.textContent =
    petData.description || 'Інформація недоступна';

  /* BEHAVIOR */

  refs.behavior.textContent =
    petData.behavior || 'Інформація недоступна';

  /* HEALTH SECTION */

  const healthSection =
    refs.healthStatus?.closest('.pet-modal-section');

  if (petData.healthStatus?.trim()) {
    refs.healthStatus.textContent = petData.healthStatus;

    if (healthSection) healthSection.style.display = 'block';
  } else if (healthSection) {
    healthSection.style.display = 'none';
  }
}

/* ============================================
   GLOBAL CLICK HANDLER
============================================ */

document.addEventListener('click', e => {
  const openBtn = e.target.closest('.pet-more-info');

  if (openBtn) {
    const petItem = openBtn.closest('.pet-list-item');

    const id = petItem?.id;

    if (id) openModal(id);
  }

  if (
    e.target.closest('.pet-modal-close') ||
    e.target === modalOverlay
  ) {
    closeModal();
  }
});