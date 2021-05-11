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
    
    //Connect To Database
    mysqli_connect($hostname,$username, $password) or die ("<html><script language='JavaScript'>alert('Unable to connect to database! Please try again later.')</script></html>");

    // Connection query
    $conn = new mysqli($hostname, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $unique_id = $_POST["uniq_id"];
    $pick_id = $_POST["pick_id"];
    $job = $_POST["select"];
    $urg_status = $_POST["urgent"];
    $vendor = $_POST["vendor"];
    $message = $_POST["message"];
    
    
    $sqlCheck = "SELECT u_id FROM message WHERE u_id = $unique_id";
    $result = $conn->query($sqlCheck);

    if ($result->num_rows > 0){
        // Main query
        $sql = "UPDATE message 
            SET pick_id = '$pick_id', job = '$job', urgent = '$urg_status', vendor = '$vendor', msg = '$message'
            WHERE u_id = '$unique_id'";
        mysqli_query($conn, $sql);
        $conn->close();
        // Update server response to positive
        var_dump(http_response_code(200));
    } else{
        // Update server response to Error
        var_dump(http_response_code(400));
        $conn->close();
    }

    if(mysqli_query($conn, $sql)){
        $conn->close();
        // Update server response to positive
        var_dump(http_response_code(200));
     } else{
        $conn->close();
        // Update server response to Error
        var_dump(http_response_code(400));
     }
}
?>