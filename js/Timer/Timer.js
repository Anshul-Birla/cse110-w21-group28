import { workMode, shortBreakMode, longBreakMode } from './TimerModes.js';
import { classNames, buttonText } from './TimerHTML.js';

/**
 * A class for the Timer object. Has functions to start the timer,
 * display the current mode of the timer and display the time remaining
 */
class Timer {
  /**
   * Constructor of Time Object. Takes the HTML element of where
   * you want the time and the status of the timer to be implemented.
   * HTML Elements must have the 'textElement' attribute.
   * @param {HTMLElement} startButton
   * @param {HTMLElement} displayTime
   * @param {HTMLElement} displayStatus
   */
  constructor(startButton, displayTime, displayStatus) {
    /**
     * State of the timer (the current mode)
     * @type {String}
     */
    this.state = '';
    /**
     * Queue that stores the Session objects. Rotates to provide
     * rotation functionality for the timer
     * @type {Array[Object]}
     * @property {String} object.name
     * @property {Number} object.duration
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

    // this is the order for the timer. It will loop in this order.
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }

    this.addEventListeners();
  }

  /**
   * Function that fires when the timer runs out of time.
   * Moves on to start the timer again at the end of the function.
   */
  onTimerComplete() {
    const completedSession = this.stateQueue.shift();
    this.stateQueue.push(completedSession);
    this.startTimer();
  }

  /**
   * Starts the timer for the session at the top of the queue.
   * Updates the display for the status.
   */
  startTimer() {
    const session = this.stateQueue[0];
    this.state = session.name;
    this.displayStatus.textContent = this.state;
    this.countdown(session.duration * 60);
  }

  /**
   * Counts down the timer for duration amount of minutes.
   * Updates the DOM with current time remaining.
   * @param {Number} duration
   */
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

  /**
   * Adds event listener to the start button that was added
   */
  addEventListeners() {
    this.startButton.addEventListener('click', () => {
      if (this.startButton.textContent === buttonText.startTimerText) {
        this.startButton.textContent = buttonText.stopTimerText;
        this.startButton.class = classNames.stopButton;
        this.startTimer();
      } else {
        this.startButton.textContent = buttonText.startTimerText;
        this.startButton.class = classNames.startButton;
      }
    });
  }
}

export { Timer };
