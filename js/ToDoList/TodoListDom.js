import { ToDoList } from './ToDoList.js';
import { HTMLAttributes } from './TodoListDomVariables.js';

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
   * @param {HTMLButtonElement} HTMLButton
   */
  constructor(HTMLTable, HTMLForm, HTMLButton) {
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
    this.button = HTMLButton;
    /**
     * The table where the todolist is displayed
     * @type {HTMLTableElement}
     */
    this.table = HTMLTable;

    this.setupEventListeners();
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
    });

    this.button.addEventListener('click', () => {
      this.toggleInputForm();
    });
  }

  /**
   * Toggles the visibility of the add task form depending
   * on the text contained in the button
   */
  toggleInputForm() {
    if (this.form.style.display === 'none') {
      this.form.setAttribute('style', '');
      this.button.textContent = HTMLAttributes.buttonDoneTextContent;
    } else {
      this.form.style.display = 'none';
      this.button.textContent = HTMLAttributes.buttonAddTextContent;
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
