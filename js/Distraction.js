const distractButton = document.getElementById('distractionButton');
const distractPopUp = document.getElementById('distract-popup');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');
const overlay = document.getElementById('overlay');
/**
 * This function will make the pop up disappear
 * and remove any of the text in the 'description' field.
 */
function resetPopUp() {
  distractPopUp.style.animationName = 'distraction-animation-out';
  overlay.style.animationName = 'overlay-animation-out';
  document.getElementById('description').value = '';
}

distractButton.addEventListener('click', () => {
  if (distractPopUp.style.display === 'block') {
    resetPopUp();
  } else {
    distractPopUp.style.display = 'block';
    distractPopUp.style.animationName = 'distraction-animation-in';
    overlay.style.display = 'block';
    overlay.style.animationName = 'overlay-animation-in';
  }
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
/**
 * These event listeners trigger when the animation is finished. It resets
 * the popup animations and sets hides them when done.
 */
distractPopUp.addEventListener('animationend', (e) => {
  if (e.animationName === 'distraction-animation-out') {
    distractPopUp.style.animationName = '';
    distractPopUp.style.display = 'none';
  }
});

overlay.addEventListener('animationend', (e) => {
  if (e.animationName === 'overlay-animation-out') {
    overlay.style.animationName = '';
    overlay.style.display = 'none';
  }
});
