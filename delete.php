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

    // Uniq ID number POST from form 
    $pick_id = $_POST["uniq_id"];
    
    // If below statement succeed then main query will executes
    $sql = "SELECT u_id FROM message WHERE u_id = $pick_id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        // Main query
        $sql = "DELETE FROM message WHERE u_id = $pick_id";
        mysqli_query($conn, $sql);
        $conn->close();
        // Update server response to positive
        var_dump(http_response_code(200));
    } else{
         // Update server response to Error
        var_dump(http_response_code(400));
        $conn->close();
    }
}
?>