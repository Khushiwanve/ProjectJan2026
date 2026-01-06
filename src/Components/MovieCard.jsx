// import React, { useState, useEffect } from 'react';
// import './moviecard.css';

// export default function MovieCard({ movie }) {
//   const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [allReviews, setAllReviews] = useState([]);
//   const [wishlist, setWishlist] = useState(false);

//   // Load reviews & wishlist status
//   useEffect(() => {
//     const storedReviews = JSON.parse(localStorage.getItem(`reviews-${movie.id}`)) || [];
//     setAllReviews(storedReviews);

//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const isWished = storedWishlist.some(item => item.id === movie.id && item.user === loggedInUser?.username);
//     setWishlist(isWished);
//   }, [movie.id, loggedInUser]);

//   const handleReviewSubmit = () => {
//     if (!loggedInUser) {
//       alert('Please login to submit a review.');
//       window.location.href = '/login';
//       return;
//     }

//     if (!rating || !reviewText.trim()) {
//       alert('Please provide both a rating and a review.');
//       return;
//     }

//     const newReview = {
//       user: loggedInUser.username,
//       rating,
//       text: reviewText,
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedReviews = [...allReviews, newReview];
//     setAllReviews(updatedReviews);
//     localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
//     setRating(0);
//     setReviewText('');
//   };

//   const handleDeleteReview = (index) => {
//     const updatedReviews = allReviews.filter((_, i) => i !== index);
//     setAllReviews(updatedReviews);
//     localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
//   };

//   const toggleWishlist = () => {
//     if (!loggedInUser) {
//       alert('Please login to use wishlist.');
//       window.location.href = '/login';
//       return;
//     }

//     let stored = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const exists = stored.some(item => item.id === movie.id && item.user === loggedInUser.username);

//     if (exists) {
//       stored = stored.filter(item => !(item.id === movie.id && item.user === loggedInUser.username));
//     } else {
//       stored.push({ ...movie, user: loggedInUser.username });
//     }

//     localStorage.setItem('wishlist', JSON.stringify(stored));
//     setWishlist(!wishlist);
//   };

//   const averageRating = allReviews.length
//     ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
//     : null;

//   return (
//     <div className="movie-card shadow">
//       <img src={movie.poster} alt={movie.title} className="poster fade-in" />
//       <div className="movie-body">
//         <h5 className="mb-1">{movie.title}</h5>
//         {averageRating && <small className="text-warning">⭐ Avg Rating: {averageRating}</small>}

//         <div className="stars mt-2">
//           {[...Array(5)].map((_, i) => {
//             const starValue = i + 1;
//             return (
//               <span
//                 key={i}
//                 className={`star ${starValue <= (hover || rating) ? 'on' : 'off'}`}
//                 onClick={() => setRating(starValue)}
//                 onMouseEnter={() => setHover(starValue)}
//                 onMouseLeave={() => setHover(0)}
//               >★</span>
//             );
//           })}
//         </div>

//         <textarea
//           className="form-control mt-2"
//           placeholder="✏️ Write your review..."
//           rows="2"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//         />

//         <div className="d-flex justify-content-between align-items-center mt-2">
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={handleReviewSubmit}
//             disabled={!rating || !reviewText.trim()}
//           >
//             Submit Review
//           </button>
//           <button
//             className={`btn btn-${wishlist ? 'danger' : 'outline-light'} btn-sm`}
//             onClick={toggleWishlist}
//           >
//             {wishlist ? '❤️ In Wishlist' : '♡ Wishlist'}
//           </button>
//         </div>

//         {allReviews.length > 0 && (
//           <div className="reviews mt-3">
//             {allReviews.map((r, idx) => (
//               <div key={idx} className="review">
//                 <div><strong>👤 {r.user}</strong> {'⭐'.repeat(r.rating)}</div>
//                 <div>{r.text}</div>
//                 <small className="text-muted">{r.date}</small>
//                 {loggedInUser && r.user === loggedInUser.username && (
//                   <div className="text-end">
//                     <button
//                       className="btn btn-sm btn-outline-danger mt-1"
//                       onClick={() => handleDeleteReview(idx)}
//                     >
//                       🗑️ Delete Review
//                     </button>
//                   </div>
//                 )}
//                 <hr />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














// import React, { useState, useEffect } from 'react';
// import './moviecard.css';

