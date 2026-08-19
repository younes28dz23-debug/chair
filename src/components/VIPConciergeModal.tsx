import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck, Calendar, Crown, Check, ArrowRight, Phone } from 'lucide-react';

interface VIPConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIPConciergeModal: React.FC<VIPConciergeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'service' | 'details' | 'confirmed'>('service');
  const [selectedService, setSelectedService] = useState<'viewing' | 'commission' | 'sample'>('viewing');
  const [selectedTimber, setSelectedTimber] = useState('English Black Walnut (150-Yr Slow Growth)');
  const [clientName, setClientName] = useState('Lord / Lady Sterling');
  const [clientPhone, setClientPhone] = useState('+44 20 7946 0912');
  const [clientDate, setClientDate] = useState('2026-09-15');
  const [vipCode, setVipCode] = useState('SEDDIA-VIP-0842');

  // Pause Lenis and lock scroll
  useEffect(() => {
    if (isOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      window.__lenis?.start();
      setStep('service');
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.__lenis?.start();
    };
  }, [isOpen]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `VIP-SEDDIA-${Math.floor(1000 + Math.random() * 9000)}`;
    setVipCode(code);
    setStep('confirmed');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-walnut/80 backdrop-blur-md">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-bone shadow-2xl border border-walnut/15 overflow-hidden max-h-[92vh] flex flex-col overscroll-contain"
          >
            {/* Top Gold VIP Banner */}
            <div className="bg-walnut text-bone px-6 py-4 flex items-center justify-between border-b border-brass/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brass/20 text-brass flex items-center justify-center">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brass font-bold">
                    SEDDIA PRIVATE CLIENTELE
                  </div>
                  <div className="font-serif text-sm font-medium">
                    VIP Concierge & Bespoke Studio
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-bone/70 hover:text-bone hover:bg-bone/10 transition-colors"
                aria-label="Close VIP modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain">
              {step === 'service' && (
                <div className="space-y-5">
                  <div className="text-center pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-ash font-medium">
                      Select Private Experience
                    </span>
                    <h3 className="font-serif text-2xl text-walnut font-medium mt-1">
                      How may our guild assist you?
                    </h3>
                  </div>

                  {/* 3 VIP Service Cards */}
                  <div className="space-y-3">
                    {[
                      {
                        id: 'viewing',
                        title: 'Private Bristol Workshop Viewing',
                        desc: 'Exclusive after-hours appointment with Master Joiner Arthur Pendelton to try every silhouette in private.',
                        icon: Sparkles,
                        badge: 'Complimentary Champagne',
                      },
                      {
                        id: 'commission',
                        title: 'Bespoke Rare Timber Commission',
                        desc: 'Hand-pick private timber stock from ancient slow-growth forests (Scottish Elm, Rare Bog Oak, English Walnut).',
                        icon: Crown,
                        badge: 'One-of-a-Kind Provenance',
                      },
                      {
                        id: 'sample',
                        title: 'VIP Timber & Leather Sample Box',
                        desc: 'Delivered to your residence in a hand-crafted wax-sealed linen box with 6 solid timber blocks and bridle leather samples.',
                        icon: ShieldCheck,
                        badge: 'Next-Day Courier',
                      },
                    ].map((item) => {
                      const isSelected = selectedService === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedService(item.id as any)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-brass bg-cream shadow-md ring-1 ring-brass'
                              : 'border-walnut/15 bg-bone hover:bg-cream/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                              <item.icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-brass' : 'text-ash'}`} />
                              <div>
                                <h4 className="font-serif text-base font-medium text-walnut">{item.title}</h4>
                                <p className="text-xs text-ash leading-relaxed mt-1">{item.desc}</p>
                              </div>
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-brass font-bold px-2 py-0.5 rounded-full bg-brass/10 border border-brass/20 flex-shrink-0">
                              {item.badge}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep('details')}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-walnut text-bone py-4 text-xs font-semibold uppercase tracking-widest hover:bg-brass hover:text-walnut transition-colors shadow-luxury mt-4"
                  >
                    <span>Continue to Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 'details' && (
                <form onSubmit={handleConfirm} className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-ash font-medium">
                      Private Client Reservation
                    </span>
                    <h3 className="font-serif text-xl text-walnut font-medium mt-0.5">
                      Client Contact & Timber Preference
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-walnut mb-1">
                      Preferred Timber Sourcing
                    </label>
                    <select
                      value={selectedTimber}
                      onChange={(e) => setSelectedTimber(e.target.value)}
                      className="w-full rounded-xl border border-walnut/20 bg-cream p-3 text-xs text-walnut focus:outline-none focus:border-brass cursor-pointer"
                    >
                      <option>English Black Walnut (150-Yr Slow Growth)</option>
                      <option>Scottish Elm with Burl Accents</option>
                      <option>Quarter-Sawn Heritage English Oak</option>
                      <option>Ancient 5,000-Year British Bog Oak</option>
                      <option>Nordic Bleached White Ash</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-walnut mb-1">
                        Client Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded-xl border border-walnut/20 bg-cream p-3 text-xs text-walnut focus:outline-none focus:border-brass"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-walnut mb-1">
                        Direct Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-xl border border-walnut/20 bg-cream p-3 text-xs text-walnut focus:outline-none focus:border-brass"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-walnut mb-1">
                      Preferred Appointment / Delivery Date
                    </label>
                    <input
                      type="date"
                      value={clientDate}
                      onChange={(e) => setClientDate(e.target.value)}
                      className="w-full rounded-xl border border-walnut/20 bg-cream p-3 text-xs text-walnut focus:outline-none focus:border-brass"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('service')}
                      className="px-5 py-3 rounded-full border border-walnut/20 text-xs font-medium text-walnut hover:bg-cream"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brass text-walnut py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-brass/90 transition-colors shadow-luxury"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Confirm VIP Reservation</span>
                    </button>
                  </div>
                </form>
              )}

              {step === 'confirmed' && (
                <div className="text-center space-y-5 py-4">
                  <div className="w-16 h-16 rounded-full bg-brass/20 text-brass mx-auto flex items-center justify-center shadow-luxury">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-brass font-bold block mb-1">
                      CONFIRMED VIP INVITATION
                    </span>
                    <h3 className="font-serif text-2xl text-walnut font-medium">
                      Your Private Appointment is Secured
                    </h3>
                  </div>

                  {/* VIP Pass Card */}
                  <div className="rounded-2xl bg-cream p-5 border border-brass/40 shadow-subtle text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-walnut/10 pb-2">
                      <span className="text-[10px] uppercase tracking-wider text-ash">VIP Reference</span>
                      <span className="font-mono text-xs font-bold text-walnut">{vipCode}</span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-walnut font-medium">{clientName}</div>
                      <div className="text-ash">{selectedTimber}</div>
                      <div className="text-ash flex items-center gap-1.5 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-brass" />
                        <span>Scheduled: {clientDate} at Bristol Workshop Guild</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-ash leading-relaxed">
                    Senior Joiner Arthur Pendelton has received your bespoke preferences. Our private concierge will reach out via WhatsApp at <strong className="text-walnut">{clientPhone}</strong> within two hours.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:+442079460912`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-walnut text-bone px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-brass hover:text-walnut transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct VIP Hotline</span>
                    </a>

                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto rounded-full border border-walnut/20 px-6 py-3 text-xs font-medium text-walnut hover:bg-cream"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
