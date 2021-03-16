/* eslint-disable max-len */
class Statistics extends HTMLElement {
  constructor() {
    super();
    this.distractionList = [];
    this.addHTMLChildren();
    this.addEventListeners()
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

    /* Adding things to Distraction Tab*/


    // Number of Broken Session
    this.brokenSessions = document.createElement('p');
    this.brokenSessions.setAttribute('id', 'stats_numBrokenSessions');
    this.brokenSessions.setAttribute('class', 'dist-info');
    this.brokenSessionsLabel = document.createElement('p');
    this.brokenSessionsLabel.setAttribute('id', 'stats_brokenSessionsLabel');
    this.brokenSessionsLabel.setAttribute('class', 'dist-info-label');
    this.brokenSessionsLabel.textContent = 'Broken Sessions';
    this.parentDiv.appendChild(this.brokenSessions);
    this.parentDiv.appendChild(this.brokenSessionsLabel);
    //Number of Expected Pomo Sessions;
    this.expectedPomoSessionsData = document.createElement('p');
    this.expectedPomoSessionsData.setAttribute('id','stats_expectedPomoSesh');
    this.expectedPomoSessionsData.setAttribute('class','stats-info');
    this.expectedPomoSessionsLabel = document.createElement('p');
    this.expectedPomoSessionsLabel.setAttribute('id','stats_expectedPomoSesLabel');
    this.expectedPomoSessionsLabel.setAttribute('class','stats-info-label');
    this.expectedPomoSessionsLabel.textContent = 'Expected Pomo Sessions';
    this.parentDiv.appendChild(this.expectedPomoSessionsData);
    this.parentDiv.appendChild(this.expectedPomoSessionsLabel);

    //Number of Actual Pomo Sessions

    this.actualPomoSessionsData = document.createElement('p');
    this.actualPomoSessionsData.setAttribute('id', 'stats_actualPomo');
    this.actualPomoSessionsData.setAttribute('class','stats-info');
    this.actualPomoSessionsLabel = document.createElement('p');
    this.actualPomoSessionsLabel.setAttribute('id','stats_actualPomoSesLabel');
    this.actualPomoSessionsLabel.setAttribute('class','stats-info-label');
    this.actualPomoSessionsLabel.textContent = 'Actual Pomo Sessions';
    this.parentDiv.appendChild(this.actualPomoSessionsData);
    this.parentDiv.appendChild(this.actualPomoSessionsLabel);

    // Average Number of Distractions Per Task
    this.avgDistractions = document.createElement('p');
    this.avgDistractions.setAttribute('id','dist_avgDistractions');
    this.avgDistractions.setAttribute('class','dist-info');
    this.avgDistractionsLabel = document.createElement('p');
    this.avgDistractionsLabel.setAttribute('id', 'dist_avgDistractionLabel');
    this.avgDistractionsLabel.setAttribute('class','dist-info-label');
    this.avgDistractionsLabel.textContent = "Average Distractions Per Task";
    this.parentDiv.appendChild(this.avgDistractions);
    this.parentDiv.appendChild(this.avgDistractionsLabel);

    //Distraction List
    this.distList = document.createElement('ul');
    this.distList.setAttribute('class', 'dist-list');
    this.parentDiv.appendChild(this.distList);
    this.distListLabel = document.createElement('p');
    this.distListLabel.setAttribute('id', 'dist_listLabel');
    this.distListLabel.setAttribute('class','dist-info-label');
    this.distListLabel.textContent = "Distraction List";
    this.parentDiv.appendChild(this.distListLabel);

  }


  updateDistractionList(){
    let content = document.getElementsByClassName('distItem');
    let i;
    if(content.length == 0 ){
      i = 0
    }else {
      i = content.length;
    }
    while( i < this.distractionList.length ){
      this.listElement = document.createElement('li');
      this.listElement.setAttribute('class','distItem');
      this.listElement.textContent = this.distractionList[i].description;
      this.distList.appendChild(this.listElement);
      i++;
    }
  }

