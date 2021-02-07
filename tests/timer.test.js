import { Timer } from '../js/timer';
import variables from './globalVariables';

test('Check if TimerObject Map Is Instantiated', () => {
  const TimerObj = new Timer(null);
  expect(TimerObj.stateToTimeMap).not.toBeUndefined();
});

test('Check if Map Has Correct Values Loaded', () => {
  const TimerObj = new Timer(null);

  expect(TimerObj.stateToTimeMap.get(
    variables.workString,
  )).toBe(variables.workTime);

  expect(TimerObj.stateToTimeMap.get(
    variables.shortBreakString,
  )).toBe(variables.shortBreakTime);

  expect(TimerObj.stateToTimeMap.get(
    variables.longBreakString,
  )).toBe(variables.longBreakTime);
});

test('Check if Queue of States has been Instantiated', () => {
  const TimerObj = new Timer(null);
  expect(TimerObj.stateQueue).not.toBeUndefined();
});

test('Check if Queue of States has Correct Order', () => {
  const TimerObj = new Timer(null);

  expect(TimerObj.stateQueue[0]).toBe(variables.workString);
  expect(TimerObj.stateQueue[1]).toBe(variables.shortBreakString);
  expect(TimerObj.stateQueue[2]).toBe(variables.workString);
  expect(TimerObj.stateQueue[3]).toBe(variables.shortBreakString);
  expect(TimerObj.stateQueue[4]).toBe(variables.workString);
  expect(TimerObj.stateQueue[5]).toBe(variables.longBreakString);
});

test('Check if Queue of States rotation works Properly', () => {
  const TimerObj = new Timer(null);
  const nextState = TimerObj.getNextState();

  expect(nextState).toBe(variables.workString);
  expect(TimerObj.stateQueue).toStrictEqual([variables.shortBreakString,
    variables.workString, variables.shortBreakString, variables.workString,
    variables.longBreakString, variables.workString]);
});

test('Check if Set Interval Is Called', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + '</div>';

  jest.useFakeTimers();

  const displayElement = document.getElementById('displayTime');
  const TimerObj = new Timer(displayElement);
  TimerObj.beginTimer();
  expect(setInterval).toHaveBeenCalledTimes(1);
});

test('Check if Timer Stops After 25 Minutes After First Pomo', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + '</div>';

  jest.useFakeTimers();
  jest.clearAllTimers();

  const displayElement = document.getElementById('displayTime');
  const TimerObj = new Timer(displayElement);
  TimerObj.beginTimer();

  expect(clearInterval).not.toBeCalled();

  jest.advanceTimersByTime(1500000);
  expect(clearInterval).toBeCalled();
  expect(clearInterval).toHaveBeenCalledTimes(1);
});
