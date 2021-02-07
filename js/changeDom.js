import { increment } from './function';

const button = document.getElementById('incrementButton');
const output = document.getElementById('outputIncrement');
button.addEventListener('click', () => {
  const oldVal = output.value;
  const newVal = increment(oldVal);
  output.value = newVal;
});
