var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
timer();

function timer(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var sec = currentTime.getSeconds();
                
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (sec < 10){
        sec = "0" + sec;
    }
                
    var t_str = hours + ":" + minutes + ":" + sec + " ";
                
    document.getElementById('time_span').innerHTML = t_str;
        setTimeout(timer,1000);
}


$(document).ready(function(){
    //When document loaded call below function
    urgentIntoRed(glowSize(iconPosition(hideShowCardBody())));
    // Switch between warehouse and drivers sections plus focus and 'display none block' for one of the sections
    switchTablesButtons(switchTablesBtnOnReload(window.innerWidth));
});

// Reload page every 200 seconds. (to keep web browser session up)
setInterval(function(){
    $(".divToLoadInto").fadeOut(300).load(" .rowToReload").fadeIn(300, function(){
        urgentIntoRed(glowSize(iconPosition(hideShowCardBody($(".glow").innerWidth(0)))));
    });
},200000);

// On resize correct ".glow" width and height and hide card body
$( window ).resize(function(){
        glowSize(iconPosition(hideShowCardBody($(".glow").innerWidth(0))));
        // after each window resize flip arrow icon back to normal position
        $(".fa-caret-square-down").attr("id","closed").css("transform","rotateX(0deg)");
        // Switch between warehouse and drivers sections plus focus and 'display none block' for one of the sections
        switchTablesButtons(switchTablesBtnOnReload(window.innerWidth));
});

// Warn user if input length more than 15 characters
$("input").on("input", function(){
    // Get current text
    var prevText = $(this).prev().prev().text();
    var inputLength = $(this).val();
    if (inputLength.length > 15){
        // Do nothing if includes below text
        if(prevText.includes(" - 15 Characters maximum!")){
            
        } else {
        // Add text, add CSS style
        $(this).prev().prev().text(prevText + " - 15 Characters maximum!").css("color","red");
        $(this).css("color","red");
        }
    } else if (inputLength.length <= 15){
        // Return back text that was ther in first place
        prevText = $(this).prev().prev().text();
        $(this).prev().prev().text(prevText.substring(0,7)).css("color","black");
        $(this).css("color","black");
    }
});

