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
           let card = $(arrOfStatus[i]).parent();
           card.css("box-shadow","red 0px 3px 10px 2px");
        }
    }
}