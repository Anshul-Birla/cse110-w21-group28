import { workMode, shortBreakMode, longBreakMode } from './TimerModes.js';

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
   * @param {HTML Element} displayTime element where to store the display
   * @param {HTML Element} displayStatus element where to store the status fo the timer
   */
  constructor(displayTime, displayStatus) {
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
     * HTML Tag that is reponsible for displaying the time remaining
     * @type {HTML_Element}
     */
    this.displayTime = displayTime;
    /**
     * HTML Tag that is reponsible for displaying the mode of the timer
     * @type {HTML_Element}
     */
    this.displayStatus = displayStatus;

    // this is the order for the timer. It will loop in this order.
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
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
      },
    });

    this.dispatchEvent(event);
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
   * @param {Number} duration Amount of seconds for the timer to run
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
}

customElements.define('custom-timer', Timer);
export { Timer };
