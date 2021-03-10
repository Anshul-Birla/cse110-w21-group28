import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
// import { workMode } from './Timer/TimerVariables.js';
import { Statistics } from './Statistics/Statistics.js';
import { Distraction } from './Distraction/Distraction.js';

function after3amToday() {
  const currDate = new Date();
  return currDate.getHours() >= 3;
}

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');
const statsButton = document.getElementById('statsButton');
const distractButton = document.getElementById('distractionButton');
const distractPopUp = document.getElementById('distract-popup');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');
const description = document.getElementById('description');
const statsPopUp = document.getElementById('stats-section');
const parentDiv = document.getElementById('parentDiv');
const closeStatsButton = document.getElementById('close-stats-button');
const deleteAllButton = document.getElementById('delete-all-button');

const StatsPage = new Statistics();
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton, deleteAllButton);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);
// eslint-disable-next-line max-len
const DistractionPage = new Distraction(distractButton, distractPopUp, cancelButton, submitButton, description);

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionIsWork) { // if it was a work mode
    TDLDom.onSessionComplete();
    StatsPage.addWorkTime(e.detail.duration);
    StatsPage.incrementActualPomoSessions();
    DistractionPage.hideButton();
  } else {
    StatsPage.addTimeSpent(e.detail.duration);
    DistractionPage.showButton();
  }
});

startTimerButton.addEventListener('click', () => {
  if (startTimerButton.textContent === 'Start') { // Button text updates before this
    StatsPage.compressStats();
    localStorage.setItem('startDateTime', new Date(2000, 0, 1));
  } else if (StatsPage.dataToCompressExists()) {
    StatsPage.clearData();
  }
});

TDLDom.todoList.addEventListener('task-added', (e) => {
  StatsPage.addExpectedPomoSessions(e.detail.duration);
});

TDLDom.todoList.addEventListener('task-checked-off', () => {
  StatsPage.incrementTasksCompleted();
});

TDLDom.todoList.addEventListener('task-unchecked', () => {
  StatsPage.decrementTasksCompleted();
});

TDLDom.todoList.addEventListener('task-deleted', (e) => {
  StatsPage.deleteExpectedPomoSessions(e.detail.pomoSessions);
});

DistractionPage.addEventListener('distraction-created', (e) => {
  e.detail.pomoSessionId = TimerObj.sessionId;
  StatsPage.addDistraction(e.detail);
});

StatsPage.addEventListener('reset-timer', () => {
  TimerObj.resetPomoSessionId();
});

// ADD END DAY CALLS STATSPAGE.COMPRESSSTATS()

statsButton.addEventListener('click', () => {
  StatsPage.updateDom();
  statsPopUp.style.display = 'block';
  parentDiv.style.display = 'block';
  const isOpen = parentDiv.classList.contains('slide-out');
  parentDiv.setAttribute('class', isOpen ? 'slide-in' : 'slide-out');
});

closeStatsButton.addEventListener('click', () => {
  const isOpen = parentDiv.classList.contains('slide-out');
  parentDiv.setAttribute('class', isOpen ? 'slide-in' : 'slide-out');
  statsPopUp.style.display = 'none';
});

if (after3amToday() && StatsPage.dataToCompressExists()) {
  StatsPage.compressStats();
  StatsPage.clearData();
}
