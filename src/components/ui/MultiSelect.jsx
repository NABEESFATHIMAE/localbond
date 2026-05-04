import React, { useState } from "react";

export default function MultiSelect({ label, options, selected, onChange, grouped = false, placeholder = "Select options", required = false, helperText }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = (value) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const handleRemove = (value) => {
        onChange(selected.filter((item) => item !== value));
    };

    // Filter options based on search
    const getFilteredOptions = () => {
        if (grouped) {
            const filtered = {};
            Object.entries(options).forEach(([category, items]) => {
                const filteredItems = items.filter((item) =>
                    item.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filteredItems.length > 0) {
                    filtered[category] = filteredItems;
                }
            });
            return filtered;
        } else {
            return options.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    };

    const filteredOptions = getFilteredOptions();

    return (
        <div className="space-y-3">
            <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                {label} {required && "*"}
            </label>

            {/* Selected Pills */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selected.map((item) => (
                        <span
                            key={item}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => handleRemove(item)}
                                className="hover:text-primary-hover transition-colors"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown Selector */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full px-6 py-4 rounded-3xl bg-surface-soft border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-gray-700 text-left flex items-center justify-between"
                >
                    <span className={selected.length === 0 ? "text-gray-400" : ""}>
                        {selected.length === 0 ? placeholder : `${selected.length} selected`}
                    </span>
                    <span className="text-gray-400">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {isExpanded && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-100 rounded-3xl shadow-lg max-h-80 overflow-hidden">
                        {/* Search */}
                        <div className="p-4 border-b border-gray-100">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-2xl bg-surface-soft border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold text-gray-700 text-sm"
                            />
                        </div>

                        {/* Options */}
                        <div className="max-h-60 overflow-y-auto p-2">
                            {grouped ? (
                                Object.entries(filteredOptions).map(([category, items]) => (
                                    <div key={category} className="mb-3">
                                        <div className="px-4 py-2 text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                                            {category}
                                        </div>
                                        {items.map((item) => (
                                            <label
                                                key={item}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-soft rounded-2xl cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(item)}
                                                    onChange={() => handleToggle(item)}
                                                    className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                                />
                                                <span className="text-sm font-bold text-gray-700">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                filteredOptions.map((item) => (
                                    <label
                                        key={item}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-soft rounded-2xl cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(item)}
                                            onChange={() => handleToggle(item)}
                                            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                        />
                                        <span className="text-sm font-bold text-gray-700">{item}</span>
                                    </label>
                                ))
                            )}
                            {(grouped ? Object.keys(filteredOptions).length === 0 : filteredOptions.length === 0) && (
                                <div className="px-4 py-8 text-center text-sm text-gray-400 font-medium">
                                    No matches found
                                </div>
                            )}
                        </div>

                        {/* Done Button */}
                        <div className="p-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className="w-full py-2.5 bg-primary text-white font-bold text-sm rounded-full hover:bg-primary-hover transition-all"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {helperText && (
                <p className="text-xs font-medium text-gray-400 leading-relaxed px-1">
                    {helperText}
                </p>
            )}
        </div>
    );
}
