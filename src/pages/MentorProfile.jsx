import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CATEGORY_ICONS } from "../data/serviceCategories";

export default function MentorProfile() {
    const navigate = useNavigate();
    const [mentorProfile, setMentorProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("mentorProfile") || "null");
    });

    useEffect(() => {
        if (!mentorProfile) {
            // If no profile exists, redirect to create one
            navigate("/profile", { state: { tab: "services", mode: "mentor" } });
        }
    }, [mentorProfile, navigate]);

    const handleEdit = () => {
        navigate("/profile", { state: { tab: "services", mode: "mentor", edit: true } });
    };

    const handleDeactivate = () => {
        if (window.confirm("Are you sure you want to deactivate your mentor profile? Students will no longer be able to find you.")) {
            localStorage.removeItem("mentorProfile");
            setMentorProfile(null);
            navigate("/profile", { state: { tab: "services" } });
        }
    };

    if (!mentorProfile) {
        return (
            <div className="min-h-screen bg-background relative font-sans text-text-main">
                <Navbar />
                <div className="pt-28 max-w-5xl mx-auto px-4">
                    <div className="bg-white rounded-[40px] shadow-card border border-gray-100 p-12 text-center">
                        <p className="text-gray-500 font-medium mb-6">Loading mentor profile...</p>
                        <Link
                            to="/profile"
                            className="text-primary font-bold hover:underline"
                        >
                            Go to Profile
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const name = user.fullName || mentorProfile.name || "Mentor";
    const location = user.location || mentorProfile.location || "";

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-text-main">
            <Navbar />

            <div className="flex-1 w-full px-4 pt-28 pb-12">
                <div className="bg-white rounded-3xl shadow-card border border-emerald-50 overflow-hidden relative max-w-5xl mx-auto">
                    {/* Header Accent */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-emerald-50/50"></div>

                    {/* Header */}
                    <div className="relative p-12 border-b border-emerald-50 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-emerald-100 ring-8 ring-white">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left pt-2 flex-1">
                            <div className="flex items-center gap-4 justify-center md:justify-start mb-2">
                                <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">{name}</h1>
                                {mentorProfile.isVerified && (
                                    <span className="px-3 py-1 bg-emerald-100 text-primary-hover text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-200">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>
                            <p className="text-primary-hover font-black tracking-widest uppercase text-[10px] px-4 py-2 bg-emerald-50 rounded-full inline-block border border-emerald-100 mb-4">
                                🎓 Mentor Prime
                            </p>
                            {location && (
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center md:justify-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span> {location}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                            <button
                                onClick={() => navigate("/home")}
                                className="px-8 py-4 bg-slate-50 text-slate-500 font-black text-[11px] rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 uppercase tracking-widest"
                            >
                                ← Terminal Home
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-8 py-4 bg-primary text-white font-black text-[11px] rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-emerald-100 hover-lift uppercase tracking-widest"
                            >
                                ✏️ Modify Profile
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className="px-8 py-4 bg-white text-rose-500 font-black text-[11px] rounded-2xl hover:bg-rose-50 transition-all border border-rose-100 uppercase tracking-widest"
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Core Information */}
                        <div className="bg-white border-2 border-gray-100 rounded-[32px] p-6 md:p-8">
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                                🎓 Core Information
                            </h3>

                            <div className="space-y-6">
                                {/* Expertise Areas */}
                                <div>
                                    <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                                        Expertise Areas
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorProfile.expertiseAreas && mentorProfile.expertiseAreas.length > 0 ? (
                                            mentorProfile.expertiseAreas.map((area) => (
                                                <span
                                                    key={area}
                                                    className="px-5 py-2.5 bg-emerald-50 text-primary-hover rounded-full text-[11px] font-black border border-emerald-100 uppercase tracking-widest"
                                                >
                                                    {area}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-slate-400 text-sm">No expertise areas selected</p>
                                        )}
                                    </div>
                                </div>

                                {/* Experience Level */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                            Experience Level
                                        </label>
                                        <p className="text-gray-700 font-bold text-lg">{mentorProfile.experienceLevel || "Not specified"}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                            Educational Status
                                        </label>
                                        <p className="text-gray-700 font-bold text-lg">{mentorProfile.educationalStatus || "Not specified"}</p>
                                    </div>
                                </div>

                                {/* Background */}
                                {mentorProfile.background && (
                                    <div>
                                        <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                            Background
                                        </label>
                                        <p className="text-gray-700 font-medium">{mentorProfile.background}</p>
                                    </div>
                                )}

                                {/* How Can You Help */}
                                <div>
                                    <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                                        How Can You Help?
                                    </label>
                                    <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                                        {mentorProfile.helpDescription || "Not specified"}
                                    </p>
                                </div>

                                {/* Languages Spoken */}
                                <div>
                                    <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                                        Languages Spoken
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorProfile.languagesSpoken && mentorProfile.languagesSpoken.length > 0 ? (
                                            mentorProfile.languagesSpoken.map((lang) => (
                                                <span
                                                    key={lang}
                                                    className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-full text-[11px] font-black border border-slate-100 uppercase tracking-widest"
                                                >
                                                    {lang}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-slate-400 text-sm">No languages selected</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mentoring Preferences */}
                        <div className="bg-white border-2 border-gray-100 rounded-[32px] p-6 md:p-8">
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                                ⚙️ Mentoring Preferences
                            </h3>

                            <div className="space-y-6">
                                {/* Mentoring Modes */}
                                <div>
                                    <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                                        Mentoring Modes
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {mentorProfile.mentoringModes && mentorProfile.mentoringModes.length > 0 ? (
                                            mentorProfile.mentoringModes.map((mode) => {
                                                const modeLabels = {
                                                    chat: { icon: "💬", label: "Chat" },
                                                    audio: { icon: "🎙️", label: "Audio" },
                                                    video: { icon: "📹", label: "Video" },
                                                };
                                                const modeInfo = modeLabels[mode] || { icon: "📱", label: mode };
                                                return (
                                                    <span
                                                        key={mode}
                                                        className="px-5 py-2.5 bg-emerald-50 text-primary-hover rounded-full text-[11px] font-black border border-emerald-100 flex items-center gap-2 uppercase tracking-widest"
                                                    >
                                                        <span className="text-base">{modeInfo.icon}</span>
                                                        {modeInfo.label}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <p className="text-slate-400 text-sm">No mentoring modes selected</p>
                                        )}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                                        Availability
                                    </label>
                                    {mentorProfile.availability && mentorProfile.availability.days && mentorProfile.availability.days.length > 0 ? (
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {mentorProfile.availability.days.map((day) => (
                                                    <span
                                                        key={day}
                                                        className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black border border-amber-100 uppercase tracking-widest"
                                                    >
                                                        {day}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                                Time: {mentorProfile.availability.timeFrom || "09:00"} - {mentorProfile.availability.timeTo || "18:00"}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm">No availability set</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Trust & Credibility */}
                        <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-8 md:p-12">
                            <h3 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3 tracking-tight uppercase">
                                ✨ Verification Terminal
                            </h3>

                            {mentorProfile.isVerified ? (
                                <div className="flex items-center gap-6 p-8 bg-white rounded-[32px] shadow-sm">
                                    <div className="w-16 h-16 bg-primary rounded-[20px] flex items-center justify-center text-3xl text-white shadow-lg shadow-emerald-100">
                                        ✓
                                    </div>
                                    <div>
                                        <div className="text-xl font-black text-slate-800 mb-1 uppercase tracking-tight">Verified Expert</div>
                                        <p className="text-slate-500 font-medium">Your profile has been validated by the community core.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-6 p-8 bg-white rounded-[32px] shadow-sm border border-emerald-50">
                                        <div className="w-16 h-16 bg-amber-100 rounded-[20px] flex items-center justify-center text-3xl flex-shrink-0 animate-pulse">
                                            ⏳
                                        </div>
                                        <div>
                                            <div className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Network Analysis Pending</div>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                Your mentor profile is under review by the validation node. Our team will verify your credentials soon.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

