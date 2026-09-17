# bun-react-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.3.9. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.





# Solana DApp Wallet

A decentralized wallet DApp built on the **Solana ecosystem**.

The project is designed to understand how a wallet DApp works from the frontend all the way to the Solana blockchain, rather than treating blockchain interactions as a black box.

---

## 🏗️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Wallet Adapter
* Solana Web3.js
* Tailwind CSS *(optional)*

### Backend

* Bun
* TypeScript
* Solana Web3.js
* REST API / HTTP API
* RPC communication with Solana

### Blockchain

* Solana
* SOL
* SPL Tokens
* Solana RPC
* Keypairs / Public Keys
* Transactions
* Instructions
* Accounts
* Programs
* PDAs *(if required later)*

---

# 📁 Project Architecture

```text
solana-wallet-dapp/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── solana/
│   │   ├── utils/
│   │   ├── types/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── bun.lock
│
├── README.md
└── .gitignore
```

---

# 🧠 Core Mental Model

The most important thing to understand:

```text
React UI
   │
   │ User action
   ▼
Frontend TypeScript
   │
   │ Wallet / API request
   ▼
Backend (Bun + TypeScript)
   │
   │ RPC request
   ▼
Solana Network
   │
   ▼
Solana Accounts / Programs
```

However, **not every wallet operation needs the backend**.

For example:

```text
Connect Wallet
     │
     ▼
Browser Wallet
     │
     ▼
Solana RPC
```

A frontend can directly communicate with Solana using an RPC connection.

The backend becomes useful when we need server-side logic, indexing, database storage, authentication, transaction preparation, etc.

---

# 🔑 Important Solana Concepts

## 1. Wallet

A wallet allows a user to control blockchain accounts.

A wallet generally involves:

```text
Private Key / Secret Key
        │
        ▼
     Keypair
      /    \
     /      \
Private     Public
Key         Key
             │
             ▼
          Address
```

The **public key** can safely be shared.

The **private key must never be exposed**.

---

# 2. Public Key

A Solana account has a public address.

Example:

```ts
const publicKey = wallet.publicKey;
```

It can be displayed to the user:

```text
7xKX...9AbC
```

Think of it approximately as:

```text
Public Key ≈ Account Address
```

---

# 3. Keypair

A keypair consists of:

```text
Keypair
├── Public Key
└── Secret/Private Key
```

Example:

```ts
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(keypair.publicKey.toBase58());
```

The public key can be displayed.

The secret key should **never** be sent to the frontend or exposed through logs.

---

# 4. RPC

RPC means **Remote Procedure Call**.

Your application uses RPC to communicate with the Solana network.

```text
Your Application
      │
      │ RPC Request
      ▼
Solana RPC Node
      │
      ▼
Solana Network
```

Example:

```ts
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);
```

---

# 5. Solana Cluster

Solana has different environments.

Common ones:

```text
Mainnet-beta
    ↓
Real SOL / real transactions

Devnet
    ↓
Development / testing

Testnet
    ↓
Testing infrastructure
```

For development:

```ts
clusterApiUrl("devnet")
```

is commonly used.

---

# 💰 SOL Balance

To get a wallet's SOL balance:

```ts
const balance = await connection.getBalance(publicKey);
```

The returned value is in **lamports**.

```text
1 SOL = 1,000,000,000 lamports
```

Therefore:

```ts
const sol = balance / 1_000_000_000;
```

---

# 🔄 Transaction Mental Model

A Solana transaction is not simply:

```text
User → Blockchain
```

A better mental model is:

```text
User Action
     │
     ▼
Create Instruction
     │
     ▼
Create Transaction
     │
     ▼
Wallet Signs Transaction
     │
     ▼
Send Transaction
     │
     ▼
Solana Validator
     │
     ▼
Program Executes
     │
     ▼
Accounts Updated
```

---

# 🧩 Instruction

An instruction tells a Solana program what operation should be performed.

Conceptually:

```text
Instruction
├── Program ID
├── Accounts
└── Instruction Data
```

