import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_GOIT_API_URL,
});

const GET_ALL_CATEGORIES = import.meta.env.VITE_GOIT_API_GET_ALL_CATEGORIES_URL;
const GET_ANIMALS = import.meta.env.VITE_GOIT_API_GET_ANIMALS_URL;
const CREATE_ORDER = import.meta.env.VITE_GOIT_API_CREATE_ORDER_URL;

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
