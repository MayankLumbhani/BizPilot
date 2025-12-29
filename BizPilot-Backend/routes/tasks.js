const express = require("express");
const router = express.Router();
const db = require("../firebase");

// ADD TASK
router.post("/", async (req, res) => {
  try {
    const { title, dueDate, priority } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const docRef = await db.collection("tasks").add({
      title,
      dueDate: dueDate || null,
      priority: priority || "normal",
      status: "pending",
      createdAt: new Date()
    });

    res.json({ id: docRef.id, message: "Task added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").orderBy("createdAt", "desc").get();

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    await db.collection("tasks").doc(taskId).delete();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = req.body;

    await db.collection("tasks").doc(taskId).update(data);

    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
