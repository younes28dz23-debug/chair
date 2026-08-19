import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { WoodMaterial } from './WoodMaterial';
import * as THREE from 'three';

const SpinningCylinder: React.FC<{ woodType: string; position: [number, number, number] }> = ({
  woodType,
  position,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(delta * 0.5) * 0.05 + 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <cylinderGeometry args={[0.55, 0.55, 0.9, 32]} />
      <WoodMaterial woodType={woodType} />
    </mesh>
  );
};

export const SwatchCylinders: React.FC<{ className?: string }> = ({
  className = 'w-full h-44',
}) => {
  return (
    <div className={`relative ${className} select-none pointer-events-none`}>
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 4]} intensity={2.0} color="#FFFBF2" />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#F5EFE6" />

        <Suspense fallback={null}>
          <SpinningCylinder woodType="oak" position={[-1.6, 0, 0]} />
          <SpinningCylinder woodType="walnut" position={[0, 0, 0]} />
          <SpinningCylinder woodType="ash" position={[1.6, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};
