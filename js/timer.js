import { workMode, shortBreakMode, longBreakMode } from "./timerModes.js" 

class Timer {
  constructor(display) {
    this.state = '';
    this.stateQueue = [];
    this.display = display;

    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
  }

  onTimerComplete() {
    const completedSession = this.stateQueue.shift();
    this.stateQueue.push(completedSession)
  }

  /** Starts the timer with the session at the first element in stateQueue */
  startTimer() {
    const session = this.stateQueue[0];
    this.state = session.name;
    let timeRemaining = session.duration;
    const intervalFunction = setInterval(() => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      let displayString = '';
      if (seconds < 10) {
        displayString = `${minutes}:0${seconds}`;
      } else {
        displayString = `${minutes}:${seconds}`;
      }
      this.display.textContent = displayString;
      timeRemaining -= 1;
      if (timeRemaining < 0) {
        clearInterval(intervalFunction);
        this.onTimerComplete();
      }
    }, 1000);
  }

  getNextState() {
    const nextState = this.stateQueue.shift();
    this.stateQueue.push(nextState);
    return nextState;
  }
}

export { Timer };
