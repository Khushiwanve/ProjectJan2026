import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For smooth animations

export default function Dashboard() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
    setWishlist(updatedWishlist);
    // Save the updated wishlist back to localStorage
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: 'linear-gradient(145deg, #1b1b1b, #222222)', // Dark sleek gradient
        minHeight: '100vh',
        paddingTop: '60px',
      }}
    >
      <div className="container text-center">
        <h2 className="text-white display-4">Your Dashboard</h2>
        <h4 className="text-white mb-4">Your Wishlist</h4>
        {wishlist.length === 0 ? (
          <p className="text-white">No movies in your wishlist yet.</p>
        ) : (
          <div className="row">
            {wishlist.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="col-md-4 mb-5"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                <div
                  className="card"
                  style={{
                    backgroundColor: '#1f1f1f',
                    border: 'none',
                    borderRadius: '15px',
                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.5)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div
                    className="card-img-wrapper"
                    style={{
                      position: 'relative',
                      height: '400px', // Fixed height for image display
                      overflow: 'hidden',
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                    }}
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="card-img-top"
                      style={{
                        width: '100%', // Ensures the image fills the container width
                        height: '100%', // Ensures the image fills the container height
                        objectFit: 'contain', // Ensures the full image is visible without cropping
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-white">{movie.title}</h5>
                    <p className="text-muted" style={{ fontSize: '14px' }}>
                      Click to view more details
                    </p>
                    <button
                      className="btn btn-danger btn-block"
                      style={{
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        transition: 'background-color 0.3s ease',
                      }}
                      onClick={() => removeFromWishlist(movie.id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

