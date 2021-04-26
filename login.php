<?php
session_start(); // Starting Session
$error = ''; // Variable To Store Error Message
if (isset($_POST['submit'])) {
if (empty($_POST['username']) || empty($_POST['password'])) {
$error = "Username or Password is invalid";
}
else{
// Define $username and $password
$username = $_POST['username'];
$password = $_POST['password'];

// mysqli_connect() function opens a new connection to the MySQL server.
$conn = mysqli_connect("localhost", $username, $password, "pick_test");
// SQL query to fetch information of registerd users and finds user match.
$query = "SELECT username, password FROM user WHERE username='$username' AND password='$password'";
// To protect MySQL injection for Security purpose
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$stmt->bind_result($username, $password);
$stmt->store_result();
if($stmt->fetch()) //fetching the contents of the row {
$_SESSION['login_user'] = $username; // Initializing Session
$_SESSION['login_pass'] = $password;
header("location: screen.php"); // Redirecting To Screen Page
}
mysqli_close($conn); // Closing Connection
}
?>