// src/utils/useReviews.js
// Small hook centralizing per-movie review storage. Ratings/reviews require
// auth (per the product rules) — this hook doesn't enforce that itself
// (the UI does, so we can show a locked state), it just handles storage.

import { useCallback, useEffect, useState } from 'react';

function key(movieId) {
  return `cinereview_reviews_${movieId}`;
}

function readReviews(movieId) {
  try {
    return JSON.parse(localStorage.getItem(key(movieId))) || [];
  } catch {
    return [];
  }
}

export function useReviews(movieId) {
  const [reviews, setReviews] = useState(() => (movieId ? readReviews(movieId) : []));

  useEffect(() => {
    if (movieId) setReviews(readReviews(movieId));
  }, [movieId]);

  const addReview = useCallback(
    (review) => {
      const next = [...readReviews(movieId), review];
      localStorage.setItem(key(movieId), JSON.stringify(next));
      setReviews(next);
    },
    [movieId]
  );

  const deleteReview = useCallback(
    (index) => {
      const next = readReviews(movieId).filter((_, i) => i !== index);
      localStorage.setItem(key(movieId), JSON.stringify(next));
      setReviews(next);
    },
    [movieId]
  );

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return { reviews, addReview, deleteReview, average };
}
