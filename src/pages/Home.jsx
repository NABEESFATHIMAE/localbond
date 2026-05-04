import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import Footer from "../components/layout/Footer";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-text-main">
            <Navbar />

            <div className="flex-1 w-full px-6 pt-24 pb-12">
                <main className="flex flex-row gap-8 items-start justify-between max-w-[1600px] mx-auto">

                    <Sidebar />

                    <div className="flex-1 space-y-8 min-w-0">

                        {/* 1. HERO WELCOME CARD */}
                        <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-2xl p-12 text-white shadow-2xl relative overflow-hidden group border border-white/10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                            
                            <div className="relative z-10 max-w-2xl">
                                <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-sm">
                                    Good Morning, <br />
                                    <span className="text-white">Neighbor.</span>
                                </h1>
                                <p className="text-lg text-indigo-100 mb-10 leading-relaxed font-medium opacity-90">
                                    There’s a lot happening in your neighborhood today. 
                                    How would you like to contribute?
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-sm shadow-xl active:scale-95">
                                        Share Something
                                    </button>
                                    <button className="px-8 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-sm active:scale-95 backdrop-blur-sm">
                                        Ask for Help
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2. COMMUNITY POST CARD (MENTORSHIP) */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col gap-6 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                                        RK
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-base leading-tight">Rohan Kumar</h4>
                                        <p className="text-[12px] font-medium text-slate-400 mt-0.5">Updated 5 hrs ago</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-indigo-100">
                                    #MENTORSHIP
                                </span>
                            </div>

                            <div className="text-slate-600 text-[15px] font-medium leading-relaxed px-1">
                                “I’m a Senior Engineer willing to mentor students in Web Development. Happy to review code or give career advice on weekends!”
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px] uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        🤝 Community Spirit Focus
                                    </div>
                                </div>
                                <Link
                                    to="/mentorship"
                                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-[12px] rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>

                        {/* Additional placeholder to show feel */}
                        <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 shadow-sm opacity-60">
                            <div className="h-4 w-32 bg-slate-200/50 rounded-full mb-6"></div>
                            <div className="h-20 w-full bg-slate-200/30 rounded-xl mb-8"></div>
                            <div className="flex justify-between items-center">
                                <div className="h-10 w-40 bg-slate-200/30 rounded-xl"></div>
                                <div className="h-10 w-32 bg-slate-200/30 rounded-xl"></div>
                            </div>
                        </div>

                    </div>

                    <RightSidebar />

                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
