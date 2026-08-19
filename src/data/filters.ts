export interface FilterState {
  type: string[];
  wood: string[];
  seat: string[];
  inStockOnly: boolean;
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export const INITIAL_FILTERS: FilterState = {
  type: [],
  wood: [],
  seat: [],
  inStockOnly: false,
  priceRange: [400, 1800],
  sortBy: 'featured',
};

export const FILTER_OPTIONS = {
  types: [
    { id: 'lounge', label: 'Lounge' },
    { id: 'dining', label: 'Dining' },
    { id: 'office', label: 'Desk & Office' },
    { id: 'stool', label: 'Stools & Valets' },
  ],
  woods: [
    { id: 'oak', label: 'Solid Oak' },
    { id: 'walnut', label: 'Black Walnut' },
    { id: 'ash', label: 'White Ash' },
  ],
  seats: [
    { id: 'rush', label: 'River Rush' },
    { id: 'cord', label: 'Danish Cord' },
    { id: 'boucle', label: 'Wool Bouclé' },
    { id: 'leather', label: 'Bridle Leather' },
  ],
  sorts: [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Customer Rating' },
  ],
};
