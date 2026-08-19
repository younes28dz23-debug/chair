import React from 'react';
import { Reveal } from '../components/Reveal';
import { SplitHeading } from '../components/SplitHeading';
import { Award } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Workshop: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Timber Selection & Moisture Equilibrium',
      desc: 'We inspect every raw billet of European Oak, Black Walnut, and Nordic Ash. Planks are kiln-cured until internal moisture stabilizes at exactly 8%, preventing warping under domestic heating.',
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
    },
    {
      step: '02',
      title: 'Precision Mortise & Hand-Tenoning',
      desc: 'Tenons are carved with tolerances tighter than a tenth of a millimeter. Every joint is dry-fitted by hand before gluing with structural resin and locking with walnut wedges.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      step: '03',
      title: 'Hand-Tensioned Seat Weaving',
      desc: 'Each paper cord or river rush seat requires 5 to 7 continuous hours on the weaving jig. The continuous 140-meter strand is tensioned with traditional horn tools.',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      step: '04',
      title: 'Five-Coat Natural Oil Polish',
      desc: 'Cold-pressed organic linseed and tung oils are massaged into the wood with coarse linen cloths over three days, building a velvet, breathable sheen that never flakes.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <main className="min-h-screen bg-bone pt-24 sm:pt-32 md:pt-40 pb-36 md:pb-24 text-walnut">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-16">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass inline-block" />
            <span>THE BENCH & THE MAKER · SINCE 1998</span>
          </div>
        </Reveal>

        <SplitHeading
          as="h1"
          lines={['Chairs shaped by hand,', 'destined for centuries.']}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.02em] text-walnut max-w-3xl mb-8"
        />

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-ash max-w-2xl leading-relaxed">
            In our Bristol harbourside workshop, eight cabinetmakers shape solid timber
            using Japanese hand planes, steam boxes, and traditional mortise joinery.
            No flat-packs, no automated injection molds, no shortcuts.
          </p>
        </Reveal>
      </section>

      {/* Hero Workshop Image */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <Reveal delay={0.3}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-cream shadow-luxury">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1600&auto=format&fit=crop"
              alt="SEDDIA workshop bench in Bristol"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 glass-pill px-5 py-2.5 rounded-full text-xs font-medium text-walnut">
              <span>Main Assembly Bench · Bench No. 04</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4 Process Chapters */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-12">
          THE FOUR CRAFT PHASES
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Reveal>
                    <div className="font-serif text-3xl md:text-4xl text-brass font-medium mb-2">
                      Phase {step.step}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-walnut font-medium mb-4">
                      {step.title}
                    </h2>
                    <p className="text-sm md:text-base text-ash leading-relaxed">
                      {step.desc}
                    </p>
                  </Reveal>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Reveal delay={0.2}>
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cream shadow-luxury">
                      <ImageWithFallback
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Maker Stamp Registry Section */}
      <section className="mt-24 py-24 bg-cream border-y border-walnut/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-brass/20 text-brass flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-medium text-walnut mb-4">
              The Permanent Bristol Registry
            </h2>

            <p className="text-sm md:text-base text-ash leading-relaxed mb-8">
              When your chair is stamped, its serial number, timber harvest location, and builder
              identity are logged in our physical workshop ledger. Should your descendants need
              restoration fifty years from today, our workshop will access the original drawings.
            </p>

            <div className="inline-flex items-center gap-3 glass-pill px-6 py-3 rounded-full text-xs font-mono text-walnut border border-walnut/10">
              <span className="text-brass">REGISTRY NO:</span>
              <span>SD-1998-UK-08412</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