Example:

```text
Transfer SOL
      │
      ├── System Program
      ├── Sender Account
      ├── Receiver Account
      └── Amount
```

---

# 📦 Transaction

A transaction contains one or more instructions.

```text
Transaction
│
├── Instruction 1
├── Instruction 2
└── Instruction 3
```

Then the wallet signs it.

```text
Transaction
      │
      ▼
Wallet
      │
      │ Sign
      ▼
Signed Transaction
      │
      ▼
Solana
```

---

# 👛 Wallet Connection

The frontend should be able to:

* Connect wallet
* Disconnect wallet
* Display public key
* Display SOL balance
* Request transaction signatures
* Display transaction status

Example concept:

```ts
const { publicKey, connected } = useWallet();
```

---

# 🔐 Wallet Security

## NEVER

Do not do this:

```ts
console.log(secretKey);
```

Do not send private keys to:

```text
Backend
Database
Frontend
Logs
API requests
GitHub
```

Never put secrets inside:

```text
.env committed to Git
```

---

# 🌐 Frontend Responsibilities

The React application handles:

```text
UI
│
├── Wallet connection
├── Wallet state
├── Balance display
├── Transaction UI
├── User input
├── Transaction confirmation
└── Error display
```

Example:

```text
User clicks "Send SOL"
          │
          ▼
React Component
          │
          ▼
Create transaction
          │
          ▼
Wallet signs
          │
          ▼
Send to Solana
          │
          ▼
Show transaction status
```

---

# ⚙️ Backend Responsibilities

The Bun backend can handle:

```text
API
│
├── Server-side business logic
├── Solana RPC communication
├── Transaction preparation
├── Database operations
├── Indexing
├── Authentication
└── External services
```

Example architecture:

```text
React
  │
  │ HTTP
  ▼
Bun Backend
  │
  ├── Business Logic
  │
  ├── Database
  │
  └── Solana RPC
          │
          ▼
       Solana
```

---

# 🦕 Why Bun?

Bun provides:

* JavaScript runtime
* TypeScript support
* Package management
* Fast development server
* HTTP server capabilities

Example:

```ts
Bun.serve({
  port: 3000,

  fetch(req) {
    return new Response("Solana Wallet API");
  },
});
```

Run:

```bash
bun run src/server.ts
```

---

# 🔗 Backend → Solana

Backend can create an RPC connection:

```ts
import {
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);
```

Then backend can query Solana:

```ts
const balance = await connection.getBalance(publicKey);
```

---

# 🔁 Frontend ↔ Backend API

Example:

```text
React
  │
  │ GET /api/balance/:address
  ▼
Bun Backend
  │
  │ RPC
  ▼
Solana
```

Response:

```json
{
  "address": "...",
  "balance": 1.42
}
```

---

# 🪙 SPL Tokens

Solana tokens are commonly represented using **SPL Token programs**.

Conceptually:

```text
Wallet
 │
 ├── SOL
 │
 └── Token Accounts
       │
       ├── USDC
       ├── USDT
       └── Other SPL Tokens
```

Important distinction:

```text
Wallet Address
       ≠
Token Account
```

A wallet can own multiple token accounts.

---

# 🗃️ Solana Accounts

One of the most important Solana concepts:

> Solana programs operate on accounts.

Conceptually:

```text
Account
├── Address
├── Owner Program
├── Lamports
├── Data
└── Executable
```

A wallet account and a program-owned data account are different kinds of accounts.

---

# 🧠 Programs

Solana programs are the equivalent of smart contracts.

```text
User
 │
 ▼
Transaction
 │
 ▼
Instruction
 │
 ▼
Solana Program
 │
 ▼
Accounts modified
```

Programs contain the logic.

Accounts contain the state.

---

# 🧭 Development Flow

## Phase 1 — Wallet UI

Build:

```text
[ Connect Wallet ]

        ↓

Wallet Connected

Address:
7xKX...9AbC

Balance:
2.53 SOL
```

---

## Phase 2 — SOL Bala