//Highlight urgent messages by red color and push them up in dom tree
function urgentIntoRed(){
    var arrOfStatus = $(".urgent-status");
    
    for (i = 0; i < arrOfStatus.length; i++){
        if(arrOfStatus[i].textContent === "yes"){
            // add text neon effect
            $(arrOfStatus[i]).siblings(".card-header").addClass("glow-text");
            var card = $(arrOfStatus[i]).parent().addClass("borders-red");
            // add glowing effect
            $(arrOfStatus[i]).prev().css("display", "block");
            $(arrOfStatus[i]).prepend((arrOfStatus[5]));

            // move urgent to top of the tree
            var tableToMove = $(arrOfStatus[i]).parent(); //ul
            var whereToMove = tableToMove.parent();
            $(tableToMove).insertBefore($(whereToMove).children()[0]);
        }
    }

    // Hide and show card-body by clicking arrow
    $(".fa-caret-square-down").click(function(){
        if($(this).attr("id") == "closed"){
            //card-body show - 200mls delay
            $(this).parent().parent().parent().next().fadeIn(300);
            // Flip arrow by 180 deg
            $(this).attr("id","opened").css("transform","rotateX(180deg)");
        }
        else if($(this).attr("id") == "opened"){
            //card-body hide - 200mls delay
            $(this).parent().parent().parent().next().fadeOut(300);
            // Flip arrow back to 0 deg
            $(this).attr("id","closed").css("transform","rotateX(0deg)");
        }
    });

    // Show footer when user scrolled to the bottom of the page
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
            $("footer").css("height","35px");
        }
        else  {
            $("footer").css("height","0px");
        }
    });

     // Login (button)
     $(".loginBtn").submit(function(event){

        // Prevent Form to refresh page
        event.preventDefault();
        // Prevent From to double execution
        event.stopImmediatePropagation();
        
        // Get uniq_id from input field
        var formData = {
            username : $("#username").val(),
            password : $("password").val()
        };
            // send request to delete.php
            $.ajax({
                type: "POST",
                url: "login.php",
                data: formData,
                dataType: "json",
                encode: true,
                    // Get response from server
                    complete: function(response){
                        // Response OK (SQL query executed)
                        if(response.status == "200"){
                            window.location.replace("screen.php");
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            //reloadeMainSection(messageSent($(".cardToDeleteClone").remove(clean($("#pick_id_del").val("")))));
                        } else {
                            window.location.replace("index.php");
                            // Response BAD (SQL query wasn't executed)
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            //reloadeMainSection(messageNotSent($(".cardToDeleteClone").remove(clean($("#pick_id_del").val("")))));
                        }
                    },
            });
    });

    // Add message to DB
    $("#addRowToDbForm").submit(function(event){
        // Prevent form to refresh page
        event.preventDefault();
        // Prevent from double execution
        event.stopImmediatePropagation();
        // Get data from input fields
        var formData = {
            select: $("#select").val(),
            pick_id: $("#pick_id").val(),
            vendor: $("#vendor").val(),
            urgent: $("#urgent").val(),
            message: $("#message").val()
        };
            // send request to add.php
            $.ajax({
                type: "POST",
                url: "add.php",
                data: formData,
                dataType: "json",
                encode: true,
                    // Get response from server
                    complete: function(response){
                        // Response OK (SQL query executed)
                        if(response.status == "200"){
                            //Call back - first message then refresh
                            reloadeMainSection(messageSent());
                            $(".modal-form").fadeOut(200);
                            $("input").val("");
                            $("textarea").val("");
                        } else {
                            // Response BAD (SQL query wasn't executed)
                            //Call back - first message then refresh
                            reloadeMainSection(messageNotSent());
                        }
                    },
            });
    });


    ///////////// DELETE FUNCTIONS ///////////////////

    // Delete message from DB (button)
    $("#delRowFromDbForm").submit(function(event){

        // Prevent Form to refresh page
        event.preventDefault();
        // Prevent From to double execution
        event.stopImmediatePropagation();
        
        // Get uniq_id from input field
        var formData = {
            uniq_id : $("#pick_id_del").val()
        };
            // send request to delete.php
            $.ajax({
                type: "POST",
                url: "delete.php",
                data: formData,
                dataType: "json",
                encode: true,
                    // Get response from server
                    complete: function(response){
                        // Response OK (SQL query executed)
                        if(response.status == "200"){
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            reloadeMainSection(messageSent($(".cardToDeleteClone").remove(clean($("#pick_id_del").val("")))));
                        } else {
                            // Response BAD (SQL query wasn't executed)
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            reloadeMainSection(messageNotSent($(".cardToDeleteClone").remove(clean($("#pick_id_del").val("")))));
                        }
                    },
            });
    });

    // DELETE message input field listener (append message user wants to delete at the bottom of the delete form)
    $("#delRowFromDb").click(function(){
        $("#delRowFromDbForm").ready(function(){
            //input id field clear
            $("#pick_id_del").val("");

            $("#pick_id_del").on("input", function(){

                //remove div with the table
                $(".cardToDeleteClone").remove();

                // Get Uniq Id from input field
                var cardId = $("#pick_id_del").val();
                // Array of all "li" in DOM
                var arrayli = $("li");
                // Loop throughout all "li" looking for "id" to equals "cardId"
                for (i = 0; i < arrayli.length; i++){
                    if($(arrayli[i]).attr("id") === cardId){
                        // Clone message card
                        var cardToDelete = $(arrayli[i]).clone();
                        // Cloned card width depends on user screen
                        var cardClientWidth = $(arrayli[i]).innerWidth();
                        // Add css styling to clone and add a class to delete it later
                        cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto").addClass("cardToDeleteClone").css("box-shadow","0 3px 10px 5px #1a73e8").css("color","#f5f5f5");
                        // Add card to modal window
                        $("#exampleModalDelete").append(cardToDelete);
                    }
                }

                // Below EvenListener will check if DELETE function was aborted
                $("#exampleModalDelete").click(function(e){
                    // Get clicked target "id" value
                    var tr = e.target;
                    // If value equals any of "close" button or modal window it self
                        if($(tr).attr("id") === "exampleModalDelete" || $(tr).attr("id") === "closeBttn"){
                            //remove div with the table
                            $(".cardToDeleteClone").remove();
                            //input id field clear
                            $("#pick_id_del").val("");
                        }
                });
            });
        });
    });

    $("li").dblclick(function(){
        // bug removed JQ tried to delete "Youtube" button
        if($(this).attr("class") == "nav-item"){
            return false;
        }
        // Get card uniq id
        var cardId = $(this).attr("id");
        // Clone message card
        var cardToDelete = $(this).clone();
        // Cloned card width depends on user screen
        var cardClientWidth = $(this).innerWidth();
        // Add css styling to clone and add a class to delete it later
        cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto").addClass("cardToDeleteClone").css("box-shadow","0 3px 10px 5px #1a73e8").css("color","#f5f5f5");
        // Trigger DELETE button
        $("#delRowFromDb").trigger("click");
        // Insert uniq id into delete input field
        $("#delRowFromDbForm").ready(function(){
            $("#pick_id_del").val(cardId);
            // Add cloned message to modal window
            $("#exampleModalDelete").append(cardToDelete);
        });

        // Below EvenListener will check if DELETE function was aborted
        $("#exampleModalDelete").click(function(e){
            // Get clicked target "id" value
            var tr = e.target;
            // If value equals any of "close" button or modal window it self
                if($(tr).attr("id") === "exampleModalDelete" || $(tr).attr("id") === "closeBttn"){
                    //remove div with the table
                    $(".cardToDeleteClone").remove();
                    //input id field clear
                    $("#pick_id_del").val("");
                }
        });
    });

    /////////  \.DELETE FUNCTIONS ///////////////////

    ///////////// UPDATE FUNCTIONS ///////////////////

    // UPDATE message input field listener (append message user wants to update at the bottom of the delete form)
    $("#upload-bttn").click(function(){
        // Wait till form loads
        $("#updateRow").ready(function(){
            // Listen for digits
            $("#unique_id").on("input", function(){

                // clean all fields
                clean();

                // Get Uniq Id from input field
                var cardId = $("#unique_id").val();
                // Array of all "li" in DOM
                var arrayli = $("li");
                // Loop throughout all "li" looking for "id" to equals "cardId"
                for (i = 0; i < arrayli.length; i++){
                    if($(arrayli[i]).attr("id") === cardId){
                        // Get all text from "li"
                        var k = $(arrayli[i]).text();
                        // Replace all whitespace in string "k" with single space
                        k = k.replace(/\s+/g, ' ');
                        // Split "k" into array
                        var textArray = k.split(" ");
                        $("#urgent_upd").val(textArray[1]);
                        $("#select_upd").val(textArray[2]);
                        $("#vendor_upd").val(textArray[6]);
                        $("#pick_id_upd").val(textArray[9]);
                        $("#message_upd").val(textArray[10]);

                        // Clone message card
                        var cardToDelete = $(arrayli[i]).clone();
                        // Cloned card width depends on user screen
                        var cardClientWidth = $(arrayli[i]).innerWidth();
                        // Add css styling to clone and add a class to delete it later
                        cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto").addClass("cardToDeleteClone").css("box-shadow","0 3px 10px 5px #1a73e8").css("color","#f5f5f5");
                        // Add card to modal window
                        $("#exampleModalUpdate").append(cardToDelete);
                    }
                }
            });
            // If "input" field changed - change mark from "Current" to "Changed" 
            $("input").on("input", function(){
                // Bug removed - JQ was changing "Youtube" search button icon to "Changed" text if "Update" function was used before 
                if($(this).next().is(":button")){
                    return false;
                }
                $(this).next().css("color","red").text("Changed");
            });
            // If "select" field changed - change mark from "Current" to "Changed"
            $("select").on("change", function(){
                $(this).next().css("color","red").text("Changed");
            });
            // If "texarea" field changed - change mark from "Current" to "Changed"
            //https://www.codegrepper.com/c
            $('#message_upd').on('input propertychange paste', function() {
                $(this).prev().css("color","red").text("Changed");
            });

            // Listen if procedure was aborted 
            $("#exampleModalUpdate").click(function(e){
                // Get clicked target "id" value
                var tr = e.target;
                // If value equals any of "close" button or modal window it self
                    if($(tr).attr("id") === "exampleModalUpdate" || $(tr).attr("id") === "closeBttn" || $(tr).attr("class") === "btn-secondary"){
                        // clean unique id input field
                        $("#unique_id").val("");
                        // clean all fields
                        clean();
                    }
            });

        });
    });

    // Update message
    $("#updateRow").submit(function(event){

        // Prevent form to refresh page
        event.preventDefault();
        // Prevent from double execution
        event.stopImmediatePropagation();

        // Get data from input fields
        var formData = {
            uniq_id : $("#unique_id").val(),
            select: $("#select_upd").val(),
            pick_id: $("#pick_id_upd").val(),
            vendor: $("#vendor_upd").val(),
            urgent: $("#urgent_upd").val(),
            message: $("#message_upd").val()
        };
            // send request to update.php
            $.ajax({
                type: "POST",
                url: "update.php",
                data: formData,
                dataType: "json",
                encode: true,
                    // Get response from server
                    complete: function(response){
                        // Response OK (SQL query executed)
                        if(response.status == "200"){
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            reloadeMainSection(messageSent($(".cardToDeleteClone").remove(clean($("#unique_id").val("")))));
                        } else {
                            //Call back - 1. unique_id = "" 2.call function clean() 3. delete cloned card 4. call function messageSent 5.function reload main section
                            reloadeMainSection(messageNotSent($(".cardToDeleteClone").remove(clean($("#unique_id").val("")))));
                        }
                    },
            });
    });

    /////////  \.UPDATE FUNCTIONS ///////////////////
}

