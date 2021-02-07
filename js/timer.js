class Timer {
  constructor(display) {
    const workTime = 25;
    const shortBreakTime = 5;
    const longBreakTime = 10;
    const workString = 'work';
    const shortBreakString = 'sBreak';
    const longBreakString = 'lBreak';
    const workOrder = [workString, shortBreakString, workString,
      shortBreakString, workString, longBreakString];

    this.stateQueue = [];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
    this.display = display;
    this.stateToTimeMap = new Map();
    this.stateToTimeMap.set(workString, workTime);
    this.stateToTimeMap.set(shortBreakString, shortBreakTime);
    this.stateToTimeMap.set(longBreakString, longBreakTime);
  }

  beginTimer() {
    let timeRemaining = this.stateToTimeMap.get(this.getNextState());
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
      if (timeRemaining === 0) {
        clearInterval(intervalFunction);
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
