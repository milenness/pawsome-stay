import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order-form');
  const modalOverlay = document.querySelector('.order-overlay');

  let currentAnimalId = null;

  // --- 1. ФУНКЦІЇ КЕРУВАННЯ ---

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

  // --- 3. ВІДПРАВКА ФОРМИ (POST /orders) ---

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      form.classList.add('was-validated');

      if (!form.checkValidity()) return;

      const formData = new FormData(form);
      const rawData = Object.fromEntries(formData.entries());

      const requestData = {
        name: rawData.name,
        phone: rawData.phone,
        comment: rawData.comment,
        animalId: currentAnimalId,
      };

      try {
        const response = await fetch(
          'https://paw-hut.b.goit.study/api/orders',
          {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Заявку успішно надіслано!',
            text: 'Ми зв’яжемося з вами найближчим часом.',
            icon: 'success',
            confirmButtonColor: '#2e2f42',
          });
          closeModal();
        } else {
          const errorInfo = await response.json();
          console.error('Сервер повернув помилку:', errorInfo);
          throw new Error();
        }
      } catch (error) {
        Swal.fire({
          title: 'Помилка!',
          text: 'Не вдалося надіслати заявкую. Спробуйте ще раз',
          icon: 'error',
          confirmButtonColor: '#2e2f42',
        });
      }
    });
  }
});
