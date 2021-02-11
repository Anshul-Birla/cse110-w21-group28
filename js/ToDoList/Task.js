/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLElement {
  // constructor, incrementSession, checkOff

  /**
  * initialize a Task
  * @param {number} id - The id of the task. Will be used later for reodering, deleting, etc.
  * @param {string} name - Task content
  * @param {number} totalSessions - Projected number of Pomo Sessions needed to complete this task.
  */
  constructor(id, name, totalSessions) {
    super();
    this.taskId = id;
    this.name = name;
    this.totalSessions = totalSessions;
    this.currentSessionNum = 0;
    this.checked = false;
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
    this.textContent = this.currentSessionNum;

    if (this.currentSessionNum === this.totalSessions) {
      this.checkOffTask();
    }
  }

  /**
   * Mark task as completed
   */
  checkOffTask() {
    this.checked = true;
  }
}

export { Task };
customElements.define('task-item', Task);
