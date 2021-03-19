/**
 * Classnames for everything contained in a task object
 * @type {Object}
 */
const classNames = {
  uncheckedTaskClassName: 'uncheckedTask',
  completedTaskClassName: 'completedTask',
  inlineDiv: 'inline',
  focusSvg: 'focus-svg',
  deleteSvg: 'delete-svg',
  threeDots: 'three-dots',
  threeDotsWrapper: 'triple-dots-touch',
  doubleButtons: 'double-buttons',
  lastCol: 'touch-target',
};

/**
 * The svg path attribute for the delete and the star buttons
 * @type {Object}
 */
const svg = {
  trashcan: 'M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z',
  star: 'M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z',
};

export { classNames, svg };
