import { Task } from './Task.js';

class ToDoList {
  constructor() {
    /**
     * @type {Task[]}
     */
    this.taskList = [];
    /**
     * @type {number}
     */
    this.idCounter = 0;
  }


  // REMEMBER TO ESCAPE SPECIAL CHARACTERS
  /**
   * @description - Verifies that incoming parameters are non-empty and defined, then creates Task
   * @param {string} name - Task subject
   * @param {number} totalSession - Projected number of Pomo Sessions
   * @returns {Task} Task object to be placed into DOM
   * @throws {Undefined Name} - Task name cannot be undefined
   * @throws {Empty Name} - Task name is an empty string
   * @throws {Undefiend Length Task} - Expected number of pomo sessions is undefined
   * @throws {0 Length Task} - Expected number of pomo sessions is 0
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
    }

    const task = new Task(this.idCounter, name, totalSession);
    this.idCounter += 1;
    this.taskList.push(task);
    return task;
  }

  // addTaskToDom() {
  // this.listHTML.append(null);
  // }

  // function function1() {
  //   var ul = document.getElementById("list");
  //   var li = document.createElement("li");
  //   li.appendChild(document.createTextNode("Four"));
  //   li.setAttribute("id", "element4"); // added line
  //   ul.appendChild(li);
  //   alert(li.id);
  // }

  /**
   * @returns {Task} First unchecked task in the list
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

  //    function deleteTask(){}

  /**
   * Will be used by eventListener which will know specific task Id.
   * Checks off task with inputted  Id.
   * @param {string} taskId - Id of task to check off
   * @throws {Task Not Found} - Task with inputted Id does not exist
   */
  checkOffTask(taskId) {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (this.taskList[i].id === taskId) {
        this.taskList[i].checkOffTask();
        return;
      }
    }
    throw new Error('Task Not Found');
  }
}

export { ToDoList };
