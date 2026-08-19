import React from 'react';

interface LogoProps {
  fill?: string;
  className?: string;
  withWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  fill = '#321C04',
  className = 'h-6 w-auto',
  withWordmark = true,
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 256 128"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
          fill={fill}
        />
      </svg>
      {withWordmark && (
        <span
          className="font-serif tracking-[0.18em] text-lg font-medium uppercase transition-colors"
          style={{ color: fill }}
        >
          SEDDIA
        </span>
      )}
    </div>
  );
};
