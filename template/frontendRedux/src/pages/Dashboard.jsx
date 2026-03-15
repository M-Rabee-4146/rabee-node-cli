import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Redux/features/auth";
import { branding } from "../config/branding";
import { 
  RocketLaunchIcon, 
  CommandLineIcon, 
  ArrowRightOnRectangleIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  Square3Stack3DIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  const techStack = [
    { name: "React 19", icon: <SparklesIcon className="w-5 h-5" />, desc: "Included & Configured" },
    { name: "Redux ToolKit", icon: <Square3Stack3DIcon className="w-5 h-5" />, desc: "Ready to Use State" },
    { name: "Tailwind 4.0", icon: <CpuChipIcon className="w-5 h-5" />, desc: "Modern Utilities" },
    { name: "Vite 7.0", icon: <RocketLaunchIcon className="w-5 h-5" />, desc: "Lightning Fast" },
    { name: "Auth Guard", icon: <ShieldCheckIcon className="w-5 h-5" />, desc: "Pre-Built Security" },
    { name: "React Router 7", icon: <GlobeAltIcon className="w-5 h-5" />, desc: "Seamless Routing" },
  ];

  return (
    <div className="h-screen w-full bg-[#f6f8fa] flex flex-col items-center justify-center p-4 text-[#24292e] overflow-hidden font-sans">
      {/* Signature Red Strip */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-[#cb3837]"></div>

      <div className="max-w-2xl w-full bg-white border border-gray-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        
        {/* Clean Compact Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#cb3837] rounded-lg flex items-center justify-center shadow-lg shadow-red-100">
              <span className="text-white font-black text-lg">n</span>
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight leading-none text-gray-900">{branding.package}</h1>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1">Official Framework • Template v{branding.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-black text-gray-600 uppercase tracking-widest border border-gray-200">
                 Ready to Use
             </div>
             <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all rounded-xl border border-transparent hover:border-red-100"
                title="Sign Out"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="max-w-[70%]">
              <h2 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">System Initialization Complete</h2>
              <p className="text-sm text-gray-600 font-bold italic">
                Authenticated Identity: <span className="text-[#cb3837] not-italic">{user?.email || 'Secure User'}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">View Documentation</p>
              <a 
                href={branding.github} 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#24292e] text-white rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-gray-200"
              >
                <GlobeAltIcon className="w-4 h-4" /> Package Repo
              </a>
            </div>
          </div>

          {/* Minimal Tech Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="p-4 border border-gray-100 rounded-2xl hover:border-[#cb3837]/20 transition-all bg-[#fafafa] group hover:bg-white hover:shadow-lg hover:shadow-gray-100/50">
                <div className="text-[#cb3837] mb-3 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h3 className="text-xs font-black text-gray-900 leading-none mb-1.5 uppercase tracking-tighter">{tech.name}</h3>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-none">{tech.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Context */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Architect</p>
                <p className="text-xs font-black text-gray-700 uppercase">{branding.developerName}</p>
              </div>
              <div className="h-6 w-[1.5px] bg-gray-100 hidden sm:block"></div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard</p>
                <p className="text-xs font-black text-gray-700 uppercase">{branding.license} License</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#cb3837] bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-100 uppercase tracking-widest">
              <CommandLineIcon className="w-4 h-4" /> {branding.package} Framework
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
