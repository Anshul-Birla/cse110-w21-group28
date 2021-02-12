import { Timer } from '../js/Timer/timer';
import { workMode, shortBreakMode, longBreakMode } from '../js/Timer/timerModes';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
});

test('Test Initial State is Nothing', () => {
  const TimerObj = new Timer(null, null);
  expect(TimerObj.state).toBe('');
});

test('Test First Iteration of Timer', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + ' <p id="displayStatus"></p>'
  + '</div>';

  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const TimerObj = new Timer(displayTime, displayStatus);
  TimerObj.startTimer();
  expect(TimerObj.state).toBe(workMode.name);
});

test('Test That Queue Gets Updated During Second Iteration Of Timer', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + ' <p id="displayStatus"></p>'
  + '</div>';

  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const TimerObj = new Timer(displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();

  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(TimerObj.stateQueue[0]).toBe(shortBreakMode);
  expect(TimerObj.stateQueue[4]).toBe(longBreakMode);
});

test('Test That HTML Gets Updated During Second ', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + ' <p id="displayStatus"></p>'
  + '</div>';

  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const TimerObj = new Timer(displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();

  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(displayStatus.textContent).toBe(shortBreakMode.name);
  expect(displayTime.textContent).toBe(`${shortBreakMode.duration}:00`);
});
