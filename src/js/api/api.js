import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api',
});

const GET_ALL_CATEGORIES = '/categories';
const GET_ANIMALS = '/animals';
const CREATE_ORDER = '/orders';
const GET_FEEDBACKS = '/feedbacks';

// Функція для отримання всіх категорій
export async function getAllCategories() {
  const { data } = await api.get(GET_ALL_CATEGORIES);
  return data;
}

// Функція для отримання всіх тварин за категорією з пагінацією
export async function getAnimalsByCategory(
  categoryId = null,
  page = 1,
  limit = 9
) {
  const params = { page, limit };
  if (categoryId) {
    params.categoryId = categoryId;
  }

  const { data } = await api.get(GET_ANIMALS, {
    params,
    skipGlobalLoader: true,
  });
  return data; // Очікуємо { animals: [], totalItems: 5, page: 1 }
}

// Функція для створення замовлення
export const createOrder = async orderData => {
  const { data } = await api.post(CREATE_ORDER, orderData);
  return data;
};

// Функція для отримання відгуків з пагінацією
export const fetchFeedbacks = async (page = 1, limit = 12) => {
  const { data } = await api.get(GET_FEEDBACKS, {
    params: { page, limit },
    skipGlobalLoader: true,
  });
  return data;
};
