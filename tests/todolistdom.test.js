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
  document.body.addEventListener('task-deleted', (e) => {
    myDOM.todoList.removeTask(e.detail.taskID);
  });
});

test('Valid construction of TDLDom', () => {
  expect(myDOM.todoList.taskList).toEqual([]);
});

test('TodoList can function without any tasks', () => {
  const currentTaskFunction = () => { myDOM.updateCurrentTask(); };
  expect(currentTaskFunction).not.toThrow(Error);
  const sessionCompleteFunction = () => { myDOM.onSessionComplete(); };
  expect(sessionCompleteFunction).not.toThrow(Error);
});

test('Add a task and click checkoff', () => {
  formLocation.children[0].setAttribute('value', 'Write Essay');
  formLocation.children[1].value = 2;
  formLocation.submit();
  expect(tableLocation.children[1].taskText.textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].pomoSessions.textContent).toMatch(new RegExp('0/ *2'));
  tableLocation.children[1].checkBox.click();
  expect(tableLocation.children[1].checkBox.checked).toBe(true);
  expect(tableLocation.children[1].checkBox.disabled).toBe(false);
});

test('Reload the page with local storage', () => {
  expect(tableLocation.children[1].taskText.textContent).toMatch(new RegExp('Write *Essay'));
  expect(tableLocation.children[1].pomoSessions.textContent).toMatch(new RegExp('0/ *2'));
});

test('Reload the page with completed task', () => {
  expect(tableLocation.children[1].checked).toEqual(true);
});

// Now has a task
test('Clicking remove button should remove task from table and local storage', () => {
  tableLocation.children[1].deleteButton.click();
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
  expect(tableLocation.children[1].children[2].textContent).toMatch(new RegExp('1/ *2'));
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
});

test('Focus Button should reorder the tasks when no tasks are checked off', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  myDOM.onFocusTask('1');
  expect(myDOM.todoList.getCurrentTask().name).toBe('Task2');
  expect(myDOM.todoList.taskList[1].name).toBe('Task1');
  localStorage.clear();
});

test('Focus Button should reorder the tasks even if tasks are checked off', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task3');
  formLocation.children[1].value = 2;
  formLocation.submit();
  tableLocation.children[2].checkBox.click();
  myDOM.onFocusTask('2');
  expect(myDOM.todoList.getCurrentTask().name).toBe('Task3');
  expect(myDOM.todoList.taskList[1].name).toBe('Task1');
  localStorage.clear();
});

test('Focus Button should reorder the tasks even if tasks are deleted', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task3');
  formLocation.children[1].value = 2;
  formLocation.submit();
  tableLocation.children[2].deleteButton.click();
  myDOM.onFocusTask('2');
  expect(myDOM.todoList.getCurrentTask().name).toBe('Task3');
  expect(myDOM.todoList.taskList[1].name).toBe('Task1');
  localStorage.clear();
});

test('Current Task gets updated when focus button is clicked', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task3');
  formLocation.children[1].value = 2;
  formLocation.submit();

  myDOM.onFocusTask('1');
  myDOM.updateCurrentTask();
  expect(myDOM.currentTask.name).toBe('Task2');
  localStorage.clear();
});

test('Adding first task should not disable the checkbox', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  expect(tableLocation.children[1].checkBox.disabled).toBe(false);
  localStorage.clear();
});

test('Adding two tasks should disable the checkbox for second task', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();

  expect(tableLocation.children[1].checkBox.disabled).toBe(false);
  expect(tableLocation.children[2].checkBox.disabled).toBe(true);
  localStorage.clear();
});

test('Focusing on a task updates checkboxes accordingly', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();

  myDOM.onFocusTask('1');
  myDOM.updateCurrentTask();

  expect(tableLocation.children[1].checkBox.disabled).toBe(false);
  expect(tableLocation.children[1].taskText.textContent).toBe('Task2');
  expect(tableLocation.children[2].checkBox.disabled).toBe(true);
  localStorage.clear();
});

test('Checking a task brings it to the bottom', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  myDOM.onCompletedTask();

  expect(tableLocation.children[2].taskText.textContent).toBe('Task1');
  localStorage.clear();
});

test('Checking a task brings it to the bottom with completed tasks already there', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task3');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task4');
  formLocation.children[1].value = 2;
  formLocation.submit();

  tableLocation.children[1].checked = true;
  myDOM.onCompletedTask();
  myDOM.updateCurrentTask();
  myDOM.onCompletedTask();

  expect(tableLocation.children[4].taskText.textContent).toBe('Task2');
  expect(tableLocation.children[3].taskText.textContent).toBe('Task1');
  expect(tableLocation.children[2].taskText.textContent).toBe('Task4');
  expect(tableLocation.children[1].taskText.textContent).toBe('Task3');

  localStorage.clear();
});

test('Unchecking a task brings it to the bottom of the unchecked tasks', () => {
  formLocation.children[0].setAttribute('value', 'Task1');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task2');
  formLocation.children[1].value = 2;
  formLocation.submit();
  formLocation.children[0].setAttribute('value', 'Task3');
  formLocation.children[1].value = 2;
  formLocation.submit();

  tableLocation.children[1].checked = true;
  myDOM.onCompletedTask();
  myDOM.updateCurrentTask();
  tableLocation.children[1].checked = true;
  myDOM.onCompletedTask();
  myDOM.updateCurrentTask();
  tableLocation.children[3].checked = false;
  myDOM.onUncheckedTask(tableLocation.children[3].id);
  myDOM.updateCurrentTask();

  expect(tableLocation.children[1].taskText.textContent).toBe('Task3');
  expect(tableLocation.children[2].taskText.textContent).toBe('Task2');
  expect(tableLocation.children[3].taskText.textContent).toBe('Task1');
  expect(myDOM.todoList.taskList[0].taskText.textContent).toBe('Task3');
  expect(myDOM.todoList.taskList[1].taskText.textContent).toBe('Task2');
  expect(myDOM.todoList.taskList[2].taskText.textContent).toBe('Task1');
});
