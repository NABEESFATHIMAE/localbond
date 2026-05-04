import React from "react";
import UpcomingEvents from "./UpcomingEvents";

const RightSidebar = () => {
    const neighbors = [
        { name: "Anita S.", role: "Tailor", icon: "🧵" },
        { name: "Rohan K.", role: "Mentor", icon: "👨‍🏫" },
        { name: "GreenLife", role: "Organic Shop", icon: "🌿" },
    ];

    const emergencyActions = [
        { label: "Medical Help", icon: "🚑" },
        { label: "Police", icon: "🚓" },
        { label: "Fire", icon: "🚒" },
        { label: "Blood Donation", icon: "🩸" },
        { label: "Missing Person", icon: "🔍" },
        { label: "Safety Alerts", icon: "⚠️" },
    ];

    return (
        <div className="hidden xl:flex flex-col w-80 sticky top-28 self-start gap-6">

            {/* Community Circle Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Community Circle</h3>

                <div className="space-y-4">
                    {neighbors.map((n, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-2.5 pr-4 rounded-xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                                {n.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 text-[13px] leading-tight">{n.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{n.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest text-left flex items-center gap-2 group">
                    Explore Circle <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>

            {/* Community Safety Card */}
            <div className="bg-rose-50 rounded-2xl p-6 shadow-sm border border-rose-100 flex flex-col gap-6">
                <h3 className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em]">Community Safety</h3>

                <div className="grid grid-cols-2 gap-3">
                    {emergencyActions.map((action, idx) => (
                        <button key={idx} className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-2 group border border-rose-100/50">
                            <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                            <span className="text-[10px] font-bold text-slate-500 text-center leading-tight tracking-tight">{action.label}</span>
                        </button>
                    ))}
                </div>

                <button className="w-full py-3.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-rose-200 flex items-center justify-center gap-2 active:scale-95">
                    🚨 Emergency Center
                </button>
            </div>

            {/* Upcoming Events Card */}
            <UpcomingEvents />
        </div>
    );
};

export default RightSidebar;
