// src/context/WishlistContext.jsx
// Wishlist works for everyone, logged in or not — this was a hard
// requirement. Guests get a localStorage-backed wishlist keyed under
// "guest". When a user logs in, their guest wishlist is merged into their
// personal (per-email) wishlist so nothing is lost.

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'cinereview_wishlist';

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeAll(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const scopeKey = user?.email || 'guest';
  const [items, setItems] = useState(() => readAll()[scopeKey] || []);

  // When the active scope changes (login/logout), merge guest items into
  // the user's list (once, on login) and load the right list into state.
  useEffect(() => {
    const all = readAll();

    if (user) {
      const guestItems = all.guest || [];
      const userItems = all[user.email] || [];
      if (guestItems.length) {
        const merged = [...userItems];
        guestItems.forEach((g) => {
          if (!merged.some((m) => m.id === g.id)) merged.push(g);
        });
        all[user.email] = merged;
        all.guest = [];
        writeAll(all);
        setItems(merged);
        return;
      }
      setItems(userItems);
    } else {
      setItems(all.guest || []);
    }
  }, [user]);

  const persist = useCallback(
    (next) => {
      const all = readAll();
      all[scopeKey] = next;
      writeAll(all);
      setItems(next);
    },
    [scopeKey]
  );

  const isInWishlist = useCallback((id) => items.some((m) => String(m.id) === String(id)), [items]);

  const toggleWishlist = useCallback(
    (movie) => {
      const exists = items.some((m) => String(m.id) === String(movie.id));
      const next = exists
        ? items.filter((m) => String(m.id) !== String(movie.id))
        : [...items, movie];
      persist(next);
      return !exists;
    },
    [items, persist]
  );

  const removeFromWishlist = useCallback(
    (id) => {
      persist(items.filter((m) => String(m.id) !== String(id)));
    },
    [items, persist]
  );

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
