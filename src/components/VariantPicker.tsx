import React, { useState } from 'react';
import { Check, Plus, Minus, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { WoodOption, SeatOption } from '../data/chairs';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

interface VariantPickerProps {
  slug: string;
  name: string;
  basePrice: number;
  woods: WoodOption[];
  seats: SeatOption[];
  selectedWood: WoodOption;
  selectedSeat: SeatOption;
  onSelectWood: (wood: WoodOption) => void;
  onSelectSeat: (seat: SeatOption) => void;
  image: string;
}

export const VariantPicker: React.FC<VariantPickerProps> = ({
  slug,
  name,
  basePrice,
  woods,
  seats,
  selectedWood,
  selectedSeat,
  onSelectWood,
  onSelectSeat,
  image,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const currentUnitPrice = basePrice + selectedSeat.priceDelta;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      slug,
      name,
      price: basePrice,
      wood: selectedWood,
      seat: selectedSeat,
      quantity,
      image,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col space-y-7 select-none">
      {/* --- 1. SOLID TIMBER SELECTION --- */}
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="uppercase tracking-wider font-semibold text-walnut">
            1. Frame Timber
          </span>
          <span className="text-ash font-medium text-[11px]">{selectedWood.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {woods.map((wood) => {
            const isSelected = selectedWood.id === wood.id;
            return (
              <button
                key={wood.id}
                onClick={() => onSelectWood(wood)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-brass bg-cream/80 shadow-subtle ring-1 ring-brass'
                    : 'border-walnut/15 bg-bone hover:border-walnut/40'
                }`}
                aria-label={`Select ${wood.name}`}
              >
                <span
                  className="h-7 w-7 rounded-full border border-walnut/20 shadow-inner mb-2 flex items-center justify-center relative"
                  style={{ backgroundColor: wood.hex }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-walnut" />}
                </span>
                <span className="font-serif text-xs text-walnut font-medium">
                  {wood.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-ash tracking-tight mt-0.5">
                  {wood.id === 'oak' ? 'Natural Honey' : wood.id === 'walnut' ? 'Dark Walnut' : 'Light Ash'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- 2. SEAT WEAVE & UPHOLSTERY SELECTION --- */}
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="uppercase tracking-wider font-semibold text-walnut">
            2. Seat Material
          </span>
          <span className="text-ash font-medium text-[11px]">{selectedSeat.name}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {seats.map((seat) => {
            const isSelected = selectedSeat.id === seat.id;
            return (
              <button
                key={seat.id}
                onClick={() => onSelectSeat(seat)}
                className={`relative flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-brass bg-cream/80 shadow-subtle ring-1 ring-brass'
                    : 'border-walnut/15 bg-bone hover:border-walnut/40'
                }`}
                aria-label={`Select ${seat.name}`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span
                    className="h-6 w-6 rounded-full border border-walnut/20 flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: seat.hex }}
                  />
                  <div className="min-w-0">
                    <div className="font-serif text-xs text-walnut font-medium truncate">
                      {seat.name}
                    </div>
                    <div className="text-[10px] text-ash mt-0.5">
                      {seat.priceDelta === 0 ? 'Included' : `+ ${formatPrice(seat.priceDelta)}`}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brass flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- 3. QUANTITY & ADD TO CART CTA --- */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center rounded-full border border-walnut/20 bg-cream/60 px-3 py-2 flex-shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-ash hover:text-walnut transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-mono text-sm tabular-nums text-walnut font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-ash hover:text-walnut transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brass py-3.5 px-6 font-semibold uppercase tracking-widest text-xs text-walnut hover:bg-brass/90 active:scale-[0.98] transition-all shadow-luxury"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Add to Bag · {formatPrice(totalPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- 4. LUXURY TRUST SIGNALS ROW --- */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-walnut/10 text-center text-[11px] text-ash">
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-brass" />
          <span>Complimentary Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-brass" />
          <span>30-Day Home Trial</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-brass" />
          <span>10-Year Guarantee</span>
        </div>
      </div>
    </div>
  );
};
