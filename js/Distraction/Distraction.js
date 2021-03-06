class Distraction extends HTMLElement {
  /**
   * @param {HTMLButton} distractButton
   * @param {HTMLSection} distractPopUp
   * @param {HTMLButton} cancelButton
   * @param {HTMLButton} submitButton
   */
  constructor(distractButton, distractPopUp, cancelButton, submitButton, description) {
    super();
    this.distractButton = distractButton;
    this.distractPopUp = distractPopUp;
    this.cancelButton = cancelButton;
    this.submitButton = submitButton;
    this.description = description;
    this.distractions = [];
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.distractButton.addEventListener('click', () => {
      if (this.distractPopUp.style.display === 'block') {
        this.resetPopUp();
      } else {
        this.distractPopUp.style.display = 'block';
      }
    });

    this.cancelButton.addEventListener('click', () => {
      this.resetPopUp();
    });

    this.submitButton.addEventListener('click', () => {
      this.resetPopUp();
      const event = new CustomEvent('distraction-created', {
        distraction: {
          date: new Date(),
          description: this.description.value,
          pomoSessionId: null,
        },
      });
      this.dispatchEvent(event);
    });
  }

  /**
   * This function will make the pop up disappear
   * and remove any of the text in the 'description' field.
   */
  resetPopUp() {
    this.distractPopUp.style.display = 'none';
    document.getElementById('description').value = '';
  }

  hideButton() {
    this.distractButton.style.display = 'none';
  }

  showButton() {
    this.distractButton.style.display = 'block';
  }
}

customElements.define('distraction-page', Distraction);
export { Distraction };
