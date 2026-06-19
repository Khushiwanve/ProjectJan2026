// src/context/AuthContext.jsx
// Single source of truth for authentication state.
//
// The previous codebase stored the logged-in user under TWO different
// localStorage keys ('currentUser' in Login/Signup/Watchlist, 'loggedInUser'
// in Navbar/MovieCard/Search). That meant logging in never actually updated
// the Navbar or unlocked ratings — two halves of the app were reading from
// different places. This context fixes that by being the only thing that
// ever touches localStorage for auth, and by broadcasting changes via React
// state so every consumer re-renders immediately (no more "logged in but
// navbar still shows Login" bugs).

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AUTH_KEY = 'cinereview_auth_user';
const USERS_KEY = 'cinereview_users';

const AuthContext = createContext(null);

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  // Keep state in sync if localStorage changes in another tab.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === AUTH_KEY) setUser(readUser());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signup = useCallback(({ username, email, password }) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { username, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const publicUser = { username, email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
    return publicUser;
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = readUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      throw new Error('Invalid email or password.');
    }
    const publicUser = { username: match.username, email: match.email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
    return publicUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
