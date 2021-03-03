import { ToDoList } from '../js/ToDoList/ToDoList.js';
import { Task } from '../js/ToDoList/Task'

/** @Test {ToDoList} */

beforeEach(() => {
  window.localData = [];
});

test('Construction of empty list', () => {
  const theList = new ToDoList();
  expect(theList.taskList).toEqual([]);
});

test('Valid construction of new list in HTML', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList();
  expect(aList.taskList).toEqual([]);
});

test('Adding Items to List', () => {
  const listLocation = document.getElementById('ToDoListDiv');
  const aList = new ToDoList();
  aList.addTask('First Task', 5);
  expect(aList.taskList.length).toBe(1);
  aList.addTask('Second Task', 2);
  expect(aList.taskList.length).toBe(2);
});

test('Adding 0 Pomo Length Task', () => {
  const aList = new ToDoList();
  const errTask = () => { aList.addTask('First Task', 0); };
  expect(errTask).toThrow('0 Length Task');
});

test('Adding undefined Pomo Length Task', () => {
  const aList = new ToDoList();
  const errTask = () => { aList.addTask('First Task', undefined); };
  expect(errTask).toThrow('Undefined Length Task');
});

test('Adding Task w/o name', () => {
  const aList = new ToDoList();
  const errTask = () => { aList.addTask(undefined, 4); };
  expect(errTask).toThrow('Undefined Name');
});

test('Adding Task w/ empty name', () => {
  const aList = new ToDoList();
  const errTask = () => { aList.addTask('', 4); };
  expect(errTask).toThrow('Empty Name');
});

test('Adding Task w/ NaN for PomoSession', () => {
  const aList = new ToDoList();
  const errTask = () => { aList.addTask('TempTask', NaN); };
  expect(errTask).toThrow('Number Not Passed In');
});

test('Get currentTask', () => {
  const aList = new ToDoList();
  aList.addTask('First Task', 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe('First Task');
});

test('Get currentTask on empty list should be null', () => {
  const aList = new ToDoList();
  expect(aList.getCurrentTask()).toBe(null)
});

test('Get currentTask on list with all completed elements should be null', () => {
  const aList = new ToDoList();
  aList.addTask('First Task', 5);
  aList.getCurrentTask().checkOffTask();
  expect(aList.getCurrentTask()).toBe(null);
});

test('Preserve special characters in task name', () => {
  const aList = new ToDoList();
  // eslint-disable-next-line no-template-curly-in-string
  const strName = 'A s^ri\ng w!t\\n spe`cia| "some ver${this.id}y special" chara%cter$';
  aList.addTask(strName, 5);
  aList.addTask('Second Task', 2);
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe(strName);
});

test('Deleted Task do not come up as current task', () => {
  const aList = new ToDoList();
  aList.addTask("task1", 1);
  aList.addTask("task2", 2);
  let task1 = aList.getCurrentTask();
  task1.deleteButton.click()
  let currTask = aList.getCurrentTask();
  expect(currTask.name).toBe("task2");
  expect(currTask.totalSessions).toBe(2);

});
