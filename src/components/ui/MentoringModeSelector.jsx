import React from "react";

export default function MentoringModeSelector({ modes, onChange }) {
    const availableModes = [
        { value: "chat", label: "Chat", icon: "💬", description: "Text-based messaging" },
        { value: "audio", label: "Audio", icon: "🎙️", description: "Voice calls" },
        { value: "video", label: "Video", icon: "📹", description: "Video calls" },
    ];

    const handleToggle = (value) => {
        if (modes.includes(value)) {
            onChange(modes.filter((mode) => mode !== value));
        } else {
            onChange([...modes, value]);
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Mentoring Mode *
            </label>

            <div className="space-y-2">
                {availableModes.map((mode) => (
                    <label
                        key={mode.value}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${modes.includes(mode.value)
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={modes.includes(mode.value)}
                            onChange={() => handleToggle(mode.value)}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        />
                        <span className="text-2xl">{mode.icon}</span>
                        <div className="flex-1">
                            <div className={`font-extrabold text-sm mb-0.5 ${modes.includes(mode.value) ? "text-primary" : "text-gray-700"}`}>
                                {mode.label}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">{mode.description}</div>
                        </div>
                    </label>
                ))}
            </div>

            <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                📱 Choose how students can connect with you (select at least one)
            </p>
        </div>
    );
}
