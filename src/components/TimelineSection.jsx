import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function TimelineSection({
  id,
  title,
  period,
  color,
  image,
  background,
  children,
}) {
  const sectionRef = useRef(null);

  // Parallax scroll effect for the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // Stagger animation variants for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
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
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      {/* Optional animated background */}
      {background && <div className="absolute inset-0 z-[1]">{background}</div>}

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-20 md:px-12 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mx-auto w-full max-w-6xl"
        >
          {/* Period badge */}
          {period && (
            <motion.div variants={childVariants}>
              <span
                className={`mb-4 inline-block rounded-full bg-gradient-to-r ${color} px-4 py-1.5 text-sm font-medium text-white shadow-lg`}
              >
                {period}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            variants={childVariants}
            className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            <span
              className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            >
              {title}
            </span>
          </motion.h2>

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
    </section>
  );
}
