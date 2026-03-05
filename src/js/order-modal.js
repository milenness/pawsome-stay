import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Імпортуйте функцію з вашого API-файлу
import { createOrder } from '/js/api/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order-form');
  const modalOverlay = document.querySelector('.order-overlay');
  const submitBtn = form?.querySelector('button[type="submit"]');

  let currentAnimalId = null;

  // --- 1. ФУНКЦІЇ КЕРУВАННЯ МОДАЛКОЮ ---

  function openModal(id) {
    if (!id) {
      console.error('Помилка: ID тварини не передано!');
      return;
    }
    currentAnimalId = id;
    modalOverlay.classList.add('is-open');
    document.addEventListener('keydown', onEscapePress);
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.removeEventListener('keydown', onEscapePress);
    currentAnimalId = null;

    setTimeout(() => {
      if (form) {
        form.reset();
        form.classList.remove('was-validated');
      }
    }, 250);
  }

  function onEscapePress(e) {
    if (e.key === 'Escape') closeModal();
  }

  // --- 2. СЛУХАЧІ КЛІКІВ ---

  document.addEventListener('click', e => {
    const openBtn = e.target.closest('.open-modal-btn');
    if (openBtn) {
      const id = openBtn.dataset.id;
      openModal(id);
    }

    if (e.target.closest('.close-btn') || e.target === modalOverlay) {
      closeModal();
    }
  });

  // --- 3. ВІДПРАВКА ФОРМИ ---

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Додаємо клас валідації (для CSS стилів)
      form.classList.add('was-validated');

      // Перевірка вбудованої валідації браузера
      if (!form.checkValidity()) return;

      // Збираємо дані форми
      const formData = new FormData(form);
      const rawData = Object.fromEntries(formData.entries());

      const requestData = {
        name: rawData.name,
        phone: rawData.phone,
        comment: rawData.comment,
        animalId: currentAnimalId,
      };

      try {
        // Деактивуємо кнопку, щоб уникнути подвійних кліків
        if (submitBtn) submitBtn.disabled = true;

        // Викликаємо функцію з нашого API-сервісу
        await createOrder(requestData);

        // Успішне сповіщення
        Swal.fire({
          title: 'Заявку успішно надіслано!',
          text: 'Ми зв’яжемося з вами найближчим часом.',
          icon: 'success',
          confirmButtonColor: '#2e2f42',
        });

        closeModal();
      } catch (error) {
        // Обробка помилок (Axios автоматично кине помилку, якщо статус не 2xx)
        console.error(
          'Помилка відправки:',
          error.response?.data || error.message
        );

        Swal.fire({
          title: 'Помилка!',
          text: 'Не вдалося надіслати заявку. Спробуйте, будь ласка, ще раз пізніше.',
          icon: 'error',
          confirmButtonColor: '#2e2f42',
        });
      } finally {
        // Повертаємо кнопку в активний стан у будь-якому випадку
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
