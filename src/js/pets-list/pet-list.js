import { getAnimalsByCategory } from '../api/api';
import { notify, UA_TOAST } from '../notifications';
import { refs } from '../refs';

const PETS_CACHE_STORAGE_KEY = 'petsByCategoryCache';
const PETS_CACHE_VERSION = 1;
const PETS_CACHE_TTL_MS = 1000 * 60 * 30;

let currentCategory = null;
let isLoading = false;
let isFirstLoad = true;
let loadedAnimals = [];
let currentTotalItems = null;
let storageReadsCount = 0;
let nextBackendPage = 1;
let lastViewportType = getViewportType();

export function getPetById(petId) {
  return loadedAnimals.find(
    animal => String(animal._id || animal.id) === String(petId)
  );
}

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

export function clearPetList() {
  refs.petList.innerHTML = '';
  currentCategory = null;
  loadedAnimals = [];
  currentTotalItems = null;
  storageReadsCount = 0;
  nextBackendPage = 1;

  refs.petListLoadMoreBtn.classList.add('is-hidden');
  refs.petListLoadMoreBtnWrapper.classList.add('is-hidden');
}

function hasPets() {
  return refs.petList.querySelectorAll('.pet-list-item').length > 0;
}

function updateButtonVisibility(shouldShow) {
  if (!refs.petListLoadMoreBtnWrapper) return;

  if (shouldShow) {
    refs.petListLoadMoreBtnWrapper.classList.remove('is-hidden');
  } else {
    refs.petListLoadMoreBtnWrapper.classList.add('is-hidden');
  }
}

const isTabletViewport = () => {
  const width = window.innerWidth;
  return width >= 768 && width < 1440;
};

function getViewportType() {
  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1440) return 'tablet';
  return 'desktop';
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

function getCategoryStorageKey(categoryId) {
  return categoryId || '__all__';
}

function createEmptyCachePayload() {
  return {
    version: PETS_CACHE_VERSION,
    categories: {},
  };
}

function normalizeCachePayload(parsedData) {
  const emptyPayload = createEmptyCachePayload();

  if (!parsedData || typeof parsedData !== 'object') {
    return emptyPayload;
  }

  const isValidVersionedPayload =
    parsedData.version === PETS_CACHE_VERSION &&
    parsedData.categories &&
    typeof parsedData.categories === 'object';

  if (isValidVersionedPayload) {
    return parsedData;
  }

  // Backward compatibility with previous plain-map cache structure.
  if (parsedData.version !== undefined || parsedData.categories !== undefined) {
    return emptyPayload;
  }

  const legacyCategories = Object.entries(parsedData).reduce(
    (acc, [key, value]) => {
      if (!value || !Array.isArray(value.animals)) {
        return acc;
      }

      acc[key] = {
        animals: value.animals,
        totalItems: Number.isFinite(value.totalItems) ? value.totalItems : null,
        // Force one refresh for legacy entries that had no timestamp.
        updatedAt: 0,
      };

      return acc;
    },
    {}
  );

  return {
    version: PETS_CACHE_VERSION,
    categories: legacyCategories,
  };
}

function isCacheEntryFresh(entry) {
  if (!entry) return false;
  if (!Number.isFinite(entry.updatedAt)) return false;

  return Date.now() - entry.updatedAt < PETS_CACHE_TTL_MS;
}

function getPetsCacheMap() {
  try {
    const rawData = localStorage.getItem(PETS_CACHE_STORAGE_KEY);
    if (!rawData) return createEmptyCachePayload();

    const parsedData = JSON.parse(rawData);
    return normalizeCachePayload(parsedData);
  } catch {
    return createEmptyCachePayload();
  }
}

function savePetsCacheMap(cacheMap) {
  try {
    localStorage.setItem(PETS_CACHE_STORAGE_KEY, JSON.stringify(cacheMap));
  } catch {
    // Ignore quota/privacy-mode failures and continue with runtime state.
  }
}

