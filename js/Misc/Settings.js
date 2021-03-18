/**
 * @type {HTMLButtonElement}
 */
const settingsButton = document.getElementById('settingsButton');
/**
 * @type {HTMLButtonElement}
 */
const settingsPopup = document.getElementById('settingsPopup');
/**
 * @type {HTMLInputElement}
 */
const darkModeSwitch = document.getElementById('darkModeSwitch');
/**
 * @type {HTMLElement}
 */
const root = document.querySelector(':root');
/**
 * handle the settings popup display
 */
settingsButton.addEventListener('click', () => {
  if (settingsPopup.style.display === 'block') {
    settingsPopup.style.display = 'none';
  } else {
    settingsPopup.style.display = 'block';
  }
});

/**
 * handle darkmode by changing root variables
 */
darkModeSwitch.addEventListener('change', () => {
  if (darkModeSwitch.checked) {
    root.style.setProperty('--page-bg-color', '#363636');
    root.style.setProperty('--page-bg-color-short', '#363636');
    root.style.setProperty('--header-color', '#2d2c2b');
    root.style.setProperty('--header-color-short', '#2d2c2b');
    root.style.setProperty('--even-color', 'lightslategray');
    root.style.setProperty('--even-color-short', 'lightslategray');
    root.style.setProperty('--toothpaste', '#2d2c2b');
    root.style.setProperty('--table-bg-color-short', '#2d2c2b');
    root.style.setProperty('--modal-bg-color', '#2d2c2b');
    root.style.setProperty('--modal-font-color', 'white');
  } else {
    root.style.setProperty('--page-bg-color', 'cadetblue');
    root.style.setProperty('--page-bg-color-short', '#336b87');
    root.style.setProperty('--header-color', 'darkcyan');
    root.style.setProperty('--header-color-short', '#4990b4');
    root.style.setProperty('--even-color', 'rgba(149, 218, 229, 0.603)');
    root.style.setProperty('--even-color-short', '#98c7e9');
    root.style.setProperty('--toothpaste', 'rgb(2, 177, 177)');
    root.style.setProperty('--table-bg-color-short', '#60afcc');
    root.style.setProperty('--modal-bg-color', '#f1f1f1');
    root.style.setProperty('--modal-font-color', 'black');
  }
});
