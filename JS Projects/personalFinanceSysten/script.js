let transactions = [];
let incomeExpenseChart = null;

function addTransaction() {
    const type = document.getElementById("transactionType").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const transaction = {
        id: Date.now(),
        type,
        amount,
        date,
        description,
        category
    };

    transactions.push(transaction);
    clearForm();
    displayTransactions();
    updateBalance();
    updateChart();
}

function clearForm() {
    document.getElementById("transactionType").value = "income";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
}

function displayTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div>
                <strong>${transaction.type.toUpperCase()}</strong>: $${transaction.amount.toFixed(2)} 
                <br> ${transaction.description} (${transaction.category}) - ${transaction.date}
            </div>
            <div>
                <button class="edit-button" onclick="editTransaction(${transaction.id})">Edit</button>
                <button class="delete-button" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </div>
        `;
        transactionList.appendChild(transactionItem);
    });
}

function editTransaction(id) {
    const trans = transactions.find(t => t.id === id);

    document.getElementById("transactionType").value = trans.type;
    document.getElementById("amount").value = trans.amount;
    document.getElementById("date").value = trans.date;
    document.getElementById("description").value = trans.description;
    document.getElementById("category").value = trans.category;

    deleteTransaction(trans.id);
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    displayTransactions();
    updateBalance();
    updateChart();
}

function searchTransactions() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => {
        return transaction.description.toLowerCase().includes(query) || transaction.category.toLowerCase().includes(query);
    });

    filtereddisplay(filteredTransactions);
}

function filtereddisplay(filteredTransactions) {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div>
                <strong>${transaction.type.toUpperCase()}</strong>: $${transaction.amount.toFixed(2)} 
                <br> ${transaction.description} (${transaction.category}) - ${transaction.date}
            </div>
            <div>
                <button class="edit-button" onclick="editTransaction(${transaction.id})">Edit</button>
                <button class="delete-button" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </div>
        `;
        transactionList.appendChild(transactionItem);
    });
}

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    document.getElementById('balance').innerText = `Balance: $${balance.toFixed(2)}`;
}

function updateChart() {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc - t.amount, 0); 
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');

    // Destroy existing chart instance if it exists
    if (incomeExpenseChart !== null) {
        incomeExpenseChart.destroy();
    }

    incomeExpenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [income, expense],
                backgroundColor: ['#4CAF50', '#FF6347']
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayTransactions();
    updateBalance();
    updateChart();
});
