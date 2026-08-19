import React, { useMemo } from 'react';
import { CHAIRS, Chair } from '../data/chairs';
import { FilterBar } from '../components/FilterBar';
import { ChairCard } from '../components/ChairCard';
import { Reveal } from '../components/Reveal';
import { SplitHeading } from '../components/SplitHeading';
import { useFilters } from '../hooks/useFilters';
import { RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export const Collection: React.FC = () => {
  const { filters, clearAllFilters } = useFilters();

  const filteredChairs = useMemo(() => {
    return CHAIRS.filter((chair) => {
      // Filter by Type
      if (filters.type.length > 0 && !filters.type.includes(chair.type)) {
        return false;
      }

      // Filter by Wood
      if (filters.wood.length > 0) {
        const chairWoodIds = chair.woods.map((w) => w.id);
        const hasMatchingWood = filters.wood.some((w) => chairWoodIds.includes(w));
        if (!hasMatchingWood) return false;
      }

      // Filter by Seat
      if (filters.seat.length > 0) {
        const chairSeatIds = chair.seats.map((s) => s.id);
        const hasMatchingSeat = filters.seat.some((s) => chairSeatIds.includes(s));
        if (!hasMatchingSeat) return false;
      }

      // Filter by In-Stock
      if (filters.inStockOnly && chair.stock <= 0) {
        return false;
      }

      // Filter by Price Range
      if (chair.price < filters.priceRange[0] || chair.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a: Chair, b: Chair) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains catalogue order
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-bone pt-24 sm:pt-32 md:pt-40 pb-36 md:pb-24 text-walnut">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8 sm:mb-10">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass inline-block" />
            <span>THE COMPLETE ARCHIVE · 12 BESPOKE DESIGNS</span>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SplitHeading
            as="h1"
            lines={['Hand-built chairs,', 'catalogued & numbered.']}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.02em] text-walnut max-w-2xl"
          />

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ash max-w-sm leading-relaxed">
              Twelve handcrafted silhouettes engineered for specific ergonomic postures. Available in
              solid European Oak, Black Walnut, and White Ash.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <FilterBar totalCount={filteredChairs.length} allCount={CHAIRS.length} />

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        {filteredChairs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredChairs.map((chair, index) => (
              <Reveal key={chair.slug} delay={(index % 3) * 0.08}>
                <ChairCard chair={chair} priority={index < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center justify-center rounded-3xl bg-cream/50 border border-walnut/10 p-12 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-medium text-walnut mb-2">
              No pieces match this specific filter criteria
            </h3>
            <p className="text-sm text-ash max-w-md mb-6 leading-relaxed">
              Try adjusting your timber or typology filters to explore our complete twelve-chair collection.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-semibold uppercase tracking-wider text-walnut hover:bg-brass/90 transition-colors shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* Workshop Assurance Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="rounded-3xl bg-cream p-8 md:p-12 border border-walnut/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2">
            <ShieldCheck className="w-6 h-6 text-brass" />
            <h4 className="font-serif text-lg font-medium text-walnut">10-Year Frame Guarantee</h4>
            <p className="text-xs text-ash leading-relaxed">
              Every mortise joint is dry-fitted by hand and guaranteed to remain rigid for a decade of domestic living.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <Sparkles className="w-6 h-6 text-brass" />
            <h4 className="font-serif text-lg font-medium text-walnut">Signed by the Maker</h4>
            <p className="text-xs text-ash leading-relaxed">
              The cabinetmaker who shapes your piece brands their unique maker's mark and harvest date on the underside rail.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <RotateCcw className="w-6 h-6 text-brass" />
            <h4 className="font-serif text-lg font-medium text-walnut">30-Day Home Trial</h4>
            <p className="text-xs text-ash leading-relaxed">
              Live with the chair in your natural light. Complimentary white-glove return collection if you are not delighted.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
