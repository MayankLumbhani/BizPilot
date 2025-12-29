const express = require("express");
const router = express.Router();
const db = require("../firebase");

// ADD TRANSACTION (sale or expense)
router.post("/", async (req, res) => {
  try {
    const { amount, type, note, date } = req.body;

    if (!amount || !type)
      return res.status(400).json({ error: "Amount & type required" });

    const docRef = await db.collection("transactions").add({
      amount,
      type, // "sale" or "expense"
      note: note || "",
      date: date || new Date(),
      createdAt: new Date()
    });

    res.json({ id: docRef.id, message: "Transaction added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TRANSACTIONS
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("transactions")
      .orderBy("createdAt", "desc")
      .get();

    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE TRANSACTION
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection("transactions").doc(id).delete();

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
