import { Timer } from './Timer/Timer.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById("modeDisplay");
const startTimerButton = document.getElementById("startTimer");

const TimerObj = new Timer(timeDisplay, modeDisplay);

startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});
