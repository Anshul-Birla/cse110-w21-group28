import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { workMode } from './Timer/TimerModes.js';

window.localData = [];

if (localStorage.getItem('tasks') !== null) {
  window.localData = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < window.localData.length; i++) {
    window.localData[i][0] = i;
  }
  console.log("local data ", window.localData);
}


const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');
const TimerObj = new Timer(timeDisplay, modeDisplay);
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton);



startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionName === workMode.name) {
    TDLDom.onSessionComplete();
  }
});
