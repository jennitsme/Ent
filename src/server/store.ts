import { randomUUID } from 'crypto';
import { db } from './db';

export interface AppConfig {
  apiKey: string;
  botToken: string;
  chatId: string;
  provider: string;
  authToken: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
}

interface SkillRecord {
  id: string;
  status: 'active' | 'inactive';
}

class Store {
  getConfig(): AppConfig {
    const row = db.prepare('SELECT apiKey, botToken, chatId, provider, authToken FROM config WHERE id = 1').get();
    return row as AppConfig;
  }

  setConfig(config: Partial<AppConfig>) {
    const existing = this.getConfig();
    const authToken = config.authToken || existing.authToken || randomUUID();
    db.prepare(
      `UPDATE config SET apiKey = @apiKey, botToken = @botToken, chatId = @chatId, provider = @provider, authToken = @authToken WHERE id = 1`
    ).run({
      apiKey: config.apiKey ?? existing.apiKey,
      botToken: config.botToken ?? existing.botToken,
      chatId: config.chatId ?? existing.chatId,
      provider: config.provider ?? existing.provider,
      authToken,
    });
    return this.getConfig();
  }

  getLogs(limit = 50): LogEntry[] {
    return db
      .prepare('SELECT timestamp, message, type FROM logs ORDER BY id DESC LIMIT ?')
      .all(limit) as LogEntry[];
  }

  addLog(message: string, type: LogEntry['type'] = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    db.prepare('INSERT INTO logs (timestamp, message, type) VALUES (?, ?, ?)').run(timestamp, message, type);
    return { timestamp, message, type } satisfies LogEntry;
  }

  getSkills(): SkillRecord[] {
    return db.prepare('SELECT id, status FROM skills').all() as SkillRecord[];
  }

  toggleSkill(id: string) {
    const skill = db.prepare('SELECT id, status FROM skills WHERE id = ?').get(id) as SkillRecord | undefined;
    if (!skill) return null;
    const next = skill.status === 'active' ? 'inactive' : 'active';
    db.prepare('UPDATE skills SET status = ? WHERE id = ?').run(next, id);
    return { ...skill, status: next } as SkillRecord;
  }

  setCronStatus(id: string, name: string, schedule: string, status: string, lastRun?: string) {
    db.prepare(
      `INSERT INTO cron_jobs (id, name, schedule, status, lastRun) VALUES (@id, @name, @schedule, @status, @lastRun)
       ON CONFLICT(id) DO UPDATE SET status = excluded.status, lastRun = excluded.lastRun`
    ).run({ id, name, schedule, status, lastRun: lastRun ?? 'Never' });
  }

  getCronStatuses() {
    return db.prepare('SELECT id, name, schedule, lastRun, status FROM cron_jobs').all();
  }
}

export const store = new Store();
