import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { workMode } from './Timer/TimerVariables.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');

const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);

startTimerButton.addEventListener('click', () => {
  if (TimerObj.end) {
    TimerObj.startTimer();
  } else {
    TimerObj.endTimer();
  }
});

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionName === workMode.name) {
    TDLDom.onSessionComplete();
  }
});
