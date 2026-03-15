import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPassword } from 'Redux/features/auth';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Forgetformdata, setForgetformdata] = useState({ email: '' });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const forgetFormHandler = async (e) => {
    e.preventDefault();
    if (timer > 0) return;
    try {
      const response = await dispatch(ForgotPassword(Forgetformdata));
      if (ForgotPassword.fulfilled.match(response)) {
        toast.success(response?.payload?.message);
        setTimer(60); // Start 60s timer
      } else {
        toast.error(response?.payload || "Make Sure You are connected to the internet");
      }
    } catch (error) {
      toast.error(error);
    }
    setForgetformdata({ email: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-row items-center justify-center lg:container md:px-5 mx-auto relative pt-10 pb-10">
       
        {/* Left branding */}
        <div className="text mx-5   w-full hidden lg:flex flex-col">
          <h1 className="text-[#24292e] text-7xl  font-bold">
            {branding.appName}
          </h1>
          <h2 className="text-3xl text-gray-700 ml-1  font-saira font-semibold">
            {branding.description}
          </h2>
        </div>

        {/* Top icons */}
        <ArrowLeftIcon
          onClick={() => {
            navigate(-1);
          }}
          className="absolute size-6 cursor-pointer lg:left-10 lg:top-10 left-7 top-7 hover:text-[#cb3837] text-gray-700"
        />
        <h1 className="absolute min-w-max lg:right-10 lg:top-10 right-7 top-7 text-gray-700">
          Step - 1
        </h1>

        {/* Card */}
        <div className="md:bg-gray-50 md:shadow-2xl p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px]">
          {/* Mobile branding */}
          <h1 className="text-[#24292e] text-4xl mb-4 font-bold lg:hidden text-center">
            {branding.appName}
          </h1>

          <h2 className="text-2xl font-bold text-center lg:block hidden text-gray-800 mb-6">
            Trouble logging in?
          </h2>
          <h1 className="text-center mt-6 text-gray-600">
            Enter your email and we'll send you a link to get back into your
            account.
          </h1>

          <form onSubmit={forgetFormHandler} className="space-y-4 mt-5">
            {/* Email */}
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                value={Forgetformdata.email}
                onChange={(e) =>
                  setForgetformdata({ email: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-md border bg-white border-gray-300 focus:border-[#cb3837] focus:ring-2 focus:ring-[#cb3837]/20 focus:outline-none text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200"
              />
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                disabled={timer > 0}
                className={`w-full ${timer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#cb3837] hover:bg-[#a92b2a]'} text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-sm hover:shadow-md`}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Send Reset Link'}
              </button>
            </div>
          </form>

          {/* Back to sign in */}
          <div className="text-center mt-6 text-gray-600">
            Go Back?{' '}
            <Link
              to={'/'}
              className="text-[#cb3837] font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
