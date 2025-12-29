// ================= OWNER.JS =================

const appState = {
  tasks: [
    { id: 1, title: 'Review Q4 financial reports', dueDate: '2:00 PM', completed: false },
    { id: 2, title: 'Meeting with new client', dueDate: '3:30 PM', completed: false },
    { id: 3, title: 'Approve staff timesheets', dueDate: '5:00 PM', completed: false },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  renderOwnerDashboard();
});

// -------- OWNER DASHBOARD --------

function renderOwnerDashboard() {
  const completedCount = appState.tasks.filter(t => t.completed).length;
  const pendingCount = appState.tasks.filter(t => !t.completed).length;

  document.getElementById('todayTasksCount').textContent = pendingCount;
  document.getElementById('completedTasksCount').textContent =
    `${completedCount} completed today`;

  renderOwnerTaskList();
}

function renderOwnerTaskList() {
  const taskList = document.getElementById('ownerTaskList');
  if (!taskList) return;

  taskList.innerHTML = '';

  appState.tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <div>
        <p>${task.title}</p>
        <small>${task.dueDate}</small>
      </div>
    `;

    taskList.appendChild(li);
  });
}
