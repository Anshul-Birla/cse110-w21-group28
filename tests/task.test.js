import { Task } from '../js/ToDoList/Task.js';

/** @Test {Task} */
test('Test that task with no values is empty', () => {
  const currTask = new Task();
  expect(currTask.name).toBe(undefined);
  expect(currTask.checked).toBe(false);
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(undefined);
  expect(currTask.id).toBe(undefined);
});

test('Test that task with initialized values is initialized correctly', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.checked).toBe(false);
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
});

test('Increment counter only changes current session number', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
  expect(currTask.checked).toBe(false);
  currTask.incrementSession();
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(1);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
  expect(currTask.checked).toBe(false);
});

test('Increment counter works up to total sessions, task is completed at the end', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
  for (let i = 0; i < 5; i += 1) {
    currTask.incrementSession();
  }
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(5);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
  expect(currTask.checked).toBe(true);
});

test('Error is thrown after incrementing past totalSessions', () => {
  const currTask = new Task(0, 'Test task', 5);
  expect(currTask.name).toBe('Test task');
  expect(currTask.currentSessionNum).toBe(0);
  expect(currTask.totalSessions).toBe(5);
  expect(currTask.id).toBe(0);
  for (let i = 0; i < 5; i += 1) {
    currTask.incrementSession();
  }
  const taskIncSession = () => { currTask.incrementSession(); };
  expect(taskIncSession).toThrow(RangeError);
});
