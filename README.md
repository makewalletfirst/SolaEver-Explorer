# SolaEver Explorer (SLE)

[![SolaEver Explorer Build Check](https://github.com/makewalletfirst/SolaEver-Explorer/actions/workflows/build.yml/badge.svg)](https://github.com/makewalletfirst/SolaEver-Explorer/actions/workflows/build.yml)
[![CI Build](https://github.com/makewalletfirst/SolaEver-Explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/makewalletfirst/SolaEver-Explorer/actions/workflows/ci.yml)

The official high-performance block explorer designed specifically for the **SolaEver (SLE)** blockchain network. Forked from the original Solana Explorer, it is built with **Next.js 14**, **pnpm**, **Tailwind CSS**, and **TypeScript** to provide real-time slot progress, detailed transaction status checking, account inspections, token metrics, and validator analysis.

---

## 🌌 SolaEver Architecture & The Explorer's Role

**SolaEver (SLE)** is an independent, high-performance L1 blockchain benchmarked from the **Agave (Solana v4.0)** architecture. It inherits Solana's high speed and core technical mechanisms (Tower BFT, Gulf Stream, Sealevel execution, PoH), operating with sub-second block times (~400ms) to provide a free developer deployment playground.

Within the SolaEver ecosystem, the **SolaEver Explorer** serves as the central transparency engine. By connecting to the custom JSON-RPC node `https://rpc-sola.ever-chain.xyz`, the explorer enables users, developers, and operators to:
* **Trace Transactions**: Inspect transaction receipts, fee breakdowns, inner instructions, and raw execution logs.
* **Audit Accounts & Mints**: Visualize public keys, track native SLE and SPL token balances, and inspect token mint configurations.
* **Inspect Ledger Consensus**: Track slot updates, epoch distributions, aggregate supply dynamics, and active validator metrics.

---

## 🛠 Tech Stack

* **Core Framework**: Next.js 14 (App Router)
* **Package Manager**: pnpm (v10.17.1)
* **Programming Language**: TypeScript (v5.5.4)
* **Styling & Assets**: Tailwind CSS, PostCSS, SCSS, Radix UI primitive UI components, Lucide icons
* **Blockchain Integrations**: `@solana/web3.js` (v1.98.4), `@solana/kit` (v2.3.0), `@coral-xyz/anchor` (v0.30.1), `@metaplex-foundation/mpl-token-metadata`
* **Data Fetching & State**: **SWR** (Stale-While-Revalidate) for high-frequency RPC caching, **Jotai** for modular global client-side state
* **Data Visualization**: Chart.js / `react-chartjs-2` for network stats and supply breakdowns
* **Testing Framework**: Vitest for unit/integration tests, Playwright for E2E tests

---

## ⚡ Key Features & Technical Details

### 1. High-Frequency Real-Time Sync
Due to SolaEver's high-speed block generation, the Explorer implements **SWR** data fetching pipelines. This ensures that:
* Account balances, recent blocks, and validator details are updated automatically using short, non-blocking polling intervals.
* RPC load is heavily cached and throttled to prevent rate-limiting the SolaEver node while keeping client views alive.

### 2. Smart Contract Instruction Decoding (Anchor IDL)
* Utilizes `@coral-xyz/anchor` parsing engines to automatically fetch and apply program IDLs.
* Complex instruction parameters are decoded from binary formats into human-readable JSON formats in the user interface, assisting smart contract developers in debugging.

### 3. Spl-Token & Metaplex Parsing
* Integrates native SPL token parsers to handle Token and Token-2022 standards.
* Automatically processes Metaplex metadata parameters to display custom icons, descriptions, symbols, and token names.

---

## 📦 How to Build and Run Locally

Ensure you have [Node.js](https://nodejs.org/) (v20+) and [pnpm](https://pnpm.io/) configured in your local environment.

### 1. Install Dependencies
Install all node packages using pnpm:
```bash
pnpm install
```

### 2. Configure Environment Variables
Create a `.env.local` or duplicate the `.env.example` file and configure your RPC parameters:
```env
NEXT_PUBLIC_MAINNET_RPC_URL=https://rpc-sola.ever-chain.xyz
```

### 3. Build the Application
Compile the Next.js production bundle. Due to the size of Web3 dependencies, configure node memory parameters to prevent Out-Of-Memory compilation crashes:
```bash
NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_MAINNET_RPC_URL="https://rpc-sola.ever-chain.xyz" NODE_OPTIONS="--max_old_space_size=4096" pnpm build
```

### 4. Run the Servers
* **Development Server**: Run a local development watch tower:
  ```bash
  pnpm dev
  ```
  Open `http://localhost:3000` inside your browser to inspect the application.

* **Production Server**: Start the optimized build locally:
  ```bash
  pnpm start
  ```

---

## 🐳 Docker Deployment

The SolaEver Explorer is fully dockerized for fast deployment on server infrastructure.

### 1. Build Docker Image
Compile the React-Next codebase and package it into a secure, production-grade container:
```bash
docker build --network=host -t silverruler/solaever-explorer:0.1.0 .
```

### 2. Push to Docker Hub
Upload the compiled image to your registries:
```bash
docker push silverruler/solaever-explorer:0.1.0
```

### 3. Run Container
Start the block explorer using docker:
```bash
docker run -d -p 3000:3000 --name solaever-explorer silverruler/solaever-explorer:0.1.0
```

---

Developed with 💚 for the **SolaEver Network** ecosystem.
