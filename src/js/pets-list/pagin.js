// import { getAnimalsByCategory } from '../api/api';
// import { notify, UA_TOAST } from '../notifications';
// import { refs } from '../refs';

// const DESKTOP_BREAKPOINT = 1440;
// const DESKTOP_LIMIT = 9;

// let currentPage = 1;
// let totalPages = 1;
// let currentCategoryId = null;
// let isLoading = false;
// let isInitialized = false;

// function isDesktop() {
//   return window.innerWidth >= DESKTOP_BREAKPOINT;
// }

// function getPaginationWrapper() {
//   return document.querySelector('.pagination-wrapper');
// }

// function getPaginationEl() {
//   return document.querySelector('.pagination');
// }

// function createPetListMarkup(animals) {
//   return animals
//     .map(
//       ({ _id, name, age, gender, image, species, categories, behavior }) => `
//         <li class="pet-list-item" id="${_id}">
//           <img src="${image}" alt="${name}" class="pet-image">
//           <div class="pet-info">
//             <span class="pet-info-category">${species}</span>
//             <h3 class="pet-info-name">${name}</h3>

//             <ul class="pet-info-categories-list">
//               ${categories
//                 .map(
//                   ({ name }) =>
//                     `<li class="pet-info-categories-list-item">${name}</li>`
//                 )
//                 .join('')}
//             </ul>

//             <div class="pet-age-and-gender-wrapper">
//               <span class="pet-age">${age} роки/років</span>
//               <span class="pet-gender">${gender}</span>
//             </div>

//             <p class="pet-about">${behavior}</p>
//           </div>

//           <button class="pet-more-info" type="button">
//             Дізнатись більше
//           </button>
//         </li>
//       `
//     )
//     .join('');
// }

// function renderPets(animals) {
//   if (!refs.petList) return;
//   refs.petList.innerHTML = createPetListMarkup(animals);
// }

// function hideLoadMore() {
//   if (refs.petListLoadMoreBtnWrapper) {
//     refs.petListLoadMoreBtnWrapper.classList.add('is-hidden');
//   }
// }

// function showLoadMore() {
//   if (refs.petListLoadMoreBtnWrapper) {
//     refs.petListLoadMoreBtnWrapper.classList.remove('is-hidden');
//   }
// }

// function showPagination() {
//   const wrapper = getPaginationWrapper();
//   if (wrapper) {
//     wrapper.classList.remove('is-hidden');
//   }
// }

// function hidePagination() {
//   const wrapper = getPaginationWrapper();
//   if (wrapper) {
//     wrapper.classList.add('is-hidden');
//   }
// }

// function createPageButton(page, isActive = false) {
//   return `
//     <button
//       type="button"
//       class="pagination-btn ${isActive ? 'active' : ''}"
//       data-page="${page}"
//       aria-label="Page ${page}"
//       ${isActive ? 'aria-current="page"' : ''}
//     >
//       ${page}
//     </button>
//   `;
// }

// function createDots(targetPage) {
//   return `
//     <button
//       type="button"
//       class="pagination-dots"
//       data-page="${targetPage}"
//       aria-label="Jump to page ${targetPage}"
//     >
//       ...
//     </button>
//   `;
// }

// function getVisiblePages(total, current) {
//   if (total <= 4) {
//     return Array.from({ length: total }, (_, i) => i + 1);
//   }

//   if (current <= 3) {
//     return [1, 2, 3, { type: 'dots', page: 4 }, total];
//   }

//   if (current >= total - 1) {
//     return [total - 3, total - 2, total - 1, total];
//   }

//   return [
//     current - 2,
//     current - 1,
//     current,
//     { type: 'dots', page: current + 1 },
//     total,
//   ];
// }

// function renderPagination() {
//   const paginationEl = getPaginationEl();
//   if (!paginationEl) return;

//   if (!isDesktop() || totalPages <= 1) {
//     paginationEl.innerHTML = '';
//     hidePagination();
//     return;
//   }

//   const items = getVisiblePages(totalPages, currentPage);

//   paginationEl.innerHTML = `
//     <button
//       type="button"
//       class="pagination-nav pagination-prev"
//       data-page="${currentPage - 1}"
//       aria-label="Previous page"
//       ${currentPage === 1 ? 'disabled' : ''}
//     >
//       ←
//     </button>

//     ${items
//       .map(item => {
//         if (typeof item === 'object' && item.type === 'dots') {
//           return createDots(item.page);
//         }

