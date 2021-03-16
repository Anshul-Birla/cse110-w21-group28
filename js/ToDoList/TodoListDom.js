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
    const completedTaskIndex = [];
    if (localStorage.getItem('tasks') !== null) {
      window.localData = JSON.parse(localStorage.getItem('tasks'));
      for (let i = 0; i < window.localData.length; i += 1) {
        window.localData[i][0] = String(i);
      }
      localStorage.setItem('tasks', JSON.stringify(window.localData));
    }

    for (let i = 0; i < window.localData.length; i += 1) {
      // get local storage data
      const completed = window.localData[i][TaskStorage.checkedIndex];

      if (!completed) {
        const name = window.localData[i][TaskStorage.nameIndex];
        const totalSession = window.localData[i][TaskStorage.totalSessionIndex];
        const currentSession = window.localData[i][TaskStorage.currentSessionIndex];
        const task = this.todoList.addTask(name, totalSession, currentSession, completed, true);
        this.displayTask(task);
      } else {
        /*
           push index because addTask takes in each indiv. param instead of a task.
           Need to use addTask() because that is the only way to increment the counter
           in the todolist class (used for id's)
        */
        completedTaskIndex.push(i);
      }
    }
    // this is so that the completed tasks go to the end of the todolist during rendering
    for (let x = 0; x < completedTaskIndex.length; x += 1) {
      const i = completedTaskIndex[x];
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
        console.log(error);
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
    this.currentTask = currTask;
  }

  /**
   * This function runs when someone checks off a task. Removes the task from the
   * table and appends it to the bottom. Removes the task from the todolist
   * data structure and appends it to the bottom there
   */
  onCompletedTask() {
    /*
    When this function is called, currentTask has NOT been updated to
    reflect the checking off. Thus, this is the task that was just
    checked off, not the new current task. Only works if the user
    can only check off the current task
    */
    this.currentTask.onDelete()
    this.displayTask(this.currentTask);
    this.todoList.addTaskToEnd(this.currentTask);
  }

  /**
   * Called when someone unchecks a task. Removes the task from the table
   * and appends it become the last unchecked task in the table. Does the same
   * within the todolist data structure
   * @param {Number} id - id of the task you would like to uncheck
   */
  onUncheckedTask(id) {
    const uncheckedTask = this.todoList.getTaskById(id);
    let firstCompletedTaskIndex = -1;
    uncheckedTask.onDelete();
    for (let i = 2; i < this.table.childNodes.length && firstCompletedTaskIndex === -1; i += 1) {
      if (this.table.childNodes[i].checked === true) firstCompletedTaskIndex = i;
    }
    this.todoList.addTaskToEnd(uncheckedTask);
    this.displayTask(uncheckedTask, firstCompletedTaskIndex);
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
    clickedTask.onDelete();
    this.displayTask(clickedTask, currentTaskIndex);

    // remove the task and add it back to the top
    this.todoList.addTaskToTop(clickedTask);
  }
}

export { TodoListDom };
