// ============================================
// APP.JS - BizPilot Dashboard Functionality
// ============================================

// State Management
const appState = {
  userRole: 'OWNER',
  currentPage: 'dashboard',
  tasks: [
    { id: 1, title: 'Review Q4 financial reports', dueDate: '2:00 PM', completed: false },
    { id: 2, title: 'Meeting with new client - Acme Corp', dueDate: '3:30 PM', completed: false },
    { id: 3, title: 'Approve staff timesheets', dueDate: '5:00 PM', completed: false },
    { id: 4, title: 'Update project proposals', dueDate: 'Tomorrow', completed: false },
  ],
  staffTasks: [
    { id: 1, title: 'Follow up with ABC Industries', description: 'Send contract proposal and schedule follow-up call', dueDate: '2025-12-29', priority: 'high', status: 'pending' },
    { id: 2, title: 'Update client contact information', description: 'Review and update client database with recent changes', dueDate: '2025-12-30', priority: 'medium', status: 'pending' },
    { id: 3, title: 'Prepare monthly report', description: 'Compile sales data and create summary report', dueDate: '2025-12-31', priority: 'high', status: 'completed' },
  ],
  clients: [
    { id: 1, name: 'Michael Chen', company: 'Tech Solutions Inc', email: 'michael@techsolutions.com', phone: '(555) 123-4567', address: '123 Tech Street, San Francisco, CA', status: 'active' },
    { id: 2, name: 'Sarah Williams', company: 'Global Ventures', email: 'sarah@globalventures.com', phone: '(555) 234-5678', address: '456 Business Ave, New York, NY', status: 'active' },
    { id: 3, name: 'David Johnson', company: 'Acme Corporation', email: 'david@acmecorp.com', phone: '(555) 345-6789', address: '789 Corporate Blvd, Chicago, IL', status: 'prospect' },
  ],
  transactions: [
    { id: 1, description: 'Client Payment - ABC Industries', type: 'income', amount: 5000, date: '2025-12-28' },
    { id: 2, description: 'Office Supplies', type: 'expense', amount: 245.50, date: '2025-12-27' },
    { id: 3, description: 'Software License Renewal', type: 'expense', amount: 1200, date: '2025-12-26' },
  ],
};

// DOM Elements
const ownerBtn = document.getElementById('ownerBtn');
const staffBtn = document.getElementById('staffBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebar = document.querySelector('.sidebar');
const navItems = document.querySelectorAll('.nav-item');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const content = document.getElementById('content');

// ============================================
// INITIALIZATION
// ============================================

function init() {
  setupEventListeners();
  switchRole('OWNER');
  renderOwnerDashboard();
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Role Switching
  ownerBtn.addEventListener('click', () => switchRole('OWNER'));
  staffBtn.addEventListener('click', () => switchRole('STAFF'));

  // Navigation
  navItems.forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });

  // Mobile Menu
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Forms
  const taskForm = document.getElementById('taskForm');
  const clientForm = document.getElementById('clientForm');
  const transactionForm = document.getElementById('transactionForm');

  if (taskForm) taskForm.addEventListener('submit', handleAddTask);
  if (clientForm) clientForm.addEventListener('submit', handleAddClient);
  if (transactionForm) transactionForm.addEventListener('submit', handleAddTransaction);

  // Owner Dashboard Actions
  const ownerTaskList = document.getElementById('ownerTaskList');
  if (ownerTaskList) {
    ownerTaskList.addEventListener('click', handleOwnerTaskAction);
  }

  // Staff Task List
  const staffTaskList = document.getElementById('staffTaskList');
  if (staffTaskList) {
    staffTaskList.addEventListener('click', handleStaffTaskAction);
  }

  // Clients List
  const clientsList = document.getElementById('clientsList');
  if (clientsList) {
    clientsList.addEventListener('click', handleClientAction);
  }

  // Transactions Table
  const transactionsTable = document.getElementById('transactionsTable');
  if (transactionsTable) {
    transactionsTable.addEventListener('click', handleTransactionAction);
  }
}

// ============================================
// ROLE MANAGEMENT
// ============================================

function switchRole(role) {
  appState.userRole = role;
  updateRoleUI();
  
  if (role === 'OWNER') {
    ownerBtn.classList.add('active');
    staffBtn.classList.remove('active');
    appState.currentPage = 'dashboard';
    navigateTo('dashboard');
    renderOwnerDashboard();
  } else {
    staffBtn.classList.add('active');
    ownerBtn.classList.remove('active');
    appState.currentPage = 'dashboard';
    navigateTo('dashboard');
    renderStaffDashboard();
  }
}

