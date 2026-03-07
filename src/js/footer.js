import { refs } from './refs';
import iconsSpriteUrl from '../img/icons.svg?url';

const team = [
  {
    photo: '',
    name: 'Марина',
    github: 'https://github.com/ImMima',
    linkedIn: '',
    role: '',
    description:
      'Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor.',
  },
  {
    photo: '',
    name: 'Марина',
    github: 'https://github.com/ImMima',
    linkedIn: '',
    role: '',
    description:
      'Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor.',
  },
  {
    photo: '',
    name: 'Марина',
    github: 'https://github.com/ImMima',
    linkedIn: '',
    role: '',
    description:
      'Donec interdum iaculis enim ut sodales. Pellentesque aliquet sapien a tincidunt egestas. Pellentesque dignissim erat a laoreet pretium. Mauris non dignissim lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ultricies dui sed bibendum porttitor. Integer eu sollicitudin metus. Vivamus sed ipsum vel lorem euismod porttitor.',
  },
];

const devTeamBtn = refs.devTeamBtn;
const devTeamModalOverlay = refs.devTeamModalOverlay;

devTeamBtn.addEventListener('click', evt => {
  devTeamModalOverlay.innerHTML = renderModalMarkup();

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
    const hasLinkedIn = member.linkedIn ? '' : 'disabled';

    return `
        <li class="dev-team-modal-member">
          <div class="dev-team-modal-member-image-wrapper">
            <img class="dev-team-modal-member-photo" src="${member.photo || '../img/hero/hero-tel.webp'}" alt="${member.name}" />
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
              <a 
                class="dev-team-modal-member-socials-btn" ${hasLinkedIn}
                href="${member.linkedIn}"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >LinkedIn</a>
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
  devTeamModalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);
};

const closeModal = () => {
  devTeamModalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  setTimeout(() => {
    devTeamModalOverlay.innerHTML = '';
  }, 300);
};

document.addEventListener('click', evt => {
  const target = evt.target;

  if (
    target.closest('.dev-team-modal-close') ||
    target === devTeamModalOverlay
  ) {
    closeModal();
    return;
  }
});
