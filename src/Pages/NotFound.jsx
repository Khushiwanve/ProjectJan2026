import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page section-pad" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="state-block">
          <div className="state-icon">🎬</div>
          <h3>Page not found</h3>
          <p>The page you're looking for doesn't exist or may have moved.</p>
          <Link to="/" className="btn-red" style={{ marginTop: 18 }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
