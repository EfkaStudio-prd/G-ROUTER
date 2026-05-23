# G-Router (Golden Router) - Product Requirements Document

**Project Code:** G-Router  
**Version:** 1.0  
**Date:** 2026-05-23  
**Status:** Draft

---

## 1. Product Overview

### 1.1 Product Vision

G-Router adalah All-In-One Best Number 1 Router System yang menggabungkan fitur terbaik dari OmniRoute dan 9router. Produk ini menyediakan satu endpoint terpadu untuk mengakses 177+ provider AI (50+ gratis), dengan routing cerdas, kompresi token, dan cloud sync untuk developer.

### 1.2 Mission Statement

"Never stop coding. Menghilangkan batasan API model AI untuk sistem produksi dengan routing cerdas, kompresi token efisien, dan fallback otomatis ke provider gratis."

### 1.3 Target Market

**Primary:**

- Professional software engineers
- AI-assisted coding enthusiasts (vibe coders)
- DevOps engineers managing production AI systems

**Secondary:**

- AI researchers building applications
- Startups needing cost-effective AI infrastructure
- Enterprise teams requiring AI gateway

### 1.4 Value Proposition

- **Single Endpoint:** Satu endpoint untuk 177+ provider
- **Cost Savings:** 15-95% token savings via RTK + Caveman compression
- **Zero Downtime:** Smart auto-fallback (Subscription → Cheap → Free)
- **Privacy First:** Local-first architecture dengan optional cloud sync
- **Easy Setup:** Zero-config untuk beginners, advanced options untuk power users

---

## 2. Product Goals

### 2.1 Primary Goals (MVP)

1. **Fork & Rebrand:** Fork OmniRoute dan rebrand ke Golden Router
2. **Integrate 9Router Features:** Integrasikan RTK filters, cloud sync enhanced, usage analytics
3. **Cloud Sync:** Implement Supabase + Clerk untuk multi-device sync
4. **Full Feature Parity:** Maintain semua fitur OmniRoute + 9router
5. **Production Ready:** Stable, tested, dan documented

### 2.2 Secondary Goals (Post-MVP)

1. Enhanced RTK filters dengan lebih banyak pattern
2. Advanced analytics dashboard dengan ML insights
3. Skill marketplace untuk custom skills
4. Multi-tenant cloud deployment
5. Enterprise features (SSO, audit logs)

---

## 3. User Personas

### 3.1 Primary Persona: "Devan the Developer"

**Profile:**

- Professional software engineer
- Uses Claude Code / Cursor / Cline daily
- Has subscription to Claude Pro or Codex
- Concerned about quota limits and costs

**Goals:**

- Never hit quota limits mid-coding
- Minimize AI costs
- Easy setup and configuration
- Reliable fallback to free providers

**Pain Points:**

- Quota exhaustion interrupts workflow
- Manual provider switching is tedious
- High token costs for tool outputs (git diff, grep)
- Managing multiple provider dashboards

**How G-Router Helps:**

- Auto-fallback ensures zero downtime
- RTK compression saves 20-40% tokens
- Single dashboard for all providers
- Smart routing optimizes costs

### 3.2 Secondary Persona: "Vina the Vibe Coder"

**Profile:**

- AI-assisted coding enthusiast
- Uses free AI tools primarily
- Tech-savvy but wants easy setup
- Codes across multiple devices

**Goals:**

- Zero-cost AI coding
- Sync setup across devices
- Access to latest models
- Community support

**Pain Points:**

- Free providers have rate limits
- Setup varies per provider
- Device sync is manual
- Limited model selection

**How G-Router Helps:**

- Free provider routing with auto-fallback
- Cloud sync for multi-device setup
- 177+ providers including free tiers
- Active community and documentation

---

## 4. User Stories

### 4.1 Epic 1: Core Routing & Fallback

**US-1.1: As a developer, I want automatic fallback when my subscription quota is exhausted, so I never stop coding.**

**Priority:** P0 (Critical)  
**Story Points:** 8  
**Acceptance Criteria:**

- System detects quota exhaustion (401/429 errors)
- Auto-switches to next provider in combo
- Maintains conversation context across fallback
- Logs fallback events for analytics
- Supports 3-tier fallback (Subscription → Cheap → Free)

