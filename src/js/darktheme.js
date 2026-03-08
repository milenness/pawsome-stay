
const toggle = document.getElementById('theme-toggle');

if (toggle) {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('darkmode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;

    document.body.classList.toggle('darkmode', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}