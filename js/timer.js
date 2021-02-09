import { workMode, shortBreakMode, longBreakMode } from './timerModes.js';

class Timer {
  constructor(displayTime, displayStatus) {
    this.state = '';
    this.stateQueue = [];
    this.displayTime = displayTime;
    this.displayStatus = displayStatus;
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
  }

  onTimerComplete() {
    const completedSession = this.stateQueue.shift();
    this.stateQueue.push(completedSession);
    this.startTimer();
  }

  /** Starts the timer with the session at the first element in stateQueue */
  startTimer() {
    const session = this.stateQueue[0];
    this.state = session.name;
    this.displayStatus.textContent = this.state;
    this.countdown(session.duration * 60);
  }

  countdown(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    let displayString = '';
    if (seconds < 10) {
      displayString = `${minutes}:0${seconds}`;
    } else {
      displayString = `${minutes}:${seconds}`;
    }
    this.displayTime.textContent = displayString;
    duration -= 1;
    if (duration >= 0) {
      setTimeout(() => {
        this.countdown(duration);
      }, 1000);
    } else {
      this.onTimerComplete();
    }
  }
}

export { Timer };
