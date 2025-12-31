// owner/script.js - minimal owner-only logic with backend API integration
const API_BASE_URL = 'http://localhost:5000';

const ownerState = {
  tasks: [],
};

// Fetch tasks from backend
async function fetchOwnerTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    ownerState.tasks = await response.json();
    renderOwnerDashboard();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Keep local state if API fails
  }
}

// Update task status in backend
async function updateTaskStatus(taskId, newStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!response.ok) throw new Error('Failed to update task');
    await fetchOwnerTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

// Delete task from backend
async function deleteTaskFromBackend(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    await fetchOwnerTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

function renderOwnerDashboard() {
  const completedCount = ownerState.tasks.filter(t => t.status === 'completed').length;
  const pendingCount = ownerState.tasks.filter(t => t.status !== 'completed').length;

  const todayEl = document.getElementById('todayTasksCount');
  const completedEl = document.getElementById('completedTasksCount');
  if (todayEl) todayEl.textContent = pendingCount;
  if (completedEl) completedEl.textContent = `${completedCount} completed today`;

  renderOwnerTaskList();
}

function renderOwnerTaskList() {
  const taskList = document.getElementById('ownerTaskList');
  if (!taskList) return;
  taskList.innerHTML = '';

  ownerState.tasks.forEach(task => {
    const li = document.createElement('li');
    const isCompleted = task.status === 'completed';
    li.className = 'task-item' + (isCompleted ? ' completed' : '');
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} data-id="${task.id}">
      <div class="task-text">
        <p class="task-title" style="${isCompleted ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${task.title}</p>
        <p class="task-time">${task.dueDate || 'No due date'}</p>
      </div>
      <div class="task-actions">
        <button class="btn-text" data-action="complete" data-id="${task.id}">${isCompleted ? 'Undo' : 'Complete'}</button>
        <button class="btn-delete" data-action="delete" data-id="${task.id}">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function handleOwnerTaskAction(e) {
  const target = e.target;
  const taskId = target.dataset.id;
  const action = target.dataset.action;

  if (action === 'complete') toggleOwnerTask(taskId);
  else if (action === 'delete') deleteOwnerTask(taskId);
  else if (target.classList.contains('task-checkbox')) toggleOwnerTask(taskId);
}

function toggleOwnerTask(taskId) {
  const task = ownerState.tasks.find(t => t.id === taskId);
  if (!task) return;
  const newStatus = task.status === 'completed' ? 'pending' : 'completed';
  updateTaskStatus(taskId, newStatus);
}

function deleteOwnerTask(taskId) {
  deleteTaskFromBackend(taskId);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchOwnerTasks();
  const ownerTaskList = document.getElementById('ownerTaskList');
  if (ownerTaskList) ownerTaskList.addEventListener('click', handleOwnerTaskAction);
});
