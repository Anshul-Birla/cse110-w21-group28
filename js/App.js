import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
// import { workMode } from './Timer/TimerVariables.js';
import { Statistics } from './Statistics/Statistics.js';
import { Distraction } from './Distraction/Distraction.js';
import { shortBreakColors, workModeColors } from './ChangeColors.js';

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
const distractForm = document.getElementById('distract-form');
const description = document.getElementById('description');
const statsPopUp = document.getElementById('stats-section');
const parentDiv = document.getElementById('parentDiv');
const closeStatsButton = document.getElementById('close-stats-button');
const deleteAllButton = document.getElementById('delete-all-button');
const overlay = document.getElementById('overlay');
const statsTabBtn = document.getElementById('data');
const currentTaskDiv = document.getElementById('currentTask');

const StatsPage = new Statistics();
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton,
  deleteAllButton, currentTaskDiv);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);
// eslint-disable-next-line max-len
const DistractionPage = new Distraction(distractButton, distractPopUp, cancelButton, distractForm, description, overlay);

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionIsWork) { // if it was a work mode
    TDLDom.onSessionComplete();
    StatsPage.addWorkTime(e.detail.duration);
    StatsPage.incrementActualPomoSessions();
    // DistractionPage.hideButton();
    shortBreakColors();
  } else {
    StatsPage.addTimeSpent(e.detail.duration);
    // DistractionPage.showButton();
    workModeColors();
  }
});

startTimerButton.addEventListener('click', () => {
  if (StatsPage.dataToCompressExists()) {
    StatsPage.clearData();
  }
  if (startTimerButton.childNodes[0].nodeValue === 'Start') { // Button text updates before this
    StatsPage.compressStats();
    // Definitely in the past so data is cleared when Start Day is clicked
    const newDate = new Date(2000, 0, 1);
    localStorage.setItem('startDateTime', newDate);
    StatsPage.sessionStartDateTime = newDate;
    // shortBreakColors();
  } else {
    // workModeColors();
  }
});

TimerObj.addEventListener('timer-start', (e) => {
  if (e.detail.sessionIsWork) {
    distractButton.disabled = false;
  } else {
    distractButton.disabled = true;
  }
});

TimerObj.addEventListener('timer-end', () => {
  distractButton.disabled = true;
});


document.body.addEventListener('focus-task', (e) => {
  TDLDom.onFocusTask(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

document.body.addEventListener('task-deleted', (e) => {
  TDLDom.todoList.removeTask(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

document.body.addEventListener('checkbox-updated', (e) => {
  if (e.detail.checkBoxState === true) {
    TDLDom.onCompletedTask();
  } else {
    TDLDom.onUncheckedTask(e.detail.taskID);
  }
  TDLDom.updateCurrentTask();
});

window.addEventListener('click', (e) => {
  const lastColumnElements = document.getElementsByClassName('touch-target');
  let touchedButton = false;

  for (let i = 0; i < lastColumnElements.length && !touchedButton; i += 1) {
    if (lastColumnElements[i].contains(e.target)) touchedButton = true;
  }

  if (!touchedButton) {
    const buttonPairList = document.getElementsByClassName('double-buttons');
    const threeDotButtonList = document.getElementsByClassName('triple-dots-touch');
    for (let i = 0; i < buttonPairList.length; i += 1) {
      buttonPairList[i].style.display = 'none';
      threeDotButtonList[i].style.display = 'block';
    }
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

statsButton.addEventListener('click', () => {
  StatsPage.updateDom();
  statsPopUp.style.display = 'block';
  parentDiv.style.display = 'block';
  statsPopUp.style.animation = 'fadeEffect-popup 2s';
  overlay.style.animation = 'fadeEffect-overlay 2s';
  parentDiv.setAttribute('class', 'slide-in');
  document.getElementById('overlay').style.display = 'block';
});

closeStatsButton.addEventListener('click', () => {
  parentDiv.setAttribute('class', 'slide-out');
  statsPopUp.style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
});

// If it's after 3a.m. today and the last time that "Start Day" was clicked was
// before 3a.m. today, compress stats and clear data
if (after3amToday() && StatsPage.dataToCompressExists()) {
  StatsPage.compressStats();
  StatsPage.clearData();
}

/* Stats Pop Up Buttons */
statsTabBtn.click(); // stats btn is default tab
