import { ToDoList } from './ToDoList.js';
import { HTMLAttributes } from './TodoListDomVariables.js';
import { TaskStorage } from './TodoListDomVariables.js';

class TodoListDom {
  /**
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
    this.renderLocalStorage();
  }

  renderLocalStorage() {
      for(let i = 0; i < window.localData.length; i++){
        let name = window.localData[i][TaskStorage.nameIndex];
        let totalSessions = window.localData[i][TaskStorage.totalSessionIndex];
        let currentSessions = window.localData[i][TaskStorage.currentSessionIndex];
        let completed = window.localData[i][TaskStorage.checkedIndex]
        this.renderTask(name, totalSessions, currentSessions, completed, true);
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
      this.renderTask(name, sessions);
    });

    this.button.addEventListener('click', () => {
      this.toggleInputForm();
    });
  }

  renderTask(name, totalSessions, currentSession = 0, checked = false, fromLocal = false){
    const task = this.todoList.addTask(name, totalSessions, currentSession, checked, fromLocal);
    this.displayTask(task);
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

  onSessionComplete() {
    this.todoList.onSessionComplete();
  }
}

export { TodoListDom };
