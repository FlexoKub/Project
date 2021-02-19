'use strict';
let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
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
    periodAmount = document.querySelector('.period-amount'),
    
    input = document.getElementsByTagName('input');
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
        this.budget = +salaryAmount.value;
        // console.log(appData.budget);
        // appData.input();
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();



        this.showResult();
    },
    // input: function(i) {
    //     if(input[i].placeholder === "Сумма")
    //     {input[i].addEventListener('input', function(){
    //         if(this.value !== isNumber()){alert('Ошибка, введите число!');}
    //     });}
    // },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.value * appData.budgetMonth;
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
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
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
            this.expensesMonth += +this.expenses[key];
        }
    }, 
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
        // console.log('appData.budgetMonth: ', appData.budgetMonth);

    }, 
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 0 && this.budgetDay < 600) {return('К сожалению у вас уровень дохода ниже среднего');}
        else if (this.budgetDay >= 600 && this.budgetDay < 1200) {return('У вас средний уровень дохода');}
        else if (this.budgetDay >= 1200) {return('У вас высокий уровень дохода');}
        else if (this.budgetDay < 0) {return('Что то пошло не так');}
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do {this.percentDeposit = prompt('Какой годовой процент депозита?', 10);}
            while (!isNumber());
            do {this.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
            while (!isNumber());
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    }

};

// startBtn.addEventListener('click', appData.start);
startBtn.addEventListener('click', function(event){
    if(salaryAmount.value === ''){
        event.preventDefault();
        alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
    }
    else {appData.start();}
//блокировать поля ввода
    for (let i = 0; i < input.length; i++) {
            input[i].readOnly = "readonly";}

startBtn.style.display = 'none';
cancelBtn.style.display = 'block';
    return;
});
//очищение полей при сбросе
function reset() {
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';

    for (let i = 0; i < input.length; i++) {
        input[i].readOnly = "";
        input[i].value = "";}
        periodSelect.value = "1";
        periodAmount.textContent = "1";
        appData.addExpenses.length = 0;
        appData.addIncome.length = 0;
        appData.budgetMonth = 0;
        let clonIncomeItems = incomeItems[0].cloneNode(false);
}

cancelBtn.addEventListener('click', reset);


btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
//полунок
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = this.value;
});

// appData.getTargetMonth();
// appData.getStatusIncome();

// console.log('Уровень дохода: ', appData.budget);

// console.log('Сумма расходов за месяц: ', appData.expensesMonth);

// if(appData.getTargetMonth()<=0) {console.log('Цель не будет достигнута!');}
// else {console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев(-а).');}
// console.log('Возможные расходы: ' + appData.addExpenses);
// console.log(appData.getStatusIncome());

// for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
// }

//вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
// const arr = [];
// appData.addExpenses.forEach(function (item) {
//     item.trim();
//     // arr.push(item.charAt(0).toUpperCase() + item.substr(1));
//     arr.push(item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));
// });
// console.log(arr.join(', '));
let addExp = [];
for(let i=0; i< appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trim();
    element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    addExp.push(element);
}

