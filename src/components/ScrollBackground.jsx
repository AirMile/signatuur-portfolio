import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useCallback } from 'react';

const SECTION_IDS = ['intro', 'tle1', 'tle2', 'tle3', 'tle4', 'toekomst'];

const SECTION_COLORS = [
  'oklch(0.59 0.22 18)', // --color-accent-primary (intro/rose)
  'oklch(0.56 0.29 302)', // --color-accent-tle1 (purple)
  'oklch(0.55 0.245 263)', // --color-accent-tle2 (blue)
  'oklch(0.62 0.13 195)', // --color-accent-tle3 (teal)
  'oklch(0.70 0.16 60)', // --color-accent-tle4 (amber)
  'oklch(0.63 0.19 149)', // --color-accent-toekomst (green)
];

const LIGHT_CANVAS = 'oklch(0.98 0.005 265)'; // --color-light

const withAlpha = (oklch, alpha) => oklch.replace(')', ` / ${alpha})`);

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const breakpointsRef = useRef([0, 0.25, 0.5, 0.75, 1]);

  const calculateBreakpoints = useCallback(() => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const earlyTriggerOffset = 0.05;

    const points = SECTION_IDS.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const sectionTop = el.offsetTop;
      const normalizedPosition = sectionTop / docHeight;
      const offset = index === 0 ? 0 : earlyTriggerOffset;
      return Math.max(0, Math.min(1, normalizedPosition - offset));
    });

    points.push(1);
    breakpointsRef.current = points;
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculateBreakpoints, 100);
    window.addEventListener('resize', calculateBreakpoints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateBreakpoints);
    };
  }, [calculateBreakpoints]);

  const background = useTransform(scrollYProgress, (progress) => {
    const breakpoints = breakpointsRef.current;

    let colorIndex = 0;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (progress >= breakpoints[i] && progress < breakpoints[i + 1]) {
        colorIndex = i;
        break;
      }
    }
    if (progress >= breakpoints[breakpoints.length - 2]) {
      colorIndex = SECTION_COLORS.length - 1;
    }

    const color = SECTION_COLORS[colorIndex];

    return `
      linear-gradient(to bottom,
        ${withAlpha(color, '0.18')} 0%,
        ${withAlpha(color, '0.12')} 30%,
        ${withAlpha(color, '0.07')} 60%,
        ${withAlpha(color, '0.03')} 85%,
        ${LIGHT_CANVAS} 100%
      ),
      radial-gradient(ellipse 120% 80% at 50% 0%, ${withAlpha(color, '0.14')} 0%, transparent 50%),
      ${LIGHT_CANVAS}
    `;
  });

  return (
    <motion.div
      className="fixed inset-0 -z-10 transition-colors duration-500"
      style={{ background }}
    />
  );
}
