import { Task } from './Task.js';

class ToDoList {
  // constructor, add task (from input fields), add task to dom, get curr task
  /**
   * initialze ToDoList
   * @param {HTMLElement} listHTML
   */
  constructor(listHTML) {
    this.listParent = listHTML;
    this.taskList = [];
  }

  addTask(name, totalSession) {
    const task = new Task(name, totalSession);
    this.listParent.appendChild(task);
  }

  addTaskToDom() {
    this.listHTML.append(null);
  }

  // function function1() {
  //   var ul = document.getElementById("list");
  //   var li = document.createElement("li");
  //   li.appendChild(document.createTextNode("Four"));
  //   li.setAttribute("id", "element4"); // added line
  //   ul.appendChild(li);
  //   alert(li.id);
  // }
  getCurrentTask() {
    this.addTask(null, null);
  }

  //    function deleteTask(){}
}

export { ToDoList };
