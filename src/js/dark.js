document.addEventListener('DOMContentLoaded', () => {
  const themeCheckbox = document.querySelector('.checkbox');
  const htmlElement = document.documentElement;

  // 1. Перевіряємо збережену тему або системні налаштування
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Встановлюємо початковий стан
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.setAttribute('data-theme', 'dark');
    themeCheckbox.checked = false; // У вашому CSS checked — це світла тема (background: --light)
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    themeCheckbox.checked = true;
  }

  // 2. Слухаємо зміни перемикача
  themeCheckbox.addEventListener('change', () => {
    if (themeCheckbox.checked) {
      // Стан checked у вашому коді фарбує слайдер у --light
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      // Стан unchecked залишає фон --dark
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
});
