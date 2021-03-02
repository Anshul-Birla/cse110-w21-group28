import { TodoListDom } from '../js/ToDoList/TodoListDom.js';

/** @Test {ToDoList} */

beforeEach(() => {
  document.body.innerHTML = `<section id="tasklist" class="section_container">
      <h2>To Do</h2>
      <table id='todo'>
        <th>
          <td>Task</td>
          <td>Pomos</td>
          <td>Delete</td>
        </th>
      </table>
    </section>

    <div>
      <form id = "add-todo" style = "display: none;">
        <input type="text" name="task-name" placeholder="Write Essay">
        <input type="number" name="task-length" placeholder="1">
        <input type="submit">
      </form>
      <button id = "add-button" type="button">Add a task</button>
    </div> `;
});

test('Valid construction of TDLDom', () => {
  const tableLocation = document.getElementById('todo');
  const formLocation = document.getElementById('add-todo');
  const btnLocation = document.getElementById('add-button');
  const myDOM = new TodoListDom(tableLocation, formLocation, btnLocation);
  expect(myDOM.todoList.taskList).toEqual([]);
});

test('Add a task', () => {
  const tableLocation = document.getElementById('todo');
  const formLocation = document.getElementById('add-todo');
  const btnLocation = document.getElementById('add-button');
  const myDOM = new TodoListDom(tableLocation, formLocation, btnLocation);
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[0/ *2\\]'));
});

test('Increment session ', () => {
  const tableLocation = document.getElementById('todo');
  const formLocation = document.getElementById('add-todo');
  const btnLocation = document.getElementById('add-button');
  const myDOM = new TodoListDom(tableLocation, formLocation, btnLocation);
  formLocation.children[0].value = 'Write Essay';
  formLocation.children[1].value = 2;
  formLocation.submit();
  myDOM.onSessionComplete();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[1/ *2\\]'));
});
