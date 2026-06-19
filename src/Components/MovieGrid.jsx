import React from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

/**
 * Shared grid for any page that lists movies. Centralizing loading / error /
 * empty states here means every page (Home, Bollywood, Search, Watchlist)
 * gets the same consistent skeletons and messaging for free.
 */
export default function MovieGrid({
  movies,
  loading,
  error,
  skeletonCount = 10,
  emptyIcon = '🎬',
  emptyTitle = 'Nothing here yet',
  emptyMessage = 'Check back soon.',
}) {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-block" role="alert">
        <div className="state-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="state-block">
        <div className="state-icon">{emptyIcon}</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
