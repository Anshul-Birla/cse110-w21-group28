import { Timer } from '../js/timer';
import { workMode, shortBreakMode, longBreakMode} from '../js/timerModes';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
});

test('Test Initial State is Nothing', () => {
  const TimerObj = new Timer(null);
  expect(TimerObj.state).toBe('');
})

test('Test First Iteration of Timer', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + '</div>';

  const displayElement = document.getElementById('displayTime');
  const TimerObj = new Timer(displayElement);
  TimerObj.startTimer();
  expect(TimerObj.state).toBe(workMode.name);
});

test('Test Second Iteration of Timer', () => {
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + '</div>';

  const displayElement = document.getElementById('displayTime');
  const TimerObj = new Timer(displayElement);
  TimerObj.startTimer();
  jest.advanceTimersByTime(1500000);
  
  expect(clearInterval).toBeCalled();
  expect(clearInterval).toHaveBeenCalledTimes(1);
  expect(TimerObj.stateQueue[0]).toBe(shortBreakMode);
});


// test('Check if Set Interval Is Called', () => {
//   document.body.innerHTML = '<div>'
//   + '  <p id="displayTime"></p>'
//   + '</div>';

//   jest.useFakeTimers();

//   const displayElement = document.getElementById('displayTime');
//   const TimerObj = new Timer(displayElement);
//   TimerObj.beginTimer();
//   expect(setInterval).toHaveBeenCalledTimes(1);
// });

// test('Check if Timer Stops After 25 Minutes After First Pomo', () => {
//   document.body.innerHTML = '<div>'
//   + '  <p id="displayTime"></p>'
//   + '</div>';

//   jest.useFakeTimers();
//   jest.clearAllTimers();

//   const displayElement = document.getElementById('displayTime');
//   const TimerObj = new Timer(displayElement);
//   TimerObj.beginTimer();

//   expect(clearInterval).not.toBeCalled();

//   jest.advanceTimersByTime(1500000);
//   expect(clearInterval).toBeCalled();
//   expect(clearInterval).toHaveBeenCalledTimes(1);
// });