function updateRoleUI() {
  const userRoleDisplay = document.getElementById('userRoleDisplay');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userAvatar = document.getElementById('userAvatar');

  if (appState.userRole === 'OWNER') {
    userRoleDisplay.textContent = 'Owner';
    userName.textContent = 'John Doe';
    userEmail.textContent = 'john@company.com';
    userAvatar.textContent = 'JD';
  } else {
    userRoleDisplay.textContent = 'Staff';
    userName.textContent = 'Sarah Miller';
    userEmail.textContent = 'sarah@company.com';
    userAvatar.textContent = 'SM';
  }
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
  appState.currentPage = page;

  // Update active nav item
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === page) {
      item.classList.add('active');
    }
  });

  // Show/hide sections
  dashboardSections.forEach(section => {
    section.classList.remove('active');
  });

  if (appState.userRole === 'OWNER') {
    document.getElementById('ownerDashboard').classList.add('active');
  } else {
    const sectionMap = {
      dashboard: 'staffDashboard',
      tasks: 'staffDashboard',
      clients: 'clientsPage',
      transactions: 'transactionsPage',
      reports: 'reportsPage',
      settings: 'settingsPage',
    };
    document.getElementById(sectionMap[page] || 'staffDashboard').classList.add('active');
  }

  // Render appropriate content
  if (appState.userRole === 'STAFF') {
    renderStaffPage(page);
  }

  closeMobileMenu();
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
  sidebar.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
}

function closeMobileMenu() {
  sidebar.classList.remove('active');
  mobileOverlay.classList.remove('active');
}

// ============================================
// OWNER DASHBOARD
// ============================================

function renderOwnerDashboard() {
  const completedCount = appState.tasks.filter(t => t.completed).length;
  const pendingCount = appState.tasks.filter(t => !t.completed && t.dueDate.includes('PM')).length;

  document.getElementById('todayTasksCount').textContent = pendingCount;
  document.getElementById('completedTasksCount').textContent = `${completedCount} completed today`;

  renderOwnerTaskList();
}

function renderOwnerTaskList() {
  const taskList = document.getElementById('ownerTaskList');
  taskList.innerHTML = '';

  appState.tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <div class="task-text">
        <p class="task-title" style="${task.completed ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${task.title}</p>
        <p class="task-time">${task.dueDate}</p>
      </div>
      <div class="task-actions">
        <button class="btn-text" data-action="complete" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="btn-delete" data-action="delete" data-id="${task.id}">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function handleOwnerTaskAction(e) {
  const target = e.target;
  const taskId = parseInt(target.dataset.id);
  const action = target.dataset.action;

  if (action === 'complete') {
    toggleOwnerTask(taskId);
  } else if (action === 'delete') {
    deleteOwnerTask(taskId);
  } else if (target.classList.contains('task-checkbox')) {
    toggleOwnerTask(taskId);
  }
}

function toggleOwnerTask(id) {
  const task = appState.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderOwnerDashboard();
  }
}

function deleteOwnerTask(id) {
  appState.tasks = appState.tasks.filter(t => t.id !== id);
  renderOwnerDashboard();
}

// ============================================
// STAFF DASHBOARD
// ============================================

function renderStaffDashboard() {
  renderStaffTaskList();
}

function renderStaffPage(page) {
  switch (page) {
    case 'dashboard':
    case 'tasks':
      renderStaffTaskList();
      break;
    case 'clients':
      renderClientsList();
      break;
    case 'transactions':
      renderTransactionsList();
      break;
  }
}

// ============================================
// STAFF TASKS
// ============================================

