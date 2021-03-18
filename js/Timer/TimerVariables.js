// these are all variables for the Timer. Changing these will change them universally
const sessionStartName = 'Pomo-Time!';

const workMode = {
  name: 'Working Time',
  duration: 15/60,
  isWork: true,
};
const shortBreakMode = {
  name: 'Short Break',
  duration: 5,
  isWork: false,
};

const longBreakMode = {
  name: 'Long Break',
  duration: 15,
  isWork: false,
};

const buttonText = {
  stopTimerText: 'End Day',
  startTimerText: 'Start',
};

export {
  sessionStartName, workMode, shortBreakMode, longBreakMode, buttonText,
};
