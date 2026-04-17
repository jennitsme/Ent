#!/usr/bin/env node
import { program } from 'commander';
import { buildApp } from './server.js';
import { store } from './src/server/store.js';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));

program
  .name('entity')
  .description('ENTITY.OS CLI - deploy and manage the Entity AI agent')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize configuration interactively')
  .requiredOption('--provider <provider>', 'gemini|openai|anthropic|groq|xai|openrouter|deepseek|mistral|together|fireworks|perplexity', 'gemini')
  .requiredOption('--api-key <key>', 'API key for the provider')
  .requiredOption('--bot-token <token>', 'Telegram bot token')
  .requiredOption('--chat-id <chatId>', 'Telegram chat id')
  .option('--auth-token <token>', 'Bearer token for dashboard/API auth')
  .action((opts) => {
    const token = opts.authToken || randomUUID();
    const config = store.setConfig({
      apiKey: opts.apiKey,
      botToken: opts.botToken,
      chatId: opts.chatId,
      provider: opts.provider,
      authToken: token,
    });
    console.log('Config saved. Auth token:', config.authToken);
  });

program
  .command('start')
  .description('Start Entity.OS server')
  .option('-p, --port <port>', 'Port', process.env.PORT || '5000')
  .action(async (opts) => {
    process.env.PORT = opts.port;
    await buildApp();
  });

program
  .command('status')
  .description('Show current config status (without secrets)')
  .action(() => {
    const cfg = store.getConfig();
    console.log({ provider: cfg.provider, chatId: cfg.chatId, authTokenSet: !!cfg.authToken, apiKeySet: !!cfg.apiKey, botTokenSet: !!cfg.botToken });
  });

program.parseAsync(process.argv);
