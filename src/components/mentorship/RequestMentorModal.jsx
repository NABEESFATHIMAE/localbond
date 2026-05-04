import React, { useState } from "react";

export default function RequestMentorModal({ mentor, onClose, onSubmit }) {
    const [purpose, setPurpose] = useState("");
    const [error, setError] = useState("");
    const maxLength = 200;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!purpose.trim()) {
            setError("Please describe the purpose of connecting with this mentor");
            return;
        }

        if (purpose.trim().length < 10) {
            setError("Please provide at least 10 characters describing your purpose");
            return;
        }

        setError("");
        onSubmit(purpose.trim());
        setPurpose("");
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl relative animate-in zoom-in-95 duration-500 border border-slate-100">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 hover:text-slate-500 transition-all border border-slate-100"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-slate-50 rounded-md text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-100">
                        🤝 Community Connection
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-xl font-medium text-slate-500 border border-slate-100">
                            {mentor.name ? mentor.name.charAt(0).toUpperCase() : "M"}
                        </div>
                        <div>
                            <h2 className="text-xl font-medium text-slate-800 tracking-tight leading-tight">
                                Connect with <br />
                                <span className="text-slate-600">{mentor.name || "Mentor"}</span>
                            </h2>
                            {mentor.expertiseAreas && mentor.expertiseAreas.length > 0 && (
                                <p className="text-[10px] font-medium text-slate-400 mt-1">
                                    Focus: {mentor.expertiseAreas.slice(0, 2).join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-2 px-1">
                            How would you like to grow? *
                        </label>
                        <textarea
                            value={purpose}
                            onChange={(e) => {
                                setPurpose(e.target.value);
                                setError("");
                            }}
                            placeholder="Introduce yourself and share what you're working on..."
                            rows="4"
                            maxLength={maxLength}
                            className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border-2 ${error ? "border-rose-200" : "border-slate-50"
                                } focus:border-slate-200 focus:bg-white outline-none transition-all font-medium text-slate-700 resize-none placeholder:text-slate-300 text-[13px]`}
                        />
                        <div className="flex justify-between items-center mt-2 px-2">
                            {error && (
                                <p className="text-[10px] font-medium text-rose-400 uppercase tracking-widest">{error}</p>
                            )}
                            <p className="text-[10px] font-medium text-slate-300 ml-auto uppercase tracking-widest">
                                {purpose.length}/{maxLength}
                            </p>
                        </div>
                        <p className="mt-5 px-4 py-3 bg-slate-50/50 rounded-lg text-[10px] font-medium text-slate-400 tracking-wider leading-relaxed border border-slate-100/50 italic">
                            A friendly introduction helps set a warm tone for your connection.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-slate-50 text-slate-400 font-bold text-[11px] rounded-lg hover:bg-slate-100 transition-all border border-slate-100"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-slate-600 text-white font-bold text-[11px] rounded-lg hover:bg-slate-700 transition-all shadow-sm active:scale-95"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

