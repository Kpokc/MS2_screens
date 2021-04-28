<?php
include('login.php');

// Forward to "Log In" page if session error
if(!isset($_SESSION['login_user']) or !isset($_SESSION['login_pass']))
{
    header("location: index.php"); 
}
else {
    //DB variables
    $hostname = "localhost";
    $username = $_SESSION['login_user'];
    $password = $_SESSION['login_pass'];
    $dbname="pick_test";
    $pick_id = $_POST["pick_id"];
    
    //Connect To Database
    mysqli_connect($hostname,$username, $password) or die ("<html><script language='JavaScript'>alert('Unable to connect to database! Please try again later.')</script></html>");

    // Connection query
    $conn = new mysqli($hostname, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $date = date("Y/m/d");
    $time = date("h:i:s");
    $pick_id = $_POST["pick_id"];
    $job = $_POST["select"];
    $urg_status = $_POST["urgent"];
    $vendor = $_POST["vendor"];
    $message = $_POST["message"];
    
        
    $sql = "INSERT INTO message (date, time, pick_id, job, urgent, vendor, msg) VALUES ('$date', '$time', '$pick_id', '$job', '$urg_status', '$vendor', '$message')";
     
    if(mysqli_query($conn, $sql)){
        $conn->close();
        // Server response to positive
        var_dump(http_response_code(200));
     } else{
        $conn->close();
        // Update server response to Error
        var_dump(http_response_code(400));
     }
}
?>