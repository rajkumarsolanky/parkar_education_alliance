import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminAxios';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError('');

    try {
      const response = await adminApi.post('/admin/login', { username, password });
      const { token, admin } = response.data;

      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(admin));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-surface-container-low to-surface-container flex items-center justify-center px-margin-mobile">
      <div className="w-full max-w-md">

        {/* Admin Branding */}
        <div className="text-center mb-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-md">
            <span className="material-symbols-outlined text-primary text-[40px]">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Admin Portal</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Parkar Education Alliance — Management Console</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-md">

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
              <label htmlFor="admin-username" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
                Username
              </label>
              <input
                type="text"
                id="admin-username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label htmlFor="admin-password" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-body-md text-body-md py-3 rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 mt-xs"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Footer hint */}
          <div className="text-center mt-lg pt-md border-t border-outline-variant/30">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              This portal is for authorized administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
