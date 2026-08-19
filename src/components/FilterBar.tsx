import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters } from '../hooks/useFilters';
import { FILTER_OPTIONS } from '../data/filters';
import { WOOD_OPTIONS } from '../data/chairs';

interface FilterBarProps {
  totalCount: number;
  allCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ totalCount, allCount }) => {
  const {
    filters,
    toggleType,
    toggleWood,
    setInStock,
    setSortBy,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop sort dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSortOpen(false);
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const categories = [
    { id: '', label: 'All Pieces' },
    { id: 'lounge', label: 'Lounge' },
    { id: 'dining', label: 'Dining' },
    { id: 'office', label: 'Office' },
    { id: 'stool', label: 'Stools' },
  ];

  const currentSortLabel =
    FILTER_OPTIONS.sorts.find((s) => s.id === filters.sortBy)?.label || 'Featured';

  return (
    <>
      <div className="sticky top-16 md:top-20 z-30 w-full bg-bone/95 backdrop-blur-xl border-y border-walnut/10 py-3 px-4 sm:px-6 md:px-12 transition-all shadow-subtle">
        <div className="max-w-7xl mx-auto">
          {/* ========================================================================= */}
          {/* 1. MOBILE LAYOUT (< md): Sleek 2-line structure without scrollbars */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-2.5 md:hidden">
            {/* Top Sub-Row: Total Count + Filter / Sort Drawer Trigger */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-ash font-mono tabular-nums">
                <span className="font-semibold text-walnut">{totalCount}</span> of {allCount} Pieces
              </span>

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border shadow-sm transition-all ${
                  hasActiveFilters
                    ? 'bg-brass text-walnut border-brass'
                    : 'bg-cream border-walnut/20 text-walnut'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3 text-walnut" />
                <span>{currentSortLabel}</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-walnut text-bone text-[9px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Bottom Sub-Row: Category Tabs (Smooth Horizontal Swipe with NO scrollbars) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
              {categories.map((cat) => {
                const isSelected =
                  cat.id === ''
                    ? filters.type.length === 0
                    : filters.type.includes(cat.id);

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === '') {
                        filters.type.forEach((t) => toggleType(t));
                      } else {
                        toggleType(cat.id);
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                      isSelected
                        ? 'bg-walnut text-bone shadow-sm font-semibold'
                        : 'bg-cream text-walnut/80 hover:text-walnut'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. DESKTOP LAYOUT (md and up): Full 2-row layout with timber chips */}
          {/* ========================================================================= */}
          <div className="hidden md:flex flex-col gap-3">
            {/* Top Row: Categories & Custom Sort Popover */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => {
                  const isSelected =
                    cat.id === ''
                      ? filters.type.length === 0
                      : filters.type.includes(cat.id);

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (cat.id === '') {
                          filters.type.forEach((t) => toggleType(t));
                        } else {
                          toggleType(cat.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-walnut text-bone shadow-md'
                          : 'bg-cream text-walnut/80 hover:text-walnut hover:bg-walnut/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Right: Counter & Custom Desktop Sort Popover */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-xs text-ash font-mono tabular-nums">
                  Showing <span className="font-semibold text-walnut">{totalCount}</span> of {allCount} Pieces
                </div>

                <div className="relative" ref={sortDropdownRef}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-ash">Sort:</span>
                    <button
                      type="button"
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-base border ${
                        isSortOpen
                          ? 'bg-cream border-brass shadow-sm text-walnut'
                          : 'bg-cream/80 border-walnut/15 text-walnut hover:border-walnut/30 hover:bg-cream'
                      }`}
                      aria-expanded={isSortOpen}
                    >
                      <span className="font-semibold">{currentSortLabel}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-ash transition-transform duration-base ${
                          isSortOpen ? 'rotate-180 text-brass' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Luxury Animated Popover */}
                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-bone/95 backdrop-blur-2xl p-1.5 shadow-luxury border border-walnut/15 z-50 overflow-hidden"
                      >
                        <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-ash font-semibold border-b border-walnut/10 mb-1">
                          Arrange Collection
                        </div>

                        <div className="space-y-0.5">
                          {FILTER_OPTIONS.sorts.map((s) => {
                            const isSelected = filters.sortBy === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                  setSortBy(s.id as any);
                                  setIsSortOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                                  isSelected
                                    ? 'bg-cream text-walnut font-semibold shadow-inner'
                                    : 'text-walnut/80 hover:text-walnut hover:bg-cream/60'
                                }`}
                              >
                                <span>{s.label}</span>
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-brass stroke-[2.5]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Row: Quick Timber & In-Stock Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-walnut/5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-ash font-medium mr-1 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brass" />
                  <span>Timber Finish:</span>
                </span>

                {FILTER_OPTIONS.woods.map((wood) => {
                  const isSelected = filters.wood.includes(wood.id);
                  const woodOption = WOOD_OPTIONS[wood.id];
                  return (
                    <button
                      key={wood.id}
                      onClick={() => toggleWood(wood.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'border-brass bg-brass text-walnut font-semibold shadow-sm'
                          : 'border-walnut/15 bg-cream/50 text-walnut hover:border-walnut/40'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-walnut/20 shadow-inner"
                        style={{ backgroundColor: woodOption?.hex || '#D7C4A5' }}
                      />
                      <span>{wood.label}</span>
                    </button>
                  );
                })}

                {/* In-Stock Toggle */}
                <button
                  onClick={() => setInStock(!filters.inStockOnly)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filters.inStockOnly
                      ? 'border-brass bg-brass text-walnut font-semibold shadow-sm'
                      : 'border-walnut/15 bg-cream/50 text-walnut hover:border-walnut/40'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      filters.inStockOnly ? 'bg-walnut' : 'bg-ash/40'
                    }`}
                  />
                  <span>In Stock Only</span>
                </button>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 text-xs text-ash hover:text-walnut transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER & SORT BOTTOM SHEET MODAL (< md) --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-walnut/70 backdrop-blur-sm md:hidden">
            <div className="absolute inset-0" onClick={() => setIsMobileFilterOpen(false)} />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              className="relative z-10 w-full rounded-t-3xl bg-bone border-t border-walnut/15 p-6 shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain"
            >
              {/* Sheet Drag Handle */}
              <div className="w-12 h-1 rounded-full bg-walnut/20 mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-walnut/10 pb-3 mb-5">
                <div>
                  <h3 className="font-serif text-lg font-medium text-walnut">Filters & Arrange</h3>
                  <p className="text-[11px] text-ash font-mono">{totalCount} of {allCount} Pieces Matching</p>
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-full bg-cream text-walnut hover:bg-walnut hover:text-bone transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Sort Options */}
              <div className="mb-5">
                <span className="text-[10px] uppercase tracking-widest text-ash font-semibold block mb-2">
                  Arrange By
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {FILTER_OPTIONS.sorts.map((s) => {
                    const isSelected = filters.sortBy === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSortBy(s.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-walnut text-bone border-walnut font-medium shadow-sm'
                            : 'bg-cream border-walnut/10 text-walnut'
                        }`}
                      >
                        <span className="truncate">{s.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brass" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Timber Finishes */}
              <div className="mb-5">
                <span className="text-[10px] uppercase tracking-widest text-ash font-semibold block mb-2">
                  Solid Hardwood Finish
                </span>
                <div className="space-y-2">
                  {FILTER_OPTIONS.woods.map((wood) => {
                    const isSelected = filters.wood.includes(wood.id);
                    const woodOption = WOOD_OPTIONS[wood.id];
                    return (
                      <button
                        key={wood.id}
                        onClick={() => toggleWood(wood.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-cream border-brass shadow-sm ring-1 ring-brass'
                            : 'bg-bone border-walnut/15 text-walnut'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-walnut/20 shadow-inner"
                            style={{ backgroundColor: woodOption?.hex || '#D7C4A5' }}
                          />
                          <span className="text-xs font-medium text-walnut">{wood.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-brass" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Availability */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-ash font-semibold block mb-2">
                  Availability
                </span>
                <button
                  onClick={() => setInStock(!filters.inStockOnly)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    filters.inStockOnly
                      ? 'bg-cream border-brass shadow-sm ring-1 ring-brass'
                      : 'bg-bone border-walnut/15 text-walnut'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-medium text-walnut">
                    <span className={`w-2.5 h-2.5 rounded-full ${filters.inStockOnly ? 'bg-brass' : 'bg-ash/40'}`} />
                    <span>In Stock Only (Ready to Dispatch)</span>
                  </div>
                  {filters.inStockOnly && <Check className="w-4 h-4 text-brass" />}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-walnut/10">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-3.5 rounded-full border border-walnut/20 text-xs font-medium text-walnut hover:bg-cream"
                  >
                    Reset
                  </button>
                )}

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-walnut text-bone py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-brass hover:text-walnut transition-colors shadow-luxury"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brass" />
                  <span>Show {totalCount} Pieces</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