**US-1.2: As a developer, I want to create custom combos with multiple models, so I can optimize for cost or performance.**

**Priority:** P0 (Critical)  
**Story Points:** 5  
**Acceptance Criteria:**

- UI for creating/editing combos
- Support for 14 routing strategies
- Preview combo execution plan
- Test combo before saving
- Share combos via cloud sync

**US-1.3: As a developer, I want zero-config auto routing, so I can start coding without setup.**

**Priority:** P0 (Critical)  
**Story Points:** 5  
**Acceptance Criteria:**

- `auto` model works out of the box
- Auto Combo Engine scores providers
- Virtual factory creates ephemeral combos
- Auto prefixes (auto/coding, auto/cheap, auto/fast)
- Fallback to free providers if no paid connections

### 4.2 Epic 2: Token Compression

**US-2.1: As a developer, I want automatic compression of tool outputs, so I save 20-40% tokens.**

**Priority:** P0 (Critical)  
**Story Points:** 8  
**Acceptance Criteria:**

- RTK filters auto-detect tool outputs
- 10 filters: git-diff, git-status, grep, find, ls, tree, dedup-log, smart-truncate, read-numbered, search-list
- Compression only applied if smaller than original
- Fail-safe (return original on error)
- Toggle on/off in dashboard

**US-2.2: As a developer, I want stacked compression (RTK + Caveman), so I save up to 95% tokens.**

**Priority:** P1 (High)  
**Story Points:** 5  
**Acceptance Criteria:**

- Pipeline: RTK → Caveman
- Combined savings calculation
- Preservation engine for code blocks, URLs, JSON
- Configurable compression levels
- Analytics dashboard for savings tracking

**US-2.3: As a developer, I want to see compression analytics, so I know how much I'm saving.**

**Priority:** P1 (High)  
**Story Points:** 3  
**Acceptance Criteria:**

- Dashboard shows compression ratio per request
- Total tokens saved over time
- Breakdown by compression type
- Provider-specific savings
- Export analytics data

### 4.3 Epic 3: Cloud Sync

**US-3.1: As a developer, I want to sync my setup across devices, so I can code anywhere.**

**Priority:** P0 (Critical)  
**Story Points:** 8  
**Acceptance Criteria:**

- Clerk authentication (Sign In / Sign Up)
- Supabase backend for data storage
- Sync providers, combos, settings, API keys
- Encrypted credentials (AES-256-GCM)
- Conflict resolution UI

**US-3.2: As a developer, I want my credentials encrypted in cloud sync, so my data is secure.**

**Priority:** P0 (Critical)  
**Story Points:** 5  
**Acceptance Criteria:**

- AES-256-GCM encryption
- Key derivation from Clerk user ID + device salt
- Credentials never stored in plaintext
- RLS policies in Supabase
- Audit log for sync events

**US-3.3: As a developer, I want to resolve sync conflicts manually, so I don't lose data.**

**Priority:** P1 (High)  
**Story Points:** 3  
**Acceptance Criteria:**

- Conflict detection on sync
- UI showing local vs remote versions
- Manual merge options (keep local, keep remote, merge)
- Version history for conflicts
- Auto-resolve for non-critical data

### 4.4 Epic 4: Provider Management

**US-4.1: As a developer, I want to connect OAuth providers easily, so I can start using them quickly.**

**Priority:** P0 (Critical)  
**Story Points:** 5  
**Acceptance Criteria:**

- OAuth flow for 14 providers (Claude, Codex, Gemini, etc.)
- Auto token refresh
- Quota tracking per provider
- Status indicators (active, expired, error)
- Test connection after setup

**US-4.2: As a developer, I want to add API key providers, so I can use custom endpoints.**

**Priority:** P0 (Critical)  
**Story Points:** 3  
**Acceptance Criteria:**

- UI for adding API keys
- Support for 40+ API key providers
- Encrypted storage
- Test connection
- Multi-account support per provider

**US-4.3: As a developer, I want to see provider health status, so I know which are available.**

**Priority:** P1 (High)  
**Story Points:** 3  
**Acceptance Criteria:**

