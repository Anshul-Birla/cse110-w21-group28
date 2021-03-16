// these are all variables for the Timer. Changing these will change them universally
const sessionStartName = 'Pomo-Time!';

const workMode = {
  name: 'Working Time',
  duration: .25,
  isWork: true,
};
const shortBreakMode = {
  name: 'Short Break',
  duration: .05,
  isWork: false,
};

const longBreakMode = {
  name: 'Long Break',
  duration: .15,
  isWork: false,
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
