<?php
session_start(); // Starting Session
$error = ''; // Variable To Store Error Message
if (isset($_POST['submit'])) {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        $error = "Username or Password is invalid";
    }
    else
    {
    // Define $username and $password
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // mysqli_connect() function opens a new connection to the MySQL server.
    $conn = mysqli_connect("localhost", $username, $password, "pick_test");
    // SQL query to fetch information of registerd users and finds user match.
    $query = "SELECT username, password FROM user WHERE username='$username' AND password='$password'";
    
        if(mysqli_query($conn, $query)){
        
            $_SESSION['login_user'] = $username;
            $_SESSION['login_pass'] = $password;
         
            header("location: screen.php");
            $conn->close();
        
        } else{

        header('Location: index.php?unsuccess=1');
        
        $conn->close();
        }
    }
}
?>