// export default function MovieCard({ movie }) {
//   const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [allReviews, setAllReviews] = useState([]);
//   const [wishlist, setWishlist] = useState(false);

//   // Run only when movie.id or loggedInUser changes
//   useEffect(() => {
//     if (!movie.id || !loggedInUser) return;

//     const storedReviews = JSON.parse(localStorage.getItem(`reviews-${movie.id}`)) || [];
//     setAllReviews(storedReviews);

//     const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const isWished = storedWishlist.some(item => item.id === movie.id && item.user === loggedInUser?.username);
//     setWishlist(isWished);
//   }, [movie.id, loggedInUser]);

//   const handleReviewSubmit = () => {
//     if (!loggedInUser) {
//       alert('Please login to submit a review.');
//       window.location.href = '/login';
//       return;
//     }

//     if (!rating || !reviewText.trim()) {
//       alert('Please provide both a rating and a review.');
//       return;
//     }

//     const newReview = {
//       user: loggedInUser.username,
//       rating,
//       text: reviewText,
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedReviews = [...allReviews, newReview];
//     setAllReviews(updatedReviews);
//     localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
//     setRating(0);
//     setReviewText('');
//   };

//   const handleDeleteReview = (index) => {
//     const updatedReviews = allReviews.filter((_, i) => i !== index);
//     setAllReviews(updatedReviews);
//     localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
//   };

//   const toggleWishlist = () => {
//     if (!loggedInUser) {
//       alert('Please login to use wishlist.');
//       window.location.href = '/login';
//       return;
//     }

//     let stored = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const exists = stored.some(item => item.id === movie.id && item.user === loggedInUser.username);

//     if (exists) {
//       stored = stored.filter(item => !(item.id === movie.id && item.user === loggedInUser.username));
//     } else {
//       stored.push({ ...movie, user: loggedInUser.username });
//     }

//     localStorage.setItem('wishlist', JSON.stringify(stored));
//     setWishlist(!wishlist);
//   };

//   const averageRating = allReviews.length
//     ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
//     : null;

//   return (
//     <div className="movie-card shadow">
//       <img src={movie.poster} alt={movie.title} className="poster fade-in" />
//       <div className="movie-body">
//         <h5 className="mb-1">{movie.title}</h5>
//         {averageRating && <small className="text-warning">⭐ Avg Rating: {averageRating}</small>}

//         <div className="stars mt-2">
//           {[...Array(5)].map((_, i) => {
//             const starValue = i + 1;
//             return (
//               <span
//                 key={i}
//                 className={`star ${starValue <= (hover || rating) ? 'on' : 'off'}`}
//                 onClick={() => setRating(starValue)}
//                 onMouseEnter={() => setHover(starValue)}
//                 onMouseLeave={() => setHover(0)}
//               >★</span>
//             );
//           })}
//         </div>

//         <textarea
//           className="form-control mt-2"
//           placeholder="✏️ Write your review..."
//           rows="2"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//         />

//         <div className="d-flex justify-content-between align-items-center mt-2">
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={handleReviewSubmit}
//             disabled={!rating || !reviewText.trim()}
//           >
//             Submit Review
//           </button>
//           <button
//             className={`btn btn-${wishlist ? 'danger' : 'outline-light'} btn-sm`}
//             onClick={toggleWishlist}
//           >
//             {wishlist ? '❤️ In Wishlist' : '♡ Wishlist'}
//           </button>
//         </div>

//         {allReviews.length > 0 && (
//           <div className="reviews mt-3">
//             {allReviews.map((r, idx) => (
//               <div key={idx} className="review">
//                 <div><strong>👤 {r.user}</strong> {'⭐'.repeat(r.rating)}</div>
//                 <div>{r.text}</div>
//                 <small className="text-muted">{r.date}</small>
//                 {loggedInUser && r.user === loggedInUser.username && (
//                   <div className="text-end">
//                     <button
//                       className="btn btn-sm btn-outline-danger mt-1"
//                       onClick={() => handleDeleteReview(idx)}
//                     >
//                       🗑️ Delete Review
//                     </button>
//                   </div>
//                 )}
//                 <hr />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';

