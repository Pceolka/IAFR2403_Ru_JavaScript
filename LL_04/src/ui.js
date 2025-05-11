// src/ui.js
import { deleteTransactionById, getShortDescription } from './utils.js';
import { calculateTotal } from './utils.js';

/**
 * Рисует таблицу транзакций
 * @param {Transaction[]} transactions 
 */
export function renderTable(transactions) {
  const tableBody = document.querySelector("#transaction-table tbody");
  tableBody.innerHTML = "";

  transactions.forEach(tx => {
    const tr = document.createElement("tr");
    tr.dataset.id = tx.id;
    tr.style.color = tx.amount >= 0 ? "green" : "red";

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.category}</td>
      <td>${getShortDescription(tx.description)}</td>
      <td><button class="delete-btn" data-id="${tx.id}">Удалить</button></td>
    `;

    tableBody.appendChild(tr);
  });

  document.getElementById("total-amount").textContent = calculateTotal(transactions);
}

/**
 * Отображает полное описание при клике
 * @param {string} description 
 */
export function showFullDescription(description) {
  document.getElementById("full-description").textContent = description;
}
