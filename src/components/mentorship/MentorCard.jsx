import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MentorCard({ mentor, onRequestMentor, variant = "grid" }) {
    const isOwnProfile = mentor.isOwnProfile || false;

    const getInitials = (name) => {
        if (!name) return "M";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name[0].toUpperCase();
    };

    if (variant === "horizontal") {
        return (
            <div className="group flex flex-col md:flex-row items-center gap-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm relative overflow-hidden w-full transition-all">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-medium text-slate-500 flex-shrink-0">
                    {getInitials(mentor.name)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-medium text-slate-800 tracking-tight">
                            {mentor.name || "Mentor"}
                        </h3>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        {mentor.location && (
                            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                📍 {mentor.location}
                            </p>
                        )}
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <p className="text-[11px] font-medium text-slate-400">Experience: {mentor.experienceLevel}</p>
                    </div>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-1.5">
                        {mentor.expertiseAreas?.slice(0, 4).map((area, index) => (
                            <span key={index} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[10px] font-medium border border-slate-100/50">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                        to="/mentor-profile"
                        className="inline-flex items-center justify-center px-5 py-2 bg-slate-100 text-slate-600 font-bold text-[11px] rounded-lg hover:bg-slate-200 transition-all whitespace-nowrap"
                    >
                        Modify Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`group flex flex-col h-full rounded-2xl bg-white border border-slate-100 transition-all duration-300 hover:border-slate-200 relative overflow-hidden p-5`}>

            {/* Header: Avatar + Main Info */}
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-medium text-slate-500 flex-shrink-0 bg-slate-50 border border-slate-100`}>
                    {getInitials(mentor.name)}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-[15px] font-medium text-slate-800 truncate tracking-tight mb-0.5">
                        {mentor.name || "Mentor"}
                    </h3>
                    {mentor.location && (
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            📍 {mentor.location}
                        </p>
                    )}
                </div>
            </div>

            {/* Expertise Row */}
            {mentor.expertiseAreas && mentor.expertiseAreas.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                        {mentor.expertiseAreas.slice(0, 3).map((area, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats / Details Row */}
            <div className="flex flex-col gap-1 mb-5 pt-3 mt-auto border-t border-slate-50">
                <p className="text-[10px] font-medium text-slate-400">Experience: {mentor.experienceLevel || "Community member"}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase">
                    Speaks: {mentor.languagesSpoken?.[0] || "English"}
                    {mentor.languagesSpoken?.length > 1 && `, +${mentor.languagesSpoken.length - 1} more`}
                </p>
            </div>

            {/* Footer: Action */}
            <div className="mt-auto">
                {isOwnProfile ? (
                    <Link
                        to="/mentor-profile"
                        className="w-full h-9 flex items-center justify-center bg-slate-50 text-slate-600 font-bold text-[11px] rounded-lg hover:bg-slate-100 transition-all"
                    >
                        Update My Details
                    </Link>
                ) : (
                    <button
                        onClick={onRequestMentor}
                        className="w-full h-9 bg-slate-600 text-white font-bold text-[11px] rounded-lg hover:bg-slate-700 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Start Conversation</span>
                    </button>
                )}
            </div>
        </div>
    );
}

