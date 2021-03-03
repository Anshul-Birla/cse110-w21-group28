class Statistics extends HTMLElement {
  constructor() {
    super();
    this.totalMins = 0;
    this.workMins = 0;
    this.tasksCompleted = 0;
    this.distractionList = [];
    this.loadFromLocalStorage();
    this.expectedPomoSessions = 0;
    this.actualPomoSessions = 0;
    // this.addHTMLChildren();
    // this.updateDom();
  }

  addHTMLChildren() {
    this.parentDiv = document.getElementById('parentDiv');

    this.timePerTask = document.createElement('p');
    this.timePerTask.setAttribute('id', 'stats_timePerTask');
    this.parentDiv.appendChild(this.timePerTask);

    this.tasksCompletedP = document.createElement('p');
    this.tasksCompletedP.setAttribute('id', 'stats_tasksCompleted');
    this.parentDiv.appendChild(this.tasksCompletedP);

    this.timeWorking = document.createElement('p');
    this.timeWorking.setAttribute('id', 'stats_workTime');
    this.parentDiv.appendChild(this.timeWorking);

    this.timeSpent = document.createElement('p');
    this.timeSpent.setAttribute('id', 'stats_totalTime');
    this.parentDiv.appendChild(this.timeSpent);

    // this.distractionList = document.createElement('ul');
    // this.distractionList.setAttribute('id', 'stats_distractionList');
    // this.appendChild(this.distractionList);

    this.brokenSessions = document.createElement('p');
    this.brokenSessions.setAttribute('id', 'stats_numBrokenSessions');
    this.parentDiv.appendChild(this.brokenSessions);
  }

  incrementTasksCompleted() {
    this.tasksCompleted += 1;
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
    for (let i = 0; i < this.history.length(); i += 1) {
      if ((new Date(this.history[i].date) - new Date()) / (1000 * 3600 * 24 * 365) > 1) {
        this.history.splice(i, 1);
      }
    }
  }

  getMinDistractionDate() {
    const sortedDistractions = this.distractionList.slice().sort((a, b) => b.date - a.date);
    return sortedDistractions[0];
  }

  compressStats() {
    /** saves data to local storage, runs when End Day is hit and
     *  when page loads (compresses data that is older than 3a.m. today)
     * REMINDER: Set pomo session id to 0
     */
    // this.loadFromLocalStorage();
    const minDistractionDate = this.getMinDistractionDate();
    this.history.push({
      date: new Date(minDistractionDate),
      distractionCount: this.distractionList.length(),
      timeSpent: this.timeSpent,
    });
    localStorage.setItem('statsHistory', JSON.stringify(this.history));
  }
}

customElements.define('stats-block', Statistics);
export { Statistics };
