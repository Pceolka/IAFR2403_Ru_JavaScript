// src/index.js
import { transactions } from "./transactions.js";
import { renderTable, showFullDescription } from "./ui.js";
import { deleteTransactionById } from "./utils.js";

// Пример тестовой транзакции
transactions.push({
  id: "t1",
  date: new Date().toLocaleString(),
  amount: 100,
  category: "Еда",
  description: "Покупка продуктов в супермаркете"
});

renderTable(transactions);

// Удаление по кнопке
document.getElementById("transaction-table").addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions.splice(index, 1);
      renderTable(transactions);
    }
  }

  // Показ полного описания при клике на строку
  if (e.target.closest("tr") && e.target.tagName !== "BUTTON") {
    const id = e.target.closest("tr").dataset.id;
    const tx = transactions.find(t => t.id === id);
    showFullDescription(tx?.description || "—");
  }
});
import { generateId } from "./utils.js";

document.getElementById("transaction-form").addEventListener("submit", e => {
  e.preventDefault();

  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");
  const descriptionInput = document.getElementById("description");

  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;

  if (isNaN(amount) || description.trim().length === 0) {
    alert("Пожалуйста, заполните все поля корректно.");
    return;
  }
  
  errorElem.textContent = "";

  const transaction = {
    id: generateId(),
    date: new Date().toLocaleString(),
    amount,
    category,
    description
  };

  transactions.push(transaction);
  renderTable(transactions);

  // Очистить форму
  amountInput.value = "";
  descriptionInput.value = "";
});
const errorElem = document.getElementById("form-error");


