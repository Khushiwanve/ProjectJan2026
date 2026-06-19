import React from 'react';

export default function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
      aria-hidden="true"
    >
      <div className="skeleton" style={{ aspectRatio: '2 / 3', width: '100%' }} />
      <div style={{ padding: '10px 12px 12px' }}>
        <div className="skeleton" style={{ height: 14, borderRadius: 4, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 10, width: '40%', borderRadius: 4 }} />
      </div>
    </div>
  );
}
