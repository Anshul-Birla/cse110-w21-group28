import { TodoListDom } from "./ToDoList/TodoListDom.js";
import { Timer } from './Timer/Timer.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById("modeDisplay");
const ulist = document.getElementById("task");
const sub = document.getElementById("add-todo");
const startTimerButton = document.getElementById("startTimer");

const TDLDom = new TodoListDom(ulist, sub);
const TimerObj = new Timer(timeDisplay, modeDisplay, TDLDom.getToDoList());


startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});

