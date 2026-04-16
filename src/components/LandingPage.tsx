import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, Zap, ChevronRight, Globe, Code, MessageSquare, Bot, Settings, Rocket, Eye, Target, Layers, ArrowRight, Sparkles, Lock, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-mono relative overflow-hidden selection:bg-neon-red/30">
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-[0.03] pointer-events-none">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="border border-neon-red/20" />
        ))}
      </div>

      <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-bg/80 to-dark-bg pointer-events-none" />

      <nav className="relative z-50 flex justify-between items-center px-6 py-6 md:px-12 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-dark-bg/80">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_25px_rgba(255,0,60,0.6)] transition-all duration-300">
            <img src="/logo.png" alt="ENTITY" className="w-10 h-10 object-cover group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wider text-white group-hover:text-neon-red transition-colors">
            ENTITY
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/50 hover:text-neon-red transition-colors tracking-wider uppercase">Features</a>
          <a href="#how-it-works" className="text-sm text-white/50 hover:text-neon-red transition-colors tracking-wider uppercase">How It Works</a>
          <a href="#about" className="text-sm text-white/50 hover:text-neon-red transition-colors tracking-wider uppercase">About</a>
          <a href="#vision" className="text-sm text-white/50 hover:text-neon-red transition-colors tracking-wider uppercase">Vision</a>
          <a href="https://x.com/EntityOS" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-neon-red transition-colors" title="Follow us on X">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://github.com/jennitsme/Ent" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-neon-red transition-colors" title="GitHub">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-2 bg-neon-red/10 border border-neon-red/50 text-neon-red hover:bg-neon-red hover:text-black transition-all duration-300 font-bold tracking-wider rounded-sm group"
          >
            INITIALIZE SYSTEM
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/5 border border-neon-red/20 text-neon-red text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
              System v2.0 Online
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              NEXT GEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-red-500 to-orange-500 animate-pulse">
                AI AGENT
              </span> <br />
              FRAMEWORK
            </h1>

            <p className="text-lg text-white/60 max-w-xl leading-relaxed border-l-2 border-neon-red/30 pl-6">
              Deploy autonomous agents with advanced capabilities.
              Integrated with Gemini, Telegram, and real-time web search.
              Secure, scalable, and ready for mission-critical tasks.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 max-w-xl hover:border-neon-red/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-neon-red tracking-widest uppercase">Contract Address</span>
              </div>
              <p className="text-sm text-white/70 font-mono break-all select-all cursor-pointer hover:text-neon-red transition-colors" onClick={() => navigator.clipboard.writeText('8KkmpsPChG63QmkAhUo2UNQjnSSbNzQqggGPnHN8pump')} title="Click to copy">
                8KkmpsPChG63QmkAhUo2UNQjnSSbNzQqggGPnHN8pump
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-neon-red text-black font-bold text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
              >
                DEPLOY AGENT
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg tracking-wider hover:border-neon-red hover:text-neon-red transition-all duration-300 text-center"
              >
                LEARN MORE
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] w-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] border border-neon-red/20 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] border border-neon-red/40 rounded-full border-dotted"
            />
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] border-2 border-neon-red/60 rounded-full border-t-transparent border-l-transparent"
            />
            <div className="relative z-10 w-32 h-32 bg-black border border-neon-red rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,0,60,0.5)]">
              <Cpu className="w-16 h-16 text-neon-red animate-pulse" />
            </div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 bg-black/80 backdrop-blur-md border border-neon-red/30 p-4 rounded-lg shadow-lg max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-neon-red" />
                <span className="text-xs font-bold text-neon-red">SECURE CORE</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-red w-[80%]" />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-0 bg-black/80 backdrop-blur-md border border-neon-red/30 p-4 rounded-lg shadow-lg max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-neon-red" />
                <span className="text-xs font-bold text-neon-red">HIGH PERFORMANCE</span>
              </div>
              <div className="text-xs text-white/60">Latency: 12ms</div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/5 border border-neon-red/20 text-neon-red text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3 h-3" />
              Core Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              POWERFUL <span className="text-neon-red">FEATURES</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Everything you need to deploy, manage, and scale autonomous AI agents in one unified platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Connectivity", desc: "Real-time web search and data retrieval capabilities across the internet. Access any information your agent needs, instantly." },
              { icon: Code, title: "Code Execution", desc: "Sandboxed environment for complex calculations and code interpretation. Run scripts safely with full isolation." },
              { icon: MessageSquare, title: "Natural Chat", desc: "Advanced NLP powered by Gemini 2.0 Flash models. Human-like conversation with deep contextual understanding." },
              { icon: Bot, title: "Telegram Integration", desc: "Seamless Telegram bot integration for real-time messaging. Deploy your agent where your users already communicate." },
              { icon: Clock, title: "Scheduled Tasks", desc: "Powerful cron-based scheduling system. Automate recurring tasks, reports, and data collection on any schedule." },
              { icon: Lock, title: "Secure by Design", desc: "Enterprise-grade security with encrypted credentials, sandboxed execution, and secure API key management." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/10 p-8 hover:bg-neon-red/5 hover:border-neon-red/50 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-150 duration-500">
                  <feature.icon className="w-24 h-24 text-neon-red" />
                </div>
                <div className="w-12 h-12 bg-black border border-neon-red/30 rounded-lg flex items-center justify-center mb-6 group-hover:border-neon-red group-hover:shadow-[0_0_15px_rgba(255,0,60,0.4)] transition-all">
                  <feature.icon className="w-6 h-6 text-white group-hover:text-neon-red transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-neon-red transition-colors">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/5 border border-neon-red/20 text-neon-red text-xs font-bold tracking-widest uppercase mb-4">
              <Settings className="w-3 h-3" />
              Process
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              HOW IT <span className="text-neon-red">WORKS</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Get your autonomous AI agent up and running in three simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red/30 to-transparent -translate-y-1/2" />

            {[
              {
                step: "01",
                icon: Settings,
                title: "CONFIGURE",
                desc: "Enter your Gemini API key and Telegram bot credentials through our secure terminal interface. Your keys are encrypted and stored safely.",
              },
              {
                step: "02",
                icon: Layers,
                title: "CUSTOMIZE",
                desc: "Enable or disable agent skills like web search, code interpretation, and image generation. Set up scheduled tasks and automation rules.",
              },
              {
                step: "03",
                icon: Rocket,
                title: "DEPLOY",
                desc: "Launch your AI agent instantly. It connects to Telegram, starts processing messages, and runs your scheduled tasks autonomously.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative bg-black/60 border border-white/10 p-8 text-center group hover:border-neon-red/40 transition-all duration-300"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-dark-bg border-2 border-neon-red rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,0,60,0.4)]">
                  <span className="text-neon-red font-display font-bold text-sm">{item.step}</span>
                </div>
                <div className="w-16 h-16 bg-neon-red/5 border border-neon-red/20 rounded-full flex items-center justify-center mx-auto mt-4 mb-6 group-hover:border-neon-red/60 group-hover:shadow-[0_0_25px_rgba(255,0,60,0.3)] transition-all duration-300">
                  <item.icon className="w-8 h-8 text-neon-red/70 group-hover:text-neon-red transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-neon-red transition-colors">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/5 border border-neon-red/20 text-neon-red text-xs font-bold tracking-widest uppercase mb-4">
                <Eye className="w-3 h-3" />
                About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                BUILT FOR THE <span className="text-neon-red">FUTURE</span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed text-lg">
                <p>
                  ENTITY.OS is an open-source AI agent framework designed for developers and creators who want to harness the full potential of autonomous AI systems.
                </p>
                <p>
                  We combine cutting-edge language models with practical integrations like Telegram and scheduled automation to create agents that don't just respond -- they act, learn, and evolve.
                </p>
                <p>
                  Born from the belief that AI should be accessible, configurable, and powerful, ENTITY.OS puts advanced agent capabilities in the hands of anyone willing to deploy them.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "<15ms", label: "Avg Response" },
                { value: "24/7", label: "Autonomous Ops" },
                { value: "E2E", label: "Encryption" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/10 p-6 text-center hover:border-neon-red/30 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-neon-red mb-2">{stat.value}</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="relative z-10 py-24 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/5 border border-neon-red/20 text-neon-red text-xs font-bold tracking-widest uppercase mb-4">
              <Target className="w-3 h-3" />
              Purpose
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              VISION & <span className="text-neon-red">MISSION</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-white/[0.02] border border-white/10 p-10 overflow-hidden group hover:border-neon-red/40 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-red via-neon-red/50 to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-red/5 rounded-full blur-3xl group-hover:bg-neon-red/10 transition-colors duration-500" />
              <div className="w-14 h-14 bg-neon-red/10 border border-neon-red/30 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-neon-red" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">OUR VISION</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                A world where intelligent AI agents work alongside humans seamlessly -- automating the mundane, amplifying creativity, and enabling anyone to build systems that think, act, and adapt in real time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white/[0.02] border border-white/10 p-10 overflow-hidden group hover:border-neon-red/40 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-red via-neon-red/50 to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-red/5 rounded-full blur-3xl group-hover:bg-neon-red/10 transition-colors duration-500" />
              <div className="w-14 h-14 bg-neon-red/10 border border-neon-red/30 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-neon-red" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">OUR MISSION</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                To provide an open, powerful, and secure platform for deploying autonomous AI agents. We make advanced AI accessible to everyone -- from solo developers to enterprise teams -- with zero infrastructure overhead.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: "Security First", desc: "Every component built with security as a foundation, not an afterthought." },
              { icon: Zap, title: "Speed Obsessed", desc: "Optimized for low-latency responses and real-time agent interactions." },
              { icon: Globe, title: "Open & Extensible", desc: "Modular architecture that grows with your needs. Add skills, integrations, and capabilities." },
            ].map((value, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 hover:border-neon-red/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-neon-red/10 border border-neon-red/30 rounded-lg flex items-center justify-center shrink-0">
                  <value.icon className="w-5 h-5 text-neon-red" />
                </div>
                <div>
                  <h4 className="font-display font-bold mb-1 text-white">{value.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              READY TO <span className="text-neon-red">DEPLOY</span>?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg mb-10">
              Initialize your AI agent in minutes. No complex setup, no infrastructure management. Just pure autonomous intelligence.
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-10 py-5 bg-neon-red text-black font-bold text-lg tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,0,60,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 96% 100%, 0 100%)' }}
            >
              INITIALIZE SYSTEM
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 relative z-10 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="ENTITY" className="w-8 h-8 object-cover" />
                </div>
                <span className="font-display font-bold tracking-wider">ENTITY</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-4">
                Next generation AI agent framework. Deploy autonomous intelligence with confidence.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://x.com/EntityOS" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-neon-red transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  @EntityOS
                </a>
                <a href="https://github.com/jennitsme/Ent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-neon-red transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  GitHub
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm tracking-wider mb-4 text-white/60">NAVIGATION</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm text-white/30 hover:text-neon-red transition-colors">Features</a>
                <a href="#how-it-works" className="block text-sm text-white/30 hover:text-neon-red transition-colors">How It Works</a>
                <a href="#about" className="block text-sm text-white/30 hover:text-neon-red transition-colors">About</a>
                <a href="#vision" className="block text-sm text-white/30 hover:text-neon-red transition-colors">Vision & Mission</a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm tracking-wider mb-4 text-white/60">SYSTEM</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All Systems Operational
                </div>
                <p className="text-sm text-white/30">v2.0.0-alpha</p>
                <p className="text-sm text-white/30">Build 2026.02.24</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center text-white/20 text-sm">
            <p>&copy; 2026 ENTITY OS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
