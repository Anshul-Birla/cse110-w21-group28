import { increment } from './function';
import { Timer } from './timer.js';

const button = document.getElementById('incrementButton');
const output = document.getElementById('outputIncrement');
button.addEventListener('click', () => {
  const oldVal = output.value;
  const newVal = increment(oldVal);
  output.value = newVal;
});
/**
 * Start Button
 * When Clicked, start timer. Switches Text from Start --> End Session (vice versa).
 */
const TimerObj = new Timer(document.getElementById('timeDisplay'), document.getElementById('modeDisplay'));
// this starts the Timer on click & switches text from 'Start' <--> ' End Session '
document.getElementById('startButton').addEventListener('click', () => {
  // if button is a start button:
  if (document.getElementById('startButton').innerHTML == 'Start') {
    document.getElementById('startButton').innerHTML = 'End Session';
    document.getElementById('startButton').style.backgroundColor = 'Grey';
    TimerObj.startTimer();
  } else {
    // switches from end button to start button
    document.getElementById('startButton').innerText = 'Start';
    document.getElementById('startButton').style.backgroundColor = 'Green';
  }
});
