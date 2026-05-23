# G-Router (Golden Router) - Requirements Document

**Project Code:** G-Router  
**Version:** 1.0  
**Date:** 2026-05-23  
**Status:** Draft

---

## 1. Project Overview

### 1.1 Project Goal

Build **Golden Router** - All In One Best Number 1 Router System that combines core functionalities from **OmniRoute** and **9router** to create the ultimate AI gateway for developers.

### 1.2 Problem Statement

- Developers face API model limitations in production systems
- Multiple provider dashboards create management overhead
- Token costs are high, especially for tool outputs (git diff, grep, ls, etc.)
- Rate limits interrupt coding workflows
- Manual provider switching is inefficient

### 1.3 Solution

A unified AI gateway that:

- Provides one endpoint for 160+ providers (50+ free)
- Connects Claude Code, Codex, Cursor, Cline, Copilot to FREE Claude/GPT/Gemini
- Saves 15-95% tokens via RTK + Caveman stacked compression
- Implements smart auto-fallback across provider tiers
- Never stops coding - zero downtime

---

## 2. Target Users

### 2.1 Primary Users

- **Developers** - Professional software engineers
- **Vibe Coders** - AI-assisted coding enthusiasts
- **AI Researchers** - Building AI-powered applications
- **DevOps Engineers** - Managing production AI systems

### 2.2 Skill Level

- Easy to use for all skill levels
- Zero-config for beginners
- Advanced options for power users

---

## 3. Core Features (MVP)

### 3.1 OmniRoute Core Features

#### 3.1.1 Provider Support

- **177 AI Providers** (50+ free tier)
- Free forever providers (no credit card required)
- Subscription providers (Claude Code, Codex, Copilot, Cursor)
- API key providers (40+ options)

#### 3.1.2 Routing System

- **14 Routing Strategies:**
  - `auto` - Zero-config smart routing
  - `priority` - Sequential fallback
  - `fill-first` - Use quota before next tier
  - `round-robin` - Load balancing
  - `weighted` - Weighted distribution
  - `p2c` - Provider-to-consumer
  - `least-used` - Minimize usage
  - `cost-optimized` - Minimize cost
  - `auto/cheap` - Auto cheapest
  - `context-relay` - Context-aware
  - `context-optimized` - Context optimization
  - `random` - Random selection
  - `strict-random` - Strict random
  - `lkgp` - Last known good provider
  - `reset-aware` - Reset time aware

#### 3.1.3 Combo System

- Auto-combo engine with 9-factor scoring
- Custom combo creation
- Multi-tier fallback (Subscription → API Key → Cheap → Free)
- Zero-config `auto` mode
- Virtual combo from connected providers

#### 3.1.4 Compression Pipeline

- **RTK Compression** - Tool output optimization
- **Caveman Compression** - General text compression
- **Stacked Compression** - RTK → Caveman (78.4-94.6% savings)
- 7 compression options
- Preservation engine for code blocks, URLs, JSON
- Auto-trigger by token threshold

#### 3.1.5 Resilience

- 3 independent resilience layers
- Circuit breakers
- TLS stealth
- Prompt-injection guard
- IP filtering
- Rate limiting
- Loopback-only process routes

#### 3.1.6 CLI & Agent Protocols

- **Full CLI** with 60+ commands:
  - `start` - Serve gateway + dashboard
  - `chat` - Interactive TUI chat client
  - `setup` - Guided first-run wizard
  - `doctor` - Diagnose providers, ports, native deps
  - `providers`, `oauth`, `keys`, `combo`, `nodes`, `models`
  - `cache`, `compression`, `cost`, `usage`, `quota`
  - `health`, `resilience`, `telemetry`, `logs`, `audit`
  - `mcp`, `a2a`, `cloud`, `memory`, `skills`, `eval`
  - `tunnel`, `backup`, `sync`, `webhooks`, `policy`
  - `pricing`, `translator`, `simulate`
- **MCP Server** - Model Context Protocol
- **A2A Server** - Agent-to-Agent protocol
- Agent can control OmniRoute autonomously

#### 3.1.7 Deployment Options

