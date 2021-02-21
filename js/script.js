'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start'),
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
    // additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    // additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    // expensesTitle = document.querySelector('.expenses-title'),
    
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),

    checkBox = document.getElementById('deposit-check'),

    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

    // periodSelect.setAttribute('disabled', 'true');

    let incomeItems = document.querySelectorAll('.income-items'),
        expensesItems = document.querySelectorAll('.expenses-items');
    
    class AppData {
        constructor() {
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
        }

        isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        check() {
            if (salaryAmount.value === '') {
                startBtn.removeAttribute('disabled');
            }
        }
        start() {
            //проверка полей Сумма на число
            let input = document.querySelectorAll('[placeholder="Сумма"]');
            console.log('input: ', input);
            
            input.forEach(function (item) {
                if (item.value !== "" && !(appData.isNumber(item.value))) {
                    alert('Ошибка, в поле "Сумма" не число! Введите корректное значение.');
                    item.value = '';
                    return;
                }
            });
            
            if (!(this.isNumber(salaryAmount.value))) {
                // startBtn.setAttribute('disabled', 'true');
                alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
                salaryAmount.value = '';
                return;
            }
            
            // this.deposit === true && 
            if (depositCheck.checked &&
                !(this.isNumber(depositPercent.value)) || 
                depositPercent.value>50 ||
                depositPercent.value<0){
                alert('Введите корректное значение в поле проценты от 0 до 50');
                depositPercent.value = '';
                return;
            }

            let allInput = document.querySelectorAll('.data input[type = text');
            allInput.forEach(function (item) {
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
            this.getInfoDeposit();
            this.getBudget();

            this.getStatusIncome();

            this.showResult();
        }
        showResult() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcSavedMoney();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = periodSelect.value * this.budgetMonth;
            });
        }
        addExpensesBlock() {

            //получаем родителя
            // console.log(expensesItems.parentNode);
            //делаем копию елемента
            let clonExpensesItems = expensesItems[0].cloneNode(true);
            //вставляем в родителя перед кнопкой
            expensesItems[0].parentNode.insertBefore(clonExpensesItems, btnPlusExpensesAdd);
            expensesItems = document.querySelectorAll('.expenses-items');
            //условие не больше трех елементов
            if (expensesItems.length === 3) {
                btnPlusExpensesAdd.style.display = 'none';
            }
        }
        getExpenses() {
            // const _this = this;
            expensesItems.forEach((item) => {
                // console.log(item);
                //получаем значение инпутов
                const itemExpenses = item.querySelector('.expenses-title').value;
                const cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    //добавляем в expenses
                    this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }
        addIncomeBlock() {
            const clonIncomeItems = incomeItems[0].cloneNode(true);
            //вставляем в родителя перед кнопкой
            incomeItems[0].parentNode.insertBefore(clonIncomeItems, btnPlusIncomeAdd);
            incomeItems = document.querySelectorAll('.income-items');
            //условие не больше трех елементов
            if (incomeItems.length === 3) {
                btnPlusIncomeAdd.style.display = 'none';
            }
        }
        getIncome() {
            incomeItems.forEach((item) => {
                // console.log(item);
                //получаем значение инпутов
                const incomeTitle = item.querySelector('.income-title').value;
                const incomeAmount = item.querySelector('.income-amount').value;
                if (incomeTitle !== '' && incomeAmount !== '') {
                    //добавляем в expenses
                    this.income[incomeTitle] = incomeAmount;
                }
            });
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }
        getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        }
        getAddIncome() {
            additionalIncomeItem.forEach((item) => {
                let itemValue = item.value.trim();
                if (item !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        }
        getExpensesMonth() {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget() {
            const monthDeposit = Math.floor(this.moneyDeposit * (this.percentDeposit / 100));
            console.log('this.percentDeposit: ', this.percentDeposit);
            console.log('this.moneyDeposit: ', this.moneyDeposit);
            console.log('monthDeposit: ', monthDeposit);

            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
            // console.log('appData.budgetMonth: ', appData.budgetMonth);
        }
        getTargetMonth() {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        }
        getStatusIncome() {
            if (this.budgetDay >= 0 && this.budgetDay < 600) { return ('К сожалению у вас уровень дохода ниже среднего'); }
            else if (this.budgetDay >= 600 && this.budgetDay < 1200) { return ('У вас средний уровень дохода'); }
            else if (this.budgetDay >= 1200) { return ('У вас высокий уровень дохода'); }
            else if (this.budgetDay < 0) { return ('Что то пошло не так'); }
        }
        getInfoDeposit() {
            if (depositCheck.checked) {
                this.deposit = true;
            }
            console.log('this.deposit: ', this.deposit);
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                console.log('this.percentDeposit: ', this.percentDeposit);
                this.moneyDeposit = depositAmount.value;
                console.log('this.moneyDeposit: ', this.moneyDeposit);
            }
        }
        calcSavedMoney() {
            return this.budgetMonth * periodSelect.value;
        }
        reset() {
            const inputTextData = document.querySelectorAll('.data input[type = text]');
            const resultInputAll = document.querySelectorAll('.result input[type = text]');
            inputTextData.forEach(function (elem) {
                elem.value = '';
                elem.removeAttribute('disabled');
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value;

            });
            resultInputAll.forEach(function (elem) {
                elem.value = '';
            });
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
                btnPlusIncomeAdd.style.display = 'block';
            }
            for (let i = 1; i < expensesItems.length; i++) {
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
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
        }
        //выбор банка
        changePercent() {
            const valueSelect = this.value;
            if(valueSelect === 'other'){
                depositPercent.style.display = 'inline-block';
            } else {
                depositPercent.value = +valueSelect;
            }
        }
        //галочка депозита
        depositHandler() {
            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                console.log('this.deposit: ', this.deposit);
                depositBank.addEventListener('change', this.changePercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }
        EventListener() {
           
            // if(salaryAmount.value === '' || !this.isNumber(salaryAmount.value)){
            //     alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
            //     return;
            // }
            startBtn.addEventListener('click', this.start.bind(appData));
            btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
            btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);
            cancelBtn.addEventListener('click', this.reset.bind(appData));

            //полунок
            periodSelect.addEventListener('input', function () {
                periodAmount.innerHTML = this.value;
            });

            depositCheck.addEventListener('change', this.depositHandler.bind(this));

            let addExp = [];
            for (let i = 0; i < appData.addExpenses.length; i++) {
                let element = appData.addExpenses[i].trim();
                element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
                addExp.push(element);
            }
        }
    }

    const appData = new AppData();
    console.log('appData: ', appData);


    AppData.prototype.EventListener();
});


