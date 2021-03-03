import { Statistics } from '../js/Statistics/Statistics.js';

/** @Test {ToDoList} */

beforeEach(() => {
  const Stats = new Statistics();
});

afterEach(() => {
  localStorage.clear();
});

describe('Variables function correctly', () => {
  test('Everything is initialized to zeroes', () => {
    // TODO
  });

  test('Task completion increments count correctly', () => {
    // TODO
  });

  test('Time Spent increments count correctly', () => {
    // TODO
  });

  test('Work time increments work time count correctly', () => {
    // TODO
  });

  test('Work time increments time spent count correctly', () => {
    // TODO
  });

  test('Work time increments time spent count correctly', () => {
    // TODO
  });

  test('Average time per task works correctly, completed tasks exist', () => {
    // TODO
  });

  test('Average time per task works correctly, completed tasks DO NOT exist', () => {
    // TODO
  });
});

describe('local storage tests', () => {
  test('empty local storage initialized correctly', () => {
    // TODO
  });

  test('Distraction compression commits earliest distraction date', () => {
    // TODO
  });

  test('Flush local storage deletes tasks stricly older than one year', () => {
    // TODO
  });
});
