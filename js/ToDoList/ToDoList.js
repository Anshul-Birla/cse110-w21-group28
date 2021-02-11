import { Task } from './Task.js';

class ToDoList extends HTMLElement {
  // constructor, add task (from input fields), add task to dom, get curr task
  /**
   * initialze ToDoList
   * @param {HTMLElement} HTMLList
   */
  constructor(HTMLList) {
    super();
    this.listParent = HTMLList;
    this.taskList = [];
    this.idCounter = 0;
  }

  // REMEMBER TO ESCAPE SPECIAL CHARACTERS
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

    const task = new Task(parseInt(this.idCounter, 10), name, totalSession);
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
  getCurrentTask() {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (!this.taskList[i].checked) {
        return this.taskList[i];
      }
    }
    throw new Error('No Current Task');
  }

  //    function deleteTask(){}

  checkOffTask(taskId) {
    for (let i = 0; i < this.taskList.length; i += 1) {
      if (this.taskList[i] === taskId) {
        this.taskList[i].checkOffTask();
        return;
      }
    }
    throw new Error('Task Not Found');
  }
}

export { ToDoList };
customElements.define('todolist', ToDoList);
