import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';

interface TimberImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  woodId?: string;
  className?: string;
}

export const TimberImage: React.FC<TimberImageProps> = ({
  src,
  alt,
  woodId = 'oak',
  className = '',
  ...props
}) => {
  // Wood tone styling filters
  const getWoodFilter = (id: string) => {
    switch (id) {
      case 'walnut':
        return 'brightness(0.86) contrast(1.18) sepia(0.22) saturate(1.15) hue-rotate(-10deg)';
      case 'ash':
        return 'brightness(1.08) contrast(0.94) saturate(0.82) sepia(0.06)';
      case 'oak':
      default:
        return 'brightness(1.02) contrast(1.02) sepia(0.12) saturate(1.08)';
    }
  };

  const getOverlayTint = (id: string) => {
    switch (id) {
      case 'walnut':
        return 'rgba(74, 51, 33, 0.16)';
      case 'ash':
        return 'rgba(245, 238, 225, 0.12)';
      case 'oak':
      default:
        return 'rgba(215, 196, 165, 0.10)';
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 ease-out`}
        style={{
          filter: getWoodFilter(woodId),
          transition: 'filter 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        {...props}
      />
      {/* Subtle photorealistic timber glaze overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: getOverlayTint(woodId), mixBlendMode: 'multiply' }}
      />
    </div>
  );
};