- Real-time health dashboard
- Circuit breaker status
- Rate limit status
- Quota status
- Latency metrics

### 4.5 Epic 5: Dashboard & UI

**US-5.1: As a developer, I want a clean dashboard to manage everything, so I can configure G-Router easily.**

**Priority:** P0 (Critical)  
**Story Points:** 8  
**Acceptance Criteria:**

- Modern UI with shadcn/ui components
- Responsive design (mobile-friendly)
- Dark mode support
- Multi-language support (30+ locales)
- Accessible (WCAG AA)

**US-5.2: As a developer, I want to see usage analytics, so I can optimize my spending.**

**Priority:** P1 (High)  
**Story Points:** 5  
**Acceptance Criteria:**

- Token usage per provider/model
- Cost estimation
- Monthly spending reports
- Usage trends over time
- Export to CSV

**US-5.3: As a developer, I want CLI tools integration, so I can use G-Router with my favorite AI tools.**

**Priority:** P0 (Critical)  
**Story Points:** 5  
**Acceptance Criteria:**

- Setup guides for Claude Code, Codex, Cursor, Cline
- Auto-detect installed tools
- Generate config files
- Test integration
- Troubleshooting guides

### 4.6 Epic 6: Deployment

**US-6.1: As a developer, I want to install via npm, so I can get started quickly.**

**Priority:** P0 (Critical)  
**Story Points:** 3  
**Acceptance Criteria:**

- `npm install -g golden-router`
- Auto-creates `.env` from `.env.example`
- Starts on port 20128
- Opens dashboard on first run
- System tray integration

**US-6.2: As a developer, I want to run via Docker, so I can deploy easily.**

**Priority:** P1 (High)  
**Story Points:** 3  
**Acceptance Criteria:**

- Multi-stage Dockerfile
- Volume for persistence
- Redis sidecar (optional)
- Docker Compose configuration
- Production-ready configuration

**US-6.3: As a developer, I want a desktop app, so I can run G-Router as an application.**

**Priority:** P1 (High)  
**Story Points:** 5  
**Acceptance Criteria:**

- Electron wrapper (Windows, macOS, Linux)
- Auto-update support
- System tray integration
- Autostart on boot
- Minimize to tray

---

## 5. Functional Requirements

### 5.1 Core Features

**FR-1: Routing System**

- Support 14 routing strategies
- Auto Combo Engine with 9-factor scoring
- Combo management (create, edit, delete, share)
- Multi-tier fallback (Subscription → Cheap → Free)
- Account-level fallback (multi-account per provider)

**FR-2: Compression Pipeline**

- RTK filters for tool outputs (10 filters)
- Caveman compression for general text
- Stacked compression (RTK → Caveman)
- Compression analytics dashboard
- Toggle on/off per combo

**FR-3: Provider Management**

- 177+ provider support
- OAuth for 14 providers
- API key for 40+ providers
- Multi-account per provider
- Auto token refresh

**FR-4: Cloud Sync**

- Clerk authentication
- Supabase backend
- Encrypted credential storage
- Conflict resolution
- Sync providers, combos, settings, API keys

**FR-5: Dashboard**

- Provider management UI
- Combo builder UI
- Usage analytics dashboard
- Compression analytics dashboard
- Health monitoring dashboard

**FR-6: CLI**

- 60+ CLI commands
- Interactive setup wizard
- System diagnostics
- Provider testing
- Configuration management

### 5.2 Non-Functional Requirements

**NFR-1: Performance**

- Routing decision < 100ms
- Compression overhead < 50ms
- Support 100+ concurrent requests
- 99.9% uptime (local)

**NFR-2: Security**

- AES-256-GCM encryption for credentials
- TLS/HTTPS support
- IP filtering (loopback-only by default)
- SSRF guard
- Zero telemetry by default

**NFR-3: Scalability**

- Support 177+ providers
- Handle unlimited combos
- Scale to multiple devices via cloud sync
- Efficient resource usage

**NFR-4: Usability**

- Zero-config for beginners
- Advanced options for power users
- Clear documentation
- Multi-language support (30+ locales)

**NFR-5: Reliability**

