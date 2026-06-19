# CineReview

A movie rating, review, and watchlist platform built with React + Vite, powered live by the [OMDb API](https://www.omdbapi.com/).

## Run it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. Production build: `npm run build` (output in `dist/`).

## What's inside

- **Auth** — sign up / log in with a single source of truth (`src/context/AuthContext.jsx`). Ratings, reviews, and comments require login.
- **Guest wishlist** — works without an account, persisted in `localStorage`. If you sign in later, your guest wishlist merges into your account automatically (`src/context/WishlistContext.jsx`).
- **Live movie data** — Home, Search, Bollywood, RetroNova, and movie detail pages all fetch posters, ratings, cast, and plot from OMDb in real time (`src/utils/omdb.js`).
- **Routing** — `react-router-dom`, with every page lazy-loaded so the initial bundle stays small.
- **Responsive** — tested down to 320px and up through 1440px+; no horizontal scroll, no fixed widths.

## Folder structure

```
src/
  Components/   Navbar, Footer, MovieCard, MovieGrid, skeletons, shared CuratedPage template
  context/      AuthContext, WishlistContext
  Data/         curated title lists for Bollywood / RetroNova / Home
  Pages/        Home, Search, MovieDetail, Bollywood, OldBollywood, Watchlist, Login, Signup, NotFound
  utils/        omdb.js (API client), useReviews, useDebouncedValue
```

## Notes

- The OMDb API key in `src/utils/omdb.js` is a shared public demo key with rate limits. Swap in your own free key from omdbapi.com for production use.
- All user data (accounts, wishlist, reviews) lives in `localStorage` — there's no backend. Clearing browser storage resets everything.
