// ================= STAFF.JS =================

const appState = {
  currentPage: 'dashboard',

  staffTasks: [
    {
      id: 1,
      title: 'Prepare monthly report',
      description: 'Compile sales data',
      dueDate: '2025-12-31',
      priority: 'high',
      status: 'pending',
    },
  ],

  clients: [
    {
      id: 1,
      name: 'Michael Chen',
      company: 'Tech Solutions Inc',
      email: 'michael@techsolutions.com',
      phone: '(555) 123-4567',
      address: '123 Tech Street',
      status: 'active',
    },
  ],

  transactions: [
    {
      id: 1,
      description: 'Client Payment',
      type: 'income',
      amount: 5000,
      date: '2025-12-28',
    },
  ],
};

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.dashboard-section');

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  navigateTo('dashboard');
});

// -------- NAVIGATION --------

function setupNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });
}

function navigateTo(page) {
  appState.currentPage = page;

  navItems.forEach(i => i.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

  const map = {
    dashboard: 'staffDashboard',
    tasks: 'staffDashboard',
    clients: 'clientsPage',
    transactions: 'transactionsPage',
  };

  const sectionId = map[page];
  if (sectionId) {
    document.getElementById(sectionId)?.classList.add('active');
  }

  renderPage(page);
}

// -------- PAGE RENDER --------

function renderPage(page) {
  if (page === 'dashboard' || page === 'tasks') renderStaffTasks();
  if (page === 'clients') renderClients();
  if (page === 'transactions') renderTransactions();
}

// -------- STAFF TASKS --------

function renderStaffTasks() {
  const list = document.getElementById('staffTaskList');
  if (!list) return;

  list.innerHTML = '';

  appState.staffTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-detailed-item';

    li.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <small>${task.dueDate}</small>
    `;

    list.appendChild(li);
  });
}

// -------- CLIENTS (THIS WAS MISSING BEFORE) --------

function renderClients() {
  const clientsList = document.getElementById('clientsList');
  if (!clientsList) return;

  clientsList.innerHTML = '';

  appState.clients.forEach(client => {
    const div = document.createElement('div');
    div.className = 'client-card';

    div.innerHTML = `
      <h3>${client.name}</h3>
      <p>${client.company}</p>
      <p>${client.email}</p>
      <p>${client.phone}</p>
      <span>${client.status}</span>
    `;

    clientsList.appendChild(div);
  });
}

// -------- TRANSACTIONS --------

function renderTransactions() {
  const tbody = document.querySelector('#transactionsTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  appState.transactions.forEach(t => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${t.description}</td>
      <td>${t.type}</td>
      <td>${t.amount}</td>
      <td>${t.date}</td>
    `;

    tbody.appendChild(tr);
  });
}
