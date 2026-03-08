const themeToggles = document.querySelectorAll(
  '.theme-selector, #theme-toggle-mob, .checkbox'
);
const body = document.body;

function setTheme(isDark) {
  if (isDark) {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }

  themeToggles.forEach(toggle => {
    toggle.checked = isDark;
  });
}

themeToggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    setTheme(toggle.checked);
  });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme(true);
}
