import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.find(user => user.email === email);

    if (emailExists) {
      setError("Email already registered");
      return;
    }

    const newUser = { username, email, password, favorites: [], reviews: [] };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    navigate('/dashboard');
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center min-vh-100 text-light">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&family=Playfair+Display:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Embedded CSS */}
      <style>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        .signup-wrapper {
          background: linear-gradient(135deg, #000000, #111111, #1a1a1a);
          position: relative;
          overflow: hidden;
        }

        .signup-wrapper::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -20%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,0,100,0.08) 10%, transparent 70%);
          animation: rotateBg 18s linear infinite;
          z-index: 0;
        }

        @keyframes rotateBg {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .signup-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 100, 100, 0.25);
          backdrop-filter: blur(18px);
          border-radius: 16px;
          padding: 2.8rem;
          box-shadow: 0 0 40px rgba(255, 0, 50, 0.1);
          animation: slideUp 0.8s ease-out forwards;
          transform: translateY(20px);
          opacity: 0;
        }

        @keyframes slideUp {
          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        .signup-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          text-align: center;
          color: #ff4d4d;
          margin-bottom: 1.5rem;
        }

        .form-label {
          color: #ccc;
          font-weight: 500;
          margin-bottom: 0.4rem;
        }

        .custom-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 77, 77, 0.3);
          color: #fff;
          padding: 10px 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .custom-input:focus {
          outline: none;
          border-color: #ff4d4d;
          box-shadow: 0 0 12px rgba(255, 77, 77, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .signup-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
          letter-spacing: 0.5px;
        }

        .signup-btn:hover {
          background-color: #e60000;
          transform: scale(1.03);
          box-shadow: 0 0 14px rgba(255, 77, 77, 0.4);
        }

        .signup-card a {
          color: #1dcaff;
          font-weight: 500;
        }

        .signup-card a:hover {
          text-decoration: underline;
        }

        .alert-danger {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.4);
          color: #ff4d4d;
          border-radius: 8px;
          padding: 0.75rem;
        }

        .text-center {
          text-align: center;
        }
      `}</style>

      <div className="signup-card">
        <h2>Create Account</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control custom-input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control custom-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn signup-btn w-100">Signup</button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
