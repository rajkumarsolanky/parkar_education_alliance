import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!mobile || !password) return;
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { mobile, password });
      const { token, user } = response.data;
      
      localStorage.setItem('pea_token', token);
      localStorage.setItem('pea_user', JSON.stringify(user));
      
      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('auth-change'));
      
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto px-margin-mobile md:px-0 py-xl flex flex-col justify-center min-h-[calc(100vh-16rem)]">
      <div className="bg-surface-container-lowest rounded-3xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-md">
        
        {/* Header */}
        <div className="text-center mb-md">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Login to manage your tests and institutional profile</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-md p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-md">
          
          <div className="flex flex-col gap-xs">
            <label htmlFor="mobile" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">phone</span>
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g. +923001234567"
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="password" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl pl-4 pr-10 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link to="/reset" className="font-body-sm text-body-sm text-primary hover:text-on-primary-fixed-variant font-semibold">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-body-md text-body-md py-3 rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-lg border-t border-outline-variant/30 pt-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-on-primary-fixed-variant font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
