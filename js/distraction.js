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

/**
 * Clicking the distraction button will make the pop up appear.
 */
distractButton.onclick = () => {
  distractPopUp.style.display = 'block';
};

/**
 * Clicking the cancel button will reset the pop up.
 */
cancelButton.onclick = () => {
  resetPopUp();
};

/**
 * Clicking the submit button will add a description and time
 * to the array 'distractions' in local storage. It will
 * also reset the pop up.
 */
submitButton.onclick = () => {
  const description = document.getElementById('description').value;
  const time = document.getElementById('timeDisplay').textContent;
  if (description === '') {
  } else {
    let distractions = JSON.parse(localStorage.getItem('distractions'));
    if (distractions === null) {
      distractions = [];
    }
    distractions.push({ description, time });
    localStorage.setItem('distractions', JSON.stringify(distractions));
    resetPopUp();
  }
};
