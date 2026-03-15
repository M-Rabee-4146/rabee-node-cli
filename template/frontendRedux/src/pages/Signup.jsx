import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignupUser } from '../Redux/features/auth';
import {
    EyeIcon,
    EyeSlashIcon,
    EnvelopeIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { branding } from '../config/branding';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await dispatch(SignupUser({ 
                email: formData.email, 
                password: formData.password 
            }));
            
            if (SignupUser.fulfilled.match(response)) {
                toast.success('Account created successfully');
                setTimeout(() => navigate('/'), 800);
            } else {
                toast.error(response?.payload || 'Registration failed');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 select-none">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#24292e] to-[#cb3837]"></div>

                    <h2 className="text-2xl font-black text-[#24292e] mb-2 uppercase tracking-tight">Create Account</h2>
                    <p className="text-gray-500 text-sm font-bold mb-6 italic">Enter your details to register</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                                    placeholder="user@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#24292e] transition-colors"
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#24292e] transition-colors"
                                >
                                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#cb3837] hover:bg-[#a92b2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-red-100 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Sign up'}
                        </button>
                    </form>
                        <div className="mt-4 text-center">
                                          <Link to="/" className="text-sm font-bold text-[#cb3837] hover:text-[#24292e] transition-colors">
                                              Already have an account? Sign in
                                          </Link>
                                      </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;
