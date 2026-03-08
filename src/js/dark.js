const STORAGE_KEY = 'theme';
const themeToggles = document.querySelectorAll(
  '.theme-selector, #theme-toggle-mob, .checkbox'
);
const body = document.body;

function applyTheme(isDark) {
  if (isDark) {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
  }

  themeToggles.forEach(toggle => {
    if ('checked' in toggle) {
      toggle.checked = isDark;
    }
  });
}

function setTheme(isDark) {
  applyTheme(isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}

themeToggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    setTheme(Boolean(toggle.checked));
  });
});

const savedTheme = localStorage.getItem(STORAGE_KEY);
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme === 'dark');
}
