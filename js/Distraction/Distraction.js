class Distraction{

  /**
   * @param {HTMLButton} distractButton
   * @param {HTMLSection} distractPopUp
   * @param {HTMLButton} cancelButton
   * @param {HTMLButton} submitButton
   */
   constructor(distractButton, distractPopUp, cancelButton, submitButton, description){
     this.distractButton = distractButton;
     this.distractPopUp = distractPopUp;
     this.cancelButton = cancelButton;
     this.submitButton = submitButton;
     this.description = description;
     this.id = 0;
     this.distractions = [];
     this.setupEventListeners();
   }

   setupEventListeners(){
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
       const description = this.description.value;
       const id = this.id;
       const time = new Date();
       if (description !== '') {
           this.distractions = JSON.parse(localStorage.getItem('distractions'));
         if (this.distractions === null) {
           this.distractions = [];
         }
         this.distractions.push({ id, description, time });
         localStorage.setItem('distractions', JSON.stringify(this.distractions));
         this.resetPopUp();
       }
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

  hideButton(){
    this.distractButton.style.display = 'none';
  }

  showButton(){
    this.distractButton.style.display = 'block';
  }
}
export { Distraction };
