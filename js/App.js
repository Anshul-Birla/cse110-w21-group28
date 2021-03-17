import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { workMode } from './Timer/TimerVariables.js';
import { shortBreakColors, workModeColors } from './ChangeColors.js';

const timeDisplay = document.getElementById('timeDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const todoTable = document.getElementById('todo');
const addTodoForm = document.getElementById('add-todo');
const addTodoButton = document.getElementById('add-button');
const startTimerButton = document.getElementById('startTimer');
const deleteAllButton = document.getElementById('delete-all-button');
const currentTaskDiv = document.getTaskById('currentTask');

const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton, deleteAllButton);
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);

TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionName === workMode.name) {
    TDLDom.onSessionComplete();
    shortBreakColors();
  } else {
    workModeColors();
  }
});

document.body.addEventListener('focus-task', (e) => {
  TDLDom.onFocusTask(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

document.body.addEventListener('task-deleted', (e) => {
  TDLDom.todoList.removeTask(e.detail.taskID);
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
