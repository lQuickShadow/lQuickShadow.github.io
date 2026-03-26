document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new URLSearchParams(new FormData(e.target));
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
    if (response.ok) {
      window.location.href = '/';
    }
    const result = await response.text();
    document.getElementById('message').textContent = result;
  } catch (error) {
    document.getElementById('message').textContent = 'Ошибка соединения';
  }
});