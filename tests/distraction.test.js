import { Distraction } from '../js/Distraction/Distraction.js';

/** @Test {ToDoList} */
let DistractionPage;

beforeEach(() => {
  document.body.innerHTML = `
  <div id='overlay'></div>
  <button id="distractionButton" class = "pure-button">Distraction</button>
  <section class="form-popup" id="distract-popup">
    <form class="form-container" id="distract-form-container">
      <h1>Report Distraction</h1>

      <label><b>Distraction Description</b></label>
      <input type="text" placeholder="Enter a short description of the distraction" id="description">

      <button type="button" class="distractFormButton" id="submit-button">Submit</button>
      <button type="button" class="distractFormButton cancel" id="cancel-button">Cancel</button>
    </form>
  </section>`;
  const distractButton = document.getElementById('distractionButton');
  const distractPopUp = document.getElementById('distract-popup');
  const cancelButton = document.getElementById('cancel-button');
  const submitButton = document.getElementById('submit-button');
  const description = document.getElementById('description');
  const overlay = document.getElementById('overlay');
  // eslint-disable-next-line max-len
  DistractionPage = new Distraction(distractButton, distractPopUp, cancelButton, submitButton, description, overlay);
});

test('Test show and hide', () => {
  DistractionPage.distractButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('block');
  DistractionPage.cancelButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('none');
  DistractionPage.distractButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('block');
  DistractionPage.distractButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('none');
});

test('submit first time', () => {
  DistractionPage.distractButton.click();
  DistractionPage.description.value = 'go to restroom';
  DistractionPage.submitButton.click();
  expect(DistractionPage.distractPopUp.style.display).toBe('none');
  expect(DistractionPage.description.value).toBe('');
});
/*
test('local Storage', () => {
  let distractions = JSON.parse(localStorage.getItem('distractions'));
  expect(distractions[0].id === 0);
  expect(distractions[0].description).toBe('go to restroom');
});

test('submit second time', () => {
  DistractionPage.distractButton.click();
  DistractionPage.description.value = 'go to bathroom';
  DistractionPage.submitButton.click();
  expect(DistractionPage.distractions[1].id === 0);
  expect(DistractionPage.distractions[1].description).toBe('go to bathroom');
});

test('local Storage again', () => {
  let distractions = JSON.parse(localStorage.getItem('distractions'));
  expect(distractions[1].id === 0);
  expect(distractions[1].description).toBe('go to bathroom');
  localStorage.clear();
});
*/
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
