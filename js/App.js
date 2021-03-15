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

document.body.addEventListener('checkbox-updated', () => {
  TDLDom.updateCurrentTask();
});

window.addEventListener('click', (e) => {
  let lastColumnElements = document.getElementsByClassName('touch-target'); 
  let touched_button = false;

  for (let i = 0; i < lastColumnElements.length && !touched_button; i++) {
    if (lastColumnElements[i].contains(e.target))
      touched_button = true;
  }

  if(!touched_button) {
    let buttonPairList = document.getElementsByClassName('double-buttons');
    let threeDotButtonList = document.getElementsByClassName('triple-dots-touch');
    for (let i = 0; i < buttonPairList.length; i++) {
      buttonPairList[i].style.display = 'none';
      threeDotButtonList[i].style.display = 'block';
    }
  }

});
