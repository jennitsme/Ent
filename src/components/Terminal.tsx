import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon, LoaderCircle } from 'lucide-react';

type Config = { apiKey: string; botToken: string; chatId: string; provider: string; authToken: string };

interface TerminalProps {
  onComplete: (config: Config) => void;
}

type Step = 'IDLE' | 'INSTALLING' | 'SELECT_PROVIDER' | 'CONFIG_API' | 'CONFIG_BOT_TOKEN' | 'CONFIG_CHAT_ID' | 'COMPLETE';

interface LogLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'input' | 'system';
  ephemeral?: boolean;
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

  const addLog = (text: string, type: LogLine['type'] = 'info', ephemeral = false) => {
    const id = Math.random().toString(36).slice(2, 11);
    setHistory(prev => [...prev, { id, text, type, ephemeral }]);
    return id;
  };

  const replaceLog = (id: string, text: string, type?: LogLine['type'], ephemeral?: boolean) => {
    setHistory(prev => prev.map(line => line.id === id ? { ...line, text, type: type ?? line.type, ephemeral: ephemeral ?? line.ephemeral } : line));
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const simulateInstall = async () => {
    setStep('INSTALLING');

    const asciiArt = [
      '███████╗███╗   ██╗████████╗██╗████████╗██╗   ██╗',
      '██╔════╝████╗  ██║╚══██╔══╝██║╚══██╔══╝╚██╗ ██╔╝',
      '█████╗  ██╔██╗ ██║   ██║   ██║   ██║    ╚████╔╝ ',
      '██╔══╝  ██║╚██╗██║   ██║   ██║   ██║     ╚██╔╝  ',
      '███████╗██║ ╚████║   ██║   ██║   ██║      ██║   ',
      '╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝   ╚═╝      ╚═╝   ',
    ];

    for (const line of asciiArt) {
      await wait(55);
      addLog(line, 'system');
    }

    await wait(180);
    addLog('$ npm install -g entity --verbose', 'input');
    await wait(120);
    addLog('npm verb cli /usr/local/bin/node /usr/local/bin/npm', 'info');
    await wait(70);
    addLog('npm info using npm@10.9.2', 'info');
    await wait(70);
    addLog('npm info using node@v22.14.0', 'info');
    await wait(90);
    addLog('npm verb title npm install entity', 'info');
    await wait(70);
    addLog('npm verb argv "install" "--global" "entity" "--verbose"', 'info');
    await wait(120);

    const installFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const spinStage = async (messages: string[], loops: number, delay = 85) => {
      const id = addLog(`${installFrames[0]} ${messages[0]}`, 'info', true);
      for (let i = 0; i < loops; i++) {
        const frame = installFrames[i % installFrames.length];
        const message = messages[i % messages.length];
        replaceLog(id, `${frame} ${message}`, 'info', true);
        await wait(delay);
      }
      return id;
    };

    const resolveId = await spinStage([
      'Resolving dependency graph...',
      'Resolving dependency graph... inspecting peer sets',
      'Resolving dependency graph... pruning phantom edges',
      'Resolving dependency graph... hoisting workspace packages',
    ], 18, 80);
    replaceLog(resolveId, 'npm timing arborist:ctor Completed in 1ms', 'info', false);

    await wait(90);
    addLog('npm http fetch GET 200 https://registry.npmjs.org/entity 284ms (cache miss)', 'info');
    await wait(80);
    addLog('npm http fetch GET 200 https://registry.npmjs.org/@google%2fgenai 198ms (cache revalidated)', 'info');
    await wait(70);
    addLog('npm http fetch GET 200 https://registry.npmjs.org/node-telegram-bot-api 243ms (cache revalidated)', 'info');
    await wait(70);
    addLog('npm http fetch GET 200 https://registry.npmjs.org/better-sqlite3 301ms (cache miss)', 'info');

    const fetchId = await spinStage([
      'Fetching package metadata from registry...',
      'Fetching tarballs... 8/31 complete',
      'Fetching tarballs... 17/31 complete',
      'Fetching tarballs... 26/31 complete',
      'Fetching tarballs... unpack queue saturated',
    ], 22, 75);
    replaceLog(fetchId, 'npm timing idealTree Completed in 3.42s', 'info', false);

    await wait(120);
    addLog('npm verb reify failed optional dependency /usr/local/lib/node_modules/entity/node_modules/fsevents', 'warning');
    await wait(100);
    addLog('npm sill audit bulk request { entity, openai, vite, react, framer-motion, better-sqlite3 }', 'info');

    const progressMarks = [3, 9, 14, 21, 28, 36, 43, 51, 59, 67, 74, 82, 89, 94, 97, 100];
    for (const progress of progressMarks) {
      await wait(progress < 80 ? 110 : progress < 97 ? 160 : 240);
      const bar = `${'█'.repeat(Math.floor(progress / 5)).padEnd(20, '░')}`;
      const added = Math.max(1, Math.floor((214 * progress) / 100));
      const downloaded = Math.max(2, Math.floor((96 * progress) / 100));
      addLog(`npm sill install progress [${bar}] ${progress}% | downloaded ${downloaded}/96 | added ${added}/214`, 'info');
      if (progress === 36) addLog('npm verb tarball tarball data for react@19.0.0 extracted in 124ms', 'info');
      if (progress === 67) addLog('npm verb tarball tarball data for vite@6.2.0 extracted in 188ms', 'info');
      if (progress === 89) addLog('npm verb rebuild better-sqlite3@12.4.1 source build success', 'success');
    }

    await wait(160);
    addLog('added 214 packages, and audited 215 packages in 12s', 'success');
    await wait(100);
    addLog('38 packages are looking for funding', 'info');
    addLog('  run `npm fund` for details', 'info');
    await wait(110);
    addLog('found 0 vulnerabilities', 'success');
    await wait(180);

    const postInstallId = await spinStage([
      'Running postinstall hooks...',
      'Running postinstall hooks... rebuilding native bindings',
      'Running postinstall hooks... generating runtime cache',
      'Running postinstall hooks... sealing config templates',
    ], 18, 80);
    replaceLog(postInstallId, 'postinstall: generated 6 runtime assets in .entity/cache', 'info', false);

    await wait(130);
    addLog('> entity bootstrap --profile production --telemetry=off', 'input');
    await wait(100);
    addLog('[entity] probing runtime surface...', 'info');
    await wait(120);
    addLog('[entity] mounting secure config channel...', 'info');
    await wait(120);
    addLog('[entity] attaching telegram bridge module...', 'info');
    await wait(120);
    addLog('[entity] linking local command bus...', 'info');
    await wait(120);
    addLog('[entity] warming Gemini provider adapters...', 'info');
    await wait(120);
    addLog('[entity] hydrating encrypted secret store...', 'info');
    await wait(120);
    addLog('[entity] telemetry disabled by default', 'warning');
    await wait(140);
    addLog('[entity] handshake complete, runtime healthy', 'success');
    await wait(120);
    addLog('✔ Entity runtime installed successfully', 'success');
    await wait(220);
    addLog('--- AGENT CONFIGURATION REQUIRED ---', 'warning');
    await wait(120);
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
          borderColor: isFocused ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.25)',
          boxShadow: isFocused ? '0 0 25px rgba(255, 255, 255, 0.16)' : '0 0 10px rgba(255, 255, 255, 0.06)',
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
          className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
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
                  line.type === 'success' && "text-white",
                  line.type === 'warning' && "text-zinc-300",
                  line.type === 'system' && "text-white font-bold",
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
              className="flex items-center gap-2 text-white mt-2"
              animate={{ x: isTyping ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.05 }}
            >
              <span className="text-white">➜</span>
              <span className="text-white/80">~</span>
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
                  isTyping ? "text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.55)]" : "text-white"
                )}
                autoFocus
                autoComplete="off"
              />
            </motion.div>
          )}
          {step === 'INSTALLING' && (
             <motion.div 
               className="inline-flex items-center gap-2 mt-2 text-white/70"
               animate={{ opacity: [0.45, 1, 0.45] }}
               transition={{ repeat: Infinity, duration: 1.1 }}
             >
               <LoaderCircle className="w-4 h-4 animate-spin" />
               <span className="text-xs tracking-wider uppercase">Installer active</span>
             </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
