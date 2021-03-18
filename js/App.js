import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { Statistics } from './Statistics/Statistics.js';
import { Distraction } from './Distraction/Distraction.js';
import { shortBreakColors, workModeColors } from './ChangeColors.js';

/**
 * Used to see if data needs to be cleared or not (if timer is started after 3 a.m. or not)
 * @returns True if the current time is 03:00:00 or later. False otherwise.
 */
function after3amToday() {
  const currDate = new Date();
  return currDate.getHours() >= 3;
}

/**
 * @type {HTMLParagraphElement} Location where time is displayed
 */
const timeDisplay = document.getElementById('timeDisplay');
/**
 * @type {HTMLParagraphElement} Location where current pomo session type  is displayed
 */
const modeDisplay = document.getElementById('modeDisplay');
/**
 * @type {HTMLTableElement} Table where ToDo List is housed
 */
const todoTable = document.getElementById('todo');
/**
 * @type {HTMLFormElement} Form for inputting new tasks
 */
const addTodoForm = document.getElementById('add-todo');
/**
 * @type {HTMLButtonElement} Button to submit addTodoForm
 */
const addTodoButton = document.getElementById('add-button');
/**
 * @type {HTMLButtonElement} Button to start the timer
 */
const startTimerButton = document.getElementById('startTimer');
/**
 * @type {HTMLButtonElement} Button to display the statistics popup
 */
const statsButton = document.getElementById('statsButton');
/**
 * @type {HTMLButtonElement} Button to log a distraction
 */
const distractButton = document.getElementById('distractionButton');
/**
 * @type {HTMLElement} Section which houses the distraction popup
 */
const distractPopUp = document.getElementById('distract-popup');
/**
 * @type {HTMLButtonElement} Button to cancel logging a distraction
 */
const cancelButton = document.getElementById('cancel-button');
/**
 * @type {HTMLFormElement} Form for entering a new distraction
 */
const distractForm = document.getElementById('distract-form');
/**
 * @type {HTMLInputElement} Input element for logging a distraction
 */
const description = document.getElementById('description');
/**
 * @type {HTMLElement} Section which houses the statistics popup
 */
const statsPopUp = document.getElementById('stats-section');
/**
 * @type {HTMLDivElement} Div which houses the text elements inside the statistics popup
 */
const parentDiv = document.getElementById('parentDiv');
/**
 * @type {HTMLButtonElement} Button to close the statitics popup
 */
const closeStatsButton = document.getElementById('close-stats-button');
/**
 * @type {HTMLButtonElement} Button to delete all tasks
 */
const deleteAllButton = document.getElementById('delete-all-button');
/**
 * @type {HTMLDivElement} Overlay to darken popup backgrounds
 */
const overlay = document.getElementById('overlay');
/**
 * @type {HTMLButtonElement} Button to toggle "Data" tab within the Statistics popup
 */
const statsTabBtn = document.getElementById('data');
/**
 * @type {HTMLElement} Section for showing which task is currently in progress
 */
const currentTaskDiv = document.getElementById('currentTask');

/**
 * @type {Statistics}
 */
const StatsPage = new Statistics();
/**
 * @type {TodoListDom} DOM handler for the ToDo List data structure
 */
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton,
  deleteAllButton, currentTaskDiv);

/**
 * @type {Timer}
 */
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);
/**
 * @type {Distraction}
 */
// eslint-disable-next-line max-len
const DistractionPage = new Distraction(distractButton, distractPopUp, cancelButton, distractForm, description, overlay);

/**
 * When timer is complete, if a work session was completed then:
 * 1. Increment current task pomo sessions
 * 2. Add work time to stats
 * 3. Increment completed pomo sessions in stats
 *
 * If a break session was just completed, the add to total time spent in stats
 *
 * Then change colors accordingly
 */
TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionIsWork) { // if it was a work mode
    TDLDom.onSessionComplete();
    StatsPage.addWorkTime(e.detail.duration);
    StatsPage.incrementActualPomoSessions();
    shortBreakColors();
  } else {
    StatsPage.addTimeSpent(e.detail.duration);
    workModeColors();
  }
});

/**
 * When the start/stop timer button is clicked:
 * 1. If there is old data, compress it and clear it
 * 2. If you are clicking stop timer:
 *  a. Compress statistics
 *  b. Set session start time to a past date so it resets when start button is fixed.
 */
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
  }
});

/**
 * When a session is started:
 * If it is a work session, disable distraction button, otherwise enable the distraction button
 */
TimerObj.addEventListener('timer-start', (e) => {
  if (e.detail.sessionIsWork) {
    distractButton.disabled = false;
  } else {
    distractButton.disabled = true;
  }
});

/**
 * If the timer isn't ticking, you cannot log a distraction so disable the distraction button
 */
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

/**
 * When a task is created, add the expected pomo-duration to stats
 */
TDLDom.todoList.addEventListener('task-added', (e) => {
  StatsPage.addExpectedPomoSessions(e.detail.duration);
});

/**
 * When a task is checked off, update the number of completed tasks in stats
 */
TDLDom.todoList.addEventListener('task-checked-off', () => {
  StatsPage.incrementTasksCompleted();
});

/**
 * When a task is un-checked, update the number of completed tasks in stats
 */
TDLDom.todoList.addEventListener('task-unchecked', () => {
  StatsPage.decrementTasksCompleted();
});

/**
 * When a task is deleted, subtract the expected pomo-duration from stats
 */
TDLDom.todoList.addEventListener('task-deleted', (e) => {
  StatsPage.deleteExpectedPomoSessions(e.detail.pomoSessions);
});

/**
 * When a distraction is logged:
 * 1. Store the id of the session during which it occurred
 * 2. Store the distraction in task
 */
DistractionPage.addEventListener('distraction-created', (e) => {
  e.detail.pomoSessionId = TimerObj.sessionId;
  StatsPage.addDistraction(e.detail);
});

/**
 * When End Day is clicked, set pomo session id back to zero to restart distraction count
 */
StatsPage.addEventListener('reset-timer', () => {
  TimerObj.resetPomoSessionId();
});

/**
 * Makes the Statistics button in the header  responsive
 */
statsButton.addEventListener('click', () => {
  StatsPage.updateDom();
  statsPopUp.style.display = 'block';
  parentDiv.style.display = 'block';
  statsPopUp.style.animation = 'fadeEffect-popup 1s';
  overlay.style.animation = 'fadeEffect-overlay 1s';
  parentDiv.setAttribute('class', 'slide-in');
  document.getElementById('overlay').style.display = 'block';
});

/**
 * Makes the Statistics close button responsive
 */
closeStatsButton.addEventListener('click', () => {
  parentDiv.setAttribute('class', 'slide-out');
  statsPopUp.style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
});

/**
 * If it's after 3a.m. today and the last time that "Start Day" was clicked was
 * before 3a.m. today, compress stats and clear data
 */
if (after3amToday() && StatsPage.dataToCompressExists()) {
  StatsPage.compressStats();
  StatsPage.clearData();
}

/**
 * Makes the Data tab default when Statistics popup appears
 */
statsTabBtn.click();
