import { ToDoList } from './ToDoList.js';
class TodoListDom {
  /**
   *
   * @param {HTMLElement} HTMLList
   */
  constructor(HTMLList, HTMLForm, HTMLBtn) {
    this.listElement = HTMLList;
    this.todoList = new ToDoList();
    this.form = HTMLForm;
    this.btn = HTMLBtn;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      let data = new FormData(this.form);
      let name = data.get("task-name");
      let sessions = parseInt(data.get("task-length"));
//      try {
        let task = this.todoList.addTask(name, sessions);
        this.displayTask(task);
  //    } catch (exception) {
  //      alert(exception);
//      }
    });

  }

  toggleInputForm(){
    if(this.form.getAttribute('style') == "display: none;"){
      this.form.setAttribute('style', '');
      this.btn.textContent = "Done";
    }  else {
      this.form.setAttribute('style', "display: none;");
      this.btn.textContent = "Add a task";
    }
    this.form.reset();
  }

  displayTask(newTask) {
    //const tr = document.createElement('tr');
    //tr.appendChild(newTask);
    this.listElement.appendChild(newTask);
    this.form.reset();
  }

  getToDoList() {
    return this.todoList;
  }
}

export { TodoListDom };
