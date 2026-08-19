import React, { useState, useEffect } from 'react';

interface SceneFallbackProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
  onDragAngleChange?: (angleDeg: number) => void;
  isInteractive?: boolean;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({
  imageSrc = 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
  altText = 'Handcrafted solid wood chair in quiet studio lighting',
  className = 'w-full h-full min-h-[420px]',
  onDragAngleChange,
  isInteractive = true,
}) => {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngle, setStartAngle] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartAngle(angle);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isInteractive) return;
    const deltaX = e.clientX - startX;
    const newAngle = ((startAngle + deltaX * 0.8) % 360 + 360) % 360;
    setAngle(newAngle);
    onDragAngleChange?.(newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointerup', handlePointerUp);
      return () => window.removeEventListener('pointerup', handlePointerUp);
    }
  }, [isDragging]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl bg-cream/40 ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      data-cursor={isInteractive ? 'SPIN' : undefined}
    >
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_24px_36px_rgba(50,28,4,0.18)] transition-transform duration-300"
          style={{
            transform: isInteractive ? `scale(${1 + Math.sin((angle * Math.PI) / 180) * 0.04})` : undefined,
          }}
        />
      </div>

      {/* Subtle floor shadow */}
      <div className="absolute bottom-6 h-6 w-3/4 max-w-md rounded-[100%] bg-walnut/15 blur-xl pointer-events-none" />
    </div>
  );
};
