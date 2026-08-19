import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Armchair, Compass, Crown, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { VIPConciergeModal } from './VIPConciergeModal';

export const MobileVIPDock: React.FC = () => {
  const [isVIPOpen, setIsVIPOpen] = useState(false);
  const { totalItems, toggleDrawer } = useCart();
  const location = useLocation();

  const isCollection = location.pathname.startsWith('/chairs');
  const isWorkshop = location.pathname === '/workshop';

  return (
    <>
      {/* Floating Mobile VIP Bottom Dock (Only on mobile/small screens) */}
      <nav
        aria-label="Mobile VIP Navigation Dock"
        className="fixed bottom-4 inset-x-4 z-40 md:hidden pointer-events-none flex justify-center"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-1 p-1.5 rounded-full bg-walnut/95 backdrop-blur-2xl border border-brass/30 shadow-2xl text-bone max-w-sm w-full">
          {/* 1. Collection Link */}
          <Link
            to="/chairs"
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all text-center ${
              isCollection
                ? 'bg-brass text-walnut font-bold shadow-md'
                : 'text-bone/80 hover:text-bone hover:bg-bone/10'
            }`}
          >
            <Armchair className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Chairs</span>
          </Link>

          {/* 2. Workshop Link */}
          <Link
            to="/workshop"
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all text-center ${
              isWorkshop
                ? 'bg-brass text-walnut font-bold shadow-md'
                : 'text-bone/80 hover:text-bone hover:bg-bone/10'
            }`}
          >
            <Compass className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Workshop</span>
          </Link>

          {/* 3. VIP Concierge Trigger (Gold Accent) */}
          <button
            onClick={() => setIsVIPOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all text-center relative group"
            aria-label="Open VIP Client Concierge"
          >
            <div className="relative">
              <Crown className="w-4 h-4 text-brass mb-0.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brass animate-ping opacity-75" />
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-brass">VIP Client</span>
          </button>

          {/* 4. Bag Trigger with Dynamic Badge */}
          <button
            onClick={toggleDrawer}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all text-center hover:bg-bone/10 relative"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-bone/90 mb-0.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 rounded-full bg-brass text-walnut text-[9px] font-bold tabular-nums">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-bone/80">Bag</span>
          </button>
        </div>
      </nav>

      {/* VIP Concierge Modal */}
      <VIPConciergeModal isOpen={isVIPOpen} onClose={() => setIsVIPOpen(false)} />
    </>
  );
};
