import { classNames } from './TaskVariables.js'

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLElement {
  // constructor, incrementSession, checkOff

  /**
  * initialize a Task
  * @param {String} id - The id of the task. Will be used later for reodering, deleting, etc.
  * @param {String} name - Task content
  * @param {Number} totalSessions - Projected number of Pomo Sessions needed to complete this task.
  */
  constructor(id, name, totalSessions) {
    super();

    this.id = id;
    this.name = name;
    this.totalSessions = totalSessions;
    this.currentSessionNum = 0;
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `checkbox-${this.id}`);
    this.appendChild(checkBox);
    checkBox.addEventListener('change', () => {
      this.checkOffTask();
    });
    const text = document.createElement('p');
    text.setAttribute('id', `text-${this.id}`);
    this.appendChild(text);
    this.updateText();

    const pomoSessions = document.createElement('p');
    pomoSessions.setAttribute('id', `pomoSessions-${this.id}`);
    this.appendChild(pomoSessions);
    this.updatePomoSessions();
  }

  updateText() {
    this.children[1].textContent = this.name;
  }

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
   * Mark task as completed
   */
  checkOffTask() {
    this.checked = true;
    this.setAttribute('class', classNames.completedTaskClassName);
  }

  // GETTERS AND SETTERS IF WE NEED THEM LATER. Currently, setter causes infinite recursion.
  /**
   * @ignore
   * @type {string} */
  // get name() { return this.name; }

  /**
   * @ignore
   * @type {string} */
  // set name(name) { this.name = name; }

  /**
   * @ignore
   * @type {boolean} */
  // get checked() { return this.checked; }

  /**
   * @ignore
   * @type {boolean} */
  // set checked(check) { this.checked = check; }

  /**
   * @ignore
   * @type {number} */
  // get currentSessionNum() { return this.currentSessionNum; }

  /**
   * @ignore
   * @type {number} */
  // set currentSessionNum(num) { this.currentSessionNum = num; }
}

export { Task };
customElements.define('task-item', Task);
