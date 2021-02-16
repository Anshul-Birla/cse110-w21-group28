import { TodoListDom } from "./ToDoList/TodoListDom.js";

const ulist = document.getElementById("task");
const sub = document.getElementById("add-todo");

console.log(sub);

const TDLDom = new TodoListDom(ulist, sub);
