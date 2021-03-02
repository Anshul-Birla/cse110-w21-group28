// these are all variables for the Timer. Changing these will change them universally
const sessionStartName = 'Pomo-Time!';

const workMode = {
  name: 'Working Time',
  duration: 25,
};
const shortBreakMode = {
  name: 'Short Break',
  duration: 5,
};

const longBreakMode = {
  name: 'Long Break',
  duration: 15,
};

const classNames = {
  stopButton: 'stopTimerButton',
  startButton: 'startTimerButton',
};

const buttonText = {
  stopTimerText: 'End Day',
  startTimerText: 'Start',
};

export {
  sessionStartName, workMode, shortBreakMode, longBreakMode, classNames, buttonText,
};
