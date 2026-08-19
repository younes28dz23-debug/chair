import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rotate3D, Compass } from 'lucide-react';
import { ChairScene } from '../three/ChairScene';
import { SceneFallback } from '../three/SceneFallback';
import { useDeviceTier } from '../hooks/useDeviceTier';

gsap.registerPlugin(ScrollTrigger);

interface SpinViewerProps {
  woodType: string;
  seatType: string;
  chairSlug: string;
  heroImage: string;
  chairName: string;
}

export const SpinViewer: React.FC<SpinViewerProps> = ({
  woodType,
  seatType,
  chairSlug,
  heroImage,
  chairName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [manualRotationDeg, setManualRotationDeg] = useState<number>(0);
  const [isManualDrag, setIsManualDrag] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; angle: number }>({ x: 0, angle: 0 });

  const deviceTier = useDeviceTier();

  // Calculate current angle in degrees
  const currentAngleDeg = isManualDrag
    ? Math.round(((manualRotationDeg % 360) + 360) % 360)
    : Math.round(scrollProgress * 360);

  // GSAP ScrollTrigger pinning for the 360 turntable
  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top+=80px',
        end: '+=120%',
        pin: pinSection,
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isManualDrag) {
            setScrollProgress(self.progress);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isManualDrag]);

  // Pointer drag controls for manual 360 spin
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsManualDrag(true);
    setHasInteracted(true);
    dragStartRef.current = {
      x: e.clientX,
      angle: isManualDrag ? manualRotationDeg : scrollProgress * 360,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isManualDrag) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const newAngle = dragStartRef.current.angle + deltaX * 0.9;
    setManualRotationDeg(newAngle);
  };

  const handlePointerUp = () => {
    setIsManualDrag(false);
  };

  useEffect(() => {
    if (isManualDrag) {
      window.addEventListener('pointerup', handlePointerUp);
      return () => window.removeEventListener('pointerup', handlePointerUp);
    }
  }, [isManualDrag]);

  const rotationRadians = (currentAngleDeg * Math.PI) / 180;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh]"
    >
      <div
        ref={pinSectionRef}
        className="relative w-full h-[80vh] min-h-[560px] max-h-[820px] flex items-center justify-center overflow-hidden rounded-3xl bg-cream/40 border border-walnut/5 select-none cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Render 3D Canvas or Fallback based on tier */}
        {deviceTier.isWebGLSupported ? (
          <ChairScene
            woodType={woodType}
            seatType={seatType}
            chairSlug={chairSlug}
            isIdleSpin={false}
            manualRotationY={rotationRadians}
            enableParallax={!isManualDrag}
            enableOrbit={false}
            className="w-full h-full"
            ariaLabel={`360 degree turntable view of ${chairName}`}
          />
        ) : (
          <SceneFallback
            imageSrc={heroImage}
            altText={`360 spin view of ${chairName}`}
            className="w-full h-full"
            isInteractive={true}
          />
        )}

        {/* --- TURNTABLE HUD / OVERLAY --- */}
        {/* Top-Right Angle & Progress Indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-3 glass-pill px-4 py-2 rounded-full border border-walnut/10 shadow-subtle pointer-events-none">
          {/* Circular progress SVG */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-walnut/15"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brass transition-all duration-75"
                strokeDasharray={`${(currentAngleDeg / 360) * 100}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <span className="font-mono text-xs text-walnut/80 tracking-wider tabular-nums font-medium">
            {currentAngleDeg}° <span className="text-ash">/ 360°</span>
          </span>
        </div>

        {/* Bottom Center "Drag to spin" hint pill */}
        {!hasInteracted && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-pill px-5 py-2.5 rounded-full border border-walnut/10 shadow-subtle animate-bounce text-xs font-medium text-walnut/80 pointer-events-none">
            <Rotate3D className="w-4 h-4 text-brass" />
            <span>Scroll or drag left/right to spin 360°</span>
          </div>
        )}

        {/* Top-Left Mode Marker */}
        <div className="absolute top-6 left-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash font-medium pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-brass" />
          <span>Interactive 360° Turntable</span>
        </div>
      </div>
    </div>
  );
};
