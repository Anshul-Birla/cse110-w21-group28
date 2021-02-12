import { increment } from './function';
import { Timer } from './timer.js'
 
const button = document.getElementById('incrementButton');
const output = document.getElementById('outputIncrement');
button.addEventListener('click', () => {
  const oldVal = output.value;
  const newVal = increment(oldVal);
  output.value = newVal;
});
 




// get button to start timer
let startBtnElement = document.getElementById("startButton"); 
// keeps track if Button is a start timer or end button
let strt = true;
let TimerObj = new Timer(document.getElementById('timeDisplay'),document.getElementById('modeDisplay'));

// this starts the Timer on click or ends it 
document.getElementById("startButton").addEventListener('click',function(){
  //switches from start button to end button
   if(strt == true){
     startBtnElement.innerText = "End Session"; 
     startBtnElement.style.backgroundColor = "Grey";
     strt = false;
     TimerObj.startTimer();
    }else{
      //switches from end button to star button
      startBtnElement.innerText = "Start";  
      startBtnElement.style.backgroundColor = "Green";
      strt = true;
   }
});
