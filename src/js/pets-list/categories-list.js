import { getAllCategories, getAnimalsByCategory } from '../api/api';
import { petList, createPetListMarkup } from './pet-list';

const categoriesList = document.querySelector('.categories-list');

getAllCategories()
  .then(categories => {
    // refs.loader.style.display = 'block';
    categoriesList.innerHTML = createCategoriesListMarkup(categories);
  })
  .catch(err => {
    console.error(err);
    // Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });
//   .finally(_ => (refs.loader.style.display = 'none'));

function createCategoriesListMarkup(categories) {
  const result = categories.map(
    ({ _id, name }) =>
      `<li class="categories-list-item" id="${_id}" data-category-id="${_id}">${name}</li>`
  );
  result.unshift(
    `<li class="categories-list-item active" data-category-name="All categories">Всі</li>`
  );
  return result.join('');
}

categoriesList.addEventListener('click', onLoadCategory);

function onLoadCategory(evt) {
  // refs.loader.style.display = 'block';
  if (evt.target.nodeName !== 'LI') {
    return;
  }

  const current = evt.target;

  if (current.classList.contains('active')) {
    console.log(
      'Repeat click on active category - No GET request - Just return'
    );
    return;
  }

  current.parentElement
    .querySelector('.categories-list-item.active')
    .classList.remove('active');
  current.classList.add('active');

  const categoryId = evt.target.dataset.categoryId;

  getAnimalsByCategory(categoryId)
    .then(({ animals }) => {
      // refs.loader.style.display = 'block';
      petList.innerHTML = createPetListMarkup(animals);
      // if (animals.length === 0) {
      //     petList.insertAdjacentHTML(
      //         'afterbegin',
      //         `${petsNotFoundWrapperMarkup}`
      //     );
      //     return;
      // }
    })
    .catch(err => {
      console.error(err);
      // Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
