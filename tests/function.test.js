// import { jest } from '@jest/globals'
import { increment } from '../js/function';

test('Incrment 2', () => {
  expect(increment(2)).toBe(3);
});

test('String increment should still work', () => {
  expect(increment('2')).toBe(3);
});
