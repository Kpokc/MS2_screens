<?php
//retrieve from db
include('callFromDb.php');
//if username and password empty redirect to index.php 
if(!isset($_SESSION['login_user']) and !isset($_SESSION['login_pass']))
{
    header("location: index.php");
}
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
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="assets/css/screen-style.css">
    <script src="https://apis.google.com/js/api.js"></script>
    <title>SSL/RHENUS</title>
</head>
<body>
    <div class="container-fluid contFluid">
        <header class="row sticky-top">
            <div class="col-12">
                <h2 id="time_span">Time</h2>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="burger-menu">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <!-- Button trigger ADD modal -->
                                    <button type="button" class="btn btn-primary top-menu-bttn" data-bs-toggle="modal"
                                        data-bs-target="#exampleModalAdd" id="addRowToDb">
                                        ADD
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <!-- Button trigger DELETE modal -->
                                    <button type="button" class="btn btn-primary top-menu-bttn" data-bs-toggle="modal"
                                        data-bs-target="#exampleModalDelete" id="delRowFromDb">
                                        DELETE
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <!--Button trigger UPDATE modal -->
                                    <button type="button" class="btn btn-primary top-menu-bttn" data-bs-toggle="modal"
                                        data-bs-target="#exampleModalUpdate" id="upload-bttn">
                                        UPDATE
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <!-- Button trigger LOGOUT modal -->
                                    <button type="button" class="btn btn-primary top-menu-bttn" data-bs-toggle="modal"
                                        data-bs-target="#exampleModalLogout">
                                        LOG OUT
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <!--Button trigger YOUTUBE modal -->
                                    <button type="button" class="btn btn-primary top-menu-bttn" id="youtubBtn">
                                        YOUTUBE
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        
        <section id="youtube-window" class="row screen" style="display: none">
            <div class="yt-header">
                <div class="yt-search">
                    <h1>YOUTUBE</h1>
                    <input type="text" name="search" id="search" />
                    <button onclick="loadClient()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="yt-main">
                <div class="yt-board">
                    <h2 style="display: none">YouTube results are here</h2>
                    <div id="results">

                        <!--Youtube frames here-->
                  
                    </div>
                    <div class="ytbuttons">
                        <button class="switch-btn prev-btn" disabled>Previous</button>
                        <button class="switch-btn next-btn" disabled>Next</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Switch between warehouse and drivers sections buttons. -->
        <div class="switchTablesButtons">
            <button class="switch" id="warehouse">WAREHOUSE</button>
            <button class="switch" id="drivers">DRIVRES</button>
        </div>

        <main class="row divToLoadInto">
            <div class="col-xxl-6 col-xl-6 col-12 rowToReload sectionOne">
                <!--Returns Picks/Receipts tables-->
                <ul style="padding-left:1rem; padding-right:1rem;">
                    <?php
                        callPicksReceipts();
                    ?>
                </ul>
            </div>
            <div class="col-xxl-6 col-xl-6 col-12 rowToReload sectionTwo">
                <ul style="padding-left:1rem; padding-right:1rem;">
                    <?php
                        callDeliveryCollection();
                    ?>
                </ul>
            </div>
        </main>
        <footer class="row">
            <div class="col-12">
                <h6 class="copyrights">Copyrights@ 2021 sslirl.com</h6>
                <h6 class="company">SSL / RHENUS</h6>
            </div>
        </footer>
    </div>

    <!-- Modal ADD FORM-->
    <div class="modal fade" id="exampleModalAdd" tabindex="-1" aria-labelledby="exampleModalLabelAdd" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelAdd">
                        ADD NEW MESSAGE
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!--Hidden div message sent - response from server OK-->
                    <div class='modal-body ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class='far fa-thumbs-up'></i>
                            <span class="message-sent-text">
                                MESSAGE SENT!
                            </span>
                        </p>
                    </div>
                    <!--Hidden div message not sent - response from server ERROR-->
                    <div class='modal-body not-ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class="fas fa-times"></i>
                            <span class="message-sent-text">
                                SOMETHING WENT WRONG!
                            </span>
                        </p>
                    </div>
                    <form action="add.php" method="POST" id="addRowToDbForm" class="modal-form">
                        <label for="select">Select:</label>
                        <select class="top-select" id="select" name="select">
                            <option value="pick">Pick</option>
                            <option value="receipt">Receipt</option>
                            <option value="delivery">Delivery</option>
                            <option value="collection">Collection</option>
                            <option value="transfer">Transfer</option>
                        </select><br><br>

                        <label for="pick_id">Job ID:</label><br>
                        <input type="number" name="pick_id" id="pick_id" class="inp1" required><br><br>
                        <label for="vendor">Vendor:</label><br>
                        <input type="text" name="vendor" id="vendor" class="inp2" required><br><br>
                        <label for="urgent">Urgent Status:</label>
                        <select class="bottom-select" id="urgent" name="urgent">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select><br><br>

                        <label for="message">Message:</label><br>
                        <textarea name="message" id="message" rows="4" cols="50" required></textarea><br>
                        <hr>
                        <button type="button" class="btn btn-secondary button-in-modal" data-bs-dismiss="modal">CLOSE</button>
                        <button type="submit" class="btn btn-primary button-in-modal">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- \.Modal ADD FORM -->

    <!-- Modal DELETE FORM-->
    <div class="modal fade" id="exampleModalDelete" tabindex="-1" aria-labelledby="exampleModalLabelDelete"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelDelete">
                        DELETE MESSAGE
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!--Hidden div message sent - response from server OK-->
                    <div class='modal-body ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class='far fa-thumbs-up'></i>
                            <span class="message-sent-text">
                                MESSAGE DELETED!
                            </span>
                        </p>
                    </div>
                    <!--Hidden div message not sent - response from server ERROR-->
                    <div class='modal-body not-ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class="fas fa-times"></i>
                            <span class="message-sent-text">
                                SOMETHING WENT WRONG!
                            </span>
                        </p>
                    </div>
                    <form action="delete.php" method="POST" id="delRowFromDbForm" class="modal-form">
                        <label for="pick_id_del">UID Nr:</label><br>
                        <input type="number" name="pick_id" id="pick_id_del" class="inp3" required><br>
                        <hr>
                        <button type="button" class="btn btn-secondary button-in-modal"data-bs-dismiss="modal">CLOSE</button>
                        <button type="submit" class="btn btn-primary button-in-modal" id="deleteRow">DELETE</button>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <!-- \.Modal DELETE FORM -->

    <!-- Modal UPDATE FORM-->
    <div class="modal fade" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabelUpdate"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelUpdate">
                        UPDATE MESSAGE
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeBttn"></button>
                </div>
                <div class="modal-body">
                    <!--Hidden div message sent - response from server OK-->
                    <div class='modal-body ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class='far fa-thumbs-up'></i>
                            <span class="message-sent-text">
                                MESSAGE UPDATED!
                            </span>
                        </p>
                    </div>
                    <!--Hidden div message not sent - response from server ERROR-->
                    <div class='modal-body not-ok-div' style='padding: 5rem; display:none;'>
                        <p>
                            <i class="fas fa-times"></i>
                            <span class="message-sent-text">
                                SOMETHING WENT WRONG!
                            </span>
                        </p>
                    </div>
                    <form action="update.php" method="POST" id="updateRow" class="modal-form">
                        <label for="unique_id">UID Nr:</label><br>
                        <input type="number" name="unique_id" id="unique_id" class="inp3" required>
                        <br><br>
                        <label for="select">Select:</label>
                        <select class="top-select" id="select_upd" name="select">
                            <option value="pick">Pick</option>
                            <option value="receipt">Receipt</option>
                            <option value="delivery">Delivery</option>
                            <option value="collection">Collection</option>
                            <option value="transfer">Transfer</option>
                        </select>
                        <aside class="current-data-1">Current</aside>
                        <br><br>

                        <label for="pick_id">Job ID:</label><br>
                        <input type="number" name="pick_id" id="pick_id_upd" class="inp1" required>
                        <aside class="current-data-2">Current</aside>
                        <br><br>
                        <label for="vendor">Vendor:</label><br>
                        <input type="text" name="vendor" id="vendor_upd" class="inp2" required>
                        <aside class="current-data-3">Current</aside>
                        <br><br>
                        <label for="urgent">Urgent Status:</label>
                        <select class="bottom-select" id="urgent_upd" name="urgent">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                        <aside class="current-data-4">Current</aside>
                        <br><br>

                        <label for="message">Message:</label><br>
                        <aside class="current-data-5">Current</aside>
                        <textarea name="message" id="message_upd" rows="4" cols="50"></textarea><br>
                        <hr>
                        <button type="button" class="btn btn-secondary button-in-modal" data-bs-dismiss="modal">CLOSE</button>
                        <button type="submit" class="btn btn-primary button-in-modal" id="addRow">UPDATE</button>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <!-- \.Modal UPDATE FORM -->

    <!-- Modal LOGOUT FORM-->
    <div class="modal fade" id="exampleModalLogout" tabindex="-1" aria-labelledby="exampleModalLabelLogout"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelLogout">
                        LOGOUT
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="logout.php" method="POST">
                        <p style="text-align: center;">
                            ARE YOU SURE YOU WANT TO LOG OUT?
                        </p>
                        <button type="button" class="btn btn-secondary button-in-modal" data-bs-dismiss="modal">CLOSE</button>
                        <button type="submit" class="btn btn-primary button-in-modal">LOGOUT</button>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <!-- \.Modal LOGOUT FORM -->

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="assets/bootstrap/js/bootstrap.bundle.js"></script>
    <script src="assets/js/main.js"></script>
    
    <!--Passive event listeners-->
    <script>
        jQuery.event.special.touchstart = {
          setup: function( _, ns, handle ) {
              this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
          }
        };
    </script>
    
</body>

</html>