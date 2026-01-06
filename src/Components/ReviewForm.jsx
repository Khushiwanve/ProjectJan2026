import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault(); // 👈 Important
    if (!text || rating === 0) return;
    onSubmit({ text, rating });
    setText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Leave a Review</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-28 p-3 rounded-lg bg-zinc-800 text-white"
        placeholder="Your review..."
      />

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            fill={star <= rating ? 'yellow' : 'none'}
            className={`cursor-pointer text-yellow-400 ${
              star <= rating ? 'fill-yellow-400' : 'fill-none'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

