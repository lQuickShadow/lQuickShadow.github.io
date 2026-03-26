document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/user');
    if (response.ok) {
      const data = await response.json();
      document.getElementById('username').textContent = data.username;
    } else {
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    window.location.href = '/login';
  }

  // Обработка выхода
  document.getElementById('logout').addEventListener('click', async () => {
    try {
      await fetch('/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки меню
    const menuButtons = document.querySelectorAll('.but_menu');
    
    // Добавляем обработчики клика для каждой кнопки
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Определяем страницу для перехода на основе текста кнопки
            let page;
            switch(button.textContent.trim()) {
                case 'Квесты':
                    page = 'quests.html';
                    break;
                case 'Карты':
                    page = 'maps.html';
                    break;
                case 'Оружие':
                    page = 'guns.html';
                    break;
                case 'Патроны':
                    page = 'ammo.html';
                    break;
                case 'Ключи':
                    page = 'keys.html';
                    break;
                default:
                    page = 'index.html';
            }
            
            // Переходим на выбранную страницу
            window.location.href = page;
        });
    });
    
    // Подсветка активной кнопки меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menuButtons.forEach(button => {
        const page = button.textContent.trim();
        if (
            (currentPage === 'index.html' && page === 'Главная') ||
            (currentPage === 'quests.html' && page === 'Квесты') ||
            (currentPage === 'maps.html' && page === 'Карты') ||
            (currentPage === 'guns.html' && page === 'Оружие') ||
            (currentPage === 'ammo.html' && page === 'Патроны') ||
            (currentPage === 'keys.html' && page === 'Ключи')
        ) {
            button.classList.add('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo_png');
    if (logo) {
        logo.style.cursor = 'pointer'; // Меняем курсор на указатель
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});