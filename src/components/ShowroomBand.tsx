import React, { useState } from 'react';
import { MapPin, Clock, Calendar, ArrowRight, Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { SplitHeading } from './SplitHeading';
import { ImageWithFallback } from './ImageWithFallback';

export const ShowroomBand: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', date: '', guests: '1' });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsBooked(false);
      setFormData({ name: '', email: '', date: '', guests: '1' });
    }, 2000);
  };

  return (
    <>
      <section className="relative py-28 md:py-36 bg-bone text-walnut overflow-hidden border-t border-walnut/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Workshop & Showroom Photography */}
            <div className="lg:col-span-6 relative">
              <Reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cream shadow-luxury">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop"
                    alt="SEDDIA Bristol Showroom & Workshop Sanctuary"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 glass-pill px-4 py-2 rounded-full text-xs font-medium text-walnut">
                    <span>Bristol Workshop & Design Gallery</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Address, Hours, & Booking Trigger */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal>
                <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brass inline-block" />
                  <span>VISIT THE STUDIO</span>
                </div>
              </Reveal>

              <SplitHeading
                as="h2"
                lines={['Experience the timber', 'in natural daylight.']}
                className="font-serif text-3xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-walnut mb-6"
              />

              <Reveal delay={0.2}>
                <p className="text-base text-ash leading-relaxed font-normal mb-8">
                  Chairs should be tested with all five senses. Visit our sunlit timber loft
                  in Bristol to feel the grain, test seat heights against dining tables, and discuss
                  custom timbers with our head joiners over espresso.
                </p>
              </Reveal>

              {/* Showroom Details */}
              <Reveal delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-walnut/10 mb-8 text-xs text-ash">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium text-walnut uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-brass" />
                      <span>Address</span>
                    </div>
                    <div>14 Merchant Yard, Harbourside</div>
                    <div>Bristol, BS1 6XN · United Kingdom</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium text-walnut uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-brass" />
                      <span>Opening Hours</span>
                    </div>
                    <div>Tuesday – Saturday: 10:00 – 18:00</div>
                    <div>Sunday: By Private Appointment</div>
                  </div>
                </div>
              </Reveal>

              {/* Booking CTA */}
              <Reveal delay={0.4}>
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-walnut px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-walnut hover:bg-walnut hover:text-bone transition-all duration-base active:scale-[0.98] shadow-subtle"
                  >
                    <Calendar className="w-4 h-4 text-brass" />
                    <span>Book a Showroom Consultation</span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOWROOM BOOKING MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-bone p-8 shadow-luxury border border-walnut/10 relative">
            <h3 className="font-serif text-2xl text-walnut font-medium mb-2">
              Book a Showroom Visit
            </h3>
            <p className="text-xs text-ash mb-6">
              Reserve 45 minutes with a master furniture consultant at our Bristol workshop.
            </p>

            {isBooked ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brass/20 text-brass flex items-center justify-center mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-serif text-lg text-walnut font-medium">Consultation Confirmed</div>
                <div className="text-xs text-ash mt-1">We look forward to welcoming you to the workshop.</div>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-ash font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-4 py-2.5 text-walnut focus:outline-none focus:border-brass"
                    placeholder="Elinor Vance"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-ash font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-4 py-2.5 text-walnut focus:outline-none focus:border-brass"
                    placeholder="elinor@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-ash font-medium mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-4 py-2.5 text-walnut focus:outline-none focus:border-brass"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-ash font-medium mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={e => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full rounded-xl border border-walnut/20 bg-cream/50 px-4 py-2.5 text-walnut focus:outline-none focus:border-brass"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3+ (Design Team)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-walnut/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-ash hover:text-walnut text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-walnut hover:bg-brass/90 shadow-md"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
