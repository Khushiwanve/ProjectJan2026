// src/utils/auth.js

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('currentUser');
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('currentUser');
  };
  