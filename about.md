# ENTITY.OS - AI Agent Framework

## Overview
A Next-Gen AI Agent Framework built with React + Express. It provides a dashboard for deploying autonomous agents integrated with Gemini AI, Telegram, and cron-based scheduling.

## Recent Changes
- 2026-02-24: Initial import and Replit environment setup
  - Changed server port from 3000 to 5000
  - Added Vite `allowedHosts: true` for Replit proxy compatibility
  - Added production static file serving in server.ts
  - Configured deployment (autoscale)

## Project Architecture
- **Frontend**: React 19 + Vite + Tailwind CSS 4 + Framer Motion
- **Backend**: Express server (server.ts) with Vite middleware in dev mode
- **AI**: Google Gemini API via `@google/genai`
- **Messaging**: Telegram Bot API via `node-telegram-bot-api`
- **Scheduling**: `node-cron` for cron jobs
- **Data**: JSON file-based store (data.json)

### Key Files
- `server.ts` - Express server entry point (port 5000)
- `src/App.tsx` - Main React app with landing/terminal/dashboard views
- `src/server/store.ts` - JSON file-based data persistence
- `src/server/services/` - AgentService, TelegramService, CronService
- `vite.config.ts` - Vite config with Tailwind and React plugins

### Scripts
- `npm run dev` - Start development server (tsx server.ts)
- `npm run build` - Build frontend with Vite
- `npm run preview` - Preview built frontend

## User Preferences
- (none yet)
