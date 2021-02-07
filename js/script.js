'use strict';
// проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

function start() {
    do {money = prompt('Ваш месячный доход?');}
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
    mission: 500000,
    period: 5,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0;
        for(let i=0; i<2; i++) {
    
            let nameSum = prompt('Введите обязательную статью расходов?', 'машина');
            
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
            appData.expensesMonth += this.expenses[key];
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

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
}