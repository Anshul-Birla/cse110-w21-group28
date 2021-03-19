import { classNames, storageItemNames } from './StatisticsVariables.js';

/* eslint-disable max-len */
/**
 * A class for the Statistics object. Has functions for incrementing
 * and decrementing expected and actual pomo sessions,
 * total time and work time spent, and storing distractions.
 * Also handles local storage elements for stats.
 */
class Statistics extends HTMLElement {
  /**
   * Constructor of Statistics object. Initializes all variables to zero, overwrites them from memory if available, updates DOM.
   */
  constructor() {
    super();
    /**
     * @type {Object[]} Array that stores the distraction & which pomo session it happened during
     */
    this.distractionList = [];
    /**
     * @type {Number} Total number of minutes spent
     */
    this.totalMins = 0;
    /**
    * @type {Number} Total number of minutes spent working
    */
    this.workMins = 0;
    /**
    * @type {Number} Total number of tasks completed
    */
    this.tasksCompleted = 0;
    /**
    * @type {Number} Sum of projected number of pomo sessions expected over all Tasks
    */
    this.expectedPomoSessions = 0;
    /**
    * @type {Number} Sum of actual number of pomo sessions spent on all Tasks
    */
    this.actualPomoSessions = 0;
    /**
    * @type {Date} Start date/time stamp of current work day
    */
    this.sessionStartDateTime = new Date();
    this.addHTMLChildren();
    this.addEventListeners();
    this.loadFromLocalStorage();
    this.flushHistory();
  }

