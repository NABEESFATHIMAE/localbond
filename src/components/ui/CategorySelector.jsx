import React from "react";
import { SERVICE_CATEGORIES, CATEGORY_ICONS } from "../../data/serviceCategories";

export default function CategorySelector({ category, onCategoryChange, error }) {
    const mainCategories = Object.keys(SERVICE_CATEGORIES);

    return (
        <div>
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Category *
            </label>
            <div className="relative">
                <select
                    value={category || ""}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        onCategoryChange(selectedValue);
                    }}
                    className={`w-full px-6 py-4 rounded-3xl bg-surface-soft border-2 ${error ? "border-rose-400" : "border-transparent"
                        } focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer`}
                    style={{ zIndex: 10 }}
                >
                    <option value="">Select a category</option>
                    {mainCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {CATEGORY_ICONS[cat]} {cat}
                        </option>
                    ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" style={{ zIndex: 0 }}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                </div>
            </div>
            {error && <p className="mt-2 px-4 text-xs font-medium text-rose-500">{error}</p>}
        </div>
    );
}
