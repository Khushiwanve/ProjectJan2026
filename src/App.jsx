import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageLoader from './Components/PageLoader';
import './App.css';

// Lazy-loaded route components keep the initial bundle small — each page's
// code only downloads when the user actually navigates there.
const Home = lazy(() => import('./Pages/Home'));
const Bollywood = lazy(() => import('./Pages/Bollywood'));
const OldBollywood = lazy(() => import('./Pages/OldBollywood'));
const Search = lazy(() => import('./Pages/Search'));
const MovieDetail = lazy(() => import('./Pages/MovieDetail'));
const Watchlist = lazy(() => import('./Pages/Watchlist'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const NotFound = lazy(() => import('./Pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window.history ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <ScrollToTop />
        <div className="app-shell">
          <Navbar />
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bollywood" element={<Bollywood />} />
                <Route path="/oldbollywood" element={<OldBollywood />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
