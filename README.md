<p align="center">
  <img src="./public/logo.png" alt="ENTITY" width="140" />
</p>

<h1 align="center">ENTITY</h1>

<p align="center">
  <strong>Deploy autonomous AI agents with a cinematic operator experience.</strong>
</p>

<p align="center">
  ENTITY combines a polished landing experience, a brutal terminal-style onboarding flow, broad AI provider coverage, Telegram integration, scheduled jobs, and a live control dashboard in one full-stack product.
</p>

<p align="center">
  <a href="https://github.com/YourEntity/Entity"><img src="https://img.shields.io/badge/GitHub-YourEntity%2FEntity-0f1115?style=for-the-badge&logo=github" alt="GitHub"></a>
  <img src="https://img.shields.io/badge/Frontend-React%2019-0f1115?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Bundler-Vite%206-0f1115?style=for-the-badge&logo=vite" alt="Vite 6">
  <img src="https://img.shields.io/badge/Backend-Express-0f1115?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/Runtime-Node.js-0f1115?style=for-the-badge&logo=node.js" alt="Node.js">
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#ai-integrations">AI Integrations</a> ·
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Overview

**ENTITY** is an AI agent framework with a stronger product surface than a typical chat demo.

Instead of dropping users straight into a bland settings page, ENTITY presents deployment like an actual operator workflow:
- initialize the system,
- run through a cinematic terminal install sequence,
- configure provider and Telegram credentials,
- save runtime state,
- then manage the agent from a live dashboard.

It is built for people who want their AI product to feel like infrastructure, not a toy.

---

## AI Integrations

ENTITY now supports a broader provider layer so the runtime is not limited to only the most common model vendors.

### Currently wired in

<table>
  <tr>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/google" alt="Google" height="28"><br />
      <strong>Gemini</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/openai" alt="OpenAI" height="28"><br />
      <strong>OpenAI</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/anthropic" alt="Anthropic" height="28"><br />
      <strong>Anthropic</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/groq" alt="Groq" height="28"><br />
      <strong>Groq</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/x" alt="xAI" height="28"><br />
      <strong>xAI</strong>
    </td>
  </tr>
  <tr>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/openrouter" alt="OpenRouter" height="28"><br />
      <strong>OpenRouter</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/deepseek" alt="DeepSeek" height="28"><br />
      <strong>DeepSeek</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/mistralai" alt="Mistral AI" height="28"><br />
      <strong>Mistral AI</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/perplexity" alt="Perplexity" height="28"><br />
      <strong>Perplexity</strong>
    </td>
    <td align="center" width="20%">
      <img src="https://cdn.simpleicons.org/databricks" alt="Together / Fireworks" height="28"><br />
      <strong>Together / Fireworks</strong>
    </td>
  </tr>
</table>

### Provider support model

ENTITY currently uses two integration paths:

1. **Native Gemini path**
   - Google Gemini via `@google/genai`

2. **OpenAI-compatible path**
   - OpenAI
   - Groq
   - xAI
   - OpenRouter
   - DeepSeek
   - Mistral AI
   - Together AI
   - Fireworks AI
   - Perplexity

That means expanding provider coverage is fast as long as the vendor exposes an OpenAI-compatible API surface.

### Current provider list in setup flow

- Google Gemini
- OpenAI
- Anthropic Claude
- Groq
- xAI (Grok)
- OpenRouter
- DeepSeek
- Mistral AI
- Together AI
- Fireworks AI
- Perplexity

> Note: Anthropic is listed in the setup flow for product completeness, but the current backend path is optimized around Gemini-native plus OpenAI-compatible providers. If you want fully native Anthropic support next, that should be a dedicated follow-up implementation.

---

## Why ENTITY

Most AI projects stop at one of these two states:
- a nice UI with no operational depth, or
- a capable backend with no product feel.

ENTITY is trying to bridge both.

It gives you:
- a visually distinctive frontend,
- a guided onboarding flow,
- a real backend runtime,
- broad multi-model provider support,
- messaging integration,
- scheduled execution,
- and a structure that can grow into a more serious deployment platform.

---

## Features

### AI platform layer
- native Google Gemini integration
- OpenAI-compatible provider routing
- multi-provider setup flow from the terminal UI
- provider-aware API key validation
- model/provider switching through persisted config

### Supported providers
- Google Gemini
- OpenAI
- Anthropic Claude
- Groq
- xAI
- OpenRouter
- DeepSeek
- Mistral AI
- Together AI
- Fireworks AI
- Perplexity

### Product experience
- cinematic landing page
- immersive terminal onboarding
- brutalized realistic install simulation
- cyber-ops visual language
- dashboard-driven system control

### Agent operations
- Telegram bot connection flow
- provider credential setup
- runtime configuration persistence
- cron job visibility
- skill toggling
- live status/log surfaces

