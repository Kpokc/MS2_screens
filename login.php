<?php
session_start(); // Starting Session
$error = ''; // Variable To Store Error Message
if (isset($_POST['submit'])) {

    // Define $username and $password
    $username = $_POST['username'];
    $password = $_POST['password'];
    $localHost = "f80b6byii2vwv8cx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com";
    // mysqli_connect() function opens a new connection to the MySQL server.
    $conn = mysqli_connect($localHost, $username, $password, "pick_test");
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
?>