//import {Timer} from './timer.js'
/**
 * starts count down timer when button is clicked
 * switches to a end session button when clicked on
 * switches back to start button when clicked on again
 */

 let startBtnElement = document.getElementById("startTimer");
 let endBtnElement  = document.getElementById("end-session");

 const output = document.getElementById("timeDisplay");
 const outputMode = document.getElementById("modeDisplay")

document.getElementById("startTimer").addEventListener('click',function(){
    //start the timer
    const Timer = new Timer(displayTime,displayStatus);
    
    //make start button hidden
    startBtnElement.style.visibility = 'hidden';
    //make end session button visible
     endBtnElement.style.visibility = 'visible'
});


document.getElementById("end-session").addEventListener('click',function(){
    //stop the timer, reset it
    //make end session button hidden
    endBtnElement.style.visibility = 'hidden';
    //make the start button visible
    startBtnElement.style.visibility = 'visible'
});