import { classNames } from './TaskVariables.js';
import { TaskStorage } from './TodoListDomVariables.js';

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLTableRowElement {
  /**
  * Task construcutor. Initializes the task with appropriate attributes
  * @param {String} id Id of the task
  * @param {String} name Name of the task
  * @param {Number} totalSessions Total sessions the task should take
  */
  constructor(id, name, totalSessions, currentSession = 0, completed = false) {
    super();
    this.className = classNames.uncheckedTaskClassName;
    /**
     * Stores the id of the task
     * @type {String}
     */
    this.id = id;
    /**
     * Stores the name of the task
     * @type {String}
     */
    this.name = name;
    /**
     * Stores the total sessions anticipated for the task
     * @type {Number}
     */
    this.totalSessions = totalSessions;
    /**
     * Stores the total amount of sessions spent working on the task
     * @type {Number}
     */
    this.currentSessionNum = currentSession;
    /**
     * Stores if the task has been checked off or not
     * @type {Boolean}
     */
    this.checked = completed;

    /**
     * The checkbox attribute for the task
     * @type {HTMLInputElement}
     */
    this.checkBox = this.setupCheckBox();

    /**
     * Stores the view that shows the task name to the user
     * @type {HTMLTableDataCellElement}
     */
    this.taskText = this.setupTaskText();
    /**
     * Stores the view that displayes the total pomo sessions spent
     * and alloted for the tasl
     * @type {HTMLTableDataCellElement}
     */
    this.pomoSessions = this.setupTotalPomoSessions();
    /**
     * The delete button for the task
     * @type {HTMLButtonElement}
     */
    this.deleteButton = this.setupDeleteButton();
    this.threeDotsButton = this.setupThreeDotsButton();
    this.focusButton = this.setupFocusButton();
    this.setupLastColumnToggle(this.threeDotsButton, this.deleteButton, this.focusButton);

    /**
     * Keeps track if the task was deleted or not (used with the Todolist )
     */
    this.deleted = false;
  }

  /**
   * This sets up the checkbox to check off tasks
   * @returns {HTMLInputElement}
   */
  setupCheckBox() {
    const firstCol = document.createElement('td');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `checkbox-${this.id}`);
    checkBox.setAttribute('class', 'custom_checkbox');
    firstCol.appendChild(checkBox);
    this.appendChild(firstCol);
    checkBox.disabled = true;

    if (this.checked) {
      this.setAttribute('class', classNames.completedTaskClassName);
      checkBox.checked = true;
      checkBox.disabled = false;
    }

    checkBox.addEventListener('click', () => {
      if (!this.checked) {
        this.checkOffTask();
      } else {
        this.uncheckTask();
      }
      const event = new CustomEvent('checkbox-updated', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
          checkBoxState: this.checked,
        },
      });
      document.body.dispatchEvent(event);
    });
    return checkBox;
  }

  /**
   * This sets up the view that will display the task name
   * @returns {HTMLTableDataCellElement}
   */
  setupTaskText() {
    const text = document.createElement('td');
    text.setAttribute('id', `text-${this.id}`);
    this.appendChild(text);
    this.updateText();
    return text;
  }

  /**
   * This sets up the view that will display the pomo sessions
   * @return {HTMLTableDataCellElement}
   */
  setupTotalPomoSessions() {
    const pomoSessions = document.createElement('td');
    pomoSessions.setAttribute('id', `pomoSessions-${this.id}`);
    this.appendChild(pomoSessions);
    this.updatePomoSessions();
    return pomoSessions;
  }

  /**
   * This sets up the delete button for a task
   * Delete only works visually, doesn't remove it from the TodoList
   * Data Structure
   * @return {HTMLButtonElement}
   */
  setupDeleteButton() {
    const deleteBtn = document.createElement('button');

    deleteBtn.addEventListener('click', () => {
      this.deleted = true;
      this.remove();
      this.removeFromLocalStorage();
    });

    deleteBtn.textContent = 'Delete';
    return deleteBtn;
  }

  /**
   * This setsup the focus button for a task. The button fires and event that
   * indicates the task has been focused on, and hides the button
   * @returns {HTMLButtonElement}
   */
  setupFocusButton() {
    const focusBtn = document.createElement('button');
    focusBtn.addEventListener('click', () => {
      this.threeDotsButton.parentElement.style.display = 'block';
      focusBtn.parentElement.style.display = 'none';
      const event = new CustomEvent('focus-task', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
        },
      });
      document.body.dispatchEvent(event);
    });
    focusBtn.textContent = 'Focus';
    return focusBtn;
  }

  /**
   * Setups up the three dots "show more" button. Wrapped inside a div so it
   * can easily dissapear and appear on clicks
   * @returns {HTMLButtonElement}
   */
  setupThreeDotsButton() {
    const button = document.createElement('button');
    const threeDots = document.createElement('div');
    threeDots.className = 'three-dots';
    button.appendChild(threeDots);
    button.addEventListener('click', () => {
      button.parentElement.style.display = 'none';
      this.deleteButton.parentElement.style.display = 'block';
    });

    return button;
  }

  /**
   * Sets up the last column of the todolist.
   * @param {HTMLButtonElement} threeDotsButton
   * @param {HTMLButtonElement} deleteButton
   * @param {HTMLButtonElement} focusButton
   */
  setupLastColumnToggle(threeDotsButton, deleteButton,
    focusButton) {
    const lastCol = document.createElement('td');
    const threeDotsDiv = document.createElement('div');
    const deleteFocusDiv = document.createElement('div');
    const mainDiv = document.createElement('div');
    mainDiv.className = 'last-col-div';

    // wrap the delete and focus buttons in a div
    deleteFocusDiv.className = 'double-buttons';
    deleteFocusDiv.appendChild(deleteButton);
    deleteFocusDiv.appendChild(focusButton);
    // wrap the three dots button in a div
    threeDotsDiv.appendChild(threeDotsButton);

    // make sure the delete and focus buttons are hidden
    deleteFocusDiv.style.display = 'none';

    // wrap everything in its own div
    mainDiv.appendChild(threeDotsDiv);
    mainDiv.appendChild(deleteFocusDiv);
    lastCol.appendChild(mainDiv);
    this.appendChild(lastCol);
  }

  /**
   * Removes a task from local storage given the id
   */
  removeFromLocalStorage() {
    for (let i = 0; i < window.localData.length; i += 1) {
      if (window.localData[i][TaskStorage.idIndex] === this.id) {
        window.localData.splice(i, 1);
      }
    }
    this.deleted = true;
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Update method to edit task name
   */
  updateText() {
    this.children[1].textContent = this.name;
  }

  /**
   * This updates the pomo sessions when a session is complete
   */
  updatePomoSessions() {
    this.children[2].textContent = `[${this.currentSessionNum}/\
      ${this.totalSessions}]`;
  }

  /**
   * Increment this task's current session number. Checks off task if all sessions completed.
   * @throws {RangeError} - Incrementing a completed tasks' session number
   * (all sessions have been completed or user has checked off task manually)
   */
  incrementSession() {
    if (this.checked) {
      throw (new RangeError('Increment checked Task'));
    }

    this.currentSessionNum += 1;
    this.updatePomoSessions();

    this.updateLocalStorage();
  }

  /**
   * This updates the localStorage whenever session increases or checked off
   */
  updateLocalStorage() {
    for (let i = 0; i < window.localData.length; i += 1) {
      if (window.localData[i][TaskStorage.idIndex] === this.id) {
        window.localData[i][TaskStorage.currentSessionIndex] = this.currentSessionNum;
        window.localData[i][TaskStorage.checkedIndex] = this.checked;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Marks a task as completed
   */
  checkOffTask() {
    this.checked = true;
    this.setAttribute('class', classNames.completedTaskClassName);
    this.updateLocalStorage();
  }

  /**
   * Marks a task as not completed
   */
  uncheckTask() {
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);
    this.updateLocalStorage();
  }
}

export { Task };
customElements.define('task-item', Task, { extends: 'tr' });
