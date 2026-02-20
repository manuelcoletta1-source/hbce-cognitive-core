import { appendLedger } from "../src/core/memory-ledger.js";

// ===== ATTIVAZIONE UFFICIALE CORE =====

const activation = {
  event: "COGNITIVE_CORE_ACTIVATION",
  declaration: "Primary HBCE cognitive nucleus is now ACTIVE",
  entity: "JOKER-C2-COGNITIVE-CORE",
  ipr_root: "IPR-3",
  operator: "Manuel Coletta",
  network: "HBCE",
  status: "ACTIVE",
  timestamp: new Date().toISOString()
};

try {
  const entry = appendLedger("CORE_ACTIVATION", activation);

  console.log("✔ Cognitive core officially activated");
  console.log("Ledger index:", entry.index);
  console.log("Hash:", entry.hash);
} catch (err) {
  console.error(err.message);
}
