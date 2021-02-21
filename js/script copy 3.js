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

    checkBox = document.getElementById('deposit-check'),

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

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMont = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function () {
    if(salaryAmount.value === '') {
        startBtn.removeAttribute('disabled');
    }
}; 

AppData.prototype.start = function () {
    if (salaryAmount.value === "") {
        startBtn.setAttribute('disabled', 'true');
        return;
    }
    let allInput = document.querySelectorAll('.data input[type = text');
    allInput.forEach(function(item) {
        item.setAttribute('disabled', 'true');
    });
    btnPlusExpensesAdd.setAttribute('disabled', 'true');
    btnPlusIncomeAdd.setAttribute('disabled', 'true');
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
        this.budget = +salaryAmount.value;
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.getInfoDeposit();
        this.getStatusIncome();

        this.showResult();
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.value * this.budgetMonth;
    });
};
AppData.prototype.addExpensesBlock = function(){
    
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
};
AppData.prototype.getExpenses = function() {
    // const _this = this;
    expensesItems.forEach((item) => {
        // console.log(item);
        //получаем значение инпутов
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            //добавляем в expenses
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function() {
    let clonIncomeItems = incomeItems[0].cloneNode(true);
    //вставляем в родителя перед кнопкой
    incomeItems[0].parentNode.insertBefore(clonIncomeItems, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    //условие не больше трех елементов
    if(incomeItems.length === 3){
        btnPlusIncomeAdd.style.display = 'none';
    }
};
AppData.prototype.getIncome = function() {
    incomeItems.forEach((item) => {
        // console.log(item);
        //получаем значение инпутов
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        if(incomeTitle !== '' && incomeAmount !== ''){
            //добавляем в expenses
            this.income[incomeTitle] = incomeAmount;
        }
    });
    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if(item !== ''){
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if(item !== ''){
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
}; 
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth/30);
    // console.log('appData.budgetMonth: ', appData.budgetMonth);

}; 
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value/this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 0 && this.budgetDay < 600) {return('К сожалению у вас уровень дохода ниже среднего');}
    else if (this.budgetDay >= 600 && this.budgetDay < 1200) {return('У вас средний уровень дохода');}
    else if (this.budgetDay >= 1200) {return('У вас высокий уровень дохода');}
    else if (this.budgetDay < 0) {return('Что то пошло не так');}
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do {this.percentDeposit = prompt('Какой годовой процент депозита?', 10);}
        while (!isNumber());
        do {this.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
        while (!isNumber());
    }
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};


AppData.prototype.reset = function() {
    let inputTextData = document.querySelectorAll('.data input[type = text]');
    let resultInputAll = document.querySelectorAll('.result input[type = text]');
    inputTextData.forEach(function(elem){
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;

    });
    resultInputAll.forEach(function(elem){
        elem.value = '';
    });
    for(let i=1; i<incomeItems.length; i++){
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        btnPlusIncomeAdd.style.display = 'block';
    }
    for(let i=1; i<expensesItems.length; i++){
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        btnPlusExpensesAdd.style.display = 'block';
    }
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMont = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    cancelBtn.style.display = 'none';
    startBtn.style.display = 'block';
    btnPlusExpensesAdd.removeAttribute('disabled');
    btnPlusIncomeAdd.removeAttribute('disabled');
    checkBox.checked = false;
    
};

AppData.prototype.EventListener = function() {
const _this = this;
    
    startBtn.addEventListener('click', this.start);
    btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
    btnPlusIncomeAdd.addEventListener('click', this.check);
    cancelBtn.addEventListener('click', this.reset);
    
    //полунок
    periodSelect.addEventListener('input', function(){
        periodAmount.innerHTML = this.value;
    });
    
    let addExp = [];
    for(let i=0; i< appData.addExpenses.length; i++) {
        let element = appData.addExpenses[i].trim();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExp.push(element);
    }
};

const appData = new AppData();
console.log('appData: ', appData);


AppData.prototype.EventListener();

// periodSelect.addEventListener('change', () => {
            //     this.getPeriod();
            //     incomePeriodValue.value = this.calcPeriod();
            // });


            // let input = document.querySelectorAll('[placeholder="Сумма"]');
            // console.log('input: ', input);
            
            // input.forEach(function (item) {
            //     if (item.value !== "" && !(appData.isNumber(item.value))){
            //         alert('Введите корректное значение в поле');
            //         item.value = '';
            //         return;
            //     }
            // });