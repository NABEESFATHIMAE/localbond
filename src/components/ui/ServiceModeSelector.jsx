import React from "react";

export default function ServiceModeSelector({ mode, onChange }) {
    const modes = [
        { value: "home-visit", label: "Home Visit", icon: "🏠", description: "I visit customer locations" },
        { value: "at-my-place", label: "At My Place", icon: "🏢", description: "Service provided at my location" },
        { value: "online", label: "Online", icon: "💻", description: "Remote service via video call" },
        { value: "both", label: "Both", icon: "🔄", description: "Flexible - in-person or online" },
    ];

    return (
        <div className="space-y-3">
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Service Mode *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {modes.map((m) => (
                    <button
                        key={m.value}
                        type="button"
                        onClick={() => onChange(m.value)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${mode === m.value
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{m.icon}</span>
                            <span className={`font-extrabold text-sm ${mode === m.value ? "text-primary" : "text-gray-700"}`}>
                                {m.label}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{m.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