  /**
   *  Adds all child HTML elements to the statistics popup
   */
  addHTMLChildren() {
    /**
     * The div to which the page is appended
     * @type {HTMLDivElement}
     */
    this.parentDiv = document.getElementById('stats-info');

    // Tasks Completed
    /**
     * Number of tasks completed
     * @type {HTMLParagraphElement}
     */
    this.tasksCompletedP = document.createElement('p');
    this.tasksCompletedP.setAttribute('id', 'stats_tasksCompleted');
    this.tasksCompletedP.setAttribute('class', classNames.statsNumberClass);
    /**
     *  Label for number of tasks completed
     * @type {HTMLParagraphElement}
     */
    this.tasksCompletedPLabel = document.createElement('p');
    this.tasksCompletedPLabel.setAttribute('id', 'stats_tasksCompletedLabel');
    this.tasksCompletedPLabel.setAttribute('class', classNames.statsLabelClass);
    this.tasksCompletedPLabel.textContent = 'Tasks Completed';
    this.parentDiv.appendChild(this.tasksCompletedP);
    this.parentDiv.appendChild(this.tasksCompletedPLabel);

    // Total Time Spent
    /**
     * Total time spent
     * @type {HTMLParagraphElement}
     */
    this.timeSpent = document.createElement('p');
    this.timeSpent.setAttribute('id', 'stats_totalTime');
    this.timeSpent.setAttribute('class', classNames.statsNumberClass);
    /**
     * Label for total time spent
     * @type {HTMLParagraphElement}
     */
    this.timeSpentLabel = document.createElement('p');
    this.timeSpentLabel.setAttribute('id', 'stats_timeSpentLabel');
    this.timeSpentLabel.setAttribute('class', classNames.statsLabelClass);
    this.timeSpentLabel.textContent = 'Total Minutes';
    this.parentDiv.appendChild(this.timeSpent);
    this.parentDiv.appendChild(this.timeSpentLabel);

    // Time spent working
    /**
     *  Total time spent working
     * @type {HTMLParagraphElement}
     */
    this.timeWorking = document.createElement('p');
    this.timeWorking.setAttribute('id', 'stats_workTime');
    this.timeWorking.setAttribute('class', classNames.statsNumberClass);
    /**
     * Label for total time spent working
     * @type {HTMLParagraphElement}
     */
    this.timeWorkingLabel = document.createElement('p');
    this.timeWorkingLabel.setAttribute('id', 'stats_timeWorkingLabel');
    this.timeWorkingLabel.setAttribute('class', classNames.statsLabelClass);
    this.timeWorkingLabel.textContent = 'Working Minutes';
    this.parentDiv.appendChild(this.timeWorking);
    this.parentDiv.appendChild(this.timeWorkingLabel);

    // Average time per task
    /**
     *  Average time per task
     * @type {HTMLParagraphElement}
     */
    this.timePerTask = document.createElement('p');
    this.timePerTask.setAttribute('id', 'stats_timePerTask');
    this.timePerTask.setAttribute('class', classNames.statsNumberClass);
    /**
     * Label for avg time per task
     * @type {HTMLParagraphElement}
     */
    this.timePerTaskLabel = document.createElement('p');
    this.timePerTaskLabel.setAttribute('id', 'stats_timePerTaskLabel');
    this.timePerTaskLabel.setAttribute('class', classNames.statsLabelClass);
    this.timePerTaskLabel.textContent = 'Minutes per Task';
    this.parentDiv.appendChild(this.timePerTask);
    this.parentDiv.appendChild(this.timePerTaskLabel);

    /* Adding things to Distraction Tab */

    // Number of Broken Session
    /**
     * Total number of unique broken sessions
     * @type {HTMLParagraphElement}
     */
    this.brokenSessions = document.createElement('p');
    this.brokenSessions.setAttribute('id', 'stats_numBrokenSessions');
    this.brokenSessions.setAttribute('class', classNames.distNumberClass);
    /**
     * Label for total number of unique broken sessions
     * @type {HTMLParagraphElement}
     */
    this.brokenSessionsLabel = document.createElement('p');
    this.brokenSessionsLabel.setAttribute('id', 'stats_brokenSessionsLabel');
    this.brokenSessionsLabel.setAttribute('class', classNames.distLabelClass);
    this.brokenSessionsLabel.textContent = 'Broken Sessions';
    this.parentDiv.appendChild(this.brokenSessions);
    this.parentDiv.appendChild(this.brokenSessionsLabel);

    // Number of Expected Pomo Sessions;
    /**
     * Total projected number of pomo sessions
     * @type {HTMLParagraphElement}
     */
    this.expectedPomoSessionsData = document.createElement('p');
    this.expectedPomoSessionsData.setAttribute('id', 'stats_expectedPomoSesh');
    this.expectedPomoSessionsData.setAttribute('class', classNames.statsNumberClass);
    /**
     * Label for projected number of pomo sessions
     * @type {HTMLParagraphElement}
     */
    this.expectedPomoSessionsLabel = document.createElement('p');
    this.expectedPomoSessionsLabel.setAttribute('id', 'stats_expectedPomoSesLabel');
    this.expectedPomoSessionsLabel.setAttribute('class', classNames.statsLabelClass);
    this.expectedPomoSessionsLabel.textContent = 'Expected Pomo Sessions';
    this.parentDiv.appendChild(this.expectedPomoSessionsData);
    this.parentDiv.appendChild(this.expectedPomoSessionsLabel);

    // Number of Actual Pomo Sessions
    /**
     * Total number of working pomo sessions
     * @type {HTMLParagraphElement}
     */
    this.actualPomoSessionsData = document.createElement('p');
    this.actualPomoSessionsData.setAttribute('id', 'stats_actualPomo');
    this.actualPomoSessionsData.setAttribute('class', classNames.statsNumberClass);
    /**
     * Label for total number of working pomo sessions
     * @type {HTMLParagraphElement} L
     */
    this.actualPomoSessionsLabel = document.createElement('p');
    this.actualPomoSessionsLabel.setAttribute('id', 'stats_actualPomoSesLabel');
    this.actualPomoSessionsLabel.setAttribute('class', classNames.statsLabelClass);
    this.actualPomoSessionsLabel.textContent = 'Actual Pomo Sessions';
    this.parentDiv.appendChild(this.actualPomoSessionsData);
    this.parentDiv.appendChild(this.actualPomoSessionsLabel);

    // Average Number of Distractions Per Task
    /**
     * Average number of distractions per task
     * @type {HTMLParagraphElement}
     */
    this.avgDistractions = document.createElement('p');
    this.avgDistractions.setAttribute('id', 'dist_avgDistractions');
    this.avgDistractions.setAttribute('class', classNames.distNumberClass);
    /**
     * Label for average distractions per task
     * @type {HTMLParagraphElement}
     */
    this.avgDistractionsLabel = document.createElement('p');
    this.avgDistractionsLabel.setAttribute('id', 'dist_avgDistractionLabel');
    this.avgDistractionsLabel.setAttribute('class', classNames.distLabelClass);
    this.avgDistractionsLabel.textContent = 'Average Distractions Per Task';
    this.parentDiv.appendChild(this.avgDistractions);
    this.parentDiv.appendChild(this.avgDistractionsLabel);

    // Distraction List
    /**
     * List of distractions
     * @type {HTMLUListElement}
     */
    this.distList = document.createElement('ul');
    this.distList.setAttribute('class', 'dist-list');
    this.parentDiv.appendChild(this.distList);
    /**
     * @type {HTMLParagraphElement} Label for list of distractions
     */
    this.distListLabel = document.createElement('p');
    this.distListLabel.setAttribute('id', 'dist_listLabel');
    this.distListLabel.setAttribute('class', classNames.distLabelClass);
    this.distListLabel.textContent = 'Distraction List';
    this.parentDiv.appendChild(this.distListLabel);
  }

