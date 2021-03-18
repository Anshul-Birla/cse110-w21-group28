/**
 * The object that stores the textContent for each HTML elements.
 * @type {Object} HTMLAttributes
 */
const HTMLAttributes = {
  buttonDoneTextContent: 'Done',
  buttonAddTextContent: 'Add Task',
  taskNameId: 'task-name',
  taskPomoSessions: 'task-length',
};

/**
 * The object that stores the corresponding index of each element.
 * Used in the array of JSON.parse(localStorage.getItem('tasks'))
 * @type {Object} TaskStorage
 */
const TaskStorage = {
  idIndex: 0,
  nameIndex: 1,
  totalSessionIndex: 2,
  currentSessionIndex: 3,
  checkedIndex: 4,
};

export { HTMLAttributes, TaskStorage };
