import React from "react";

const UpcomingEvents = () => {
    const events = [
        {
            name: "Park Cleanup Drive",
            date: "Sun, 8:00 AM",
            location: "Central Park",
            icon: "🌳"
        },
        {
            name: "Blood Donation Camp",
            date: "Sat, 10:00 AM",
            location: "Community Hall",
            icon: "🩸"
        }
    ];

    return (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm flex flex-col gap-5">
            <h3 className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span>📅</span> Upcoming Events
            </h3>

            <div className="space-y-4">
                {events.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-4 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 border border-amber-100/50">
                            {event.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-[13px] leading-tight mb-1">{event.name}</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight opacity-70">{event.date}</p>
                                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">📍 {event.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="text-[11px] font-bold text-amber-600 hover:text-amber-700 uppercase tracking-widest text-left mt-2 flex items-center gap-2 transition-all group">
                All Events <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
    );
};

export default UpcomingEvents;
