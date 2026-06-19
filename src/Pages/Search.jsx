import React, { useEffect, useState } from 'react';
import MovieGrid from '../Components/MovieGrid';
import { searchMovies, normalizeMovie } from '../utils/omdb';
import { useDebouncedValue } from '../utils/useDebouncedValue';
import './search.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 450);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setResults([]);
      setError('');
      setHasSearched(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError('');

    searchMovies(trimmed)
      .then(({ results }) => {
        if (cancelled) return;
        setResults(results.map(normalizeMovie));
        setHasSearched(true);
      })
      .catch((err) => {
        if (cancelled) return;
        setResults([]);
        setError(err.message || 'Something went wrong. Please try again.');
        setHasSearched(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return (
    <div className="page section-pad">
      <div className="container">
        <h1 className="page-heading">Search <span>Movies</span></h1>
        <p className="page-subheading" style={{ marginBottom: 28 }}>
          Find any title, see ratings, and add it to your watchlist instantly.
        </p>

        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie title…"
            aria-label="Search for a movie"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ marginTop: 32 }}>
          {!hasSearched && !loading && !query.trim() ? (
            <div className="state-block">
              <div className="state-icon">🎬</div>
              <h3>Start typing to search</h3>
              <p>Try a title like “Inception” or “3 Idiots”.</p>
            </div>
          ) : (
            <MovieGrid
              movies={results}
              loading={loading}
              error={error}
              emptyTitle="No results found"
              emptyMessage={`We couldn't find anything matching "${debouncedQuery}". Try a different title.`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
