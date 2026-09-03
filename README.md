# SolaEver Explorer

Block explorer for the **SolaEver** blockchain — a fork of the official
[Solana Explorer](https://github.com/solana-labs/explorer), customized to point
at SolaEver's RPC, branding, and styling.

[![Live](https://img.shields.io/badge/Live-solaever.ever--chain.xyz-blue)](https://solaever.ever-chain.xyz)
[![Docker](https://img.shields.io/badge/Docker-silverruler%2Fsolaever--explorer-2496ED?logo=docker)](https://hub.docker.com/r/silverruler/solaever-explorer)
[![Network](https://img.shields.io/badge/SolaEver-Agave_v4.0-5865F2)](https://github.com/makewalletfirst/SolaEver4)

---

## About SolaEver

**SolaEver (SLE)** is an independent high-performance blockchain built on
**Agave (Solana v4.0)** architecture, inheriting Solana mainnet's genesis rules
100% while providing a free, low-cost environment for DApp deployment and
blockchain education.

| Property | Value |
|---|---|
| Ticker | **SLE** |
| Base Unit | 1 SLE = 10⁹ Lamports |
| Architecture | Agave (Solana v4.0) |
| Slot Time | ~400ms |
| Fee Burn | 50% of transaction fees burned (deflationary) |
| Inflation | Starts at 8%, decreasing annually (Solana standard) |
| RPC | `https://rpc-sola.ever-chain.xyz` |

This explorer connects to that RPC and renders blocks, slots, transactions,
account state, program logs, and SPL token metadata (via mirrored Metaplex
Token Metadata Program) in real time.

---

## What this explorer does

| Feature | Notes |
|---|---|
| Real-time slot progress | Live tail of slot height + TPS via WebSocket |
| Transaction details | Full instruction list, account changes, program logs |
| Account inspection | Native SLE balance + parsed SPL token holdings |
| Token metadata | Resolves Metaplex PDA → name / symbol / image URL |
| Program logs | Decoded log lines for any deployed program |
| Address search | Direct lookup of any 32-byte base58 pubkey |
| Dark / light theme | Both supported (auto-detect + manual toggle) |

The branding swaps the original Solana logo and "Beta" tag for a custom
**SOLAEVER EXPLORER** SVG with the SolaEver favicon embedded — see
`app/img/logos-solana/{dark,light}-explorer-logo.svg`.

---

## Run with Docker (recommended)

```bash
docker pull silverruler/solaever-explorer:latest
docker run -d --name solaever-explorer -p 3001:3001 --restart unless-stopped \
  silverruler/solaever-explorer:latest
```

Then open `http://localhost:3001/`. The image is a multi-stage Next.js
standalone build (Node 20 alpine, ~312 MB).

Tagged releases: `:260531` (date-pinned) and `:latest` (always points at the
newest build).

---

## Build from source

### Prerequisites
- Node 20
- `pnpm` 10.17+ (`npm install -g pnpm@10.17.1`)

### Dev server (hot reload)

```bash
pnpm install --frozen-lockfile
pnpm dev --port 3001
```

This is the mode the production node currently runs under (`pm2 start pnpm
-- dev --port 3001`). SVG / asset edits hot-reload immediately.

### Production build (Next.js standalone)

```bash
pnpm install --frozen-lockfile
pnpm build
node .next/standalone/server.js
```

### Docker image

```bash
docker build -t silverruler/solaever-explorer:latest .
```

The `Dockerfile` is multi-stage:
- `base` — node:20-alpine + pnpm 10.17.1
- `builder` — `pnpm install --frozen-lockfile` + `pnpm build`
- `runner` — copies `public/`, `.next/standalone/`, `.next/static/` only.
  Exposes port 3001, runs as non-root `appuser`.

---

## Updating the logo

The header logo lives in **two SVGs** (dark + light theme variants):
```
app/img/logos-solana/dark-explorer-logo.svg
app/img/logos-solana/light-explorer-logo.svg
```

Both contain:
- a `<image href="data:image/png;base64,...">` element (the favicon, embedded)
- two `<text>` elements (`SOLAEVER` then `EXPLORER`)

To redesign:
1. Edit the SVGs in place (or regenerate via your favorite tool).
2. Restart the dev server (`pm2 restart solaever-explorer`) or rebuild Docker.
   Next.js fingerprints the SVG into `.next/static/media/explorer-logo.<hash>.svg`
   so the browser always picks up the new file on next load.

A regenerator pattern (Python) used during initial setup:
```python
import base64
with open("solaever-favicon.png", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
# write SVG with embedded f"data:image/png;base64,{b64}"
```
Resize the source PNG to ~96×96 before encoding to keep the SVG under 25 KB.

---

## Configuration

### RPC endpoint

The default RPC is wired to SolaEver in `app/utils/cluster.ts` (or whichever
file holds the cluster list — the upstream Solana Explorer keeps it there).
Point at a different RPC by editing that file or via the cluster selector in
the UI.

### Custom branding

The other SolaEver vs upstream changes live in:
- `app/img/logos-solana/` — SVG logos
- `public/favicon.png`, `solaever-favicon.png` — favicons
- `app/components/ClusterDetailsButton.tsx` (or similar) — anywhere the
  string "Solana" appears in the chrome can be swapped to "SolaEver"

---

## Operations

The production node at `solaever.ever-chain.xyz` runs this repo via pm2 as
process `solaever-explorer` (process id `0` on the operator's box):

```bash
# operator commands
pm2 logs solaever-explorer        # live logs
pm2 restart solaever-explorer     # reload after pulling new source
pm2 describe solaever-explorer    # current pm2 config
```

To deploy a new version:
1. `git pull origin main` on the operator host
2. (if Docker) `docker pull silverruler/solaever-explorer:latest` + recreate
3. (if dev mode) `pm2 restart solaever-explorer`

---

## Links

| Resource | URL |
|---|---|
| Live explorer | https://solaever.ever-chain.xyz |
| RPC endpoint | https://rpc-sola.ever-chain.xyz |
| SolaEver chain repo | [makewalletfirst/SolaEver4](https://github.com/makewalletfirst/SolaEver4) |
| SolaEver wallet | [makewalletfirst/SolaEver-wallet](https://github.com/makewalletfirst/SolaEver-wallet) |
| Docker Hub | [silverruler/solaever-explorer](https://hub.docker.com/r/silverruler/solaever-explorer) |
| Discord | https://discord.com/invite/dfSF58pzZB |

---

## License

Apache-2.0 — inherited from upstream
[solana-labs/explorer](https://github.com/solana-labs/explorer). See `LICENSE`.
