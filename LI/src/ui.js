import { calculate } from './calculator.js';

let current = '';
let operator = '';
let operand = '';
const history = [];

export function handleButtonClick(e) {
  const val = e.target.textContent;
  const display = document.getElementById('display');
  if (!e.target.classList.contains('btn')) return;

  if (!isNaN(val)) {
    current += val;
    display.textContent = current;
  } else if (val === 'C') {
    current = '';
    operand = '';
    operator = '';
    display.textContent = '0';
  } else if (val === '=') {
    if (operator && operand !== '' && current !== '') {
      const a = parseFloat(operand);
      const b = parseFloat(current);
      const result = calculate(a, b, operator);
      display.textContent = result;

      history.push(`${a} ${operator} ${b} = ${result}`);
      renderHistory();

      current = '';
      operand = '';
      operator = '';
    }
  } else {
    if (current !== '') {
      operand = current;
      operator = val;
      current = '';
    }
  }
}

function renderHistory() {
  const historyEl = document.getElementById('history');
  historyEl.innerHTML = '';
  const lastFive = history.slice(-5).reverse();
  lastFive.forEach(entry => {
    const p = document.createElement('p');
    p.textContent = entry;
    historyEl.appendChild(p);
  });
}
