import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, Zap, ChevronRight, Globe, Code, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-mono relative overflow-hidden selection:bg-neon-red/30">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-[0.03] pointer-events-none">
        {Array.from({ length: 1600 }).map((_, i) => (
          <div key={i} className="border border-neon-red/20" />
        ))}
      </div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-bg/80 to-dark-bg pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 md:px-12 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-neon-red/10 rounded-lg flex items-center justify-center border border-neon-red/50 shadow-[0_0_15px_rgba(255,0,60,0.3)] group-hover:shadow-[0_0_25px_rgba(255,0,60,0.6)] transition-all duration-300">
            <Terminal className="text-neon-red w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wider text-white group-hover:text-neon-red transition-colors">
            FREEKLAW<span className="text-neon-red">.OS</span>
          </h1>
        </div>
        <button 
          onClick={onStart}
          className="hidden md:flex items-center gap-2 px-6 py-2 bg-neon-red/10 border border-neon-red/50 text-neon-red hover:bg-neon-red hover:text-black transition-all duration-300 font-bold tracking-wider rounded-sm group"
        >
          INITIALIZE SYSTEM
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-neon-red text-black font-bold text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] clip-path-polygon"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
              >
                DEPLOY AGENT
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg tracking-wider hover:border-neon-red hover:text-neon-red transition-all duration-300">
                VIEW DOCS
              </button>
            </div>
          </motion.div>

          {/* Hero Visual/Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] w-full flex items-center justify-center"
          >
            {/* Rotating Rings */}
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

            {/* Center Core */}
            <div className="relative z-10 w-32 h-32 bg-black border border-neon-red rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,0,60,0.5)]">
              <Cpu className="w-16 h-16 text-neon-red animate-pulse" />
            </div>

            {/* Floating Cards */}
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

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Global Connectivity", desc: "Real-time web search and data retrieval capabilities." },
            { icon: Code, title: "Code Execution", desc: "Sandboxed Python environment for complex calculations." },
            { icon: MessageSquare, title: "Natural Chat", desc: "Advanced NLP powered by Gemini 2.0 Flash models." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-white/5 border border-white/10 p-8 hover:bg-neon-red/5 hover:border-neon-red/50 transition-all duration-300 cursor-default overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-150 duration-500">
                <feature.icon className="w-24 h-24 text-neon-red" />
              </div>
              
              <div className="w-12 h-12 bg-black border border-neon-red/30 rounded-lg flex items-center justify-center mb-6 group-hover:border-neon-red group-hover:shadow-[0_0_15px_rgba(255,0,60,0.4)] transition-all">
                <feature.icon className="w-6 h-6 text-white group-hover:text-neon-red transition-colors" />
              </div>
              
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-neon-red transition-colors">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/30 text-sm relative z-10 bg-black">
        <p>&copy; 2026 FREEKLAW OS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
