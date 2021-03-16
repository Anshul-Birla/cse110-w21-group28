/* eslint-disable max-len */
class Statistics extends HTMLElement {
  constructor() {
    super();
    /**
     * @type {Object[]} Array that stores the distraction & which pomo session it happened during
     */
    this.distractionList = [];
    this.addHTMLChildren();
    this.loadFromLocalStorage();
    this.flushHistory();
  }

  addHTMLChildren() {
    this.parentDiv = document.getElementById('stats-info');

    this.tasksCompletedP = document.createElement('p');
    this.tasksCompletedP.setAttribute('id', 'stats_tasksCompleted');
    this.tasksCompletedP.setAttribute('class', 'stats-info');
    this.tasksCompletedPLabel = document.createElement('p');
    this.tasksCompletedPLabel.setAttribute('id', 'stats_tasksCompletedLabel');
    this.tasksCompletedPLabel.setAttribute('class', 'stats-info-label');
    this.tasksCompletedPLabel.textContent = 'Tasks Completed';
    this.parentDiv.appendChild(this.tasksCompletedP);
    this.parentDiv.appendChild(this.tasksCompletedPLabel);

    this.timeSpent = document.createElement('p');
    this.timeSpent.setAttribute('id', 'stats_totalTime');
    this.timeSpent.setAttribute('class', 'stats-info');
    this.timeSpentLabel = document.createElement('p');
    this.timeSpentLabel.setAttribute('id', 'stats_timeSpentLabel');
    this.timeSpentLabel.setAttribute('class', 'stats-info-label');
    this.timeSpentLabel.textContent = 'Total Minutes';
    this.parentDiv.appendChild(this.timeSpent);
    this.parentDiv.appendChild(this.timeSpentLabel);

    this.timeWorking = document.createElement('p');
    this.timeWorking.setAttribute('id', 'stats_workTime');
    this.timeWorking.setAttribute('class', 'stats-info');
    this.timeWorkingLabel = document.createElement('p');
    this.timeWorkingLabel.setAttribute('id', 'stats_timeWorkingLabel');
    this.timeWorkingLabel.setAttribute('class', 'stats-info-label');
    this.timeWorkingLabel.textContent = 'Working Minutes';
    this.parentDiv.appendChild(this.timeWorking);
    this.parentDiv.appendChild(this.timeWorkingLabel);

    this.timePerTask = document.createElement('p');
    this.timePerTask.setAttribute('id', 'stats_timePerTask');
    this.timePerTask.setAttribute('class', 'stats-info');
    this.timePerTaskLabel = document.createElement('p');
    this.timePerTaskLabel.setAttribute('id', 'stats_timePerTaskLabel');
    this.timePerTaskLabel.setAttribute('class', 'stats-info-label');
    this.timePerTaskLabel.textContent = 'Minutes per Task';
    this.parentDiv.appendChild(this.timePerTask);
    this.parentDiv.appendChild(this.timePerTaskLabel);

    // this.distractionList = document.createElement('ul');
    // this.distractionList.setAttribute('id', 'stats_distractionList');
    // this.appendChild(this.distractionList);

    this.brokenSessions = document.createElement('p');
    this.brokenSessions.setAttribute('id', 'stats_numBrokenSessions');
    this.brokenSessions.setAttribute('class', 'stats-info');
    this.brokenSessionsLabel = document.createElement('p');
    this.brokenSessionsLabel.setAttribute('id', 'stats_brokenSessionsLabel');
    this.brokenSessionsLabel.setAttribute('class', 'stats-info-label');
    this.brokenSessionsLabel.textContent = 'Broken Sessions';
    this.parentDiv.appendChild(this.brokenSessions);
    this.parentDiv.appendChild(this.brokenSessionsLabel);
  }

  updateDom() {
    this.timePerTask.textContent = this.getAverageTimePerTask();

    this.tasksCompletedP.textContent = this.tasksCompleted;

    this.timeWorking.textContent = this.workMins;

    this.timeSpent.textContent = this.totalMins;

    this.brokenSessions.textContent = this.getNumUniqueDistractions();
  }

  /**
   * @description Increments by one every time a task is marked as completed
   */
  incrementTasksCompleted() {
    this.tasksCompleted += 1;
    this.updateMinorLocalStorage();
  }

  /**
   * @description Decrements by one every time a task is marked as not-completed given that there are tasks that can be uncompleted. Updates local storage when called.
   */
  decrementTasksCompleted() {
    if (this.tasksCompleted > 0) {
      this.tasksCompleted -= 1;
      this.updateMinorLocalStorage();
    } // else I'm interested to see how you got there
  }

  /**
   * @description Adds a distraction (represented by a JSON object) to the list of distractions. Updates local storage when called.
   * @param {JSON Object} distraction Distraction to be added
   */
  addDistraction(distraction) {
    this.distractionList.push(distraction);
    this.updateMinorLocalStorage();
  }

