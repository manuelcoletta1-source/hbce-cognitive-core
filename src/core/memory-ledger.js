import fs from "fs";
import crypto from "crypto";
import nacl from "tweetnacl";

const KEYS_PATH = "./data/keys.json";
const LEDGER_PATH = "./data/ledger.json";
const MEMORY_PATH = "./data/memory.json";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function toHex(u8) {
  return Buffer.from(u8).toString("hex");
}

// ===== LOAD KEYS =====
function loadKeys() {
  if (!fs.existsSync(KEYS_PATH)) {
    throw new Error("Keys not found. Run init first.");
  }
  return JSON.parse(fs.readFileSync(KEYS_PATH));
}

// ===== LOAD LEDGER =====
function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) {
    throw new Error("Ledger missing. Run init.");
  }
  return JSON.parse(fs.readFileSync(LEDGER_PATH));
}

function saveLedger(ledger) {
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
}

// ===== MEMORY =====
export function writeMemory(kind, content) {
  let memory = [];

  if (fs.existsSync(MEMORY_PATH)) {
    memory = JSON.parse(fs.readFileSync(MEMORY_PATH));
  }

  const item = {
    id: memory.length + 1,
    kind,
    content,
    timestamp: new Date().toISOString()
  };

  memory.push(item);
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));

  appendLedger("MEMORY_WRITE", item);
  return item;
}

// ===== LEDGER APPEND =====
export function appendLedger(type, data) {
  const keys = loadKeys();
  const ledger = loadLedger();

  const last = ledger[ledger.length - 1];

  const payload = {
    type,
    data,
    timestamp: new Date().toISOString(),
    core_id: keys.core_id
  };

  const payloadStr = JSON.stringify(payload);
  const hash = sha256(last.hash + payloadStr);

  const sig = nacl.sign.detached(
    Buffer.from(hash, "hex"),
    Buffer.from(keys.secretkey_hex, "hex")
  );

  const entry = {
    index: ledger.length,
    prev_hash: last.hash,
    hash: hash,
    signature: toHex(sig),
    payload
  };

  ledger.push(entry);
  saveLedger(ledger);

  return entry;
}

// ===== READ MEMORY =====
export function readMemory() {
  if (!fs.existsSync(MEMORY_PATH)) return [];
  return JSON.parse(fs.readFileSync(MEMORY_PATH));
}