function getCachedCategoryData(categoryId) {
  const cachePayload = getPetsCacheMap();
  const key = getCategoryStorageKey(categoryId);
  const entry = cachePayload.categories[key];

  if (!entry || !Array.isArray(entry.animals)) {
    return { animals: [], totalItems: null };
  }

  if (!isCacheEntryFresh(entry)) {
    delete cachePayload.categories[key];
    savePetsCacheMap(cachePayload);
    return { animals: [], totalItems: null };
  }

  return {
    animals: entry.animals,
    totalItems: Number.isFinite(entry.totalItems) ? entry.totalItems : null,
  };
}

function updateCachedCategoryData(
  categoryId,
  incomingAnimals,
  totalItems = null
) {
  const cachePayload = getPetsCacheMap();
  const key = getCategoryStorageKey(categoryId);
  const currentEntry = cachePayload.categories[key];
  const existingAnimals = Array.isArray(currentEntry?.animals)
    ? currentEntry.animals
    : [];

  const mergedAnimals = mergeUniqueAnimals(existingAnimals, incomingAnimals);

  cachePayload.categories[key] = {
    animals: mergedAnimals,
    totalItems:
      Number.isFinite(totalItems) && totalItems >= 0
        ? totalItems
        : (currentEntry?.totalItems ?? null),
    updatedAt: Date.now(),
  };

  savePetsCacheMap(cachePayload);

  return cachePayload.categories[key];
}

function getHasMorePets(limit) {
  const { animals: cachedAnimals, totalItems: cachedTotalItems } =
    getCachedCategoryData(currentCategory);

  const renderedCount = loadedAnimals.length;
  const hasCachedAnimalsLeft = cachedAnimals.length > renderedCount;
  const totalItems =
    Number.isFinite(currentTotalItems) && currentTotalItems >= 0
      ? currentTotalItems
      : cachedTotalItems;

  const hasMoreByTotal =
    Number.isFinite(totalItems) && renderedCount < Number(totalItems);

  if (hasCachedAnimalsLeft || hasMoreByTotal) {
    return true;
  }

  return renderedCount > 0 && renderedCount % limit === 0;
}

function resetCategoryState(categoryId) {
  currentCategory = categoryId;
  loadedAnimals = [];
  currentTotalItems = null;
  storageReadsCount = 0;
  nextBackendPage = 1;
}

function tryLoadCategoryFromStorage(limit) {
  const { animals: cachedAnimals, totalItems } =
    getCachedCategoryData(currentCategory);

  if (!cachedAnimals.length) return false;

  loadedAnimals = cachedAnimals.slice(0, limit);
  currentTotalItems = totalItems;
  storageReadsCount = 1;
  nextBackendPage = storageReadsCount + 1;

  const hasMorePets = getHasMorePets(limit);
  renderPetList(hasMorePets);

  if (refs.petListLoadMoreBtn) {
    refs.petListLoadMoreBtn.classList.toggle('is-hidden', !hasMorePets);
  }

  return true;
}

