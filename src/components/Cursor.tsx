import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'interactive'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null;
      const clickableEl = target.closest('button, a, input, select, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorType('interactive');
      } else if (clickableEl) {
        setCursorText('');
        setCursorType('pointer');
      } else {
        setCursorText('');
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full bg-brass font-sans text-[10px] font-semibold tracking-wider text-walnut uppercase"
        animate={{
          x: position.x - (cursorType === 'interactive' ? 36 : cursorType === 'pointer' ? 14 : 4),
          y: position.y - (cursorType === 'interactive' ? 36 : cursorType === 'pointer' ? 14 : 4),
          width: cursorType === 'interactive' ? 72 : cursorType === 'pointer' ? 28 : 8,
          height: cursorType === 'interactive' ? 72 : cursorType === 'pointer' ? 28 : 8,
          opacity: isVisible ? (cursorType === 'pointer' ? 0.35 : cursorType === 'interactive' ? 0.95 : 0.8) : 0,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 350,
          mass: 0.5,
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="px-1 select-none text-center leading-tight font-medium"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
