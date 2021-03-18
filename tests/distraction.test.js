import { Distraction } from '../js/Distraction/Distraction.js';

/** @Test {ToDoList} */
let DistractionPage;

beforeEach(() => {
  document.body.innerHTML = `
  <div id='overlay'></div>
  <button id="distractionButton" class = "pure-button">Distraction</button>
  <section class="form-popup" id="distract-popup">
    <form class="form-container" id="distract-form">
      <h1>Report Distraction</h1>

      <label><b>Distraction Description</b></label>
      <input type="text" placeholder="Enter a short description of the distraction" id="description" required="">

      <button type="submit" class="distractFormButton" id="submit-button">Submit</button>
      <button type="button" class="distractFormButton cancel" id="cancel-button">Cancel</button>
    </form>
  </section>`;
  const distractButton = document.getElementById('distractionButton');
  const distractPopUp = document.getElementById('distract-popup');
  const cancelButton = document.getElementById('cancel-button');
  const distractForm = document.getElementById('distract-form');
  const description = document.getElementById('description');
  const overlay = document.getElementById('overlay');
  // eslint-disable-next-line max-len
  DistractionPage = new Distraction(distractButton, distractPopUp, cancelButton, distractForm, description, overlay);
});

test('Test show and hide', () => {
  DistractionPage.distractButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('block');
  DistractionPage.cancelButton.click();
  setTimeout(() => {
    expect(DistractionPage.distractPopUp.style.display).toBe('none');
  }, 3000);
  DistractionPage.distractButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('block');
  DistractionPage.distractButton.click();
  setTimeout(() => {
    expect(DistractionPage.distractPopUp.style.display).toBe('none');
  }, 3000);
});

test('submit first time', () => {
  DistractionPage.distractButton.click();
  DistractionPage.description.value = 'go to restroom';
  DistractionPage.distractForm.submit();
  setTimeout(() => {
    expect(DistractionPage.distractPopUp.style.display).toBe('none');
  }, 3000);
  expect(DistractionPage.description.value).toBe('');
});

test('hide button', () => {
  DistractionPage.hideButton();
  expect(DistractionPage.distractButton.style.display).toBe('none');
});

test('show button', () => {
  DistractionPage.showButton();
  expect(DistractionPage.distractButton.style.display).toBe('block');
});
/*
test('input nothing', () => {
  DistractionPage.distractButton.click();
  DistractionPage.description.value = '';
  DistractionPage.submitButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('block');
});
*/

test('animation end event listener', () => {
  const event = new Event('animationend');
  DistractionPage.distractPopUp.dispatchEvent(event);
  expect(DistractionPage.distractPopUp.style.animationName).toBe('');

  DistractionPage.overlay.dispatchEvent(event);
  expect(DistractionPage.overlay.style.animationName).toBe('');
});

test('click overlay to close', () => {
  DistractionPage.distractButton.click();
  DistractionPage.overlay.click();
  setTimeout(() => {
    expect(DistractionPage.distractPopUp.style.display).toBe('none');
  }, 3000);
});