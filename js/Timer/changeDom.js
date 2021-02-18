import { Timer } from './timer.js';

/**
 * Start Button
 * When Clicked, start timer. Switches Text from Start --> End Session (vice versa).
 */
const TimerObj = new Timer(document.getElementById('timeDisplay'), document.getElementById('modeDisplay'));
// this starts the Timer on click & switches text from 'Start' <--> ' End Session '
document.getElementById('startTimer').addEventListener('click', () => {
  // if button is a start button:
  if (document.getElementById('startTimer').innerHTML === 'Start') {
    document.getElementById('startTimer').innerHTML = 'End Session';
    document.getElementById('startTimer').style.backgroundColor = 'Grey';
    TimerObj.startTimer();
  } else {
    // switches from end button to start button
    document.getElementById('startTimer').innerText = 'Start';
    document.getElementById('startTimer').style.backgroundColor = 'Green';
  }
});
