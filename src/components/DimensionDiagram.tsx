import React, { useState } from 'react';
import { Dimensions } from '../data/chairs';

interface DimensionDiagramProps {
  dimensions: Dimensions;
}

export const DimensionDiagram: React.FC<DimensionDiagramProps> = ({ dimensions }) => {
  const [activeEdge, setActiveEdge] = useState<'width' | 'depth' | 'seatHeight' | 'backHeight' | null>(
    null
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-3xl bg-cream/40 border border-walnut/10">
      {/* Interactive Isometric SVG Diagram */}
      <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full text-walnut/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Chair Base Outline */}
          {/* Seat Cushion Slab */}
          <polygon
            points="160,150 240,195 160,240 80,195"
            className="fill-cream/80 stroke-walnut/60"
          />

          {/* Splayed Front & Rear Legs */}
          <line x1="80" y1="195" x2="70" y2="280" className="stroke-walnut/70 stroke-[2]" />
          <line x1="240" y1="195" x2="250" y2="280" className="stroke-walnut/70 stroke-[2]" />
          <line x1="160" y1="240" x2="160" y2="300" className="stroke-walnut/70 stroke-[2]" />
          <line x1="160" y1="150" x2="160" y2="210" className="stroke-walnut/30 stroke-dashed" />

          {/* Backrest Rail & Uprights */}
          <line x1="160" y1="150" x2="160" y2="70" className="stroke-walnut/70 stroke-[2]" />
          <line x1="80" y1="195" x2="90" y2="95" className="stroke-walnut/70 stroke-[2]" />
          <line x1="240" y1="195" x2="230" y2="95" className="stroke-walnut/70 stroke-[2]" />
          <path
            d="M 90,95 Q 160,50 230,95"
            className="stroke-walnut/80 stroke-[2.5]"
          />

          {/* --- INTERACTIVE HIGHLIGHT OVERLAYS (Brass on Hover) --- */}
          {/* 1. Overall Width Dimension Line */}
          <g
            className={`transition-all duration-300 ${
              activeEdge === 'width' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <line
              x1="60"
              y1="290"
              x2="260"
              y2="290"
              className={activeEdge === 'width' ? 'stroke-brass stroke-[2.5]' : 'stroke-ash'}
            />
            <circle cx="60" cy="290" r="3" className={activeEdge === 'width' ? 'fill-brass' : 'fill-ash'} />
            <circle cx="260" cy="290" r="3" className={activeEdge === 'width' ? 'fill-brass' : 'fill-ash'} />
            <text
              x="160"
              y="310"
              textAnchor="middle"
              className={`text-[11px] font-mono tabular-nums ${
                activeEdge === 'width' ? 'fill-walnut font-bold' : 'fill-ash'
              }`}
            >
              Width: {dimensions.width} cm
            </text>
          </g>

          {/* 2. Seat Height Dimension Line */}
          <g
            className={`transition-all duration-300 ${
              activeEdge === 'seatHeight' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <line
              x1="45"
              y1="195"
              x2="45"
              y2="280"
              className={activeEdge === 'seatHeight' ? 'stroke-brass stroke-[2.5]' : 'stroke-ash'}
            />
            <circle cx="45" cy="195" r="3" className={activeEdge === 'seatHeight' ? 'fill-brass' : 'fill-ash'} />
            <circle cx="45" cy="280" r="3" className={activeEdge === 'seatHeight' ? 'fill-brass' : 'fill-ash'} />
            <text
              x="38"
              y="242"
              textAnchor="end"
              className={`text-[10px] font-mono tabular-nums ${
                activeEdge === 'seatHeight' ? 'fill-walnut font-bold' : 'fill-ash'
              }`}
            >
              {dimensions.seatHeight} cm
            </text>
          </g>

          {/* 3. Overall Back Height Dimension Line */}
          <g
            className={`transition-all duration-300 ${
              activeEdge === 'backHeight' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <line
              x1="275"
              y1="65"
              x2="275"
              y2="280"
              className={activeEdge === 'backHeight' ? 'stroke-brass stroke-[2.5]' : 'stroke-ash'}
            />
            <circle cx="275" cy="65" r="3" className={activeEdge === 'backHeight' ? 'fill-brass' : 'fill-ash'} />
            <circle cx="275" cy="280" r="3" className={activeEdge === 'backHeight' ? 'fill-brass' : 'fill-ash'} />
            <text
              x="282"
              y="175"
              textAnchor="start"
              className={`text-[10px] font-mono tabular-nums ${
                activeEdge === 'backHeight' ? 'fill-walnut font-bold' : 'fill-ash'
              }`}
            >
              {dimensions.backHeight} cm
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Dimension Metric Table */}
      <div className="flex-1 w-full space-y-2 text-xs">
        <div
          onMouseEnter={() => setActiveEdge('width')}
          onMouseLeave={() => setActiveEdge(null)}
          className={`flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${
            activeEdge === 'width' ? 'bg-bone text-walnut shadow-sm ring-1 ring-brass/40' : 'text-ash hover:bg-bone/60'
          }`}
        >
          <span className="font-medium">Total Width</span>
          <span className="font-mono tabular-nums text-walnut font-semibold">{dimensions.width} cm</span>
        </div>

        <div
          onMouseEnter={() => setActiveEdge('depth')}
          onMouseLeave={() => setActiveEdge(null)}
          className={`flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${
            activeEdge === 'depth' ? 'bg-bone text-walnut shadow-sm ring-1 ring-brass/40' : 'text-ash hover:bg-bone/60'
          }`}
        >
          <span className="font-medium">Total Depth</span>
          <span className="font-mono tabular-nums text-walnut font-semibold">{dimensions.depth} cm</span>
        </div>

        <div
          onMouseEnter={() => setActiveEdge('seatHeight')}
          onMouseLeave={() => setActiveEdge(null)}
          className={`flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${
            activeEdge === 'seatHeight' ? 'bg-bone text-walnut shadow-sm ring-1 ring-brass/40' : 'text-ash hover:bg-bone/60'
          }`}
        >
          <span className="font-medium">Seat Height (Uncompressed)</span>
          <span className="font-mono tabular-nums text-walnut font-semibold">{dimensions.seatHeight} cm</span>
        </div>

        <div
          onMouseEnter={() => setActiveEdge('backHeight')}
          onMouseLeave={() => setActiveEdge(null)}
          className={`flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${
            activeEdge === 'backHeight' ? 'bg-bone text-walnut shadow-sm ring-1 ring-brass/40' : 'text-ash hover:bg-bone/60'
          }`}
        >
          <span className="font-medium">Total Back Height</span>
          <span className="font-mono tabular-nums text-walnut font-semibold">{dimensions.backHeight} cm</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl text-ash">
          <span className="font-medium">Finished Weight</span>
          <span className="font-mono tabular-nums text-walnut font-semibold">{dimensions.weightKg} kg</span>
        </div>
      </div>
    </div>
  );
};