- npm global install
- Docker
- Desktop app (Electron)
- PWA (Progressive Web App)
- Termux (mobile)
- arm64 support

#### 3.1.8 Security & Privacy

- Local-first (100% on your hardware)
- No OmniRoute cloud in request path
- AES-256-GCM encryption for credentials
- Zero telemetry by default
- API-key scoping
- MIT licensed & fully open-source

#### 3.1.9 Multi-language Support

- 20+ languages including:
  - English, Portuguese, Spanish, French, Italian
  - Russian, Chinese, German, Japanese, Korean
  - Indonesian, Malay, Filipino, Arabic, Hebrew
  - And more...

### 3.2 9Router Core Features

#### 3.2.1 RTK Token Saver

- Auto-detect tool outputs (git diff, grep, find, ls, tree, log dumps)
- Filters: git-diff, git-status, grep, find, ls, tree, dedup-log, smart-truncate, read-numbered, search-list
- 20-40% token savings per request
- Safe by design (errors never break requests)
- Universal (works across all formats)
- Default ON, toggleable in dashboard

#### 3.2.2 Smart 3-Tier Fallback

- Tier 1: SUBSCRIPTION (Claude Code, Codex, GitHub Copilot)
- Tier 2: CHEAP (GLM $0.6/1M, MiniMax $0.2/1M)
- Tier 3: FREE (Kiro, OpenCode Free, Vertex $300 credits)
- Auto switches when quota runs out or errors occur

#### 3.2.3 Real-Time Quota Tracking

- Token consumption per provider
- Reset countdown (5-hour, daily, weekly)
- Cost estimation for paid tiers
- Monthly spending reports

#### 3.2.4 Format Translation

- Seamless translation between formats:
  - OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro ↔ Vertex ↔ Antigravity ↔ Ollama ↔ OpenAI Responses
- CLI tool sends OpenAI format → G-Router translates → Provider receives native format
- Works with any tool supporting custom OpenAI endpoints

#### 3.2.5 Multi-Account Support

- Add multiple accounts per provider
- Auto round-robin or priority-based routing
- Fallback to next account when one hits quota

#### 3.2.6 Auto Token Refresh

- OAuth tokens automatically refresh before expiration
- No manual re-authentication needed
- Seamless experience across all providers

#### 3.2.7 Custom Combos

- Create unlimited model combinations
- Mix subscription, cheap, and free tiers
- Name combos for easy access
- Share combos across devices with Cloud Sync

#### 3.2.8 Request Logging

- Debug mode for full request/response logs
- Track API calls, headers, payloads
- Troubleshoot integration issues
- Export logs for analysis

#### 3.2.9 Cloud Sync

- Sync providers, combos, settings across devices
- Automatic background sync
- Secure encrypted storage
- Access setup from anywhere

#### 3.2.10 Usage Analytics

- Track token usage per provider and model
- Cost estimation and spending trends
- Monthly reports and insights
- Optimize AI spending

#### 3.2.11 Deployment Options

- Localhost (default, works offline)
- VPS/Cloud (share across devices)
- Docker (one-command deployment)
- Cloudflare Workers (global edge network)

---

## 4. Feature Integration Strategy

### 4.1 Merged Features (Best of Both)

#### 4.1.1 Compression Engine

- **Primary:** OmniRoute's RTK + Caveman stacked compression (15-95% savings)
- **Enhancement:** 9Router's RTK filter system for tool outputs
- **Result:** Maximum token savings with intelligent detection

#### 4.1.2 Routing System

- **Primary:** OmniRoute's 14 routing strategies
- **Enhancement:** 9Router's 3-tier fallback structure
- **Result:** Most flexible routing with clear tier hierarchy

#### 4.1.3 Combo System

- **Primary:** OmniRoute's auto-combo engine with 9-factor scoring
- **Enhancement:** 9Router's combo naming and cloud sync
- **Result:** Intelligent combos with cross-device sync

#### 4.1.4 CLI System

- **Primary:** OmniRoute's 60+ CLI commands
- **Enhancement:** 9Router's usage analytics integration
- **Result:** Comprehensive CLI with built-in analytics

#### 4.1.5 Provider Support