  /**
   *  Creates a list item for each logged distraction
   */
  updateDistractionList() {
    const content = document.getElementsByClassName('distItem');
    let i;
    if (content.length === 0) {
      i = 0;
    } else {
      i = content.length;
    }
    while (i < this.distractionList.length) {
      /**
       * @type {HTMLLIElement} Row for distraction
       */
      this.listElement = document.createElement('li');
      this.listElement.setAttribute('class', 'distItem');
      this.listElement.textContent = this.distractionList[i].description;
      this.distList.appendChild(this.listElement);
      i += 1;
    }
  }

  /**
   *  Creates event listeners for toggling tabs within the stats popup
   */
  addEventListeners() {
    const statsDistractBtn = document.getElementById('distraction');
    const statsTabBtn = document.getElementById('data');

    // Clicking the Distraction button on the Statistics popup generates the distraction views and hides the data information
    statsDistractBtn.addEventListener('click', () => {
      statsTabBtn.className = classNames.nonActiveTabClass;
      let content = document.getElementsByClassName(classNames.statsNumberClass);
      let contentlabel = document.getElementsByClassName(classNames.statsLabelClass);
      for (let i = 0; i < content.length; i += 1) {
        content[i].style.display = 'none';
        contentlabel[i].style.display = 'none';
      }
      content = document.getElementsByClassName(classNames.distNumberClass);
      contentlabel = document.getElementsByClassName(classNames.distLabelClass);
      document.getElementsByClassName('dist-list')[0].style.display = 'block';
      for (let i = 0; i < content.length; i += 1) {
        content[i].style.display = 'block';
      }
      for (let i = 0; i < contentlabel.length; i += 1) {
        contentlabel[i].style.display = 'block';
      }
      statsDistractBtn.className = classNames.activeTabClass;
    });

    // Clicking on Data button within the Statistics popup generates the data views and hides distraction data
    statsTabBtn.addEventListener('click', () => {
      statsDistractBtn.className = classNames.nonActiveTabClass;
      let content = document.getElementsByClassName(classNames.distNumberClass);
      let contentlabel = document.getElementsByClassName(classNames.distLabelClass);
      for (let i = 0; i < content.length; i += 1) {
        content[i].style.display = 'none';
      }
      for (let i = 0; i < contentlabel.length; i += 1) {
        contentlabel[i].style.display = 'none';
      }
      document.getElementsByClassName('dist-list')[0].style.display = 'none';
      content = document.getElementsByClassName(classNames.statsNumberClass);
      contentlabel = document.getElementsByClassName(classNames.statsLabelClass);
      for (let i = 0; i < content.length; i += 1) {
        content[i].style.display = 'block';
        contentlabel[i].style.display = 'block';
      }
      statsTabBtn.className = classNames.activeTabClass;
    });

    // Clicking outside of the popup closes the popup
    document.getElementById('overlay').addEventListener('click', () => {
      document.getElementById('close-stats-button').click();
      document.getElementById('overlay').style.animation = '';
    });
  }

  /**
   *  Updates the HTML elements to display values of local variables. Called when stats button is called.
   */
  updateDom() {
    this.timePerTask.textContent = this.getAverageTimePerTask();
    this.tasksCompletedP.textContent = this.tasksCompleted;
    this.timeWorking.textContent = this.workMins;
    this.timeSpent.textContent = this.totalMins;
    this.brokenSessions.textContent = this.getNumUniqueDistractions();
    this.avgDistractions.textContent = this.getAvgDistractionsPerTask();
    this.expectedPomoSessionsData.textContent = this.expectedPomoSessions;
    this.actualPomoSessionsData.textContent = this.actualPomoSessions;
    this.updateDistractionList();
  }

