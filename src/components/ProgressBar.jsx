import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useState } from 'react';

export function ProgressBar({ color = 'from-blue-500 to-purple-500' }) {
  const [progress, setProgress] = useState(0);

  useLenis(({ progress }) => {
    setProgress(progress);
  });

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-gray-900/50">
      <motion.div
        className={`h-full bg-gradient-to-r ${color}`}
        style={{ scaleX: progress, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
    </div>
  );
}