export default function MovieCard({ movie }) {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Correct key for logged-in user
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [allReviews, setAllReviews] = useState([]);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (!movie.id || !loggedInUser) return;

    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${movie.id}`)) || [];
    setAllReviews(storedReviews);

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isWished = storedWishlist.some(
      item => item.id === movie.id && item.user === loggedInUser.username
    );
    setWishlist(isWished);
  }, [movie.id, loggedInUser?.username]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert('Please login to submit a review.');
      window.location.href = '/login';
      return;
    }

    if (!reviewText.trim()) {
      alert('Please provide a review text.');
      return;
    }

    const newReview = {
      user: loggedInUser.username,
      rating: rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [...allReviews, newReview];
    localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
    setAllReviews(updatedReviews);
    setReviewText(''); // Clear review text
    setRating(0); // Reset rating to 0
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = allReviews.filter((_, i) => i !== index);
    setAllReviews(updatedReviews);
    localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
  };

  const toggleWishlist = () => {
    if (!loggedInUser) {
      alert('Please login to use wishlist.');
      window.location.href = '/login';
      return;
    }

    let stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = stored.some(item => item.id === movie.id && item.user === loggedInUser.username);

    if (exists) {
      stored = stored.filter(item => !(item.id === movie.id && item.user === loggedInUser.username));
    } else {
      stored.push({ ...movie, user: loggedInUser.username });
    }

    localStorage.setItem('wishlist', JSON.stringify(stored));
    setWishlist(!wishlist);
  };

  const averageRating = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  return (
    <>
      <div style={styles.card} className="movie-card-glass">
        <img src={movie.poster} alt={movie.title} style={styles.poster} />
        <div style={styles.body}>
          <h5>{movie.title}</h5>
          {averageRating && <small style={styles.avgRating}>⭐ Avg: {averageRating}</small>}

          <form onSubmit={handleReviewSubmit}>
            <div style={styles.stars}>
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <span
                    key={i}
                    style={starValue <= (hover || rating) ? styles.starOn : styles.starOff}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <textarea
              style={styles.textarea}
              placeholder="✏️ Write your review..."
              rows="2"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div style={styles.buttons}>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={!reviewText.trim()}
              >
                Submit Review
              </button>
              <button
                type="button"
                style={wishlist ? styles.wishlistBtnActive : styles.wishlistBtn}
                onClick={toggleWishlist}
              >
                {wishlist ? '❤️ In Wishlist' : '♡ Wishlist'}
              </button>
            </div>
          </form>

          {allReviews.length > 0 && (
            <div style={styles.reviews}>
              {allReviews.map((r, idx) => (
                <div key={idx} style={styles.review}>
                  <div><strong>👤 {r.user}</strong> {'⭐'.repeat(r.rating)}</div>
                  <div>{r.text}</div>
                  <small style={styles.date}>{r.date}</small>
                  {loggedInUser?.username === r.user && (
                    <div style={styles.deleteBtn}>
                      <button
                        style={styles.deleteBtnStyle}
                        onClick={() => handleDeleteReview(idx)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 👇 Glass hover styles go here */}
      <style>
        {`
          .movie-card-glass {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(0px);
            background: rgba(255, 255, 255, 0.02);
          }

          .movie-card-glass:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 20px rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.07);
            backdrop-filter: blur(10px);
          }
        `}
      </style>
    </>
  );
}

const styles = {
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: '15px',
    overflow: 'hidden',
    color: '#fff',
    maxWidth: '300px',
    margin: '20px auto',
  },
  poster: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  body: {
    padding: '15px',
  },
  avgRating: {
    color: '#ffcc00',
  },
  stars: {
    display: 'flex',
    cursor: 'pointer',
  },
  starOn: {
    color: '#ffcc00',
    fontSize: '20px',
  },
  starOff: {
    color: '#555',
    fontSize: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    resize: 'none',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  wishlistBtn: {
    backgroundColor: 'transparent',
    color: '#bbb',
    padding: '8px 16px',
    border: '1px solid #bbb',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  wishlistBtnActive: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    padding: '8px 16px',
    border: '1px solid #ff4d4d',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  reviews: {
    marginTop: '15px',
  },
  review: {
    marginBottom: '10px',
  },
  date: {
    color: '#888',
    fontSize: '12px',
  },
  deleteBtn: {
    textAlign: 'right',
  },
  deleteBtnStyle: {
    backgroundColor: 'transparent',
    color: '#ff4d4d',
    border: 'none',
    cursor: 'pointer',
  }
};
