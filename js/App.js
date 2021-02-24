import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { workMode } from './Timer/TimerVariables.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');
const distractButton = document.getElementById('distractionButton');
const distractPopUp = document.getElementById('distract-popup');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');

const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);

startTimerButton.addEventListener('click', () => {
  TimerObj.startTimer();
});

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionName === workMode.name) {
    TDLDom.onSessionComplete();
  }
});

/**
 * This function will make the pop up disappear
 * and remove any of the text in the 'description' field.
 */
function resetPopUp() {
  distractPopUp.style.display = 'none';
  document.getElementById('description').value = '';
}

distractButton.addEventListener('click', () => {
  distractPopUp.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
  resetPopUp();
});

submitButton.addEventListener('click', () => {
  const description = document.getElementById('description').value;
  const time = document.getElementById('timeDisplay').textContent;
  if (description === '') {
  } else {
    let distractions = JSON.parse(localStorage.getItem('distractions'));
    if (distractions === null) {
      distractions = [];
    }
    distractions.push({ description, time });
    localStorage.setItem('distractions', JSON.stringify(distractions));
    resetPopUp();
  }
});

