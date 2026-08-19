import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { Chair, WoodOption } from '../data/chairs';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ChairCardProps {
  chair: Chair;
  priority?: boolean;
}

export const ChairCard: React.FC<ChairCardProps> = ({ chair, priority = false }) => {
  const [selectedWood, setSelectedWood] = useState<WoodOption>(chair.woods[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  // Active authentic photograph matching the selected timber finish
  const activeWoodPhoto =
    chair.woodImages?.[selectedWood.id] || chair.images.hero;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      slug: chair.slug,
      name: chair.name,
      price: chair.price,
      wood: selectedWood,
      seat: chair.seats[0],
      quantity: 1,
      image: activeWoodPhoto,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article className="group relative flex flex-col justify-between select-none">
      {/* Product Image Frame */}
      <Link
        to={`/chairs/${chair.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-cream/50 transition-all duration-slow ease-brand"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Active Real Wood Finish Photograph */}
        <div className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <ImageWithFallback
            src={activeWoodPhoto}
            alt={`${chair.name} in ${selectedWood.name}`}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-slow ease-brand"
          />
        </div>

        {/* Hover In-Room Lifestyle Context */}
        <div className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <ImageWithFallback
            src={chair.images.room}
            alt={`${chair.name} in architectural room setting`}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-slow ease-brand"
          />
        </div>

        {/* Badges: New / Last Few */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
          {chair.isNew && (
            <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] text-walnut shadow-sm">
              New Addition
            </span>
          )}
          {chair.isLastFew && (
            <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] text-brass shadow-sm">
              Only {chair.stock} Remaining
            </span>
          )}
        </div>

        {/* Quick Add Button Overlay on Hover */}
        <div className="absolute inset-x-4 bottom-4 z-10 transition-all duration-base ease-brand translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            className={`w-full flex items-center justify-center gap-2 rounded-full py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-fast shadow-luxury ${
              isAdded
                ? 'bg-walnut text-bone'
                : 'bg-bone/95 text-walnut hover:bg-brass hover:text-walnut backdrop-blur-md'
            }`}
            aria-label={`Quick add ${chair.name} in ${selectedWood.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-brass" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add · {selectedWood.name.split(' ')[0]}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-4 flex flex-col space-y-1.5">
        {/* Designer Attribution */}
        <div className="text-[11px] uppercase tracking-[0.2em] text-ash">
          {chair.designer} · {chair.year}
        </div>

        {/* Product Name & Price */}
        <div className="flex items-baseline justify-between gap-2">
          <Link
            to={`/chairs/${chair.slug}`}
            className="font-serif text-base font-medium text-walnut hover:text-brass transition-colors line-clamp-1"
          >
            {chair.name}
          </Link>
          <span className="font-mono text-sm tabular-nums text-walnut font-normal">
            {formatPrice(chair.price)}
          </span>
        </div>

        {/* Wood Swatch Dots with Generous Mobile Touch Targets */}
        <div className="flex items-center gap-1.5 pt-1">
          {chair.woods.map((wood) => {
            const isSelected = selectedWood.id === wood.id;
            return (
              <button
                key={wood.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedWood(wood);
                }}
                className="group/swatch relative p-1.5 -m-1 focus:outline-none"
                aria-label={`Select ${wood.name}`}
                title={wood.name}
              >
                <span className={`relative block h-4 w-4 sm:h-3.5 sm:w-3.5 rounded-full transition-transform ${
                  isSelected ? 'scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
                }`}>
                  <span
                    className="block h-full w-full rounded-full border border-walnut/20 shadow-inner"
                    style={{ backgroundColor: wood.hex }}
                  />
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-full border border-brass ring-1 ring-brass" />
                  )}
                </span>
              </button>
            );
          })}
          <span className="text-[11px] text-ash ml-1 font-medium">
            {selectedWood.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </article>
  );
};