function renderStaffTaskList() {
  const taskList = document.getElementById('staffTaskList');
  if (!taskList) return;

  taskList.innerHTML = '';

  appState.staffTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-detailed-item';
    if (task.status === 'completed') li.classList.add('completed');

    const priorityClass = `priority-${task.priority}`;

    li.innerHTML = `
      <div class="task-detailed-header">
        <input type="checkbox" class="task-checkbox" ${task.status === 'completed' ? 'checked' : ''} data-id="${task.id}">
        <h4 class="task-title" style="${task.status === 'completed' ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${task.title}</h4>
      </div>
      <p class="task-description">${task.description}</p>
      <div class="task-meta">
        <span class="priority-badge ${priorityClass}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
        <span class="task-date">📅 ${task.dueDate}</span>
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
  const taskId = parseInt(target.dataset.id);
  const action = target.dataset.action;

  if (action === 'complete') {
    toggleStaffTask(taskId);
  } else if (action === 'delete') {
    deleteStaffTask(taskId);
  } else if (target.classList.contains('task-checkbox')) {
    toggleStaffTask(taskId);
  }
}

function toggleStaffTask(id) {
  const task = appState.staffTasks.find(t => t.id === id);
  if (task) {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    renderStaffTaskList();
  }
}

function deleteStaffTask(id) {
  appState.staffTasks = appState.staffTasks.filter(t => t.id !== id);
  renderStaffTaskList();
}

function handleAddTask(e) {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDesc').value;
  const dueDate = document.getElementById('taskDate').value;
  const priority = document.getElementById('taskPriority').value;

  if (!title || !dueDate) return;

  const newTask = {
    id: Date.now(),
    title,
    description,
    dueDate,
    priority,
    status: 'pending',
  };

  appState.staffTasks.unshift(newTask);
  e.target.reset();
  renderStaffTaskList();
  showNotification('Task added successfully!');
}

// ============================================
// CLIENTS
// ============================================

function renderClientsList() {
  const clientsList = document.getElementById('clientsList');
  if (!clientsList) return;

  clientsList.innerHTML = '';

  appState.clients.forEach(client => {
    const div = document.createElement('div');
    div.className = 'client-card';

    const statusClass = `status-${client.status}`;
    const statusText = client.status.charAt(0).toUpperCase() + client.status.slice(1);

    div.innerHTML = `
      <div class="client-header">
        <h3>${client.name}</h3>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <p class="client-company">🏢 ${client.company}</p>
      <p class="client-detail">📧 ${client.email}</p>
      <p class="client-detail">📞 ${client.phone}</p>
      <p class="client-detail">📍 ${client.address}</p>
      <div class="client-actions">
        <button class="btn-outline" data-action="edit" data-id="${client.id}">Edit</button>
        <button class="btn-delete" data-action="delete" data-id="${client.id}">Delete</button>
      </div>
    `;

    clientsList.appendChild(div);
  });
}

function handleClientAction(e) {
  const target = e.target;
  const clientId = parseInt(target.dataset.id);
  const action = target.dataset.action;

  if (action === 'delete') {
    deleteClient(clientId);
  } else if (action === 'edit') {
    alert('Edit functionality - coming soon!');
  }
}

function deleteClient(id) {
  appState.clients = appState.clients.filter(c => c.id !== id);
  renderClientsList();
  showNotification('Client deleted');
}

function handleAddClient(e) {
  e.preventDefault();

  const name = document.getElementById('clientName').value;
  const company = document.getElementById('clientCompany').value;
  const email = document.getElementById('clientEmail').value;
  const phone = document.getElementById('clientPhone').value;
  const address = document.getElementById('clientAddress').value;
  const status = document.getElementById('clientStatus').value;

  if (!name || !company || !email) return;

  const newClient = {
    id: Date.now(),
    name,
    company,
    email,
    phone,
    address,
    status,
  };

  appState.clients.unshift(newClient);
  e.target.reset();
  renderClientsList();
  showNotification('Client added successfully!');
}

// ============================================
// TRANSACTIONS
// ============================================

function renderTransactionsList() {
  const tableBody = document.querySelector('#transactionsTable tbody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  appState.transactions.forEach((trans, index) => {
    const tr = document.createElement('tr');
    const amountClass = trans.type === 'income' ? 'amount-income' : 'amount-expense';
    const badgeClass = trans.type === 'income' ? 'badge-success' : 'badge-danger';
    const typeText = trans.type.charAt(0).toUpperCase() + trans.type.slice(1);
    const amountText = trans.type === 'income' ? `+$${trans.amount}` : `-$${trans.amount}`;

    tr.innerHTML = `
      <td>${trans.description}</td>
      <td><span class="${badgeClass}">${typeText}</span></td>
      <td class="${amountClass}">${amountText}</td>
      <td>${trans.date}</td>
      <td><button class="btn-delete" data-action="delete" data-id="${trans.id}">Delete</button></td>
    `;

    tableBody.appendChild(tr);
  });
}

function handleTransactionAction(e) {
  const target = e.target;
  const transId = parseInt(target.dataset.id);
  const action = target.dataset.action;

  if (action === 'delete') {
    deleteTransaction(transId);
  }
}

function deleteTransaction(id) {
  appState.transactions = appState.transactions.filter(t => t.id !== id);
  renderTransactionsList();
  showNotification('Transaction deleted');
}

function handleAddTransaction(e) {
  e.preventDefault();

  const type = document.getElementById('transType').value;
  const description = document.getElementById('transDesc').value;
  const amount = parseFloat(document.getElementById('transAmount').value);
  const date = document.getElementById('transDate').value;

  if (!description || !amount || !date) return;

  const newTransaction = {
    id: Date.now(),
    description,
    type,
    amount,
    date,
  };

  appState.transactions.unshift(newTransaction);
  e.target.reset();
  renderTransactionsList();
  showNotification('Transaction added successfully!');
}

// ============================================
// UTILITIES
// ============================================

function showNotification(message) {
  // Simple notification - can be enhanced
  console.log('Notification:', message);
  
  // Optional: Create a toast notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', init);
