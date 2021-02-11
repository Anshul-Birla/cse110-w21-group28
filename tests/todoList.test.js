import { ToDoList } from '../js/ToDoList/ToDoList.js';

/** @Test {ToDoList} */

beforeEach(() => {
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

test('Get currentTask', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  aList.addTask('First Task', 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe('First Task');
});

test('Preserve special characters in task name', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  const strName = 'A s^ri\ng w!t\\n spe`cia| "some very special" chara%cter$';
  aList.addTask(strName, 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe(strName);
});

test('Check off task', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList(listLocation);
  for (let i = 1; i < 12; i += 1) {
    aList.addTask(`task ${i}`, i);
  }
  aList.checkOffTask(7);
  expect(aList.taskList[7].checked).toBe(true);
});
