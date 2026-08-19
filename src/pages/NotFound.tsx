import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen bg-bone pt-40 pb-24 flex items-center justify-center text-walnut px-6">
      <div className="max-w-md text-center">
        <Reveal>
          <div className="font-serif text-7xl font-medium text-brass mb-4 tabular-nums">
            404
          </div>
          <h1 className="font-serif text-3xl font-medium text-walnut mb-3">
            Piece Not Found in Archive
          </h1>
          <p className="text-sm text-ash mb-8 leading-relaxed">
            The chair or page you are seeking may have been retired or catalogued under a different identifier.
          </p>
          <Link
            to="/chairs"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-walnut hover:bg-brass/90 transition-colors shadow-luxury"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Collection</span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
};
