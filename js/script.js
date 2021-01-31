'use strict';

let money = 50000;
let income = 'Фриланс';
let addExpenses = 'Телефон, Интернет, Развлечения, Такси';
let deposit = true;
let mission = 1000000;
let period = 5;

let arr = addExpenses.toLowerCase().split(', ');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев. \nЦель заработать ' + mission + ' рублей.');
console.log(arr);

let budgetDay;
budgetDay = money/30;
console.log('budgetDay: ', budgetDay);
