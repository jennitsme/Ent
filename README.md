# ENTITY.OS

Modern agent deployment stack with:
- React 19 + Vite 6 + Tailwind 4 + Framer Motion frontend
- Express backend with Gemini/OpenAI/Claude/Groq providers
- Telegram bridge + cron scheduler
- SQLite persistence (better-sqlite3)
- Authenticated dashboard/API
- CLI: `entity` (init/start/status)

## Install
```bash
npm install
```

## Run (dev)
```bash
npm run dev
```

## CLI (real install)
```bash
npm install -g .
entity init --provider gemini --api-key <KEY> --bot-token <TELEGRAM_BOT_TOKEN> --chat-id <CHAT_ID>
entity start --port 5000
```
The CLI persists config to SQLite (`entity.db`) and returns an auth token. The dashboard/API requires `Authorization: Bearer <token>` after first setup.

## Dashboard
Served from the same server. `/api` endpoints are auth-protected after initial config.

## Security
- Bearer auth on /api/config, /api/status, /api/skills/toggle
- Secrets stored in SQLite; disable unauthenticated writes
