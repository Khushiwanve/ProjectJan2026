import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cine-footer">
      <div className="cine-footer-inner">
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-brand">🎬 CINE<span>REVIEW</span></Link>
          <p>Rate, review, and discover the films worth your time.</p>
        </div>

        <nav className="footer-col" aria-label="Browse">
          <h4>Browse</h4>
          <Link to="/">Home</Link>
          <Link to="/bollywood">Bollywood</Link>
          <Link to="/oldbollywood">RetroNova</Link>
          <Link to="/search">Search</Link>
        </nav>

        <nav className="footer-col" aria-label="Account">
          <h4>Account</h4>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>

        <div className="footer-col">
          <h4>Powered by</h4>
          <p className="footer-credit">Movie data &amp; posters via the OMDb API.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} CineReview. Built for movie lovers.</p>
      </div>
    </footer>
  );
}
