import TelegramBot from 'node-telegram-bot-api';
import { store } from '../store';
import { agentService } from './AgentService';

class TelegramService {
  private bot: TelegramBot | null = null;
  private isPolling = false;

  initialize() {
    const config = store.getConfig();
    if (config.botToken && !this.bot) {
      try {
        this.bot = new TelegramBot(config.botToken, { polling: true });
        this.isPolling = true;
        store.addLog('Telegram Bot initialized and polling started', 'success');
        
        this.setupListeners();
      } catch (error) {
        store.addLog(`Failed to initialize Telegram Bot: ${error}`, 'error');
      }
    }
  }

  private setupListeners() {
    if (!this.bot) return;

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      const config = store.getConfig();

      // Only respond to the configured chat ID for security
      if (config.chatId && chatId.toString() !== config.chatId) {
        store.addLog(`Ignored message from unauthorized chat: ${chatId}`, 'warning');
        return;
      }

      if (!text) return;

      store.addLog(`Received message: "${text}"`, 'info');

      // Process with Agent
      const skills = store.getSkills();
      const telegramHandlerActive = skills.find(s => s.id === 'telegram-handler')?.status === 'active';

      if (telegramHandlerActive) {
        this.bot?.sendChatAction(chatId, 'typing');
        const response = await agentService.generateResponse(text);
        this.bot?.sendMessage(chatId, response);
        store.addLog(`Sent response: "${response.substring(0, 50)}..."`, 'success');
      } else {
        store.addLog('Telegram Handler skill is disabled. Ignoring message.', 'warning');
      }
    });

    this.bot.on('polling_error', (error) => {
      // Suppress polling errors in logs to avoid spam, but log critical ones
      if (!error.message.includes('ETELEGRAM: 409 Conflict')) {
         console.error(error);
      }
    });
  }

  async sendMessage(message: string) {
    const config = store.getConfig();
    if (this.bot && config.chatId) {
      try {
        await this.bot.sendMessage(config.chatId, message);
        store.addLog(`Sent manual message: "${message}"`, 'success');
      } catch (error) {
        store.addLog(`Failed to send message: ${error}`, 'error');
      }
    } else {
      store.addLog('Cannot send message: Bot not initialized or Chat ID missing', 'error');
    }
  }

  stop() {
    if (this.bot && this.isPolling) {
      this.bot.stopPolling();
      this.isPolling = false;
      this.bot = null;
      store.addLog('Telegram Bot stopped', 'info');
    }
  }
}

export const telegramService = new TelegramService();
