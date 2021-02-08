import { Timer } from './timer.js';

const output = document.getElementById('timeDisplay');
const outputMode = document.getElementById('modeDisplay');
const startTimerButton = document.getElementById('startTimer');
const TimerObj = new Timer(output, outputMode);

startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});
