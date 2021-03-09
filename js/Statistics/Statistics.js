class Statistics extends HTMLElement {
  constructor() {
    super();
    this.totalMins = 0;
    this.workMins = 0;
    this.tasksCompleted = 0;
    this.distractionList = [];
    this.expectedPomoSessions = 0;
    this.actualPomoSessions = 0;
    this.addHTMLChildren();
    this.loadFromLocalStorage();
    this.flushLocalStorage();
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

  incrementTasksCompleted() {
    this.tasksCompleted += 1;
  }

  decrementTasksCompleted() {
    if (this.tasksCompleted > 0) {
      this.tasksCompleted -= 1;
    } // else I'm interested to see how you got there
  }

  addDistraction(distraction) {
    this.distractionList.push(distraction);
  }

  getNumUniqueDistractions() {
    const uniqueDistractionId = new Set(this.distractionList.map((item) => item.pomoSessionId));
    return uniqueDistractionId.size;
  }

  getAvgDistractionsPerTask() {
    if (this.tasksCompleted === 0) {
      return 0;
    }
    const rawNumber = this.distractionList.length / this.tasksCompleted;
    return Math.round(rawNumber * 10) / 10;
  }

  addTimeSpent(numMins) {
    this.totalMins += numMins;
  }

  addWorkTime(numMins) {
    this.workMins += numMins;
    this.addTimeSpent(numMins);
  }

  addExpectedPomoSessions(numSessions) {
    this.expectedPomoSessions += numSessions;
  }

  deleteExpectedPomoSessions(numSessions) {
    if (this.expectedPomoSessions >= numSessions) {
      this.expectedPomoSessions -= numSessions;
    } // else I'm interested how you got here
  }

  incrementActualPomoSessions() {
    this.actualPomoSessions += 1;
  }

  getAverageTimePerTask() {
    if (this.tasksCompleted > 0) {
      return this.workMins / this.tasksCompleted;
    }
    return 0;
  }

  updateDom() {
    this.timePerTask.textContent = this.getAverageTimePerTask();

    this.tasksCompletedP.textContent = this.tasksCompleted;

    this.timeWorking.textContent = this.workMins;

    this.timeSpent.textContent = this.totalMins;

    this.brokenSessions.textContent = this.distractionList.length;
  }

  loadFromLocalStorage() {
    // loads history of pomo sessions
    this.history = JSON.parse(localStorage.getItem('statsHistory'));
    if (this.history === null) {
      this.history = [];
    }
  }

  flushLocalStorage() {
    // deletes all objects from local storage that are older than a year
    // this.loadFromLocalStorage();
    for (let i = 0; i < this.history.length; i += 1) {
      if ((new Date(this.history[i].date) - new Date()) / (1000 * 3600 * 24 * 365) > 1) {
        this.history.splice(i, 1);
      }
    }
  }

  getMinDistractionDate() {
    const sortedDistractions = this.distractionList.slice().sort((a, b) => b.date - a.date);
    return sortedDistractions[0].date;
  }

  // distractions exist from last year/month/day/before 3am
  oldDistractionsExist() {
    const minDistractionDate = this.getMinDistractionDate().prototype;
    const currDate = Date().prototype;
    if (minDistractionDate.prototype.getFullYear() < currDate.getFullYear()) {
      return true;
    } if (minDistractionDate.getMonth() < currDate.getMonth()) {
      return true;
    } if (minDistractionDate.getDate() < currDate.getDate()) {
      return true;
    } if (minDistractionDate.getHours() <= 2) {
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
    if (this.timeSpent > 0) {
      this.history.push({
        date: this.getMinDistractionDate(),
        distractionCount: this.distractionList.length(),
        timeSpent: this.timeSpent,
      });
      localStorage.setItem('statsHistory', JSON.stringify(this.history));
    }

    const event = new CustomEvent('reset-timer', {
    });
    this.dispatchEvent(event);
  }
}

customElements.define('stats-block', Statistics);
export { Statistics };
