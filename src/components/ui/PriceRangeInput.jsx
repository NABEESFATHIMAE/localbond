import React from "react";

export default function PriceRangeInput({ priceMin, priceMax, rateType, isNegotiable, onChange }) {
    const handleChange = (field, value) => {
        onChange({ priceMin, priceMax, rateType, isNegotiable, [field]: value });
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Price Range *
            </label>

            {/* Rate Type Selector */}
            <div className="flex gap-2">
                {["Hourly", "Daily", "Project"].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => handleChange("rateType", type)}
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${rateType === type
                                ? "bg-primary text-white"
                                : "bg-surface-soft text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Price Range Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 px-1">Min (₹)</label>
                    <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => handleChange("priceMin", e.target.value)}
                        placeholder="500"
                        min="0"
                        className="w-full px-4 py-3 rounded-2xl bg-surface-soft border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 px-1">Max (₹)</label>
                    <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => handleChange("priceMax", e.target.value)}
                        placeholder="2000"
                        min="0"
                        className="w-full px-4 py-3 rounded-2xl bg-surface-soft border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700"
                    />
                </div>
            </div>

            {/* Negotiable Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer px-1">
                <input
                    type="checkbox"
                    checked={isNegotiable}
                    onChange={(e) => handleChange("isNegotiable", e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-600">Price is negotiable</span>
            </label>

            <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                💰 Set a realistic range based on your experience and market rates
            </p>
        </div>
    );
}
