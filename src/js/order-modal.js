import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createOrder } from '/js/api/api.js';
import { refs } from './refs';
import { UA_TOAST } from './notifications';

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = refs.orderForm?.querySelector('button[type="submit"]');

  let currentAnimalId = null;

  /* --- 1. ГЛОБАЛЬНІ ФУНКЦІЇ КЕРУВАННЯ --- */

  window.openOrderModal = function (id) {
    if (!id) {
      console.warn('Спроба відкрити форму без ID тварини');
      return;
    }

    currentAnimalId = id;
    refs.orderOverlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePress);
  };

  function closeModal() {
    refs.orderOverlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePress);

    setTimeout(() => {
      currentAnimalId = null;
      if (refs.orderForm) {
        refs.orderForm.reset();
        refs.orderForm.classList.remove('was-validated');
      }
    }, 250);
  }

  function onEscapePress(e) {
    if (e.key === 'Escape') closeModal();
  }

  /* --- 2. СЛУХАЧІ ПОДІЙ --- */

  refs.orderOverlay.addEventListener('click', e => {
    if (e.target.closest('.close-btn') || e.target === refs.orderOverlay) {
      closeModal();
    }
  });

  /* --- 3. ВІДПРАВКА ФОРМИ --- */

  if (refs.orderForm) {
    refs.orderForm.addEventListener('submit', async e => {
      e.preventDefault();
      refs.orderForm.classList.add('was-validated');

      if (!refs.orderForm.checkValidity()) return;

      const formData = new FormData(refs.orderForm);
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
          title: UA_TOAST.ORDER_SUCCESS_TITLE,
          text: UA_TOAST.ORDER_SUCCESS_TEXT,
          icon: 'success',
          confirmButtonColor: '#2e2f42',
        });

        closeModal();
      } catch (error) {
        const serverError =
          error.response?.data?.message || UA_TOAST.ORDER_ERROR;
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
