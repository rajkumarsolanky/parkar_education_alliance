import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Reset() {
  const [step, setStep] = useState(1); // 1: Mobile request, 2: OTP & New Password, 3: Success
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSendOtp(e) {
    e.preventDefault();
    if (!mobile) return;
    setLoading(true);
    setError('');

    // Mock OTP dispatch
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (!otp || !newPassword) return;

    if (otp !== '123456') {
      setError('Invalid OTP code. Please enter the default test code: 123456');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/reset-password', {
        mobile,
        new_password: newPassword
      });
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Password reset failed. Please ensure the mobile number is registered.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto px-margin-mobile md:px-0 py-xl flex flex-col justify-center min-h-[calc(100vh-16rem)]">
      <div className="bg-surface-container-lowest rounded-3xl p-md md:p-lg border border-outline-variant/30 ambient-shadow-md">
        
        {/* Step 1: Request Mobile */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-md">
            <div className="text-center">
              <span className="material-symbols-outlined text-primary text-[48px] mb-sm">lock_reset</span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Reset Password</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                Enter your registered mobile number to receive a verification code.
              </p>
            </div>

            {error && (
              <div className="p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label htmlFor="mobile" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">phone_iphone</span>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-body-md text-body-md py-3 rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>

            <div className="text-center mt-sm">
              <Link to="/login" className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant hover:text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {/* Step 2: Input OTP & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-md">
            <div className="text-center">
              <span className="material-symbols-outlined text-primary text-[48px] mb-sm">verified</span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Enter Code</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                We've sent a code to <strong>{mobile}</strong>. Enter the test code <code className="bg-surface-container px-2 py-0.5 rounded font-mono font-bold text-primary">123456</code> to proceed.
              </p>
            </div>

            {error && (
              <div className="p-sm bg-error-container text-error rounded-xl border border-error/20 flex gap-2 items-start font-body-sm text-body-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label htmlFor="otp" className="font-body-sm text-body-sm font-semibold text-on-surface">Verification Code (OTP)</label>
              <input
                type="text"
                id="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 123456"
                className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-body-md text-center tracking-widest focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label htmlFor="newPassword" className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              className="w-full bg-primary text-on-primary font-body-md text-body-md py-3 rounded-full hover:bg-on-primary-fixed-variant shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2"
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>

            <div className="text-center mt-sm">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant hover:text-primary font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Change Mobile Number
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center text-center py-md gap-md animate-fade-in">
            <span className="material-symbols-outlined text-primary text-[72px]">check_circle</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Password Updated</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Your password has been changed successfully. You can now login with your new credentials.
            </p>
            <Link
              to="/login"
              className="mt-sm bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-full hover:bg-on-primary-fixed-variant transition-all active:scale-95 duration-150 inline-block"
            >
              Proceed to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
