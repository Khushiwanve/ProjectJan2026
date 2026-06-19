import React from 'react';

export default function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        .loader-spin {
          width: 38px; height: 38px;
          border: 3px solid rgba(229,9,20,0.2);
          border-top-color: #e50914;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="loader-spin" role="status" aria-label="Loading" />
    </div>
  );
}
