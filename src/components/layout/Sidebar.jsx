import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const sections = [
        {
            title: "CORE",
            items: [
                { icon: "🏠", label: "Community Feed", path: "/home" },
                { icon: "🛒", label: "Marketplace", path: "/marketplace" },
                { icon: "🧰", label: "Services Near Me", path: "/services" },
                { icon: "🎓", label: "Mentorship", path: "/mentorship" },
            ]
        },
        {
            title: "COMMUNITY & HELP",
            items: [
                { icon: "🤝", label: "Help & Services", path: "/help" },
                { icon: "📢", label: "Community Notices", path: "/notices" },
                { icon: "🔍", label: "Lost & Found", path: "/lost-found" },
                { icon: "🆘", label: "Emergency & Helpline", path: "/emergency" },
            ]
        },
        {
            title: "PEOPLE & CONNECTION",
            items: [
                { icon: "👥", label: "Neighbors", path: "/neighbors" },
                { icon: "💬", label: "Discussions", path: "/discussions" },
            ]
        },
        {
            title: "EVENTS",
            items: [
                { icon: "📅", label: "Community Events", path: "/events" },
            ]
        }
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 sticky top-24 self-start bg-slate-50/50 rounded-2xl border-r border-slate-100 p-5 overflow-y-auto max-h-[calc(100vh-120px)] transition-all">
            <div className="space-y-8">
                {sections.map((section) => (
                    <div key={section.title} className="space-y-3">
                        <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all group ${isActive
                                            ? "bg-white text-indigo-700 shadow-sm border border-slate-100"
                                            : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white border border-slate-100 group-hover:scale-110'}`}>
                                            {item.icon}
                                        </div>
                                        <span className="tracking-tight">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
