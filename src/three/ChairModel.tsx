import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WoodMaterial } from './WoodMaterial';

interface ChairModelProps {
  woodType?: string;
  seatType?: string;
  chairSlug?: string;
  isIdleSpin?: boolean;
  manualRotationY?: number;
  enableParallax?: boolean;
}

export const ChairModel: React.FC<ChairModelProps> = ({
  woodType = 'walnut',
  seatType = 'cord',
  chairSlug = 'monolith-lounge',
  isIdleSpin = true,
  manualRotationY,
  enableParallax = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Seat material configurations
  const seatMaterial = useMemo(() => {
    let color = '#EADBC4';
    let roughness = 0.85;

    if (seatType === 'leather') {
      color = '#6E4023';
      roughness = 0.35;
    } else if (seatType === 'boucle') {
      color = '#ECE6DD';
      roughness = 0.96;
    } else if (seatType === 'rush') {
      color = '#D6C098';
      roughness = 0.9;
    }

    return (
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.03}
      />
    );
  }, [seatType]);

  // Curved Crest Rail Geometry (Continuous Steam-Bent Tube)
  const curvedRailGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.52, 0.44, 0.32), // Left armrest tip
      new THREE.Vector3(-0.58, 0.47, 0.05), // Left arm elbow
      new THREE.Vector3(-0.54, 0.52, -0.28), // Left back corner
      new THREE.Vector3(0, 0.54, -0.38),    // Center crest curve
      new THREE.Vector3(0.54, 0.52, -0.28),  // Right back corner
      new THREE.Vector3(0.58, 0.47, 0.05),  // Right arm elbow
      new THREE.Vector3(0.52, 0.44, 0.32),  // Right armrest tip
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.038, 16, false);
  }, []);

  // Dining Curved Rail Geometry (Half-moon top backrest)
  const diningRailGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.48, 0.50, -0.12),
      new THREE.Vector3(-0.42, 0.58, -0.32),
      new THREE.Vector3(0, 0.62, -0.38),
      new THREE.Vector3(0.42, 0.58, -0.32),
      new THREE.Vector3(0.48, 0.50, -0.12),
    ]);
    return new THREE.TubeGeometry(curve, 36, 0.034, 16, false);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Pointer parallax calculation (subtle, elegant tilt)
    if (enableParallax) {
      const mouse = state.pointer;
      targetRotation.current.x = -mouse.y * 0.08;
      targetRotation.current.y = mouse.x * 0.12;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );
    }

    // Idle rotation or manual turntable rotation
    if (manualRotationY !== undefined) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        manualRotationY,
        0.1
      );
    } else if (isIdleSpin) {
      groupRef.current.rotation.y += delta * 0.22; // ~0.22 rad/s idle spin
    }

    // Gentle float oscillation (anchored near floor)
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin((time * Math.PI * 2) / 4) * 0.018;
  });

  // Archetype 1: Stool (The Atelier Counter Stool)
  if (chairSlug === 'atelier-stool') {
    return (
      <group ref={groupRef} position={[0, 0, 0]} scale={1.05} dispose={null}>
        {/* Round Dished Solid Timber Seat */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.44, 0.08, 32]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        {/* Seat Cushion / Inlay */}
        <mesh position={[0, 0.365, 0]} castShadow>
          <cylinderGeometry args={[0.40, 0.40, 0.025, 32]} />
          {seatMaterial}
        </mesh>

        {/* 3 Turned Splayed Legs */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
          const x = Math.sin(angle) * 0.34;
          const z = Math.cos(angle) * 0.34;
          return (
            <mesh
              key={idx}
              position={[x, -0.19, z]}
              rotation={[Math.cos(angle) * 0.12, 0, -Math.sin(angle) * 0.12]}
              castShadow
            >
              <cylinderGeometry args={[0.028, 0.018, 0.98, 20]} />
              <WoodMaterial woodType={woodType} />
            </mesh>
          );
        })}

        {/* Circular Solid Brass Footrest Ring */}
        <mesh position={[0, -0.28, 0]} rotation={[1.57, 0, 0]}>
          <torusGeometry args={[0.34, 0.015, 16, 32]} />
          <meshStandardMaterial color="#C9A227" metalness={0.88} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  // Archetype 2: Dining Chair (The Arc Sculpted Dining Chair)
  if (chairSlug === 'arc-dining') {
    return (
      <group ref={groupRef} position={[0, 0, 0]} scale={1.08} dispose={null}>
        {/* Dining Seat Slab */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.05, 0.96]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        {/* Hand-woven Dining Seat Pad */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.88, 0.035, 0.88]} />
          {seatMaterial}
        </mesh>

        {/* Continuous Curved Half-Moon Crest Rail (No armrests) */}
        <mesh geometry={diningRailGeometry} castShadow receiveShadow>
          <WoodMaterial woodType={woodType} />
        </mesh>

        {/* Slender Backrest Spindles */}
        {[-0.28, -0.14, 0, 0.14, 0.28].map((x, idx) => (
          <mesh
            key={idx}
            position={[x, 0.32, -0.34 + Math.abs(x) * 0.04]}
            rotation={[-0.04, 0, x * 0.03]}
            castShadow
          >
            <cylinderGeometry args={[0.014, 0.018, 0.54, 16]} />
            <WoodMaterial woodType={woodType} />
          </mesh>
        ))}

        {/* Rear Upright Stile Posts */}
        <mesh position={[-0.42, 0.32, -0.34]} rotation={[-0.03, 0, -0.02]} castShadow>
          <cylinderGeometry args={[0.024, 0.028, 0.58, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.42, 0.32, -0.34]} rotation={[-0.03, 0, 0.02]} castShadow>
          <cylinderGeometry args={[0.024, 0.028, 0.58, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>

        {/* 4 Tapered Dining Legs touching floor at -0.70 */}
        <mesh position={[-0.40, -0.32, 0.36]} rotation={[0.06, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.028, 0.018, 0.72, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.40, -0.32, 0.36]} rotation={[0.06, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.028, 0.018, 0.72, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[-0.40, -0.32, -0.36]} rotation={[-0.06, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.028, 0.018, 0.72, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.40, -0.32, -0.36]} rotation={[-0.06, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.028, 0.018, 0.72, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
      </group>
    );
  }

  // Archetype 3: Highback Reading Chair (The Strata)
  if (chairSlug === 'strata-reading' || chairSlug === 'tribeca-club') {
    return (
      <group ref={groupRef} position={[0, 0, 0]} scale={1.05} dispose={null}>
        {/* Deep Lounge Cushion Base */}
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.12, 0.12, 1.10]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0, 0.10, -0.02]} castShadow>
          <boxGeometry args={[1.02, 0.10, 1.00]} />
          {seatMaterial}
        </mesh>

        {/* Tall Architectural Wing Backrest */}
        <group position={[0, 0.54, -0.44]}>
          <mesh rotation={[0.06, 0, 0]} castShadow>
            <boxGeometry args={[1.10, 0.08, 0.06]} />
            <WoodMaterial woodType={woodType} />
          </mesh>
          {/* Vertical Timber Slats */}
          {[-0.42, -0.25, -0.08, 0.08, 0.25, 0.42].map((x, idx) => (
            <mesh key={idx} position={[x, -0.22, 0]} castShadow>
              <cylinderGeometry args={[0.018, 0.022, 0.68, 16]} />
              <WoodMaterial woodType={woodType} />
            </mesh>
          ))}
        </group>

        {/* Deep Walnut Side Arms */}
        <mesh position={[-0.52, 0.28, 0]} castShadow>
          <boxGeometry args={[0.07, 0.045, 0.88]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.52, 0.28, 0]} castShadow>
          <boxGeometry args={[0.07, 0.045, 0.88]} />
          <WoodMaterial woodType={woodType} />
        </mesh>

        {/* Splayed Turned Legs */}
        <mesh position={[-0.46, -0.34, 0.40]} rotation={[0.08, 0, -0.06]} castShadow>
          <cylinderGeometry args={[0.034, 0.022, 0.68, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.46, -0.34, 0.40]} rotation={[0.08, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.034, 0.022, 0.68, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[-0.46, -0.34, -0.40]} rotation={[-0.08, 0, -0.06]} castShadow>
          <cylinderGeometry args={[0.034, 0.022, 0.68, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.46, -0.34, -0.40]} rotation={[-0.08, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.034, 0.022, 0.68, 20]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
      </group>
    );
  }

  // Archetype 4: Flagship Scandinavian Armchair (Monolith Lounge / Fyn Cord / Pavilion / Default)
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.08} dispose={null}>
      {/* 1. Sculpted Curved Wooden Seat Ring Frame */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.06, 1.04]} />
        <WoodMaterial woodType={woodType} />
      </mesh>

      {/* 2. Hand-Tensioned Danish Cord / Leather Seat Cushion */}
      <mesh position={[0, 0.075, -0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.98, 0.045, 0.94]} />
        {seatMaterial}
      </mesh>

      {/* 3. Sweeping Steam-Bent Continuous Crest Rail (Armrests & Back) */}
      <mesh geometry={curvedRailGeometry} castShadow receiveShadow>
        <WoodMaterial woodType={woodType} />
      </mesh>

      {/* 4. Sculpted Y-Back Wishbone Center Spline */}
      <group position={[0, 0.28, -0.34]}>
        {/* Upper Y-split branches */}
        <mesh position={[-0.10, 0.14, 0]} rotation={[0, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.018, 0.022, 0.22, 16]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh position={[0.10, 0.14, 0]} rotation={[0, 0, 0.28]} castShadow>
          <cylinderGeometry args={[0.018, 0.022, 0.22, 16]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        {/* Lower stem to seat rail */}
        <mesh position={[0, -0.04, 0]} castShadow>
          <cylinderGeometry args={[0.024, 0.026, 0.24, 16]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
      </group>

      {/* 5. Front Armrest Turned Support Pillars */}
      <mesh position={[-0.50, 0.25, 0.28]} rotation={[0.04, 0, -0.03]} castShadow>
        <cylinderGeometry args={[0.024, 0.028, 0.38, 20]} />
        <WoodMaterial woodType={woodType} />
      </mesh>
      <mesh position={[0.50, 0.25, 0.28]} rotation={[0.04, 0, 0.03]} castShadow>
        <cylinderGeometry args={[0.024, 0.028, 0.38, 20]} />
        <WoodMaterial woodType={woodType} />
      </mesh>

      {/* 6. Rear Continuous Posts Extending from Crest Rail to Floor */}
      <mesh position={[-0.46, 0.08, -0.32]} rotation={[-0.08, 0, -0.04]} castShadow>
        <cylinderGeometry args={[0.032, 0.022, 1.34, 24]} />
        <WoodMaterial woodType={woodType} />
      </mesh>
      <mesh position={[0.46, 0.08, -0.32]} rotation={[-0.08, 0, 0.04]} castShadow>
        <cylinderGeometry args={[0.032, 0.022, 1.34, 24]} />
        <WoodMaterial woodType={woodType} />
      </mesh>

      {/* 7. Front Turned Tapered Legs */}
      <mesh position={[-0.44, -0.32, 0.36]} rotation={[0.08, 0, -0.06]} castShadow receiveShadow>
        <cylinderGeometry args={[0.032, 0.020, 0.72, 24]} />
        <WoodMaterial woodType={woodType} />
      </mesh>
      <mesh position={[0.44, -0.32, 0.36]} rotation={[0.08, 0, 0.06]} castShadow receiveShadow>
        <cylinderGeometry args={[0.032, 0.020, 0.72, 24]} />
        <WoodMaterial woodType={woodType} />
      </mesh>

      {/* 8. Cross Stretchers with Turned Brass Center Sleeve */}
      {/* Left side rung */}
      <mesh position={[-0.45, -0.34, 0.02]} rotation={[1.57, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.74, 16]} />
        <WoodMaterial woodType={woodType} />
      </mesh>
      {/* Right side rung */}
      <mesh position={[0.45, -0.34, 0.02]} rotation={[1.57, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.74, 16]} />
        <WoodMaterial woodType={woodType} />
      </mesh>
      {/* Center cross rung with brass ferrule */}
      <group position={[0, -0.34, 0.02]}>
        <mesh rotation={[0, 0, 1.57]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.88, 16]} />
          <WoodMaterial woodType={woodType} />
        </mesh>
        <mesh rotation={[0, 0, 1.57]}>
          <cylinderGeometry args={[0.019, 0.019, 0.06, 20]} />
          <meshStandardMaterial color="#C9A227" metalness={0.88} roughness={0.22} />
        </mesh>
      </group>
    </group>
  );
};
