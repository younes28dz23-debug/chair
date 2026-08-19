import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SplitHeading } from '../components/SplitHeading';
import { ArrowUpRight, Clock, X, BookOpen, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  image: string;
  content: string[];
  pullQuote?: string;
}

export const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Stop Lenis and lock body/html scroll when article reader is open
  useEffect(() => {
    if (selectedArticle) {
      window.__lenis?.stop();
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Reset modal scroll position to top when opening
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.__lenis?.start();
      };
    }
  }, [selectedArticle]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  const articles: Article[] = [
    {
      id: 'steam-bending-geometry',
      title: 'The Geometry of Steam-Bending: Why Curves Distribute Spinal Load',
      category: 'Ergonomics & Posture',
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Dr. O. Berg & M. Thorne',
      authorRole: 'Biomechanical Ergonomist & Master Cabinetmaker',
      excerpt:
        'When solid hardwood is steamed to 100°C, lignin plasticizes, allowing single continuous billets to bend along natural fiber vectors without severance.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      pullQuote: 'A curved piece of wood under natural tension holds human weight not by resisting gravity, but by redirecting it through continuous grain lines.',
      content: [
        'In classical timber joinery, sharp 90-degree joints are points of concentrated stress. When a person sits, their lumbar weight transmits directly into the joint tenons, gradually causing micro-loosening over decades.',
        'Steam-bending solves this fundamentally. By immersing slow-growth English Oak or Nordic Ash in saturated 100°C steam for one hour per inch of thickness, the natural lignin within the wood cells temporarily softens. The wood becomes pliable like leather.',
        'We bend the timber over custom cast-iron mandrels while under continuous longitudinal compression. This preserves the unbroken tensile strength of the grain fibers. Once cooled and cured, the curved crest rail functions as a single continuous spring that gently cradles the thoracic spine.',
        'The result is a chair with zero mechanical joints across the entire upper backrest — eliminating the primary point of failure that causes mass-manufactured chairs to squeak and loosen over time.',
      ],
    },
    {
      id: 'why-we-reject-polyurethane',
      title: 'Why We Reject Polyurethane: Caring for Breathable Plant Oils',
      category: 'Material Science',
      readTime: '4 min read',
      date: 'July 2026',
      author: 'Arthur Pendelton',
      authorRole: 'Head Joiner & Finisher',
      excerpt:
        'Plastic coatings create an impenetrable film that traps moisture and chips irrecoverably. Cold-pressed linseed oil becomes part of the wood itself.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      pullQuote: 'Polyurethane seals wood in plastic suffocating its warmth. Organic oils feed the fibers and age into a rich amber patina over generations.',
      content: [
        'Commercial furniture manufacturers almost universally spray polyurethane or conversion varnishes over wood. It is fast, waterproof, and creates a high-gloss synthetic plastic layer in seconds.',
        'However, plastic varnishes have a fatal flaw: they sit on top of the wood rather than entering it. When a polyurethane-coated chair suffers a scratch from a ring or belt buckle, the plastic membrane breaks. Ambient humidity enters the fissure, turning the wood underneath grey, and the finish cannot be spot-repaired without stripping the entire piece.',
        'At SEDDIA, we apply five successive coats of cold-pressed Swedish linseed and raw tung oil. The microscopic oil molecules penetrate deep into the porous tracheids of the timber, polymerizing from the inside out.',
        'When you touch an oiled SEDDIA chair, your skin is touching real, warm, breathing timber. Minor daily abrasions can be erased in seconds by simply rubbing a few drops of organic oil balm into the wood with a cotton cloth.',
      ],
    },
    {
      id: 'anatomy-of-danish-cord',
      title: '140 Meters of Unbleached Cord: The Architecture of the Woven Seat',
      category: 'Craft Technique',
      readTime: '8 min read',
      date: 'June 2026',
      author: 'Elinor Vane',
      authorRole: 'Senior Furniture Designer',
      excerpt:
        'Danish paper cord is not fragile paper — it is twisted long-staple virgin FSC spruce fiber with a tensile strength rivaling synthetic ropes.',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
      pullQuote: 'A hand-woven cord seat distributes body weight across thousands of micro-intersections, adapting to your posture with dynamic elasticity.',
      content: [
        'Developed in Denmark during the timber shortages of the 1940s by visionary designers like Børge Mogensen and Hans Wegner, Danish paper cord has proven to be one of the most durable seating materials in furniture history.',
        'Made from three plies of long-fiber Scandinavian spruce paper twisted under extreme tension and lightly wax-coated, the cord does not stretch, tear, or fray under normal domestic conditions.',
        'Weaving a single SEDDIA armchair requires exactly 140 meters of continuous cord and 6.5 hours of intense manual labor on our custom tensioning jigs. Each strand is interlaced around concealed L-shaped brass nails in the seat rails.',
        'Unlike foam cushions which degrade and sag within 5 to 7 years, a Danish cord seat remains firm, temperate, and supportive for 40 to 60 years before needing re-weaving.',
      ],
    },
    {
      id: 'eight-percent-equilibrium',
      title: 'The 8% Moisture Equilibrium Rule in Heritage Cabinetmaking',
      category: 'Timber Forestry',
      readTime: '5 min read',
      date: 'May 2026',
      author: 'Studio SEDDIA',
      authorRole: 'The Bristol Timber Guild',
      excerpt:
        'Why ambient British humidity requires deliberate kiln schedules before cutting a single tenon, preventing joint separation across forty winters.',
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      pullQuote: 'Wood is a living material that breathes with the seasons. Master joinery designs for the wood’s natural seasonal movement rather than fighting it.',
      content: [
        'Every tree trunk contains over 50% water when felled in the forest. As green timber dries, it shrinks unevenly along its tangential, radial, and longitudinal grain planes.',
        'If furniture is built from timber with even 12% moisture content, placing it inside a centrally heated modern home will cause the wood to rapidly lose moisture down to 7–8%. The resulting shrinkage will violently snap mortise joints and crack seat panels.',
        'We store all selected British and European hardwoods in our climate-stabilized drying kilns for up to eight months until electronic resistance probes confirm an exact, uniform 8% moisture equilibrium across every core millimeter.',
        'This obsessive preparation ensures that whether your chair resides in a damp country cottage in Devon or an air-conditioned apartment in London, the joints remain locked with zero play.',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bone pt-24 sm:pt-32 md:pt-40 pb-36 md:pb-24 text-walnut">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <section className="mb-12 sm:mb-16">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] text-ash font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brass inline-block" />
              <span>THE SEDDIA JOURNAL · ARCHIVE</span>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SplitHeading
              as="h1"
              lines={['Essays on timber,', 'posture, and craft.']}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.02em] text-walnut max-w-2xl"
            />

            <Reveal delay={0.2}>
              <p className="text-sm md:text-base text-ash max-w-sm leading-relaxed">
                Reflections from our Bristol workshop on ergonomic physics, forest conservation, and
                maintaining hand-built furniture for generations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured First Article */}
        <section className="mb-16">
          <Reveal delay={0.3}>
            <article
              onClick={() => setSelectedArticle(articles[0])}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-cream p-8 md:p-12 border border-walnut/10 shadow-luxury cursor-pointer hover:border-brass/40 transition-all duration-base"
            >
              <div className="lg:col-span-7 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-bone">
                <ImageWithFallback
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-brass font-medium mb-2">
                    <span>{articles[0].category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-ash">
                      <Clock className="w-3 h-3" />
                      {articles[0].readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl text-walnut font-medium leading-snug group-hover:text-brass transition-colors mb-3">
                    {articles[0].title}
                  </h2>

                  <p className="text-sm text-ash leading-relaxed mb-4">
                    {articles[0].excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-walnut/10 flex items-center justify-between text-xs text-walnut/80">
                  <span>By {articles[0].author}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(articles[0]);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-walnut group-hover:text-brass transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        </section>

        {/* 3-Up Remaining Article Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(1).map((art, idx) => (
            <Reveal key={art.id} delay={0.15 * idx}>
              <article
                onClick={() => setSelectedArticle(art)}
                className="group flex flex-col justify-between rounded-3xl bg-bone p-6 border border-walnut/10 shadow-subtle h-full transition-transform hover:-translate-y-1 cursor-pointer hover:border-brass/40"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-cream mb-5">
                    <ImageWithFallback
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-brass font-medium mb-2">
                    <span>{art.category}</span>
                    <span>·</span>
                    <span className="text-ash">{art.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-walnut group-hover:text-brass transition-colors mb-2 line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-ash leading-relaxed line-clamp-3 mb-4">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-walnut/10 flex items-center justify-between text-[11px] text-ash">
                  <span>{art.author}</span>
                  <span className="text-walnut font-medium group-hover:text-brass flex items-center gap-1">
                    <span>Read Essay</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </section>
      </div>

      {/* --- IMMERSIVE SCROLLABLE ARTICLE READER MODAL (Lenis-Prevent Enabled) --- */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-walnut/80 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
            data-lenis-prevent
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-bone shadow-2xl border border-walnut/10 overflow-hidden"
            >
              {/* Sticky Modal Top Bar with Close Button */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-walnut/10 bg-bone/95 px-6 py-4 backdrop-blur-md flex-shrink-0">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brass font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{selectedArticle.category} · {selectedArticle.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-full p-2 text-walnut/70 hover:bg-walnut/10 hover:text-walnut transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Article Body (Dedicated Scroll Container) */}
              <div
                ref={scrollContainerRef}
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 space-y-6 overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-walnut leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Author Attribution */}
                <div className="flex items-center gap-3 pb-6 border-b border-walnut/10 text-xs text-ash">
                  <div className="w-9 h-9 rounded-full bg-brass/20 text-brass flex items-center justify-center font-serif font-semibold text-sm">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-walnut">{selectedArticle.author}</div>
                    <div className="text-[11px] text-ash">{selectedArticle.authorRole}</div>
                  </div>
                </div>

                {/* Article Hero Image */}
                <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-cream shadow-subtle">
                  <ImageWithFallback
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Pull Quote */}
                {selectedArticle.pullQuote && (
                  <blockquote className="p-6 sm:p-8 my-6 rounded-2xl bg-cream/80 border-l-4 border-brass font-serif text-lg md:text-xl text-walnut italic leading-relaxed shadow-inner">
                    "{selectedArticle.pullQuote}"
                  </blockquote>
                )}

                {/* Article Body Paragraphs */}
                <div className="space-y-6 text-sm sm:text-base text-walnut/90 leading-relaxed font-normal">
                  {selectedArticle.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-walnut/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-ash">
                    <Sparkles className="w-4 h-4 text-brass" />
                    <span>Archived at the Bristol Workshop Registry</span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full sm:w-auto rounded-full bg-walnut text-bone px-8 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-brass hover:text-walnut transition-colors shadow-subtle"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
