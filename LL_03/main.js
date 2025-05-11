/**
 * @file inventory.js
 * @description Реализация классов Item и Weapon для инвентаря игры с методами, тестами и JSDoc.
 */

/**
 * @class Item
 * @classdesc Базовый класс, представляющий предмет инвентаря.
 */
class Item {
  /**
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Редкость предмета.
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете в виде строки.
   * @returns {string}
   */
  getInfo() {
    return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * @class Weapon
 * @extends Item
 * @classdesc Класс оружия, расширяющий Item.
 */
class Weapon extends Item {
  /**
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {string} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия (0–100).
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использовать оружие — уменьшает прочность на 10, если возможно.
   */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(this.durability - 10, 0);
    }
  }

  /**
   * Починить оружие — восстановить прочность до 100.
   */
  repair() {
    this.durability = 100;
  }
}

// === Тестирование ===
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
bow.use();
console.log("Прочность после использования:", bow?.durability);
bow.repair();
console.log("Прочность после ремонта:", bow?.durability);

// === Реализация с функциями-конструкторами ===

/**
 * Функция-конструктор Item
 * @constructor
 */
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}
ItemFunc.prototype.getInfo = function () {
  return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
};
ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор Weapon
 * @constructor
 * @extends ItemFunc
 */
function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability = Math.max(this.durability - 10, 0);
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

// Тестирование функций-конструкторов
const axe = new WeaponFunc("Battle Axe", 5.5, "legendary", 25, 100);
console.log(axe.getInfo());
axe.use();
axe.use();
axe.use();
console.log("Прочность после удара:", axe?.durability);
axe.repair();
console.log("Прочность после починки:", axe?.durability);
