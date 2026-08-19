import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { FeaturedRail } from '../components/FeaturedRail';
import { AboutSection } from '../components/AboutSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ShowroomBand } from '../components/ShowroomBand';

export const Home: React.FC = () => {
  const marqueeItems = [
    'Solid European Hardwood',
    'Mortise & Tenon Joinery',
    'Hand-Tensioned Danish Cord',
    'Kiln-Dried 8% Moisture',
    'Signed & Numbered by the Maker',
    'Cold-Pressed Organic Oils',
    'Bristol Workshop Established 1998',
  ];

  return (
    <main className="w-full overflow-hidden bg-bone">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Slow Infinite Marquee */}
      <Marquee items={marqueeItems} speed={40} />

      {/* 3. Featured Collection Rail */}
      <FeaturedRail />

      {/* 4. The Workshop / About Craft Section */}
      <AboutSection />

      {/* 5. Features Section (Walnut Inverted Theme) */}
      <FeaturesSection />

      {/* 6. Showroom Consultation Band */}
      <ShowroomBand />
    </main>
  );
};
