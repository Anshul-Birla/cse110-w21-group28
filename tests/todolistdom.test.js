import { TodoListDom } from '../js/ToDoList/TodoListDom.js';

/** @Test {ToDoList} */
let tableLocation;
let formLocation;
let addBtnLocation;
let deleteBtnLocation;
let myDOM;

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
      <button id = "delete-all-button" class="deleteAllButton" type="button">Delete All</button>
    </div> `;
  tableLocation = document.getElementById('todo');
  formLocation = document.getElementById('add-todo');
  addBtnLocation = document.getElementById('add-button');
  deleteBtnLocation = document.getElementById('delete-all-button');
  myDOM = new TodoListDom(tableLocation, formLocation, addBtnLocation, deleteBtnLocation);
});

test('Valid construction of TDLDom', () => {
  expect(myDOM.todoList.taskList).toEqual([]);
});

test('Add a task and click checkoff', () => {
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[0/ *2\\]'));
  tableLocation.children[1].children[0].children[0].click();
});

test('Reload the page with local storage', () => {
  expect(tableLocation.children[1].taskText.textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].pomoSessions.textContent).toMatch(new RegExp('\\[0/ *2\\]'));
});

test('Reload the page with completed task', () => {
  expect(tableLocation.children[1].checked).toEqual(true);
});

// Now has a task
test('Clicking remove button should remove task from table and local storage', () => {
  tableLocation.children[1].children[3].children[0].click();
  expect(tableLocation.children[1]).toEqual(undefined);
  expect(window.localData.length).toEqual(0);
  localStorage.clear();
});

test('Incrementing session updates value accordingly', () => {
  formLocation.children[0].value = 'Write Essay';
  formLocation.children[1].value = 2;
  formLocation.submit();
  myDOM.onSessionComplete();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[1/ *2\\]'));
  localStorage.clear();
});

test('Addding an invalid task causes an alert', () => {
  global.alert = jest.fn();
  formLocation.submit();
  expect(global.alert).toHaveBeenCalledTimes(1);
});

test('Delete all should remove from table and local storage', () => {
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  deleteBtnLocation.click();
  expect(tableLocation.children[1]).toEqual(undefined);
  expect(window.localData.length).toEqual(0);
  localStorage.clear();
});
