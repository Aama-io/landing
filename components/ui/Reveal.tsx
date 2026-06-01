import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Travel distance in px */
  y?: number;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Lightweight scroll-reveal wrapper. Fades + lifts content into view once.
 * Respects reduced-motion via the global MotionConfig.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export { variants as revealVariants };
