import { classNames } from './TaskVariables.js';

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLTableRowElement {
  /**
  * Task construcutor. Initializes the task with appropriate attributes
  * @param {String} id Id of the task
  * @param {String} name Name of the task
  * @param {Number} totalSessions Total sessions the task should take
  */
  constructor(id, name, totalSessions) {
    super();
    /**
     * Stores the id of the task
     * @type {Number}
     */
    this.id = id;
    /**
     * Stores the name of the task
     * @type {String}
     */
    this.name = name;
    /**
     * Stores the total sessions anticipated for the task
     * @type {Number}
     */
    this.totalSessions = totalSessions;
    /**
     * Stores the total amount of sessions spent working on the task
     * @type {Number}
     */
    this.currentSessionNum = 0;
    /**
     * Stores if the task has been checked off or not
     * @type {Boolean}
     */
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);

    /**
     * The checkbox attribute for the task
     * @type {HTMLInputElement}
     */
    this.checkBox = this.setupCheckBox();
    /**
     * Stores the view that shows the task name to the user
     * @type {HTMLTableDataCellElement}
     */
    this.taskText = this.setupTaskText();
    /**
     * Stores the view that displayes the total pomo sessions spent
     * and alloted for the tasl
     * @type {HTMLTableDataCellElement}
     */
    this.pomoSessions = this.setupTotalPomoSessions();
    
    
    this.deleteButton = this.setupDeleteButton();
  }

  /**
   * This sets up the checkbox to check off tasks
   * @returns {HTMLInputElement}
   */
  setupCheckBox() {
    const firstCol = document.createElement('td');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `checkbox-${this.id}`);
    firstCol.appendChild(checkBox);
    this.appendChild(firstCol);

    checkBox.addEventListener('click', () => {
      this.checkOffTask();
    });
    return checkBox;
  }

  /**
   * This sets up the view that will display the taks name
   * @returns {HTMLTableDataCellElement}
   */
  setupTaskText() {
    const text = document.createElement('td');
    text.setAttribute('id', `text-${this.id}`);
    this.appendChild(text);
    this.updateText();
    return text;
  }

  /**
   * This sets up the view that will display the pomo sessions
   * @return {HTMLTableDataCellElement}
   */
  setupTotalPomoSessions() {
    const pomoSessions = document.createElement('td');
    pomoSessions.setAttribute('id', `pomoSessions-${this.id}`);
    this.appendChild(pomoSessions);
    this.updatePomoSessions();
    return pomoSessions;
  }

  /**
   *
   * This sets up the delete button for a tasl
   * @return {HTMLTableDataCellElement}
   */
  setupDeleteButton() {
    const lastCol = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button'
    deleteBtn.textContent = 'x';
    lastCol.appendChild(deleteBtn)
    this.appendChild(lastCol);
    return lastCol
  }

  /**
   * Update method to edit task name
   */
  updateText() {
    this.children[1].textContent = this.name;
  }

  /**
   * This updates the pomo sessions when a session is complete
   */
  updatePomoSessions() {
    this.children[2].textContent = `[${this.currentSessionNum}/\
      ${this.totalSessions}]`;
  }

  /**
   * Increment this task's current session number. Checks off task if all sessions completed.
   * @throws {RangeError} - Incrementing a completed tasks' session number
   * (all sessions have been completed or user has checked off task manually)
   */
  incrementSession() {
    if (this.checked) {
      throw (new RangeError());
    }

    this.currentSessionNum += 1;
    this.updatePomoSessions();

    if (this.currentSessionNum === this.totalSessions) {
      this.checkOffTask();
    }
  }

  /**
   * Marks a task as completed
   */
  checkOffTask() {
    this.checked = true;
    this.setAttribute('class', classNames.completedTaskClassName);
  }
}

export { Task };
customElements.define('task-item', Task, { extends: 'tr' });
