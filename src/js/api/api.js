import axios from 'axios';

const GET_ALL_CATEGORIES = '/categories';
const GET_ANIMALS = '/animals';
const CREATE_ORDER = '/orders';

axios.defaults.baseURL = 'https://paw-hut.b.goit.study/api';

//Повертає масив з категоріями
export async function getAllCategories() {
  const response = await axios.get(`${GET_ALL_CATEGORIES}`);
  return response.data;
}

//Повертає масивз тваринами певної категорії
export async function getAnimalsByCategory(categoryId, page = 1, limit = 9) {
  const params = {
    page,
    limit,
  };
  if (categoryId) {
    params.categoryId = categoryId;
  }
  const response = await axios.get(`${GET_ANIMALS}`, { params });
  return response.data;
}

// Функція для створення замовлення
export async function createOrder(orderData) {
  const response = await axios.post(CREATE_ORDER, orderData);
  return response.data;
}