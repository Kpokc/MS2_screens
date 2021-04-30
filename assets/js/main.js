var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
timer();

function timer(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var sec = currentTime.getSeconds()
                
    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (sec < 10){
        sec = "0" + sec
    }
                
    var t_str = hours + ":" + minutes + ":" + sec + " ";
    if(hours > 11){
        t_str;
    } else {
        t_str;
    }
                
    document.getElementById('time_span').innerHTML = t_str;
        setTimeout(timer,1000);
}


$(document).ready(function(){
    //When document loaded call below function
    urgentIntoRed();

});

// Reload page every 200 seconds. (to keep web browser session up)
setInterval(function(){
    $(".divToLoadInto").fadeOut(300).load(" .rowToReload").fadeIn(300, function(){
        urgentIntoRed();
    })
},200000);


//Highlight urgent messages by red color and push them up in dom tree
function urgentIntoRed(){
    var arrOfStatus = $(".urgent-status");
    
    for (i = 0; i < arrOfStatus.length; i++){
        if(arrOfStatus[i].textContent === "yes"){
            // add text neon effect
            $(arrOfStatus[i]).siblings(".card-header").addClass("glow-text");
            let card = $(arrOfStatus[i]).parent().addClass("borders-red");
            // add glowing effect
            $(arrOfStatus[i]).prev().css("display", "block");
            $(arrOfStatus[i]).prepend((arrOfStatus[5]));

            // move urgent to top of the tree
            let tableToMove = $(arrOfStatus[i]).parent(); //ul
            let whereToMove = tableToMove.parent();
            $(tableToMove).insertBefore($(whereToMove).children()[0]);
        }
    }

    // On resize correct ".glow" width and height 
    $( window ).resize(function(){
        // any top card
        let card = $("li")[5];
        // ".glow" div width equals ".card" 
        $(".glow").innerWidth(($(card).innerWidth())).innerHeight(($(card).innerHeight()));
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
                    let tr = e.target;
                    // If value equals any of "close" button or modal window it self
                        if($(tr).attr("id") === "exampleModalDelete" || $(tr).attr("id") === "closeBttn"){
                            //remove div with the table
                            $(".cardToDeleteClone").remove();
                            //input id field clear
                            $("#pick_id_del").val("")
                        }
                });
            });
        });
    });

    $("li").dblclick(function(){
        // Get card uniq id
        var cardId = $(this).attr("id");
        // Clone message card
        var cardToDelete = $(this).clone();
        // Cloned card width depends on user screen
        var cardClientWidth = $(this).innerWidth();
        // Add css styling to clone and add a class to delete it later
        cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto").addClass("cardToDeleteClone").css("box-shadow","0 3px 10px 5px #1a73e8").css("color","#f5f5f5");;
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
            let tr = e.target;
            // If value equals any of "close" button or modal window it self
                if($(tr).attr("id") === "exampleModalDelete" || $(tr).attr("id") === "closeBttn"){
                    //remove div with the table
                    $(".cardToDeleteClone").remove();
                    //input id field clear
                    $("#pick_id_del").val("")
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
                        let k = $(arrayli[i]).text();
                        // Replace all whitespace in string "k" with single space
                        k = k.replace(/\s+/g, ' ');
                        // Split "k" into array
                        let textArray = k.split(" ");
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
                let tr = e.target;
                // If value equals any of "close" button or modal window it self
                    if($(tr).attr("id") === "exampleModalUpdate" || $(tr).attr("id") === "closeBttn"){
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

function reloadeMainSection(){
    $('.divToLoadInto').fadeOut(300).load(' .rowToReload').fadeIn(300, function(){
        urgentIntoRed();
    });
}