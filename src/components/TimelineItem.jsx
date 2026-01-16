import { motion, useScroll, useTransform } from 'motion/react';
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

  // Parallax for image - shifts image within container as user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start when element is 60% down viewport, end when it leaves top
    offset: ['start 0.6', 'end start'],
  });
  // Image starts at top (0%), shifts down (-40%) for faster scroll through image
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ['0%', '0%'] : ['0%', '-40%']
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
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-800/50 text-slate-500">
              <ImageIcon className="h-16 w-16" />
              <span className="text-sm">Voeg afbeelding toe</span>
              <span className="text-xs text-slate-600">{image}</span>
            </div>
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col justify-center gap-4">
        {/* Date badge */}
        <span className="w-fit rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">
          {date}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white">{title}</h3>

        {/* Description */}
        <p className="leading-relaxed text-slate-300">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-indigo-300"
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
