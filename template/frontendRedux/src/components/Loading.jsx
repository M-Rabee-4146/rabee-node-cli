import React from 'react';

/**
 * Global Loading Component
 * @param {string} message - Optional message to display
 * @param {boolean} full - If true, displays as a full-screen overlay
 */
const Loading = ({ message = "Loading...", full = false }) => {
    if (full) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center z-[100] fixed inset-0">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-100 border-t-[#cb3837] rounded-full animate-spin"></div>
                    <div className="text-[#24292e] font-black animate-pulse text-sm uppercase tracking-widest">
                        {message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-12 w-full">
            <div className="w-8 h-8 border-4 border-gray-100 border-t-[#cb3837] rounded-full animate-spin mb-3"></div>
            <div className="text-gray-600 font-black text-xs uppercase tracking-widest animate-pulse">
                {message}
            </div>
        </div>
    );
};

export default Loading;
