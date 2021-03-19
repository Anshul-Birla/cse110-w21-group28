import { breakNames } from './MiscVariables.js';

const body = document.getElementsByTagName('body')[0];
/**
 * Function that adds a class name to the body for
 * transitioning to short break
 */
export function shortBreakColors() {
  body.classList.add(breakNames.short);
}

/**
 * Function that removes class names from body for transitioning back to work
 * session
 */
export function workModeColors() {
  body.classList.remove(breakNames.short);
  body.classList.remove(breakNames.long);
}

/**
 * Function that adds class name to the body
 * for transitioning to the long break, currently not used.
 */
export function longBreakColors() {
  body.classList.add(breakNames.long);
}
