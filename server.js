const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./bd.sqlite');
const session = require('express-session');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Для разработки, в production нужно true с HTTPS
}));

// Создание таблицы
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    pas TEXT
  )
`);

// Маршруты
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

// Регистрация
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run(
    'INSERT INTO users (name, pas) VALUES (?, ?)',
    [username, password],
    function(err) {
      if (err) {
        return res.status(400).send('Ошибка регистрации: имя занято');
      }
      // Сохраняем ID и имя нового пользователя в сессии
      req.session.userId = this.lastID;
      req.session.username = username;
      res.redirect('/');
    }
  );
});

// Авторизация
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    'SELECT id, name FROM users WHERE name = ? AND pas = ?',
    [username, password],
    (err, row) => {
      if (!row) {
        return res.status(401).send('Неверный логин или пароль');
      }
      // Сохраняем ID и имя пользователя в сессии
      req.session.userId = row.id;
      req.session.username = row.name;
      res.redirect('/');
    }
  );
});

// Добавьте обработчик выхода
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Обновите endpoint для получения информации о пользователе
app.get('/api/user', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Не авторизован' });
  }
  
  db.get('SELECT name FROM users WHERE id = ?', [req.session.userId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json({ username: row.name });
  });
});

// Добавьте middleware для проверки авторизации
app.use((req, res, next) => {
  const allowedPaths = ['/login', '/register', '/style.css', '/script.js'];
  
  if (!req.session.userId && !allowedPaths.includes(req.path)) {
    return res.redirect('/login');
  }
  next();
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));