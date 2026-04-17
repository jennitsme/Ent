# ENTITY

<p align="center">
  <img src="./public/logo.png" alt="ENTITY logo" width="160">
</p>

<p align="center">
  <strong>Autonomous AI agent framework for operators, builders, and product teams.</strong>
</p>

<p align="center">
  Deploy an AI agent with a cinematic terminal onboarding flow, multi-provider model support, Telegram integration, scheduled jobs, and a live dashboard.
</p>

<p align="center">
  <a href="https://github.com/YourEntity/Entity"><img src="https://img.shields.io/badge/GitHub-YourEntity%2FEntity-111827?style=for-the-badge&logo=github" alt="GitHub"></a>
  <img src="https://img.shields.io/badge/React-19-111827?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-6-111827?style=for-the-badge&logo=vite" alt="Vite 6">
  <img src="https://img.shields.io/badge/Express-4-111827?style=for-the-badge&logo=express" alt="Express 4">
  <img src="https://img.shields.io/badge/License-Private-111827?style=for-the-badge" alt="Private">
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Overview

**ENTITY** is a full-stack AI agent platform designed to feel operational, fast, and production-oriented from the first interaction.

It combines:
- a polished React frontend,
- an Express-based backend,
- multi-provider LLM support,
- Telegram bot connectivity,
- cron-style scheduled execution,
- and a terminal-inspired onboarding experience that makes setup feel like a real agent deployment sequence.

The goal is simple: make AI agent deployment feel like launching infrastructure, not filling out a boring form.

---

## Why ENTITY

Most AI demos stop at chat.

ENTITY is built to go further:
- **configure real provider credentials**,
- **connect to Telegram**,
- **run scheduled tasks**,
- **toggle agent capabilities**,
- **persist state**,
- **and present the whole system like an actual command center**.

It is opinionated toward a more cinematic, high-control operator experience.

---

## Features

### Core platform
- Multi-provider AI support:
  - Google Gemini
  - OpenAI
  - Anthropic Claude
  - Groq
- Terminal-based onboarding and configuration flow
- Live dashboard for status, logs, skills, and cron jobs
- Authenticated backend API
- Local persistence for config and runtime state

### Agent operations
- Telegram bot integration
- Scheduled tasks with cron
- Skill toggling from dashboard
- Runtime logs and system visibility
- Bearer-token protected management endpoints

### Product experience
- High-polish landing page
- Cyber/ops aesthetic UI
- “Realistic install” simulation for more immersive onboarding
- Production-style framing for AI deployment workflows

---

## Product flow

```text
Landing Page
   ↓
Terminal Installer Simulation
   ↓
Provider Selection
   ↓
API Key + Telegram Config
   ↓
Server-side Config Save
   ↓
Dashboard Access
   ↓
Agent Operations / Skills / Cron
```

---

## Screens and system layers

```text
┌──────────────────────────────────────────────┐
│                  FRONTEND                    │
│  Landing Page → Terminal → Dashboard         │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│                   BACKEND                    │
│   Express API + Auth + Runtime Services      │
└──────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   AI Providers   Telegram     Scheduler
  Gemini/OpenAI    Bot API      Cron Jobs
 Claude/Groq
                     │
                     ▼
┌──────────────────────────────────────────────┐
│                PERSISTENCE                    │
│         Local config / state storage          │
└──────────────────────────────────────────────┘
```

---

## Tech stack

### Frontend
- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- Lucide React

### Backend
- Express
- TypeScript
- Commander CLI
- Node Cron
- Better SQLite3

### Integrations
- Google Gemini via `@google/genai`
- OpenAI via `openai`
- Telegram via `node-telegram-bot-api`

---

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/YourEntity/Entity.git
cd Entity
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development

```bash
npm run dev
```

By default, the app runs through the local dev server and serves the frontend plus backend runtime.

---

## CLI usage

ENTITY ships with a CLI entrypoint for initialization and runtime control.

### Local CLI

```bash
npm run entity -- --help
```

### Install CLI globally from source

