import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, Sparkles } from 'lucide-react';
import { CHAIRS, WoodOption, SeatOption } from '../data/chairs';
import { formatPrice } from '../utils/formatPrice';
import { PhotoAngleChanger } from '../components/PhotoAngleChanger';
import { Gallery } from '../components/Gallery';
import { VariantPicker } from '../components/VariantPicker';
import { Accordion } from '../components/Accordion';
import { DimensionDiagram } from '../components/DimensionDiagram';
import { Reviews } from '../components/Reviews';
import { ChairCard } from '../components/ChairCard';
import { Reveal } from '../components/Reveal';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const chair = CHAIRS.find((c) => c.slug === slug);

  if (!chair) {
    return <Navigate to="/chairs" replace />;
  }

  const [selectedWood, setSelectedWood] = useState<WoodOption>(chair.woods[0]);
  const [selectedSeat, setSelectedSeat] = useState<SeatOption>(chair.seats[0]);
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(false);
  const { addItem } = useCart();

  // Reset selected variants when route chair changes
  useEffect(() => {
    if (chair) {
      setSelectedWood(chair.woods[0]);
      setSelectedSeat(chair.seats[0]);
    }
  }, [chair]);

  // Monitor scroll for mobile mini add-to-cart bar
  useEffect(() => {
    const handleScroll = () => {
      const buyColumn = document.getElementById('pdp-buy-column');
      if (buyColumn) {
        const rect = buyColumn.getBoundingClientRect();
        setIsMobileBarVisible(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentUnitPrice = chair.price + selectedSeat.priceDelta;

  const pairedChairs = chair.pairsWith
    ? CHAIRS.filter((c) => chair.pairsWith.includes(c.slug))
    : CHAIRS.slice(0, 3);

  // Accordion Item Configurations
  const accordionItems = [
    {
      id: 'dimensions',
      title: 'Dimensions & Ergonomics',
      content: <DimensionDiagram dimensions={chair.dimensions} />,
    },
    {
      id: 'materials-care',
      title: 'Materials, Timber & Care',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold text-walnut block">Timber Sourcing:</span>
              <span className="text-ash">{chair.materials.timber}</span>
            </div>
            <div>
              <span className="font-semibold text-walnut block">Joinery Standard:</span>
              <span className="text-ash">{chair.materials.joinery}</span>
            </div>
            <div>
              <span className="font-semibold text-walnut block">Surface Finish:</span>
              <span className="text-ash">{chair.materials.finish}</span>
            </div>
            <div>
              <span className="font-semibold text-walnut block">Seat Weave:</span>
              <span className="text-ash">{chair.materials.upholstery}</span>
            </div>
          </div>
          <p className="text-xs text-ash pt-2 border-t border-walnut/10">
            Care: Dust weekly with a soft dry cotton cloth. Apply organic linseed oil balm every 12–18 months to nourish the wood fibers.
          </p>
        </div>
      ),
    },
    {
      id: 'delivery-warranty',
      title: 'White-Glove Delivery & 10-Year Warranty',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-ash">
            <strong className="text-walnut">Complimentary White-Glove Service:</strong> Hand-delivered by our two-person logistics team. Unboxed, inspected in your chosen room, and all protective packaging recycled.
          </p>
          <p className="text-ash">
            <strong className="text-walnut">10-Year Frame Guarantee:</strong> If any joint loosens, creaks, or separates under regular domestic use within a decade, our workshop will repair or replace it at zero expense.
          </p>
        </div>
      ),
    },
    {
      id: 'maker-story',
      title: 'The Cabinetmaker & Provenance',
      content: (
        <div className="space-y-2 text-xs">
          <p className="text-ash">{chair.story}</p>
          <div className="pt-2 text-ash italic">
            Signed and numbered on the underside by the cabinetmaker upon completion.
          </div>
        </div>
      ),
    },
  ];

  const currentImages = {
    ...chair.images,
    hero: chair.woodImages?.[selectedWood.id] || chair.images.hero,
  };

  return (
    <main className="min-h-screen bg-bone pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-ash">
          <Link to="/" className="hover:text-walnut transition-colors">Home</Link>
          <span>/</span>
          <Link to="/chairs" className="hover:text-walnut transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-walnut font-medium">{chair.name}</span>
        </nav>

        {/* --- 1. SIGNATURE MULTI-ANGLE STUDIO PHOTO CHANGER (Top Showcase) --- */}
        <section className="mb-14">
          <PhotoAngleChanger
            chairName={chair.name}
            images={currentImages}
            woodName={selectedWood.name}
            price={currentUnitPrice}
          />
        </section>

        {/* --- 2. MAIN SPLIT: STICKY GALLERY LEFT + BUY COLUMN RIGHT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery & Story */}
          <div className="lg:col-span-7 space-y-8">
            <Gallery images={currentImages} chairName={chair.name} />

            {/* Editorial Narrative */}
            <div className="p-8 rounded-3xl bg-cream/50 border border-walnut/10 space-y-4 shadow-subtle">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ash font-medium">
                <span className="w-2 h-2 rounded-full bg-brass inline-block" />
                <span>The Silhouette Narrative</span>
              </div>
              <h3 className="font-serif text-2xl text-walnut font-medium">
                {chair.tagline}
              </h3>
              <p className="text-sm text-ash leading-relaxed">
                {chair.story}
              </p>
            </div>
          </div>

          {/* Right Column: Buy Details & Variant Selectors */}
          <div id="pdp-buy-column" className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Header / Title */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ash font-medium mb-1">
                {chair.designer} · {chair.year}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-walnut mb-3">
                {chair.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-2 border-b border-walnut/10">
                <span className="font-mono text-2xl tabular-nums text-walnut font-normal">
                  {formatPrice(currentUnitPrice)}
                </span>

                <div className="flex items-center gap-1.5">
                  <div className="flex text-brass">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brass" />
                    ))}
                  </div>
                  <span className="text-xs text-ash font-medium">
                    {chair.rating} ({chair.reviewCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Variant Picker */}
            <VariantPicker
              slug={chair.slug}
              name={chair.name}
              basePrice={chair.price}
              woods={chair.woods}
              seats={chair.seats}
              selectedWood={selectedWood}
              selectedSeat={selectedSeat}
              onSelectWood={setSelectedWood}
              onSelectSeat={setSelectedSeat}
              image={chair.images.hero}
            />

            {/* Technical Accordions */}
            <Accordion items={accordionItems} defaultOpenId="dimensions" />
          </div>
        </div>

        {/* --- 3. FULL-BLEED LIFESTYLE SPREAD --- */}
        <section className="my-24 overflow-hidden rounded-3xl bg-cream shadow-luxury">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <ImageWithFallback
              src={chair.images.room}
              alt={`${chair.name} in lifestyle interior`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 via-transparent to-transparent flex items-end p-8 md:p-16">
              <div className="max-w-xl text-bone">
                <span className="text-[11px] uppercase tracking-[0.24em] text-brass font-medium mb-2 block">
                  LIVING WITH SEDDIA
                </span>
                <h3 className="font-serif text-2xl md:text-4xl font-medium mb-2 leading-tight">
                  Designed for quiet light and enduring conversations.
                </h3>
                <p className="text-xs md:text-sm text-bone/80">
                  Every curve is calibrated to support natural spinal alignment over hours of contemplation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. DETAILED SPECIFICATION TABLE --- */}
        <section className="my-20">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-3">
              TECHNICAL ARCHIVE
            </div>
            <h2 className="font-serif text-3xl font-medium text-walnut mb-8">
              Workshop Build Specifications
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 md:divide-x divide-walnut/10 border-y border-walnut/10 py-6 text-xs">
            <div className="space-y-4 pb-6 md:pb-0">
              {chair.specs.slice(0, 3).map((spec, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-walnut/5">
                  <span className="text-ash uppercase tracking-wider">{spec.label}</span>
                  <span className="text-walnut font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 md:pt-0 md:pl-12">
              {chair.specs.slice(3).map((spec, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-walnut/5">
                  <span className="text-ash uppercase tracking-wider">{spec.label}</span>
                  <span className="text-walnut font-medium">{spec.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b border-walnut/5">
                <span className="text-ash uppercase tracking-wider">Provenance</span>
                <span className="text-brass font-medium">Archived in Bristol Registry</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. "PAIRS WELL WITH" RAIL --- */}
        <section className="my-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-2">
                CURATED HARMONY
              </div>
              <h2 className="font-serif text-3xl font-medium text-walnut">
                Pairs Well With
              </h2>
            </div>
            <Link
              to="/chairs"
              className="text-xs uppercase tracking-widest font-semibold text-walnut hover:text-brass transition-colors"
            >
              Explore Catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pairedChairs.map((pairedChair) => (
              <ChairCard key={pairedChair.slug} chair={pairedChair} />
            ))}
          </div>
        </section>

        {/* --- 6. CUSTOMER REVIEWS & HISTOGRAM --- */}
        <section className="my-20">
          <Reviews
            rating={chair.rating}
            reviewCount={chair.reviewCount}
            chairName={chair.name}
          />
        </section>
      </div>

      {/* --- MOBILE STICKY BOTTOM BAR --- */}
      {isMobileBarVisible && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-bone/95 backdrop-blur-xl border-t border-walnut/10 p-4 lg:hidden shadow-luxury">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-serif text-sm font-medium text-walnut line-clamp-1">
                {chair.name}
              </div>
              <div className="font-mono text-xs tabular-nums text-ash">
                {formatPrice(currentUnitPrice)} · {selectedWood.name.split(' ')[0]}
              </div>
            </div>

            <button
              onClick={() => {
                addItem({
                  slug: chair.slug,
                  name: chair.name,
                  price: chair.price,
                  wood: selectedWood,
                  seat: selectedSeat,
                  quantity: 1,
                  image: chair.images.hero,
                });
              }}
              className="flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-semibold uppercase tracking-wider text-walnut hover:bg-brass/90 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
