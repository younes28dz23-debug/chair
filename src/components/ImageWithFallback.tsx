import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop';

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error whenever src prop changes so new images load immediately
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <img
      src={hasError ? fallbackSrc : (src || fallbackSrc)}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
