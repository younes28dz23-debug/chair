import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for full scroll
  className?: string;
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 35,
  className = 'bg-cream text-walnut/70 py-6 border-y border-walnut/10',
  separator = '✦',
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none group ${className}`}>
      <div
        className="inline-flex gap-8 items-center uppercase tracking-[0.2em] text-xs font-medium animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-8">
            <span className="hover:text-walnut transition-colors">{item}</span>
            <span className="text-brass/60 text-[10px]">{separator}</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
