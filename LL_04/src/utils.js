// src/utils.js

/**
 * Генерирует уникальный ID
 * @returns {string}
 */
export function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Удаляет транзакцию по ID
   * @param {Transaction[]} transactions 
   * @param {string} id 
   * @returns {Transaction[]}
   */
  export function deleteTransactionById(transactions, id) {
    return transactions.filter(tx => tx.id !== id);
  }
  
  /**
   * Возвращает первые 4 слова из описания
   * @param {string} desc 
   * @returns {string}
   */
  export function getShortDescription(desc) {
    return desc.split(" ").slice(0, 4).join(" ") + "...";
  }
  
  /**
   * Подсчитывает общую сумму
   * @param {Transaction[]} transactions 
   * @returns {number}
   */
  export function calculateTotal(transactions) {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }
  