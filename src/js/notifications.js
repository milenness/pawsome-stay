/*
Як використовувати у своїх файлах:

1. Імпортувати notify та UA_TOAST

import { notify, UA_TOAST } from './notifications';

2. Викликати потрібний тип повідомлення

notify.success(UA_TOAST.ADOPT_SENT);
notify.failure(UA_TOAST.PETS_LOAD_FAIL);
notify.warning(UA_TOAST.PETS_EMPTY);
notify.info(UA_TOAST.PETS_END);

Типи повідомлень:
success — успішна дія
failure — помилка
warning — попередження
info — інформаційне повідомлення

Тексти повідомлень зберігаються в UA_TOAST.
*/

import Swal from 'sweetalert2';

export const UA_TOAST = {
  // Наші хвостики

  PETS_END: 'Це всі хвостики за цим фільтром 🐾',
  PETS_EMPTY: 'Хвостиків у цій категорії ще немає. Спробуйте іншу.',
  PETS_LOAD_FAIL: 'Не вдалося завантажити хвостиків. Спробуйте ще раз.',
  LOAD_FAIL: 'Не вдалося завантажити детальну інформацію про тварину.',
  PETS_CATEGORY_LOAD_FAIL:
    'Не вдалося завантажити категорії хвостиків. Перезавантажте сайт та спробуйте ще раз.',
  NO_FEEDBACKS: 'Поки що немає відгуків.',
  NO_MORE_FEEDBACKS: 'Більше відгуків немає.',
  ORDER_SUCCESS_TITLE: 'Заявку успішно надіслано!',
  ORDER_SUCCESS_TEXT: 'Ми зв’яжемося з вами найближчим часом.',
  ORDER_ERROR:
    'Не вдалося надіслати заявку. Щось пішло не так. Спробуйте ще раз або пізніше.',
  NETWORK: 'Немає з’єднання з інтернетом.',

  // Pet modal

  PET_DETAILS_FAIL: 'Не вдалося завантажити дані хвостика. Спробуйте ще раз.',

  // Adopt modal

  // NAME_REQUIRED: 'Будь ласка, вкажіть ім’я.',
  // PHONE_REQUIRED: 'Будь ласка, вкажіть телефон.',
  // PHONE_INVALID: 'Перевірте номер телефону. Приклад: +380501234567',

  // ADOPT_SENT: 'Заявку надіслано ✅ Ми зв’яжемося з вами найближчим часом.',
  // ADOPT_SEND_FAIL: 'Не вдалося надіслати заявку. Спробуйте ще раз.',

  // Загальні помилки

  UNKNOWN_ERROR: 'Щось пішло не так. Перезавантажте сайт та спробуйте ще раз.',
};

function showToast(icon, message) {
  Swal.close();

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,

    background: 'var(--color-mariner-lightest)',
    color: 'var(--color-scheme-1-text)',

    width: '420px',
    padding: '18px 20px',

    customClass: {
      popup: 'swal2-toast',
    },

    didOpen: toast => {
      toast.style.borderRadius = '16px';
      toast.style.border = '1px solid var(--color-scheme-1-border)';
      toast.style.fontFamily = 'var(--font-family)';
      toast.style.boxShadow = '0 10px 30px var(--opacity-neutral-darkest-15)';
      toast.style.lineHeight = '1.4';
      toast.style.fontSize = '15px';

      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

export const notify = {
  success(msg) {
    showToast('success', msg);
  },
  failure(msg) {
    showToast('error', msg);
  },
  warning(msg) {
    showToast('warning', msg);
  },
  info(msg) {
    showToast('info', msg);
  },
};
