import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useState } from 'react';

// Map section colors (Tailwind gradient classes) to hex values
const COLOR_MAP = {
  'from-red-500 to-rose-600': { dot: '#e11d48', ring: '#fb7185' },
  'from-purple-500 to-pink-500': { dot: '#a855f7', ring: '#c084fc' },
  'from-blue-500 to-cyan-500': { dot: '#3b82f6', ring: '#60a5fa' },
  'from-green-500 to-emerald-500': { dot: '#22c55e', ring: '#4ade80' },
};

export function TimelineNav({ sections, activeIndex }) {
  const lenis = useLenis();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (sectionId) => {
    if (lenis) {
      lenis.scrollTo(`#${sectionId}`, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  // Get the active section's colors
  const activeColors = COLOR_MAP[sections[activeIndex]?.color] || {
    dot: '#a78bfa',
    ring: '#c4b5fd',
  };

  return (
    <nav className="fixed top-1/2 right-8 z-50 flex -translate-y-1/2 flex-col gap-4">
      {sections.map((section, index) => {
        const isActive = index === activeIndex;
        const isHovered = index === hoveredIndex;
        const sectionColors = COLOR_MAP[section.color] || {
          dot: '#a78bfa',
          ring: '#c4b5fd',
        };

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute right-8 rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-zinc-100 shadow-lg"
            >
              {section.title}
            </motion.span>

            {/* Dot */}
            <motion.button
              onClick={() => handleClick(section.id)}
              className="relative flex h-6 w-6 items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ga naar ${section.title}`}
            >
              <motion.span
                className="rounded-full bg-zinc-600"
                initial={false}
                animate={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  backgroundColor: isActive ? activeColors.dot : '#52525b',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              />

              {/* Active ring */}
              {isActive && (
                <motion.span
                  className="absolute rounded-full border-2"
                  style={{ borderColor: activeColors.ring }}
                  initial={{ width: 12, height: 12, opacity: 0 }}
                  animate={{ width: 20, height: 20, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              )}
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}
