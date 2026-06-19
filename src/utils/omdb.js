// src/utils/omdb.js
// Single source of truth for all OMDb API access in the app.
// Centralizing this means: one place to swap keys, one place to cache,
// one place to fix bugs — instead of every page re-implementing fetch logic.

const API_KEY = '5582b31d';
const BASE_URL = 'https://www.omdbapi.com/';

// Tiny in-memory cache so repeated lookups (e.g. curated lists, navigating
// back to a movie you already viewed) don't re-hit the network every time.
const cache = new Map();

async function omdbFetch(params) {
  const url = new URL(BASE_URL);
  url.searchParams.set('apikey', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const cacheKey = url.toString();
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Network error — please check your connection.');
  }
  const data = await res.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found.');
  }

  cache.set(cacheKey, data);
  return data;
}

/** Search movies by title (used by the Search page). Returns an array. */
export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return { results: [], totalResults: 0 };
  const data = await omdbFetch({ s: query.trim(), type: 'movie', page });
  return {
    results: data.Search || [],
    totalResults: Number(data.totalResults) || 0,
  };
}

/** Get full details for one movie by IMDb ID. */
export async function getMovieById(imdbID) {
  return omdbFetch({ i: imdbID, plot: 'full' });
}

/** Get full details for one movie by exact title (used for curated lists). */
export async function getMovieByTitle(title) {
  return omdbFetch({ t: title, plot: 'short' });
}

/**
 * Resolve a curated list of titles into full OMDb records.
 * Skips titles that fail to resolve rather than breaking the whole page.
 */
export async function resolveTitles(titles) {
  const settled = await Promise.allSettled(titles.map((t) => getMovieByTitle(t)));
  return settled
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value);
}

/** Normalize an OMDb record into the shape our UI components expect. */
export function normalizeMovie(omdb) {
  const poster = omdb.Poster && omdb.Poster !== 'N/A' ? omdb.Poster : '';
  return {
    id: omdb.imdbID,
    title: omdb.Title,
    poster,
    year: omdb.Year,
    genre: omdb.Genre,
    director: omdb.Director,
    actors: omdb.Actors,
    plot: omdb.Plot,
    runtime: omdb.Runtime,
    imdbRating: omdb.imdbRating,
    rated: omdb.Rated,
  };
}
