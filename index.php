<?php

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    $_SESSION['username'];
    $_SESSION['password'];  
};

if ( isset($_GET['unsuccess']) && $_GET['unsuccess'] == 1 )
{
    echo '<script>alert("Incorrect Username or Password!")</script>';
};

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Warehouse messenger and communication website">
    <meta name="keywords" content="N/A">
    <meta name="author" content="Pavel Makarov">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="assets/css/index-style.css">
    <title>SSL/RHENUS</title>
</head>
<body>
    <div class="container">
        <div class="login-logo">
            <i class="fas fa-key"></i>
        </div>
            <form action="login.php" method="POST" id="loginForm">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" maxlength="20" required>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
                <input type="submit" name="submit" id="submit" class="loginBtn" value="Log In" maxlength="20" required>
            </form>
    </div>
</body>
</html>