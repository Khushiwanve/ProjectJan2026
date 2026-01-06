import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = existingUsers.find(user => user.email === email && user.password === password);

    if (!matchedUser) {
      setError("Invalid credentials");
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100 text-light">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      {/* Embedded CSS */}
      <style>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
        }

        .login-wrapper {
          background: linear-gradient(145deg, #000000, #0c0c0c, #111);
          position: relative;
          overflow: hidden;
        }

        .login-wrapper::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle, rgba(255,0,0,0.05) 10%, transparent 70%);
          animation: move-bg 20s linear infinite;
          z-index: 0;
        }

        @keyframes move-bg {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 0, 0, 0.25);
          backdrop-filter: blur(16px);
          box-shadow: 0 0 40px rgba(255, 0, 0, 0.1);
          border-radius: 16px;
          padding: 3rem;
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

        .login-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.75rem;
          text-align: center;
          color: #ff4d4d;
          margin-bottom: 2rem;
          letter-spacing: 1px;
        }

        .form-label {
          color: #ccc;
          font-weight: 500;
          margin-bottom: 0.5rem;
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
          box-shadow: 0 0 10px rgba(255, 77, 77, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .login-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
          letter-spacing: 0.5px;
        }

        .login-btn:hover {
          background-color: #e60000;
          transform: scale(1.03);
          box-shadow: 0 0 14px rgba(255, 77, 77, 0.4);
        }

        .login-card a {
          color: #1dcaff;
          font-weight: 500;
        }

        .login-card a:hover {
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

      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn login-btn w-100">Login</button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
