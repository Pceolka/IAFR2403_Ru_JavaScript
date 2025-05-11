/**
 * @file main.js
 * @description Анализ транзакций с различными функциями.
 */

/** @typedef {Object} Transaction
 * @property {string} transaction_id
 * @property {string} transaction_date - Формат: YYYY-MM-DD
 * @property {number} transaction_amount
 * @property {"debit"|"credit"} transaction_type
 * @property {string} transaction_description
 * @property {string} merchant_name
 * @property {"credit"|"debit"} card_type
 */

/** @type {Transaction[]} */
const transactions = [
    {
      transaction_id: "T001",
      transaction_date: "2024-05-10",
      transaction_amount: 120.5,
      transaction_type: "debit",
      transaction_description: "Grocery shopping",
      merchant_name: "SuperMart",
      card_type: "debit",
    },
    {
      transaction_id: "T002",
      transaction_date: "2024-05-11",
      transaction_amount: 80,
      transaction_type: "credit",
      transaction_description: "Salary",
      merchant_name: "CompanyX",
      card_type: "credit",
    },
    {
      transaction_id: "T003",
      transaction_date: "2024-05-15",
      transaction_amount: 45,
      transaction_type: "debit",
      transaction_description: "Gas station",
      merchant_name: "FuelPlus",
      card_type: "debit",
    },
  ];
  
  /** Получить уникальные типы транзакций */
  function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
  }
  
  /** Рассчитать сумму всех транзакций */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
  }
  
  /** Рассчитать сумму транзакций за дату/месяц/год */
  function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(t => {
      const [y, m, d] = t.transaction_date.split('-').map(Number);
      return (!year || y === year) && (!month || m === month) && (!day || d === day);
    }).reduce((sum, t) => sum + t.transaction_amount, 0);
  }
  
  /** Получить транзакции по типу */
  function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
  }
  
  /** Получить транзакции в диапазоне дат */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
      const d = new Date(t.transaction_date);
      return d >= start && d <= end;
    });
  }
  
  /** Получить транзакции по магазину */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
  }
  
  /** Рассчитать среднюю сумму транзакций */
  function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
  }
  
  /** Получить транзакции по диапазону суммы */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
  }
  
  /** Сумма дебетовых транзакций */
  function calculateTotalDebitAmount(transactions) {
    return transactions.filter(t => t.transaction_type === 'debit')
      .reduce((sum, t) => sum + t.transaction_amount, 0);
  }
  
  /** Месяц с наибольшим количеством транзакций */
  function findMostTransactionsMonth(transactions) {
    const count = {};
    for (const t of transactions) {
      const month = t.transaction_date.slice(0, 7); // YYYY-MM
      count[month] = (count[month] || 0) + 1;
    }
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }
  
  /** Месяц с наибольшим числом дебетовых транзакций */
  function findMostDebitTransactionMonth(transactions) {
    const count = {};
    for (const t of transactions) {
      if (t.transaction_type === 'debit') {
        const month = t.transaction_date.slice(0, 7);
        count[month] = (count[month] || 0) + 1;
      }
    }
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }
  
  /** Каких транзакций больше: debit или credit */
  function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.transaction_type === 'debit').length;
    const creditCount = transactions.length - debitCount;
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
  }
  
  /** Транзакции до указанной даты */
  function getTransactionsBeforeDate(transactions, date) {
    const d = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < d);
  }
  
  /** Найти транзакцию по ID */
  function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id) || null;
  }
  
  /** Массив описаний транзакций */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
  }
  
  // Тестирование
  console.log("Уникальные типы транзакций:", ...getUniqueTransactionTypes(transactions));
  console.log("Сумма всех:", calculateTotalAmount(transactions));
  console.log("Сумма за 2024-05-10:", calculateTotalAmountByDate(transactions, 2024, 5, 10));
  console.log("Только дебет:", getTransactionByType(transactions, 'debit'));
  console.log("В диапазоне:", getTransactionsInDateRange(transactions, '2024-05-10', '2024-05-12'));
  console.log("По магазину SuperMart:", getTransactionsByMerchant(transactions, 'SuperMart'));
  console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
  console.log("Сумма дебетовых:", calculateTotalDebitAmount(transactions));
  console.log("Больше всего транзакций в месяце:", findMostTransactionsMonth(transactions));
  console.log("Больше всего дебетовых в месяце:", findMostDebitTransactionMonth(transactions));
  console.log("Типов больше:", mostTransactionTypes(transactions));
  console.log("До даты:", getTransactionsBeforeDate(transactions, '2024-05-11'));
  console.log("По ID 'T002':", findTransactionById(transactions, 'T002'));
  console.log("Описания:", mapTransactionDescriptions(transactions));
  