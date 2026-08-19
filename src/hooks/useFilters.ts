import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState } from '../data/filters';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const types = searchParams.getAll('type');
    const woods = searchParams.getAll('wood');
    const seats = searchParams.getAll('seat');
    const inStock = searchParams.get('inStock') === 'true';
    const sortBy = (searchParams.get('sort') as FilterState['sortBy']) || 'featured';
    
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 400;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1800;

    return {
      type: types,
      wood: woods,
      seat: seats,
      inStockOnly: inStock,
      sortBy,
      priceRange: [minPrice, maxPrice],
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const nextParams = new URLSearchParams(searchParams);

      if (newFilters.type !== undefined) {
        nextParams.delete('type');
        newFilters.type.forEach(t => nextParams.append('type', t));
      }

      if (newFilters.wood !== undefined) {
        nextParams.delete('wood');
        newFilters.wood.forEach(w => nextParams.append('wood', w));
      }

      if (newFilters.seat !== undefined) {
        nextParams.delete('seat');
        newFilters.seat.forEach(s => nextParams.append('seat', s));
      }

      if (newFilters.inStockOnly !== undefined) {
        if (newFilters.inStockOnly) {
          nextParams.set('inStock', 'true');
        } else {
          nextParams.delete('inStock');
        }
      }

      if (newFilters.sortBy !== undefined) {
        if (newFilters.sortBy === 'featured') {
          nextParams.delete('sort');
        } else {
          nextParams.set('sort', newFilters.sortBy);
        }
      }

      if (newFilters.priceRange !== undefined) {
        if (newFilters.priceRange[0] !== 400) {
          nextParams.set('minPrice', String(newFilters.priceRange[0]));
        } else {
          nextParams.delete('minPrice');
        }

        if (newFilters.priceRange[1] !== 1800) {
          nextParams.set('maxPrice', String(newFilters.priceRange[1]));
        } else {
          nextParams.delete('maxPrice');
        }
      }

      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const toggleType = useCallback(
    (typeId: string) => {
      const next = filters.type.includes(typeId)
        ? filters.type.filter(t => t !== typeId)
        : [...filters.type, typeId];
      updateFilters({ type: next });
    },
    [filters.type, updateFilters]
  );

  const toggleWood = useCallback(
    (woodId: string) => {
      const next = filters.wood.includes(woodId)
        ? filters.wood.filter(w => w !== woodId)
        : [...filters.wood, woodId];
      updateFilters({ wood: next });
    },
    [filters.wood, updateFilters]
  );

  const toggleSeat = useCallback(
    (seatId: string) => {
      const next = filters.seat.includes(seatId)
        ? filters.seat.filter(s => s !== seatId)
        : [...filters.seat, seatId];
      updateFilters({ seat: next });
    },
    [filters.seat, updateFilters]
  );

  const setInStock = useCallback(
    (inStock: boolean) => updateFilters({ inStockOnly: inStock }),
    [updateFilters]
  );

  const setSortBy = useCallback(
    (sort: FilterState['sortBy']) => updateFilters({ sortBy: sort }),
    [updateFilters]
  );

  const setPriceRange = useCallback(
    (range: [number, number]) => updateFilters({ priceRange: range }),
    [updateFilters]
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const activeFilterCount =
    filters.type.length +
    filters.wood.length +
    filters.seat.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[0] !== 400 || filters.priceRange[1] !== 1800 ? 1 : 0);

  return {
    filters,
    toggleType,
    toggleWood,
    toggleSeat,
    setInStock,
    setSortBy,
    setPriceRange,
    clearAllFilters,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0,
  };
};
