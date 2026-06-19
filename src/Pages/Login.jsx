import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from || '/';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email address.';
    if (!form.password) errors.password = 'Password is required.';
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
      login(form);
      navigate(redirectTo, { replace: true });
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
          Welcome <span>Back</span>
        </h1>
        <p className="page-subheading" style={{ marginBottom: 28 }}>
          Log in to rate, review, and sync your watchlist.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`field ${fieldErrors.email ? 'has-error' : ''}`}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
            />
            {fieldErrors.email && <span id="login-email-error" className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className={`field ${fieldErrors.password ? 'has-error' : ''}`}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
            />
            {fieldErrors.password && <span id="login-password-error" className="field-error">{fieldErrors.password}</span>}
          </div>

          {formError && <p className="field-error auth-form-error" role="alert">{formError}</p>}

          <button type="submit" className="btn-red auth-submit" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
