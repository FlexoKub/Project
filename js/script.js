'use strict';
// проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
return String(n);
};

let money;

function start() {
    do {money = prompt('Ваш месячный доход?', 50000);}
    while (!isNumber(money));
}
start();
//объект переменных
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 5,
    asking: function(){

        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            do {itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');}
            while (isNumber(itemIncome));
            let cashIncome;
            do {cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');}
            while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
        
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses =  addExpenses.toLowerCase().split(',');
        
        // for (let word of appData.addExpenses) {
        //     word = word.charAt(0).toUpperCase() + word.substr(1);
        //     appData.addExpenses.push(word);
        // }
        
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0;
        for(let i=0; i<2; i++) {
            let nameSum;
            do {nameSum = prompt('Введите обязательную статью расходов?', 'машина');}
            while (isNumber(nameSum));
            do {sum = +prompt('Во сколько это обойдется?');}
        while (!isNumber(sum));
        this.expenses[nameSum] = sum;
        }
        console.log('Статьи расходов: ', appData.expenses);
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function(){
        for (let key in this.expenses) {
            appData.expensesMonth += +this.expenses[key];
        }
    }, 
    getBudget: function(){
        appData.budgetDay = Math.floor(appData.expensesMonth/30);
        appData.budgetMonth = appData.budget-appData.expensesMonth;
    }, 
    getTargetMonth: function() {
        return Math.ceil(appData.mission/appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 0 && appData.budgetDay < 600) {return('К сожалению у вас уровень дохода ниже среднего');}
        else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {return('У вас средний уровень дохода');}
        else if (appData.budgetDay >= 1200) {return('У вас высокий уровень дохода');}
        else if (appData.budgetDay < 0) {return('Что то пошло не так');}
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do {appData.percentDeposit = prompt('Какой годовой процент депозита?', 10);}
            while (!isNumber());
            do {appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
            while (!isNumber());
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }

};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Уровень дохода: ', appData.budget);

console.log('Сумма расходов за месяц: ', appData.expensesMonth);

if(appData.getTargetMonth()<=0) {console.log('Цель не будет достигнута!');}
else {console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а).');}
console.log('Возможные расходы: ' + appData.addExpenses);
console.log(appData.getStatusIncome());

// for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
// }

//вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
const arr = [];
appData.addExpenses.forEach(function (item) {
    item.trim();
    // arr.push(item.charAt(0).toUpperCase() + item.substr(1));
    arr.push(item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));
});
console.log(arr.join(', '));

const startBtn = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('.budget_month-value'),
    budgetDayValue = document.getElementsByClassName('.budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('.expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('.additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('.income_period-value'),
    targetMonthValue = document.getElementsByClassName('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

    console.log('incomeTitle: ', incomeTitle);