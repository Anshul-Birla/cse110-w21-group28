import { Statistics } from '../js/Statistics/Statistics.js';
import { buttonText } from '../js/Timer/TimerVariables.js';

/** @Test {ToDoList} */

document.body.innerHTML += "<div id='overlay'></div>"
+ "<div class ='tab'>"
+ "<button class='tab-btn' id='data' > Data </button>"
+ "<button class='tab-btn' id='distraction'> Distraction </button>"
+ '</div>'
+ "<div id='stats-info' class='stats-info-container'>"
+ '</div>';
let Stats = new Statistics();
beforeEach(() => {
  document.body.innerHTML += "<div id='overlay'></div>"
  + "<div class ='tab'>"
  + "<button class='tab-btn' id='data' > Data </button>"
  + "<button class='tab-btn' id='distraction'> Distraction </button>"
  + '</div>'
  + "<div id='stats-info' class='stats-info-container'>"
  + '</div>';
  Stats = new Statistics();
});

afterEach(() => {
  localStorage.clear();
});

test('statsTab Button calls event listener', () => {
  const btn = document.getElementById('data');
  btn.click();
  expect(btn.className).toBe('tab-btn-active');
});

test('Call to update dom updates text content correctly', () => {
  Stats.totalMins = 15;
  Stats.updateDom();
  expect(Stats.timeSpent.textContent).toBe('15');
});

