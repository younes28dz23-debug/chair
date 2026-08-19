import { useState, useEffect } from 'react';

export interface DeviceTier {
  isWebGLSupported: boolean;
  isLowPower: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldUseFallback: boolean;
  dpr: number;
}

export const useDeviceTier = (): DeviceTier => {
  const [tier, setTier] = useState<DeviceTier>({
    isWebGLSupported: true,
    isLowPower: false,
    isMobile: false,
    prefersReducedMotion: false,
    shouldUseFallback: false,
    dpr: 1.5,
  });

  useEffect(() => {
    let hasWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      hasWebGL = Boolean(gl);
    } catch {
      hasWebGL = false;
    }

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 640;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1.5;

    setTier({
      isWebGLSupported: hasWebGL,
      isLowPower: !hasWebGL,
      isMobile: isMobileDevice,
      prefersReducedMotion: false,
      shouldUseFallback: !hasWebGL,
      dpr,
    });
  }, []);

  return tier;
};
