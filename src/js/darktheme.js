const toggle = document.getElementById('theme-toggle');

if (toggle) {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    root.classList.add('darkmode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;

    root.classList.toggle('darkmode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}