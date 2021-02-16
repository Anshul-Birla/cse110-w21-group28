import { ToDoList } from './ToDoList.js';
class TodoListDom {
  /**
   * 
   * @param {HTMLElement} HTMLList
   */
  constructor(HTMLList, HTMLForm) {
    this.listElement = HTMLList;
    this.todoList = new ToDoList();
    this.form = HTMLForm;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      let data = new FormData(this.form);
      let name = data.get("task-name");
      let sessions = parseInt(data.get("task-length"));
      try {
        let task = this.todoList.addTask(name, sessions);
        this.displayTask(task);
      } catch(exception) {
        alert(exception);
      }
    });
  }

  displayTask(newTask) {
    const li = document.createElement('li');
    li.appendChild(newTask);
    this.listElement.appendChild(li);
  }
}

export { TodoListDom };