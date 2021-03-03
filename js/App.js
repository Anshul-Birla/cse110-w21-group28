import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
// import { workMode } from './Timer/TimerVariables.js';
import { Statistics } from './Statistics/Statistics.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');
const statsButton = document.getElementById('statsButton');

const StatsPage = new Statistics();
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionIsWork) { // if it was a work mode
    TDLDom.onSessionComplete();
    StatsPage.addWorkTime(e.detail.duration);
    StatsPage.incrementActualPomoSessions();
  } else {
    StatsPage.addTimeSpent(e.detail.duration);
  }
});

TDLDom.todoList.addEventListener('task-added', (e) => {
  StatsPage.addExpectedPomoSessions(e.detail.duration);
});

TDLDom.todoList.addEventListener('task-checked-off', () => {
  StatsPage.incrementTasksCompleted();
});

statsButton.addEventListener('click', () => {
  StatsPage.updateDom();
});
