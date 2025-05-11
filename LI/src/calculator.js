/**
 * Выполняет базовые арифметические операции.
 * @param {number} a 
 * @param {number} b 
 * @param {string} op 
 * @returns {number|string}
 */
export function calculate(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? 'Ошибка' : a / b;
  return 'Ошибка';
}
