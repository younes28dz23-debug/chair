import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SplitHeadingProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.12,
  triggerOnView = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1.1, // dur-cinematic
        ease: [0.16, 1, 0.3, 1], // ease-brand
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={containerVariants}
        initial="hidden"
        whileInView={triggerOnView ? 'visible' : undefined}
        animate={!triggerOnView ? 'visible' : undefined}
        viewport={{ once: true, margin: '-10%' }}
      >
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden pb-1">
            <motion.span
              variants={lineVariants}
              className={`block ${lineClassName}`}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
