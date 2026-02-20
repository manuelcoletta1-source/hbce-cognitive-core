import express from "express";
import { writeMemory, readMemory, appendLedger } from "./core/memory-ledger.js";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = 7711;

// ===== HEALTH =====
app.get("/health", (req, res) => {
  res.json({
    status: "HBCE cognitive core online",
    time: new Date().toISOString()
  });
});

// ===== WRITE MEMORY =====
app.post("/memory", (req, res) => {
  try {
    const { kind, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "content required" });
    }

    const item = writeMemory(kind || "NOTE", content);

    res.json({
      ok: true,
      stored: item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== READ MEMORY =====
app.get("/memory", (req, res) => {
  try {
    const mem = readMemory();
    res.json(mem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== DECISION EVENT =====
app.post("/decision", (req, res) => {
  try {
    const data = req.body;

    const entry = appendLedger("DECISION", data);

    res.json({
      ok: true,
      entry
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== VERIFY LEDGER =====
app.get("/verify", (req, res) => {
  try {
    if (!fs.existsSync("./data/ledger.json")) {
      return res.json({ valid: false, reason: "no ledger" });
    }

    const ledger = JSON.parse(fs.readFileSync("./data/ledger.json"));

    for (let i = 1; i < ledger.length; i++) {
      if (ledger[i].prev_hash !== ledger[i - 1].hash) {
        return res.json({
          valid: false,
          broken_at: i
        });
      }
    }

    res.json({
      valid: true,
      entries: ledger.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("HBCE Cognitive Core running on port", PORT);
});
