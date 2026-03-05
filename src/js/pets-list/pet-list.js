import { getAnimalsByCategory } from '../api/api';

export const petList = document.querySelector('.pet-list');

getAnimalsByCategory()
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

export function createPetListMarkup(animals) {
  const result = animals.map(
    ({ _id, name, age, gender, image, species, categories, behavior }) =>
      `<li class="pet-list-item" id="${_id}">
        <img src="${image}" alt="${name}" class="pet-image">
        <div class="pet-info">
          <span class="pet-info-category">${species}</span>
          <h3 class="pet-info-name">${name}</h3>
          <ul class="pet-info-categories-list">
            ${categories
              .map(
                category =>
                  `<li class="pet-info-categories-list-item">${category.name}</li>`
              )
              .join('')}
          </ul>
          <div class="pet-age-and-gender-wrapper">
            <span class="pet-age">${age} року</span>
            <span class="pet-gender">${gender}</span>
          </div>
          <p class="pet-about">${behavior}</p>
        </div>
        <button class="pet-more-info" type="button">Дізнатись більше</button>
      </li>`
  );
  return result.join('');
}
