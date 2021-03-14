import { ToDoList } from './ToDoList.js';
import { HTMLAttributes, TaskStorage } from './TodoListDomVariables.js';

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

    /**
     * The current task the user should be working on
     * @type {Task}
     */
    this.currentTask = null;

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
      // get local storage data
      const name = window.localData[i][TaskStorage.nameIndex];
      const totalSession = window.localData[i][TaskStorage.totalSessionIndex];
      const currentSession = window.localData[i][TaskStorage.currentSessionIndex];
      const completed = window.localData[i][TaskStorage.checkedIndex];

      const task = this.todoList.addTask(name, totalSession, currentSession, completed, true);
      this.displayTask(task);
    }

    this.updateCurrentTask();
  }

  /**
   * Sets up the form dissapearing and submit event listeners
   */
  setupEventListeners() {
    // event listener for form submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(this.form);
      const name = data.get(HTMLAttributes.taskNameId);
      const sessions = parseInt(data.get(HTMLAttributes.taskPomoSessions), 10);
      try {
        const task = this.todoList.addTask(name, sessions);
        this.updateCurrentTask();
        this.displayTask(task);
        this.form.reset();
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Invalid input. Please try again');
      }
    });

    this.deleteAllBtn.addEventListener('click', () => {
      const list = this.todoList.taskList;
      for (let i = 0; i < list.length; i += 1) {
        list[i].deleteButton.click();
      }
    });
  }

  /**
   * Adds a task to the bottom of the table OR adds it before the specified index
   * @param {HTMLTableRowElement} newTask - task you want added
   * @param {HTMLTableRowElement} [index = undefined] - index you want to insert the task before
   */
  displayTask(newTask, index = undefined) {
    if (index === undefined) {
      this.table.appendChild(newTask);
    } else {
      this.table.insertBefore(newTask, this.table.childNodes[index]);
    }
  }

  /**
   * This function runs when the timer is done with its working session
   */
  onSessionComplete() {
    const currTask = this.todoList.getCurrentTask();
    if (currTask != null) {
      currTask.incrementSession();
    }
  }

  /**
   * Updates the current task and changes its checkbox property accordingly
   */
  updateCurrentTask() {
    this.currentTask = this.todoList.getCurrentTask();
    if (this.currentTask != null) this.currentTask.checkBox.disabled = false;
  }

  /**
   * Function that puts the task with the given id to the top
   * of the table
   * @param {String} id - id of task to focus on
   */
  onFocusTask(id) {
    const rows = this.table.childNodes;
    let currentTaskIndex = -1;
    // find index of the current task
    for (let i = 2; i < rows.length; i += 1) {
      if (rows[i].checked === false && currentTaskIndex === -1) {
        currentTaskIndex = i;
      }
    }

    const clickedTask = this.todoList.getTaskById(id);
    // disable the old tasks checkbox because it has not been clicked yet
    this.currentTask.checkBox.disabled = true;
    this.displayTask(clickedTask, currentTaskIndex);

    // remove the task and add it back to the top
    this.todoList.removeTask(id);
    this.todoList.addTaskToTop(clickedTask);
  }
}

export { TodoListDom };