  addEventListeners(){
    let statsDistractBtn = document.getElementById('distraction');
    let statsTabBtn = document.getElementById('data');
    statsDistractBtn.addEventListener('click', () => {
      statsTabBtn.className = "tab-btn";
      let content = document.getElementsByClassName('stats-info');
      let contentlabel = document.getElementsByClassName('stats-info-label');
        for(let i = 0; i < content.length; i++){
          content[i].style.display = "none";
          contentlabel[i].style.display = "none";
        }
        content = document.getElementsByClassName('dist-info');
        contentlabel = document.getElementsByClassName('dist-info-label');
        document.getElementsByClassName('dist-list')[0].style.display = 'block';
        for(let i = 0; i < content.length; i++){
          content[i].style.display = "block";
        }
        for(let i = 0; i < contentlabel.length; i++){
          contentlabel[i].style.display = "block";
        }
      statsDistractBtn.className = "tab-btn-active";
    });
    statsTabBtn.addEventListener('click', () => {
      statsDistractBtn.className = "tab-btn";
      let content = document.getElementsByClassName('dist-info');
      let contentlabel = document.getElementsByClassName("dist-info-label");
        for(let i = 0; i < content.length; i++){
          content[i].style.display = "none";
        }
        for(let i = 0; i < contentlabel.length; i++){
          contentlabel[i].style.display = "none";
        }
      document.getElementsByClassName('dist-list')[0].style.display = 'none';
      content = document.getElementsByClassName('stats-info');
      contentlabel = document.getElementsByClassName('stats-info-label');
        for(let i = 0; i < content.length; i++){
          content[i].style.display = "block";
          contentlabel[i].style.display = "block";
        }
      statsTabBtn.className = "tab-btn-active";
  });

    document.getElementById('overlay').addEventListener('click',() =>{
      document.getElementById('close-stats-button').click();
    });
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

  updateDom() {
    this.timePerTask.textContent = this.getAverageTimePerTask();

    this.tasksCompletedP.textContent = this.tasksCompleted;

    this.timeWorking.textContent = this.workMins;

    this.timeSpent.textContent = this.totalMins;

    this.brokenSessions.textContent = this.distractionList.length;
    
    this.avgDistractions.textContent = this.getAvgDistractionsPerTask();

    this.expectedPomoSessionsData.textContent = this.expectedPomoSessions;

    this.actualPomoSessionsData.textContent = this.actualPomoSessions;
    
    this.updateDistractionList();


  }

  incrementTasksCompleted() {
    this.tasksCompleted += 1;
    this.updateMinorLocalStorage();
  }

  decrementTasksCompleted() {
    if (this.tasksCompleted > 0) {
      this.tasksCompleted -= 1;
      this.updateMinorLocalStorage();
    } // else I'm interested to see how you got there
  }

  addDistraction(distraction) {
    this.distractionList.push(distraction);
    this.updateMinorLocalStorage();
  }

  addTimeSpent(numMins) {
    this.totalMins += (numMins);
    this.updateMinorLocalStorage();
  }

  addWorkTime(numMins) {
    this.workMins += (numMins);
    this.addTimeSpent(numMins);
  }

  addExpectedPomoSessions(numSessions) {
    this.expectedPomoSessions += numSessions;
    this.updateMinorLocalStorage();
  }

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
    this.totalMins = ((this.totalMins !== null) ? parseInt(this.totalMins, 10) : 0);
    this.workMins = ((this.workMins !== null) ? parseInt(this.workMins, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
    this.expectedPomoSessions = ((this.expectedPomoSessions !== null) ? parseInt(this.expectedPomoSessions, 10) : 0);
    this.actualPomoSessions = ((this.actualPomoSessions !== null) ? parseInt(this.actualPomoSessions, 10) : 0);
    this.tasksCompleted = ((this.tasksCompleted !== null) ? parseInt(this.tasksCompleted, 10) : 0);
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
  }

  flushHistory() {
    // deletes all objects from local storage that are older than a year
    // this.loadFromLocalStorage();
    for (let i = 0; i < this.history.length; i += 1) {
      if ((new Date(this.history[i].date) - new Date()) / (1000 * 3600 * 24 * 365) > 1) {
        this.history.splice(i, 1);
      }
    }
  }

  getMinDistractionDate() {
    if(this.distractionList.length === 0) {
      return null;
    }
    const sortedDistractions = this.distractionList.slice().sort((a, b) => b.date - a.date);
    return sortedDistractions[0].date;
  }

  // distractions exist from last year/month/day/before 3am
  oldDistractionsExist() {
    const minDistractionDate = this.getMinDistractionDate();
    if (minDistractionDate === null) {
      return false;
    }
    const currDate = new Date();
    if (minDistractionDate.getFullYear() < currDate.getFullYear()) {
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
