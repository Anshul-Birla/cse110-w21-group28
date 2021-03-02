import { ToDoList } from './ToDoList.js';
import { HTMLAttributes, TaskStorage } from './TodoListDomVariables.js';

import { Task } from './Task.js';

/**
 * Class responsible for providing changes to the DOM for the TodoList
 * Encapsulates the TodoList class
 * Done so their is a clear abstraction from DOM Manipulation and Data Manipulation
 */
class TodoListDom {
  /**
   * Initializes the TodoListDom object with its correct member variables
   * @param {HTMLTableElement} HTMLTable
   * @param {HTMLFormElement} HTMLForm
   * @param {HTMLButtonElement} submitBtn
   * @param {HTMLButtonElement} deleteAllBtn
   */
  constructor(HTMLTable, HTMLForm, submitBtn, deleteAllBtn) {
    /**
     * Holds the TodoList so the Dom Manager can acess it
     * @type {ToDoList}
     */
    this.todoList = new ToDoList();
    /**
     * The form where users input their task
     * @type {HTMLFormElement}
     */
    this.form = HTMLForm;
    /**
     * The button where users click to submit their todo's
     * @type {HTMLButtonElement}
     */
    this.submitBtn = submitBtn;
    /**
     * The button where users click to delete their todo's
     * @type {HTMLButtonElement}
     */
    this.deleteAllBtn = deleteAllBtn;
    /**
     * The table where the todolist is displayed
     * @type {HTMLTableElement}
     */
    this.table = HTMLTable;

    this.setupEventListeners();
    this.renderLocalStorage();
  }

  /**
 * Fetch local storage, and store them into window.localData
 * Iterate each local tasks and render them
 */
  renderLocalStorage() {
    window.localData = [];
    if (localStorage.getItem('tasks') !== null) {
      window.localData = JSON.parse(localStorage.getItem('tasks'));
      for (let i = 0; i < window.localData.length; i += 1) {
        window.localData[i][0] = String(i);
      }
      localStorage.setItem('tasks', JSON.stringify(window.localData));
    }

    for (let i = 0; i < window.localData.length; i += 1) {
      const name = window.localData[i][TaskStorage.nameIndex];
      const totalSession = window.localData[i][TaskStorage.totalSessionIndex];
      const currentSession = window.localData[i][TaskStorage.currentSessionIndex];
      const completed = window.localData[i][TaskStorage.checkedIndex];
      const task = new Task(i, name, totalSession);
      this.todoList.idCounter += 1;
      task.currentSessionNum = currentSession;
      task.checked = completed;
      this.todoList.taskList.push(task);
      task.updatePomoSessions();
      this.displayTask(task);
    }
  }

  /**
   * Sets up the form dissapearing and submit event listeners
   */
  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.form);
      const name = data.get(HTMLAttributes.taskNameId);
      const sessions = parseInt(data.get(HTMLAttributes.taskPomoSessions), 10);
      const task = this.todoList.addTask(name, sessions);
      this.displayTask(task);
      this.form.reset();
    });

    this.submitBtn.addEventListener('click', () => {
      this.toggleInputForm();
    });

    this.deleteAllBtn.addEventListener('click', () => {
      const list = this.todoList.taskList;
      for (let i = 0; i < list.length; i += 1) {
        list[i].children[3].children[0].click();
      }
    });
  }

  /**
   * Toggles the visibility of the add task form depending
   * on the text contained in the button
   */
  toggleInputForm() {
    if (this.form.style.display === 'none') {
      this.form.setAttribute('style', '');
      this.submitBtn.textContent = HTMLAttributes.buttonDoneTextContent;
    } else {
      this.form.style.display = 'none';
      this.submitBtn.textContent = HTMLAttributes.buttonAddTextContent;
    }
    this.form.reset();
  }

  /**
   * Adds a task to the table of task
   * @param {HTMLTableRowElement} newTask
   */
  displayTask(newTask) {
    this.table.appendChild(newTask);
  }

  /**
   * This function runs when the timer is done with its working session
   */
  onSessionComplete() {
    this.todoList.onSessionComplete();
  }
}

export { TodoListDom };
