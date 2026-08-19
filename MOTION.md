# SEDDIA — Motion Specification & Animation Ledger

All animations throughout the site strictly conform to the 5 duration tokens and the universal brand easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## Animation Ledger

| # | Animation Name | Trigger | Animated Properties | Duration | Easing |
|---|---|---|---|---|---|
| 01 | **Hero Headline Mask Reveal** | Page Load / Initial Mount | `clip-path`, `transform: translateY(110% -> 0%)`, `opacity: 0 -> 1` (120ms stagger) | 1100ms (`dur-cinematic`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 02 | **Hero Eyebrow Fade** | Page Load / Initial Mount | `opacity: 0 -> 1`, `transform: translateY(12px -> 0px)` | 450ms (`dur-base`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 03 | **Hero Stat Counters** | Viewport Enter (once) | Numerical increment (`0 -> target value`) | 1600ms | Linear interpolation timer |
| 04 | **3D Hero Chair Idle Spin** | Continuous WebGL Loop | `rotation.y += delta * 0.18 rad/s` | Continuous | Continuous |
| 05 | **3D Hero Chair Sine Drift** | Continuous WebGL Loop | `position.y = sin(t * 2π / 4) * 0.06 - 0.2` | 4000ms period | Sine wave |
| 06 | **3D Hero Pointer Parallax** | Mouse Movement | `rotation.x = -mouse.y * 0.12`, `rotation.y = mouse.x * 0.15` (lerp 0.05) | Continuous (damped) | `lerp: 0.05` |
| 07 | **Scroll Cue Line Pulse** | Continuous | `transform: translateY(0 -> 6px -> 0)` | 2000ms loop | `easeInOut` |
| 08 | **Split Heading Section Reveals** | Viewport Threshold 15% | Per-line `transform: translateY(110% -> 0%)`, `opacity: 0 -> 1` (120ms stagger) | 1100ms (`dur-cinematic`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 09 | **Scroll Element Reveals** | Viewport Threshold 10% | `transform: translateY(24px -> 0px)`, `opacity: 0 -> 1` | 600ms (`dur-base`/`slow`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 10 | **Navbar Pill Tightening** | Scroll past 40px | `padding`, `background-color`, `box-shadow`, `border-color` | 450ms (`dur-base`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 11 | **Navbar Mega-Menu Dropdown** | Hover / Enter "Chairs" | `opacity: 0 -> 1`, `transform: translateY(-10px -> 0px)` | 240ms (`dur-fast`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 12 | **Mobile Hamburger Icon** | Toggle Click | Top bar `rotate(45deg) translate(6px)`, Middle `opacity(0)`, Bottom `rotate(-45deg) translate(-6px)` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 13 | **Mobile Nav Panel Slide** | Menu Open | `opacity: 0 -> 1`, `transform: translateY(-20px -> 0px)` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 14 | **Cart Badge Pop Count** | Add to Bag Item Increment | `transform: scale(0.5 -> 1.35 -> 1)`, `opacity: 0 -> 1` | 350ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 15 | **Cart Slide-Over Drawer** | Cart Open / Toggle | `transform: translateX(100% -> 0%)`, Backdrop `opacity: 0 -> 1` | 450ms (`dur-base`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 16 | **Cart Line Items Stagger** | Cart Open | `opacity: 0 -> 1`, `transform: translateY(12px -> 0px)` (50ms stagger) | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 17 | **Free Shipping Threshold Bar** | Cart State Update | `width: 0% -> calculated %` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 18 | **Featured Rail Velocity Skew** | Horizontal Inertial Scroll | `transform: skewX(delta * 0.05 deg)` (clamped ±2.5°) settling back to `0deg` | Dynamic -> 150ms settle | `ease-out` |
| 19 | **Product Card Room Crossfade** | Card Hover | Hero image `scale: 1.05, opacity: 0`, Room image `scale: 1.05, opacity: 1` | 700ms (`dur-slow`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 20 | **Product Card Quick-Add Reveal** | Card Hover | `transform: translateY(8px -> 0px)`, `opacity: 0 -> 1` | 450ms (`dur-base`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 21 | **Wood Swatch Ring Draw** | Swatch Selection | Ring `transform: scale(0.9 -> 1.1)`, border draw `border-brass` | 250ms (`dur-fast`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 22 | **PDP Pinned 360 Turntable** | Scroll (GSAP Scrub) | `group.rotation.y = scrollProgress * 2π` (damped lerp 0.1) | 100vh pinned scrub | `linear scrub / lerp` |
| 23 | **PDP Manual Drag Turntable** | Pointer Drag | `manualRotationY += deltaX * 0.75 deg` | Real-time pointer response | `lerp: 0.1` |
| 24 | **PDP Live Variant Crossfade** | Wood/Seat Swatch Click | `MeshPhysicalMaterial` texture map & color swap | 400ms crossfade | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 25 | **Dimension Diagram Edge Highlight**| Spec Row Hover | SVG dimension lines `stroke: #8A7E6F -> #C9A227`, `opacity: 0.3 -> 1`, `stroke-width: 1.5 -> 2.5` | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 26 | **Accordion Height Expansion** | Section Click | `height: 0 -> auto`, `opacity: 0 -> 1`, chevron `rotate(0 -> 180deg)` | 350ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 27 | **Custom Desktop Brass Cursor** | Pointer Movement & Hover | `x, y` spring follow; scale `8px -> 28px -> 72px` with text reveal | Spring (stiffness 350, damping 30) | Spring physics |
| 28 | **Infinite Marquee Strip** | Continuous Auto-Scroll | `transform: translateX(0% -> -50%)` (pauses on hover) | 40s linear loop | Linear |
| 29 | **Page Route Transition** | Route Change | Cream panel `scaleY(1 -> 0)`, incoming content `opacity: 0 -> 1` | 800ms total | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 30 | **Footer Dark Silhouette Rotation** | Continuous Ambient Loop | `transform: rotate(0deg -> 360deg)` | 120s linear loop | Linear |
