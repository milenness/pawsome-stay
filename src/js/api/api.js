import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

export async function getAllCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function getAnimalsByCategory(categoryId = null, page = 1, limit = 9) {
  const params = { page, limit };
  if (categoryId) {
    params.categoryId = categoryId;
  }
  
  const { data } = await api.get('/animals', { params });
  return data; // Ожидаем { animals: [], totalItems: 5, page: 1 }

  
}
