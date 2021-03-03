/* eslint-disable eqeqeq */
import { Task } from '../js/ToDoList/Task.js';
import { classNames } from '../js/ToDoList/TaskVariables.js';

beforeEach(() => {
  window.localData = [];
});

test('Test that task with no values is empty', () => {
  const currTask = new Task();
  expect(currTask.name).toBe(undefined);
  expect(currTask.checked).toBe(false);
  expect(currTask.currentSessionNum).toEqual(0);
  expect(currTask.totalSessions).toBe(undefined);
  expect(currTask.id == 'undefined').toBeTruthy();
});

test('Test that task with initialized values is initialized correctly', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.checked).toBe(false);
  expect(currTask.currentSessionNum).toEqual(0);
  expect(currTask.totalSessions).toEqual(5);
  expect(currTask.id == 0).toBe(true);
  expect(currTask.className).toBe(classNames.uncheckedTaskClassName);
  expect(currTask.checkBox.checked).toBe(false);
});

test('Test that task with optional initilized values is initialized correctly', () => {
  const currTask = new Task(0, 'Test task', 5, 2, true);
  expect(currTask.name).toBe('Test task');
  expect(currTask.checked).toBe(true);
  expect(currTask.currentSessionNum).toEqual(2);
  expect(currTask.totalSessions).toEqual(5);
  expect(currTask.id == 0).toBe(true);
  expect(currTask.className).toBe(classNames.completedTaskClassName);
  expect(currTask.checkBox.checked).toBe(true);
});

test('Increment counter only changes current session number', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id == 0).toBeTruthy();
  expect(currTask.checked).toBe(false);
  currTask.incrementSession();
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(1);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id == 0).toBeTruthy();
  expect(currTask.checked).toBe(false);
});


test('Incrementing past totalSessions is OK', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id == 0).toBeTruthy();
  for (let i = 0; i < 6; i += 1) {
    currTask.incrementSession();
  }
  expect(currTask.currentSessionNum).toBe(6)
  expect(currTask.checked).toBe(false)
});

test('Test that Checkbox works properly', () => {
  const currTask = new Task(0, 'Test task', 5);
  currTask.checkBox.click();
  expect(currTask.checked).toBe(true);
  expect(currTask.className).toBe(classNames.completedTaskClassName);
});

