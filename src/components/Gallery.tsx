import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './ImageWithFallback';

interface GalleryProps {
  images: {
    hero: string;
    room: string;
    joint: string;
    angle: string;
    scale: string;
  };
  chairName: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, chairName }) => {
  const imageList = [
    { src: images.hero, label: 'Studio Profile' },
    { src: images.room, label: 'In-Room Context' },
    { src: images.joint, label: 'Mortise & Tenon Detail' },
    { src: images.angle, label: 'Three-Quarter Angle' },
    { src: images.scale, label: 'Scale & Posture' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % imageList.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
      } else if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageList.length, isZoomOpen]);

  const activeImage = imageList[activeIndex];

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Main Active Image Viewport */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl bg-cream group shadow-luxury border border-walnut/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.src + activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <ImageWithFallback
              src={activeImage.src}
              alt={`${chairName} - ${activeImage.label}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom trigger overlay */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full glass-pill border border-walnut/10 text-walnut/80 hover:text-walnut hover:scale-105 transition-all shadow-subtle opacity-0 group-hover:opacity-100"
          aria-label="Zoom image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Bottom Label Badge */}
        <div className="absolute bottom-4 left-4 glass-pill px-3.5 py-1.5 rounded-full text-xs font-medium text-walnut pointer-events-none">
          <span>{activeImage.label}</span>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-pill border border-walnut/10 text-walnut opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % imageList.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-pill border border-walnut/10 text-walnut opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail Selector Rail */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {imageList.map((img, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream transition-all ${
                isSelected
                  ? 'ring-2 ring-brass ring-offset-2 ring-offset-bone scale-105 shadow-md'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View ${img.label}`}
            >
              <ImageWithFallback
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* --- FULLSCREEN LIGHTBOX ZOOM MODAL --- */}
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
                src={activeImage.src}
                alt={chairName}
                className="max-h-[85vh] w-auto object-contain"
              />

              <div className="p-4 text-center text-xs text-ash border-t border-walnut/10 bg-bone">
                {chairName} · {activeImage.label} (Press Esc to close)
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
