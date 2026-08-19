import React from 'react';
import { Reveal } from './Reveal';
import { SplitHeading } from './SplitHeading';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      num: '01',
      title: 'Mortise-and-Tenon Joinery',
      highlight: 'Zero screws. Zero brackets. Zero metal fatigue.',
      body: 'Every structural intersection is precision-machined with deep interlocking wood tenons, hand-fit with Japanese rasps, and permanently locked with cross-grain hardwood dowels. Under stress, timber expands with timber.',
    },
    {
      num: '02',
      title: 'Kiln-Dried 8% Hardwood',
      highlight: 'A frame that will never twist or separate across decades.',
      body: 'Green timber contains up to 50% water weight. We cure all oak, walnut, and ash down to an exacting 8% internal equilibrium before cutting a single joint, preventing shrinkage and seasonal gap formation.',
    },
    {
      num: '03',
      title: 'Re-Weavable Natural Seats',
      highlight: 'Designed for a lifetime of renewability in under an hour.',
      body: 'Unlike foam cushions that inevitably disintegrate into micro-particles, our Danish cord and river rush weaves can be unstrung and re-tensioned by any qualified restorer, returning the seat to pristine factory firmness.',
    },
    {
      num: '04',
      title: 'Five Hand-Rubbed Oil Coats',
      highlight: 'Breathable plant oils, repairable at home with a dry cloth.',
      body: 'Synthetic polyurethanes create plastic shells that peel when nicked. Our cold-pressed linseed and tung oil formula penetrates deep into the pores, building a satin luster that heals scratches naturally with routine oiling.',
    },
    {
      num: '05',
      title: 'Numbered and Hand-Signed',
      highlight: 'Artisanal provenance branded directly into the under-rail.',
      body: 'Every chair carries a permanent hot-brass maker stamp, harvest date, and unique archival registry number. Your chair is recorded in our Bristol ledger, ensuring lifelong provenance and warranty continuity.',
    },
  ];

  return (
    <section className="relative py-28 md:py-40 bg-walnut text-cream overflow-hidden">
      {/* Subtle warm architectural glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-brass/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.24em] text-brass font-medium mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brass inline-block" />
                <span>WHY SEDDIA</span>
              </div>
            </Reveal>

            <SplitHeading
              as="h2"
              lines={['Built to outlive', 'the trend cycle.']}
              className="font-serif text-3xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-cream mb-6"
            />

            <Reveal delay={0.2}>
              <p className="text-base text-cream/70 leading-relaxed font-normal mb-8">
                In an era of mass-manufactured obsolescence, we design chairs around the
                mechanical principles of heirloom joinery. Five non-negotiable standards define our workshop.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="hidden lg:flex items-center gap-3 text-xs uppercase tracking-widest text-ash">
                <span className="h-px w-8 bg-brass/60" />
                <span>Scroll to explore specifications</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 5 Architectural Cards scrolling past */}
          <div className="lg:col-span-7 space-y-8">
            {features.map((feature, idx) => (
              <Reveal key={feature.num} delay={0.15 * idx} yOffset={32}>
                <div className="group relative rounded-3xl bg-cream/5 border border-cream/10 p-8 md:p-10 transition-all duration-base hover:bg-cream/[0.08] hover:border-brass/40 shadow-luxury">
                  {/* Watermark Numeral */}
                  <div className="absolute top-6 right-8 font-serif text-4xl md:text-5xl font-light text-cream/15 pointer-events-none select-none">
                    {feature.num}
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-serif text-2xl font-medium text-cream mb-2 group-hover:text-brass transition-colors">
                      {feature.title}
                    </h3>
                    <div className="text-xs uppercase tracking-wider text-brass/90 font-medium mb-4">
                      {feature.highlight}
                    </div>
                    <p className="text-sm md:text-base text-cream/75 leading-relaxed font-normal">
                      {feature.body}
                    </p>
                  </div>

                  {/* Left brass accent bar on hover */}
                  <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-brass opacity-0 group-hover:opacity-100 transition-opacity duration-base" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
