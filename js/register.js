document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new URLSearchParams(new FormData(e.target));
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
    
    if (response.ok) {
      window.location.href = '/';
    } else {
      const error = await response.text();
      document.getElementById('message').textContent = error;
    }
  } catch (error) {
    document.getElementById('message').textContent = 'Ошибка соединения';
  }
});