import React, { useState } from 'react';

const API_KEY = '5582b31d'; // Replace this with your actual OMDb API key

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovie(data);
        const storedReviews = JSON.parse(localStorage.getItem(`reviews-${data.imdbID}`)) || [];
        setSubmittedReviews(storedReviews);
        setError('');
      } else {
        setMovie(null);
        setSubmittedReviews([]);
        setError(data.Error);
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  const handleSubmitReview = () => {
    if (!loggedInUser) {
      alert('Please log in to submit a review.');
      return;
    }

    const newReview = {
      user: loggedInUser.username,
      rating,
      review,
      timestamp: new Date().toISOString(),
    };

    const updated = [...submittedReviews, newReview];
    localStorage.setItem(`reviews-${movie.imdbID}`, JSON.stringify(updated));
    setSubmittedReviews(updated);
    setRating(0);
    setReview('');
  };

  const handleAddToWishlist = () => {
    if (!loggedInUser) {
      alert('Please log in to add to wishlist.');
      return;
    }

    const key = `wishlist-${loggedInUser.username}`;
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const already = current.find(m => m.imdbID === movie.imdbID);

    if (already) {
      alert('Already in wishlist!');
      return;
    }

    const updated = [...current, movie];
    localStorage.setItem(key, JSON.stringify(updated));
    alert(`${movie.Title} added to your wishlist!`);
  };

  return (
    <div className="container mt-4 text-white search-page">
      <h2 className="mb-4">🔍 Search a Movie</h2>

      <form className="mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter movie title (e.g., Inception)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">Search</button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {movie && (
        <div className="card search-card text-light">
          <div className="row">
            <div className="col-md-4">
              <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded" />
            </div>
            <div className="col-md-8">
              <h3>{movie.Title} ({movie.Year})</h3>
              <p>{movie.Plot}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>

              <button className="btn btn-outline-warning mb-3" onClick={handleAddToWishlist}>
                ❤️ Add to Wishlist
              </button>

              {loggedInUser && (
                <div className="mt-3">
                  <h5>Submit Your Review</h5>
                  <div className="mb-2">
                    <label className="form-label">Your Rating (1–5):</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="form-control w-25"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your review..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success" onClick={handleSubmitReview}>Submit</button>
                </div>
              )}

              <div className="mt-4">
                <h5>User Reviews</h5>
                {submittedReviews.length > 0 ? (
                  submittedReviews.map((r, idx) => (
                    <div key={idx} className="border-top pt-2">
                      <p><strong>{r.user}</strong> rated it {r.rating}/5</p>
                      <p>{r.review}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
