<?php

$hostname = "localhost";
$username = $user;
$password = $password;
$dbname = "pick_test";

mysqli_connect($hostname,$username,$password) or die ("<script>alert('Unable to connect')</script>");
mysqli_select_db($dbname);

$conn = new mysqli($hostname, $username, $password, $dbname);

    if ($conn->connect_error){
        die ("<script>alert('Connection failed')</script>");
    }


    $sql = "SELECT * FROM message";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            echo "<li class='msg-card'>
                    <div class='card-header'>
                        <div class='card-header-inner'>
                            <h4>".$row["job"]." : UD</h4>
                        </div>
                        <div class='card-header-inner'>
                            <h4>".$row["u_id"]."</h4>
                        </div>
                    </div>
                    <div class='card-body'>
                        <div class='body-section-left'>
                            <div class='card-body-vendor'>
                                MEDTRONIC
                            </div>
                            <div class='card-body-inner'>
                                ".$row["time"]."
                            </div>
                            <div class='card-body-inner'>
                                ID: ".$row["pick_id"]." 
                            </div>
                        </div>
                        <div class='body-section-right'>
                            <div class='messege'>
                                ".$row["msg"]."
                            </div>
                        </div>
                    </div>
                </li>";
        }
    };

?>