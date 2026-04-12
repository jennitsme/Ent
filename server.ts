import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { store } from './src/server/store';
import { telegramService } from './src/server/services/TelegramService';
import { agentService } from './src/server/services/AgentService';
import { cronService } from './src/server/services/CronService';
import { authGuard } from './src/server/middleware/auth';

export async function buildApp() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.json());

  // API Routes
  app.get('/api/status', authGuard, (req, res) => {
    res.json({
      config: store.getConfig(),
      logs: store.getLogs(),
      skills: store.getSkills(),
      cronJobs: cronService.getJobStatuses(),
    });
  });

  app.post('/api/config', authGuard, (req, res) => {
    const { apiKey, botToken, chatId, provider, authToken } = req.body;
    const updated = store.setConfig({ apiKey, botToken, chatId, provider, authToken });
    
    telegramService.stop();
    telegramService.initialize();
    agentService.initialize();
    cronService.initialize();

    res.json({ success: true, message: 'Configuration saved and services restarted', authToken: updated.authToken });
  });

  app.post('/api/skills/toggle', authGuard, (req, res) => {
    const { id } = req.body;
    const skill = store.toggleSkill(id);
    if (skill) {
      res.json({ success: true, skill });
    } else {
      res.status(404).json({ success: false, message: 'Skill not found' });
    }
  });

  // Initialize services on startup
  telegramService.initialize();
  agentService.initialize();
  cronService.initialize();

  if (process.env.NODE_ENV === 'production') {
    const { default: serveStatic } = await import('serve-static');
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(serveStatic(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return { app, server };
}

if (!process.env.ENTITY_NO_AUTOSTART) {
  buildApp();
}
