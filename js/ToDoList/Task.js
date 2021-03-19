import { classNames, svg } from './TaskVariables.js';
import { TaskStorage } from './TodoListDomVariables.js';

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLTableRowElement {
  /**
  * Task construcutor. Initializes the task with appropriate attributes
  * @param {String} id - Id of the task
  * @param {String} name - Name of the task
  * @param {Number} totalSessions - Total sessions the task should take
  * @param {Number} [currentSession = 0] - Total sessions the task has taken
  * @param {Number} [completed = false] - Is the task completed or not
  */
  constructor(id, name, totalSessions, currentSession = 0, completed = false) {
    super();
    /**
     * Holds the current classname of the task object
     * @type {String}
     */
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

    // /**
    //  * Keeps track if the task was deleted or not (used with the Todolist )
    //  */
    // this.deleted = false;

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
    /**
     * The button that hides the delete and focus buttons
     * @type {HTMLButtonElement}
     */
    this.threeDotsButton = this.setupThreeDotsButton();
    /**
     * The focus button for the task
     * @type {HTMLButtonElement}
     */
    this.focusButton = this.setupFocusButton();

    this.setupLastColumnToggle(this.threeDotsButton,
      this.deleteButton.parentElement, this.focusButton.parentElement);
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
    // disable the checkbox by default (updated by the todolistdom class)
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
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', svg.trashcan);
    const svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgTag.appendChild(path);
    svgTag.setAttribute('class', classNames.deleteSvg);
    deleteBtn.appendChild(svgTag);
    const inlineDiv = document.createElement('div');
    inlineDiv.className = classNames.inlineDiv;
    inlineDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      this.onDelete();
    });
    return deleteBtn;
  }

  /**
   * This sets up the focus button for a task. The button fires and event that
   * indicates the task has been focused on, and hides the button
   * @returns {HTMLButtonElement}
   */
  setupFocusButton() {
    const focusBtn = document.createElement('button');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', svg.star);
    const svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgTag.setAttribute('class', classNames.focusSvg);
    svgTag.appendChild(path);
    focusBtn.appendChild(svgTag);
    const inlineDiv = document.createElement('div');
    inlineDiv.className = classNames.inlineDiv;
    inlineDiv.appendChild(focusBtn);

    // hide the button if the task came from local storage and was checked
    if (this.checked) {
      focusBtn.parentElement.style.display = 'none';
    }

    focusBtn.addEventListener('click', () => {
      this.threeDotsButton.parentElement.style.display = 'block';
      focusBtn.parentElement.parentElement.style.display = 'none';
      const event = new CustomEvent('focus-task', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
        },
      });
      document.body.dispatchEvent(event);
    });

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
    threeDots.className = classNames.threeDots;
    button.appendChild(threeDots);

    button.addEventListener('click', () => {
      button.parentElement.style.display = 'none';
      this.deleteButton.parentElement.parentElement.style.display = 'inline-block';
    });

    return button;
  }

  /**
   * Sets up the last column of the todolist.
   * @param {HTMLButtonElement} threeDotsButton
   * @param {HTMLDivElement} deleteButton
   * @param {HTMLDivElement} focusButton
   */
  setupLastColumnToggle(threeDotsButton, deleteButton,
    focusButton) {
    const lastCol = document.createElement('td');
    const lastColDiv = document.createElement('div');
    const threeDotsDiv = document.createElement('div');
    const deleteFocusDiv = document.createElement('div');

    // wrap the delete and focus buttons in a div
    deleteFocusDiv.className = 'double-buttons';
    deleteFocusDiv.appendChild(deleteButton);
    deleteFocusDiv.appendChild(focusButton);
    // wrap the three dots button in a div
    threeDotsDiv.appendChild(threeDotsButton);
    threeDotsDiv.className = 'triple-dots-touch';

    // make sure the delete and focus buttons are hidden
    deleteFocusDiv.style.display = 'none';
    lastColDiv.appendChild(threeDotsDiv);
    lastColDiv.className = 'touch-target';
    lastColDiv.appendChild(deleteFocusDiv);
    lastCol.appendChild(lastColDiv);
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
    this.children[2].textContent = `${this.currentSessionNum}/\
      ${this.totalSessions}`;
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
    const event = new CustomEvent('task-checked-off', {
    });

    this.dispatchEvent(event);
    this.focusButton.parentElement.style.display = 'none';
    this.updateLocalStorage();
  }

  /**
   * Marks a task as not completed
   */
  uncheckTask() {
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);
    this.focusButton.parentElement.style.display = 'inline-block';
    this.checkBox.disabled = true;
    this.updateLocalStorage();
  }

  /**
   * Deletes a task, remove from DOM, tasklist and localStorage
   */
  onDelete() {
    this.remove();
    this.removeFromLocalStorage();
    // for actual task deletion
    let event = new CustomEvent('task-deleted', {
      bubbles: true,
      composed: true,
      detail: {
        taskID: this.id,
      },
    });
    document.body.dispatchEvent(event);

    // for stats
    event = new CustomEvent('task-deleted', {
      detail: {
        pomoSessions: this.totalSessions,
      },
    });
    this.dispatchEvent(event);
  }
}

export { Task };
customElements.define('task-item', Task, { extends: 'tr' });
