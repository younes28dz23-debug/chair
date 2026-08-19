import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageSequenceOptions {
  frames: string[];
  autoPreload?: boolean;
}

export const useImageSequence = ({ frames, autoPreload = true }: UseImageSequenceOptions) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef<number>(0);

  // Preload frames
  useEffect(() => {
    if (!autoPreload || !frames || frames.length === 0) return;

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    let isCancelled = false;

    frames.forEach((src, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;

      const handleLoad = async () => {
        if (isCancelled) return;
        try {
          if ('decode' in img) {
            await img.decode();
          }
        } catch {
          // Ignore decode errors if already loaded
        }
        loadedCount += 1;
        setProgress(Math.round((loadedCount / frames.length) * 100));

        if (loadedCount === frames.length) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad; // Avoid blocking if an individual frame fails
      loadedImages[index] = img;
    });

    return () => {
      isCancelled = true;
    };
  }, [frames, autoPreload]);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const totalFrames = frames.length;
      const normalizedIndex = ((Math.round(frameIndex) % totalFrames) + totalFrames) % totalFrames;
      currentFrameRef.current = normalizedIndex;

      const img = images[normalizedIndex];
      if (!img || !img.complete) {
        // Fallback: draw placeholder silhouette if image not ready
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fit image centered maintaining aspect ratio
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio) * 0.85;

      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    },
    [images, frames.length]
  );

  const drawByProgress = useCallback(
    (scrollProgress: number) => {
      const totalFrames = frames.length || 36;
      const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));
      drawFrame(frameIndex);
    },
    [drawFrame, frames.length]
  );

  return {
    canvasRef,
    isLoaded,
    loadProgress: progress,
    currentFrame: currentFrameRef.current,
    drawFrame,
    drawByProgress,
  };
};
