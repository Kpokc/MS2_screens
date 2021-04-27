<?php
include('login.php');

// Forward to "Log In" page if session error
if(!isset($_SESSION['login_user']) or !isset($_SESSION['login_pass']))
{
    header("location: index.php"); 
}
else {
    
    //Retrieve only Picks and Receipts
    function callPicksReceipts(){
	            
                //DB variables
            	$hostname="localhost";
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

                //SQL query
                $sql = "SELECT * FROM message 
                        WHERE job = 'pick'
                        OR job = 'receipt'
                        ORDER BY u_id ASC";
                // Retrieved result
                $result = $conn->query($sql);
        
                
                // Output Data of Each Row if any exists
                if ($result->num_rows > 0) {
                  while($row = $result->fetch_assoc()) {
                    // Insert data to <li> card
                    echo "<li class='msg-card'>
                            <div class='urgent-status'>".$row["urgent"]."</div>
                            <div class='card-header'>
                                <div class='card-header-inner'>
                                    <h4>".$row["job"]." : UID</h4>
                                </div>
                                <div class='card-header-inner'>
                                    <h4>(".$row["u_id"].")</h4>
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
                    // Return zero div if DB table is empty
                    echo "<div class='zeroResult'><h4>0 results</h4></div>";
                }
                // Close Connection
                $conn->close();
            
    }
    
    //Retrieve only Deliveries/Collections/Transfers
    function callDeliveryCollection(){

                //DB variables
            	$hostname="localhost";
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

                //SQL query
                $sql = "SELECT * FROM message 
                        WHERE job = 'delivery'
                        OR job = 'collection'
                        OR job = 'transfer'
                        ORDER BY u_id ASC";
                // Retrieved result
                $result = $conn->query($sql);
                
                // Output Data of Each Row if any exists
                if ($result->num_rows > 0) {
                  while($row = $result->fetch_assoc()) {
                    echo "<li class='msg-card'>
                            <div class='urgent-status'>".$row["urgent"]."</div>
                            <div class='card-header'>
                                <div class='card-header-inner'>
                                    <h4>".$row["job"]." : UID</h4>
                                </div>
                                <div class='card-header-inner'>
                                    <h4>(".$row["u_id"].")</h4>
                                </div>
                            </div>

                            <div class='card-body'>
                                <div class='body-section-left'>
                                    <div class='.card-body-inner'>
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
                    // Return zero div if DB table is empty
                    echo "<div class='zeroResult'><h4>0 results</h4></div>";
                }
                // Close Connection
                $conn->close();
            
    }
}
?>