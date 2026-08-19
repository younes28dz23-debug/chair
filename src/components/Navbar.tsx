import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, ChevronDown, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { CHAIRS } from '../data/chairs';

export const Navbar: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { totalItems, toggleDrawer, flyAnimationKey } = useCart();
  const { isScrolled } = useScrollPosition();
  const location = useLocation();
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterChairs = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveChairs = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const featuredChair = CHAIRS[0];
  const searchFilteredChairs = searchQuery.trim()
    ? CHAIRS.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Floating Pill Header */}
      <header className="fixed top-3 sm:top-6 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between transition-all duration-base ease-brand ${
            isScrolled
              ? 'glass-pill-scrolled py-2 sm:py-2.5 px-4 sm:px-6 rounded-full w-full max-w-4xl shadow-luxury'
              : 'glass-pill py-2.5 sm:py-3.5 px-4 sm:px-8 rounded-full w-full max-w-5xl shadow-subtle'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-85 focus-visible:outline-none"
            aria-label="SEDDIA Homepage"
          >
            <Logo className="h-5 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-walnut/80">
            <div
              className="relative py-2"
              onMouseEnter={handleMouseEnterChairs}
              onMouseLeave={handleMouseLeaveChairs}
            >
              <button
                type="button"
                className={`flex items-center gap-1 hover:text-walnut transition-colors ${
                  isMegaMenuOpen ? 'text-walnut font-semibold' : ''
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                <span>Chairs</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180 text-brass' : 'text-ash'
                  }`}
                />
              </button>
            </div>

            <Link
              to="/chairs"
              className="hover:text-walnut transition-colors"
            >
              Collection
            </Link>

            <Link
              to="/workshop"
              className="hover:text-walnut transition-colors"
            >
              Workshop
            </Link>

            <Link
              to="/journal"
              className="hover:text-walnut transition-colors"
            >
              Journal
            </Link>
          </div>

          {/* Right Action Icons & Cart Pill */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-walnut/5 transition-colors text-walnut/70 hover:text-walnut"
              aria-label="Search chairs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button with Count Badge */}
            <button
              id="navbar-cart-button"
              onClick={toggleDrawer}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-walnut text-bone hover:bg-walnut/90 transition-all active:scale-95 shadow-sm"
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brass" />
              <span className="text-xs font-medium uppercase tracking-wider">Cart</span>
              <AnimatePresence mode="popLayout">
                {totalItems > 0 && (
                  <motion.span
                    key={`badge-${flyAnimationKey}-${totalItems}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.35, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-brass text-walnut text-[10px] font-bold tabular-nums"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-walnut/5 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-4 bg-walnut transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-walnut my-1 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-walnut transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* --- MEGA MENU PANEL (Desktop) --- */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <div
            className="fixed top-24 left-0 right-0 z-30 flex justify-center px-4 pointer-events-auto"
            onMouseEnter={handleMouseEnterChairs}
            onMouseLeave={handleMouseLeaveChairs}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl rounded-3xl bg-cream border border-walnut/10 p-8 shadow-luxury"
            >
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: By Typology */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4">
                    By Typology
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'Lounge Chairs', path: '/chairs?type=lounge', count: 5 },
                      { label: 'Dining Chairs', path: '/chairs?type=dining', count: 3 },
                      { label: 'Office & Desk', path: '/chairs?type=office', count: 2 },
                      { label: 'Stools & Valets', path: '/chairs?type=stool', count: 2 },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={item.path}
                          className="flex items-center justify-between text-sm text-walnut/90 hover:text-walnut font-medium transition-colors group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {item.label}
                          </span>
                          <span className="text-xs text-ash/70 tabular-nums">
                            0{item.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: By Timber & Craft */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4">
                    By Solid Timber
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'European Solid Oak', path: '/chairs?wood=oak', tone: 'Light Honey' },
                      { label: 'American Black Walnut', path: '/chairs?wood=walnut', tone: 'Deep Chocolate' },
                      { label: 'Nordic White Ash', path: '/chairs?wood=ash', tone: 'Matte Soap' },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={item.path}
                          className="block text-sm text-walnut/90 hover:text-walnut font-medium transition-colors group"
                        >
                          <div className="group-hover:translate-x-1 transition-transform">
                            <div>{item.label}</div>
                            <div className="text-[11px] text-ash font-normal">{item.tone}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Featured Piece */}
                <div className="bg-bone/80 rounded-2xl p-4 border border-walnut/5 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-brass font-semibold mb-1">
                      Featured Masterpiece
                    </div>
                    <div className="font-serif text-base text-walnut font-medium">
                      {featuredChair.name}
                    </div>
                    <div className="text-xs text-ash line-clamp-2 mt-1">
                      {featuredChair.tagline}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <img
                      src={featuredChair.images.hero}
                      alt={featuredChair.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <Link
                      to={`/chairs/${featuredChair.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-walnut hover:text-brass transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MOBILE NAVIGATION PANEL --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl bg-cream border border-walnut/10 p-6 shadow-luxury md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-5">
              <Link
                to="/chairs"
                className="font-serif text-2xl text-walnut hover:text-brass transition-colors"
              >
                All Chairs (12)
              </Link>
              <Link
                to="/chairs?type=lounge"
                className="text-base text-walnut/80 pl-4 border-l border-walnut/20 hover:text-walnut"
              >
                Lounge Seating
              </Link>
              <Link
                to="/chairs?type=dining"
                className="text-base text-walnut/80 pl-4 border-l border-walnut/20 hover:text-walnut"
              >
                Dining Chairs
              </Link>
              <Link
                to="/chairs?type=office"
                className="text-base text-walnut/80 pl-4 border-l border-walnut/20 hover:text-walnut"
              >
                Desk & Office
              </Link>
              <Link
                to="/workshop"
                className="font-serif text-2xl text-walnut hover:text-brass transition-colors pt-2 border-t border-walnut/10"
              >
                The Workshop
              </Link>
              <Link
                to="/journal"
                className="font-serif text-2xl text-walnut hover:text-brass transition-colors"
              >
                Journal & Care
              </Link>

              <div className="pt-4 border-t border-walnut/10 flex items-center justify-between text-xs text-ash">
                <span>Bristol Workshop · Since 1998</span>
                <span className="text-brass">100% Solid Timber</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- QUICK SEARCH MODAL --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-walnut/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-bone rounded-3xl p-6 shadow-luxury border border-walnut/10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-walnut/10">
                <div className="flex items-center gap-3 w-full">
                  <Search className="w-5 h-5 text-ash" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chairs by name, type, or story..."
                    autoFocus
                    className="w-full bg-transparent text-base text-walnut placeholder:text-ash/60 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-full hover:bg-walnut/5 text-ash hover:text-walnut"
                  aria-label="Close search modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results Preview */}
              <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
                {searchFilteredChairs.length > 0 ? (
                  searchFilteredChairs.map(chair => (
                    <Link
                      key={chair.slug}
                      to={`/chairs/${chair.slug}`}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-cream transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={chair.images.hero}
                          alt={chair.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-serif text-sm text-walnut group-hover:text-brass transition-colors">
                            {chair.name}
                          </div>
                          <div className="text-xs text-ash capitalize">{chair.type} · {chair.designer}</div>
                        </div>
                      </div>
                      <div className="text-sm tabular-nums text-walnut font-medium">
                        ${chair.price}
                      </div>
                    </Link>
                  ))
                ) : searchQuery ? (
                  <div className="py-8 text-center text-sm text-ash">
                    No handcrafted chairs matching &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  <div className="py-4 text-xs uppercase tracking-wider text-ash/80 text-center">
                    Popular: Monolith Lounge, Arc Dining, Fyn Cord Armchair
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
