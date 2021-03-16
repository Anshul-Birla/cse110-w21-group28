import { ToDoList } from '../js/ToDoList/ToDoList.js';
import { Task } from '../js/ToDoList/Task';

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
  expect(aList.getCurrentTask()).toBe(null);
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
  document.body.addEventListener('task-deleted', (e) => {
    aList.removeTask(e.detail.taskID);
  });
  const aList = new ToDoList();
  aList.addTask('task1', 1);
  aList.addTask('task2', 2);
  const task1 = aList.getCurrentTask();
  task1.deleteButton.click();
  const currTask = aList.getCurrentTask();
  expect(currTask.name).toBe('task2');
  expect(currTask.totalSessions).toBe(2);
});

test('Getting task by ID returns task if present', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  let returnedTask = aList.getTaskById('0');
  expect(returnedTask.name).toBe('name');
  returnedTask = aList.getTaskById('1');
  expect(returnedTask.name).toBe('name2');
});

test('Getting task by ID returns null if task not present', () => {
  const aList = new ToDoList();
  aList.addTask('name', 2);
  aList.addTask('name2', 2);
  const returnedTask = aList.getTaskById('not present');
  expect(returnedTask).toBe(null);
});

test('Deleting task by ID returns deletes task when present', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  const ret = aList.removeTask('0');
  expect(ret).toBe(true);
  const returnedTask = aList.getTaskById('0');
  expect(returnedTask).toBe(null);
});

test('Deleting task by ID returns false if task not present', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  const ret = aList.removeTask('nonexistant');
  expect(ret).toBe(false);
});

test('Move task to top of todolist', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  const task = new Task('new', 'newtask', 2);
  aList.addTaskToTop(task);
  expect(aList.taskList[0]).toBe(task);
});

test('Adding completed task to end of todolist', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  const checkedTask = new Task('2', 'unchecked', 4, 0, true);
  aList.addTaskToEnd(checkedTask);
  expect(aList.taskList[2]).toBe(checkedTask);
});

test('Adding unchecked task to end of todolist', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  aList.addTask('name3', 1);
  aList.addTask('name4', 1);
  aList.addTask('name5', 2, 1, true, true);
  aList.addTask('name6', 2, 1, true, true);
  const uncheckedTask = new Task('10', 'checked', 4, 0, false);
  aList.addTaskToEnd(uncheckedTask);
  expect(aList.taskList[4]).toBe(uncheckedTask);
});

test('Adding unchecked task to end of todolist when no checked tasks exist', () => {
  const aList = new ToDoList();
  aList.addTask('name', 1);
  aList.addTask('name2', 1);
  aList.addTask('name3', 1);
  aList.addTask('name4', 1);
  const uncheckedTask = new Task('10', 'checked', 4, 0, false);
  aList.addTaskToEnd(uncheckedTask);
  expect(aList.taskList[4]).toBe(uncheckedTask);
});
