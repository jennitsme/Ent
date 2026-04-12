import cron from 'node-cron';
import { store } from '../store';
import { telegramService } from './TelegramService';

interface JobStatus {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  status: 'running' | 'success' | 'error' | 'idle';
}

class CronService {
  private jobs: Map<string, any> = new Map();

  initialize() {
    // Clear existing jobs
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();

    // Daily Summary Job
    this.scheduleJob('daily_summary', 'Daily Summary', '0 9 * * *', async () => {
      store.addLog('Running scheduled task: daily_summary', 'system');
      await telegramService.sendMessage('Good morning! Here is your daily summary: System is running smoothly.');
    });

    // Log Cleanup Job
    this.scheduleJob('cleanup_logs', 'Log Cleanup', '0 0 * * 0', () => {
      store.addLog('Running scheduled task: cleanup_logs', 'system');
    });

    // Model Sync Job
    this.scheduleJob('sync_models', 'Model Sync', '*/30 * * * *', () => {
      store.addLog('Running scheduled task: sync_models', 'system');
    });

    store.addLog('Cron jobs initialized', 'success');
  }

  private scheduleJob(id: string, name: string, schedule: string, task: () => void) {
    store.setCronStatus(id, name, schedule, 'idle', 'Never');

    const job = cron.schedule(schedule, async () => {
      this.updateJobStatus(id, 'running');
      try {
        await task();
        this.updateJobStatus(id, 'success');
      } catch (error) {
        this.updateJobStatus(id, 'error');
        store.addLog(`Job ${name} failed: ${error}`, 'error');
      }
    });
    this.jobs.set(id, job);
  }

  private updateJobStatus(id: string, status: JobStatus['status']) {
    const lastRun = status === 'running' ? undefined : new Date().toLocaleString();
    store.setCronStatus(id, this.getName(id), this.getSchedule(id), status, lastRun);
  }

  private getName(id: string) {
    const job = store.getCronStatuses().find(j => j.id === id);
    return job?.name || id;
  }

  private getSchedule(id: string) {
    const job = store.getCronStatuses().find(j => j.id === id);
    return job?.schedule || '* * * * *';
  }

  getJobStatuses() {
    return store.getCronStatuses();
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    this.jobs.clear();
  }
}

export const cronService = new CronService();
