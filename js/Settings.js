const settingsButton = document.getElementById('settingsButton');
const settingsPopup = document.getElementById('settingsPopup');
const darkModeSwitch = document.getElementById('darkModeSwitch');
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
    if(darkModeSwitch.checked){
        root.style.setProperty('--page-bg-color', '#363636');
        root.style.setProperty('--page-bg-color-short', '#363636');
        root.style.setProperty('--header-color', '#2d2c2b');
        root.style.setProperty('--even-color', 'lightslategray');
        root.style.setProperty('--toothpaste', '#2d2c2b');
    }
    else{
        root.style.setProperty('--page-bg-color', 'cadetblue');
        root.style.setProperty('--page-bg-color-short', '#336b87');
        root.style.setProperty('--header-color', 'darkcyan');
        root.style.setProperty('--even-color', 'rgba(149, 218, 229, 0.603)');
        root.style.setProperty('--toothpaste', 'rgb(2, 177, 177)');
    }
});