import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    surname: '',
    cnic: '',
    mobile: '',
    dob: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simple CNIC auto-formatter (adds hyphens dynamically)
  function handleCnicChange(val) {
    let clean = val.replace(/\D/g, '');
    if (clean.length > 13) clean = clean.slice(0, 13);
    
    let formatted = clean;
    if (clean.length > 5 && clean.length <= 12) {
      formatted = `${clean.slice(0, 5)}-${clean.slice(5)}`;
    } else if (clean.length > 12) {
      formatted = `${clean.slice(0, 5)}-${clean.slice(5, 12)}-${clean.slice(12)}`;
    }
    setFormData({ ...formData, cnic: formatted });
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { fullName, fatherName, surname, cnic, mobile, dob, password } = formData;

    if (!fullName || !fatherName || !surname || !cnic || !mobile || !dob || !password) {
      setError('Please fill in all required fields, including father name and surname.');
      return;
    }

    // CNIC validation pattern: 5 digits - 7 digits - 1 digit
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(cnic)) {
      setError('Please enter a valid CNIC format (e.g. 44301-1234567-1).');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/signup', {
        full_name: fullName,
        father_name: fatherName,
        surname,
        cnic,
        mobile,
        dob,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('pea_token', token);
      localStorage.setItem('pea_user', JSON.stringify(user));
      
      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('auth-change'));
      
      navigate('/profile');
    } catch (err) {
      console.error(err);
      const serverMsg = err.response?.data?.error;
      const status = err.response?.status;
      if (status === 409) {
        setError('CNIC ya Mobile number pehle se registered hai.');
      } else if (serverMsg) {
        setError(serverMsg);
      } else {
        setError('Server se rabta nahi ho saka. Baraye meharbani dobara koshish karein.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto px-margin-mobile md:px-0 py-xl flex flex-col justify-center min-h-[calc(100vh-16rem)]">
      <div className="bg-surface-container-lowest rounded-3xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-md">
        
        {/* Header */}
        <div className="text-center mb-md">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Create Account</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Register your institutional membership profiles</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-md p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-md">
          
          <div className="flex flex-col gap-xs">
            <label htmlFor="fullName" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
              Applicant Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Muhammad Ali"
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="fatherName" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person_outline</span>
              Father’s Name
            </label>
            <input
              type="text"
              id="fatherName"
              required
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              placeholder="e.g. Ghulam Rasool"
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="surname" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">groups</span>
              Surname / Family Name
            </label>
            <input
              type="text"
              id="surname"
              required
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              placeholder="e.g. Parkar, Soomro, etc."
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="cnic" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">badge</span>
              CNIC Number
            </label>
            <input
              type="text"
              id="cnic"
              required
              value={formData.cnic}
              onChange={(e) => handleCnicChange(e.target.value)}
              placeholder="xxxxx-xxxxxxx-x"
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="mobile" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">phone_iphone</span>
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="e.g. +923001234567"
              className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="dob" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 6 characters"
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-lg border-t border-outline-variant/30 pt-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-on-primary-fixed-variant font-semibold">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
