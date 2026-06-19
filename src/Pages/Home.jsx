import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../Components/MovieGrid';
import { resolveTitles, normalizeMovie } from '../utils/omdb';
import { FEATURED_TITLES, TRENDING_TITLES } from '../Data/curatedTitles';
import './home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let cancelled = false;
    resolveTitles(FEATURED_TITLES).then((records) => {
      if (cancelled) return;
      setFeatured(records.map(normalizeMovie));
      setLoadingFeatured(false);
    });
    resolveTitles(TRENDING_TITLES).then((records) => {
      if (cancelled) return;
      setTrending(records.map(normalizeMovie));
      setLoadingTrending(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = setInterval(() => {
      setActiveSlide((i) => (i + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[activeSlide];

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        {loadingFeatured ? (
          <div className="hero-skeleton skeleton" aria-hidden="true" />
        ) : current ? (
          <>
            <div
              className="hero-bg"
              style={{ backgroundImage: current.poster ? `url(${current.poster})` : 'none' }}
            />
            <div className="hero-grad" />
            <div className="hero-content animate-fade-up">
              <p className="hero-genre">{current.genre}</p>
              <h1 className="hero-title">{current.title}</h1>
              <p className="hero-desc">{current.plot}</p>
              <div className="hero-meta">
                <span className="hero-meta-item"><strong>Director:</strong> {current.director}</span>
                <span className="hero-meta-item"><strong>Year:</strong> {current.year}</span>
                {current.imdbRating && current.imdbRating !== 'N/A' && (
                  <span className="hero-meta-item"><strong>⭐ IMDb:</strong> {current.imdbRating}</span>
                )}
              </div>
              <div className="hero-btns">
                <Link to={`/movie/${current.id}`} className="hero-btn-primary">▶ View Details</Link>
                <Link to="/search" className="hero-btn-secondary">Explore More</Link>
              </div>
            </div>

            <div className="hero-dots" role="tablist" aria-label="Featured movies">
              {featured.map((m, i) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Show ${m.title}`}
                  className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="hero-fallback">
            <h1 className="hero-title">Welcome to CineReview</h1>
            <p className="hero-desc">Couldn't load featured titles right now — try the Search page instead.</p>
          </div>
        )}
      </section>

      {/* Platform stats */}
      <div className="platform-banner">
        <div className="platform-text">
          <h2>🎥 Rate. Review. Recommend.</h2>
          <p>Your one-stop platform to explore and share your love for cinema.</p>
        </div>
        <div className="platform-stats">
          <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Movies</div></div>
          <div className="stat"><div className="stat-num">10K+</div><div className="stat-label">Reviews</div></div>
          <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Loved</div></div>
        </div>
      </div>

      {/* Trending Movies */}
      <div className="section-pad">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 <span>Trending</span> Now</h2>
            <Link to="/search" className="section-link">View All →</Link>
          </div>
          <MovieGrid
            movies={trending}
            loading={loadingTrending}
            emptyTitle="No trending titles right now"
            emptyMessage="Try the Search page to find something to watch."
          />
        </div>
      </div>
    </div>
  );
}
