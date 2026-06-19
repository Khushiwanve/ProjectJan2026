import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import MovieGrid from '../Components/MovieGrid';

export default function Watchlist() {
  const { isAuthenticated } = useAuth();
  const { items } = useWishlist();

  return (
    <div className="page section-pad">
      <div className="container">
        <h1 className="page-heading">Your <span>Watchlist</span></h1>
        <p className="page-subheading" style={{ marginBottom: 12 }}>
          Movies you've saved to watch later.
        </p>

        {!isAuthenticated && (
          <p className="watchlist-guest-note">
            You're browsing as a guest — your watchlist is saved on this device.{' '}
            <Link to="/signup">Create an account</Link> to keep it permanently and sync your reviews.
          </p>
        )}

        <div style={{ marginTop: 28 }}>
          <MovieGrid
            movies={items}
            loading={false}
            emptyIcon="🤍"
            emptyTitle="Your watchlist is empty"
            emptyMessage="Tap the heart icon on any movie to save it here."
          />
        </div>
      </div>
    </div>
  );
}
