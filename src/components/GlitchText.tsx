import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-neon-cyan opacity-0 group-hover:opacity-70"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          repeatType: "mirror",
          repeatDelay: 2
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-neon-purple opacity-0 group-hover:opacity-70"
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.4,
          repeatType: "mirror",
          repeatDelay: 3
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