- **Primary:** OmniRoute's 177 providers
- **Enhancement:** 9Router's multi-account support
- **Result:** Maximum provider coverage with account management

#### 4.1.6 Format Translation

- **Primary:** 9Router's format translation system
- **Enhancement:** OmniRoute's provider catalog
- **Result:** Universal format support across all providers

#### 4.1.7 Security & Privacy

- **Primary:** OmniRoute's local-first architecture
- **Enhancement:** 9Router's cloud sync with encryption
- **Result:** Local-first with optional secure cloud sync

### 4.2 Unique Golden Router Features

#### 4.2.1 Unified Dashboard

- Single dashboard combining OmniRoute's provider management with 9Router's analytics
- Real-time cost tracking and savings visualization
- Combo builder with live preview

#### 4.2.2 Advanced Analytics

- OmniRoute's resilience metrics + 9Router's usage analytics
- Token savings breakdown by compression type
- Provider performance comparison
- Cost optimization recommendations

#### 4.2.3 Enhanced Cloud Sync

- OmniRoute's backup system + 9Router's cloud sync
- Sync combos, providers, settings, and analytics
- Conflict resolution for multi-device usage

#### 4.2.4 Smart Presets

- Pre-configured combos for common use cases:
  - "Free-Only Coding" - Zero cost setup
  - "Maximize Subscription" - Use subscription fully before fallback
  - "24/7 Coding" - Never hit limits
  - "Cost-Optimized" - Minimize spending
  - "Performance-First" - Fastest response times

---

## 5. Use Cases

### 5.1 Primary Use Case: Coding Backup Model LLM

**Scenario:** Developer using Claude Code Pro subscription hits quota mid-project

**Flow:**

1. Developer codes with Claude Code Pro (subscription tier)
2. Quota exhausted → G-Router auto-switches to GLM-5.1 ($0.6/1M)
3. GLM quota exhausted → G-Router auto-switches to Kiro AI (FREE Claude unlimited)
4. Developer never stops coding, zero downtime
5. RTK + Caveman compression saves 40-95% tokens throughout
6. Usage analytics show cost savings

### 5.2 Use Case: Zero-Cost AI Coding

**Scenario:** Developer wants free AI coding without subscriptions

**Flow:**

1. Connect Kiro AI (free Claude unlimited) or OpenCode Free (no auth)
2. Set combo to "free-only" preset
3. All requests route through free providers
4. RTK compression reduces token usage
5. Zero cost, unlimited coding

### 5.3 Use Case: Production System Resilience

**Scenario:** Production AI system needs 99.9% uptime

**Flow:**

1. Configure combo with 4-tier fallback
2. Tier 1: Primary subscription (use fully)
3. Tier 2: Secondary subscription (backup)
4. Tier 3: Cheap API key provider
5. Tier 4: Free provider (never fails)
6. Circuit breakers prevent cascading failures
7. Real-time health monitoring
8. Automatic recovery on provider outage

### 5.4 Use Case: Multi-Device Development

**Scenario:** Developer works on laptop, desktop, and mobile

**Flow:**

1. Configure G-Router on primary device
2. Cloud sync providers, combos, settings
3. Access same setup on all devices
4. Usage analytics aggregated across devices
5. Seamless switching between devices

---

## 6. Technical Constraints & Preferences

### 6.1 Tech Stack (Based on Global Rules)

#### 6.1.1 Default Stack

- **Frontend:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4, shadcn/ui
- **Backend:** Supabase (Postgres + Auth + Storage + Functions), Prisma/Drizzle ORM
- **Auth:** Clerk or Supabase Auth
- **Database:** PostgreSQL via Supabase
- **Deployment:** Vercel (frontend), Railway (backend), Cloudflare (edge/DNS)
- **Monitoring:** Sentry + PostHog

#### 6.1.2 Additional Requirements (from source projects)

- **Node.js** - Runtime environment
- **Electron** - Desktop app (optional)
- **Docker** - Containerization
- **Cloudflare Workers** - Edge deployment (optional)

### 6.2 Architecture Considerations

#### 6.2.1 Local-First Architecture

- Primary deployment: Local npm install or Docker
- Optional cloud sync for multi-device support
- No G-Router cloud in request path (privacy)

