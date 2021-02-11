class Task {
  // constructor, incrementSession, checkOff

  /**
  * initialize a Task
  * @param {String}
  * @param {Number}
  */
  constructor(id, name, totalSessions) {
    this.id = id;
    this.name = name;
    this.totalSessions = totalSessions;
    this.currentSessionNum = 0;
    this.checked = false;
  }

  incrementSession() {
    this.currentSessionNum += 1;
  }

  checkOffTask() {
    this.checked = true;
  }
}

export { Task };
