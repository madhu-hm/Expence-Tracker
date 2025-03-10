document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const categorySelect = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const addBtn = document.getElementById('add-btn');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = 0;

    function renderExpenses() {
        expenseTableBody.innerHTML = '';
        totalAmount = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td>
                    <button class="action-btn edit" data-index="${index}">Edit</button>
                    <button class="action-btn delete" data-index="${index}">Delete</button>
                </td>
            `;
            expenseTableBody.appendChild(row);
            totalAmount += parseFloat(expense.amount);
        });

        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function addExpense() {
        const date = dateInput.value;
        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);

        if (!date || !category || isNaN(amount)) {
            alert('Please fill in all fields.');
            return;
        }

        expenses.push({ date, category, amount });
        saveExpenses();
        renderExpenses();

        dateInput.value = '';
        categorySelect.value = '';
        amountInput.value = '';
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    }

    function editExpense(index) {
        const expense = expenses[index];
        dateInput.value = expense.date;
        categorySelect.value = expense.category;
        amountInput.value = expense.amount;

        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    }

    expenseTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const index = parseInt(event.target.dataset.index);
            deleteExpense(index);
        } else if (event.target.classList.contains('edit')) {
            const index = parseInt(event.target.dataset.index);
            editExpense(index);
        }
    });

    addBtn.addEventListener('click', addExpense);

    renderExpenses();
});// let expenses = [];
// let totalAmount = 0;

// const categorySelect = document.getElementById('category-select');
// const amountInput = document.getElementById('amount-input');
// const dateInput = document.getElementById('date-input');
// const addBtn = document.getElementById('add-btn');
// const expensesTableBody = document.getElementById('expnese-table-body');
// const totalAmountCell = document.getElementById('total-amount');

// addBtn.addEventListener('click', function() {
//     const category = categorySelect.value;
//     const amount = Number(amountInput.value);
//     const date = dateInput.value;

//     if (category === '') {
//         alert('Please select a category');
//         return;
//     }
//     if (isNaN(amount) || amount <=0 ) {
//         alert('Please enter a valid amount')
//         return;
//     }
//     if(date === '') {
//         alert('Please select a date')
//         return;
//     }
//     expenses.push({category, amount, date});

//     totalAmount += amount;
//     totalAmountCell.textContent = totalAmount;

//     const newRow = expensesTableBody.insertRow();

//     const categoryCell = newRow.insertCell();
//     const amountCell = newRow.insertCell();
//     const dateCell = newRow.insertCell();
//     const deleteCell = newRow.insertCell();
//     const deleteBtn = document.createElement('button');

//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', function() {
//         expenses.splice(expenses.indexOf(expense), 1);

//         totalAmount -= expense.amount;
//         totalAmountCell.textContent = totalAmount;

//         expensesTableBody.removeChild(newRow);
//     });

//     const expense = expenses[expenses.length - 1];
//     categoryCell.textContent = expense.category;
//     amountCell.textContent = expense.amount;
//     dateCell.textContent = expense.date;
//     deleteCell.appendChild(deleteBtn);

// });

// for (const expense of expenses) {
//     totalAmount += expense.amount;
//     totalAmountCell.textContent = totalAmount;

//     const newRow = expensesTableBody.inserRow();
//     const categoryCell = newRow.insertCell();
//     const amountCell = newRow.insertCell();
//     const dateCell = newRow.insertCell();
//     const deleteCell = newRow.insertCell();
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');
//     deleteBtn.addEventListener('click', function() {
//         expenses.splice(expenses.indexOf(expense), 1);

//         totalAmount -= expense.amount;
//         totalAmountCell.textContent = totalAmount;

//         expensesTableBody.removeChild(newRow);
//     });
//     categoryCell.textContent = expense.category;
//     amountCell.textContent = expense.amount;
//     dateCell.textContent = expense.date;
//     deleteCell.appendChild(deleteBtn);
// }