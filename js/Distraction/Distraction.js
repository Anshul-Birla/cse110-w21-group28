/**
 * Distraction object, displayed when distraction button is clicked
 * allow user to input distractions. Hide when other area is clicked.
 */
class Distraction extends HTMLElement {
  /**
   * Constructor for the distraction element
   * @param {HTMLButton} distractButton - button to click to log distraction
   * @param {HTMLSection} distractPopUp - pop up that should show for distraction
   * @param {HTMLButton} cancelButton - button to cancel inputting a distraction
   * @param {HTMLFormElement} distractForm - form to input distraction
   * @param {HTMLInputElement} description - where users input the distracton
   * @param {HTMLDivElement} overlay  - overlay to darken background
   */
  constructor(distractButton, distractPopUp, cancelButton, distractForm, description, overlay) {
    super();
    /**
     * The button where users click to submit their distractions
     * @type {HTMLButtonElement}
     */
    this.distractButton = distractButton;

    /**
     * The section for displaying distraction form
     * @type {HTMLSectionElement}
     */
    this.distractPopUp = distractPopUp;

    /**
     * The button where users click to cancel their distractions
     * @type {HTMLButtonElement}
     */
    this.cancelButton = cancelButton;

    /**
     * The form where users input their distractions
     * @type {HTMLFormElement}
     */
    this.distractForm = distractForm;

    /**
     * Input element for logging a distraction
     * @type {HTMLInputElement}
     */
    this.description = description;

    /**
     * Overlay to darken popup backgrounds
     * @type {HTMLDivElement}
     */
    this.overlay = overlay;

    /**
     * Array of distractions
     * @type {array}
     */
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
    this.distractForm.addEventListener('submit', (e) => {
      e.preventDefault();
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

    this.overlay.addEventListener('click', () => {
      this.resetPopUp();
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
