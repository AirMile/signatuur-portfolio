import { motion } from 'motion/react';

export function ContentCard({ icon, title, color, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      {/* Icon with gradient background */}
      <div
        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className={`mt-4 bg-gradient-to-r text-xl font-semibold ${color} bg-clip-text text-transparent`}
      >
        {title}
      </h3>

      {/* Children content */}
      <div className="mt-4 text-slate-300">{children}</div>
    </motion.div>
  );
}
