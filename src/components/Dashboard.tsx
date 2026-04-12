import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Clock, Terminal, Activity, MessageSquare, Settings, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  config: { apiKey: string; botToken: string; chatId: string; provider: string; authToken: string };
  onLogout: () => void;
}

export function Dashboard({ config, onLogout }: DashboardProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'cron'>('overview');
  const [skills, setSkills] = useState<{ id: string; name: string; desc: string; status: string }[]>([]);
  const [cronJobs, setCronJobs] = useState<{ id: string; name: string; schedule: string; lastRun: string; status: string }[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch real status from backend
  useEffect(() => {
    const fetchStatus = async () => {
      if (!config.authToken) return;
      try {
        const res = await fetch('/api/status', {
          headers: { Authorization: `Bearer ${config.authToken}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setLogs(data.logs.map((l: any) => `[${l.timestamp}] ${l.message}`));
        setCronJobs(data.cronJobs || []);
        
        const skillDescriptions: Record<string, { name: string; desc: string }> = {
          'web-search': { name: 'Web Search', desc: 'Allows the agent to search the internet for real-time info.' },
          'code-interpreter': { name: 'Code Interpreter', desc: 'Executes Python code for data analysis.' },
          'image-gen': { name: 'Image Gen', desc: 'Generates images using Gemini models.' },
          'telegram-handler': { name: 'Telegram Handler', desc: 'Manages Telegram webhooks and messages.' },
        };

        const mergedSkills = data.skills.map((s: any) => ({
          ...s,
          ...skillDescriptions[s.id],
        }));
        setSkills(mergedSkills);
      } catch (error) {
        console.error('Failed to fetch status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [config.authToken]);

  const toggleSkill = async (id: string) => {
    try {
      const res = await fetch('/api/skills/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.authToken}` },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        const { skill } = await res.json();
        const newStatus = skill.status;
        const skillName = skills.find(s => s.id === id)?.name || id;
        
        setToast({
          message: `Skill '${skillName}' ${newStatus === 'active' ? 'enabled' : 'disabled'} successfully.`,
          type: newStatus === 'active' ? 'success' : 'info'
        });
        
        setSkills(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (error) {
      setToast({ message: 'Failed to toggle skill', type: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-mono p-4 md:p-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-5 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-neon-cyan/20" />
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={cn(
              "fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-2xl border backdrop-blur-md flex items-center gap-3",
              toast.type === 'success' ? "bg-neon-green/10 border-neon-green/50 text-neon-green" : "bg-white/10 border-white/20 text-white"
            )}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-mono text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-cyan/10 rounded-lg flex items-center justify-center border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
            <Terminal className="text-neon-cyan w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider text-white">ENTITY<span className="text-neon-cyan">.OS</span></h1>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          DISCONNECT
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-panel-bg border border-white/10 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Navigation</h3>
            {[
              { id: 'overview', icon: Activity, label: 'Overview' },
              { id: 'skills', icon: Zap, label: 'Agent Skills' },
              { id: 'cron', icon: Clock, label: 'Cron Jobs' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                  activeTab === item.id 
                    ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="bg-panel-bg border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Connection Info</h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="text-white/40 mb-1">Telegram Bot Token</div>
                <div className="font-mono text-neon-purple truncate">
                  {config.botToken ? `${config.botToken.substring(0, 8)}...${config.botToken.substring(config.botToken.length - 4)}` : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-white/40 mb-1">Chat ID</div>
                <div className="font-mono text-neon-green">{config.chatId || 'N/A'}</div>
              </div>
              <div>
                <div className="text-white/40 mb-1">AI Provider</div>
                <div className="font-mono text-neon-cyan uppercase">{config.provider}</div>
              </div>
              <div>
                <div className="text-white/40 mb-1">API Key Status</div>
                <div className="flex items-center gap-2 text-neon-green">
                  <Shield className="w-3 h-3" />
                  {config.apiKey ? 'SECURE & ACTIVE' : 'MISSING'}
                </div>
              </div>
              <div>
                <div className="text-white/40 mb-1">Auth Token</div>
                <div className="font-mono text-neon-cyan truncate">{config.authToken || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-panel-bg border border-white/10 rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare className="w-12 h-12" />
              </div>
              <div className="text-2xl font-bold font-display text-white">2,451</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Messages Processed</div>
            </div>
            <div className="bg-panel-bg border border-white/10 rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-12 h-12" />
              </div>
              <div className="text-2xl font-bold font-display text-white">12</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Active Skills</div>
            </div>
            <div className="bg-panel-bg border border-white/10 rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock className="w-12 h-12" />
              </div>
              <div className="text-2xl font-bold font-display text-white">99.9%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Uptime</div>
            </div>
          </div>

          {/* Main Content Area based on Tab */}
          <div className="bg-panel-bg border border-white/10 rounded-xl p-6 min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display text-white">System Status</h2>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-neon-green/10 text-neon-green text-xs rounded border border-neon-green/30">ONLINE</span>
                    <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs rounded border border-neon-cyan/30">SYNCED</span>
                  </div>
                </div>
                
                {/* Live Logs Terminal */}
                <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl h-64 flex flex-col">
                  <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="text-xs font-mono text-white/50">LIVE_LOGS.log</div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                  </div>
                  <div className="p-4 font-mono text-xs md:text-sm overflow-y-auto space-y-1 flex-1 scrollbar-thin scrollbar-thumb-white/10">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-neon-green/80 border-l-2 border-transparent hover:border-neon-green/50 pl-2 transition-colors"
                      >
                        <span className="text-white/30 mr-2">{log.split(']')[0]}]</span>
                        {log.split(']')[1]}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                <h2 className="text-xl font-display text-white mb-6">Installed Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <button 
                      key={skill.id} 
                      onClick={() => toggleSkill(skill.id)}
                      className="bg-black/40 border border-white/10 p-4 rounded-lg hover:border-neon-cyan/50 transition-all group text-left relative overflow-hidden"
                    >
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
                        skill.status === 'active' ? "bg-neon-green" : "bg-red-500"
                      )} />
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <h3 className="font-bold text-neon-cyan group-hover:text-white transition-colors">{skill.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] uppercase tracking-wider font-bold",
                            skill.status === 'active' ? "text-neon-green" : "text-red-500"
                          )}>
                            {skill.status === 'active' ? 'ENABLED' : 'DISABLED'}
                          </span>
                          <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300", 
                            skill.status === 'active' ? "bg-neon-green shadow-[0_0_8px_#00ff9d]" : "bg-red-500"
                          )} />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 relative z-10">{skill.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cron' && (
              <div className="space-y-4">
                <h2 className="text-xl font-display text-white mb-6">Scheduled Jobs</h2>
                <div className="space-y-2">
                  {cronJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between bg-black/40 border border-white/10 p-3 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-neon-purple text-xs">{job.schedule}</div>
                        <div>
                          <div className="font-bold text-sm text-white">{job.name}</div>
                          <div className="text-xs text-white/40">Last run: {job.lastRun}</div>
                        </div>
                      </div>
                      <div className={cn(
                        "text-xs px-2 py-1 rounded border",
                        job.status === 'success' ? "border-neon-green/30 text-neon-green bg-neon-green/5" : 
                        job.status === 'running' ? "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 animate-pulse" :
                        job.status === 'error' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                        "border-white/10 text-white/40"
                      )}>
                        {job.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                  {cronJobs.length === 0 && (
                    <div className="text-white/40 text-sm text-center py-8">No active cron jobs found.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
