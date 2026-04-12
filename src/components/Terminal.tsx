import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';

type Config = { apiKey: string; botToken: string; chatId: string; provider: string; authToken: string };

interface TerminalProps {
  onComplete: (config: Config) => void;
}

type Step = 'IDLE' | 'INSTALLING' | 'SELECT_PROVIDER' | 'CONFIG_API' | 'CONFIG_BOT_TOKEN' | 'CONFIG_CHAT_ID' | 'COMPLETE';

interface LogLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'input' | 'system';
}

export function Terminal({ onComplete }: TerminalProps) {
  const [history, setHistory] = useState<LogLine[]>([
    { id: 'init-1', text: 'Entity OS v1.0.0 initialized...', type: 'system' },
    { id: 'init-2', text: 'Type "npm install entity" to begin agent deployment.', type: 'info' },
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<Step>('IDLE');
  const [config, setConfig] = useState<Config>({ apiKey: '', botToken: '', chatId: '', provider: 'gemini', authToken: '' });
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 100);
  };

  const addLog = (text: string, type: LogLine['type'] = 'info') => {
    setHistory(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), text, type }]);
  };

  const simulateInstall = async () => {
    setStep('INSTALLING');
    
    const asciiArt = [
      "███████╗██████╗ ███████╗███████╗██╗  ██╗██╗      █████╗ ██╗    ██╗",
      "██╔════╝██╔══██╗██╔════╝██╔════╝██║ ██╔╝██║     ██╔══██╗██║    ██║",
      "█████╗  ██████╔╝█████╗  █████╗  █████╔╝ ██║     ███████║██║ █╗ ██║",
      "██╔══╝  ██╔══██╗██╔══╝  ██╔══╝  ██╔═██╗ ██║     ██╔══██║██║███╗██║",
      "██║     ██║  ██║███████╗███████╗██║  ██╗███████╗██║  ██║╚███╔███╔╝",
      "╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ "
    ];

    for (const line of asciiArt) {
      await new Promise(r => setTimeout(r, 100));
      addLog(line, 'system');
    }

    const steps = [
      { text: 'Initializing package manager...', delay: 1500 },
      { text: 'Resolving dependency tree...', delay: 2000 },
      { text: 'Fetching @entity/core (v1.0.0)...', delay: 2500 },
      { text: 'Fetching @entity/agent-kit...', delay: 1800 },
      { text: 'Fetching @entity/telegram-bridge...', delay: 2200 },
      { text: 'Verifying package integrity signatures...', delay: 3000 },
      { text: 'Downloading binary artifacts [34MB]...', delay: 4000 },
      { text: '[###.................] 15%', delay: 500 },
      { text: '[######..............] 30%', delay: 500 },
      { text: '[#########...........] 45%', delay: 500 },
      { text: '[############........] 60%', delay: 500 },
      { text: '[###############.....] 75%', delay: 500 },
      { text: '[##################..] 90%', delay: 500 },
      { text: '[####################] 100%', delay: 500 },
      { text: 'Extracting modules to /usr/local/bin/entity...', delay: 2500 },
      { text: 'Compiling native extensions (node-gyp)...', delay: 3500 },
      { text: 'Optimizing AI inference engine...', delay: 2800 },
      { text: 'Configuring local environment variables...', delay: 1500 },
      { text: 'Registering system services...', delay: 1200 },
      { text: 'Cleaning up temporary files...', delay: 800 },
      { text: 'Installation complete.', type: 'success', delay: 1000 },
      { text: '--- AGENT CONFIGURATION REQUIRED ---', type: 'warning', delay: 1000 },
    ];

    for (const s of steps) {
      await new Promise(r => setTimeout(r, s.delay));
      addLog(s.text, s.type as any || 'info');
    }

    addLog('Select AI Provider:', 'system');
    addLog('1. Google Gemini (Recommended)', 'info');
    addLog('2. OpenAI GPT-4', 'info');
    addLog('3. Anthropic Claude', 'info');
    addLog('4. Groq (Llama 3)', 'info');
    setStep('SELECT_PROVIDER');
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    addLog(`> ${cmd}`, 'input');

    if (step === 'IDLE') {
      if (trimmed === 'npm install entity') {
        await simulateInstall();
      } else if (trimmed === 'help') {
        addLog('Available commands: npm install entity, help, clear', 'info');
      } else if (trimmed === 'clear') {
        setHistory([]);
      } else {
        addLog(`Command not found: ${trimmed}`, 'error');
      }
    } else if (step === 'SELECT_PROVIDER') {
      const selection = trimmed.toLowerCase();
      let selectedProvider = '';
      let providerName = '';

      if (['1', 'gemini'].includes(selection)) {
        selectedProvider = 'gemini';
        providerName = 'Google Gemini';
      } else if (['2', 'openai'].includes(selection)) {
        selectedProvider = 'openai';
        providerName = 'OpenAI';
      } else if (['3', 'anthropic', 'claude'].includes(selection)) {
        selectedProvider = 'anthropic';
        providerName = 'Anthropic Claude';
      } else if (['4', 'groq'].includes(selection)) {
        selectedProvider = 'groq';
        providerName = 'Groq';
      }

      if (selectedProvider) {
        setConfig(prev => ({ ...prev, provider: selectedProvider }));
        addLog(`Selected: ${providerName}`, 'success');
        addLog(`Please enter your ${providerName} API Key:`, 'system');
        setStep('CONFIG_API');
      } else {
        addLog('Invalid selection. Please choose 1-4.', 'error');
      }
    } else if (step === 'CONFIG_API') {
      let isValid = false;
      let errorMessage = 'Invalid API Key.';

      if (config.provider === 'gemini') {
        if (trimmed.startsWith('AIza') && trimmed.length > 30) {
          isValid = true;
        } else {
          errorMessage = 'Invalid Gemini API Key. Must start with "AIza".';
        }
      } else if (config.provider === 'openai') {
        if (trimmed.startsWith('sk-') && trimmed.length > 40) {
          isValid = true;
        } else {
          errorMessage = 'Invalid OpenAI API Key. Must start with "sk-".';
        }
      } else if (config.provider === 'anthropic') {
        if (trimmed.startsWith('sk-ant') && trimmed.length > 40) {
          isValid = true;
        } else {
          errorMessage = 'Invalid Anthropic API Key. Must start with "sk-ant".';
        }
      } else if (config.provider === 'groq') {
        if (trimmed.startsWith('gsk_') && trimmed.length > 40) {
          isValid = true;
        } else {
          errorMessage = 'Invalid Groq API Key. Must start with "gsk_".';
        }
      }

      if (isValid) {
        setConfig(prev => ({ ...prev, apiKey: trimmed }));
        addLog('API Key set.', 'success');
        addLog('Please enter your Telegram Bot Token:', 'system');
        setStep('CONFIG_BOT_TOKEN');
      } else {
        addLog(errorMessage, 'error');
      }
    } else if (step === 'CONFIG_BOT_TOKEN') {
      if (trimmed.length > 10) { // Basic length check
        setConfig(prev => ({ ...prev, botToken: trimmed }));
        addLog('Bot Token set.', 'success');
        addLog('Please enter your Telegram Chat ID:', 'system');
        setStep('CONFIG_CHAT_ID');
      } else {
        addLog('Invalid Bot Token. Please try again.', 'error');
      }
    } else if (step === 'CONFIG_CHAT_ID') {
      if (trimmed.length > 0) {
        const finalConfig = { ...config, chatId: trimmed };
        setConfig(finalConfig);
        addLog('Chat ID set.', 'success');
        addLog('Initializing Agent connection...', 'info');
        await new Promise(r => setTimeout(r, 1500));
        addLog('Agent "Entity" is now online.', 'success');
        addLog('Redirecting to dashboard...', 'system');
        
        try {
          const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalConfig),
          });
          const data = await res.json();
          const authToken = data.authToken || '';
          addLog('Configuration saved to server.', 'success');
          const withAuth: Config = { ...finalConfig, authToken };
          await new Promise(r => setTimeout(r, 2000));
          setStep('COMPLETE');
          onComplete(withAuth);
        } catch (error) {
          addLog('Failed to save configuration to server.', 'error');
        }
      } else {
        addLog('Invalid Chat ID.', 'error');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div 
        className="relative bg-black/80 rounded-lg overflow-hidden backdrop-blur-md font-mono text-sm md:text-base h-[600px] flex flex-col border"
        animate={{
          borderColor: isFocused ? 'rgba(0, 243, 255, 0.8)' : 'rgba(0, 243, 255, 0.3)',
          boxShadow: isFocused ? '0 0 25px rgba(0, 243, 255, 0.25)' : '0 0 10px rgba(0, 243, 255, 0.05)',
        }}
        transition={{ duration: 0.3 }}
        onClick={handleContainerClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-white/50 text-xs font-tech tracking-widest">root@entity:~</div>
          <TerminalIcon className="w-4 h-4 text-white/30" />
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {history.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "break-all whitespace-pre-wrap font-mono",
                  line.type === 'error' && "text-red-500",
                  line.type === 'success' && "text-neon-green",
                  line.type === 'warning' && "text-yellow-400",
                  line.type === 'system' && "text-neon-cyan font-bold",
                  line.type === 'input' && "text-white/80",
                  line.type === 'info' && "text-gray-300"
                )}
              >
                {line.type === 'input' ? '' : line.type === 'system' ? '[SYSTEM] ' : '> '}
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Input Line */}
          {step !== 'INSTALLING' && step !== 'COMPLETE' && (
            <motion.div 
              className="flex items-center gap-2 text-neon-cyan mt-2"
              animate={{ x: isTyping ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.05 }}
            >
              <span className="text-neon-green">➜</span>
              <span className="text-neon-cyan">~</span>
              <input
                ref={inputRef}
                type={step.startsWith('CONFIG') && step !== 'CONFIG_CHAT_ID' ? "password" : "text"}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(
                  "flex-1 bg-transparent border-none outline-none font-mono placeholder-white/20 transition-all duration-75",
                  isTyping ? "text-neon-green drop-shadow-[0_0_2px_rgba(0,255,157,0.8)]" : "text-white"
                )}
                autoFocus
                autoComplete="off"
              />
            </motion.div>
          )}
          {step === 'INSTALLING' && (
             <motion.div 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="w-2 h-4 bg-neon-green inline-block mt-2"
             />
          )}
        </div>
      </motion.div>
    </div>
  );
}
