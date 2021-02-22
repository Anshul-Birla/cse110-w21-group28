import { Timer } from './Timer/Timer.js';

const startButton = document.getElementById('startTimer');
const displayTimer = document.getElementById('timeDisplay');
const displayMode = document.getElementById('modeDisplay');

new Timer(startButton, displayTimer, displayMode);
