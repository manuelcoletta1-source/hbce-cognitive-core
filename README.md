# HBCE Cognitive Core

Minimal verifiable cognitive nucleus with:

- Persistent cryptographic identity (Ed25519)
- Signed append-only ledger (hash-chain)
- Persistent memory storage
- Local API interface
- IPR binding (HBCE structure)

Designed as a foundational cybernetic core for operator systems, AI coordination and decision traceability.

---

## What This Repository Implements

This project creates a minimal but real cognitive core that:

1. Generates its own cryptographic identity
2. Maintains an immutable decision ledger
3. Stores persistent memory
4. Signs every event
5. Records activation and operational status
6. Binds to an upstream IPR root

It is not a chatbot.

It is a structured cybernetic decision nucleus.

---

## Core Architecture

### Identity
- Ed25519 keypair
- Deterministic core_id derived from public key
- Stored locally (never committed)

### Ledger
- Append-only
- Hash chained
- Signed entries
- Genesis block
- Birth event
- Activation event

### Memory
- Persistent JSON storage
- Every memory write is recorded in the ledger

### HBCE Binding
- IPR root linkage
- Operational identity declaration
- EU-first / audit-first / fail-closed principles

---

## Project Structure

hbce/ CORE-IDENTITY.json IPR-BINDING.json

scripts/ init.js birth-core.js activate-core.js

src/core/ memory-ledger.js

src/ server.js

---

## Initialization

After cloning locally:

```bash
node scripts/init.js
node scripts/birth-core.js
node scripts/activate-core.js
node src/server.js

Endpoints:

GET /health

POST /memory

GET /memory

POST /decision

GET /verify



---

Security Model

Private keys are never committed

Ledger is append-only

History cannot be rewritten without breaking the chain

Every event is cryptographically signed

Designed to operate fail-closed



---

Conceptual Position

This repository represents:

A minimal operational cybernetic core
Derived from IPR-3
Operating under HBCE infrastructure principles

It is intended to serve as:

Decision audit engine

Operator support core

AI coordination base

Foundation for federated cognitive nodes



---

Status

Operational prototype.

Not production hardened.





