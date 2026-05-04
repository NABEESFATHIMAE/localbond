import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const SellerDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { shopId } = location.state || {}; // Get shopId from navigation

    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const CATEGORIES = ["Retail", "Food", "Fashion", "Electronics", "Handmade", "Services"];

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const loadProducts = (currentShopId) => {
        const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        // Filter products for this SPECIFIC shop
        const shopProducts = allProducts.filter(p => p.shopId === currentShopId);
        setProducts(shopProducts);
    }

    // Load Shop and Products
    useEffect(() => {
        const allShops = JSON.parse(localStorage.getItem("shops") || "[]");
        const currentShop = allShops.find(s => s.id === shopId);

        if (!currentShop) {
            // Fallback: If no shopId passed, check if user has shops, if so pick first, else redirect
            // Ideally we strictly require shopId, but for robustness:
            const userShops = allShops.filter(s => s.userId === (user.id || "user-1"));
            if (userShops.length > 0) {
                /* eslint-disable-next-line react-hooks/set-state-in-effect */
                setShop(userShops[0]);
                // Update products for this fallback shop
                loadProducts(userShops[0].id);
            } else {
                navigate("/profile", { state: { tab: "services", mode: "business" } });
            }
            return;
        }

        setShop(currentShop);
        loadProducts(currentShop.id);
    }, [shopId, navigate, user.id]);

    const handleSaveProduct = (productData) => {
        if (!shop) return;

        const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        let updatedProducts;

        if (editingProduct) {
            // Update existing
            updatedProducts = allProducts.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p);
        } else {
            // Add new
            const newProduct = {
                id: `prod-${Date.now()}`,
                shopId: shop.id, // Link to Shop
                shopName: shop.shopName, // Denormalize name for easy display
                createdAt: new Date().toISOString(),
                ...productData
            };
            updatedProducts = [...allProducts, newProduct];
        }

        localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
        loadProducts(shop.id);

        setIsAddModalOpen(false);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        const updatedProducts = allProducts.filter(p => p.id !== productId);
        localStorage.setItem("allProducts", JSON.stringify(updatedProducts));

        loadProducts(shop.id);
    };

    if (!shop) return null;

    return (
        <div className="min-h-screen relative font-sans text-text-main pb-20">
            <Navbar />

            <div className="pt-28 w-full max-w-[1280px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-8 lg:col-start-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {shop.shopName} <br />
                                    <span className="text-primary">Merchant Console</span>
                                </h1>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-3 px-1">Inventory & Intelligence</p>
                            </div>
                            <div className="flex gap-4">
                                <Link to="/marketplace" className="px-6 py-3.5 bg-white text-slate-600 font-bold rounded-xl hover:bg-slate-50 border border-slate-200 transition-all text-[11px] uppercase tracking-widest shadow-sm">
                                    Public View
                                </Link>
                                <button
                                    onClick={() => { setEditingProduct(null); setIsAddModalOpen(true); }}
                                    className="px-6 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-indigo-100 hover-lift text-[11px] uppercase tracking-widest flex items-center gap-2.5"
                                >
                                    <span>➕</span> Add Identity
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {products.length === 0 ? (
                                <div className="bg-white rounded-2xl p-24 text-center border-2 border-dashed border-slate-100 shadow-sm">
                                    <div className="text-8xl mb-8 opacity-20 grayscale">📦</div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">Empty Inventory</h3>
                                    <p className="text-slate-500 font-medium text-sm mb-10">Your products will appear here once listed in the network</p>
                                    <button
                                        onClick={() => setIsAddModalOpen(true)}
                                        className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-100"
                                    >
                                        Initialize First Presence
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            <tr>
                                                <th className="px-8 py-5">Identity Marker</th>
                                                <th className="px-8 py-5">Classification</th>
                                                <th className="px-8 py-5">Valuation</th>
                                                <th className="px-8 py-5">Status</th>
                                                <th className="px-8 py-5">Inventory</th>
                                                <th className="px-8 py-5 text-right">Ops</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {products.map(product => (
                                                <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group/row">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl overflow-hidden border border-slate-100 transition-transform">
                                                                {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : "📦"}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900 text-sm leading-tight tracking-tight">{product.title}</p>
                                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1 truncate max-w-[150px]">{product.description || "No description"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 font-bold text-slate-500 text-[10px] uppercase tracking-widest">{product.category || "General"}</td>
                                                    <td className="px-8 py-6 font-bold text-slate-900 text-sm tracking-tight">₹{product.price}</td>
                                                    <td className="px-8 py-6">
                                                        {product.isPublished
                                                            ? <span className="text-secondary bg-amber-50 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-amber-100">Broadcast</span>
                                                            : <span className="text-slate-400 bg-slate-50 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-slate-200">Private</span>}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        {product.stock > 0
                                                            ? <span className="text-slate-700 font-bold text-xs">{product.stock} Units</span>
                                                            : <span className="text-rose-500 font-bold text-[10px] uppercase tracking-widest">Depleted</span>}
                                                    </td>
                                                    <td className="px-8 py-6 text-right space-x-4">
                                                        <button
                                                            onClick={() => { setEditingProduct(product); setIsAddModalOpen(true); }}
                                                            className="text-primary font-bold hover:text-primary-hover transition-colors text-[10px] uppercase tracking-widest"
                                                        >
                                                            Refine
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            className="text-rose-400 font-bold hover:text-rose-600 transition-colors text-[10px] uppercase tracking-widest"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="col-span-1 lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <h3 className="text-xl font-extrabold text-slate-900 mb-10 tracking-tight uppercase">Presence Data</h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Identifier</p>
                                    <p className="font-extrabold text-slate-900 text-lg tracking-tight">{shop.shopName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Classification</p>
                                    <span className="px-4 py-2 bg-indigo-50 text-primary text-[10px] font-bold rounded-xl uppercase tracking-widest border border-indigo-100 inline-block">{shop.category}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Focus Point</p>
                                    <p className="font-bold text-slate-700 text-xs tracking-wider">{shop.location}</p>
                                </div>
                                <div className="pt-6 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Direct Contact</p>
                                    <p className="font-bold text-slate-900 text-sm tracking-widest">{shop.contact}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate("/profile", { state: { tab: "services", mode: "business" } })}
                                className="w-full mt-12 py-4 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all text-[11px] uppercase tracking-widest border border-slate-200"
                            >
                                Update Core Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[56px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-emerald-50">
                        <div className="p-10 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{editingProduct ? "Refine Listing" : "Initialize Identity"}</h3>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Populate your inventory metadata</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white text-slate-300 hover:text-primary flex items-center justify-center transition-all hover:rotate-90 shadow-sm border border-emerald-50">✕</button>
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <ProductForm
                                initialData={editingProduct}
                                onSubmit={handleSaveProduct}
                                onCancel={() => setIsAddModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: initialData?.category || "Retail",
        price: initialData?.price || "",
        description: initialData?.description || "",
        image: initialData?.image || "",
        stock: initialData?.stock || "1",
        isPublished: initialData?.isPublished !== false, // Default true
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-10 space-y-8">
            <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Identity Marker *</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                    placeholder="e.g. Handmade Ceramic Vase"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Classification</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 shadow-sm"
                    >
                        {["Retail", "Food", "Fashion", "Electronics", "Handmade", "Services"].map(c =>
                            <option key={c} value={c}>{c}</option>
                        )}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Valuation (₹)</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 shadow-sm"
                            placeholder="999"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Inventory Qty</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: e.target.value })}
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 shadow-sm"
                            placeholder="10"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50">
                <label className="flex items-center gap-5 cursor-pointer">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="w-6 h-6 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                        />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900 text-sm uppercase tracking-tight">Active Broadcast</span>
                        <span className="text-[10px] text-primary/60 font-bold uppercase tracking-widest leading-none">Enable visibility in the network</span>
                    </div>
                </label>
            </div>

            <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Insight & Description</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 resize-none shadow-sm placeholder:text-slate-400"
                    placeholder="Describe the essence of this identity..."
                />
            </div>

            <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Visual Marker</label>
                <div className="border border-slate-200 rounded-2xl p-10 text-center hover:bg-slate-50 transition-all cursor-pointer relative group/upload shadow-sm bg-slate-50/30">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {formData.image ? (
                        <div className="relative h-48 w-full group/preview">
                            <img src={formData.image} alt="Preview" className="h-full w-full object-contain rounded-xl group-hover/preview:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 text-white font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl backdrop-blur-sm">Reset Visual</div>
                        </div>
                    ) : (
                        <div className="py-6 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl mb-4 group-hover/upload:scale-110 transition-transform duration-500 shadow-sm border border-slate-100">📸</div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Capture & Upload</span>
                            <span className="text-[9px] text-primary/40 font-bold uppercase tracking-widest mt-1">PNG, JPG, WEBP formats</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-6 flex gap-4">
                <button
                    onClick={onCancel}
                    className="flex-1 py-4 bg-white text-slate-400 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all border border-slate-200"
                >
                    Discard
                </button>
                <button
                    onClick={() => {
                        if (!formData.title || !formData.price) return alert("Title and Price are required");
                        onSubmit(formData);
                    }}
                    className="flex-1 py-4 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-indigo-100/50"
                >
                    Confirm Presence
                </button>
            </div>
        </div>
    );
}


export default SellerDashboard;
