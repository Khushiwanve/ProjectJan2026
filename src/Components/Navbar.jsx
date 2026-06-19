import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Bollywood', path: '/bollywood' },
    { label: 'RetroNova', path: '/oldbollywood' },
    { label: 'Search', path: '/search' },
    { label: 'Watchlist', path: '/watchlist' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`cine-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="cine-nav-inner">
        <Link to="/" className="cine-brand" aria-label="CineReview home">
          <span aria-hidden="true">🎬</span>CINE<span className="brand-accent">REVIEW</span>
        </Link>

        <ul className="cine-links cine-links--desktop">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`cine-link ${isActive(link.path) ? 'active' : ''}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="cine-auth cine-auth--desktop">
          {isAuthenticated ? (
            <>
              <span className="user-pill">Hi, <strong>{user.username}</strong></span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`cine-mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`cine-link ${isActive(link.path) ? 'active' : ''}`}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
        <div className="cine-mobile-auth">
          {isAuthenticated ? (
            <>
              <span className="user-pill">Signed in as <strong>{user.username}</strong></span>
              <button className="btn-logout" onClick={handleLogout} tabIndex={menuOpen ? 0 : -1}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login" tabIndex={menuOpen ? 0 : -1}>Login</Link>
              <Link to="/signup" className="btn-signup" tabIndex={menuOpen ? 0 : -1}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