//         return createPageButton(item, item === currentPage);
//       })
//       .join('')}

//     <button
//       type="button"
//       class="pagination-nav pagination-next"
//       data-page="${currentPage + 1}"
//       aria-label="Next page"
//       ${currentPage === totalPages ? 'disabled' : ''}
//     >
//       →
//     </button>
//   `;

//   showPagination();
// }

// async function loadDesktopPage(page = 1, categoryId = null) {
//   if (!isDesktop() || isLoading) return;

//   isLoading = true;

//   try {
//     const { animals, totalItems } = await getAnimalsByCategory(
//       categoryId,
//       page,
//       DESKTOP_LIMIT
//     );

//     if (!Array.isArray(animals) || animals.length === 0) {
//       refs.petList.innerHTML = '';
//       const paginationEl = getPaginationEl();
//       if (paginationEl) paginationEl.innerHTML = '';
//       hidePagination();
//       hideLoadMore();
//       notify.failure(UA_TOAST.PETS_EMPTY);
//       return;
//     }

//     currentPage = page;
//     currentCategoryId = categoryId;
//     totalPages = Math.ceil(totalItems / DESKTOP_LIMIT);

//     renderPets(animals);
//     renderPagination();
//     hideLoadMore();
//   } catch (error) {
//     const isNetworkError = !error.response;

//     if (isNetworkError) {
//       notify.failure(UA_TOAST.NETWORK);
//       return;
//     }

//     notify.failure(UA_TOAST.UNKNOWN_ERROR);
//   } finally {
//     isLoading = false;
//   }
// }

// function handlePaginationClick(event) {
//   const btn = event.target.closest('[data-page]');
//   if (!btn || !isDesktop()) return;

//   const page = Number(btn.dataset.page);

//   if (!page || page < 1 || page > totalPages || page === currentPage) return;

//   loadDesktopPage(page, currentCategoryId);

//   const section = document.getElementById('pets-list');
//   if (section) {
//     section.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }
// }

// function setActiveCategory(categoryItem) {
//   const activeItem = refs.categoriesList.querySelector('.active');
//   if (activeItem) {
//     activeItem.classList.remove('active');
//   }

//   categoryItem.classList.add('active');
// }

// function handleCategoryClickDesktop(event) {
//   if (!isDesktop()) return;

//   const item = event.target.closest('.categories-list-item');
//   if (!item) return;

//   event.preventDefault();
//   event.stopPropagation();
//   event.stopImmediatePropagation();

//   if (item.classList.contains('active')) return;

//   setActiveCategory(item);

//   const categoryId = item.dataset.categoryId || null;
//   loadDesktopPage(1, categoryId);
// }

// function enableDesktopMode() {
//   hideLoadMore();
//   showPagination();

//   const activeItem = refs.categoriesList?.querySelector(
//     '.categories-list-item.active'
//   );
//   currentCategoryId = activeItem?.dataset.categoryId || null;

//   loadDesktopPage(1, currentCategoryId);
// }

// function enableMobileTabletMode() {
//   hidePagination();
//   showLoadMore();
// }

// function syncMode() {
//   if (!refs.petList || !refs.categoriesList) return;

//   if (isDesktop()) {
//     enableDesktopMode();
//   } else {
//     enableMobileTabletMode();
//   }
// }

// function waitForCategoriesAndInit() {
//   if (isInitialized) return;

//   const observer = new MutationObserver(() => {
//     const hasCategories =
//       refs.categoriesList &&
//       refs.categoriesList.querySelector('.categories-list-item');

//     if (!hasCategories) return;

//     isInitialized = true;
//     observer.disconnect();
//     syncMode();
//   });

//   observer.observe(refs.categoriesList, {
//     childList: true,
//     subtree: true,
//   });
// }

// function initDesktopPagination() {
//   const paginationEl = getPaginationEl();

//   if (!refs.petList || !refs.categoriesList || !paginationEl) return;

//   paginationEl.addEventListener('click', handlePaginationClick);

//   refs.categoriesList.addEventListener(
//     'click',
//     handleCategoryClickDesktop,
//     true
//   );

//   let resizeTimeout;

//   window.addEventListener('resize', () => {
//     clearTimeout(resizeTimeout);

//     resizeTimeout = setTimeout(() => {
//       syncMode();
//     }, 150);
//   });

//   waitForCategoriesAndInit();
// }

// initDesktopPagination();
