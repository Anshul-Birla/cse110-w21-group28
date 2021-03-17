const settingsButton = document.getElementById('settingsButton');
const settingsPopup = document.getElementById('settingsPopup');

settingsButton.addEventListener('click', () => {
  if (settingsPopup.style.display === 'block') {
    settingsPopup.style.display = 'none';
  } else {
    settingsPopup.style.display = 'block';
  }
});
