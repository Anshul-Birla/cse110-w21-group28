const distractButton = document.getElementById('distractionButton');
const distractPopUp = document.getElementById('distract-popup');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');

/**
 * This function will make the pop up disappear
 * and remove any of the text in the 'description' field.
 */
function resetPopUp() {
  distractPopUp.style.display = 'none';
  document.getElementById('description').value = '';
}
  
distractButton.addEventListener('click', () => {
  distractPopUp.style.display = 'block';
});
  
cancelButton.addEventListener('click', () => {
  resetPopUp();
});
  
submitButton.addEventListener('click', () => {
  const description = document.getElementById('description').value;
  const time = document.getElementById('timeDisplay').textContent;
  if (description !== '') {
    let distractions = JSON.parse(localStorage.getItem('distractions'));
    if (distractions === null) {
      distractions = [];
    }
    distractions.push({ description, time });
    localStorage.setItem('distractions', JSON.stringify(distractions));
    resetPopUp();
  }
});
  