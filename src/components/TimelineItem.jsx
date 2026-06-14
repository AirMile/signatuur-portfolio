import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';

export function TimelineItem({
  image,
  date,
  title,
  description,
  index,
  tags,
  disableParallax = false,
}) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'end start'],
  });
  const noParallax = disableParallax || prefersReducedMotion;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    noParallax ? ['0%', '0%'] : ['0%', '-40%']
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-8 md:gap-12 lg:gap-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image container - fixed height window that reveals image via parallax */}
      <div className="flex-1 overflow-hidden rounded-2xl shadow-xl">
        <div
          className={`relative overflow-hidden ${disableParallax ? 'h-auto' : 'h-[400px]'}`}
        >
          {!imageError && image ? (
            <motion.img
              style={disableParallax ? {} : { y }}
              src={image}
              alt={title}
              className={
                disableParallax
                  ? 'w-full object-contain'
                  : 'absolute inset-x-0 top-0 min-h-[120%] w-full object-cover object-top'
              }
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[var(--color-light-gray)] text-[var(--color-mid-gray)]">
              <ImageIcon className="h-16 w-16" />
              <span className="text-sm">Voeg afbeelding toe</span>
              <span className="text-xs text-[var(--color-mid-gray)]/70">
                {image}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col justify-center gap-4">
        {/* Date badge */}
        <span className="w-fit rounded-full bg-[var(--color-light-gray)] px-3 py-1 text-sm text-[var(--color-mid-gray)]">
          {date}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--color-dark)]">{title}</h3>

        {/* Description */}
        <p className="leading-relaxed text-[var(--color-mid-gray)]">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="rounded-full border border-[var(--color-accent-tle2)]/30 bg-gradient-to-r from-[var(--color-accent-tle2)]/15 to-[var(--color-accent-tle1)]/15 px-3 py-1 text-xs font-medium text-[var(--color-accent-tle2)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
