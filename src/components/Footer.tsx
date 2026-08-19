import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Logo } from './Logo';
import { Reveal } from './Reveal';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="relative bg-walnut text-cream pt-24 pb-12 overflow-hidden border-t border-cream/10">
      {/* Background Rotating Chair Silhouette (10% opacity) */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[700px] h-[700px] opacity-[0.06] pointer-events-none select-none">
        <svg
          viewBox="0 0 256 128"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full animate-[spin_120s_linear_infinite]"
        >
          <path
            d="M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
            fill="#FFFDF9"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Newsletter & Brand Line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-cream/10">
          <div className="lg:col-span-6">
            <Reveal>
              <Logo fill="#F5EFE6" className="h-6 w-auto mb-6" />
              <p className="text-sm md:text-base text-cream/70 max-w-md leading-relaxed">
                Handcrafted solid timber seating designed and manufactured in Bristol, United Kingdom.
                Each piece signed and numbered for enduring provenance.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal delay={0.2}>
              <div className="text-[11px] uppercase tracking-[0.24em] text-brass font-medium mb-3">
                THE SEDDIA DISPATCH
              </div>
              <p className="text-xs text-cream/75 mb-4">
                Seasonal timber harvest notes, new edition launches, and woodcare advice. No spam.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-brass font-medium py-3">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to the SEDDIA workshop dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 rounded-full bg-cream/10 border border-cream/20 px-5 py-3 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-brass px-6 py-3 text-xs font-semibold uppercase tracking-wider text-walnut hover:bg-brass/90 transition-colors flex items-center gap-1 shadow-md"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>

        {/* Four Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs text-cream/70">
          {/* Col 1: Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/chairs?type=lounge" className="hover:text-cream transition-colors">
                  Lounge Chairs (5)
                </Link>
              </li>
              <li>
                <Link to="/chairs?type=dining" className="hover:text-cream transition-colors">
                  Dining Chairs (3)
                </Link>
              </li>
              <li>
                <Link to="/chairs?type=office" className="hover:text-cream transition-colors">
                  Office & Desk (2)
                </Link>
              </li>
              <li>
                <Link to="/chairs?type=stool" className="hover:text-cream transition-colors">
                  Stools & Valets (2)
                </Link>
              </li>
              <li>
                <Link to="/workshop" className="hover:text-cream transition-colors">
                  Timber Samples
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-4">
              The Studio
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/workshop" className="hover:text-cream transition-colors">
                  Workshop Heritage
                </Link>
              </li>
              <li>
                <Link to="/workshop" className="hover:text-cream transition-colors">
                  Sustainable Forestry
                </Link>
              </li>
              <li>
                <Link to="/workshop" className="hover:text-cream transition-colors">
                  Joinery Methodology
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-cream transition-colors">
                  Cabinetmaker Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-4">
              Care & Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/journal" className="hover:text-cream transition-colors">
                  Wood & Cord Care Guide
                </Link>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  White-Glove Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  10-Year Frame Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  Trade & Architect Program
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Standards */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass font-semibold mb-4">
              Standards
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  FSC-C104829 Chain of Custody
                </span>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  Zero Plastic Pledge
                </span>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-cream transition-colors cursor-pointer">
                  Terms of Craft & Sale
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Serif Wordmark */}
        <div className="pt-8 pb-12 overflow-hidden select-none">
          <div className="font-serif text-[clamp(3.5rem,12vw,10.5rem)] font-medium leading-[0.85] tracking-[-0.03em] text-cream/10 hover:text-cream/20 transition-colors">
            Sit down.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/50">
          <div>
            © 1998–{new Date().getFullYear()} SEDDIA Workshop Ltd. All rights reserved. Handcrafted in Bristol, UK.
          </div>
          <div className="flex items-center gap-6">
            <span>Crafted with Solid Timber</span>
            <span className="text-brass">100% Repairable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
