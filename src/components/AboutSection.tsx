import React from 'react';
import { WOOD_OPTIONS } from '../data/chairs';
import { Reveal } from './Reveal';
import { SplitHeading } from './SplitHeading';
import { ImageWithFallback } from './ImageWithFallback';

export const AboutSection: React.FC = () => {
  const materials = [
    {
      data: WOOD_OPTIONS.oak,
      macroImage: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
      origin: 'Fontainebleau Forest, France',
    },
    {
      data: WOOD_OPTIONS.walnut,
      macroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      origin: 'Appalachian Valley, USA',
    },
    {
      data: WOOD_OPTIONS.ash,
      macroImage: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=800&auto=format&fit=crop',
      origin: 'Västergötland Woodlands, Sweden',
    },
  ];

  return (
    <section className="relative py-28 md:py-40 bg-cream text-walnut overflow-hidden border-t border-walnut/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow & Main Statement */}
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brass inline-block" />
              <span>THE WORKSHOP · EST. 1998</span>
            </div>
          </Reveal>

          <SplitHeading
            as="h2"
            lines={['"A chair is a posture,', 'made permanent."']}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.02em] text-walnut mb-8"
          />

          <Reveal delay={0.25}>
            <p className="text-base md:text-lg text-walnut/80 leading-relaxed font-normal">
              Most modern furniture is engineered for flat-pack shipping containers and five-year lifecycles.
              We build using quarter-sawn British and European timbers, dry-fitted tenons, and hand-rubbed plant oils
              so that our chairs endure through centuries of daily living.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Workshop Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-walnut/10 text-sm md:text-base leading-relaxed text-ash">
          <Reveal delay={0.3}>
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-walnut font-medium">The Bench & The Grain</h3>
              <p>
                Every SEDDIA chair begins with timber selection at the log yard. We reject 70% of available boards,
                selecting only slow-growth planks with consistent grain orientation and an exact 8% moisture equilibrium.
                This guarantees the frame will never twist, warp, or crack across changing seasons.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-walnut font-medium">Numbered, Stamped, Signed</h3>
              <p>
                Before leaving our workshop in Bristol, each chair undergoes a 32-point inspection. The cabinetmaker
                who shaped its joinery stamps their maker&rsquo;s mark, the timber harvest date, and a unique serial number
                directly into the underside rail with a heated brass brand.
              </p>
            </div>
          </Reveal>
        </div>

        {/* 3-Up Material Swatch Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((item, index) => (
            <Reveal key={item.data.id} delay={0.2 + index * 0.1}>
              <div className="group rounded-3xl bg-bone p-6 border border-walnut/10 shadow-subtle flex flex-col justify-between h-full transition-transform duration-base hover:-translate-y-1">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-cream mb-5">
                    <ImageWithFallback
                      src={item.macroImage}
                      alt={item.data.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-105"
                    />
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-brass font-medium mb-1">
                    {item.origin}
                  </div>
                  <h4 className="font-serif text-lg font-medium text-walnut mb-2">
                    {item.data.name}
                  </h4>
                  <p className="text-xs text-ash leading-relaxed mb-4">
                    {item.data.grain}
                  </p>
                </div>

                <div className="pt-4 border-t border-walnut/10 text-[11px] text-walnut/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-ash">Hardness:</span>
                    <span>{item.data.hardness.split('—')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ash">Finish:</span>
                    <span>{item.data.finish}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
