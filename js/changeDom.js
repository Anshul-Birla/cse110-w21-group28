import { Task } from "./ToDoList/Task.js";
const list = document.getElementById("task");

for (let i = 0; i < 10; i++) {
  let taskItem = new Task("nof", "efnp", i);
  list.appendChild(taskItem);
}
