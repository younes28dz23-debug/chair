import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MobileVIPDock } from './components/MobileVIPDock';
import { PageTransition } from './components/PageTransition';
import { useLenis } from './hooks/useLenis';

// Pages
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Product } from './pages/Product';
import { Workshop } from './pages/Workshop';
import { Journal } from './pages/Journal';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll bridged with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="relative min-h-screen bg-bone text-walnut flex flex-col justify-between selection:bg-brass/20 selection:text-walnut">
      {/* Floating Header */}
      <Navbar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating Mobile VIP Bottom Dock */}
      <MobileVIPDock />

      {/* Page Routing */}
      <div className="flex-1 w-full">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chairs" element={<Collection />} />
            <Route path="/chairs/:slug" element={<Product />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>

      {/* Global Luxury Footer */}
      <Footer />
    </div>
  );
};

export default App;
