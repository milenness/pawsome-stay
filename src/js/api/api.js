import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

const GET_ALL_CATEGORIES = '/categories';
const GET_ANIMALS = '/animals';
const CREATE_ORDER = '/orders';


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

// Функція для створення замовлення
export async function createOrder(orderData) {
  const response = await axios.post(CREATE_ORDER, orderData);
  return response.data;
}