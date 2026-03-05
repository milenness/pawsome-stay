import { getAllCategories } from '../api/api';
import { loadPets } from './pet-list';

const categoriesList = document.querySelector('.categories-list');

getAllCategories()
  .then(categories => {
    const markup = categories.map(({ _id, name }) => 
      `<li class="categories-list-item" data-category-id="${_id}">${name}</li>`
    );
    categoriesList.innerHTML = `<li class="categories-list-item active" data-category-id="">Всі</li>` + markup.join('');
  })
  .catch(err => console.error(err));

categoriesList.addEventListener('click', (event) => {
  const item = event.target;
  if (item.nodeName !== 'LI' || item.classList.contains('active')) return;

  categoriesList.querySelector('.active').classList.remove('active');
  item.classList.add('active');

  const categoryId = item.dataset.categoryId || null;

  loadPets(categoryId, true);
});