  /**
   * @description Gets the number of broken work sessions. If multiple distractions during one work session occurred, only counts as one unique broken pomo session.
   * @returns {Number} Number of disrupted work sessions
   */
  getNumUniqueDistractions() {
    const uniqueDistractionId = new Set(this.distractionList.map((item) => item.pomoSessionId));
    return uniqueDistractionId.size;
  }

  /**
   * @description Counts average number of distractions per task
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
   * @description Increments the total time spent. Updates local storage when called.
   * @param {Number} numMins Number of minutes to increment count by
   */
  addTimeSpent(numMins) {
    this.totalMins += (numMins * 1);
    this.updateMinorLocalStorage();
  }

  /**
   * @description Increments the work time spent. When work time incremented, so is total time spent (runs as separate method call to addTimeSpent())
   * @param {Number} numMins Number of minutes to increment work count by
   */
  addWorkTime(numMins) {
    this.workMins += (numMins * 1);
    this.addTimeSpent(numMins);
  }

  /**
   * @description Increments the planned number of pomo sessions for the work day. Should be called each time a task is added.
   * @param {Number} numSessions Number of sessions to increment count by
   */
  addExpectedPomoSessions(numSessions) {
    this.expectedPomoSessions += numSessions;
    this.updateMinorLocalStorage();
  }

  /**
   * @description Decrements the planned number of pomo sessions for the work day. Should be called each time a task is deleted. Only decrements if new tasks were added during the current work day.
   * @param {Number} numSessions Number of sessions to decrement count by
   */
  deleteExpectedPomoSessions(numSessions) {
    if (this.expectedPomoSessions >= numSessions) {
      this.expectedPomoSessions -= numSessions;
      this.updateMinorLocalStorage();
    } // else I'm interested how you got here
  }

  incrementActualPomoSessions() {
    this.actualPomoSessions += 1;
    this.updateMinorLocalStorage();
  }

  getAverageTimePerTask() {
    if (this.tasksCompleted > 0) {
      return this.workMins / this.tasksCompleted;
    }
    return 0;
  }

  loadFromLocalStorage() {
    // loads history of pomo sessions
    this.history = JSON.parse(localStorage.getItem('statsHistory'));
    if (this.history === null) {
      this.history = [];
    }
    this.totalMins = localStorage.getItem('totalMins');
    this.workMins = localStorage.getItem('workMins');
    this.tasksCompleted = localStorage.getItem('tasksCompleted');
    this.expectedPomoSessions = localStorage.getItem('expectedPomoSessions');
    this.actualPomoSessions = localStorage.getItem('actualPomoSessions');
    this.distractionList = localStorage.getItem('currDistractionList');
    this.sessionStartDateTime = localStorage.getItem('startDateTime');
    this.totalMins = ((this.totalMins !== null) ? parseInt(this.totalMins, 10) : 0);
    this.workMins = ((this.workMins !== null) ? parseInt(this.workMins, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
    this.expectedPomoSessions = ((this.expectedPomoSessions !== null) ? parseInt(this.expectedPomoSessions, 10) : 0);
    this.actualPomoSessions = ((this.actualPomoSessions !== null) ? parseInt(this.actualPomoSessions, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
    this.sessionStartDateTime = ((this.sessionStartDateTime !== null) ? new Date(this.sessionStartDateTime) : new Date());
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

  updateMinorLocalStorage() {
    localStorage.setItem('totalMins', this.totalMins);
    localStorage.setItem('workMins', this.workMins);
    localStorage.setItem('tasksCompleted', this.tasksCompleted);
    localStorage.setItem('expectedPomoSessions', this.expectedPomoSessions);
    localStorage.setItem('actualPomoSessions', this.actualPomoSessions);
    localStorage.setItem('currDistractionList', JSON.stringify(this.distractionList));
    localStorage.setItem('startDateTime', this.sessionStartDateTime);
  }

  flushHistory() {
    // deletes all objects from local storage that are older than a year
    // this.loadFromLocalStorage();
    const currDate = new Date();
    for (let i = 0; i < this.history.length; i += 1) {
      const diff = (currDate - new Date(this.history[i].date));
      if (diff / (1000 * 3600 * 24 * 365) > 1) {
        this.history.splice(i, 1);
      }
    }
    localStorage.setItem('statsHistory', JSON.stringify(this.history));
  }

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

  compressStats() {
    /** saves data to local storage, runs when End Day is hit and
     *  when page loads (compresses data that is older than 3a.m. today)
     * REMINDER: Set pomo session id to 0
     */
    // this.loadFromLocalStorage();
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
   * @description Resets all variables back to zeroed/empty values
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