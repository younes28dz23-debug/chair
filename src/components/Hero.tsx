import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SplitHeading } from './SplitHeading';
import { Reveal } from './Reveal';
import { ImageWithFallback } from './ImageWithFallback';
import { WOOD_OPTIONS } from '../data/chairs';

// Number counter helper
const AnimatedStat: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({
  value,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono font-medium tabular-nums text-walnut">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const [selectedWoodKey, setSelectedWoodKey] = useState<'walnut' | 'oak' | 'ash'>('walnut');

  const heroPhotos = {
    walnut: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
    oak: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
    ash: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
  };

  return (
    <section className="relative min-h-[100vh] w-full pt-28 pb-12 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-bone">
      {/* Background ambient lighting vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cream/70 blur-3xl pointer-events-none -z-10" />

      {/* Top Main Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center z-10 text-left">
          <Reveal delay={0.1}>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brass inline-block" />
              <span>HAND-BUILT SEATING · SINCE 1998</span>
            </div>
          </Reveal>

          <SplitHeading
            as="h1"
            lines={["Chairs you'll", "keep for life."]}
            className="font-serif text-[clamp(2.4rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-walnut mb-5 sm:mb-7 text-balance"
            delay={0.2}
          />

          <Reveal delay={0.4}>
            <p className="max-w-[46ch] text-sm sm:text-base md:text-lg text-ash leading-relaxed font-normal mb-8 sm:mb-10">
              Solid European hardwood frames, mortise-and-tenon joinery with zero screws,
              and hand-tensioned seats. Built to order in our Bristol workshop and signed by the maker.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/chairs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-7 py-4 text-xs font-semibold uppercase tracking-widest text-walnut transition-all duration-base hover:bg-brass/90 active:scale-[0.98] shadow-luxury"
              >
                <span>Shop the Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to="/workshop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-walnut/20 px-7 py-4 text-xs font-medium uppercase tracking-widest text-walnut transition-all duration-base hover:bg-walnut/5 hover:border-walnut/40 active:scale-[0.98]"
              >
                <span>See How It's Made</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Flagship Masterpiece Photographic Showcase */}
        <div className="lg:col-span-6 relative flex items-center justify-center mt-4 lg:mt-0">
          <Reveal delay={0.3} className="w-full">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full max-w-[560px] mx-auto rounded-3xl overflow-hidden bg-cream shadow-luxury border border-walnut/10 group">
              {/* Active Timber Photo with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWoodKey}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <ImageWithFallback
                    src={heroPhotos[selectedWoodKey]}
                    alt={`The SEDDIA Monolith Lounge Chair in ${WOOD_OPTIONS[selectedWoodKey].name}`}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Bottom Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent pointer-events-none" />

              {/* Top Left Floating Tag */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 glass-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-walnut/10 shadow-subtle flex items-center gap-1.5 sm:gap-2 pointer-events-none">
                <Sparkles className="w-3 h-3 text-brass" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-walnut">
                  The Monolith · $1,280
                </span>
              </div>

              {/* Top Right 10-Year Frame Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 glass-pill px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-walnut/10 text-[9px] sm:text-[10px] uppercase tracking-wider font-medium text-ash flex items-center gap-1 pointer-events-none">
                <ShieldCheck className="w-3 h-3 text-brass" />
                <span>10-Yr Warranty</span>
              </div>

              {/* Bottom Interactive Swatch Bar */}
              <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 glass-pill p-3 sm:p-3.5 rounded-2xl border border-walnut/10 shadow-luxury flex items-center justify-between">
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ash font-medium">
                    Live Timber Finish
                  </div>
                  <div className="font-serif text-xs sm:text-sm font-medium text-walnut">
                    {WOOD_OPTIONS[selectedWoodKey].name}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  {(['walnut', 'oak', 'ash'] as const).map((key) => {
                    const isSelected = selectedWoodKey === key;
                    const opt = WOOD_OPTIONS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedWoodKey(key)}
                        className={`relative h-6 w-6 sm:h-7 sm:w-7 rounded-full transition-all flex items-center justify-center p-0.5 ${
                          isSelected
                            ? 'ring-2 ring-brass ring-offset-2 ring-offset-bone scale-110'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        title={opt.name}
                        aria-label={`Preview in ${opt.name}`}
                      >
                        <span
                          className="block h-full w-full rounded-full border border-walnut/20 shadow-inner"
                          style={{ backgroundColor: opt.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Stat Row */}
      <div className="max-w-7xl mx-auto w-full mt-10 pt-6 border-t border-walnut/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs text-ash">
        <Reveal delay={0.65}>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-serif text-walnut">
              <AnimatedStat value={12} suffix=" yr" />
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ash mt-0.5">
              Average Lifespan
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.72}>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-serif text-walnut">
              <AnimatedStat value={100} suffix="%" />
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ash mt-0.5">
              FSC Hardwood
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.79}>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-serif text-walnut">
              <AnimatedStat value={4} suffix=" wks" />
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ash mt-0.5">
              Bespoke Lead Time
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.86}>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-serif text-walnut">
              Complimentary
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ash mt-0.5">
              UK White-Glove
            </span>
          </div>
        </Reveal>
      </div>

      {/* Scroll Down Cue */}
      <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.24em] text-ash/80 mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-ash/60"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </section>
  );
};
