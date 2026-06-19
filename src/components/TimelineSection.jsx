import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function TimelineSection({
  id,
  title,
  color,
  image,
  background,
  titleAs,
  isHero = false,
  sectionNumber,
  eyebrow,
  accent = 'var(--color-mid-gray)',
  children,
}) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax scroll effect for the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // Stagger animation variants for children. Alleen opacity — de y-beweging
  // laten we aan de children zelf (TimelineItem/kaarten) over, zodat er geen
  // dubbele reveal-systemen botsen. Reduced motion → geen transitie.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const TitleTag = motion[titleAs ?? 'h2'];

  // Hero vult het scherm en centreert verticaal; content-secties volgen hun
  // eigen hoogte met consistent verticaal ritme (geen geforceerde centrering).
  const sectionClass = isHero
    ? 'relative flex min-h-screen items-center overflow-hidden'
    : 'relative overflow-hidden';
  const containerClass = isHero
    ? 'relative z-10 w-full px-6 md:px-12 lg:px-24'
    : 'relative z-10 px-6 py-24 md:px-12 lg:px-24 md:py-32';

  return (
    <section id={id} ref={sectionRef} className={sectionClass}>
      {/* Parallax background image */}
      {image && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-[var(--color-dark)]/60" />
        </motion.div>
      )}

      {/* Optional animated background */}
      {background && <div className="absolute inset-0 z-[1]">{background}</div>}

      {/* Content container */}
      <div className={containerClass}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mx-auto w-full max-w-6xl"
        >
          {/* Sectie-eyebrow — oriëntatie tijdens het scrollen. Content-secties
              krijgen een genummerde eyebrow ("01 — TLE 1"); de hero een rustige
              tekst-eyebrow boven de titel. */}
          {eyebrow && (
            <motion.div variants={childVariants}>
              {isHero ? (
                <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[var(--color-mid-gray)] uppercase">
                  {eyebrow}
                </p>
              ) : (
                <div className="mb-3 flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-[var(--color-mid-gray)] uppercase">
                  {sectionNumber && (
                    <span style={{ color: accent }}>{sectionNumber}</span>
                  )}
                  <span className="h-px w-8 bg-[var(--color-mid-gray)]/40" />
                  <span>{eyebrow}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Title — titleAs="h1" for the page-level intro section */}
          <TitleTag
            variants={childVariants}
            className="mb-8 text-4xl font-bold text-[var(--color-dark)] md:text-5xl lg:text-6xl"
          >
            <span
              className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            >
              {title}
            </span>
          </TitleTag>

          {/* Children with staggered animation */}
          <motion.div variants={containerVariants} className="space-y-6">
            {Array.isArray(children) ? (
              children.map((child, index) => (
                <motion.div key={index} variants={childVariants}>
                  {child}
                </motion.div>
              ))
            ) : (
              <motion.div variants={childVariants}>{children}</motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-cue onderaan de hero */}
      {isHero && !prefersReducedMotion && (
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[var(--color-mid-gray)]"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      )}
    </section>
  );
}
