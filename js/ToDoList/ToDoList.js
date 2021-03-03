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
  addTask(name, totalSession) {
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

    const task = new Task(this.idCounter, name, totalSession);
    this.idCounter += 1;
    this.taskList.push(task);
    const arr = [task.id, task.name, task.totalSessions, task.currentSessionNum, task.checked];
    window.localData.push(arr);
    this.updateLocalStorage();
    return task;
  }

  /**
   * @description - Synchronize window.localData and localStorage
   */
  // eslint-disable-next-line class-methods-use-this
  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Gets the first unchecked task
   *
   * @returns {Task} First unchecked task in the list
   *
   * @throws {'Empty ToDo List'} No tasks can be checked off if no tasks exist
   * @throws {'No Current Task'} All tasks in the list have been checked off
   */
  getCurrentTask() {
    if (this.taskList.length === 0) {
      throw new Error('Empty ToDo List');
    }
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (!this.taskList[i].checked) {
        return this.taskList[i];
      }
    }
    throw new Error('No Current Task');
  }

  /**
   * Called by the Timer function when a session is done
   * Increments the current task
   */
  onSessionComplete() {
    const currTask = this.getCurrentTask();
    currTask.incrementSession();
  }
}

export { ToDoList };
