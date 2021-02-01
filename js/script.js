'use strict';

let money;
do {money = prompt('Ваш месячный доход?');}
    while (money <= 0 || !Number(money));
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// Телефон, Машина, Развлечения
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 5;

let arr = addExpenses.toLowerCase().split(', ');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');
console.log(addExpenses);
console.log(arr);
let expenses1 = prompt('Введите обязательную статью расходов 1?');

let amount1;
do {amount1 = +prompt('Во сколько это обойдется?');}
    while (amount1 <= 0 || !Number(amount1));

let expenses2 = prompt('Введите обязательную статью расходов 2?');

let amount2;
do {amount2 = +prompt('Во сколько это обойдется?');}
    while (amount2 <= 0 || !Number(amount2));

let budgetMonth = money-(amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);
let mounthMission = Math.ceil(mission/budgetMonth);
console.log('Цель будет достигнута за ' + mounthMission + ' месяцев(-а).');

let budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);
if (budgetDay >= 0 && budgetDay < 600) {console.log('К сожалению у вас уровень дохода ниже среднего');}
else if (budgetDay >= 600 && budgetDay < 1200) {console.log('У вас средний уровень дохода');}
else if (budgetDay >= 1200) {console.log('У вас высокий уровень дохода');}
else if (budgetDay < 0) {console.log('Что то пошло не так');}

