import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check, Sparkles, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { CHAIRS } from '../data/chairs';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    state: { items, isDrawerOpen },
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    hasFreeShipping,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'confirmation'>('cart');
  const [shippingForm, setShippingForm] = useState({
    name: 'Elinor Vance',
    email: 'elinor.vance@design.uk',
    address: '24 Royal Crescent, Flat 3',
    city: 'Bath',
    postcode: 'BA1 2LR',
    country: 'United Kingdom',
  });
  const [orderNumber, setOrderNumber] = useState('SD-2026-89421');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll and pause Lenis while drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.__lenis?.start();
    };
  }, [isDrawerOpen]);

  const shippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrderNum = `SD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(randomOrderNum);
    setCheckoutStep('confirmation');
    clearCart();
  };

  const resetDrawer = () => {
    setCheckoutStep('cart');
    closeDrawer();
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={resetDrawer}
            className="fixed inset-0 bg-walnut/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag & Checkout Drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative z-10 flex h-full w-full max-w-lg flex-col bg-bone shadow-2xl border-l border-walnut/10 overscroll-contain"
          >
            {/* --- STEP 1: CART VIEW --- */}
            {checkoutStep === 'cart' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-walnut/10 px-6 py-5">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-walnut">Your Bag</h2>
                    <p className="text-xs uppercase tracking-wider text-ash mt-0.5">
                      {items.length} {items.length === 1 ? 'Handcrafted Piece' : 'Handcrafted Pieces'}
                    </p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="rounded-full p-2 text-walnut/70 hover:bg-walnut/5 hover:text-walnut transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Bar */}
                <div className="bg-cream px-6 py-3.5 border-b border-walnut/10">
                  <div className="flex items-center justify-between text-xs text-walnut mb-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-brass" />
                      {hasFreeShipping ? (
                        <span className="text-walnut font-semibold">Complimentary White-Glove Delivery Unlocked</span>
                      ) : (
                        <span>Add {formatPrice(freeShippingRemaining)} for Free White-Glove Delivery</span>
                      )}
                    </span>
                    <span className="text-ash font-mono">{Math.round(shippingPercent)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-walnut/10">
                    <motion.div
                      className="h-full bg-brass rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${shippingPercent}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-walnut/10">
                  {items.length > 0 ? (
                    items.map((item, index) => {
                      const itemUnitPrice = item.price + item.seat.priceDelta;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="py-4 first:pt-0 last:pb-0 flex gap-4"
                        >
                          {/* Product Thumbnail */}
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover bg-cream border border-walnut/10"
                          />

                          {/* Item Details */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between">
                                <h3 className="font-serif text-sm font-medium text-walnut">
                                  {item.name}
                                </h3>
                                <span className="font-mono text-sm tabular-nums text-walnut font-medium">
                                  {formatPrice(itemUnitPrice * item.quantity)}
                                </span>
                              </div>

                              <div className="mt-1 space-y-0.5 text-xs text-ash">
                                <div>Timber: {item.wood.name}</div>
                                <div>Seat: {item.seat.name}</div>
                              </div>
                            </div>

                            {/* Quantity controls & Remove */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center rounded-full border border-walnut/20 bg-cream/50 px-2 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-ash hover:text-walnut transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-2.5 font-mono text-xs tabular-nums text-walnut font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-ash hover:text-walnut transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-ash hover:text-red-700 transition-colors"
                                aria-label={`Remove ${item.name} from bag`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4 text-ash">
                        <ShieldCheck className="w-8 h-8 text-brass" />
                      </div>
                      <h3 className="font-serif text-lg text-walnut font-medium">Your bag is empty</h3>
                      <p className="text-xs text-ash max-w-xs mt-1">
                        Every piece is made to order in our Bristol workshop and signed by the maker.
                      </p>

                      <div className="mt-8 w-full text-left">
                        <div className="text-[11px] uppercase tracking-wider text-ash font-medium mb-3">
                          Recommended for you
                        </div>
                        <div className="space-y-2">
                          {CHAIRS.slice(0, 2).map((c) => (
                            <Link
                              key={c.slug}
                              to={`/chairs/${c.slug}`}
                              onClick={closeDrawer}
                              className="flex items-center justify-between p-3 rounded-2xl bg-cream/70 hover:bg-cream transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <ImageWithFallback
                                  src={c.images.hero}
                                  alt={c.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-serif text-xs font-medium text-walnut group-hover:text-brass transition-colors">
                                    {c.name}
                                  </div>
                                  <div className="text-[11px] text-ash">{c.designer}</div>
                                </div>
                              </div>
                              <span className="text-xs tabular-nums text-walnut">{formatPrice(c.price)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Summary & Checkout Button */}
                {items.length > 0 && (
                  <div className="border-t border-walnut/10 bg-bone p-6">
                    <div className="space-y-2 text-xs text-ash mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono tabular-nums text-walnut">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>White-Glove Delivery</span>
                        <span className="text-walnut">
                          {hasFreeShipping ? 'Complimentary' : '$65'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-walnut/10 text-sm font-medium text-walnut">
                        <span>Total</span>
                        <span className="font-mono tabular-nums font-semibold">
                          {formatPrice(hasFreeShipping ? subtotal : subtotal + 65)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-brass py-3.5 px-6 font-medium text-walnut transition-all duration-base hover:bg-brass/90 active:scale-[0.98] shadow-luxury"
                    >
                      <span className="text-xs uppercase tracking-widest font-semibold">Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-ash">
                      <ShieldCheck className="h-3.5 w-3.5 text-brass" />
                      <span>10-Year Craft Guarantee · Signed by Maker</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* --- STEP 2: SHIPPING & PAYMENT VIEW --- */}
            {checkoutStep === 'shipping' && (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-walnut/10 px-6 py-5">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-walnut">Checkout Details</h2>
                    <p className="text-xs uppercase tracking-wider text-ash mt-0.5">
                      White-Glove Delivery & Payment
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-ash hover:text-walnut"
                  >
                    Back to Bag
                  </button>
                </div>

                <form onSubmit={handleCompleteOrder} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
                  {/* Delivery Address */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-walnut block mb-3">
                      1. Delivery Destination
                    </span>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-ash mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                          className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-3.5 py-2.5 text-walnut focus:outline-none focus:border-brass"
                        />
                      </div>

                      <div>
                        <label className="block text-ash mb-1">Email for Workshop Updates</label>
                        <input
                          type="email"
                          required
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                          className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-3.5 py-2.5 text-walnut focus:outline-none focus:border-brass"
                        />
                      </div>

                      <div>
                        <label className="block text-ash mb-1">Street Address & Apartment</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                          className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-3.5 py-2.5 text-walnut focus:outline-none focus:border-brass"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-ash mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                            className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-3.5 py-2.5 text-walnut focus:outline-none focus:border-brass"
                          />
                        </div>
                        <div>
                          <label className="block text-ash mb-1">Postal Code</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.postcode}
                            onChange={(e) => setShippingForm({ ...shippingForm, postcode: e.target.value })}
                            className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-3.5 py-2.5 text-walnut focus:outline-none focus:border-brass"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="pt-4 border-t border-walnut/10">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-walnut block mb-3 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-brass" />
                      <span>2. Secure Payment</span>
                    </span>

                    <div className="p-4 rounded-2xl bg-cream/60 border border-walnut/15 space-y-3">
                      <div>
                        <label className="block text-ash mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            defaultValue="4532 •••• •••• 8912"
                            className="w-full rounded-xl border border-walnut/20 bg-bone px-3.5 py-2.5 text-walnut font-mono focus:outline-none focus:border-brass"
                          />
                          <CreditCard className="w-4 h-4 text-ash absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-ash mb-1">Expiry</label>
                          <input
                            type="text"
                            defaultValue="08/29"
                            className="w-full rounded-xl border border-walnut/20 bg-bone px-3.5 py-2.5 text-walnut font-mono focus:outline-none focus:border-brass"
                          />
                        </div>
                        <div>
                          <label className="block text-ash mb-1">CVC</label>
                          <input
                            type="text"
                            defaultValue="482"
                            className="w-full rounded-xl border border-walnut/20 bg-bone px-3.5 py-2.5 text-walnut font-mono focus:outline-none focus:border-brass"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Total & Submit */}
                  <div className="pt-4 border-t border-walnut/10 space-y-3">
                    <div className="flex justify-between text-sm font-medium text-walnut">
                      <span>Total Due</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {formatPrice(hasFreeShipping ? subtotal : subtotal + 65)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-brass py-3.5 px-6 font-medium text-walnut hover:bg-brass/90 transition-all shadow-luxury"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest font-semibold">Place Bespoke Order</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --- STEP 3: ORDER CONFIRMATION / BRISTOL REGISTRY CERTIFICATE --- */}
            {checkoutStep === 'confirmation' && (
              <div className="flex flex-col h-full justify-between p-8 text-center bg-bone">
                <div className="my-auto space-y-6">
                  {/* Success Seal */}
                  <div className="w-16 h-16 rounded-full bg-brass/20 text-brass flex items-center justify-center mx-auto shadow-subtle">
                    <Check className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-brass font-medium block mb-1">
                      BRISTOL WORKSHOP REGISTRY
                    </span>
                    <h2 className="font-serif text-3xl text-walnut font-medium">
                      Order Confirmed
                    </h2>
                  </div>

                  <p className="text-xs text-ash max-w-sm mx-auto leading-relaxed">
                    Thank you, {shippingForm.name}. Your bespoke commission has been assigned to master joiner M. Thorne and logged in our permanent physical workshop registry.
                  </p>

                  {/* Certificate Card */}
                  <div className="p-6 rounded-2xl bg-cream border border-walnut/10 shadow-subtle text-left space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ash">Registry Code:</span>
                      <span className="font-mono font-medium text-walnut">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash">Lead Time:</span>
                      <span className="text-walnut font-medium">3–4 Weeks Handcrafting</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash">Delivery:</span>
                      <span className="text-walnut font-medium">White-Glove to {shippingForm.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash">Guarantee:</span>
                      <span className="text-brass font-medium">10-Year Repair or Replace</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-walnut/10">
                  <button
                    onClick={resetDrawer}
                    className="w-full rounded-full bg-walnut text-bone py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-brass hover:text-walnut transition-colors"
                  >
                    Return to Catalogue
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
