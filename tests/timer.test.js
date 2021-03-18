import { Timer } from '../js/Timer/Timer';
import {
  workMode, shortBreakMode, longBreakMode, buttonText,
} from '../js/Timer/TimerVariables';

beforeEach(() => {
  window.localData = [];
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + ' <p id="displayStatus"></p>'
  + '<button id=start>Start</button>'
  + '</div>';
  jest.useFakeTimers();
  jest.clearAllTimers();
});

test('Test Initial State is Nothing', () => {
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, null, null);
  expect(TimerObj.state).toBe('');
});

test('Test First Iteration of Timer', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  TimerObj.startTimer();
  expect(TimerObj.state).toBe(workMode.name);
});

test('Test That Queue Gets Updated During Second Iteration Of Timer', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();

  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(TimerObj.stateQueue[0]).toBe(shortBreakMode);
  expect(TimerObj.stateQueue[6]).toBe(longBreakMode);
});

test('Test That HTML Gets Updated During Second ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();
  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(displayStatus.textContent).toBe(shortBreakMode.name);
  expect(displayTime.textContent).toBe(`${shortBreakMode.duration}:00`);
});

test('Test That Start Button Functions Properly ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  expect(button.textContent).toBe(buttonText.stopTimerText);
});

test('Test That Clicking Start Twice Changes HTML ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  button.click();
  expect(TimerObj.startButton.textContent.indexOf(buttonText.startTimerText) > -1).toBe(true);
  expect(TimerObj.displayStatus.textContent).toBe('Pomo-Time!');
});

test('Test That Timer Resets Properly When End Day is Clicked', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  jest.advanceTimersByTime(workMode.duration * 60 * 1000);
  button.click();
  expect(TimerObj.stateQueue[0]).toBe(workMode);
});
