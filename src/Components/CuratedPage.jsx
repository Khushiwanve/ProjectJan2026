import React, { useEffect, useState } from 'react';
import MovieGrid from '../Components/MovieGrid';
import { resolveTitles, normalizeMovie } from '../utils/omdb';

/**
 * Shared template for "curated list" pages — given a fixed list of titles,
 * resolve them against OMDb and render a heading + grid. Used by both
 * Bollywood and RetroNova so we don't duplicate the same fetch/loading
 * logic twice.
 */
export default function CuratedPage({ titles, eyebrow, heading, accent, subheading }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    resolveTitles(titles).then((records) => {
      if (cancelled) return;
      setMovies(records.map(normalizeMovie));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [titles]);

  return (
    <div className="page section-pad">
      <div className="container">
        {eyebrow && <p className="hero-genre" style={{ marginBottom: 8 }}>{eyebrow}</p>}
        <h1 className="page-heading">{heading} <span>{accent}</span></h1>
        {subheading && <p className="page-subheading" style={{ marginBottom: 28 }}>{subheading}</p>}
        <div style={{ marginTop: 28 }}>
          <MovieGrid
            movies={movies}
            loading={loading}
            skeletonCount={titles.length}
            emptyTitle="Couldn't load this list"
            emptyMessage="Please try again in a moment."
          />
        </div>
      </div>
    </div>
  );
}
