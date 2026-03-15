import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { resetPassword } from '../Redux/features/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { branding } from '../config/branding';

const ResetPassword = () => {
    const { Token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({ newpassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setformdata((prev) => ({ ...prev, Token: Token }));
    }, [Token]);

    const ResetHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await dispatch(resetPassword(formdata));
            if (resetPassword.fulfilled.match(response)) {
                toast.success(response?.payload?.message || "Password reset successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                toast.error(response?.payload || "Failed to reset password");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 select-none">
            <div className="w-full max-w-md">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-[#cb3837] rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
                            <span className="text-3xl font-black text-white">n</span>
                        </div>
                        <div className="text-left">
                            <div className="text-3xl font-black text-[#24292e] leading-none tracking-tight uppercase">{branding.shortName}</div>
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-widest leading-none mt-1">{branding.appName}</div>
                        </div>
                    </div>
                    <p className="text-gray-500 font-bold italic">v{branding.version} • Optimized for Production</p>
                </div>

                {/* Reset Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#24292e] to-[#cb3837]"></div>

                    <h2 className="text-2xl font-black text-[#24292e] mb-2 uppercase tracking-tight">Reset Password</h2>
                    <p className="text-gray-500 text-sm font-bold mb-8 italic">Enter your new password below</p>

                    <form onSubmit={ResetHandler} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-[#24292e] mb-2 ml-1">
                                New Password
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formdata.newpassword}
                                    onChange={(e) => setformdata({ ...formdata, newpassword: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#cb3837] focus:border-[#cb3837] hover:border-[#cb3837] outline-none text-sm font-bold transition-all"
                                    placeholder="Enter new password"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#cb3837] hover:bg-[#a92b2a] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-red-100 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Update password"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[#24292e] transition-colors">
                            <ArrowLeftIcon className="w-3 h-3" strokeWidth={3} />
                            Back to sign in
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <p>{branding.copyright}</p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