```bash
npm install -g .
```

### Initialize an agent

```bash
entity init \
  --provider gemini \
  --api-key <KEY> \
  --bot-token <TELEGRAM_BOT_TOKEN> \
  --chat-id <CHAT_ID>
```

### Start the server

```bash
entity start --port 5000
```

### Check config status

```bash
entity status
```

---

## Available scripts

```bash
npm run dev       # start dev server
npm run build     # build frontend for production
npm run preview   # preview production build
npm run lint      # type-check project
npm run clean     # remove dist
npm run start     # start CLI runtime
npm run entity    # invoke CLI manually
```

---

## Configuration flow

ENTITY currently guides the operator through:

1. selecting an AI provider,
2. entering the provider API key,
3. entering the Telegram bot token,
4. entering the Telegram chat ID,
5. storing config on the backend,
6. issuing auth-protected dashboard access.

This creates a much more “deployment-like” setup path than a static settings page.

---

## Security

Current security model includes:
- Bearer-token protection for management endpoints
- auth token generation during initialization
- provider key storage behind backend-managed config flow
- protected dashboard API access after initial setup

Protected endpoints include:
- `/api/config`
- `/api/status`
- `/api/skills/toggle`

### Important note
This project is still evolving. Before public production deployment, it should go through:
- secret handling review,
- environment variable hardening,
- token lifecycle review,
- rate limiting,
- webhook validation,
- and deployment posture checks.

---

## Architecture

### Frontend responsibilities
- landing page and product presentation
- terminal onboarding simulation
- provider selection flow
- dashboard rendering
- visual status/log presentation

### Backend responsibilities
- API endpoints
- runtime bootstrapping
- provider configuration storage
- Telegram service integration
- scheduler management
- auth enforcement

---

## Project structure

```text
Entity/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── Terminal.tsx
│   │   └── Dashboard.tsx
│   ├── server/
│   │   ├── db.ts
│   │   └── store.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── cli.ts
├── server.ts
├── package.json
├── public/
│   └── logo.png
└── README.md
```

---

## Design direction

ENTITY aims for a product feel somewhere between:
- command center,
- AI operations console,
- deployment terminal,
- and cyberpunk product launch surface.

That means the UX is intentionally more dramatic, more tactile, and more alive than a typical admin dashboard.

---

## Current status

Current repo already includes:
- official GitHub home under `YourEntity/Entity`
- branded landing page links pointing to the official repo
- enhanced terminal installer simulation
- dashboard and setup flow

Recommended next improvements:
- official social links
- README media assets and screenshots
- proper environment variable strategy
- deployment docs for Vercel
- GitHub Actions CI
- release/versioning plan

---

## Roadmap

### Branding and repo
- [x] move project to official GitHub account
- [x] update in-app GitHub links
- [x] rewrite README with stronger structure
- [ ] add screenshots / banner / social preview assets
- [ ] standardize naming between `ENTITY`, `Entity`, and `ENTITY.OS`

### Product
- [x] realistic installer simulation
- [ ] richer onboarding states
- [ ] environment-based production config
- [ ] better secret management
- [ ] provider health checks
- [ ] deployment presets

### Engineering
- [ ] CI pipeline
- [ ] test coverage
- [ ] lint/format enforcement
- [ ] API docs
- [ ] release automation

---

## Deployment notes

For now, the project is best treated as a source-driven app.

When redeploying on Vercel or another platform, recommended next steps are:
- separate server/runtime concerns clearly,
- define production env vars,
- document provider secrets,
- document Telegram webhook/runtime expectations,
- and pin the deployment flow in the repo.

---

## Official links

- GitHub: https://github.com/YourEntity/Entity
- Owner: https://github.com/YourEntity

---

## Contributing

This repository is currently being shaped as the official home of ENTITY.

Contribution guidelines, issue templates, and release workflows can be added once the core branding and deployment posture are finalized.

---

## License

No public license has been defined yet.

Until a license is added, treat the repository as **all rights reserved by default**.
