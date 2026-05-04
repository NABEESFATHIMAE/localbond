import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import RightSidebar from "../components/layout/RightSidebar";

const Services = () => {
    return (
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-text-main">
            <Navbar />

            <div className="flex-1 w-full px-6 pt-28 pb-12">
                <main className="flex flex-row gap-8 items-start justify-between max-w-[1600px] mx-auto">

                    <Sidebar />

                    {/* Center: Content Area */}
                    <div className="flex-1 space-y-10 min-w-0">
                        <div className="bg-gradient-to-br from-[#0F766E] to-[#2DD4BF] rounded-[32px] p-16 text-white shadow-card relative overflow-hidden group">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                                <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-[32px] flex items-center justify-center text-6xl shadow-inner border border-white/20">
                                    🧰
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-5xl font-black mb-4 tracking-tight">Services <span className="text-emerald-200">Near You.</span></h1>
                                    <p className="text-xl text-emerald-50/90 font-medium max-w-lg leading-relaxed">
                                        Find trusted plumbers, electricians, and helpers from your own community.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="px-10 py-4 bg-white text-[#0F766E] font-black rounded-full hover:shadow-xl hover:-translate-y-1 transition-all text-sm active:scale-95">
                                        List a Service
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Categories Grid - High Density */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: "Home Repairs", icon: "🛠️", color: "bg-blue-50 text-blue-600" },
                                { name: "Cleaning", icon: "🧼", color: "bg-emerald-50 text-emerald-600" },
                                { name: "Tutoring", icon: "📚", color: "bg-amber-50 text-amber-600" },
                                { name: "Gardening", icon: "🌿", color: "bg-green-50 text-green-600" },
                                { name: "Pet Care", icon: "🐾", color: "bg-purple-50 text-purple-600" },
                                { name: "Tech Support", icon: "💻", color: "bg-slate-50 text-slate-600" }
                            ].map((cat) => (
                                <div key={cat.name} className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all flex items-center gap-6 cursor-pointer group">
                                    <div className={`w-16 h-16 rounded-2xl ${cat.color} text-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 group-hover:text-[#0F766E] transition-colors tracking-tight">{cat.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Explore Neighbors</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Services;