////// Div Show/ Hide / Reload functions for DELETE/ADD/UPDATE confirmation message

function messageSent(){
    // Hide "form" / show message sent div "ok-div"
    $(".modal-form").css("display","none");
    $(".ok-div").css("display","block");
    
   //Hide modal window -  within 1 sec                
   setTimeout(function() {
       $(".modal").modal("hide");
   }, 1000);
   
   // Hide "ok-div" / show "form"
   setTimeout(function() {
       $(".ok-div").css("display","none");
       $(".modal-form").css("display","block");
   }, 1500);
}

function messageNotSent(){
   // Hide "form" / show message sent div "not-ok-div"
   $(".modal-form").css("display","none");
   $(".not-ok-div").css("display","block");
   
   
   // Hide modal window -  within 1 sec                
   setTimeout(function() {
       $(".modal").modal("hide");
    }, 1000);
    
    // Hide "not-ok-div", show back "form"
    setTimeout(function() {
       $(".not-ok-div").css("display","none");
       $(".modal-form").css("display","block");
   }, 1500);
}

// Clear "UPDATE" modal window and FORM
function clean(){
    // Remove "appended" card from modal bottom
    $(".cardToDeleteClone").remove();
    // All "Changed" marks back to "Current" 
    $("aside").css("color","black").text("Current");
    
    // Empty all fields 
    $("#urgent_upd").val("");
    $("#select_upd").val("");
    $("#vendor_upd").val("");
    $("#pick_id_upd").val("");
    $("#message_upd").val("");
}

