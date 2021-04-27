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

    var formData = {
        select: $("#select").val(),
        pick_id: $("#pick_id").val(),
        vendor: $("#vendor").val(),
        urgent: $("#urgent").val(),
        message: $("#message").val()
    };
        $.ajax({
            type: "POST",
            url: "add.php",
            data: formData,
            dataType: "json",
            encode: true,
                complete: function(response){
                    if(response.status == "200"){
                        console.log(response.status + " OK");
                    } else {
                        console.log(response.status + " Some error");   
                    }
                },
        });
});


// Delete message from DB
$("#delRowFromDbForm").submit(function(event){

    // Prevent form to refresh page
    event.preventDefault();
    // Prevent from double execution
    event.stopImmediatePropagation();
    
    // Get uniq_id from input field 
    var formData = {
        uniq_id : $("#pick_id_del").val()
    };
        $.ajax({
            type: "POST",
            url: "delete.php",
            data: formData,
            dataType: "json",
            encode: true,
                complete: function(response){
                    if(response.status == "200"){
                        console.log(response.status + " OK");
                    } else {
                        console.log(response.status + " Some error");   
                    }
                },
        });
});

$("li").dblclick(function(){
    // Get card uniq id
    var cardId = $(this).attr("id");

    var cardToDelete = $(this).clone();
    var cardClientWidth = $(this).innerWidth();
    cardToDelete.innerWidth(cardClientWidth).css("margin","0 auto");
    // Trigger DELETE button
    $("#delRowFromDb").trigger("click");
    // Insert uniq id into delete input field
    $("#delRowFromDbForm").ready(function(){
        $("#pick_id_del").val(cardId);
        $("#exampleModalDelete").append(cardToDelete);
    });

    
});

// Update message
$("#updateRow").submit(function(event){

    // Prevent form to refresh page
    event.preventDefault();
    // Prevent from double execution
    event.stopImmediatePropagation();

    var formData = {
        uniq_id : $("#unique_id").val(),
        select: $("#select_upd").val(),
        pick_id: $("#pick_id_upd").val(),
        vendor: $("#vendor_upd").val(),
        urgent: $("#urgent_upd").val(),
        message: $("#message_upd").val()
    };
        $.ajax({
            type: "POST",
            url: "update.php",
            data: formData,
            dataType: "json",
            encode: true,
                complete: function(response){
                    if(response.status == "200"){
                        console.log(response.status + " OK");
                    } else {
                        console.log(response.status + " Some error");   
                    }
                },
        });
});