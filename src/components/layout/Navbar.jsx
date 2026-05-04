import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const locationState = useLocation().state || {};
    const fullName = user.fullName || locationState.fullName || "User";
    const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    const location = user.location || "Indiranagar";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border shadow-sm">
            <div className="w-full px-6 py-3 flex items-center justify-between max-w-[1600px] mx-auto">

                {/* Left: Brand & Location */}
                <div className="flex items-center gap-8">
                    <Link to="/home" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 hover:opacity-80 transition-all">
                        <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-indigo-100">
                            <span className="text-lg">LB</span>
                        </div>
                        <span className="hidden sm:block font-black uppercase tracking-wider text-base">LocalBond</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-[12px] text-slate-600 border border-slate-200 font-medium">
                        <span className="opacity-70">📍</span>
                        <span>{location}</span>
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Search your neighborhood…"
                            className="w-full pl-12 pr-6 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white text-[14px] text-slate-700 placeholder:text-slate-400 outline-none transition-all font-medium shadow-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-primary transition-colors">🔍</span>
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 transition-all">
                        <span className="text-xl">🆘</span>
                    </button>

                    <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-50 transition-all relative">
                        <span className="text-xl">🔔</span>
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></div>
                    </button>

                    <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>

                    <Link to="/profile" className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl group cursor-pointer hover:bg-slate-50 transition-all">
                        <span className="text-[12px] font-semibold text-slate-700">{fullName}</span>
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 color-primary text-primary flex items-center justify-center font-bold text-xs border border-indigo-100">
                            {initials}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
