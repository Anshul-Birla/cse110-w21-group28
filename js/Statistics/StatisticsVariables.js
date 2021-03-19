/**
 * object that stores className constants
 * @type {Object}
 */
const classNames = {
  statsNumberClass: 'stats-info',
  statsLabelClass: 'stats-info-label',
  distNumberClass: 'dist-info',
  distLabelClass: 'dist-info-label',
  activeTabClass: 'tab-btn-active',
  nonActiveTabClass: 'tab-btn'
};

/**
 * object that stores local storage constants
 * @type {Object}
 */
const storageItemNames = {
  totalMins: 'totalMins',
  workMins: 'workMins',
  tasksCompleted: 'tasksCompleted',
  expectedPomoSessions: 'expectedPomoSessions',
  actualPomoSessions: 'actualPomoSessions',
  currDistractionList: 'currDistractionList',
  startDateTime: 'startDateTime'
};

export { classNames, storageItemNames };