// reload main section
function reloadeMainSection(){
    $('.divToLoadInto').fadeOut(300).load(' .rowToReload').fadeIn(300, function(){
        urgentIntoRed(glowSize(iconPosition(hideShowCardBody())));
    });
}

// Urgent red glowing effect
function glowSize(){
    // select any top card to get current width
    var card = $("li")[5];
    // ".glow" div width equals ".card" 
    $(".glow").innerWidth(($(card).innerWidth())).innerHeight(($(card).innerHeight()));
}

// If screen size lower than 415 hide card message body
function hideShowCardBody(){
    if(window.innerWidth < 415){
        $(".card-body").hide();
        $(".card-header").css("border-bottom", "none");
    } if (window.innerWidth > 415) {
        $(".card-body").show();
        $(".card-header").css("border-bottom", "1px solid #dedede");
    }
}

// Place arrow at correct distance from left side
function iconPosition(){
    if(window.innerWidth < 415){
        // get current width on the screen 
    var cardWidth = $(".card-header").innerWidth();
    // 47px average icon + padding + margin attributes
    var coordinates = cardWidth - 60;
    // add position to icon
    $(".fa-caret-square-down").css("left",coordinates);
    // UID coordinates
    var coordinates2 = (cardWidth/2) -30;
    $(".uid-number").css("left",coordinates2);
    }
    if(window.innerWidth > 415){
        $(".fa-caret-square-down").css("left","210px");
        $(".uid-number").css("left","210px");
    }
}

