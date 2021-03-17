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
    }
    else{
        root.style.setProperty('--page-bg-color', 'cadetblue');
        root.style.setProperty('--page-bg-color-short', '#336b87');
    }
});