  /**
   *  Increments by one every time a task is marked as completed
   */
  incrementTasksCompleted() {
    this.tasksCompleted += 1;
    this.updateMinorLocalStorage();
  }

  /**
   *  Decrements by one every time a task is marked as not-completed given that there are tasks that can be uncompleted. Updates local storage when called.
   */
  decrementTasksCompleted() {
    if (this.tasksCompleted > 0) {
      this.tasksCompleted -= 1;
      this.updateMinorLocalStorage();
    } // else I'm interested to see how you got there
  }

  /**
   *  Adds a distraction (represented by a JSON object) to the list of distractions. Updates local storage when called.
   * @param {JSON Object} distraction Distraction to be added
   */
  addDistraction(distraction) {
    this.distractionList.push(distraction);
    this.updateMinorLocalStorage();
  }

  /**
   *  Gets the number of broken work sessions. If multiple distractions during one work session occurred, only counts as one unique broken pomo session.
   * @returns {Number} Number of disrupted work sessions
   */
  getNumUniqueDistractions() {
    const uniqueDistractionId = new Set(this.distractionList.map((item) => item.pomoSessionId));
    return uniqueDistractionId.size;
  }

  /**
   *  Counts average number of distractions per task
   * @returns {Number} Average number of distractions per task rounded to the nearest tenth
   */
  getAvgDistractionsPerTask() {
    if (this.tasksCompleted === 0) {
      return 0;
    }
    const rawNumber = this.distractionList.length / this.tasksCompleted;
    return Math.round(rawNumber * 10) / 10;
  }

  /**
   *  Increments the total time spent. Updates local storage when called.
   * @param {Number} numMins Number of minutes to increment count by
   */
  addTimeSpent(numMins) {
    this.totalMins += (numMins * 1);
    this.updateMinorLocalStorage();
  }

  /**
   *  Increments the work time spent. When work time incremented, so is total time spent (runs as separate method call to addTimeSpent())
   * @param {Number} numMins Number of minutes to increment work count by
   */
  addWorkTime(numMins) {
    this.workMins += (numMins * 1);
    this.addTimeSpent(numMins);
  }

  /**
   *  Increments the planned number of pomo sessions for the work day. Should be called each time a task is added.
   * @param {Number} numSessions Number of sessions to increment count by
   */
  addExpectedPomoSessions(numSessions) {
    this.expectedPomoSessions += numSessions;
    this.updateMinorLocalStorage();
  }

  /**
   *  Decrements the planned number of pomo sessions for the work day. Should be called each time a task is deleted. Only decrements if new tasks were added during the current work day.
   * @param {Number} numSessions Number of sessions to decrement count by
   */
  deleteExpectedPomoSessions(numSessions) {
    if (this.expectedPomoSessions >= numSessions) {
      this.expectedPomoSessions -= numSessions;
      this.updateMinorLocalStorage();
    } // else I'm interested how you got here
  }

  /**
   *  Increments the number of completed pomo sessions for the work day. Should be called each time the timer finishes a work session. Updates local storage when called
   */
  incrementActualPomoSessions() {
    this.actualPomoSessions += 1;
    this.updateMinorLocalStorage();
  }

  /**
   * @returns {Number} Average work minutes per completed task rounded to the nearest whole minute
   */
  getAverageTimePerTask() {
    if (this.tasksCompleted > 0) {
      return Math.round(this.workMins / this.tasksCompleted);
    }
    return 0;
  }

