import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.username.trim()) errors.username = 'Username is required.';
    else if (form.username.trim().length < 2) errors.username = 'Username must be at least 2 characters.';

    if (!form.email.trim()) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email address.';

    if (!form.password) errors.password = 'Password is required.';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters.';

    if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setSubmitting(true);
    try {
      signup({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card animate-fade-up">
        <h1 className="page-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
          Create <span>Account</span>
        </h1>
        <p className="page-subheading" style={{ marginBottom: 28 }}>
          Join to rate movies, write reviews, and save your watchlist for good.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`field ${fieldErrors.username ? 'has-error' : ''}`}>
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.username}
              aria-describedby={fieldErrors.username ? 'signup-username-error' : undefined}
            />
            {fieldErrors.username && <span id="signup-username-error" className="field-error">{fieldErrors.username}</span>}
          </div>

          <div className={`field ${fieldErrors.email ? 'has-error' : ''}`}>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
            />
            {fieldErrors.email && <span id="signup-email-error" className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className={`field ${fieldErrors.password ? 'has-error' : ''}`}>
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'signup-password-error' : undefined}
            />
            {fieldErrors.password && <span id="signup-password-error" className="field-error">{fieldErrors.password}</span>}
          </div>

          <div className={`field ${fieldErrors.confirmPassword ? 'has-error' : ''}`}>
            <label htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? 'signup-confirm-error' : undefined}
            />
            {fieldErrors.confirmPassword && <span id="signup-confirm-error" className="field-error">{fieldErrors.confirmPassword}</span>}
          </div>

          {formError && <p className="field-error auth-form-error" role="alert">{formError}</p>}

          <button type="submit" className="btn-red auth-submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