#### 6.2.2 API Compatibility

- OpenAI-compatible API endpoint (`/v1`)
- Support for multiple format translations
- Backward compatibility with existing tools

#### 6.2.3 Performance Requirements

- Sub-100ms routing decisions
- Minimal latency overhead
- Efficient compression pipeline
- Concurrent request handling

### 6.3 Security Requirements

#### 6.3.1 Data Protection

- AES-256-GCM encryption for credentials
- No telemetry by default (opt-in)
- Local storage of API keys
- Secure OAuth token handling

#### 6.3.2 Network Security

- TLS/HTTPS support
- IP filtering (loopback-only by default)
- Rate limiting
- Circuit breakers for abuse prevention

### 6.4 Deployment Constraints

#### 6.4.1 Cross-Platform Support

- Windows, macOS, Linux
- ARM64 support (Apple Silicon, Raspberry Pi)
- Mobile via Termux (Android)
- PWA for mobile browsers

#### 6.4.2 Installation Methods

- npm global install (primary)
- Docker (secondary)
- Source/Docker for local development
- Desktop app (optional)
- Cloudflare Workers (optional)

---

## 7. Non-Functional Requirements

### 7.1 Performance

- Routing decision < 100ms
- Compression overhead < 50ms
- Support 100+ concurrent requests
- 99.9% uptime for local deployment

### 7.2 Scalability

- Support 177+ providers
- Handle unlimited combos
- Scale to multiple devices via cloud sync
- Efficient resource usage

### 7.3 Usability

- Zero-config for beginners
- Advanced options for power users
- Clear dashboard with real-time metrics
- Comprehensive CLI documentation

### 7.4 Reliability

- Auto-fallback on provider failure
- Circuit breakers prevent cascading failures
- Graceful degradation
- Error recovery mechanisms

### 7.5 Maintainability

- Modular architecture
- Clear separation of concerns
- Comprehensive logging
- Easy provider addition

---

## 8. Success Metrics

### 8.1 User Adoption

- Number of active users
- Number of providers connected per user
- Daily active usage

### 8.2 Performance Metrics

- Average token savings per user
- Uptime percentage
- Routing decision latency
- Compression efficiency

### 8.3 Cost Savings

- Total tokens saved
- Total cost saved for users
- Free provider usage percentage

### 8.4 Reliability Metrics

- Successful request rate
- Fallback trigger rate
- Provider failure rate
- Recovery time

---

## 9. Decisions Made

### 9.1 Integration Approach

- **Decision:** Fork OmniRoute as base (fastest to production)
- **Rationale:** OmniRoute has more complete feature set (177 providers, 14 routing strategies, 60+ CLI commands, MCP/A2A protocols)
- **Action:** Fork OmniRoute repository, integrate 9router's unique features (RTK filters, cloud sync, usage analytics)

### 9.2 Architecture Structure

- **Decision:** Monorepo structure
- **Rationale:** Unified branding as Golden Router, easier to maintain integrated features
- **Action:** Single repository with clear module separation

### 9.3 Branding Strategy

- **Decision:** Full Golden Router branding
- **Rationale:** Clear product identity, GitHub repository as Golden Router
- **Action:** Replace all OmniRoute/9router branding with Golden Router

### 9.4 Feature Prioritization

- **Decision:** Include desktop app and Cloudflare Workers (same as OmniRoute and 9router)
- **Rationale:** Complete feature parity with source projects
- **Action:** Maintain Electron desktop app and Cloudflare Workers deployment options

### 9.5 Tech Stack Decisions

- **Decision:** Use Next.js for dashboard (integrated with CLI)
- **Decision:** Supabase for cloud sync database
- **Decision:** Clerk for cloud sync authentication
- **Rationale:** Align with global rules, proven stack

---

## 10. Next Steps

1. **Architect Phase** - Design system architecture and tech stack decisions
2. **PM Phase** - Create PRD, user stories, and sprint backlog
3. **Dev Phase** - Implement MVP features
4. **QA Phase** - Test and validate implementation

---

**Document Status:** Draft - Ready for Architect Phase  
**Prepared By:** BMAD Analyst  
**Reviewed By:** Pending
