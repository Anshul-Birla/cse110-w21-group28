import { Task } from './Task.js';

/**
 * Queue based TodoList data structure which holds Task objects.
 * API-like methods to perform operations on the underlying queue
 */
class ToDoList extends HTMLElement {
  /**
   * Initializes the todolist array and the counter for id's
   */
  constructor() {
    super();
    /**
     * Array that stores each task
     * @type {Task[]}
     */
    this.taskList = [];
    /**
     * This is the total task count that is also a way
     * to give each task a unique id
     * @type {number}
     */
    this.idCounter = 0;
  }

  /**
   * Verifies that incoming parameters are non-empty and defined, then creates Task
   * @param {String} name - Task subject
   * @param {Number} totalSession - Projected number of Pomo Sessions
   * @param {Number} [currentSession = 0] - Total amount of sessions completed already
   * @param {Boolean} [completed = false] - Task checked off or not
   * @param {Boolean} [fromLocalStorage = false] - If a task is being added from local storage
   *
   * @returns {Task} - Task object to be placed into DOM
   *
   * @throws {Undefined Name} Task name cannot be undefined
   * @throws {Empty Name} Task name is an empty string
   * @throws {Undefiend Length Task} Expected number of pomo sessions is undefined
   * @throws {0 Length Task} Expected number of pomo sessions is 0
   */
  addTask(name, totalSession, currentSession = 0, completed = false, fromLocalStorage = false) {
    if (name === undefined) {
      throw new Error('Undefined Name');
    } else if (name === '') {
      throw new Error('Empty Name');
    } else if (totalSession === undefined) {
      throw new Error('Undefined Length Task');
    } else if (totalSession === 0) {
      throw new Error('0 Length Task');
    } else if (Number.isNaN(totalSession)) {
      throw new Error('Number Not Passed In');
    }

    const task = new Task(this.idCounter, name, totalSession, currentSession, completed);
    task.addEventListener('task-checked-off', () => {
      const event = new CustomEvent('task-checked-off', {
      });
      this.dispatchEvent(event);
    });
    task.addEventListener('task-unchecked', () => {
      const event = new CustomEvent('task-unchecked', {
      });
      this.dispatchEvent(event);
    });
    task.addEventListener('task-deleted', (e) => {
      const event = new CustomEvent('task-deleted', {
        detail: e.detail,
      });
      this.dispatchEvent(event);
    });
    const event = new CustomEvent('task-added', {
      detail: {
        taskName: name,
        duration: totalSession,
      },
    });
    this.dispatchEvent(event);
    this.idCounter += 1;
    this.taskList.push(task);
    if (!fromLocalStorage) {
      this.addTaskToLocalStorage(task);
    }
    return task;
  }

  /**
   * Adds a task to local storage
   * @param {Task} task - Task to be added
   * @param {Number} [index = undefined] - Index to add at. Default to end of local storage
   */
  // eslint-disable-next-line class-methods-use-this
  addTaskToLocalStorage(task, index = undefined) {
    const arr = [task.id, task.name, task.totalSessions, task.currentSessionNum, task.checked];
    if (index === undefined) {
      window.localData.push(arr);
    } else {
      window.localData.splice(index, 0, arr);
    }
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Gets the first unchecked task in the todolist.
   * Returns null if no such task exists
   * @returns {Task} - First unchecked task in list
   *
   */
  getCurrentTask() {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (!this.taskList[i].checked) {
        return this.taskList[i];
      }
    }
    return null;
  }

  /**
   * Gets the task corresponding to the id given
   * @param {String} id - ID of task
   * @returns {Task} - Task with ID, null if none found
   */
  getTaskById(id) {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (Number(this.taskList[i].id) === Number(id)) return this.taskList[i];
    }
    return null;
  }

  /**
   * Removes a task with the given id from the todolist
   * @param {String} id - id of task to remove
   * @returns {Boolean} true if succesful, false if no task found
   */
  removeTask(id) {
    let index = -1;
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (Number(this.taskList[i].id) === Number(id)) {
        index = i;
      }
    }

    if (index !== -1) {
      this.taskList.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Adds a task to the top of the todolist
   * @param {Task} task - task to be added to the top
   */
  addTaskToTop(task) {
    this.taskList.unshift(task);
    this.addTaskToLocalStorage(task, 0);
  }

  /**
   * Adds task to the end of the todolist depending on if it is checked or not.
   * If checked, adds to the end. If not checked, adds right before the first
   * checked task (i.e. makes the task being added the last unchecked task)
   * @param {Task} task - task object that needs to be added
   */
  addTaskToEnd(task) {
    if (task.checked) {
      this.taskList.push(task);
      this.addTaskToLocalStorage(task);
    } else {
      let firstUncheckedTask = -1;
      for (let i = 0; i < this.taskList.length && firstUncheckedTask === -1; i += 1) {
        if (this.taskList[i].checked === true) firstUncheckedTask = i;
      }
      if (firstUncheckedTask === -1) {
        this.taskList.push(task);
        this.addTaskToLocalStorage(task);
      } else {
        this.taskList.splice(firstUncheckedTask, 0, task);
        this.addTaskToLocalStorage(task, firstUncheckedTask);
      }
    }
  }
}

customElements.define('custom-todolist', ToDoList);
export { ToDoList };
