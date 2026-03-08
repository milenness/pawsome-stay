import { refs } from './refs';
import iconsSpriteUrl from '../img/icons.svg?url';
import avatarPlaceholder from '../img/hero/hero-tel.webp?url';

const team = [
  {
    photo: '',
    name: 'Мілена Карпенко',
    github: 'https://github.com/milenness',
    role: 'Team Lead',
    description: 'Хедер. Модальне вікно «Залишіть заявку»',
  },
  {
    photo: '',
    name: 'Михайло Роженко',
    github: 'https://github.com/MikhailRozhenko',
    role: 'Scrum Master',
    description: 'Секція "Все, що ви хотіли знати"',
  },
  {
    photo: '',
    name: 'Саша Василенко',
    github: 'https://github.com/BestStepInUa',
    role: 'Front-end Developer',
    description: 'Секція "Наші хвостики"',
  },
  {
    photo: '',
    name: 'Соломія Кріп',
    github: 'https://github.com/SolomiiaKrip02',
    role: 'Front-end Developer',
    description: 'Секція "Hero"',
  },
  {
    photo: '',
    name: 'Максим Пуга',
    github: 'https://github.com/MaxPuga',
    role: 'Front-end Developer',
    description: 'Секція "Чому хатинка лапок"',
  },
  {
    photo: '',
    name: 'Михайло Захаревіч',
    github: 'https://github.com/Misha908989',
    role: 'Front-end Developer',
    description: 'Секція "Щасливі історії"',
  },
  {
    photo: '',
    name: 'Сергій Романов',
    github: 'https://github.com/SergeLumiere',
    role: 'Front-end Developer',
    description:
      'Футер. Кнопка скроллу до початку сайт. Пуш повідомлення при запитах на бэкенд',
  },
  {
    photo: '',
    name: 'Марія Загоруйко',
    github: 'https://github.com/Mariianath',
    role: 'Front-end Developer',
    description: 'Модальне вікно "Деталі про тваринку"',
  },
  {
    photo: '',
    name: 'Максим Орленко',
    github: 'https://github.com/MaksOrlenko',
    role: 'Front-end Developer',
    description: 'Перемикання світлої та темної теми',
  },
  {
    photo: '',
    name: 'Владислав Гаркуша',
    github: 'https://github.com/RavemanThc',
    role: 'Front-end Developer',
    description: 'Пагінація на секції "Наші хвостики"',
  },
  {
    photo: '',
    name: 'Марина Спарінопті',
    github: 'https://github.com/ImMima',
    role: 'Front-end Developer',
    description:
      'Кастомний скролбар. Кастомний курсор. Створення та оптимізація файлу refs. Змінити код так щоб він використовував вже дані з .env. Модальне вікно у футері з участниками проекту',
  },
];

refs.devTeamBtn.addEventListener('click', evt => {
  refs.devTeamModalOverlay.innerHTML = renderModalMarkup();

  openModal();
});

const renderModalMarkup = () => `
    <div class="dev-team-modal">
      <button class="dev-team-modal-close" type="button" aria-label="Закрити">
        <svg class="close-icon" width="24" height="24">
          <use href="${iconsSpriteUrl}#close"></use>
        </svg>
      </button>

      <ul class="dev-modal-content-list">
        ${renderTeam()}
      </ul>
    </div>`;

const renderTeam = () => {
  const content = team.map(member => {
    const hasGithub = member.github ? '' : 'disabled';

    return `
        <li class="dev-team-modal-member">
          <div class="dev-team-modal-member-image-wrapper">
            <img class="dev-team-modal-member-photo" src="${member.photo || avatarPlaceholder}" alt="${member.name}" />
          </div>

          <div class="dev-team-modal-member-content">
            <div class="dev-team-modal-member-header">
              <h2 class="dev-team-modal-member-name">${member.name}</h2>
              <span class="dev-team-modal-member-role">${member.role || 'Роль відсутня'}</span>
            </div>
            
            <div class="dev-team-modal-member-socials">
              <a 
                class="dev-team-modal-member-socials-btn" ${hasGithub}
                href="${member.github}"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >GitHub</a>
            </div>

            <p class="dev-team-modal-member-description">${member.description || 'Опис відсутній'}</p>
          </div>
        </li>
        `;
  });
  return content.join('');
};

const onEscapePress = e => {
  if (e.key === 'Escape') closeModal();
};

const openModal = () => {
  refs.devTeamModalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);
};

const closeModal = () => {
  refs.devTeamModalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  setTimeout(() => {
    refs.devTeamModalOverlay.innerHTML = '';
  }, 300);
};

document.addEventListener('click', evt => {
  const target = evt.target;

  if (
    target.closest('.dev-team-modal-close') ||
    target === refs.devTeamModalOverlay
  ) {
    closeModal();
    return;
  }
});
