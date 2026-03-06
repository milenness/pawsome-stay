import { getAllCategories } from '../api/api';
import { clearPetList, loadPets } from './pet-list';
import { notify, UA_TOAST } from '../notifications';

const categoriesList = document.querySelector('.categories-list');

getAllCategories()
  .then(categories => {
    if (!Array.isArray(categories) || categories.length === 0) {
      clearPetList();
      notify.failure(UA_TOAST.PETS_CATEGORY_LOAD_FAIL);
      return;
    }
    const markup = categories.map(
      ({ _id, name }) =>
        `<li class="categories-list-item" data-category-id="${_id}">${name}</li>`
    );
    categoriesList.innerHTML =
      `<li class="categories-list-item active" data-category-id="">Всі</li>` +
      markup.join('');

    loadPets();
  })
  .catch(err => {
    clearPetList();

    const isNetworkError = !err.response;
    if (isNetworkError) {
      notify.failure(UA_TOAST.NETWORK);
      return;
    }

    notify.failure(UA_TOAST.UNKNOWN_ERROR);
  });

categoriesList.addEventListener('click', event => {
  const item = event.target;
  if (item.nodeName !== 'LI' || item.classList.contains('active')) return;

  const activeItem = categoriesList.querySelector('.active');
  if (activeItem) {
    activeItem.classList.remove('active');
  }
  item.classList.add('active');

  const categoryId = item.dataset.categoryId || null;

  loadPets(categoryId, true);
});