### Backend capabilities
- Express API
- auth-protected management endpoints
- CLI entrypoint for initialization and runtime control
- local persistence layer
- modular path toward deployment hardening

---

## Product flow

```text
Landing Page
   ↓
Initialize System
   ↓
Terminal Installer
   ↓
Select Provider
   ↓
Enter API Key + Telegram Credentials
   ↓
Persist Config to Backend
   ↓
Open Dashboard
   ↓
Operate Agent Runtime
```

---

## Architecture

```text
┌────────────────────────────────────────────────────┐
│                    FRONTEND                        │
│  Landing Page  →  Terminal Setup  →  Dashboard    │
└────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│                     BACKEND                        │
│      Express API + Auth + Runtime Services         │
└────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼────────────────┬───────────────┐
         ▼               ▼                ▼               ▼
   AI Providers      Telegram Bot      Scheduler      Local Store
 Gemini / OpenAI     Integration       Cron Jobs      Config/State
 Compatible APIs
```

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
- `@google/genai`
- `openai`
- `node-telegram-bot-api`

---

## Quick start

### Clone

```bash
git clone https://github.com/YourEntity/Entity.git
cd Entity
```

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## CLI usage

ENTITY includes a CLI for initialization and runtime control.

### Show help

```bash
npm run entity -- --help
```

### Install CLI globally from source

```bash
npm install -g .
```

### Initialize the agent

```bash
entity init \
  --provider openrouter \
  --api-key <KEY> \
  --bot-token <TELEGRAM_BOT_TOKEN> \
  --chat-id <CHAT_ID>
```

### Supported provider flags

```text
gemini
openai
anthropic
groq
xai
openrouter
deepseek
mistral
together
fireworks
perplexity
```

### Start runtime

```bash
entity start --port 5000
```

### Check config status

```bash
entity status
```

---

## Scripts

```bash
npm run dev       # start development runtime
npm run build     # production build
npm run preview   # preview built frontend
npm run lint      # type-check project
npm run clean     # remove dist
npm run start     # start CLI runtime
npm run entity    # invoke CLI manually
```

---

## Project structure

```text
Entity/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Terminal.tsx
│   │   └── GlitchText.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── server/
│   │   ├── db.ts
│   │   ├── store.ts
│   │   └── services/
│   │       ├── AgentService.ts
│   │       ├── CronService.ts
│   │       └── TelegramService.ts
│   ├── App.tsx
│   └── main.tsx
├── cli.ts
├── server.ts
├── package.json
└── README.md
```

---

## Configuration and security

ENTITY currently supports a guided setup flow for:
- provider selection,
- API key capture,
- Telegram bot token setup,
- Telegram chat ID setup,
- auth token generation,
- server-side config persistence.

### Protected endpoints
- `/api/config`
- `/api/status`
- `/api/skills/toggle`

### Security notes
Before a full public production rollout, this repo should still add:
- hardened environment variable handling,
- secret management strategy,
- token lifecycle controls,
- rate limiting,
- webhook validation,
- audit/logging policy,
- deployment-specific hardening.

---

## Deployment

You mentioned the app will be redeployed later through the **official Entity GitHub account** and then pushed through **Vercel**. That makes sense.

For now, the GitHub side is the priority, so this repo is being cleaned up first as the canonical source.

### Recommended deployment checklist
- keep `YourEntity/Entity` as the source of truth,
- define production environment variables clearly,
- separate public frontend concerns from private runtime secrets,
- document Telegram runtime behavior,
- document provider setup per environment,
- add CI before wider rollout.

### Suggested next deployment docs to add
- `DEPLOYMENT.md`
- `ENVIRONMENT.md`
- `SECURITY.md`
- `CONTRIBUTING.md`

---

## Roadmap

### Repository polish
- [x] move to official GitHub account
- [x] switch in-app GitHub links to official repo
- [x] rewrite README with stronger structure
- [x] upgrade README to a more premium presentation
- [x] expand README provider coverage
- [ ] add README banner
- [ ] add screenshots
- [ ] add social preview image
- [ ] normalize product naming everywhere

### Product evolution
- [x] immersive install simulation
- [x] more brutal terminal output
- [x] broader AI provider selection
- [ ] native Anthropic implementation
- [ ] richer setup states and validation UX
- [ ] provider health visibility
- [ ] deeper dashboard telemetry
- [ ] production deployment presets

### Engineering maturity
- [ ] CI pipeline
- [ ] release/version strategy
- [ ] test coverage
- [ ] API docs
- [ ] deployment docs
- [ ] security review

---

## Official links

- Repository: https://github.com/YourEntity/Entity
- GitHub owner: https://github.com/YourEntity

---

## License

No public license is currently defined.

Until a license is added, assume **all rights reserved by default**.