function tryLoadMoreFromStorage(limit) {
  const { animals: cachedAnimals } = getCachedCategoryData(currentCategory);
  if (cachedAnimals.length <= loadedAnimals.length) {
    return false;
  }

  const nextChunk = cachedAnimals.slice(
    loadedAnimals.length,
    loadedAnimals.length + limit
  );

  if (!nextChunk.length) {
    return false;
  }

  loadedAnimals = mergeUniqueAnimals(loadedAnimals, nextChunk);
  storageReadsCount += 1;
  nextBackendPage = storageReadsCount + 1;

  const hasMorePets = getHasMorePets(limit);
  renderPetList(hasMorePets);

  if (refs.petListLoadMoreBtn) {
    refs.petListLoadMoreBtn.classList.toggle('is-hidden', !hasMorePets);
  }

  return true;
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

function renderPetList(hasMorePets) {
  const shouldKeepEvenCount =
    isTabletViewport() && hasMorePets && loadedAnimals.length % 2 !== 0;

  const animalsToRender = shouldKeepEvenCount
    ? loadedAnimals.slice(0, -1)
    : loadedAnimals;

  refs.petList.innerHTML = createPetListMarkup(animalsToRender);
}

function recalculateAndRenderOnResize() {
  if (!loadedAnimals.length || isLoading) return;

  const currentViewportType = getViewportType();
  if (currentViewportType === lastViewportType) return;

  lastViewportType = currentViewportType;
  const hasMorePets = !refs.petListLoadMoreBtn.classList.contains('is-hidden');
  renderPetList(hasMorePets);
}

export async function loadPets(categoryId = null, isNewCategory = false) {
  if (isLoading) return;

  const limit = getLimit();
  const isInitialCategoryLoad =
    !isNewCategory &&
    loadedAnimals.length === 0 &&
    currentCategory === null &&
    categoryId === null;

  if (isInitialCategoryLoad) {
    resetCategoryState(categoryId);

    const loadedFromStorage = tryLoadCategoryFromStorage(limit);
    if (loadedFromStorage) {
      updateButtonVisibility(hasPets());
      return;
    }
  }

  if (isNewCategory) {
    resetCategoryState(categoryId);
    refs.petList.innerHTML = '';
    // Hide wrapper when switching to new category
    if (refs.petListLoadMoreBtnWrapper) {
      refs.petListLoadMoreBtnWrapper.classList.add('is-hidden');
    }

    const loadedFromStorage = tryLoadCategoryFromStorage(limit);
    if (loadedFromStorage) {
      updateButtonVisibility(hasPets());
      return;
    }
  }

  if (!isNewCategory && loadedAnimals.length > 0) {
    const loadedMoreFromStorage = tryLoadMoreFromStorage(limit);
    if (loadedMoreFromStorage) {
      updateButtonVisibility(hasPets());
      return;
    }
  }

  refs.petList.insertAdjacentHTML('beforeend', createLoaderMarkup());
  isLoading = true;

  try {
    const { animals, totalItems } = await getAnimalsByCategory(
      currentCategory,
      nextBackendPage,
      limit
    );

    if (!Array.isArray(animals) || animals.length === 0) {
      removeLoader();

      if (loadedAnimals.length > 0) {
        if (refs.petListLoadMoreBtn) {
          refs.petListLoadMoreBtn.classList.add('is-hidden');
        }
        return;
      }

      clearPetList();
      notify.failure(UA_TOAST.PETS_EMPTY);
      return;
    }

    const updatedCache = updateCachedCategoryData(
      currentCategory,
      animals,
      totalItems
    );

    loadedAnimals = mergeUniqueAnimals(loadedAnimals, animals);
    currentTotalItems = Number.isFinite(totalItems)
      ? totalItems
      : updatedCache.totalItems;
    nextBackendPage += 1;

    const hasMorePets = getHasMorePets(limit);

    removeLoader();
    renderPetList(hasMorePets);

    if (!hasMorePets || animals.length === 0) {
      if (refs.petListLoadMoreBtn) {
        refs.petListLoadMoreBtn.classList.add('is-hidden');
      }
    } else {
      if (refs.petListLoadMoreBtn) {
        refs.petListLoadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    removeLoader();

    const isNetworkError = !error.response;
    if (isNetworkError) {
      notify.failure(UA_TOAST.NETWORK);
      return;
    }

    notify.failure(UA_TOAST.UNKNOWN_ERROR);
    if (refs.petListLoadMoreBtn) {
      refs.petListLoadMoreBtn.classList.add('is-hidden');
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

if (refs.petListLoadMoreBtn) {
  refs.petListLoadMoreBtn.addEventListener('click', async () => {
    if (isLoading) return;

    // Check if we already have all animals loaded
    const { animals: cachedAnimals, totalItems: cachedTotalItems } =
      getCachedCategoryData(currentCategory);
    
    const totalItems =
      Number.isFinite(currentTotalItems) && currentTotalItems >= 0
        ? currentTotalItems
        : cachedTotalItems;

    if (
      Number.isFinite(totalItems) &&
      loadedAnimals.length >= totalItems
    ) {
      refs.petListLoadMoreBtn.classList.add('is-hidden');
      return;
    }

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

window.addEventListener('resize', recalculateAndRenderOnResize);
