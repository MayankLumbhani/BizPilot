// Staff View Script
const API_BASE_URL = 'http://localhost:5000';

const staffState = {
  staffTasks: [],
  clients: [],
  transactions: [],
};

// ============== TASK API CALLS ==============
async function fetchStaffTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    staffState.staffTasks = await response.json();
    renderStaffTaskList();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function addTaskToBackend(title, description, dueDate, priority) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, dueDate, priority })
    });
    if (!response.ok) throw new Error('Failed to add task');
    await fetchStaffTasks();
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

async function updateStaffTaskStatus(taskId, newStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!response.ok) throw new Error('Failed to update task');
    await fetchStaffTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function deleteStaffTaskFromBackend(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    await fetchStaffTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// ============== CLIENT API CALLS ==============
async function fetchClients() {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    staffState.clients = await response.json();
    renderClientsList();
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
}

async function addClientToBackend(name, phone, followUpDate, notes) {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, followUpDate, notes })
    });
    if (!response.ok) throw new Error('Failed to add client');
    await fetchClients();
  } catch (error) {
    console.error('Error adding client:', error);
  }
}

async function deleteClientFromBackend(clientId) {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete client');
    await fetchClients();
  } catch (error) {
    console.error('Error deleting client:', error);
  }
}

// ============== TRANSACTION API CALLS ==============
async function fetchTransactions() {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    staffState.transactions = await response.json();
    renderTransactionsList();
    updateReports();
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

async function addTransactionToBackend(amount, type, note, date) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, type, note, date })
    });
    if (!response.ok) throw new Error('Failed to add transaction');
    await fetchTransactions();
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}

async function deleteTransactionFromBackend(transactionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
    await fetchTransactions();
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
}

function renderStaffTaskList() {
  const taskList = document.getElementById('staffTaskList');
  if (!taskList) return;
  taskList.innerHTML = '';

  staffState.staffTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-detailed-item' + (task.status === 'completed' ? ' completed' : '');

    const priorityClass = `priority-${task.priority}`;

    li.innerHTML = `
      <div class="task-detailed-header">
        <input type="checkbox" class="task-checkbox" ${task.status === 'completed' ? 'checked' : ''} data-id="${task.id}">
        <h4 class="task-title" style="${task.status === 'completed' ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${task.title}</h4>
      </div>
      <p class="task-description">${task.title || 'No description'}</p>
      <div class="task-meta">
        <span class="priority-badge ${priorityClass}">${(task.priority || 'normal').charAt(0).toUpperCase() + (task.priority || 'normal').slice(1)}</span>
        <span class="task-date">📅 ${task.dueDate || 'No due date'}</span>
      </div>
      <div class="task-actions">
        <button class="btn-text" data-action="complete" data-id="${task.id}">${task.status === 'completed' ? 'Undo' : 'Complete'}</button>
        <button class="btn-delete" data-action="delete" data-id="${task.id}">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function handleStaffTaskAction(e) {
  const target = e.target;
  const taskId = target.dataset.id;
  const action = target.dataset.action;

  if (action === 'complete') toggleStaffTask(taskId);
  else if (action === 'delete') deleteStaffTask(taskId);
  else if (target.classList.contains('task-checkbox')) toggleStaffTask(taskId);
}

function toggleStaffTask(taskId) {
  const task = staffState.staffTasks.find(t => t.id === taskId);
  if (!task) return;
  const newStatus = task.status === 'completed' ? 'pending' : 'completed';
  updateStaffTaskStatus(taskId, newStatus);
}

function deleteStaffTask(taskId) {
  deleteStaffTaskFromBackend(taskId);
}

function handleAddTask(e) {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDesc').value.trim();
  const dueDate = document.getElementById('taskDate').value;
  const priority = document.getElementById('taskPriority').value;
  if (!title || !dueDate) return;

  addTaskToBackend(title, description, dueDate, priority);
  e.target.reset();
}

// Render Clients
function renderClientsList() {
  const clientsList = document.getElementById('clientsList');
  if (!clientsList) return;
  clientsList.innerHTML = '';

  staffState.clients.forEach(client => {
    const div = document.createElement('div');
    div.className = 'client-card';
    // Determine status from available data
    const statusClass = `status-${client.status || 'active'}`;
    const statusText = (client.status || 'active').charAt(0).toUpperCase() + (client.status || 'active').slice(1);

    div.innerHTML = `
      <div class="client-header">
        <h3>${client.name}</h3>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <p class="client-company">🏢 ${client.company || 'N/A'}</p>
      <p class="client-detail">📧 ${client.email || client.phone || 'N/A'}</p>
      <p class="client-detail">📞 ${client.phone || 'N/A'}</p>
      <p class="client-detail">📍 ${client.address || 'N/A'}</p>
      <div class="client-actions">
        <button class="btn-outline">Edit</button>
        <button class="btn-delete" data-action="delete-client" data-id="${client.id}">Delete</button>
      </div>
    `;
    clientsList.appendChild(div);
  });
}

function handleAddClient(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const company = document.getElementById('clientCompany').value.trim();
  const email = document.getElementById('clientEmail').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const address = document.getElementById('clientAddress').value.trim();
  const status = document.getElementById('clientStatus').value;

  if (!name) return;

  // Adapt to backend schema (name, phone, followUpDate, notes)
  addClientToBackend(name, phone, address, company);
  e.target.reset();
}

function handleDeleteClient(clientId) {
  deleteClientFromBackend(clientId);
}

function renderTransactionsList() {
  const tbody = document.querySelector('#transactionsTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  staffState.transactions.forEach(trans => {
    const tr = document.createElement('tr');
    const typeDisplay = trans.type === 'sale' ? 'income' : trans.type;
    const badgeClass = trans.type === 'sale' ? 'badge-success' : 'badge-danger';
    const amountClass = trans.type === 'sale' ? 'amount-income' : 'amount-expense';
    const amountText = trans.type === 'sale' ? `+$${trans.amount}` : `-$${trans.amount}`;

    tr.innerHTML = `
      <td>${trans.note || 'Transaction'}</td>
      <td><span class="${badgeClass}">${typeDisplay.charAt(0).toUpperCase() + typeDisplay.slice(1)}</span></td>
      <td class="${amountClass}">${amountText}</td>
      <td>${trans.date || 'N/A'}</td>
      <td><button class="btn-delete" data-action="delete" data-id="${trans.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function handleAddTransaction(e) {
  e.preventDefault();
  const type = document.getElementById('transType').value === 'income' ? 'sale' : 'expense';
  const description = document.getElementById('transDesc').value.trim();
  const amount = parseFloat(document.getElementById('transAmount').value);
  const date = document.getElementById('transDate').value;

  if (!description || !amount || !date) return;

  addTransactionToBackend(amount, type, description, date);
  e.target.reset();
}

