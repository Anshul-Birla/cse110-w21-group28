import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');

const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton);
const TimerObj = new Timer(timeDisplay, modeDisplay, TDLDom.getToDoList());

startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});
