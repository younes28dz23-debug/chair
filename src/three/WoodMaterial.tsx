import React, { useMemo } from 'react';
import * as THREE from 'three';

interface WoodMaterialProps {
  woodType: 'oak' | 'walnut' | 'ash' | string;
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
}

// Procedural high-fidelity wood grain texture generator
const createWoodTexture = (type: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    let baseColor = '#D7C4A5';
    let grainColor = '#B8A07D';
    let ringCount = 35;

    if (type === 'walnut') {
      baseColor = '#4A3321';
      grainColor = '#2F1E13';
      ringCount = 42;
    } else if (type === 'ash') {
      baseColor = '#E8DDCC';
      grainColor = '#D0C3AD';
      ringCount = 28;
    }

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render organic wood grain lines
    ctx.strokeStyle = grainColor;
    ctx.lineWidth = 1.8;

    for (let i = 0; i < ringCount; i++) {
      const yBase = (canvas.height / ringCount) * i;
      ctx.beginPath();
      ctx.moveTo(0, yBase);

      for (let x = 0; x < canvas.width; x += 30) {
        const noise = Math.sin(x * 0.01 + i) * 8 + Math.sin(x * 0.03 + i * 2) * 4;
        ctx.lineTo(x, yBase + noise);
      }
      ctx.globalAlpha = 0.35 + Math.random() * 0.3;
      ctx.stroke();
    }

    // Add fine wood pores
    ctx.fillStyle = grainColor;
    for (let p = 0; p < 800; p++) {
      const px = Math.random() * canvas.width;
      const py = Math.random() * canvas.height;
      const pw = Math.random() * 20 + 5;
      const ph = Math.random() * 1.5 + 0.5;
      ctx.globalAlpha = 0.15;
      ctx.fillRect(px, py, pw, ph);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
};

// Procedural normal map for matte oiled grain
const createWoodNormalMap = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#8080FF'; // Neutral normal base
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#8578FF';
    ctx.lineWidth = 2;
    for (let i = 0; i < 50; i++) {
      const y = (canvas.height / 50) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 3);
      }
      ctx.globalAlpha = 0.2;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
};

export const WoodMaterial: React.FC<WoodMaterialProps> = ({
  woodType = 'walnut',
  roughness = 0.62,
  metalness = 0.02,
  clearcoat = 0.08,
}) => {
  const texture = useMemo(() => createWoodTexture(woodType), [woodType]);
  const normalMap = useMemo(() => createWoodNormalMap(), []);

  return (
    <meshPhysicalMaterial
      map={texture}
      normalMap={normalMap}
      normalScale={new THREE.Vector2(0.3, 0.3)}
      roughness={roughness}
      metalness={metalness}
      clearcoat={clearcoat}
      clearcoatRoughness={0.4}
      reflectivity={0.35}
    />
  );
};
