import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);


    useEffect(() => {
        // Mock loading delay
        setTimeout(() => {
            const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
            // Robust ID matching
            const foundProduct = allProducts.find(p => String(p.id) === String(productId));
            setProduct(foundProduct);

            // Load mock comments or empty array
            const storedComments = JSON.parse(localStorage.getItem(`comments_${productId}`) || "[]");
            setComments(storedComments);



            setLoading(false);
        }, 300);
    }, [productId]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "Me (Verified Buyer)",
            text: comment,
            date: "Just now",
            initials: "ME"
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
        setComment("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-ground">
                <Navbar />
                <div className="pt-28 w-full max-w-[96%] mx-auto px-2 sm:px-4 lg:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <Sidebar />
                        <div className="col-span-1 lg:col-span-9 flex items-center justify-center min-h-[50vh]">
                            <div className="animate-spin text-4xl text-primary">⏳</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-surface-ground pb-20 font-sans">
                <Navbar />
                <div className="pt-28 w-full max-w-[96%] mx-auto px-2 sm:px-4 lg:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <Sidebar />
                        <div className="col-span-1 lg:col-span-9 flex flex-col items-center justify-center min-h-[50vh]">
                            <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Node Not Found</h2>
                            <p className="text-slate-500 mb-8 font-medium">The product you are looking for does not exist in the community network.</p>
                            <button onClick={() => navigate("/marketplace")} className="px-8 py-4 bg-primary text-white font-black text-[11px] rounded-2xl hover:bg-primary-hover transition-all uppercase tracking-widest">
                                &larr; Return to Marketplace
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isSecondHand = product.isSecondHand || !product.shopId;

    return (
        <div className="min-h-screen bg-transparent pb-20 font-sans text-text-main">
            <Navbar />

            <div className="pt-32 w-full max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Sidebar */}
                    <Sidebar />

                    {/* Center: Content Area */}
                    <div className="col-span-1 lg:col-span-9 space-y-10">

                        {/* Navigation Top */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 bg-white text-text-muted hover:text-primary font-black rounded-full border border-slate-100 shadow-sm flex items-center gap-2 transition-all active:scale-95 text-[11px] uppercase tracking-widest"
                            >
                                ← Back to Market
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* LEFT: IMAGES */}
                            <div className="space-y-8">
                                <div className="bg-surface rounded-card overflow-hidden shadow-card border border-white aspect-[4/3] flex items-center justify-center relative group">
                                    {product.image ? (
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-200">
                                            <div className="text-9xl mb-6 opacity-30">
                                                {isSecondHand ? "♻️" : "📦"}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-5 py-2 rounded-full text-slate-400">Image Processing...</span>
                                        </div>
                                    )}
                                    {/* Badges */}
                                    <div className="absolute top-8 left-8 flex flex-col gap-4">
                                        {isSecondHand ? (
                                            <span className="px-5 py-2.5 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg border border-amber-400 backdrop-blur-md">
                                                Community Pre-loved
                                            </span>
                                        ) : (
                                            <span className="px-5 py-2.5 bg-gradient-to-r from-primary to-emerald-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg border border-emerald-400/50 backdrop-blur-md">
                                                Enterprise Certified
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Carousel Indicators */}
                                <div className="flex justify-center gap-3">
                                    <div className="w-10 h-2 rounded-full bg-primary shadow-sm shadow-emerald-100"></div>
                                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                </div>
                            </div>

                            {/* RIGHT: DETAILS */}
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mint rounded-full text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                        {isSecondHand ? "♻️ Community Resale" : "🏪 Neighborhood Enterprise"}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-text-main leading-[1.1] tracking-tight">
                                        {product.title}
                                    </h1>
                                    <div className="flex items-center gap-6">
                                        <span className="text-5xl font-black text-primary tracking-tighter shadow-sm">₹{product.price}</span>
                                        {product.stock && !isSecondHand && (
                                            <span className="bg-emerald-50 text-primary font-black px-6 py-2.5 rounded-full text-[11px] border border-emerald-100 uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                                Available: {product.stock} Units
                                            </span>
                                        )}
                                        {isSecondHand && (
                                            <span className="bg-amber-50 text-amber-700 font-black px-6 py-2.5 rounded-full text-[11px] border border-amber-100 uppercase tracking-widest">
                                                Single Node Availability
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Block */}
                                <div className="bg-surface p-10 rounded-[40px] border border-white shadow-card relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-emerald-400"></div>
                                    <h3 className="font-black text-text-main text-lg uppercase tracking-tight mb-6">Discovery Details</h3>
                                    <p className="text-text-secondary font-medium text-lg leading-relaxed mb-10 italic">
                                        "{product.description || "Freshly sourced local product suitable for daily use. Carefully packed and quality checked before delivery."}"
                                    </p>

                                    {!isSecondHand ? (
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { icon: "🌟", label: "Certified Community Quality" },
                                                { icon: "📍", label: "Zero Miles Sourced" },
                                                { icon: "⚡", label: "Instant Neighborhood Pickup" }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-5 p-5 bg-slate-50/50 rounded-3xl border border-slate-100/50 text-text-secondary font-bold text-[11px] uppercase tracking-widest">
                                                    <span className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl">{item.icon}</span>
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-5 bg-amber-50/50 rounded-3xl border border-amber-100/50 text-amber-800 font-bold text-[11px] uppercase tracking-widest flex items-center gap-4">
                                            <span className="text-2xl">♻️</span> Second life for a quality item
                                        </div>
                                    )}
                                </div>

                                {/* SELLER CARD */}
                                <div className="bg-surface p-8 rounded-[40px] border border-white shadow-card flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden group hover:border-emerald-200 transition-all duration-300">
                                    <div className={`w-24 h-24 rounded-[32px] shadow-inner flex items-center justify-center text-4xl shrink-0 ${isSecondHand ? 'bg-amber-50 text-amber-600' : 'bg-mint text-primary border border-primary/20'}`}>
                                        {isSecondHand ? "👤" : "🏪"}
                                    </div>
                                    <div className="flex-1 text-center sm:text-left space-y-2">
                                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Authorized Provider</p>
                                        <h3 className="text-2xl font-black text-text-main group-hover:text-primary transition-colors tracking-tight">{product.shopName || "Neighbor Node"}</h3>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-[10px] text-text-muted font-black uppercase tracking-widest">
                                            <span className="text-amber-500">★ 4.8 Excellence</span>
                                            <span className="text-slate-200">•</span>
                                            <span>Active Neighbor</span>
                                        </div>
                                    </div>
                                    {!isSecondHand && product.shopId && (
                                        <button
                                            onClick={() => navigate(`/marketplace/shop/${product.shopId}`)}
                                            className="px-10 py-5 bg-text-main text-white font-black text-[11px] rounded-full hover:bg-primary transition-all shadow-xl hover:shadow-emerald-100 uppercase tracking-widest active:scale-95"
                                        >
                                            Visit Shop
                                        </button>
                                    )}
                                </div>

                                {/* ACTIONS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => alert("Contact feature coming soon!")}
                                        className="sm:col-span-2 w-full py-7 bg-primary text-white font-black text-xl rounded-full hover:bg-primary-hover transition-all shadow-xl shadow-emerald-100/50 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-5 uppercase tracking-widest"
                                    >
                                        <span className="text-2xl">💬</span> Reach Out Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SECTION DIVIDER */}
                        <div className="flex items-center gap-6 py-12">
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-slate-200 text-2xl font-black tracking-tighter">LOCALBOND</span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        {/* CUSTOMER EXPERIENCES */}
                        <div className="bg-surface rounded-[48px] p-12 shadow-card border border-white space-y-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-mint rounded-[32px] shadow-inner text-4xl flex items-center justify-center border border-primary/20">💬</div>
                                    <div>
                                        <h3 className="text-4xl font-black text-text-main tracking-tight">
                                            Neighbor Experiences
                                        </h3>
                                        <p className="text-primary font-black text-[11px] uppercase tracking-[0.2em] mt-1">Verified Feedback Loop</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200"></div>
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest ml-2">12+ happy neighbors</p>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="grid grid-cols-1 gap-6">
                                {comments.length > 0 ? (
                                    comments.map(c => (
                                        <div key={c.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-50 flex gap-8 animate-in fade-in slide-in-from-bottom-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-emerald-500 rounded-[28px] flex items-center justify-center text-2xl font-black text-white shadow-lg shrink-0 uppercase">
                                                {c.initials || "NB"}
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-black text-text-main text-2xl tracking-tight leading-none">{c.user}</h4>
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">Verified Neighborhood Participant</p>
                                                    </div>
                                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{c.date}</span>
                                                </div>
                                                <p className="text-text-secondary font-medium text-xl leading-relaxed italic border-l-4 border-mint pl-8 py-2">
                                                    "{c.text}"
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 p-20 rounded-[40px] flex flex-col items-center justify-center text-center">
                                        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-5xl shadow-sm mb-8 border border-slate-100">
                                            📝
                                        </div>
                                        <p className="text-text-main font-black text-2xl mb-3 tracking-tight">QUIET NEIGHBORHOOD</p>
                                        <p className="text-text-muted font-bold text-sm uppercase tracking-widest">Share your experience to help the community grow.</p>
                                    </div>
                                )}
                            </div>

                            {/* Comment Form */}
                            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary to-emerald-400"></div>
                                <div className="flex items-center gap-4 mb-10">
                                    <span className="text-3xl">✍️</span>
                                    <h4 className="font-black text-text-main text-2xl tracking-tight">Lend Your Voice</h4>
                                </div>
                                <form onSubmit={handleAddComment}>
                                    <div className="space-y-8">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Tell your neighbors how it was..."
                                            className="w-full p-10 bg-slate-50 rounded-[40px] border-2 border-transparent outline-none focus:border-primary-light focus:bg-white transition-all font-bold text-text-main resize-none h-48 text-xl shadow-inner placeholder:text-slate-300"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!comment.trim()}
                                            className="w-full py-6 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-100/50 flex items-center justify-center gap-4 active:scale-[0.98]"
                                        >
                                            Publish Review Node
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
