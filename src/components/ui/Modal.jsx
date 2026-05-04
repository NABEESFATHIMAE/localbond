import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                <div className="flex items-center justify-between p-8 border-b border-gray-50 bg-gray-50/30">
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-gray-800 transition-all transform hover:rotate-90"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
