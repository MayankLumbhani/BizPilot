const express = require("express");
const router = express.Router();
const db = require("../firebase");

// ADD CLIENT
router.post("/", async (req, res) => {
  try {
    const { name, phone, followUpDate, notes } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const docRef = await db.collection("clients").add({
      name,
      phone: phone || "",
      followUpDate: followUpDate || null,
      notes: notes || "",
      createdAt: new Date()
    });

    res.json({ id: docRef.id, message: "Client added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CLIENTS
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("clients")
      .orderBy("createdAt", "desc")
      .get();

    const clients = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE CLIENT
router.delete("/:id", async (req, res) => {
  try {
    const clientId = req.params.id;

    await db.collection("clients").doc(clientId).delete();

    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
