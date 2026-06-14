import { motion } from 'motion/react';

/**
 * variant:
 *  - 'reflectie' (default) — ruime kaart voor reflectie/toolkit-blokken
 *  - 'feature' — compactere kaart voor opsommingen (bv. TLE 3 features)
 */
export function ContentCard({
  icon,
  title,
  color,
  children,
  variant = 'reflectie',
}) {
  const compact = variant === 'feature';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border border-[var(--color-mid-gray)]/20 bg-[var(--color-light-gray)] ${
        compact ? 'p-5' : 'p-6'
      }`}
    >
      {/* Icon with gradient background */}
      <div
        className={`${
          compact ? 'h-10 w-10 rounded-lg' : 'h-12 w-12 rounded-xl'
        } bg-gradient-to-br ${color} flex items-center justify-center`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className={`bg-gradient-to-r font-semibold ${color} bg-clip-text text-transparent ${
          compact ? 'mt-3 text-lg' : 'mt-4 text-xl'
        }`}
      >
        {title}
      </h3>

      {/* Children content */}
      <div
        className={`text-[var(--color-body)] ${
          compact ? 'mt-2 text-sm leading-relaxed' : 'mt-4'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