  /**
   *  Loads all variables from local storage or sets them to zero if not found
   */
  loadFromLocalStorage() {
    /**
     * @type {Object[]} Loading variables as strings from local storage
     */
    this.history = JSON.parse(localStorage.getItem('statsHistory'));
    if (this.history === null) {
      this.history = [];
    }
    this.totalMins = localStorage.getItem(storageItemNames.totalMins);
    this.workMins = localStorage.getItem(storageItemNames.workMins);
    this.tasksCompleted = localStorage.getItem(storageItemNames.tasksCompleted);
    this.expectedPomoSessions = localStorage.getItem(storageItemNames.expectedPomoSessions);
    this.actualPomoSessions = localStorage.getItem(storageItemNames.actualPomoSessions);
    this.distractionList = localStorage.getItem(storageItemNames.currDistractionList);
    this.sessionStartDateTime = localStorage.getItem(storageItemNames.startDateTime);

    // If string was not found, set to zero/empty value. If string was found, parse the string for it's value
    this.totalMins = ((this.totalMins !== null) ? parseInt(this.totalMins, 10) : 0);
    this.workMins = ((this.workMins !== null) ? parseInt(this.workMins, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
    this.expectedPomoSessions = ((this.expectedPomoSessions !== null) ? parseInt(this.expectedPomoSessions, 10) : 0);
    this.actualPomoSessions = ((this.actualPomoSessions !== null) ? parseInt(this.actualPomoSessions, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
    this.sessionStartDateTime = ((this.sessionStartDateTime !== null) ? new Date(this.sessionStartDateTime) : new Date());

    // Split the list of distractions from the string into individual distractions and turn date strings into date objects
    if (this.distractionList !== null) {
      this.distractionList = JSON.parse(this.distractionList);
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (let i = 0; i < this.distractionList.length; i += 1) {
        // let temp = this.distractionList[i];
        this.distractionList[i].date = new Date(this.distractionList[i].date);
      }
    } else {
      this.distractionList = [];
    }
  }

  /**
   *  Writes all class variables to local storage
   */
  updateMinorLocalStorage() {
    localStorage.setItem(storageItemNames.totalMins, this.totalMins);
    localStorage.setItem(storageItemNames.workMins, this.workMins);
    localStorage.setItem(storageItemNames.tasksCompleted, this.tasksCompleted);
    localStorage.setItem(storageItemNames.expectedPomoSessions, this.expectedPomoSessions);
    localStorage.setItem(storageItemNames.actualPomoSessions, this.actualPomoSessions);
    localStorage.setItem(storageItemNames.currDistractionList, JSON.stringify(this.distractionList));
    localStorage.setItem(storageItemNames.startDateTime, this.sessionStartDateTime);
  }

  /**
   *  Deletes all history records that are older than one year. To be used with year-to-date information. Updates local storage only for history record when called.
   */
  flushHistory() {
    const currDate = new Date();
    for (let i = 0; i < this.history.length; i += 1) {
      const diff = (currDate - new Date(this.history[i].date));
      if (diff / (1000 * 3600 * 24 * 365) > 1) {
        this.history.splice(i, 1);
      }
    }
    localStorage.setItem('statsHistory', JSON.stringify(this.history));
  }

  /**
   *  Sees if the last time that a day was started was earlier than 3 a.m. today. If the work day was started at 3 a.m. or later, do not clear data, treat everything as a single work day. Otherwise, would compress data into history and clear variables.
   * @returns {Boolean} False if session started on or after 3 a.m. today. Else True.
   * @todo Rewrite logic to match above description (one long if statement for false rather than four individual if statements for true)
   */
  dataToCompressExists() {
    const currDate = new Date();
    if (this.sessionStartDateTime.getFullYear() < currDate.getFullYear()) {
      return true;
    } if (this.sessionStartDateTime.getMonth() < currDate.getMonth()) {
      return true;
    } if (this.sessionStartDateTime.getDate() < currDate.getDate()) {
      return true;
    } if (this.sessionStartDateTime.getHours() <= 2) {
      return true;
    }
    return false;
  }

  /**
   *  Compresses necessary local variables to a history record and pushes the record to local storage. Should run when the End Day button is hit or when page loads and dataToCompressExists() === true. Dispatches reset-timer event to reset timer PomoSessionId to 0.
   */
  compressStats() {
    if (this.totalMins > 0) {
      this.history.push({
        date: this.sessionStartDateTime,
        distractionCount: this.distractionList.length,
        timeSpent: this.totalMins,
      });
      localStorage.setItem('statsHistory', JSON.stringify(this.history));
    }

    const event = new CustomEvent('reset-timer', {
    });
    this.dispatchEvent(event);
  }

  /**
   *  Resets all variables back to zeroed/empty values
   */
  clearData() {
    this.totalMins = 0;
    this.workMins = 0;
    this.tasksCompleted = 0;
    this.expectedPomoSessions = 0;
    this.actualPomoSessions = 0;
    this.distractionList = [];
    this.sessionStartDateTime = new Date();
    this.updateMinorLocalStorage();
  }
}

customElements.define('stats-block', Statistics);
export { Statistics };
