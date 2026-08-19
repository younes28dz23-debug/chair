import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  OrbitControls,
  AdaptiveDpr,
} from '@react-three/drei';
import { ChairModel } from './ChairModel';

interface ChairSceneProps {
  woodType?: string;
  seatType?: string;
  chairSlug?: string;
  isIdleSpin?: boolean;
  manualRotationY?: number;
  enableParallax?: boolean;
  enableOrbit?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const ChairScene: React.FC<ChairSceneProps> = ({
  woodType = 'walnut',
  seatType = 'cord',
  chairSlug = 'monolith-lounge',
  isIdleSpin = true,
  manualRotationY,
  enableParallax = true,
  enableOrbit = true,
  className = 'w-full h-full min-h-[440px]',
  ariaLabel = 'Interactive 3D representation of the handcrafted chair in studio lighting',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className} select-none`}
      data-cursor={enableOrbit ? 'DRAG' : undefined}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [2.4, 0.85, 3.0], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        aria-label={ariaLabel}
        role="img"
        className="touch-none"
      >
        <AdaptiveDpr pixelated />

        <Suspense fallback={null}>
          {/* Studio Environmental Lighting (Zero Network CDN Latency) */}
          <hemisphereLight
            color="#FFFDF0"
            groundColor="#321C04"
            intensity={1.2}
          />

          {/* 1. Key Light (Soft Warm Studio Directional) */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={2.8}
            color="#FFFBF2"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={15}
            shadow-camera-left={-2.5}
            shadow-camera-right={2.5}
            shadow-camera-top={2.5}
            shadow-camera-bottom={-2.5}
            shadow-bias={-0.0001}
          />

          {/* 2. Gentle Soft Fill Light */}
          <directionalLight
            position={[-4, 3, 3]}
            intensity={1.4}
            color="#F5EFE6"
          />

          {/* 3. Golden Rim / Hair Light (Behind) */}
          <directionalLight
            position={[0, 4.5, -5]}
            intensity={2.0}
            color="#FFE6C2"
          />

          {/* 4. Warm Point Glow for Wood Subsurface */}
          <pointLight
            position={[2.5, 0.5, 2.5]}
            intensity={0.9}
            color="#D7C4A5"
          />

          {/* Ambient Base Light */}
          <ambientLight intensity={0.7} color="#FAF6F0" />

          {/* The Chair */}
          <ChairModel
            woodType={woodType}
            seatType={seatType}
            chairSlug={chairSlug}
            isIdleSpin={isIdleSpin}
            manualRotationY={manualRotationY}
            enableParallax={enableParallax}
          />

          {/* Natural Soft Ground Contact Shadow Pool */}
          <ContactShadows
            position={[0, -0.72, 0]}
            opacity={0.65}
            scale={4.2}
            blur={2.0}
            far={2.2}
            color="#321C04"
          />

          {/* Orbit Controls with polar limits */}
          {enableOrbit && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4.5}
              maxPolarAngle={Math.PI / 2.02} // Never see under the floor
              rotateSpeed={0.65}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
