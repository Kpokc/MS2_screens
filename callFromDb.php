<?php
include('login.php');
if(!isset($_SESSION['login_user']))
{
    header("location: index.php"); // Redirecting To Home Page
}
else {
    
    
    
    function callPicksReceipts($user, $pass){
	            
            	$hostname="localhost";
            	$username=$user;
            	$password=$pass;
            	$dbname="pick_test";
            	$usertable="message";

	            //Connect To Database
            	mysqli_connect($hostname,$username, $password) or die ("<html><script language='JavaScript'>alert('Unable to connect to database! Please try again later.')</script></html>");
            	mysqli_select_db($dbname);
	
            	// Check If Record Exists
            	$conn = new mysqli($hostname, $username, $password, $dbname);
                    // Check connection
                    if ($conn->connect_error) {
                      die("Connection failed: " . $conn->connect_error);
                    }

                $sql = "SELECT * FROM message 
                        WHERE job = 'pick'
                        OR job = 'receipt'
                        ORDER BY u_id ASC";
                    $result = $conn->query($sql);
        
                
                if ($result->num_rows > 0) {
                  // Output Data of Each Row
                  while($row = $result->fetch_assoc()) {
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
                                        ".$row["vendor"]."
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
                } else {
                  echo "<div class='zeroResult'><h3>0 results</h3></div>";
                }
                $conn->close();
                
                return $html;
            
    }
    
    function callDeliveryCollection($user, $pass){
         
            	$hostname="localhost";
            	$username=$user;
            	$password=$pass;
            	$dbname="pick_test";
            	$usertable="message";

	            //Connect To Database
            	mysqli_connect($hostname,$username, $password) or die ("<html><script language='JavaScript'>alert('Unable to connect to database! Please try again later.')</script></html>");
            	mysqli_select_db($dbname);
	
            	// Check If Record Exists
            	$conn = new mysqli($hostname, $username, $password, $dbname);
                    // Check connection
                    if ($conn->connect_error) {
                      die("Connection failed: " . $conn->connect_error);
                    }

                $sql = "SELECT * FROM message 
                        WHERE job = 'delivery'
                        OR job = 'collection'
                        OR job = 'transfer'
                        ORDER BY id ASC";
                    $result = $conn->query($sql);
        
                if ($result->num_rows > 0) {
                  // Output Data of Each Row
                  while($row = $result->fetch_assoc()) {
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
                                        ".$row["vendor"]."
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
                } else {
                  echo "<div class='zeroResult'><h3>0 results</h3></div>";
                }
                $conn->close();
                
                return $html;
            
    }
}
?>