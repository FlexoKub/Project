'use strict';
let startBtn = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),

    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
// проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
return String(n);
};

// let money;


//объект переменных
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 5,
    start: function() {
        // do {money = prompt('Ваш месячный доход?', 50000);}
        // while (!isNumber(money));
        // if(salaryAmount.value === ''){
        //     alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
        //     return;
        // }
        appData.budget = +salaryAmount.value;
        // console.log(appData.budget);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = this.value * appData.budgetMonth;
        });
    },
    addExpensesBlock: function(){
        
        //получаем родителя
        // console.log(expensesItems.parentNode);
        //делаем копию елемента
        let clonExpensesItems = expensesItems[0].cloneNode(true);
        //вставляем в родителя перед кнопкой
        expensesItems[0].parentNode.insertBefore(clonExpensesItems, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        //условие не больше трех елементов
        if(expensesItems.length === 3){
            btnPlusExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            // console.log(item);
            //получаем значение инпутов
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                //добавляем в expenses
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let clonIncomeItems = incomeItems[0].cloneNode(true);
        //вставляем в родителя перед кнопкой
        incomeItems[0].parentNode.insertBefore(clonIncomeItems, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        //условие не больше трех елементов
        if(incomeItems.length === 3){
            btnPlusIncomeAdd.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            // console.log(item);
            //получаем значение инпутов
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if(incomeTitle !== '' && incomeAmount !== ''){
                //добавляем в expenses
                appData.income[incomeTitle] = incomeAmount;
            }
        });
        
        
        // if(confirm('Есть ли у вас дополнительный заработок?')) {
        //     let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        //     let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
        //     appData.income[itemIncome] = cashIncome;
        // }
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
        // console.log('appData.incomeMonth: ', appData.incomeMonth);
        
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(item !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){
        for (let key in this.expenses) {
            appData.expensesMonth += +this.expenses[key];
        }
    }, 
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        // console.log('appData.budgetMonth: ', appData.budgetMonth);

    }, 
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
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
        return appData.budgetMonth * periodSelect.value;
    }

};

// startBtn.addEventListener('click', appData.start);
startBtn.addEventListener('click', function(event){
    if(salaryAmount.value === ''){
        event.preventDefault();
        alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
    }
    else {appData.start();}
});

btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
//полунок
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = this.value;
});

// appData.getTargetMonth();
// appData.getStatusIncome();

console.log('Уровень дохода: ', appData.budget);

console.log('Сумма расходов за месяц: ', appData.expensesMonth);

// if(appData.getTargetMonth()<=0) {console.log('Цель не будет достигнута!');}
// else {console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев(-а).');}
// console.log('Возможные расходы: ' + appData.addExpenses);
// console.log(appData.getStatusIncome());

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
