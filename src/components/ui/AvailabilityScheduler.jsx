import React from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AvailabilityScheduler({ availability, onChange }) {
    const handleDayToggle = (day) => {
        const newDays = availability.days.includes(day)
            ? availability.days.filter((d) => d !== day)
            : [...availability.days, day];
        onChange({ ...availability, days: newDays });
    };

    const handleTimeChange = (field, value) => {
        onChange({ ...availability, [field]: value });
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Availability *
            </label>

            {/* Days Selector */}
            <div>
                <p className="text-sm font-bold text-gray-600 mb-3">Select Days</p>
                <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => handleDayToggle(day)}
                            className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all ${availability.days.includes(day)
                                    ? "bg-primary text-white shadow-warm"
                                    : "bg-surface-soft text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 px-1">From</label>
                    <input
                        type="time"
                        value={availability.timeFrom}
                        onChange={(e) => handleTimeChange("timeFrom", e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-surface-soft border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 px-1">To</label>
                    <input
                        type="time"
                        value={availability.timeTo}
                        onChange={(e) => handleTimeChange("timeTo", e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-surface-soft border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700"
                    />
                </div>
            </div>

            <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                📅 Select the days and hours you're typically available
            </p>
        </div>
    );
}
