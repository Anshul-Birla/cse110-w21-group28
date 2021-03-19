/**
 * Names for break
 * @type {Object}
*/
const breakNames = {
  short: 'short-break',
  long: 'long-break',
};

/**
 * Background color for the page
 * @type {Object}
 */
const pageBGColor = {
  name: '--page-bg-color',
  shortName: '--page-bg-color-short',
  val: 'cadetblue',
  shortVal: '#336b87',
  darkVal: '#363636',
};

/**
 * Color for the header
 * @type {Object}
 */
const headerColor = {
  name: '--header-color',
  shortName: '--header-color-short',
  val: 'darkcyan',
  shortVal: '#4990b4',
  darkVal: '2d2c2b',
};

/**
 * Color for even tr
 * @type {Object}
 */
const evenColor = {
  name: '--even-color',
  shortName: '--even-color-short',
  val: 'rgba(149, 218, 229, 0.603)',
  shortVal: '#98c7e9',
  darkVal: 'lightslategray',
};

/**
 * Toothpaste-esque colors
 * @type {Object}
 */
const toothpaste = {
  name: '--toothpaste',
  val: 'rgb(2, 177, 177)',
  darkVal: '#2d2c2b',
};

/**
 * Background color for table
 * @type {Object}
 */
const tableBG = {
  name: '--table-bg=color-short',
  val: '#60afcc',
  darkVal: '#2d2c2b',
};

/**
 * Modal background color
 * @type {Object}
 */
const modalBGColor = {
  name: '--modal-bg-color',
  val: '#f1f1f1',
  darkVal: '#2d2c2b',
};

/**
 * Font for modal
 * @type {Object}
 */
const modalFontColor = {
  name: '--modal-font-color',
  val: 'black',
  darkVal: 'white',
};

export {
  breakNames, pageBGColor, headerColor, toothpaste, tableBG, evenColor,
  modalBGColor, modalFontColor,
};
