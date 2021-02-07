import { Timer } from "./timer.js";

const output = document.getElementById('timeDisplay');
const startTimerButton = document.getElementById('startTimer');
const TimerObj = new Timer(output);

startTimerButton.addEventListener('click', () => {
  TimerObj.beginTimer();
});
