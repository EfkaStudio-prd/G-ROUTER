<div align="center">

# 🚀 Golden Router

### All-In-One AI Router System — Unified Gateway for 200+ LLM Providers

**One endpoint. Every AI tool. Auto-fallback. Token compression.**

[![Node](https://img.shields.io/badge/node-%E2%89%A522.22.2-brightgreen?style=flat-square)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-EfkaStudio--prd%2FG--ROUTER-blue?style=flat-square&logo=github)](https://github.com/EfkaStudio-prd/G-ROUTER)

</div>

---

## ⚡ One-Click Install

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/EfkaStudio-prd/G-ROUTER/main/install.ps1 | iex
```

**Linux / macOS (Bash):**
```bash
curl -fsSL https://raw.githubusercontent.com/EfkaStudio-prd/G-ROUTER/main/install.sh | bash
```

The installer will:
1. Verify Node.js (≥22.22.2) and Git
2. Clone or update the repository to `~/golden-router`
3. Install all dependencies via `npm install`
4. Generate JWT and API key secrets
5. Build the production bundle
6. Install the global `golden-router` CLI

---

## 🎯 What Is Golden Router?

Golden Router is a **production-grade unified AI gateway** that routes any LLM tool through a single endpoint. Plug Claude Code, Codex, Cursor, Cline, Copilot, or any OpenAI-compatible CLI into **200+ providers** — including 50+ free tiers — with automatic fallback, cost optimization, and 15-95% token compression.

### Core Features

- **🌐 200+ AI Providers** — OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, Cerebras, Cloudflare AI, NVIDIA NIM, and many more
- **🆓 50+ Free Tiers** — Including 11 free-forever providers (Kiro, Qoder, Pollinations, LongCat...)
- **🔀 14 Routing Strategies** — Priority, weighted, round-robin, cost-optimized, context-relay, auto, LKGP, and more
- **🗜️ RTK + Caveman Compression** — Stack savings: 78–95% token reduction on tool-heavy sessions
- **🛡️ Resilience Built-In** — Circuit breakers, connection cooldown, model lockout (3 independent layers)
- **🔌 MCP + A2A Protocols** — 37 MCP tools, JSON-RPC 2.0 A2A, full agent automation
- **🖥️ Multi-Platform** — Web · Desktop (Electron) · PWA · Termux (Android) · Docker
- **🔒 Local-First & Private** — AES-256-GCM at rest, zero telemetry, 100% open-source

---

## 🚀 Quick Start

After running the installer:

```bash
golden-router
```

Then open the dashboard at **http://localhost:20128**.

Point any AI tool at:
```
Base URL: http://localhost:20128/v1
API Key:  [generated — see Dashboard → Endpoints]
Model:    auto    # smart routing across all your providers
```

---

## 🧩 Compatible Tools

Claude Code · Codex CLI · Cursor · Cline · Copilot · Gemini CLI · OpenCode · Kilo Code · Continue · Antigravity · Windsurf · Hermes · Roo · **any OpenAI-compatible client**

---

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Runtime**: Node.js 22.22.2+ / 24+
- **Language**: TypeScript 5.9
- **Database**: better-sqlite3 (local) + Supabase (optional cloud sync)
- **Auth**: Clerk (optional) + local API keys
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Streaming**: Server-Sent Events via `open-sse` workspace
- **i18n**: 40+ languages via next-intl

---

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [CLI Tools Setup](docs/CLI-TOOLS.md)
- [Compression Engines](docs/COMPRESSION_GUIDE.md)
- [MCP Server](docs/frameworks/MCP-SERVER.md)
- [A2A Server](docs/frameworks/A2A-SERVER.md)
- [Auto-Combo Engine](docs/routing/AUTO-COMBO.md)
- [Security & Authorization](docs/architecture/AUTHZ_GUIDE.md)

---

## 🔧 Manual Install (From Source)

```bash
git clone https://github.com/EfkaStudio-prd/G-ROUTER.git golden-router
cd golden-router
cp .env.example .env.local
npm install
npm run build
npm start
```

---

## 🤝 Contributing

Pull requests welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for the testing & coverage requirements.

---

## 📜 License

MIT © EfkaStudio — see [LICENSE](LICENSE)

---

<div align="center">

**Built with ❤️ for developers who never want to stop coding.**

[GitHub](https://github.com/EfkaStudio-prd/G-ROUTER) · [Issues](https://github.com/EfkaStudio-prd/G-ROUTER/issues) · [Discussions](https://github.com/EfkaStudio-prd/G-ROUTER/discussions)

</div>
