import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createOrder } from '/js/api/api.js';
import { refs } from './refs';

document.addEventListener('DOMContentLoaded', () => {
  const form = refs.orderForm;
  const modalOverlay = refs.orderOverlay;
  const submitBtn = form?.querySelector('button[type="submit"]');

  let currentAnimalId = null;

  /* --- 1. ГЛОБАЛЬНІ ФУНКЦІЇ КЕРУВАННЯ --- */

  window.openOrderModal = function (id) {
    if (!id) {
      console.warn('Спроба відкрити форму без ID тварини');
      return;
    }

    currentAnimalId = id;
    modalOverlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePress);
  };

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePress);

    setTimeout(() => {
      currentAnimalId = null;
      if (form) {
        form.reset();
        form.classList.remove('was-validated');
      }
    }, 250);
  }

  function onEscapePress(e) {
    if (e.key === 'Escape') closeModal();
  }

  /* --- 2. СЛУХАЧІ ПОДІЙ --- */

  modalOverlay.addEventListener('click', e => {
    if (e.target.closest('.close-btn') || e.target === modalOverlay) {
      closeModal();
    }
  });

  /* --- 3. ВІДПРАВКА ФОРМИ --- */

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      form.classList.add('was-validated');

      if (!form.checkValidity()) return;

      if (!currentAnimalId) {
        Swal.fire({
          title: 'Помилка',
          text: 'Не вдалося визначити ID тварини.',
          icon: 'error',
          confirmButtonColor: '#2e2f42',
        });
        return;
      }

      const formData = new FormData(form);
      const rawData = Object.fromEntries(formData.entries());

      const requestData = {
        name: rawData.name.trim(),
        phone: rawData.phone.trim(),
        comment: rawData.comment ? rawData.comment.trim() : 'Хочу стати другом',
        animalId: currentAnimalId,
      };

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Надсилаємо...';
        }

        await createOrder(requestData);

        await Swal.fire({
          title: 'Заявку успішно надіслано!',
          text: 'Ми зв’яжемося з вами найближчим часом.',
          icon: 'success',
          confirmButtonColor: '#2e2f42',
        });

        closeModal();
      } catch (error) {
        const serverError =
          error.response?.data?.message || 'Помилка при відправці.';
        Swal.fire({ title: 'Помилка!', text: serverError, icon: 'error' });
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Надіслати';
        }
      }
    });
  }
});
