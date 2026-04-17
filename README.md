<p align="center">
  <img src="./public/logo.png" alt="ENTITY" width="140" />
</p>

<h1 align="center">ENTITY</h1>

<p align="center">
  <strong>Deploy autonomous AI agents with a cinematic operator experience.</strong>
</p>

<p align="center">
  ENTITY combines a polished landing experience, a brutal terminal-style onboarding flow, multi-provider LLM support, Telegram integration, scheduled jobs, and a live control dashboard in one full-stack product.
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
  <a href="#showcase">Showcase</a> ·
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

## Showcase

### Visual identity

<p align="center">
  <img src="./public/logo.png" alt="ENTITY logo" width="120" />
</p>

### Experience pillars

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>Terminal-first onboarding</h3>
      <p>Setup feels like deploying a live system, with staged install logs, provider selection, and guided runtime activation.</p>
    </td>
    <td width="33%" valign="top">
      <h3>Operator dashboard</h3>
      <p>Monitor skills, logs, scheduled jobs, and active runtime state from a single command-center style interface.</p>
    </td>
    <td width="33%" valign="top">
      <h3>Real integrations</h3>
      <p>Hook the agent into Gemini, OpenAI, Claude, Groq, Telegram, and scheduled automation instead of keeping it trapped in a mock UI.</p>
    </td>
  </tr>
</table>

### Suggested future media

If you want this repo to look even more premium, these are the next best assets to add:
- hero banner image for the top of the README,
- landing page screenshot,
- terminal onboarding screenshot,
- dashboard screenshot,
- Open Graph / social preview image for GitHub sharing.

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
- multi-model provider support,
- messaging integration,
- scheduled execution,
- and a structure that can grow into a more serious deployment platform.

---

## Features

### AI providers
- Google Gemini
- OpenAI
- Anthropic Claude
- Groq

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
Terminal Installer Simulation
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
 Gemini/OpenAI/      Integration       Cron Jobs      Config/State
 Claude/Groq
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
  --provider gemini \
  --api-key <KEY> \
  --bot-token <TELEGRAM_BOT_TOKEN> \
  --chat-id <CHAT_ID>
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
│   │   └── store.ts
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

## Branding direction

ENTITY currently uses a strong sci-fi / cyber-ops presentation style.

That works well for:
- launch videos,
- landing pages,
- GitHub profile presentation,
- product screenshots,
- and “operator tool” positioning.

To make the brand more cohesive, the next cleanup pass should standardize naming across:
- `ENTITY`
- `Entity`
- `ENTITY.OS`

Right now the repo is close, but not fully normalized yet.

---

## Roadmap

### Repository polish
- [x] move to official GitHub account
- [x] switch in-app GitHub links to official repo
- [x] rewrite README with stronger structure
- [x] upgrade README to a more premium presentation
- [ ] add README banner
- [ ] add screenshots
- [ ] add social preview image
- [ ] normalize product naming everywhere

### Product evolution
- [x] immersive install simulation
- [x] more brutal terminal output
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

## Contributing

Contribution flow has not been formalized yet.

Once the repo structure and deployment posture are fully stabilized, the next good step is adding:
- issue templates,
- pull request templates,
- contribution guidelines,
- release notes workflow.

---

## License

No public license is currently defined.

Until a license is added, assume **all rights reserved by default**.
