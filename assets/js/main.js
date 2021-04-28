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


//Highlight urgent messages by red color and push them up in dom tree
function urgentIntoRed(){
    var arrOfStatus = $(".urgent-status");
    
    for (i = 0; i < arrOfStatus.length; i++){
        if(arrOfStatus[i].textContent === "yes"){
            $(arrOfStatus[i]).siblings(".card-header").css("color","red");
            let card = $(arrOfStatus[i]).parent();
            card.addClass("jq-urgent");
        }
    }
}

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
                        messageSent();
                    } else {
                        // Response BAD (SQL query wasn't executed)
                        messageNotSent();
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
                        messageSent();
                    } else {
                        // Response BAD (SQL query wasn't executed)
                        messageNotSent();
                    }
                },
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
    cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto").addClass("cardToDeleteClone");
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
            }
        });
});

/////////  \.DELETE FUNCTIONS ///////////////////

///////////// UPDATE FUNCTIONS ///////////////////

// Update message input field listener
$("#upload-bttn").click(function(){
    $("#updateRow").ready(function(){
        $("#unique_id").on("input", function(){
            console.log($("#unique_id").val());
            var cardId = $("#unique_id").val();
            var arrayli = $("li");
            for (i = 0; i < arrayli.length; i++){
                if($(arrayli[i]).attr("id") === cardId){
                    let k = $(arrayli[i]).text();
                    k = k.replace(/\s+/g, ' ');
                    let textArray = k.split(" ");
                    $("#urgent_upd").val(textArray[1]);
                    $("#select_upd").val(textArray[2]);
                    $("#vendor_upd").val(textArray[6]);
                    $("#pick_id_upd").val(textArray[9]);
                    $("#message_upd").val(textArray[10]);
                    console.log(textArray);
                }
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
                        messageSent();
                    } else {
                        // Response BAD (SQL query wasn't executed)
                        messageNotSent();
                    }
                },
        });
});

/////////  \.UPDATE FUNCTIONS ///////////////////


////// Div Show/ Hide functions for DELETE/ADD/UPDATE confirmation message

function messageSent(){
    // Hide "form" / show message sent div "OK"
    $("#delRowFromDbForm").css("display","none");
    $(".ok-div").css("display","block");
    
   //Hide message sent div "OK", show back "form", hide modal window -  within 1 sec                
   setTimeout(function() {
       $("#exampleModalDelete").modal("hide");
       $(".ok-div").css("display","none");
       $("#delRowFromDbForm").css("display","block");
   }, 1000);
}

function messageNotSent(){
   // Hide "form" / show message sent div "OK"
   $("#delRowFromDbForm").css("display","none");
   $(".not-ok-div").css("display","block");
   
   // Hide message sent div "OK", show back "form", hide modal window -  within 1 sec                
   setTimeout(function() {
       $("#exampleModalDelete").modal("hide");
       $(".not-ok-div").css("display","none");
       $("#delRowFromDbForm").css("display","block");
    }, 1000);
}