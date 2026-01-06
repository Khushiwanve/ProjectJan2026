// src/pages/Watchlist.jsx
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  // State to store the movies in the watchlist
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  
  // Get the logged-in user's data from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

  // Fetch the watchlist movies from localStorage
  useEffect(() => {
    if (!loggedInUser) return; // If no user is logged in, return

    // Get the watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filter watchlist based on the logged-in user
    const userWatchlist = watchlist.filter(movie => movie.user === loggedInUser.username);

    // Set the filtered watchlist to the state
    setWatchlistMovies(userWatchlist);
  }, [loggedInUser]);

  return (
    <div className="container mt-5">
      <h2>Your Watchlist</h2>
      <div className="movie-list">
        {watchlistMovies.length ? (
          watchlistMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies in your watchlist yet!</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

