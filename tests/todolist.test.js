import { ToDoList } from '../js/ToDoList/ToDoList.js';

/** @Test {ToDoList} */

beforeEach(() => {
  window.localData = [];
  document.body.innerHTML = '<div id="ToDoListDiv>'
    + '</div>';
});

test('Construction of empty list', () => {
  const theList = new ToDoList();
  expect(theList.taskList).toEqual([]);
});

test('Valid construction of new list in HTML', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  expect(aList.taskList).toEqual([]);
});

test('Adding Items to List', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  aList.addTask('First Task', 5);
  expect(aList.taskList.length).toBe(1);
  aList.addTask('Second Task', 2);
  expect(aList.taskList.length).toBe(2);
});

test('Adding 0 Pomo Length Task', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const errTask = () => { aList.addTask('First Task', 0); };
  expect(errTask).toThrow('0 Length Task');
});

test('Adding undefined Pomo Length Task', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const errTask = () => { aList.addTask('First Task', undefined); };
  expect(errTask).toThrow('Undefined Length Task');
});

test('Adding Task w/o name', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const errTask = () => { aList.addTask(undefined, 4); };
  expect(errTask).toThrow('Undefined Name');
});

test('Adding Task w/ empty name', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const errTask = () => { aList.addTask('', 4); };
  expect(errTask).toThrow('Empty Name');
});

test('Adding Task w/ NaN for PomoSession', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const errTask = () => { aList.addTask('TempTask', NaN); };
  expect(errTask).toThrow('Number Not Passed In');
});

test('Get currentTask', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  aList.addTask('First Task', 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe('First Task');
});

test('Get currentTask on empty list', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const currTask = () => { aList.getCurrentTask(); };
  expect(currTask).toThrow('Empty ToDo List');
});

test('Get currentTask on list with all completed elements', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  aList.addTask('First Task', 5);
  aList.getCurrentTask().checkOffTask();
  const currTask = () => { aList.getCurrentTask(); };
  expect(currTask).toThrow('No Current Task');
});

test('Preserve special characters in task name', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  // eslint-disable-next-line no-template-curly-in-string
  const strName = 'A s^ri\ng w!t\\n spe`cia| "some ver${this.id}y special" chara%cter$';
  aList.addTask(strName, 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe(strName);
});
