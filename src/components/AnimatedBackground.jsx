import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large blob - top right */}
      <motion.div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-red-500/60 to-rose-600/40 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Medium blob - left */}
      <motion.div
        className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-rose-600/50 to-red-400/30 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Small blob - bottom center */}
      <motion.div
        className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-t from-red-700/50 to-rose-500/30 blur-3xl"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Extra accent blob - top left */}
      <motion.div
        className="absolute top-20 left-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-red-400/50 to-rose-400/20 blur-2xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  );
}
