import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order-form');
  const modalOverlay = document.querySelector('.order-overlay');

  // Кнопка відкриття 
  const openModalBtn = document.querySelector('.open-modal-btn');

  // --- 1. Функції ---

  function openModal() {
    modalOverlay.classList.add('is-open');
    document.addEventListener('keydown', onEscapePress);
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.removeEventListener('keydown', onEscapePress);

    setTimeout(() => {
      if (form) {
        form.reset();
        form.classList.remove('was-validated');
      }
    }, 250);
  }

  function onEscapePress(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  // --- 2. Слухачі подій ---

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  document.addEventListener('click', e => {
    if (e.target.closest('.close-btn')) {
      closeModal();
    }

    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // --- 3. Сабміт форми ---
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault(); 

      form.classList.add('was-validated');

      if (!form.checkValidity()) {
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Додаємо ID тварини згідно з ТЗ
      data.animalId = '12345';

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Успіх!',
            text: 'Ваша заявка успішно надіслана.',
            icon: 'success',
            confirmButtonColor: '#2e2f42',
          });

          closeModal();
        } else {
          throw new Error('Помилка сервера');
        }
      } catch (error) {
        Swal.fire({
          title: 'Помилка!',
          text: 'Щось пішло не так. Спробуйте пізніше.',
          icon: 'error',
        });
      }
    });
  }
});
