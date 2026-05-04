import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import Footer from "../components/layout/Footer";

const Marketplace = () => {
    const navigate = useNavigate();
    // viewMode: 'intent' | 'local' | 'second-hand' | 'sell-used'
    const [viewMode, setViewMode] = useState("intent");
    const [searchTerm, setSearchTerm] = useState("");
    const [products] = useState(() => {
        return JSON.parse(localStorage.getItem("allProducts") || "[]");
    });

    useEffect(() => {
        // We still keep the effect if we need to sync when viewMode changes
        // but initial load is handled in state initializer.
    }, [viewMode]); // Reload when view changes (e.g. after selling)

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Filter products based on mode
    const localProducts = products.filter(p => !p.isSecondHand && p.shopId && p.isPublished !== false);
    const secondHandProducts = products.filter(p => (p.isSecondHand || !p.shopId) && p.isPublished !== false);

    // Filter by search
    const filterProducts = (list) => {
        if (!searchTerm) return list;
        const lowerTerm = searchTerm.toLowerCase();
        return list.filter(p =>
            p.title.toLowerCase().includes(lowerTerm) ||
            (p.category && p.category.toLowerCase().includes(lowerTerm))
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-text-main">
            <Navbar />

            <div className="flex-1 w-full px-6 pt-28 pb-12">
                <main className="flex flex-row gap-8 items-start justify-between max-w-[1600px] mx-auto">

                    <Sidebar />

                    {/* Center: Content Area */}
                    <div className="flex-1 space-y-8 min-w-0">

                        {/* VIEW MODE: INTENT SELECTION (LANDING) */}
                        {viewMode === "intent" && (
                            <div className="space-y-16 animate-fade-in py-12">
                                <div className="text-center space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-[11px] font-bold uppercase tracking-wider border border-indigo-100">
                                        <span>🛍️</span> Neighborhood Commerce
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                                        Support <span className="text-primary">Local.</span> Buy <span className="text-accent">Better.</span>
                                    </h1>
                                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                                        Discover unique products from neighbors or exchange pre-loved items with your community safely.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4">
                                    {/* OPTION 1: LOCAL BUSINESS PRODUCTS */}
                                    <div
                                        onClick={() => setViewMode("local")}
                                        className="bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group border border-slate-100 flex flex-col items-center text-center"
                                    >
                                        <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center text-5xl mb-8 group-hover:scale-105 transition-transform duration-500 border border-indigo-100 shadow-inner">
                                            🏪
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Discovery Market</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-10 text-base">
                                            Support small businesses in <span className="text-primary font-bold">{user.location || 'your area'}</span>. High quality, local personal touch.
                                        </p>
                                        <button className="w-full py-4 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-100 hover:bg-primary-hover transition-all uppercase tracking-wide">
                                            Browse Shops <span>→</span>
                                        </button>
                                    </div>

                                    {/* OPTION 2: SECOND-HAND ITEMS */}
                                    <div
                                        onClick={() => setViewMode("second-hand")}
                                        className="bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group border border-slate-100 flex flex-col items-center text-center"
                                    >
                                        <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center text-5xl mb-8 group-hover:scale-105 transition-transform duration-500 border border-amber-100 shadow-inner">
                                            ♻️
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Community Swap</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-10 text-base">
                                            Buy or sell gently used items with your neighbors. Give pre-loved goods a second life.
                                        </p>
                                        <button className="w-full py-4 bg-accent text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-100 hover:bg-accent-hover transition-all uppercase tracking-wide">
                                            Explore Items <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW MODE: LOCAL BUSINESS PRODUCTS */}
                        {viewMode === "local" && (
                            <div className="space-y-10 animate-fade-in">
                                {/* Header Section Container */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setViewMode("intent")}
                                                className="text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-1 transition-all text-sm uppercase tracking-wide"
                                            >
                                                &larr; Exit
                                            </button>
                                            <div className="w-[1px] h-4 bg-slate-200 mx-2"></div>
                                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Discovery <span className="text-primary">Market</span></h2>
                                        </div>
                                        <button
                                            onClick={() => navigate("/profile", { state: { tab: "services", mode: "business" } })}
                                            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm flex items-center gap-2"
                                        >
                                            <span>🏪</span> Merchant Portal
                                        </button>
                                    </div>

                                    {/* Search Inside Header Container */}
                                    <div className="relative w-full group">
                                        <input
                                            type="text"
                                            placeholder="What can we help you find locally?"
                                            className="w-full px-12 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">🔍</div>
                                    </div>
                                </div>

                                {/* Local Products Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
                                    {filterProducts(localProducts).length > 0 ? (
                                        filterProducts(localProducts).map((product) => (
                                            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group flex flex-col h-full overflow-hidden">

                                                {/* Image */}
                                                <div
                                                    onClick={() => navigate(`/marketplace/local-products/${product.id}`)}
                                                    className="bg-slate-50 rounded-xl h-52 w-full mb-5 object-cover flex items-center justify-center text-4xl relative overflow-hidden cursor-pointer border border-slate-100 shadow-inner"
                                                >
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    ) : (
                                                        <span className="opacity-30 group-hover:scale-110 transition-transform">📦</span>
                                                    )}
                                                    {/* Stock Badge */}
                                                    <div className="absolute top-4 right-4">
                                                        <span className={`px-3 py-1.5 ${product.stock > 0 ? 'bg-primary text-white border-primary/20' : 'bg-slate-200 text-slate-600 border-slate-300'} text-[9px] font-bold rounded-lg uppercase tracking-wider shadow-sm border backdrop-blur-md`}>
                                                            {product.stock > 0 ? `In Stock` : `Limited`}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex flex-col flex-1 px-1">
                                                    <div className="mb-auto">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded uppercase tracking-wider border border-indigo-100">
                                                                {product.category || "General"}
                                                            </span>
                                                        </div>
                                                        <h3
                                                            onClick={() => navigate(`/marketplace/local-products/${product.id}`)}
                                                            className="text-lg font-bold text-slate-800 leading-tight line-clamp-2 mb-3 cursor-pointer hover:text-primary transition-colors tracking-tight"
                                                        >
                                                            {product.title}
                                                        </h3>
                                                        <div className="flex items-center justify-between mb-4">
                                                            <p className="text-xl font-bold text-slate-900">₹{product.price}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-6">
                                                            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] border border-slate-200">🏪</div>
                                                            {product.shopName}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                                        <button
                                                            onClick={() => navigate(`/marketplace/local-products/${product.id}`)}
                                                            className="w-full py-2.5 bg-white text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wide shadow-sm active:scale-95"
                                                        >
                                                            Details
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/marketplace/local-products/${product.id}`)}
                                                            className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-sm transition-all text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 active:scale-95"
                                                        >
                                                            🛒 Buy
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                            <div className="text-6xl mb-4 opacity-40">🏪</div>
                                            <p className="text-lg font-bold text-slate-600">No products found.</p>
                                            <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wide">Try adjusting your filters</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* VIEW MODE: SECOND-HAND ITEMS */}
                        {viewMode === "second-hand" && (
                            <div className="space-y-10 animate-fade-in">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setViewMode("intent")}
                                            className="text-slate-400 hover:text-amber-600 font-bold flex items-center gap-1 transition-all text-sm uppercase tracking-wide"
                                        >
                                            ← Back
                                        </button>
                                        <div className="w-[1px] h-4 bg-slate-200 mx-2"></div>
                                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Community <span className="text-amber-600">Swap.</span></h2>
                                    </div>
                                    <button
                                        onClick={() => setViewMode("sell-used")}
                                        className="px-8 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 shadow-md transition-all text-sm uppercase tracking-wide flex items-center gap-2"
                                    >
                                        <span>+</span> List an Item
                                    </button>
                                </div>

                                {/* Search */}
                                <div className="relative w-full group">
                                    <input
                                        type="text"
                                        placeholder="Search for pre-loved items..."
                                        className="w-full px-12 py-4 rounded-xl bg-white border border-slate-200 focus:border-amber-400/40 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-amber-600 transition-colors">🔍</div>
                                </div>

                                {/* Second-Hand Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
                                    {filterProducts(secondHandProducts).length > 0 ? (
                                        filterProducts(secondHandProducts).map((product) => (
                                            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-100 hover:shadow-md transition-all group flex flex-col h-full overflow-hidden">
                                                <div className="bg-amber-50/30 rounded-xl h-52 w-full mb-5 object-cover flex items-center justify-center text-4xl relative overflow-hidden shadow-inner border border-amber-50">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    ) : (
                                                        <span className="opacity-30 group-hover:scale-110 transition-transform">♻️</span>
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1.5 bg-amber-600 text-white text-[9px] font-bold rounded-lg uppercase tracking-wider shadow-sm border border-amber-500/20 backdrop-blur-md">
                                                            Pre-Loved
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="px-1 flex flex-col flex-1">
                                                    <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2 mb-3 tracking-tight group-hover:text-amber-700 transition-colors">{product.title}</h3>
                                                    <div className="flex items-center justify-between mb-5">
                                                        <p className="text-xl font-bold text-amber-700">₹{product.price}</p>
                                                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-100">Neighbor Sale</span>
                                                    </div>
                                                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 mt-auto">
                                                        <div className="w-6 h-6 rounded bg-amber-50 text-amber-700 flex items-center justify-center text-[10px] border border-amber-100">👤</div>
                                                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide truncate">{product.shopName || "Neighbor"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                            <div className="text-6xl mb-4 opacity-40">♻️</div>
                                            <p className="text-lg font-bold text-slate-600">No items found.</p>
                                            <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wide">Be the first to list a pre-loved item!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* VIEW MODE: SELL USED ITEM FORM */}
                        {viewMode === "sell-used" && (
                            <div className="max-w-xl mx-auto space-y-8 animate-fade-in py-8">
                                <button
                                    onClick={() => setViewMode("second-hand")}
                                    className="text-slate-400 hover:text-primary font-bold flex items-center gap-1 transition-all text-sm uppercase tracking-wide"
                                >
                                    &larr; Back to Market
                                </button>

                                <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                                    <div className="flex items-center gap-5 mb-10">
                                        <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl text-primary border border-indigo-100 shadow-sm">
                                            📦
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">List an Item</h2>
                                            <p className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mt-0.5">Re-home your pre-loved goods</p>
                                        </div>
                                    </div>

                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Item Title</label>
                                                <input name="title" type="text" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none font-medium text-slate-800 transition-all placeholder:text-slate-400" placeholder="What are you listing?" required />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Fair Price (₹)</label>
                                                    <input name="price" type="number" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none font-medium text-slate-800 transition-all placeholder:text-slate-400" placeholder="e.g. 500" required />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Availability</label>
                                                    <div className="w-full px-5 py-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-center text-[12px] uppercase tracking-wide">
                                                        Always Available
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Description & Condition</label>
                                                <textarea name="description" rows="4" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none font-medium text-slate-800 resize-none transition-all placeholder:text-slate-400" placeholder="Tell neighbors about the item's condition..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Upload Photo</label>
                                                <div className="relative group">
                                                    <input name="image" type="file" accept="image/*" className="w-full text-[11px] text-slate-500 font-bold file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wide file:bg-primary file:text-white hover:file:bg-primary-hover transition-all cursor-pointer bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300" />
                                                </div>
                                            </div>

                                            <button type="submit" className="w-full py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-widest rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-indigo-100 mt-4 active:scale-[0.98]">
                                                Confirm Listing
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>

                    <RightSidebar />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Marketplace;
