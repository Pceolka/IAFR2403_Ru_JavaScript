/**
 * Массив транзакций
 * @type {Array<Object>}
 */
const transactions = [];

const form = document.getElementById('transaction-form');
const table = document.getElementById('transaction-table').querySelector('tbody');
const totalElement = document.getElementById('total');
const fullDescription = document.getElementById('full-description');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTransaction();
});

/**
 * Добавляет новую транзакцию и обновляет таблицу и сумму
 */
function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = new Date().toLocaleString();
    const id = Date.now().toString();

    const transaction = { id, date, amount, category, description };
    transactions.push(transaction);

    const row = document.createElement('tr');
    row.dataset.id = id;
    row.className = amount >= 0 ? 'positive' : 'negative';
    row.innerHTML = `
        <td>${id}</td>
        <td>${date}</td>
        <td>${category}</td>
        <td>${description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button class="delete-btn">Удалить</button></td>
    `;
    table.appendChild(row);

    calculateTotal();
    form.reset();
}

/**
 * Пересчитывает общую сумму всех транзакций
 */
function calculateTotal() {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    totalElement.textContent = total.toFixed(2);
}

// Делегирование событий на таблице
table.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.closest('tr');
        const id = row.dataset.id;
        row.remove();
        const index = transactions.findIndex(t => t.id === id);
        if (index !== -1) transactions.splice(index, 1);
        calculateTotal();
    } else if (e.target.tagName === 'TD') {
        const row = e.target.closest('tr');
        const id = row.dataset.id;
        const transaction = transactions.find(t => t.id === id);
        if (transaction) {
            fullDescription.textContent = transaction.description;
        }
    }
});
