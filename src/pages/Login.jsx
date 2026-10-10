import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('alex.rivera@campus.edu');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Alex Rivera');
  const [role, setRole] = useState('STUDENT');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (isRegister) {
        await register({ name: fullName, email, password, role });
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Authentication error. Please check your credentials.');
    }
  };

  const setDemoAccount = (selectedRole) => {
    if (selectedRole === 'STUDENT') {
      setEmail('alex.rivera@campus.edu');
      setFullName('Alex Rivera');
      setRole('STUDENT');
    } else if (selectedRole === 'FACULTY') {
      setEmail('evelyn.reed@campus.edu');
      setFullName('Dr. Evelyn Reed');
      setRole('FACULTY');
    } else {
      setEmail('admin.vance@campus.edu');
      setFullName('Dean Arthur Vance');
      setRole('ADMIN');
    }
    setPassword('secret2026');
  };

  return (
    <div className="auth-split-page">
      {/* Left Visual Panel */}
      <div className="auth-visual-hero">
        <div className="hero-blur-circle-1"></div>
        <div className="hero-blur-circle-2"></div>

        <div className="hero-brand">
          <div className="hero-brand-logo">
            <GraduationCap size={28} />
          </div>
          <span className="hero-brand-title">Campus<span className="text-violet">IQ</span></span>
        </div>

        <div className="hero-center-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Autonomous Academic Intelligence</span>
          </div>
          <h2 className="hero-tagline">
            Empowering modern universities with intelligent campus coordination.
          </h2>
          <p className="hero-subtext">
            Instant timetable verification, automated attendance tracking, midterm seat locators, and direct faculty communication — all in one unified portal.
          </p>

          <div className="hero-highlights">
            <div className="highlight-pill">
              <CheckCircle2 size={16} />
              <span>Real-time SIS & ERP synchronization</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} />
              <span>AI-verified responses with official sources</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} />
              <span>Role-aware student & faculty workspaces</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom-footer">
          <span>Official Smart Campus Engine • B.Tech Capstone Project 2026</span>
        </div>
      </div>

      {/* Right Interactive Form */}
      <div className="auth-form-container">
        <div className="auth-form-card">
          <div className="auth-card-header">
            <h1 className="auth-title">
              {isRegister ? 'Create University Account' : 'Welcome back'}
            </h1>
            <p className="auth-subtitle">
              {isRegister
                ? 'Register with your student or faculty institutional email.'
                : 'Sign in to access your AI copilot and academic workspace.'}
            </p>
          </div>

          {/* Quick Demo Sign-in Helper */}
          <div className="demo-accounts-bar">
            <span className="demo-hint-label">Quick Demo Logins:</span>
            <div className="demo-buttons-row">
              <button
                type="button"
                className="demo-btn"
                onClick={() => setDemoAccount('STUDENT')}
              >
                Student Demo
              </button>
              <button
                type="button"
                className="demo-btn"
                onClick={() => setDemoAccount('FACULTY')}
              >
                Faculty Demo
              </button>
              <button
                type="button"
                className="demo-btn"
                onClick={() => setDemoAccount('ADMIN')}
              >
                Admin Demo
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="auth-error-banner">
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Alex Rivera"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">University Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty Member</option>
                  <option value="ADMIN">University Administrator</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              <span>{loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign in to Portal'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-toggle-mode">
            <span>
              {isRegister ? 'Already have an institutional account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              className="toggle-link-btn"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Sign in instead' : 'Create new account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