function handleDeleteTransaction(id) {
  deleteTransactionFromBackend(id);
}

// Reports
function updateReports() {
  const totalIncome = staffState.transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const totalExpense = staffState.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

  // Update stat cards
  const monthlyRevenueAmount = document.getElementById('monthlyRevenueAmount');
  const monthlyExpenseAmount = document.getElementById('monthlyExpenseAmount');
  const netProfitAmount = document.getElementById('netProfitAmount');
  
  if (monthlyRevenueAmount) monthlyRevenueAmount.textContent = `$${totalIncome.toLocaleString()}`;
  if (monthlyExpenseAmount) monthlyExpenseAmount.textContent = `$${totalExpense.toLocaleString()}`;
  if (netProfitAmount) netProfitAmount.textContent = `$${netProfit.toLocaleString()}`;

  // Update report section
  const totalRevenueReport = document.getElementById('totalRevenueReport');
  const totalExpensesReport = document.getElementById('totalExpensesReport');
  const netProfitReport = document.getElementById('netProfitReport');
  const profitMarginReport = document.getElementById('profitMarginReport');
  
  if (totalRevenueReport) totalRevenueReport.textContent = `$${totalIncome.toLocaleString()}`;
  if (totalExpensesReport) totalExpensesReport.textContent = `$${totalExpense.toLocaleString()}`;
  if (netProfitReport) netProfitReport.textContent = `$${netProfit.toLocaleString()}`;
  if (profitMarginReport) profitMarginReport.textContent = `${profitMargin}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Fetch all data from backend
  fetchStaffTasks();
  fetchClients();
  fetchTransactions();

  // Remove Dashboard nav item
  const dashboardNav = document.querySelector('.nav-item[data-page="dashboard"]');
  if (dashboardNav) dashboardNav.parentElement.remove();

  // Get all nav items and sections (after dashboard removal)
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.dashboard-section');

  // Navigation handler
  function navigateTo(page) {
    sections.forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(page + 'Page');
    if (targetSection) targetSection.classList.add('active');

    // Re-render content for the page
    if (page === 'tasks') renderStaffTaskList();
    if (page === 'clients') renderClientsList();
    if (page === 'transactions') renderTransactionsList();
    if (page === 'reports') updateReports();
  }

  // Setup nav click listeners
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const page = item.dataset.page;
      navigateTo(page);
    });
  });

  // Set default active (tasks)
  const tasksNav = document.querySelector('.nav-item[data-page="tasks"]');
  if (tasksNav) tasksNav.classList.add('active');

  // Initial render all content
  renderStaffTaskList();
  renderClientsList();
  renderTransactionsList();
  updateReports();

  // Attach task list click handler
  const taskList = document.getElementById('staffTaskList');
  if (taskList) taskList.addEventListener('click', handleStaffTaskAction);

  // Attach task form handler
  const taskForm = document.getElementById('taskForm');
  if (taskForm) taskForm.addEventListener('submit', handleAddTask);

  // Attach client form handler
  const clientForm = document.getElementById('clientForm');
  if (clientForm) clientForm.addEventListener('submit', handleAddClient);

  // Attach client list delete handler
  const clientsList = document.getElementById('clientsList');
  if (clientsList) {
    clientsList.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'delete-client') {
        const id = e.target.dataset.id;
        handleDeleteClient(id);
      }
    });
  }

  // Attach transaction form handler
  const transactionForm = document.getElementById('transactionForm');
  if (transactionForm) transactionForm.addEventListener('submit', handleAddTransaction);

  // Attach transaction delete handler
  const transTable = document.getElementById('transactionsTable');
  if (transTable) {
    transTable.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'delete') {
        const id = e.target.dataset.id;
        handleDeleteTransaction(id);
      }
    });
  }
});
