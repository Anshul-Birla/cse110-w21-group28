class Distraction extends HTMLElement {
  /**
   * @param {HTMLButton} distractButton
   * @param {HTMLSection} distractPopUp
   * @param {HTMLButton} cancelButton
   * @param {HTMLButton} submitButton
   */
  constructor(distractButton, distractPopUp, cancelButton, submitButton, description, overlay) {
    super();
    this.distractButton = distractButton;
    this.distractPopUp = distractPopUp;
    this.cancelButton = cancelButton;
    this.submitButton = submitButton;
    this.description = description;
    this.overlay = overlay;
    this.distractions = [];
    this.setupEventListeners();
  }

  /**
  * Sets up event listeners to make distraction appear, submit, etc.
  */
  setupEventListeners() {
    // Distraction button makes distraction popup appear
    this.distractButton.addEventListener('click', () => {
      if (this.distractPopUp.style.display === 'block') {
        this.resetPopUp();
      } else {
        this.distractPopUp.style.display = 'block';
        this.distractPopUp.style.animationName = 'distraction-animation-in';
        this.overlay.style.display = 'block';
        this.overlay.style.animationName = 'overlay-animation-in';
      }
    });

    // Cancel makes popup go away
    this.cancelButton.addEventListener('click', () => {
      this.resetPopUp();
    });

    // Submit button fires event that App.js will catch and log
    this.submitButton.addEventListener('click', () => {
      const event = new CustomEvent('distraction-created', {
        detail: {
          date: new Date(),
          description: this.description.value,
          pomoSessionId: null,
        },
      });
      this.dispatchEvent(event);
      this.resetPopUp();
    });

    /**
    * These event listeners trigger when the animation is finished. It resets
    * the popup animations and sets hides them when done.
    */
    this.distractPopUp.addEventListener('animationend', (e) => {
      if (e.animationName === 'distraction-animation-out') {
        this.distractPopUp.style.animationName = '';
        this.distractPopUp.style.display = 'none';
      }
    });

    this.overlay.addEventListener('animationend', (e) => {
      if (e.animationName === 'overlay-animation-out') {
        this.overlay.style.animationName = '';
        this.overlay.style.display = 'none';
      }
    });
  }

  /**
   * Makes popup disappear and clears input field
   */
  resetPopUp() {
    this.distractPopUp.style.animationName = 'distraction-animation-out';
    this.overlay.style.animationName = 'overlay-animation-out';
    document.getElementById('description').value = '';
  }

  /**
   * Makes distraction button disappear (during breaks)
   */
  hideButton() {
    this.distractButton.style.display = 'none';
  }

  /**
   * Makes distraction button appear (during work sessions)
   */
  showButton() {
    this.distractButton.style.display = 'block';
  }
}

customElements.define('distraction-page', Distraction);
export { Distraction };