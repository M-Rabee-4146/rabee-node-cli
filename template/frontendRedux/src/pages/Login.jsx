import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LoginUser, ForgotPassword } from '../Redux/features/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const [formdata, setformdata] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setLoading(true);
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      navigate('/Dashboard');
    } else {
      setLoading(false);
    }
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(LoginUser({ ...formdata, rememberMe }));
      if (LoginUser.fulfilled.match(response)) {
        try {
          navigate('/Dashboard');
        } catch (error) {
          setLoading(false);
          console.error('Error navigating:', error);
        }
      } else {
        setLoading(false);
        toast.error(response?.payload || 'Login failed', {
          style: { background: '#191919', color: 'white', border: '1px solid #cb3837' },
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  const handleSendCode = async () => {
    if (!recoveryEmail) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      const response = await dispatch(ForgotPassword({ email: recoveryEmail }));
      if (ForgotPassword.fulfilled.match(response)) {
        toast.success(response?.payload?.message || 'Recovery code sent!');
        setCodeSent(true);
        setCountdown(60);
      } else {
        toast.error(response?.payload || 'Failed to send recovery code');
      }
    } catch (error) {
      toast.error('Error sending code');
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-white flex items-center justify-center">
        <div className="text-[#24292e] font-bold text-xl animate-pulse">Initializing System...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-white flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#24292e] to-[#cb3837]"></div>

          {!showForgotPassword ? (
            <>
              <h2 className="text-2xl font-black text-[#24292e] mb-2 uppercase tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 text-sm font-bold mb-8 italic">Sign in to access your system</p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={formdata.email}
                      onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                      placeholder="staff@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formdata.password}
                      onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#24292e]"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#cb3837] border-gray-300 rounded focus:ring-[#cb3837] cursor-pointer"
                    />
                    <label htmlFor="remember" className="ml-2 text-xs font-bold text-gray-600 cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-[#24292e] hover:text-[#cb3837] font-bold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-[#cb3837] hover:bg-[#a92b2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-red-100 active:scale-95"
                >
                  Sign in
                </button>
              </form>
                
                    <div className="mt-4 text-center">
                        <Link to="/signup" className="text-sm font-bold text-[#cb3837] hover:text-[#24292e] transition-colors">
                            Don't have an account? Sign up
                        </Link>
                    </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-black text-[#24292e] mb-2 uppercase tracking-tight">System Recovery</h2>
              <p className="text-gray-500 text-sm font-bold mb-8 italic">Enter your email to receive a code</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                    Recovery Email
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                      placeholder="staff@example.com"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  className="w-full bg-[#cb3837] hover:bg-[#a92b2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Send recovery code'}
                </button>

                {codeSent && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-xs font-bold text-green-700 text-center animate-in fade-in slide-in-from-top-2">
                    ✓ Security code sent
                  </div>
                )}

                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-xs font-bold text-gray-500 hover:text-[#24292e] transition-colors"
                >
                  ← Return to sign in
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
