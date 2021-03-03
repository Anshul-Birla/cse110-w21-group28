import { Statistics } from '../js/Statistics/Statistics.js';

/** @Test {ToDoList} */

let Stats = new Statistics();
beforeEach(() => {
  Stats = new Statistics();
  document.body.innerHTML = '<div id="parentDiv">'
    + '</div>';
});

afterEach(() => {
  localStorage.clear();
});

describe('Variables function correctly', () => {
  test('Everything is initialized to zeroes', () => {
    expect(Stats.totalMins).toBe(0);
    expect(Stats.workMins).toBe(0);
    expect(Stats.tasksCompleted).toBe(0);
    expect(Stats.numDistractions).toBe(0);
    expect(Stats.distractionList.length).toBe(0);
    expect(Stats.expectedPomoSessions).toBe(0);
    expect(Stats.actualPomoSessions).toBe(0);
  });

  test('Task completion increments count correctly', () => {
    Stats.incrementTasksCompleted();
    expect(Stats.tasksCompleted).toBe(1);
    for (let i = 0; i < 4; i += 1) {
      Stats.incrementTasksCompleted();
    }
    expect(Stats.tasksCompleted).toBe(5);
  });

  test('Actual Pomo Session increments count correctly', () => {
    Stats.incrementActualPomoSessions();
    expect(Stats.actualPomoSessions).toBe(1);
    for (let i = 0; i < 4; i += 1) {
      Stats.incrementActualPomoSessions();
    }
    expect(Stats.actualPomoSessions).toBe(5);
  });

  test('Estimated Pomo Session increments count correctly', () => {
    Stats.addExpectedPomoSessions(5);
    expect(Stats.expectedPomoSessions).toBe(5);
    for (let i = 0; i < 4; i += 1) {
      Stats.addExpectedPomoSessions(2);
    }
    expect(Stats.expectedPomoSessions).toBe(13);
  });

  test('Time Spent increments count correctly', () => {
    Stats.addTimeSpent(5);
    expect(Stats.totalMins).toBe(5);
    Stats.addTimeSpent(25);
    expect(Stats.totalMins).toBe(30);
    Stats.addTimeSpent(15);
    expect(Stats.totalMins).toBe(45);
  });

  test('Work time increments work time count correctly', () => {
    Stats.addWorkTime(5);
    expect(Stats.workMins).toBe(5);
    Stats.addWorkTime(25);
    expect(Stats.workMins).toBe(30);
    Stats.addWorkTime(15);
    expect(Stats.workMins).toBe(45);
  });

  test('Work time increments time spent count correctly', () => {
    Stats.addWorkTime(5);
    expect(Stats.totalMins).toBe(5);
    Stats.addWorkTime(25);
    expect(Stats.totalMins).toBe(30);
    Stats.addWorkTime(15);
    expect(Stats.totalMins).toBe(45);
  });

  test('Work time increments time spent independently of work time', () => {
    Stats.addWorkTime(5);
    expect(Stats.totalMins).toBe(5);
    expect(Stats.workMins).toBe(5);
    Stats.addTimeSpent(10);
    expect(Stats.totalMins).toBe(15);
    expect(Stats.workMins).toBe(5);
    Stats.addWorkTime(25);
    expect(Stats.totalMins).toBe(40);
    expect(Stats.workMins).toBe(30);
  });

  test('Average time per task works correctly, completed tasks exist', () => {
    for (let i = 0; i < 5; i += 1) {
      Stats.incrementTasksCompleted();
    }

    expect(Stats.tasksCompleted).toBe(5);
    expect(Stats.getAverageTimePerTask()).toBe(0);

    Stats.addWorkTime(10);

    expect(Stats.getAverageTimePerTask()).toBe(2);

    Stats.addTimeSpent(20);

    expect(Stats.getAverageTimePerTask()).toBe(2);

    for (let i = 0; i < 5; i += 1) {
      Stats.incrementTasksCompleted();
    }

    expect(Stats.getAverageTimePerTask()).toBe(1);
  });

  test('Average time per task works correctly, completed tasks DO NOT exist', () => {
    expect(Stats.getAverageTimePerTask()).toBe(0);
    Stats.addWorkTime(20);
    expect(Stats.getAverageTimePerTask()).toBe(0);
    Stats.incrementTasksCompleted();
    expect(Stats.getAverageTimePerTask()).toBe(20);
  });

  test('Distractions stored correctly', () => {
    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });

    Stats.addDistraction({
      name: 'second distraction',
      date: new Date(2021, 3, 3, 10, 35),
      pomoSessionId: 1,
    });

    Stats.addDistraction({
      name: 'third distraction',
      date: new Date(2021, 3, 3, 10, 40),
      pomoSessionId: 1,
    });

    expect(Stats.distractionList[0].name).toEqual('first distraction');
  });

  test('Unique distractions calculated correctly', () => {
    expect(Stats.getNumUniqueDistractions()).toBe(0);

    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });

    expect(Stats.getNumUniqueDistractions()).toBe(1);

    Stats.addDistraction({
      name: 'second distraction',
      date: new Date(2021, 3, 3, 10, 35),
      pomoSessionId: 1,
    });

    expect(Stats.getNumUniqueDistractions()).toBe(2);

    Stats.addDistraction({
      name: 'third distraction',
      date: new Date(2021, 3, 3, 10, 40),
      pomoSessionId: 1,
    });

    expect(Stats.getNumUniqueDistractions()).toBe(2);
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
