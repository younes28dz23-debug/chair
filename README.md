# SEDDIA — Workshop-Led Premium Chair Store

> *"Chairs you'll keep for life."* — Founded 1998 in Bristol, UK.

SEDDIA is a gallery-grade, quiet-luxury e-commerce experience for handcrafted solid timber seating. Built with **Vite, React 18, TypeScript, Tailwind CSS, React Three Fiber (Three.js), GSAP ScrollTrigger, Lenis Smooth Scroll, and Framer Motion**.

---

## 1. Quick Start & Execution

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build with lazy-loaded 3D & motion chunks
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Art Direction & Design Token System

The design strictly enforces quiet luxury: maximum 5 color tokens (defined in `tailwind.config.js`), high-contrast editorial display serifs paired with neutral grotesque body typography, and warm, near-invisible shadows.

### The 5 Theme Tokens

| Token | Hex | Usage & Purpose |
|---|---|---|
| `walnut` | `#321C04` | Primary dark: logo, body text, inverted master sections, borders |
| `cream` | `#F5EFE6` | Tactile surface: cards, mega-menu, craft storytelling sections |
| `bone` | `#FFFDF9` | Page canvas background (avoids sterile `#FFFFFF`) |
| `brass` | `#C9A227` | Precious metal accent: CTAs, active swatches, focus rings (sparingly used) |
| `ash` | `#8A7E6F` | Architectural muted tone: subtitles, technical specs, dividers |

### Typography Scale & Pairing

- **Display Serif:** *Playfair Display* / *Instrument Serif* — `clamp(2.8rem, 6.5vw, 5.5rem)`, `leading-[0.92]`, `tracking-[-0.02em]`.
- **Body & UI Sans:** *Inter* / *Satoshi* — `15–17px`, `leading-[1.6]`.
- **Eyebrows:** `text-[11px] uppercase tracking-[0.24em] text-ash`.
- **Prices:** Tabular numerals (`tabular-nums font-mono`), same weight as body text — never bold, never red.

### Shadows & Radii

- **Shadow:** `shadow-luxury` (`0 24px 60px -32px rgba(50,28,4,0.28)`).
- **Radii:** `rounded-2xl` for image frames, `rounded-full` for pills & buttons, `rounded-3xl` for major cards & panels.

---

## 3. Motion System & Tokens

Every animation across the site references standard tokens to maintain weight, discipline, and luxury pacing.

| Token | Value | Applied To |
|---|---|---|
| `ease-brand` | `cubic-bezier(0.16, 1, 0.3, 1)` | Universal easing across all UI & 3D interpolations |
| `dur-fast` | `250ms` | Hover states, swatch selections, focus rings |
| `dur-base` | `450ms` | Scroll reveals, accordions, card elevations, drawer slide |
| `dur-slow` | `700ms` | Product image crossfades, gallery zooms, section reveals |
| `dur-cinematic` | `1100ms` | Hero entrance mask reveals, route transitions |

---

## 4. 3D WebGL Studio & 360° Turntable Architecture

### 3D Hero Chair (Home)
- Real-time **React Three Fiber** canvas rendered with studio 3-point lighting (soft warm key light, gentle fill, golden rim light, ambient base light).
- `<Environment preset="city" />` and `<ContactShadows />` pool under chair legs.
- Procedural/crafted masterwork chair geometry with organic steam-bent crest rail, turned tapered legs, and mortise-and-tenon joints.
- `MeshPhysicalMaterial` with procedural matte oiled wood grain shader and normal bump map.
- Idle rotation (0.18 rad/s) + sine float drift (±6px, 4s period) + damped pointer parallax (±8°).
- Off-screen rendering paused via IntersectionObserver (`frameloop="demand"` / observer switch).

