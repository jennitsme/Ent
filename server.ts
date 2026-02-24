import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { store } from './src/server/store';
import { telegramService } from './src/server/services/TelegramService';
import { agentService } from './src/server/services/AgentService';
import { cronService } from './src/server/services/CronService';

async function startServer() {
  const app = express();
  const PORT = 5000;

  app.use(express.json());

  // API Routes
  app.get('/api/status', (req, res) => {
    res.json({
      config: store.getConfig(),
      logs: store.getLogs(),
      skills: store.getSkills(),
      cronJobs: cronService.getJobStatuses(),
    });
  });

  app.post('/api/config', (req, res) => {
    const { apiKey, botToken, chatId, provider } = req.body;
    store.setConfig({ apiKey, botToken, chatId, provider });
    
    // Re-initialize services with new config
    telegramService.stop();
    telegramService.initialize();
    agentService.initialize();
    cronService.initialize();

    res.json({ success: true, message: 'Configuration saved and services restarted' });
  });

  app.post('/api/skills/toggle', (req, res) => {
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
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
