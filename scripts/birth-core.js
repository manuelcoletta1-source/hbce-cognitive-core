import fs from "fs";
import { appendLedger } from "../src/core/memory-ledger.js";

// ===== NASCITA UFFICIALE CORE =====

const birth = {
  event: "COGNITIVE_CORE_BIRTH",
  description: "First HBCE cognitive nucleus derived from IPR root",
  entity: "JOKER-C2",
  derived_from: "IPR-3",
  operator: "Manuel Coletta",
  network: "HBCE",
  timestamp: new Date().toISOString()
};

try {
  const entry = appendLedger("CORE_BIRTH", birth);

  console.log("✔ Cognitive core birth registered");
  console.log("Ledger index:", entry.index);
  console.log("Hash:", entry.hash);
} catch (err) {
  console.error(err.message);
}
