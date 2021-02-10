/*
 *
 *
 *
 */
class Task {

    /**
     * initialize a Task
     * @param {String}
     * @param {Number}
     */
    constructor(id, name, totalSession) {
      this.id = id;
      this.name = name;
      this.totalSession = totalSession;
      this.currentSessionNum = 0;
      this.checked = False;
    }

    function incrementSession(){ }

    function checkOffTask(){
      this.checked = True;
    }


}

export { Task };
