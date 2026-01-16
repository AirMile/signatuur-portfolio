import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useCallback } from 'react';

// Section IDs in order (must match the sections in App.jsx)
const SECTION_IDS = ['intro', 'tle1', 'tle2', 'toekomst'];

// Section colors - muted, darker variants for subtle background
const SECTION_COLORS = [
  '#9f1239', // rose-800 (intro)
  '#7e22ce', // purple-700 (tle1)
  '#1d4ed8', // blue-700 (tle2)
  '#15803d', // green-700 (toekomst)
];

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  // Use ref so the callback always sees the latest breakpoints
  const breakpointsRef = useRef([0, 0.25, 0.5, 0.75, 1]);

  // Calculate breakpoints based on actual section positions
  const calculateBreakpoints = useCallback(() => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    // Offset to trigger color change slightly before reaching section (5% earlier)
    const earlyTriggerOffset = 0.05;

    const points = SECTION_IDS.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      // Use the section's top position as trigger point
      const sectionTop = el.offsetTop;
      const normalizedPosition = sectionTop / docHeight;
      // Apply early trigger offset (except for first section)
      const offset = index === 0 ? 0 : earlyTriggerOffset;
      return Math.max(0, Math.min(1, normalizedPosition - offset));
    });

    // Add end point
    points.push(1);
    breakpointsRef.current = points;
  }, []);

  // Recalculate on mount and resize
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(calculateBreakpoints, 100);

    window.addEventListener('resize', calculateBreakpoints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateBreakpoints);
    };
  }, [calculateBreakpoints]);

  // Determine current section color based on scroll position
  const background = useTransform(scrollYProgress, (progress) => {
    const breakpoints = breakpointsRef.current;

    // Find which section we're in based on dynamic breakpoints
    let colorIndex = 0;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (progress >= breakpoints[i] && progress < breakpoints[i + 1]) {
        colorIndex = i;
        break;
      }
    }
    // Handle end of page
    if (progress >= breakpoints[breakpoints.length - 2]) {
      colorIndex = SECTION_COLORS.length - 1;
    }

    const color = SECTION_COLORS[colorIndex];

    // Subtle gradient with lower opacity for a muted look
    return `
      linear-gradient(to bottom,
        ${color}66 0%,
        ${color}44 30%,
        ${color}22 60%,
        ${color}11 85%,
        #0f172a 100%
      ),
      radial-gradient(ellipse 120% 80% at 50% 0%, ${color}44 0%, transparent 50%),
      #0f172a
    `;
  });

  return (
    <motion.div
      className="fixed inset-0 -z-10 transition-colors duration-500"
      style={{ background }}
    />
  );
}
