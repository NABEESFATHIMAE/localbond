import React, { useState } from "react";

export default function FileUpload({ files, onChange, maxFiles = 5, accept = "image/*", label }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (newFiles) => {
        const fileArray = Array.from(newFiles);
        const remainingSlots = maxFiles - files.length;
        const filesToAdd = fileArray.slice(0, remainingSlots);

        // Create preview URLs
        const filesWithPreviews = filesToAdd.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        }));

        onChange([...files, ...filesWithPreviews]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFileSelect(e.dataTransfer.files);
        }
    };

    const handleRemove = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        onChange(newFiles);
    };

    return (
        <div className="space-y-4">
            {label && (
                <label className="block text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-1">
                    {label}
                </label>
            )}

            {/* Upload Zone */}
            {files.length < maxFiles && (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${isDragging
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 bg-surface-soft hover:border-gray-400"
                        }`}
                >
                    <input
                        type="file"
                        accept={accept}
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="pointer-events-none">
                        <div className="text-4xl mb-3">📁</div>
                        <p className="font-bold text-gray-700 mb-1">
                            Drag & drop or click to upload
                        </p>
                        <p className="text-xs text-gray-400 font-medium">
                            {files.length}/{maxFiles} files • Max 5MB each
                        </p>
                    </div>
                </div>
            )}

            {/* Preview Grid */}
            {files.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {files.map((fileObj, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={fileObj.preview}
                                alt={fileObj.name}
                                className="w-full h-20 object-cover rounded-2xl border-2 border-gray-100"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-rose-600"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
