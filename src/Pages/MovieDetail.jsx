import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../utils/useReviews';
import { getMovieById, normalizeMovie } from '../utils/omdb';
import './movieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { reviews, addReview, deleteReview, average } = useReviews(id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getMovieById(id)
      .then((data) => {
        if (!cancelled) setMovie(normalizeMovie(data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Movie not found.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFormError('');
    if (!isAuthenticated) return;
    if (rating === 0) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!reviewText.trim()) {
      setFormError('Please write a few words about the movie.');
      return;
    }
    addReview({
      user: user.username,
      rating,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString(),
    });
    setRating(0);
    setReviewText('');
  };

  if (loading) {
    return (
      <div className="page section-pad">
        <div className="container">
          <div className="state-block">
            <div className="state-icon">⏳</div>
            <h3>Loading movie…</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="page section-pad">
        <div className="container">
          <div className="state-block">
            <div className="state-icon">🎬</div>
            <h3>Movie not found</h3>
            <p>{error || 'We couldn\'t load this title.'}</p>
            <Link to="/search" className="btn-red" style={{ marginTop: 18 }}>Back to Search</Link>
          </div>
        </div>
      </div>
    );
  }

  const saved = isInWishlist(movie.id);

  return (
    <div className="page movie-detail-page">
      <div className="md-banner">
        {movie.poster && (
          <div className="md-banner-bg" style={{ backgroundImage: `url(${movie.poster})` }} />
        )}
        <div className="md-banner-grad" />
      </div>

      <div className="container md-content">
        <div className="md-poster-col">
          {movie.poster ? (
            <img src={movie.poster} alt={`${movie.title} poster`} className="md-poster" />
          ) : (
            <div className="md-poster md-poster-fallback">🎬</div>
          )}
          <button
            type="button"
            className={`btn-red md-wish-btn ${saved ? 'saved' : ''}`}
            onClick={() => toggleWishlist(movie)}
            aria-pressed={saved}
          >
            {saved ? '❤️ In Watchlist' : '🤍 Add to Watchlist'}
          </button>
        </div>

        <div className="md-info-col">
          <h1 className="md-title">{movie.title} {movie.year && <span className="md-year">({movie.year})</span>}</h1>

          <div className="md-meta-row">
            {movie.rated && movie.rated !== 'N/A' && <span className="md-chip">{movie.rated}</span>}
            {movie.runtime && movie.runtime !== 'N/A' && <span className="md-chip">{movie.runtime}</span>}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <span className="md-chip md-chip-gold">⭐ {movie.imdbRating} IMDb</span>
            )}
            {average && <span className="md-chip md-chip-red">👥 {average} CineReview</span>}
          </div>

          {movie.genre && <p className="md-genre">{movie.genre}</p>}
          {movie.plot && <p className="md-plot">{movie.plot}</p>}

          <dl className="md-credits">
            {movie.director && movie.director !== 'N/A' && (
              <div><dt>Director</dt><dd>{movie.director}</dd></div>
            )}
            {movie.actors && movie.actors !== 'N/A' && (
              <div><dt>Cast</dt><dd>{movie.actors}</dd></div>
            )}
          </dl>

          {/* Reviews */}
          <section className="md-reviews-section" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="section-title">Ratings &amp; <span>Reviews</span></h2>

            {isAuthenticated ? (
              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="review-stars" role="radiogroup" aria-label="Your rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={rating === s}
                      aria-label={`${s} star${s > 1 ? 's' : ''}`}
                      className={`review-star ${s <= (hoverRating || rating) ? 'on' : ''}`}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                    >★</button>
                  ))}
                  {rating > 0 && <span className="review-rating-label">{rating}/5</span>}
                </div>
                <div className="field" style={{ marginBottom: 12 }}>
                  <label htmlFor="review-text" className="sr-only">Write your review</label>
                  <textarea
                    id="review-text"
                    rows={3}
                    placeholder="Share your thoughts on this movie…"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                {formError && <p className="field-error" style={{ marginBottom: 12 }}>{formError}</p>}
                <button type="submit" className="btn-red">Post Review</button>
              </form>
            ) : (
              <div className="review-locked">
                <span aria-hidden="true">🔒</span>
                <p>
                  <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to rate and review this movie.
                </p>
              </div>
            )}

            <div className="review-list">
              {reviews.length === 0 ? (
                <p className="md-no-reviews">No reviews yet — be the first to share your thoughts.</p>
              ) : (
                reviews.map((r, idx) => (
                  <div key={idx} className="review-item">
                    <div className="review-item-header">
                      <span className="review-user">👤 {r.user}</span>
                      <span className="review-item-stars">{'★'.repeat(r.rating || 0)}</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                    <div className="review-item-footer">
                      <span className="review-date">{r.date}</span>
                      {user?.username === r.user && (
                        <button
                          type="button"
                          className="review-delete"
                          onClick={() => deleteReview(idx)}
                          aria-label="Delete your review"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
