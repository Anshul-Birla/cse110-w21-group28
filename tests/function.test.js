const functions = require('../js/function');

test('Adds 2+2 equals 4', () => {
  expect(functions.add(2, 2)).toBe(4);
});
