import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHAIRS } from '../data/chairs';
import { ChairCard } from './ChairCard';
import { Reveal } from './Reveal';
import { SplitHeading } from './SplitHeading';

export const FeaturedRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [skew, setSkew] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
  const featuredChairs = CHAIRS.slice(0, 6);

  // Velocity skew calculation during scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let lastScrollLeft = rail.scrollLeft;
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const delta = rail.scrollLeft - lastScrollLeft;
      lastScrollLeft = rail.scrollLeft;

      // Map velocity to a clamped subtle skew angle (±2.5deg)
      const calculatedSkew = Math.max(Math.min(delta * 0.05, 2.5), -2.5);
      setSkew(calculatedSkew);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSkew(0);
      }, 150);
    };

    rail.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const rail = railRef.current;
    if (!rail) return;
    setIsDragging(true);
    setStartX(e.pageX - rail.offsetLeft);
    setScrollLeftState(rail.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const rail = railRef.current;
    if (!rail) return;
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    rail.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollLeft = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 md:py-40 bg-bone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-3">
              THE PERMANENT ARCHIVE
            </div>
          </Reveal>

          <SplitHeading
            as="h2"
            lines={['Iconic seating,', 'built for generations.']}
            className="font-serif text-3xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-walnut"
          />
        </div>

        {/* Action buttons + link */}
        <Reveal delay={0.2} className="flex items-center gap-4">
          <Link
            to="/chairs"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-walnut hover:text-brass transition-colors"
          >
            <span>View All 12 Pieces</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-full border border-walnut/15 text-walnut/70 hover:text-walnut hover:border-walnut/40 transition-colors"
              aria-label="Scroll rail left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-full border border-walnut/15 text-walnut/70 hover:text-walnut hover:border-walnut/40 transition-colors"
              aria-label="Scroll rail right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Horizontal Scroll-Snap Rail with Drag */}
      <div
        ref={railRef}
        data-cursor="DRAG"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex gap-8 overflow-x-auto scrollbar-none px-6 md:px-12 snap-x snap-mandatory py-4 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {featuredChairs.map((chair, index) => (
          <div
            key={chair.slug}
            className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start transition-transform duration-150 ease-out"
            style={{
              transform: `skewX(${skew}deg)`,
            }}
          >
            <Reveal delay={index * 0.08}>
              <ChairCard chair={chair} priority={index < 2} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
};
