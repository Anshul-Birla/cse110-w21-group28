// Get the modal
const modalFAQ = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('faqButton');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.addEventListener('click', () => {
  modalFAQ.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modalFAQ.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === modalFAQ) {
    modalFAQ.style.display = 'none';
  }
});
