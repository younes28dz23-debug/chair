# Luxury Furniture E-Commerce & 3D Interactive Design Research

> **Project:** SEDDIA Studio — Workshop-Led Premium Chair Store  
> **Date:** 2026-08-19  
> **Author:** Lead Product Designer + Front-End Engineer  

---

## 1. Typography Pairings & Type Scale

From studying Carl Hansen & Son, Fritz Hansen, Vitra, and Audo Copenhagen:
- **Display Type:** High-contrast editorial serifs (e.g. *Playfair Display*, *Instrument Serif*, *Cormorant Garamond*). Used strictly for emotive storytelling, hero headlines, and quiet section declarations.
  - Scale: `clamp(3rem, 8vw, 7.5rem)`, tightly kerned (`tracking-[-0.02em]`), ultra-compressed line-height (`leading-[0.92]`).
- **Body & UI Type:** Neutral, highly legible grotesque sans-serif (*Inter* or *Satoshi*).
  - Scale: Body `15px–17px`, `leading-[1.6]`.
  - Eyebrows: `11px`, all caps, wide tracking (`tracking-[0.24em]`), color `ash` (`#8A7E6F`).
  - Prices: Tabular figures (`font-mono` / tabular numerals), strictly body weight (never heavy bold, never celebratory red, never with strikethroughs).
- **Discipline:** Max 2 font families, max 2 weights per family (Regular 400 & Medium 500).

---

## 2. Color Palettes & Restraint

Counting colors across luxury masters (Fritz Hansen, Vitra, Hem):
- Master sites use **no more than 4–5 core tones**.
- **SEDDIA 5-Token System:**
  1. `walnut` (`#321C04`): Deep architectural dark for type, borders, and inverted master sections.
  2. `cream` (`#F5EFE6`): Tactile secondary background for craft storytelling, mega-menu, and cards.
  3. `bone` (`#FFFDF9`): Calming canvas background, avoiding sterile 100% white (`#FFFFFF`).
  4. `brass` (`#C9A227`): Single precious metal accent for CTAs, active swatches, and focus rings. Never more than one brass touch in view.
  5. `ash` (`#8A7E6F`): Muted architectural tone for subtitles, specs, and dividers.

---

## 3. Whitespace Ratios

- Top-tier furniture sites treat **whitespace as the product itself**. 
- Hero product shots sit in 60–70% surrounding negative space.
- Section vertical rhythm: `py-28 md:py-40` (112px to 160px vertical padding).
- Generous container margins (`max-w-7xl px-6 md:px-12`) give pieces room to breathe like museum gallery pedestals.

---

## 4. Product Detail Page (PDP) Anatomy

1. **Turntable / Hero 360 Spin:** Centered or split-left, pinned scroll or clean drag, zero distracting UI chrome until interacted with.
2. **Designer Attribution:** "Hans J. Wegner, 1949" or "Studio SEDDIA, 2021" placed above the product title in small caps.
3. **Restrained Price & Rating:** Quiet price adjacent to stars (4.8+ rating with review count), never screaming discounts.
4. **Tactile Variant Selectors:**
   - Wood swatches (Solid Oak, American Walnut, White Ash) with live cross-fade on 3D/imagery.
   - Seat material swatches (Natural Rush, Danish Cord, Wool Bouclé, Saddle Leather) with transparent delta pricing (`+ $120`).
5. **Trust Markers:** 3-point inline signal (`100% FSC Timber`, `10-Year Frame Warranty`, `Free White-Glove Delivery`).
6. **Technical Dimension Drawings:** Isometric line diagrams with highlighted dimensions on hover.
7. **Maker Story:** Signatures, workshop origin, mortise-and-tenon craft explanations.

---

## 5. Motion Language: Slow & Weighty

- **Restraint Over Spectacle:** Luxury motion is slow, smooth, and deliberate (400ms–1100ms), using `cubic-bezier(0.16, 1, 0.3, 1)`.
- Nothing bounces, nothing snaps, no spring physics on UI chrome.
- Animations operate strictly on `transform` and `opacity` to maintain silky 60fps.
- Full respect for `prefers-reduced-motion` and hardware constraints.

---

## 6. Navigation Patterns

- **Floating Minimalist Pill:** `fixed top-6 left-1/2 -translate-x-1/2`, frosted glass `backdrop-blur-xl bg-bone/70 border border-walnut/10`.
- **Mega-Menu:** Contextual cream slide-down panel with curated taxonomy (By Room / By Timber / Curated Piece).
- **Cart Access:** Slide-over drawer (not a jarring redirect page) with a free-shipping threshold bar ($500) and smooth fly-to-cart feedback.

---

## 7. The Three Patterns Adopted & Reference Lineage

We are adopting these three specific patterns for **SEDDIA**:

1. **Apple / Polestar Pinned Scroll Turntable + Graceful 36-Frame Downgrade (from Apple AirPods & Polestar Configurator):**
   - The PDP pins the turntable for 100vh of scroll, smoothly rotating the chair through a full 360° circle (`rotation.y = scrollProgress * Math.PI * 2`). On lower-power devices or reduced motion, it degrades to a 36-frame preloaded canvas sequence.
   - *Why:* It gives customers complete spatial certainty about joinery, seat weave, and backrest curvature without forcing them to manually discover 3D orbit controls.

2. **Carl Hansen & Son Craft Storytelling & Live Material Cross-fade:**
   - Wood finishes (Oak, Walnut, Ash) and seat materials (Rush, Cord, Leather) dynamically cross-fade on the 3D model and gallery, accompanied by macro texture swatches and tactile descriptors.
   - *Why:* Premium chair buyers are purchasing heritage materials; communicating the wood grain, oiled sheen, and joinery integrity elevates the purchase from a piece of furniture to an heirloom.

3. **Vitra Minimalist Grid & Designer-First Hierarchy with Architectural Features Section:**
   - Sticky left editorial anchor with scrolling architectural feature cards (Mortise-and-Tenon, Kiln-Dried 8% Hardwood, Re-weavable Seats, Hand-Rubbed Oil, Numbered & Signed).
   - *Why:* Establishes deep authority and justifies the $1,200+ price point through visible engineering and artisanal integrity.
