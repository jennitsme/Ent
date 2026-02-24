import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { Dashboard } from '@/components/Dashboard';
import { LandingPage } from '@/components/LandingPage';
import { GlitchText } from '@/components/GlitchText';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [view, setView] = useState<'landing' | 'terminal' | 'dashboard'>('landing');
  const [config, setConfig] = useState({ apiKey: '', botToken: '', chatId: '', provider: 'gemini' });

  useEffect(() => {
    // Check if already configured
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.config && data.config.apiKey && data.config.botToken) {
          setConfig(data.config);
          // setView('dashboard'); // Removed auto-redirect
        }
      })
      .catch(() => {
        // Ignore error, stay on landing
      });
  }, []);

  const handleStart = () => {
    setView('terminal');
  };

  const handleTerminalComplete = (newConfig: { apiKey: string; botToken: string; chatId: string; provider: string }) => {
    setConfig(newConfig);
    setTimeout(() => {
      setView('dashboard');
    }, 1000);
  };

  const handleLogout = () => {
    setView('landing');
    setConfig({ apiKey: '', botToken: '', chatId: '', provider: 'gemini' });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-mono relative">
      {/* Global Effects */}
      <div className="scanlines" />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStart={handleStart} />
          </motion.div>
        )}

        {view === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center relative z-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
            
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white mb-2 text-glow">
                <GlitchText text="FREEKLAW" />
              </h1>
              <p className="text-neon-cyan/60 text-sm md:text-base tracking-widest uppercase font-tech">
                AI Agent Deployment Protocol
              </p>
            </div>

            <Terminal onComplete={handleTerminalComplete} />
            
            <div className="mt-8 text-white/20 text-xs text-center max-w-md px-4">
              <p>SECURE CONNECTION ESTABLISHED</p>
              <p>v1.0.0-alpha // BUILD 2026.02.24</p>
            </div>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Dashboard config={config} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