- Auto-fallback on provider failure
- Circuit breakers
- Graceful degradation
- Error recovery mechanisms

---

## 6. Technical Requirements

### 6.1 Tech Stack

**Frontend:**

- Next.js 16 (App Router)
- TypeScript strict
- Tailwind CSS 4
- shadcn/ui components
- Lucide icons

**Backend:**

- Node.js >= 22.22.3
- SQLite (better-sqlite3)
- Supabase (Postgres)
- Clerk (Auth)

**Desktop:**

- Electron 41
- electron-builder 26.10

**Testing:**

- Node native test runner
- Vitest
- Playwright

**Deployment:**

- npm global
- Docker
- Vercel (documentation)
- Railway (cloud sync backend)

### 6.2 Architecture

**Monorepo Structure:**

- `src/` - Next.js application
- `open-sse/` - Streaming engine workspace
- `electron/` - Desktop wrapper
- `bin/` - CLI entry points
- `scripts/` - Build scripts
- `docs/` - Documentation

**API Surface:**

- Public API: `/v1/*` (OpenAI-compatible)
- Management API: `/api/*` (dashboard & config)
- Agent Protocols: MCP server, A2A server

**Database:**

- Local: SQLite (providers, combos, settings, usage)
- Cloud: Supabase (users, sync_data, sync_conflicts)

---

## 7. Success Metrics

### 7.1 Adoption Metrics

- Number of active users (target: 1,000 in 3 months)
- Number of providers connected per user (target: 3+ average)
- Daily active usage (target: 50% DAU/MAU)
- Cloud sync adoption rate (target: 30%)

### 7.2 Performance Metrics

- Average token savings per user (target: 40%+)
- Uptime percentage (target: 99.9%)
- Routing decision latency (target: < 100ms)
- Compression efficiency (target: 78.4-94.6%)

### 7.3 Cost Metrics

- Total tokens saved (target: 1M+ in 3 months)
- Total cost saved for users (target: $10K+ in 3 months)
- Free provider usage percentage (target: 60%+)
- Cloud sync costs (target: <$100/month)

### 7.4 Quality Metrics

- Successful request rate (target: 99%+)
- Fallback trigger rate (target: < 5%)
- Provider failure rate (target: < 1%)
- Recovery time (target: < 1s)

---

## 8. Risks & Mitigations

### 8.1 Technical Risks

**Risk:** Provider API changes break integration
**Mitigation:** Versioned executors, adapter pattern, regular testing, provider monitoring

**Risk:** Cloud sync conflicts cause data loss
**Mitigation:** Conflict resolution UI, manual merge, versioning, backup before sync

**Risk:** Performance degradation with many providers
**Mitigation:** Caching, connection pooling, circuit breakers, load testing

### 8.2 Security Risks

**Risk:** Credential exposure in cloud sync
**Mitigation:** AES-256-GCM encryption, key derivation, RLS policies, audit logging

**Risk:** SSRF attacks via provider calls
**Mitigation:** Outbound URL guard, private IP blocking, request validation

**Risk:** Rate limiting abuse
**Mitigation:** Per-account rate limits, IP filtering, anomaly detection

### 8.3 Operational Risks

**Risk:** Database corruption
**Mitigation:** WAL journaling, backups, migration testing, recovery procedures

**Risk:** Dependency vulnerabilities
**Mitigation:** Regular audits, automated updates, SBOM, security scanning

**Risk:** Deployment failures
**Mitigation:** Staged rollouts, rollback procedures, monitoring, alerting

---

## 9. Go-to-Market Strategy

### 9.1 Launch Strategy

**Phase 1: Beta (Week 1-2)**

- Private beta with 50 users
- Gather feedback on core features
- Fix critical bugs
- Optimize performance

**Phase 2: Public Beta (Week 3-4)**

- Public beta launch
- Documentation completion
- Community building (Discord, GitHub)
- Feature parity validation

**Phase 3: MVP Launch (Week 5-6)**

- Official MVP launch
- npm publish
- GitHub release
- Blog post and social media

**Phase 4: Post-Launch (Week 7+)**

- Gather user feedback
- Iterate on features
- Add secondary goals
- Enterprise outreach

### 9.2 Marketing Channels

