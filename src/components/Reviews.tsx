import React, { useState } from 'react';
import { Star, ShieldCheck, Check } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  variantBought: string;
  verified: boolean;
}

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  chairName: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ rating, reviewCount, chairName }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      author: 'Alistair Sterling',
      location: 'Edinburgh, UK',
      rating: 5,
      date: '3 weeks ago',
      title: 'Architectural permanence in daily use',
      comment:
        'The Monolith is the most comfortable unpadded chair I have ever sat in. The steam-bent crest rail hits the lumbar at precisely the right angle. The walnut has already begun to deepen into a stunning amber patina.',
      variantBought: 'American Black Walnut / Unbleached Danish Cord',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Clara Beaufort',
      location: 'Cotswolds, UK',
      rating: 5,
      date: '2 months ago',
      title: 'Heirloom quality worth every penny',
      comment:
        'Delivered by two courteous craftsmen who unwrapped the chair and took all packaging away. The maker’s brass mark on the underside gives it so much character. Truly a lifetime piece.',
      variantBought: 'European Solid Oak / Natural River Rush',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Marcus Lind',
      location: 'Stockholm, Sweden',
      rating: 5,
      date: '4 months ago',
      title: 'Flawless joinery and cord tension',
      comment:
        'As an architect, I inspected the mortise tenons with a magnifying glass. Not a single millimeter of glue blowout or misalignment. The paper cord weave is taut and comfortable for 6+ hour reading sessions.',
      variantBought: 'Nordic White Ash / Gotland Wool Bouclé',
      verified: true,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    setReviews([
      {
        id: `rev-${Date.now()}`,
        author: newAuthor,
        location: 'London, UK',
        rating: 5,
        date: 'Just now',
        title: newTitle || 'Exceptional craftsmanship',
        comment: newComment,
        variantBought: 'Bespoke Order',
        verified: true,
      },
      ...reviews,
    ]);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setIsSubmitted(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  const histogram = [
    { stars: 5, percent: 88, count: Math.round(reviewCount * 0.88) },
    { stars: 4, percent: 10, count: Math.round(reviewCount * 0.1) },
    { stars: 3, percent: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 2, percent: 0, count: 0 },
    { stars: 1, percent: 0, count: 0 },
  ];

  return (
    <div className="pt-16 border-t border-walnut/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Summary & Histogram */}
          <div className="lg:col-span-4 bg-cream/50 rounded-3xl p-8 border border-walnut/10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-5xl font-medium text-walnut tabular-nums">
                {rating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <div className="flex text-brass">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brass" />
                  ))}
                </div>
                <span className="text-xs text-ash mt-1">Based on {reviewCount} verified reviews</span>
              </div>
            </div>

            {/* Histogram Bars */}
            <div className="space-y-2.5 my-6 pt-6 border-t border-walnut/10 text-xs">
              {histogram.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-12 text-ash font-medium">{row.stars} Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-walnut/10 overflow-hidden">
                    <div
                      className="h-full bg-brass rounded-full"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-ash font-mono tabular-nums">{row.count}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="w-full rounded-full border border-walnut py-3 text-xs font-semibold uppercase tracking-widest text-walnut hover:bg-walnut hover:text-bone transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Right Reviews List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Review Form Modal/Drawer */}
            {isFormOpen && (
              <div className="p-6 rounded-3xl bg-cream border border-walnut/10 mb-8">
                <h4 className="font-serif text-lg text-walnut font-medium mb-3">
                  Share Your Experience with {chairName}
                </h4>

                {isSubmitted ? (
                  <div className="py-4 text-center text-xs text-brass font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Thank you for your review. It is published below.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-ash uppercase tracking-wider font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={e => setNewAuthor(e.target.value)}
                        placeholder="E.g. David H."
                        className="w-full rounded-xl bg-bone border border-walnut/20 px-4 py-2 text-walnut focus:outline-none focus:border-brass"
                      />
                    </div>

                    <div>
                      <label className="block text-ash uppercase tracking-wider font-medium mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="E.g. Exceptional lumbar support and grain"
                        className="w-full rounded-xl bg-bone border border-walnut/20 px-4 py-2 text-walnut focus:outline-none focus:border-brass"
                      />
                    </div>

                    <div>
                      <label className="block text-ash uppercase tracking-wider font-medium mb-1">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Describe the posture, wood finish, and comfort..."
                        className="w-full rounded-xl bg-bone border border-walnut/20 px-4 py-2 text-walnut focus:outline-none focus:border-brass"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 text-ash hover:text-walnut"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-brass px-6 py-2 text-walnut font-semibold uppercase tracking-wider shadow-sm"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Render reviews */}
            <div className="divide-y divide-walnut/10">
              {reviews.map((rev) => (
                <div key={rev.id} className="py-6 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex text-brass">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-brass" />
                        ))}
                      </div>
                      <span className="font-serif text-base font-medium text-walnut">
                        {rev.title}
                      </span>
                    </div>
                    <span className="text-xs text-ash">{rev.date}</span>
                  </div>

                  <p className="text-sm text-ash leading-relaxed mb-3">
                    {rev.comment}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-ash">
                    <span className="font-medium text-walnut">{rev.author}</span>
                    <span>·</span>
                    <span>{rev.location}</span>
                    <span>·</span>
                    <span className="bg-cream/80 px-2 py-0.5 rounded-full border border-walnut/5">
                      {rev.variantBought}
                    </span>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-brass font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
