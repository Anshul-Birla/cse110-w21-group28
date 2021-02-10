import { Timer } from './timer.js';

// get where we want to output the Timer information from
const output = document.getElementById('timeDisplay');
const outputMode = document.getElementById('modeDisplay');

// get button to start timer
const startTimerButton = document.getElementById('startTimer');

// instansiate the timer object
const TimerObj = new Timer(output, outputMode);

// this starts the Timer on a click
startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});