- **GitHub:** Open source repository, stars, forks
- **Twitter/X:** Developer community engagement
- **Reddit:** r/LocalLLaMA, r/programming, r/devtools
- **Discord:** Community server for support
- **Blog:** Technical blog posts, tutorials
- **YouTube:** Video tutorials, demos

### 9.3 Pricing Strategy

**MVP:** Free and open source (MIT license)

**Post-MVP (Optional):**

- Free tier: Local-only, basic features
- Pro tier: Cloud sync, advanced analytics ($5/month)
- Enterprise tier: SSO, audit logs, support (custom pricing)

---

## 10. Roadmap

### 10.1 MVP (Weeks 1-6)

**Week 1-2: Foundation**

- Fork OmniRoute repository
- Rebrand to Golden Router
- Setup development environment
- Create project structure

**Week 3-4: Core Features**

- Integrate RTK filters
- Implement cloud sync (Supabase + Clerk)
- Update dashboard UI
- Add usage analytics

**Week 5-6: Testing & Launch**

- Comprehensive testing
- Documentation completion
- Beta testing
- MVP launch

### 10.2 Post-MVP (Months 2-3)

**Enhanced Features:**

- Advanced RTK filters
- ML-powered combo optimization
- Skill marketplace
- Custom compression pipelines

**Platform Improvements:**

- Mobile PWA improvements
- Desktop app enhancements
- Cloudflare Workers deployment
- Multi-tenant cloud deployment

### 10.3 Long-term (Months 4+)

**Enterprise Features:**

- SSO integration
- Advanced audit logs
- Role-based access control
- SLA guarantees

**Ecosystem:**

- Plugin system
- Third-party integrations
- API for extensions
- Partner program

---

## 11. Dependencies

### 11.1 External Dependencies

- **OmniRoute:** Base codebase (MIT license)
- **9router:** RTK filters, cloud sync logic (MIT license)
- **Supabase:** Cloud backend (free tier available)
- **Clerk:** Authentication (free tier available)
- **Next.js:** Web framework (MIT license)
- **Electron:** Desktop wrapper (MIT license)

### 11.2 Internal Dependencies

- Development team availability
- Code review process
- Testing infrastructure
- Documentation resources
- Community management

---

## 12. Assumptions

### 12.1 Technical Assumptions

- OmniRoute codebase is stable and well-documented
- Supabase free tier is sufficient for initial users
- Clerk free tier supports required auth features
- Node.js 22+ is available on target systems
- SQLite performance is adequate for local storage

### 12.2 Market Assumptions

- There is demand for unified AI gateway
- Developers are willing to try new tools
- Cost savings is a strong motivator
- Privacy-first approach resonates with users
- Open source model drives adoption

### 12.3 Resource Assumptions

- Sufficient development time (6 weeks for MVP)
- Access to required tools and services
- Community support for open source
- Marketing budget is minimal (bootstrapped)

---

## 13. Constraints

### 13.1 Technical Constraints

- Must maintain compatibility with OmniRoute API
- Must support 177+ providers
- Must work offline (local-first)
- Must be cross-platform (Windows, macOS, Linux)
- Must respect MIT license requirements

### 13.2 Time Constraints

- MVP target: 6 weeks
- Beta launch: Week 4
- Public launch: Week 6
- Post-MVP iteration: Ongoing

### 13.3 Resource Constraints

- Limited development team
- Minimal marketing budget
- Bootstrapped project
- Community-driven support

---

## 14. Open Questions

### 14.1 Technical

- Should we use Turborepo for monorepo management?
- How to handle provider catalog updates?
- What's the best strategy for conflict resolution?
- How to optimize SQLite for large datasets?

### 14.2 Product

- What's the optimal pricing strategy for post-MVP?
- Which enterprise features to prioritize?
- How to measure success beyond metrics?
- What's the best community engagement strategy?

### 14.3 Business

- Should we form a company around G-Router?
- How to monetize without alienating open source users?
- What's the best go-to-market strategy?
- How to compete with existing solutions?

---

**Document Status:** Draft - Ready for Sprint Planning  
**Prepared By:** BMAD PM  
**Reviewed By:** Pending
