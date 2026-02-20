import fs from "fs";
import path from "path";
import crypto from "crypto";
import nacl from "tweetnacl";

// ===== CONFIG =====
const CORE_NAME = "HBCE-JOKER-COGNITIVE-CORE";
const DATA_DIR = "./data";
const KEYS_PATH = "./data/keys.json";
const LEDGER_PATH = "./data/ledger.json";

// ===== UTILS =====
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function toHex(u8) {
  return Buffer.from(u8).toString("hex");
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// ===== START =====
ensureDir(DATA_DIR);

// genera chiavi se non esistono
if (!fs.existsSync(KEYS_PATH)) {
  const kp = nacl.sign.keyPair();

  const pub = toHex(kp.publicKey);
  const sec = toHex(kp.secretKey);

  const core_id = sha256(pub).slice(0, 32);

  const keys = {
    core_name: CORE_NAME,
    core_id: core_id,
    algo: "ed25519",
    pubkey_hex: pub,
    secretkey_hex: sec,
    created_at: new Date().toISOString()
  };

  fs.writeFileSync(KEYS_PATH, JSON.stringify(keys, null, 2));
  console.log("✔ Identity created");
  console.log("CORE_ID:", core_id);
} else {
  console.log("Keys already exist");
}

// ===== GENESIS LEDGER =====
if (!fs.existsSync(LEDGER_PATH)) {
  const keys = JSON.parse(fs.readFileSync(KEYS_PATH));

  const genesis = {
    type: "GENESIS",
    core_id: keys.core_id,
    core_name: keys.core_name,
    timestamp: new Date().toISOString()
  };

  const payload = JSON.stringify(genesis);
  const hash = sha256(payload);

  const sig = nacl.sign.detached(
    Buffer.from(hash, "hex"),
    Buffer.from(keys.secretkey_hex, "hex")
  );

  const entry = {
    index: 0,
    prev_hash: "0".repeat(64),
    hash: hash,
    signature: toHex(sig),
    payload: genesis
  };

  fs.writeFileSync(LEDGER_PATH, JSON.stringify([entry], null, 2));

  console.log("✔ Genesis ledger created");
} else {
  console.log("Ledger already exists");
}

console.log("HBCE Cognitive Core initialized.");
