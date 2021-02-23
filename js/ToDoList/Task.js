import { classNames } from './TaskVariables';

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLTableRowElement {
  /**
  * Task construcutor. Initializes the task with appropriate attributes
  * @param {String} id
  * @param {String} name
  * @param {Number} totalSessions
  */
  constructor(id, name, totalSessions) {
    super();

    this.id = id;
    this.name = name;
    this.totalSessions = totalSessions;
    this.currentSessionNum = 0;
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);

    this.checkBox = this.setupCheckBox();
    this.taskText = this.setupTaskText();
    this.pomoSessions = this.setupTotalPomoSessions();
    this.setupDeleteButton();
  }

  /**
   * This sets up the checkbox to check off tasks
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
   * Currently a placeholder until delete functionality happens
   */
  setupDeleteButton() {
    const deleteBtn = document.createElement('td');
    deleteBtn.textContent = 'DELETE';
    this.appendChild(deleteBtn);
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
    this.checkBox.checked = true;
  }
}

export { Task };
customElements.define('task-item', Task, { extends: 'tr' });
