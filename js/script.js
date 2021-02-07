'use strict';
// проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
// do {money = prompt('Ваш месячный доход?', 50000);}
//     while (money <= 0 || !Number(money));
// (isNaN(money) || money.trim() ==='' || money === null)
function start() {
    do {money = prompt('Ваш месячный доход?');}
    while (!isNumber(money));
}
start();

let income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
// Телефон, Машина, Развлечения
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000;

let arr = addExpenses.toLowerCase().split(', ');

let showTypeof = function(item) {
    console.log(typeof item);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);


console.log('Цель заработать ' + mission + ' рублей.');
//console.log(addExpenses);
console.log(arr);

// let expenses1, expenses2;
let expenses = [];

let getExpensesMonth = function() {
    let sum = 0;
    for(let i=0; i<2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', 'машина');
        
        // if (i===0) {expenses1 = prompt('Введите обязательную статью расходов 1?', 'машина');}
        // else if (i===1) {expenses2 = prompt('Введите обязательную статью расходов 2?', 'дом');}
        
        do {sum = +prompt('Во сколько это обойдется?');}
    while (!isNumber(sum));
        sum += sum;
    }
    console.log('Статьи расходов: ', expenses);
    
    return sum;
};

let expensesAmount = getExpensesMonth();
// let amount1;
// let amount2;
// let amount;
// function getExpensesMonth(){
//     let expenses1 = prompt('Введите обязательную статью расходов 1?', 'машина');
// do {amount1 = +prompt('Во сколько это обойдется?');}
//     while (amount1 <= 0 || !Number(amount1));

// let expenses2 = prompt('Введите обязательную статью расходов 2?', 'дом');

// do {amount2 = +prompt('Во сколько это обойдется?');}
//     while (amount2 <= 0 || !Number(amount2));
//     amount = amount1 + amount2;
//     return amount;
// }

console.log('Сумма расходов: ', expensesAmount);

function getAccumulatedMonth(expensesAmount){
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth(expensesAmount);

console.log('Бюджет на месяц: ', accumulatedMonth);

function getTargetMonth(){
    return Math.ceil(mission/accumulatedMonth);
}
let mounthMission = getTargetMonth();
if(mounthMission<=0) {console.log('Цель не будет достигнута!');}

else {console.log('Цель будет достигнута за ' + mounthMission + ' месяцев(-а).');}

let budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день: ', budgetDay);
function getStatusIncome() {
    if (budgetDay >= 0 && budgetDay < 600) {return('К сожалению у вас уровень дохода ниже среднего');}
    else if (budgetDay >= 600 && budgetDay < 1200) {return('У вас средний уровень дохода');}
    else if (budgetDay >= 1200) {return('У вас высокий уровень дохода');}
    else if (budgetDay < 0) {return('Что то пошло не так');}
}
console.log(getStatusIncome());



