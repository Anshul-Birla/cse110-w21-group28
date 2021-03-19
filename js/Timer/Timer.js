import {
  sessionStartName, workMode, shortBreakMode, longBreakMode, buttonText,
} from './TimerVariables.js';
/**
 * A class for the Timer object. Has functions to start the timer,
 * display the current mode of the timer and display the time remaining
 * Class throws the 'timer-complete' event
 */
class Timer extends HTMLElement {
  /**
   * Constructor of Time Object. Takes the HTML element of where
   * you want the time and the status of the timer to be implemented.
   * HTML Elements must have the 'textElement' attribute.
   * @param {HTMLButtonElement} startButton - button that starts the button
   * @param {HTMLParagraphElement} displayTime - area to display the time remaining
   * @param {HTMLParagraphElement} displayStatus - area to display the status of the timer
   */
  constructor(startButton, displayTime, displayStatus) {
    super();
    /**
     * State of the timer (the current mode)
     * @type {String}
     */
    this.state = '';
    /**
     * Queue that stores the Session objects. Rotates to provide
     * rotation functionality for the timer
     * @type {Object[]}
     * @property {String} object.name name of the session
     * @property {Number} object.duration duration of the session
     */
    this.stateQueue = [];
    /**
     * HTML Tag that is reponsible for controlling the timer
     * @type {HTMLElement}
     */
    this.startButton = startButton;
    /**
     * HTML Tag that is reponsible for displaying the time remaining
     * @type {HTMLElement}
     */
    this.displayTime = displayTime;
    /**
     * HTML Tag that is reponsible for displaying the mode of the timer
     * @type {HTMLElement}
     */
    this.displayStatus = displayStatus;
    /**
     * Checks if session has ended
     * @type {Boolean}
     */
    this.end = false;
    /**
     * The sessionId. Increments on each working session. Stored in
     * local storage to keep track of id on multiple sessions every day
     * @type {Number}
     */
    this.sessionId = localStorage.getItem('pomoSessionId');
    this.sessionId = ((this.sessionId === null) ? 0 : parseInt(this.sessionId, 10) + 1);

    // this is the order for the timer. It will loop in this order.
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }

    this.addEventListeners();
  }

  /**
   * Function that resets the pomo session id and stores it in local storage
   */
  resetPomoSessionId() {
    this.sessionId = 0;
    localStorage.setItem('pomoSessionId', this.sessionId);
  }

  /**
   * Function that fires when the timer runs out of time.
   * Moves on to start the timer again at the end of the function.
   */
  onTimerComplete() {
    const completedSession = this.stateQueue.shift();
    this.stateQueue.push(completedSession);
    const event = new CustomEvent('timer-complete', {
      detail: {
        sessionName: completedSession.name,
        duration: completedSession.duration,
        sessionIsWork: completedSession.isWork,
        sessionId: this.sessionId,
      },
    });

    this.dispatchEvent(event);
    if (!completedSession.isWork) {
      this.sessionId += 1;
      localStorage.setItem('pomoSessionId', this.sessionId);
    }
    this.startTimer();
  }

  /**
   * Starts the timer for the session at the top of the queue.
   * Updates the display for the status.
   */
  startTimer() {
    this.end = false;
    const session = this.stateQueue[0];
    this.state = session.name;
    this.displayStatus.textContent = this.state;
    const event = new CustomEvent('timer-start', {
      detail: {
        sessionName: this.state,
        sessionIsWork: session.isWork,
      },
    });

    this.dispatchEvent(event);
    this.countdown(session.duration * 60);
  }

  /**
   * Ends the timer.
   * Updates the display for the status.
   */
  endTimer() {
    this.end = true;
    this.displayStatus.textContent = sessionStartName;
    this.displayTime.textContent = '25:00';
    document.title = 'Pomodoro';
    this.stateQueue = [];
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
    const event = new CustomEvent('timer-end');
    this.dispatchEvent(event);
  }

  /**
   * Counts down the timer for duration amount of minutes.
   * Updates the DOM with current time remaining.
   * @param {Number} duration Amount of seconds for the timer to run
   */
  countdown(duration) {
    if (this.end) return;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    let displayString = '';
    if (seconds < 10) {
      displayString = `${minutes}:0${seconds}`;
    } else {
      displayString = `${minutes}:${seconds}`;
    }
    this.displayTime.textContent = displayString;
    document.title = `${this.state} ${displayString}`;
    duration -= 1;
    if (duration >= 0) {
      setTimeout(() => {
        this.countdown(duration);
      }, 1000);
    } else {
      this.onTimerComplete();
    }
  }

  /**
   * Adds event listener to the start button that was added
   */
  addEventListeners() {
    this.startButton.addEventListener('click', () => {
      if (this.startButton.textContent.indexOf(buttonText.startTimerText) > -1) {
        this.startTimer();
        this.startButton.childNodes[0].nodeValue = buttonText.stopTimerText;
      } else {
        this.endTimer();
        this.startButton.childNodes[0].nodeValue = buttonText.startTimerText;
        document.getElementsByTagName('body')[0].classList.remove('short-break');
      }
    });
  }
}

customElements.define('custom-timer', Timer);
export { Timer };
