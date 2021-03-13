import { Task } from './Task.js';

/**
 * Queue based TodoList data structure which holds Task objects.
 * API-like methods to perform operations on the underlying queue
 */
class ToDoList {
  /**
   * Initializes the todolist array and the counter for id's
   */
  constructor() {
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
   * @param {String} name Task subject
   * @param {Number} totalSession Projected number of Pomo Sessions
   *
   * @returns {Task} Task object to be placed into DOM
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
    this.idCounter += 1;
    this.taskList.push(task);
    if (!fromLocalStorage) {
      this.addTaskToLocalStorage(task);
    }
    return task;
  }

  /**
   * Adds a task to local storage
   *  @param {Task} task
   */
  // eslint-disable-next-line class-methods-use-this
  addTaskToLocalStorage(task) {
    const arr = [task.id, task.name, task.totalSessions, task.currentSessionNum, task.checked];
    window.localData.push(arr);
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Gets the first unchecked task in the todolist.
   * Returns null if no such task exists
   * @returns {Task} First unchecked task in list
   *
   */
  getCurrentTask() {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (!this.taskList[i].checked && !this.taskList[i].deleted) {
        return this.taskList[i];
      }
    }
    return null;
  }

  getTaskById(id) {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (Number(this.taskList[i].id) === Number(id)) return this.taskList[i];
    }
    return null;
  }

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

  addTaskToTop(task) {
    this.taskList.unshift(task);
  }
}

export { ToDoList };