### Pinned 360° Turntable (PDP Hero)
- Pinned scroll-driven turntable powered by **GSAP ScrollTrigger**: one viewport of scroll equals one full 360° rotation (`rotation.y = scrollProgress * Math.PI * 2`).
- Draggable override: manual pointer drag takes precedence and smoothly blends back.
- Circular progress HUD with active rotation degree (`0° / 360°`).
- Live wood/seat variant selector triggers real-time material cross-fade on the 3D model.
- **Graceful Fallback:** Mobile devices, low-power hardware (`navigator.hardwareConcurrency <= 4` or non-WebGL), and `prefers-reduced-motion` automatically receive a preloaded 36-frame sequence / skeleton with manual touch drag.

### How to Swap Models and Spin Frames
- **3D Model:** Replace or configure `/models/chair.glb` and pass `modelUrl` in `src/data/chairs.ts`.
- **Spin Frames:** Place 36 rendered `.webp` frames in `/spin/<slug>/000.webp` through `350.webp` (one every 10°).

---

## 5. Component Map

```
src/
  components/
    Navbar.tsx              -- Floating glass pill, tightening on scroll, mega-menu, animated hamburger
    Logo.tsx                -- SVG armchair silhouette mark with fill prop
    Hero.tsx                -- Mask-reveal headline, 3D WebGL hero chair, number counters, scroll cue
    FeaturedRail.tsx        -- Horizontal scroll-snap rail with velocity skew and swatch preview
    AboutSection.tsx        -- Cream craft narrative with 3D spinning timber cylinders
    FeaturesSection.tsx     -- Walnut theme, sticky left anchor with 5 scrolling architectural cards
    ChairCard.tsx           -- Product card with hover in-room crossfade, quick-add, and wood dots
    FilterBar.tsx           -- Sticky filter bar with URL search param sync & removable chips
    SpinViewer.tsx          -- Pinned 360 turntable with circular progress and drag override
    Gallery.tsx             -- PDP sticky gallery with thumbnail rail, zoom lightbox, and arrow navigation
    VariantPicker.tsx       -- Wood & seat swatch selectors with live price delta driving 3D model
    DimensionDiagram.tsx    -- Isometric 3D wireframe SVG with interactive edge hover highlighting
    Accordion.tsx           -- Smooth animated height accordions
    Reviews.tsx             -- Rating summary, histogram breakdown, verified buyer reviews, review form
    CartDrawer.tsx          -- Slide-over drawer with free-shipping threshold bar ($500) and quantity stepper
    Marquee.tsx             -- Slow infinite strip paused on hover
    Cursor.tsx              -- Custom brass desktop dot cursor with contextual labels (DRAG, SPIN, VIEW)
    PageTransition.tsx      -- Editorial cream wipe overlay between routes
    Reveal.tsx              -- Scroll-triggered fade & rise container
    SplitHeading.tsx        -- Per-line masked serif reveals
    ShowroomBand.tsx        -- Split workshop photography and consultation booking modal
    Footer.tsx              -- Walnut footer with oversized "Sit down." wordmark and newsletter
  pages/
    Home.tsx                -- Hero -> Marquee -> Rail -> About -> Features -> Showroom
    Collection.tsx          -- /chairs filterable catalogue with 3-up grid
    Product.tsx             -- /chairs/:slug money page with 360 turntable and buy column
    Workshop.tsx            -- /workshop four-phase craft heritage and Bristol registry
    Journal.tsx             -- /journal editorial essays on joinery, timber, and posture
    NotFound.tsx            -- 404 archive lookup
```

---

## 6. Performance & Quality Benchmarks

- **3D Lazy Loading:** Initial JS chunk is ~70 kB gzipped; Three.js / R3F is code-split into a separate lazy chunk loaded only when a 3D canvas is mounted.
- **Frame Rate:** 60 FPS maintained during hero idle drift, mouse parallax, and PDP 360° scroll turntable scrubbing.
- **Accessibility:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`), full keyboard focus rings in brass, Esc key modal/drawer dismissal, and ARIA attributes throughout.
