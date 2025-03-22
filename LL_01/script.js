alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

const name = "Евгений";
var birthYear = 2004;
let isStudent = true;

console.log("Имя:", name);
console.log("Год рождения:", birthYear);
console.log("Студент:", isStudent);

let score = prompt("Введите ваш балл:");
if (score >= 90) {
 console.log("Отлично!");
} else if (score >= 70) {
 console.log("Хорошо");
} else {
 console.log("Можно лучше!");
}

for (let i = 0; i <= 5; i++) {
 console.log(`Итерация: ${i}`);
}