// witch between warehouse and drivers sections buttons
function switchTablesButtons(){
    $(".switch").click(function(){
        if($(this).attr("id") == "warehouse"){
            $(".sectionOne").css("display","block");
            $(".sectionTwo").css("display","none");
        }
        if($(this).attr("id") == "drivers"){
            $(".sectionOne").css("display","none");
            $(".sectionTwo").css("display","block");
        }
    });
}

function switchTablesBtnOnReload(e){
    if (e < 1199){
        $("#warehouse").focus();
        $(".sectionOne").css("display","block");
        $(".sectionTwo").css("display","none");
    }
    if (e > 1199){
        $(".sectionOne").css("display","block");
        $(".sectionTwo").css("display","block");
    }
}

// Youtube slide up to down
$("#youtubBtn").click(function(){
    $("#youtube-window").slideToggle(200);
});

////// YOUTUBE API ///////

// page token
var prevOrNextClicked = "";

function loadClient() {
    
    gapi.client.setApiKey("AIzaSyA7Vvjwmyq18LBM1uW-yns8Lsey1whsWGc");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); execute();},
        function(err) { console.error("Error loading GAPI client for API", err); }
    );
}
    // Make sure the client is loaded and sign-in is complete before calling this method.

function execute() {

    return gapi.client.youtube.search.list({
        "channelType": "any",
        "maxResults": 10,
        "q": $("#search").val(),// search field
        "order": "rating",
        "pageToken": prevOrNextClicked
    })
        .then(function(response) {
            // remove previous search
            $(".iframeToDelete").remove();
            // Handle the results here (response.result has the parsed body).
            var data = response.result.items;
            data.forEach(function(element){
            // add fetch result to HTML
            document.getElementById("results").innerHTML += "<iframe class='iframeToDelete' width='560' height='315' src='https://www.youtube.com/embed/"+element.id.videoId+"' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
            if(response.result.prevPageToken){
                $(".prev-btn").attr("id", response.result.prevPageToken); // 'prev' page token to button
                $(".prev-btn").attr("disabled", false); // un disable button
            }
            else
            {
                $(".prev-btn").attr("disabled", true); // disable button
            }
            if(response.result.nextPageToken){
                $(".next-btn").attr("id", response.result.nextPageToken); // 'next' page token to button
                $(".next-btn").attr("disabled", false); // un disable button
            }
            else
            {
                $(".next-btn").attr("disabled", true); // disable button
            }
            if(response.result.nextPageToken && response.result.prevPageToken){
                $(".prev-btn").attr("id", response.result.prevPageToken); // 'prev' page token to button
                $(".prev-btn").attr("disabled", false); // un disable button
                $(".next-btn").attr("id", response.result.nextPageToken); // 'next' page token to button
                $(".next-btn").attr("disabled", false); // un disable button
            }
            
        });
        },
            function(err) { console.error("Execute error", err); });
}
    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "146989147364-adogf5q7pois44g8qsau66p5o3g1j874.apps.googleusercontent.com"});
    });

// on click pass "id" value to page "token" 
$(".switch-btn").click(function(){
        // if id has some value
        if($(this).attr("id") != ""){
            prevOrNextClicked = $(this).attr("id");
            // call search function within page token
            loadClient();
        }
        else 
        {
            prevOrNextClicked = "";
        }
});
