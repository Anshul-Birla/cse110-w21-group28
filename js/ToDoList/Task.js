/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task {
  // constructor, incrementSession, checkOff

  /**
  * initialize a Task
  * @param {number} id - The id of the task. Will be used later for reodering, deleting, etc.
  * @param {string} name - Task content
  * @param {number} totalSessions - Projected number of Pomo Sessions needed to complete this task.
  */
  constructor(id, name, totalSessions) {
    this.id = id;
    this.name = name;
    this.totalSessions = totalSessions;
    this.currentSessionNum = 0;
    this.checked = false;
  }

  /** @type {string} */
  get name() { return this.name; }

  /** @type {string} */
  set name(name) { this.name = name; }

  /** @type {boolean} */
  get checked() { return this.checked; }

  /** @type {boolean} */
  set checked(check) { this.checked = check; }

  /** @type {number} */
  get currentSessionNum() { return this.currentSessionNum; }

  /** @type {number} */
  set currentSessionNum(num) { this.currentSessionNum = num; }

  /**
   * Increment this task's current session number. Checks off task if all sessions completed.
   * @throws {RangeError} - Incrementing a completed tasks' session number
   * (all sessions have been completed or user has checked off task manually)
   */
  incrementSession() {
    if (this.completed) {
      throw (RangeError);
    }

    this.currentSessionNum += 1;

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
