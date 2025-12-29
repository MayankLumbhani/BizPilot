const API = "http://localhost:5000";


// ---------- TASKS ----------
async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const data = await res.json();

  const list = document.getElementById("tasksList");
  list.innerHTML = "";

  data.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${t.title} — <b>${t.status}</b>
      <button onclick="completeTask('${t.id}')">Complete</button>
      <button onclick="deleteTask('${t.id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById("taskTitle").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  document.getElementById("taskTitle").value = "";
  loadTasks();
}

async function completeTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" })
  });

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}


// ---------- CLIENTS ----------


async function loadClients() {
  const res = await fetch(`${API}/clients`);
  const data = await res.json();

  const list = document.getElementById("clientsList");
  list.innerHTML = "";

  data.forEach(c => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${c.name} — ${c.phone}
      <button onclick="deleteClient('${c.id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}

async function addClient() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;

  await fetch(`${API}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone })
  });

  document.getElementById("clientName").value = "";
  document.getElementById("clientPhone").value = "";
  loadClients();
}

async function deleteClient(id) {
  await fetch(`${API}/clients/${id}`, { method: "DELETE" });
  loadClients();
}


// ---------- TRANSACTIONS ----------


async function loadTransactions() {
  const res = await fetch(`${API}/transactions`);
  const data = await res.json();

  const list = document.getElementById("transactionsList");
  list.innerHTML = "";

  data.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${t.type} — ₹${t.amount}
      <button onclick="deleteTransaction('${t.id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}


async function addTransaction() {
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  await fetch(`${API}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, type })
  });

  document.getElementById("amount").value = "";
  loadTransactions();
}

async function deleteTransaction(id) {
  await fetch(`${API}/transactions/${id}`, { method: "DELETE" });
  loadTransactions();
}


// INITIAL LOAD
loadTasks();
loadClients();
loadTransactions();
