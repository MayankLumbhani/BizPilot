const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clients");
const db = require("./firebase");
const taskRoutes = require("./routes/tasks");
const transactionRoutes = require("./routes/transactions");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/clients", clientRoutes);
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("BizPilot backend is running...");
});

app.get("/test-db", async (req, res) => {
  try {
    await db.collection("test").add({ message: "Hello Firebase!" });
    res.send("Firestore connected successfully 🚀");
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