describe('Variables function correctly', () => {
  test('Task completion increments count correctly', () => {
    Stats.incrementTasksCompleted();
    expect(Stats.tasksCompleted).toBe(1);
    for (let i = 0; i < 4; i += 1) {
      Stats.incrementTasksCompleted();
    }
    expect(Stats.tasksCompleted).toBe(5);
  });

  test('Task un-completion decrements count correctly', () => {
    for (let i = 0; i <= 4; i += 1) {
      Stats.incrementTasksCompleted();
    }
    Stats.decrementTasksCompleted();
    expect(Stats.tasksCompleted).toBe(4);
    for (let i = 0; i < 3; i += 1) {
      Stats.decrementTasksCompleted();
    }
    expect(Stats.tasksCompleted).toBe(1);
    Stats.decrementTasksCompleted();
    expect(Stats.tasksCompleted).toBe(0);
    Stats.decrementTasksCompleted();
    expect(Stats.tasksCompleted).toBe(0);
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

  test('Estimated Pomo Session decrements count correctly', () => {
    for (let i = 0; i <= 4; i += 1) {
      Stats.addExpectedPomoSessions(2);
    }
    expect(Stats.expectedPomoSessions).toBe(10);
    for (let i = 0; i < 4; i += 1) {
      Stats.deleteExpectedPomoSessions(2);
    }
    expect(Stats.expectedPomoSessions).toBe(2);
    Stats.deleteExpectedPomoSessions(2);
    expect(Stats.expectedPomoSessions).toBe(0);
    Stats.deleteExpectedPomoSessions(5);
    expect(Stats.expectedPomoSessions).toBe(0);
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
    Stats.updateDistractionList();

    Stats.addDistraction({
      name: 'third distraction',
      date: new Date(2021, 3, 3, 10, 40),
      pomoSessionId: 1,
    });
    Stats.updateDistractionList();

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

  test('Distractions per task calculated correctly', () => {
    expect(Stats.getAvgDistractionsPerTask()).toBe(0);

    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });

    expect(Stats.getAvgDistractionsPerTask()).toBe(0);
    Stats.incrementTasksCompleted();
    expect(Stats.getAvgDistractionsPerTask()).toBe(1);

    Stats.addDistraction({
      name: 'second distraction',
      date: new Date(2021, 3, 3, 10, 35),
      pomoSessionId: 1,
    });

    expect(Stats.getAvgDistractionsPerTask()).toEqual(2);
    Stats.incrementTasksCompleted();
    expect(Stats.getAvgDistractionsPerTask()).toBe(1);

    Stats.addDistraction({
      name: 'third distraction',
      date: new Date(2021, 3, 3, 10, 40),
      pomoSessionId: 1,
    });

    Stats.addDistraction({
      name: 'fourth distraction',
      date: new Date(2021, 3, 3, 10, 45),
      pomoSessionId: 1,
    });
    expect(Stats.getAvgDistractionsPerTask()).toBe(2);

    for (let i = 0; i < 4; i += 1) {
      Stats.incrementTasksCompleted();
    }

    expect(Stats.getAvgDistractionsPerTask()).toEqual(0.7); // ROUNDED FROM 0.67
  });

  test('flushLocalStorage deletes all data older than a year', () => {
    Stats.history.push({ // a few days ago
      date: new Date(2021, 2, 3, 10, 35),
      distractionCount: 1,
      timeSpent: 1,
    });
    Stats.history.push({ // a few months ago (same year)
      date: new Date(2021, 0, 1, 10, 35),
      distractionCount: 1,
      timeSpent: 1,
    });
    Stats.history.push({ // a few months ago (previous year)
      date: new Date(2020, 2, 3, 10, 35),
      distractionCount: 1,
      timeSpent: 1,
    });
    Stats.history.push({ // more than a year ago (barely)
      date: new Date(2020, 2, 1, 10, 35),
      distractionCount: 1,
      timeSpent: 1,
    });
    Stats.flushHistory();
    expect(Stats.history.length).toBe(3);
  });

  test('Data compression trigger works', () => {
    localStorage.setItem('startDateTime', new Date(2020, 0, 1));
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeTruthy();
    localStorage.setItem('startDateTime', new Date(2021, 2, 11));
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeTruthy();
    localStorage.setItem('startDateTime', new Date(2021, 2, 10));
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeTruthy();
    localStorage.setItem('startDateTime', new Date(2021, 1, 11));
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeTruthy();
    const today = new Date();
    localStorage.setItem('startDateTime', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 1, 0, 0));
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeTruthy();
    localStorage.setItem('startDateTime', new Date());
    Stats = new Statistics();
    expect(Stats.dataToCompressExists()).toBeFalsy();
  });

  test('clearData resets all values', () => {
    Stats.workMins = 10;
    Stats.totalMins = 50;
    Stats.tasksCompleted = 11;
    expect(Stats.workMins).toBe(10);
    Stats.clearData();
    expect(Stats.totalMins).toBe(0);
    expect(Stats.workMins).toBe(0);
    expect(Stats.tasksCompleted).toBe(0);
    expect(Stats.distractionList.length).toBe(0);
    expect(Stats.expectedPomoSessions).toBe(0);
    expect(Stats.actualPomoSessions).toBe(0);
  });
});

describe('local storage tests', () => {
  beforeEach(() => {
    document.body.innerHTML += "<div id='overlay'></div>"
    + "<div class ='tab'>"
    + "<button class='tab-btn' id='data' > Data </button>"
    + "<button class='tab-btn' id='distraction'> Distraction </button>"
    + '</div>'
    + "<div id='stats-info' class='stats-info-container'>"
    + '</div>';
    Stats = new Statistics();
    localStorage.clear();
  });

  test('Everything is initialized to zeroes', () => {
    expect(Stats.totalMins).toBe(0);
    expect(Stats.workMins).toBe(0);
    expect(Stats.tasksCompleted).toBe(0);
    expect(Stats.distractionList.length).toBe(0);
    expect(Stats.expectedPomoSessions).toBe(0);
    expect(Stats.actualPomoSessions).toBe(0);
  });

  test('non-empty local storage initialized correctly', () => {
    localStorage.setItem('totalMins', 1);
    localStorage.setItem('workMins', 2);
    localStorage.setItem('tasksCompleted', 3);
    localStorage.setItem('expectedPomoSessions', 4);
    localStorage.setItem('actualPomoSessions', 5);
    localStorage.setItem('currDistractionList', JSON.stringify([{
      name: 'fourth distraction',
      date: new Date(2021, 3, 3, 10, 45),
      pomoSessionId: 1,
    }]));
    Stats = new Statistics();
    expect(Stats.totalMins).toBe(1);
    expect(Stats.workMins).toBe(2);
    expect(Stats.tasksCompleted).toBe(3);
    expect(Stats.distractionList.length).toBe(1);
    expect(Stats.expectedPomoSessions).toBe(4);
    expect(Stats.actualPomoSessions).toBe(5);
  });

  test('Data compresses as expected', () => {
    expect(Stats.history.length).toBe(0);
    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });
    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });
    Stats.addDistraction({
      name: 'first distraction',
      date: new Date(2021, 3, 3, 10, 30),
      pomoSessionId: 0,
    });
    Stats.totalMins = 10;
    Stats.compressStats();
    let temp = JSON.parse(localStorage.getItem('statsHistory'));
    expect(temp.length).toBe(1);
    Stats.compressStats();
    temp = JSON.parse(localStorage.getItem('statsHistory'));
    expect(temp.length).toBe(2);
    expect(temp[0].timeSpent).toBe(10);
  });
});

test('Distraction Tab Button Pressed, all Data tab items hidden', () => {
  Stats = new Statistics();

  const content = document.getElementsByClassName('stats-info');
  const contentlabel = document.getElementsByClassName('stats-info-label');
  const btn = document.getElementById('distraction');
  btn.click();
  for (let i = 0; i < content.length; i += 1) {
    expect(content[i].style.display).toBe('none');
    expect(contentlabel[i].style.display).toBe('none');
  }
});
