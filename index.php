<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Мой первый PHP сайт</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            text-align: center;
            padding: 50px;
        }
        .box {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>

<div class="box">
    <h1>Привет!</h1>

    <?php
        $name = "Гость";
        echo "<p>Добро пожаловать, $name!</p>";
        echo "<p>Сегодня: " . date("d.m.Y") . "</p>";
    ?>

    <form method="POST">
        <input type="text" name="username" placeholder="Введите имя">
        <button type="submit">Отправить</button>
    </form>

    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["username"])) {
            $username = htmlspecialchars($_POST["username"]);
            echo "<p>Привет, $username 👋</p>";
        }
    ?>
</div>

</body>
</html>
