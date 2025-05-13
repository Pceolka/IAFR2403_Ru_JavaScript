// main.js

const fs = require('fs');

/**
 * Класс для анализа транзакций.
 */
class transactionAnalyzer {
  /**
   * @param {Array<Object>} transaction - Массив объектов транзакций.
   */
  constructor(transaction) {
    this.transaction = transaction;
  }

  /**
   * Добавляет новую транзакцию.
   * @param {Object} transaction - Новая транзакция.
   */
  addtransaction(transaction) {
    this.transaction.push(transaction);
  }

  /**
   * Возвращает все транзакции.
   * @returns {Array<Object>}
   */
  getAlltransaction() {
    return this.transaction;
  }

  /**
   * Возвращает уникальные типы транзакций.
   * @returns {Array<string>}
   */
  getUniquetransactionType() {
    return [...new Set(this.transaction.map(t => t.transaction_type))];
  }

  /**
   * Общая сумма всех транзакций.
   * @returns {number}
   */
  calculateTotalAmount() {
    return this.transaction.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
  }

  /**
   * Сумма транзакций за указанный год, месяц или день.
   * @param {string} [year]
   * @param {string} [month]
   * @param {string} [day]
   * @returns {number}
   */
  calculateTotalAmountByDate(year, month, day) {
    return this.transaction
      .filter(t => {
        const [y, m, d] = t.transaction_date.split('-');
        return (!year || y === year) && (!month || m === month) && (!day || d === day);
      })
      .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
  }

  /**
   * Транзакции указанного типа.
   * @param {string} type
   * @returns {Array<Object>}
   */
  gettransactionByType(type) {
    return this.transaction.filter(t => t.transaction_type === type);
  }

  /**
   * Транзакции в заданном диапазоне дат.
   * @param {string} startDate - В формате YYYY-MM-DD
   * @param {string} endDate - В формате YYYY-MM-DD
   * @returns {Array<Object>}
   */
  gettransactionInDateRange(startDate, endDate) {
    return this.transaction.filter(t => {
      return t.transaction_date >= startDate && t.transaction_date <= endDate;
    });
  }

  /**
   * Транзакции по названию магазина.
   * @param {string} merchantName
   * @returns {Array<Object>}
   */
  gettransactionByMerchant(merchantName) {
    return this.transaction.filter(t => t.merchant_name === merchantName);
  }

  /**
   * Среднее значение транзакций.
   * @returns {number}
   */
  calculateAveragetransactionAmount() {
    if (this.transaction.length === 0) return 0;
    return this.calculateTotalAmount() / this.transaction.length;
  }

  /**
   * Транзакции по диапазону сумм.
   * @param {number} minAmount
   * @param {number} maxAmount
   * @returns {Array<Object>}
   */
  gettransactionByAmountRange(minAmount, maxAmount) {
    return this.transaction.filter(t => {
      const amt = parseFloat(t.transaction_amount);
      return amt >= minAmount && amt <= maxAmount;
    });
  }

  /**
   * Общая сумма дебетовых транзакций.
   * @returns {number}
   */
  calculateTotalDebitAmount() {
    return this.gettransactionByType('debit')
      .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
  }

  /**
   * Месяц с наибольшим количеством транзакций.
   * @returns {string} В формате YYYY-MM
   */
  findMosttransactionMonth() {
    const counts = {};
    this.transaction.forEach(t => {
      const month = t.transaction_date.slice(0, 7);
      counts[month] = (counts[month] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  /**
   * Месяц с наибольшим числом дебетовых транзакций.
   * @returns {string}
   */
  findMostDebittransactionMonth() {
    const counts = {};
    this.transaction.forEach(t => {
      if (t.transaction_type === 'debit') {
        const month = t.transaction_date.slice(0, 7);
        counts[month] = (counts[month] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  /**
   * Какой тип транзакций встречается чаще.
   * @returns {'debit' | 'credit' | 'equal'}
   */
  mosttransactionTypes() {
    const debitCount = this.gettransactionByType('debit').length;
    const creditCount = this.gettransactionByType('credit').length;
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
  }

  /**
   * Транзакции до указанной даты.
   * @param {string} date - В формате YYYY-MM-DD
   * @returns {Array<Object>}
   */
  gettransactionBeforeDate(date) {
    return this.transaction.filter(t => t.transaction_date < date);
  }

  /**
   * Найти транзакцию по ID.
   * @param {string} id
   * @returns {Object|null}
   */
  findtransactionById(id) {
    return this.transaction.find(t => t.transaction_id === id) || null;
  }

  /**
   * Получить массив описаний транзакций.
   * @returns {Array<string>}
   */
  maptransactionDescriptions() {
    return this.transaction.map(t => t.transaction_description);
  }
}

// Загрузка и тестирование
const rawData = fs.readFileSync('transaction.json', 'utf-8');
const transaction = JSON.parse(rawData);

// Инициализация анализатора
const analyzer = new transactionAnalyzer(transaction);

// Пример использования
console.log('Уникальные типы:', analyzer.getUniquetransactionType());
console.log('Общая сумма:', analyzer.calculateTotalAmount());
console.log('Сумма за 2019-01-01:', analyzer.calculateTotalAmountByDate('2019', '01', '01'));
console.log('Все debit транзакции:', analyzer.gettransactionByType('debit'));
console.log('Транзакции с 2019-01-01 по 2019-01-31:', analyzer.gettransactionInDateRange('2019-01-01', '2019-01-31'));
console.log('Транзакции от SuperMart:', analyzer.gettransactionByMerchant('SuperMart'));
console.log('Средняя сумма:', analyzer.calculateAveragetransactionAmount());
console.log('Сумма по диапазону 50-150:', analyzer.gettransactionByAmountRange(50, 150));
console.log('Сумма debit транзакций:', analyzer.calculateTotalDebitAmount());
console.log('Месяц с наиб. транзакциями:', analyzer.findMosttransactionMonth());
console.log('Месяц с наиб. дебет транзакциями:', analyzer.findMostDebittransactionMonth());
console.log('Чаще встречается тип:', analyzer.mosttransactionTypes());
console.log('До даты 2019-02-01:', analyzer.gettransactionBeforeDate('2019-02-01'));
console.log('По ID = 1:', analyzer.findtransactionById('1'));
console.log('Описание всех:', analyzer.maptransactionDescriptions());
