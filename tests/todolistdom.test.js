import { TodoListDom } from '../js/ToDoList/TodoListDom.js';

/** @Test {ToDoList} */
var tableLocation;
var formLocation;
var btnLocation;
var myDOM;

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
    tableLocation = document.getElementById('todo');
    formLocation = document.getElementById('add-todo');
    btnLocation = document.getElementById('add-button');
    myDOM = new TodoListDom(tableLocation, formLocation, btnLocation);
});

test('Valid construction of TDLDom', () => {
  expect(myDOM.todoList.taskList).toEqual([]);
});

test('Add a task', () => {
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[0/ *2\\]'));
});

test('Reload the page with local storage', () => {
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[0/ *2\\]'));
});

//Now has a task
test('click remove button', () => {
  tableLocation.children[1].children[3].click();
  expect(tableLocation.children[1]).toEqual(undefined);
  expect(window.localData.length).toEqual(0);
  localStorage.clear();
});

test('Increment session ', () => {
  formLocation.children[0].value = 'Write Essay';
  formLocation.children[1].value = 2;
  formLocation.submit();
  myDOM.onSessionComplete();
  expect(tableLocation.children[1].children[1].textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('\\[1/ *2\\]'));
  localStorage.clear();
});

test('Show and hide form', () => {
  btnLocation.click();
  expect(formLocation.getAttribute('style')).toEqual('');
  btnLocation.click();
  expect(formLocation.getAttribute('style')).toEqual('display: none;');
  localStorage.clear();
});
