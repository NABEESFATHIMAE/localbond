import React from "react";

export default function MentorDetailsModal({ mentor, onClose, onProceed }) {
    if (!mentor) return null;

    const getInitials = (name) => {
        if (!name) return "M";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
                {/* Header Section */}
                <div className="relative h-24 bg-slate-50 flex items-center px-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-300 hover:text-slate-500 transition-all border border-slate-100"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-5 translate-y-6">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-medium text-slate-500 shadow-sm border-4 border-white">
                            {getInitials(mentor.name)}
                        </div>
                        <div className="pt-6">
                            <h2 className="text-xl font-medium text-slate-800 tracking-tight">
                                {mentor.name}
                            </h2>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                                Experience: {mentor.experienceLevel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 pt-16 pb-12 space-y-8 overflow-y-auto max-h-[70vh]">
                    {/* Location & Expertise */}
                    <div className="flex flex-wrap items-center gap-3">
                        {mentor.location && (
                            <div className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
                                <span className="text-[11px] font-medium text-slate-500">📍 {mentor.location}</span>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                            {mentor.expertiseAreas?.map((area, index) => (
                                <span key={index} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[10px] font-medium border border-slate-100/50">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About Mentor (formerly Background) */}
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 px-1">About Mentor</h3>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50/20 p-5 rounded-xl border border-slate-100/50 italic">
                            {mentor.background || "No background information provided."}
                        </p>
                    </div>

                    {/* How I Can Help */}
                    {mentor.helpDescription && (
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 px-1">Guidance I Provide</h3>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50/20 p-5 rounded-xl border border-slate-100/50">
                                {mentor.helpDescription}
                            </p>
                        </div>
                    )}

                    {/* Other Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                {mentor.languagesSpoken?.map((lang, index) => (
                                    <span key={index} className="px-3 py-1 bg-white border border-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Mentoring Mode</h3>
                            <div className="flex flex-wrap gap-2">
                                {mentor.mentoringModes?.map((mode, index) => {
                                    const icons = { chat: '💬', video: '📹', audio: '🎙️' };
                                    return (
                                        <span key={index} className="px-3 py-1 bg-white border border-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-2">
                                            {icons[mode] || '📱'} {mode}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Education & Availability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {mentor.educationalStatus && (
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">Education</h3>
                                <p className="text-sm font-medium text-slate-700">{mentor.educationalStatus}</p>
                            </div>
                        )}
                        {mentor.availability && (
                            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">Availability</h3>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {mentor.availability.days?.map(day => (
                                        <span key={day} className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-500 rounded text-[9px] font-medium uppercase">
                                            {day.substring(0, 3)}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    {mentor.availability.timeFrom} - {mentor.availability.timeTo}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="px-10 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-medium text-slate-400">
                        Peer-to-peer connection
                    </p>
                    <button
                        onClick={onProceed}
                        className="px-6 py-2.5 bg-slate-600 text-white font-bold text-[11px] rounded-lg hover:bg-slate-700 transition-all shadow-sm active:scale-95"
                    >
                        Start Conversation
                    </button>
                </div>
            </div>
        </div>
    );
}
