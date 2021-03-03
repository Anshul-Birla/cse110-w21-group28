class Statistics extends HTMLElement {
  constructor() {
    super();
    this.totalMins = 0;
    this.workMins = 0;
    this.tasksCompleted = 0;
    this.numDistractions = 0;
    this.distractionList = [];
    this.expectedPomoSessions = 0;
    this.actualPomoSessions = 0;
    this.addHTMLChildren();
    this.updateDom();
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

  addDistraction(description) {
    this.distractionList.push(description);
    this.numDistractions += 1;
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
      return (this.workMins * 60) / this.tasksCompleted;
    }
    return 0;
  }

  updateDom() {
    this.timePerTask.textContent = this.getAverageTimePerTask();
    console.log(this.getAverageTimePerTask());

    this.tasksCompletedP.textContent = this.tasksCompleted;

    this.timeWorking.textContent = this.workMins;

    this.timeSpent.textContent = this.totalMins;

    this.brokenSessions.textContent = this.numDistractions;
  }

  loadFromLocalStorage() {
    // loads history of pomo sessions
    this.temp = 5;
  }

  flushLocalStorage() {
    // deletes all objects from local storage that are older than a year
    this.temp = 5;
  }

  writeToLocalStorage() {
    // saves data to local storage
    this.temp = 5;
  }
}

customElements.define('stats-block', Statistics);
export { Statistics };
