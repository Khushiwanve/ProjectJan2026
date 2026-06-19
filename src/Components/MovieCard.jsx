import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './moviecard.css';

/**
 * Compact movie card used in grids (Home, Search, Bollywood, Watchlist...).
 * - Wishlist button works for guests AND logged-in users (no auth gate).
 * - Clicking the card opens the full detail page, where ratings/reviews live.
 */
export default function MovieCard({ movie }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);

  const poster = movie.poster || '';
  const saved = isInWishlist(movie.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="mc-card">
      <div className="mc-poster-wrap">
        {!imgError && poster ? (
          <img
            src={poster}
            alt={`${movie.title} poster`}
            className="mc-poster"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="mc-poster-fallback">
            <span aria-hidden="true">🎬</span>
            <span>{movie.title}</span>
          </div>
        )}

        <button
          type="button"
          className={`mc-wish-btn ${saved ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${movie.title} from wishlist` : `Add ${movie.title} to wishlist`}
        >
          {saved ? '❤️' : '🤍'}
        </button>

        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <span className="mc-avg">⭐ {movie.imdbRating}</span>
        )}
      </div>

      <div className="mc-body">
        <h3 className="mc-title">{movie.title}</h3>
        {movie.year && <span className="mc-year">{movie.year}</span>}
      </div>
    </Link>
  );
}
