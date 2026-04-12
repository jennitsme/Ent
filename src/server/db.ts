import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'entity.db');

export const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  apiKey TEXT DEFAULT '',
  botToken TEXT DEFAULT '',
  chatId TEXT DEFAULT '',
  provider TEXT DEFAULT 'gemini',
  authToken TEXT DEFAULT ''
);

INSERT OR IGNORE INTO config (id, apiKey, botToken, chatId, provider, authToken)
VALUES (1, '', '', '', 'gemini', '');

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL
);

INSERT OR IGNORE INTO skills (id, status) VALUES
 ('web-search', 'active'),
 ('code-interpreter', 'active'),
 ('image-gen', 'inactive'),
 ('telegram-handler', 'active');

CREATE TABLE IF NOT EXISTS cron_jobs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schedule TEXT NOT NULL,
  lastRun TEXT DEFAULT 'Never',
  status TEXT DEFAULT 'idle'
);
`);
