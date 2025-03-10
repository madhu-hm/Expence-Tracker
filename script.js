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
});
