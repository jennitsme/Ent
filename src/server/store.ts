import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'data.json');

export interface AppConfig {
  apiKey: string;
  botToken: string;
  chatId: string;
  provider: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
}

interface StoreData {
  config: AppConfig;
  logs: LogEntry[];
  skills: { id: string; status: 'active' | 'inactive' }[];
}

const defaultData: StoreData = {
  config: { apiKey: '', botToken: '', chatId: '', provider: 'gemini' },
  logs: [],
  skills: [
    { id: 'web-search', status: 'active' },
    { id: 'code-interpreter', status: 'active' },
    { id: 'image-gen', status: 'inactive' },
    { id: 'telegram-handler', status: 'active' },
  ],
};

class Store {
  private data: StoreData;

  constructor() {
    this.data = { ...defaultData };
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = { ...defaultData, ...JSON.parse(fileContent) };
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  private save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  getConfig() {
    return this.data.config;
  }

  setConfig(config: AppConfig) {
    this.data.config = config;
    this.save();
  }

  getLogs() {
    return this.data.logs;
  }

  addLog(message: string, type: LogEntry['type'] = 'info') {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    this.data.logs = [entry, ...this.data.logs].slice(0, 50); // Keep last 50 logs
    this.save();
  }

  getSkills() {
    return this.data.skills;
  }

  toggleSkill(id: string) {
    const skill = this.data.skills.find((s) => s.id === id);
    if (skill) {
      skill.status = skill.status === 'active' ? 'inactive' : 'active';
      this.save();
      return skill;
    }
    return null;
  }
}

export const store = new Store();
