import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface PhotoAngleChangerProps {
  chairName: string;
  images: {
    hero: string;
    room: string;
    joint: string;
    angle: string;
    scale: string;
  };
  woodName: string;
  price: number;
}

export const PhotoAngleChanger: React.FC<PhotoAngleChangerProps> = ({
  chairName,
  images,
  woodName,
  price,
}) => {
  const angles = [
    { key: 'hero', label: 'Primary Studio View', short: 'Studio', src: images.hero },
    { key: 'angle', label: 'Three-Quarter Perspective', short: 'Angle', src: images.angle },
    { key: 'joint', label: 'Joinery & Grain Detail', short: 'Joinery', src: images.joint },
    { key: 'room', label: 'In-Room Architectural Light', short: 'Room', src: images.room },
    { key: 'scale', label: 'Ergonomic Silhouette', short: 'Scale', src: images.scale },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const nextAngle = () => {
    setCurrentIndex((prev) => (prev + 1) % angles.length);
  };

  const prevAngle = () => {
    setCurrentIndex((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const currentAngle = angles[currentIndex];

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-cream border border-walnut/10 shadow-luxury select-none">
      {/* Top Bar: Angle indicator and Zoom/Counter Controls */}
      <div className="absolute top-3 inset-x-3 sm:top-6 sm:inset-x-6 z-10 flex items-center justify-between pointer-events-none">
        {/* Left Perspective Pill */}
        <div className="glass-pill px-2.5 py-1 sm:px-4 sm:py-2 rounded-full border border-walnut/10 flex items-center gap-1.5 shadow-subtle">
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brass" />
          <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold text-walnut">
            {currentAngle.short} View
          </span>
        </div>

        {/* Right Counter + Zoom Button */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <div className="glass-pill px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-walnut/10 text-[10px] sm:text-xs font-mono text-ash tabular-nums">
            {currentIndex + 1} / {angles.length}
          </div>

          <button
            onClick={() => setIsZoomOpen(true)}
            className="p-1.5 sm:p-2 rounded-full glass-pill border border-walnut/10 text-walnut/80 hover:text-walnut hover:scale-105 transition-all shadow-subtle"
            aria-label="Zoom image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Photographic Frame with Smooth Crossfade */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAngle.src + currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={currentAngle.src}
              alt={`${chairName} - ${currentAngle.label}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient bottom shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/50 via-transparent to-transparent pointer-events-none" />

        {/* Left / Right Nav Arrows */}
        <button
          onClick={prevAngle}
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full glass-pill border border-walnut/10 text-walnut hover:scale-110 active:scale-95 transition-all shadow-luxury"
          aria-label="Previous perspective"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextAngle}
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full glass-pill border border-walnut/10 text-walnut hover:scale-110 active:scale-95 transition-all shadow-luxury"
          aria-label="Next perspective"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Floating Angle Switcher Pills (Clean Single Row on Mobile) */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-6 sm:inset-x-6 z-10 flex items-center justify-between gap-2">
          {/* Quick Perspective Selector Buttons with .no-scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            {angles.map((ang, idx) => (
              <button
                key={ang.key}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  currentIndex === idx
                    ? 'bg-brass text-walnut shadow-md font-semibold scale-105'
                    : 'glass-pill text-bone/90 hover:text-bone hover:bg-walnut/60'
                }`}
              >
                {ang.short}
              </button>
            ))}
          </div>

          {/* Desktop Wood & Price Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-bone/90 font-mono flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>{woodName} · ${price}</span>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-walnut/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl bg-bone shadow-luxury border border-walnut/10"
            >
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-walnut/20 text-walnut hover:bg-walnut hover:text-bone transition-colors"
                aria-label="Close zoom modal"
              >
                <X className="w-5 h-5" />
              </button>

              <ImageWithFallback
                src={currentAngle.src}
                alt={`${chairName} - ${currentAngle.label}`}
                className="max-h-[85vh] w-auto object-contain"
              />

              <div className="p-4 text-center text-xs text-ash border-t border-walnut/10 bg-bone">
                {chairName} · {currentAngle.label} (Press Esc to close)
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
