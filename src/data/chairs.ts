export interface WoodOption {
  id: string;
  name: string;
  color: string;
  finish: string;
  hardness: string;
  grain: string;
  hex: string;
}

export interface SeatOption {
  id: string;
  name: string;
  priceDelta: number;
  texture: string;
  hex: string;
  description: string;
}

export interface Dimensions {
  seatHeight: number; // in cm
  width: number;
  depth: number;
  backHeight: number;
  weightKg: number;
}

export interface Chair {
  slug: string;
  name: string;
  designer: string;
  year: number;
  price: number;
  type: 'lounge' | 'dining' | 'office' | 'stool';
  tagline: string;
  woods: WoodOption[];
  seats: SeatOption[];
  images: {
    hero: string;
    room: string;
    joint: string;
    angle: string;
    scale: string;
  };
  woodImages: Record<string, string>;
  dimensions: Dimensions;
  materials: {
    timber: string;
    joinery: string;
    finish: string;
    upholstery: string;
  };
  story: string;
  specs: {
    label: string;
    value: string;
  }[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isLastFew?: boolean;
  modelUrl?: string;
  spinFrames: string[];
  pairsWith: string[];
}

export const WOOD_OPTIONS: Record<string, WoodOption> = {
  oak: {
    id: 'oak',
    name: 'European Solid Oak',
    color: '#D1B48C',
    finish: 'Cold-pressed organic linseed oil',
    hardness: '1,360 Janka — resilient, dense grain',
    grain: 'Pronounced straight grain with medullary rays',
    hex: '#D7C4A5',
  },
  walnut: {
    id: 'walnut',
    name: 'American Black Walnut',
    color: '#5C4033',
    finish: 'Hand-rubbed natural beeswax & oil',
    hardness: '1,010 Janka — rich patina over decades',
    grain: 'Deep undulating chocolate swirls with warm amber undertones',
    hex: '#4A3321',
  },
  ash: {
    id: 'ash',
    name: 'Nordic White Ash',
    color: '#E6D7B9',
    finish: 'Ultra-matte soap finish',
    hardness: '1,320 Janka — shock-resistant elasticity',
    grain: 'Clean, light architectural grain with subtle cathedral arches',
    hex: '#E2D5C3',
  },
};

export const SEAT_OPTIONS: Record<string, SeatOption> = {
  rush: {
    id: 'rush',
    name: 'Natural River Rush',
    priceDelta: 0,
    texture: 'Four-envelope hand weave',
    hex: '#D8C39D',
    description: 'Unbleached freshwater river rush harvested by hand in seasonal cycles.',
  },
  cord: {
    id: 'cord',
    name: 'Unbleached Danish Cord',
    priceDelta: 120,
    texture: 'Traditional 3-ply twisted paper weave',
    hex: '#EADBC4',
    description: 'FSC-certified long-staple paper cord, naturally wax-coated for 50-year longevity.',
  },
  boucle: {
    id: 'boucle',
    name: 'Heavy Wool Bouclé',
    priceDelta: 160,
    texture: '100% Gotland wool with textured loop pile',
    hex: '#EDE8E0',
    description: 'Un-dyed Scandinavian virgin wool woven with natural lanolin retention.',
  },
  leather: {
    id: 'leather',
    name: 'Vegetable-Tanned Saddle Leather',
    priceDelta: 220,
    texture: 'Full-grain 3.2mm aniline bridle leather',
    hex: '#7A4B29',
    description: 'Tuscan pit-tanned bridle leather that darkens and softens with daily posture.',
  },
};

const generateSpinFrames = (slug: string) => {
  return Array.from({ length: 36 }, (_, i) => `/spin/${slug}/${String(i * 10).padStart(3, '0')}.webp`);
};

export const CHAIRS: Chair[] = [
  {
    slug: 'monolith-lounge',
    name: 'The Monolith Lounge Chair',
    designer: 'Studio SEDDIA & M. Thorne',
    year: 2019,
    price: 1280,
    type: 'lounge',
    tagline: 'An architectural sanctuary carved from solid European hardwood with steam-bent arms.',
    woods: [WOOD_OPTIONS.walnut, WOOD_OPTIONS.oak, WOOD_OPTIONS.ash],
    seats: [SEAT_OPTIONS.cord, SEAT_OPTIONS.boucle, SEAT_OPTIONS.leather, SEAT_OPTIONS.rush],
    images: {
      hero: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      walnut: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 38,
      width: 74,
      depth: 78,
      backHeight: 76,
      weightKg: 14.2,
    },
    materials: {
      timber: 'Grade-A kiln-dried solid timber (8% moisture threshold)',
      joinery: 'Through-tenon joints secured with contrasting walnut dowels',
      finish: 'Five hand-applied coats of breathable organic tung oil',
      upholstery: 'Continuous single-strand hand-tensioned cord weave',
    },
    story: 'The Monolith began as a response to disposable upholstery. We spent fourteen months prototyping the compound curve of the crest rail until the lumbar support felt effortless without mechanical cushions.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Timber Grade', value: 'FSC-Certified Quarter-Sawn Hardwood' },
      { label: 'Joinery Standard', value: 'Blind & through mortise-and-tenon' },
      { label: 'Build Time', value: '28 bench hours per piece' },
      { label: 'Frame Warranty', value: '10-Year Repair or Replace Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 42,
    stock: 6,
    isNew: true,
    spinFrames: generateSpinFrames('monolith-lounge'),
    pairsWith: ['arc-dining', 'atelier-stool', 'strata-reading'],
  },
  {
    slug: 'arc-dining',
    name: 'The Arc Sculpted Dining Chair',
    designer: 'Elinor Vane',
    year: 2021,
    price: 640,
    type: 'dining',
    tagline: 'Steam-bent half-moon crest rail meeting feather-light joinery without armrests.',
    woods: [WOOD_OPTIONS.oak, WOOD_OPTIONS.walnut, WOOD_OPTIONS.ash],
    seats: [SEAT_OPTIONS.rush, SEAT_OPTIONS.cord, SEAT_OPTIONS.leather],
    images: {
      hero: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      oak: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 46,
      width: 52,
      depth: 54,
      backHeight: 79,
      weightKg: 6.8,
    },
    materials: {
      timber: 'Single-billet steam-bent solid hardwood',
      joinery: 'Tapered mortise joints with concealed structural locking',
      finish: 'Matte hardwax oil preserving natural wood pores',
      upholstery: 'Four-way envelope rush weave, sealed with natural shellac',
    },
    story: 'Designed to fit cleanly under standard dining heights while offering posture-correct lumbar cradling for multi-course evenings. The continuous top rail is formed by soaking timber in 100°C steam before slow-bending over cast iron formers.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Timber Grade', value: 'Sustainably Managed British Hardwood' },
      { label: 'Weight Limit', value: 'Tested to 180 kg cyclic load' },
      { label: 'Stackable', value: 'Non-stacking solid construction' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.8,
    reviewCount: 56,
    stock: 14,
    spinFrames: generateSpinFrames('arc-dining'),
    pairsWith: ['monolith-lounge', 'atelier-stool', 'cord-armchair'],
  },
  {
    slug: 'cord-armchair',
    name: 'The Fyn Danish Cord Armchair',
    designer: 'Kasper Lindqvist',
    year: 2018,
    price: 920,
    type: 'lounge',
    tagline: '140 meters of unbleached Danish cord hand-woven across an angled timber frame.',
    woods: [WOOD_OPTIONS.ash, WOOD_OPTIONS.oak, WOOD_OPTIONS.walnut],
    seats: [SEAT_OPTIONS.cord, SEAT_OPTIONS.rush],
    images: {
      hero: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      oak: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 41,
      width: 63,
      depth: 68,
      backHeight: 74,
      weightKg: 8.9,
    },
    materials: {
      timber: 'Solid Nordic White Ash / European Oak',
      joinery: 'Double-pinned angled mortise joinery',
      finish: 'Organic soap-treated natural ash',
      upholstery: '3-ply unbleached Danish paper cord weave',
    },
    story: 'The Fyn pays homage to mid-century Danish joinery traditions while tightening tolerances with modern diamond-edge profiling. The paper cord is soft to touch, breathing continuously in summer and remaining temperate in winter.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Cord Length', value: '140 m continuous strand' },
      { label: 'Weaving Bench Time', value: '6.5 hours per seat' },
      { label: 'Recyclability', value: '100% natural biodegradable components' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 5.0,
    reviewCount: 38,
    stock: 4,
    isLastFew: true,
    spinFrames: generateSpinFrames('cord-armchair'),
    pairsWith: ['monolith-lounge', 'pavilion-low', 'solis-rocker'],
  },
  {
    slug: 'pavilion-low',
    name: 'The Pavilion Low Sling Chair',
    designer: 'Studio SEDDIA',
    year: 2022,
    price: 1150,
    type: 'lounge',
    tagline: 'Bridle leather sling suspended across sculpted walnut cantilevers.',
    woods: [WOOD_OPTIONS.walnut, WOOD_OPTIONS.oak],
    seats: [SEAT_OPTIONS.leather, SEAT_OPTIONS.boucle],
    images: {
      hero: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      walnut: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 34,
      width: 71,
      depth: 79,
      backHeight: 68,
      weightKg: 11.5,
    },
    materials: {
      timber: 'FSC American Black Walnut with oiled hand finish',
      joinery: 'Interlocking halved joints with concealed brass stabilizing rod',
      finish: 'Beeswax and organic walnut oil balm',
      upholstery: '3.5mm full-grain vegetable-tanned bridle leather',
    },
    story: 'A low-slung lounge piece built for sunrooms and library corners. The leather sling is fastened underneath with adjustable solid brass buckles, allowing the user to tune tension over decades of use.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Leather Origin', value: 'Santa Croce sull’Arno, Tuscany' },
      { label: 'Buckle Hardware', value: 'Machined solid brass' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 29,
    stock: 5,
    spinFrames: generateSpinFrames('pavilion-low'),
    pairsWith: ['solis-rocker', 'strata-reading', 'monolith-lounge'],
  },
  {
    slug: 'atelier-stool',
    name: 'The Atelier Counter Stool',
    designer: 'Henrik Vang',
    year: 2020,
    price: 480,
    type: 'stool',
    tagline: 'Dish-carved round seat saddle on turned tripod splay with brass footrest.',
    woods: [WOOD_OPTIONS.oak, WOOD_OPTIONS.ash, WOOD_OPTIONS.walnut],
    seats: [SEAT_OPTIONS.rush, SEAT_OPTIONS.cord, SEAT_OPTIONS.leather],
    images: {
      hero: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      oak: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 65,
      width: 44,
      depth: 44,
      backHeight: 65,
      weightKg: 5.4,
    },
    materials: {
      timber: 'Solid English Oak or Black Walnut',
      joinery: 'Round tenons wedged with cross-grain oak pins',
      finish: 'Matte protective oil',
      upholstery: 'Solid timber dished seat / optional rush pad',
    },
    story: 'Originally conceived for our own drawing benches. The tripod geometry guarantees zero rock on uneven flagstones, while the footrest rung is capped in brushed brass to resist work boot wear.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Counter Height', value: 'Designed for 90cm standard counters' },
      { label: 'Footrest', value: 'Solid brass sleeve' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.8,
    reviewCount: 31,
    stock: 12,
    spinFrames: generateSpinFrames('atelier-stool'),
    pairsWith: ['arc-dining', 'monolith-lounge', 'nordic-desk'],
  },
  {
    slug: 'strata-reading',
    name: 'The Strata Highback Reading Chair',
    designer: 'Studio SEDDIA',
    year: 2023,
    price: 1450,
    type: 'lounge',
    tagline: 'Highback wing profile sculpted with tall vertical timber ribs for acoustic privacy.',
    woods: [WOOD_OPTIONS.walnut, WOOD_OPTIONS.oak],
    seats: [SEAT_OPTIONS.boucle, SEAT_OPTIONS.leather],
    images: {
      hero: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      walnut: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 42,
      width: 79,
      depth: 84,
      backHeight: 104,
      weightKg: 18.5,
    },
    materials: {
      timber: 'Solid Black Walnut frame with laminated back ribs',
      joinery: 'Reinforced bridle and mortise joinery',
      finish: 'Hand-burnished oil wax',
      upholstery: 'Gotland wool bouclé over natural horsehair padding',
    },
    story: 'The Strata envelops the reader with subtle sound-dampening high wings. We avoided synthetic polyurethane foam entirely, using organic latex and needle-punched wool batting that will never crumble.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Cushion Fill', value: 'Organic latex & British wool batting' },
      { label: 'Acoustic Rating', value: 'High sound absorption index' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 19,
    stock: 3,
    isNew: true,
    spinFrames: generateSpinFrames('strata-reading'),
    pairsWith: ['monolith-lounge', 'pavilion-low', 'solis-rocker'],
  },
  {
    slug: 'solis-rocker',
    name: 'The Solis Bentwood Rocking Chair',
    designer: 'Arthur Pendelton',
    year: 2017,
    price: 1320,
    type: 'lounge',
    tagline: 'Continuous unbroken bentwood runners in laminated ash with soothing balance.',
    woods: [WOOD_OPTIONS.ash, WOOD_OPTIONS.oak, WOOD_OPTIONS.walnut],
    seats: [SEAT_OPTIONS.cord, SEAT_OPTIONS.leather, SEAT_OPTIONS.boucle],
    images: {
      hero: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      ash: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 40,
      width: 66,
      depth: 92,
      backHeight: 82,
      weightKg: 12.8,
    },
    materials: {
      timber: '24 laminations of European Ash bent under 8-ton press',
      joinery: 'Dovetailed cross-stretchers',
      finish: 'Matte oil with anti-scuff runner bottoms',
      upholstery: 'Danish paper cord or vegetable bridle leather',
    },
    story: 'Engineered with a center-of-gravity calibrated so the rocker gently rests upright when unoccupied. The runner radius prevents tipping backwards under energetic motion.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Runner Radius', value: '1,420 mm calibrated arc' },
      { label: 'Floor Guard', value: 'Recessed natural vegetable leather runner inserts' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 26,
    stock: 7,
    spinFrames: generateSpinFrames('solis-rocker'),
    pairsWith: ['pavilion-low', 'cord-armchair', 'monolith-lounge'],
  },
  {
    slug: 'cantilever-arm',
    name: 'The Forma Cantilever Armchair',
    designer: 'Elinor Vane & SEDDIA',
    year: 2021,
    price: 980,
    type: 'lounge',
    tagline: 'Defying gravity through interlocking structural tenon cantilevers.',
    woods: [WOOD_OPTIONS.walnut, WOOD_OPTIONS.oak],
    seats: [SEAT_OPTIONS.leather, SEAT_OPTIONS.cord],
    images: {
      hero: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      walnut: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 43,
      width: 61,
      depth: 64,
      backHeight: 78,
      weightKg: 10.4,
    },
    materials: {
      timber: 'Hand-selected American Walnut',
      joinery: 'Multi-tiered finger tenons with carbon fiber core reinforcement',
      finish: 'Hand-rubbed natural oil',
      upholstery: 'Full-grain saddle leather with brass edge eyelets',
    },
    story: 'A structural triumph: creating a spring-flex cantilever entirely out of solid hardwood without metal framing. The hidden internal carbon fiber core allows subtle flex while preventing wood fatigue.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Deflection Range', value: '12 mm gentle dynamic yield' },
      { label: 'Load Rating', value: '160 kg continuous' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.7,
    reviewCount: 22,
    stock: 5,
    spinFrames: generateSpinFrames('cantilever-arm'),
    pairsWith: ['nordic-desk', 'arc-dining', 'monolith-lounge'],
  },
  {
    slug: 'kyoto-low',
    name: 'The Kyoto Tatami Low Chair',
    designer: 'Kenji Takahashi',
    year: 2020,
    price: 890,
    type: 'lounge',
    tagline: 'Ground-plane ergonomics with hand-planed hinoki-style low joinery.',
    woods: [WOOD_OPTIONS.ash, WOOD_OPTIONS.oak],
    seats: [SEAT_OPTIONS.rush, SEAT_OPTIONS.boucle],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      ash: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 22,
      width: 60,
      depth: 62,
      backHeight: 58,
      weightKg: 7.2,
    },
    materials: {
      timber: 'Solid White Ash planed with Japanese Kanna planes',
      joinery: 'Traditional Kanawa Tsugi scarf joints',
      finish: 'Matte natural plant wax',
      upholstery: 'Dense Igusa rush weave or Gotland wool cushion',
    },
    story: 'Created for low-table dining and tea rituals. The seat sits just 22cm from the floor with a 15-degree back tilt, decompressing the lower spine while grounding the posture.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Joinery Style', value: 'Traditional Japanese interlocking timber' },
      { label: 'Floor Friendly', value: 'Beveled skid runners safe on tatami & hardwoods' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 34,
    stock: 8,
    spinFrames: generateSpinFrames('kyoto-low'),
    pairsWith: ['pavilion-low', 'atelier-stool', 'monolith-lounge'],
  },
  {
    slug: 'nordic-desk',
    name: 'The Nordic Ergonomic Task Chair',
    designer: 'Studio SEDDIA & Dr. O. Berg',
    year: 2022,
    price: 880,
    type: 'office',
    tagline: 'Active lumbar curved backrest with mechanical-free organic support.',
    woods: [WOOD_OPTIONS.oak, WOOD_OPTIONS.walnut, WOOD_OPTIONS.ash],
    seats: [SEAT_OPTIONS.leather, SEAT_OPTIONS.boucle, SEAT_OPTIONS.cord],
    images: {
      hero: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      oak: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 48,
      width: 58,
      depth: 56,
      backHeight: 84,
      weightKg: 8.6,
    },
    materials: {
      timber: 'Compound molded solid hardwood veneers and solid oak legs',
      joinery: 'Dovetail spline joints',
      finish: 'Matte scratch-resistant polyurethane-oil hybrid',
      upholstery: 'Breathable full-grain leather or wool bouclé',
    },
    story: 'Most office chairs are synthetic eyesores with plastic knobs. The Nordic Task Chair proves that solid timber and ergonomic discipline can coexist in an executive studio without noisy levers.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Ergonomic Certification', value: 'EN 1335 Office Seating Standard' },
      { label: 'Swivel', value: 'Silent concealed brass bearing swivel mechanism' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.8,
    reviewCount: 45,
    stock: 9,
    spinFrames: generateSpinFrames('nordic-desk'),
    pairsWith: ['cantilever-arm', 'atelier-stool', 'arc-dining'],
  },
  {
    slug: 'tribeca-club',
    name: 'The Tribeca Shearling Club Chair',
    designer: 'M. Thorne',
    year: 2023,
    price: 1580,
    type: 'lounge',
    tagline: 'Deep walnut architectural frame cocooned in dense natural shearling.',
    woods: [WOOD_OPTIONS.walnut, WOOD_OPTIONS.oak],
    seats: [SEAT_OPTIONS.boucle, SEAT_OPTIONS.leather],
    images: {
      hero: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      walnut: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      oak: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 40,
      width: 82,
      depth: 82,
      backHeight: 74,
      weightKg: 21.0,
    },
    materials: {
      timber: 'Solid American Walnut with exposed box-joint corners',
      joinery: 'Exposed corner box joinery with walnut wedge pins',
      finish: 'Deep dark walnut oil stain with natural beeswax polish',
      upholstery: 'High-density Gotland wool fleece / Italian pull-up leather',
    },
    story: 'The heavyweight anchor of the SEDDIA catalogue. Built around an architectural timber exoskeleton that allows the deep cocoon cushion to float effortlessly within the room.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Timber Volume', value: '0.12 m³ solid walnut per chair' },
      { label: 'Comfort Rating', value: 'Deep lounge immersion' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 5.0,
    reviewCount: 16,
    stock: 2,
    isLastFew: true,
    spinFrames: generateSpinFrames('tribeca-club'),
    pairsWith: ['strata-reading', 'monolith-lounge', 'pavilion-low'],
  },
  {
    slug: 'valet-chair',
    name: 'The Klint Valet Dressing Chair',
    designer: 'Studio SEDDIA',
    year: 2019,
    price: 760,
    type: 'stool',
    tagline: 'Sculpted jacket hanger crest rail with hinged storage seat for dressing rooms.',
    woods: [WOOD_OPTIONS.oak, WOOD_OPTIONS.walnut, WOOD_OPTIONS.ash],
    seats: [SEAT_OPTIONS.leather, SEAT_OPTIONS.cord, SEAT_OPTIONS.rush],
    images: {
      hero: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      room: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop',
      joint: 'https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1200&auto=format&fit=crop',
      angle: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      scale: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    },
    woodImages: {
      oak: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      walnut: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
      ash: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
    },
    dimensions: {
      seatHeight: 45,
      width: 48,
      depth: 50,
      backHeight: 88,
      weightKg: 7.1,
    },
    materials: {
      timber: 'Solid European Oak with machined brass hinge hardware',
      joinery: 'Doweled tenon framework with carved contour rail',
      finish: 'Matte protective hardwax',
      upholstery: 'Top-grain bridle leather seat lid opening to felt-lined tray',
    },
    story: 'Inspired by traditional dressing room valets. The top rail forms a shoulder-curved suit hanger, while the seat flips up smoothly on friction brass hinges to reveal a carved tray for cufflinks, watches, and keys.',
    specs: [
      { label: 'Origin', value: 'Handcrafted in Bristol Workshop, UK' },
      { label: 'Hinges', value: 'Self-damping machined brass' },
      { label: 'Hidden Tray', value: '100% Merino wool felt-lined compartment' },
      { label: 'Frame Warranty', value: '10-Year Guarantee' },
    ],
    rating: 4.9,
    reviewCount: 28,
    stock: 6,
    spinFrames: generateSpinFrames('valet-chair'),
    pairsWith: ['atelier-stool', 'arc-dining', 'monolith-lounge'],
  },
];
