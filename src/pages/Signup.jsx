import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // Proceed to profile creation
    const userData = { fullName: formData.fullName, location: formData.location, email: formData.email };
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/profile", { state: userData });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-xl overflow-hidden p-10 md:p-12 border border-slate-200 relative">

        {/* Minimal Header */}
        <div className="text-center mb-10 pt-4 relative z-10">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-indigo-100/50 text-white font-black">
            <span>🏠</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Join LocalLoop</h1>
          <p className="text-base text-slate-500 font-medium">Your neighborhood, unified and thriving.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Your Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Neighborhood"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 text-sm rounded-xl shadow-lg shadow-indigo-100/50 hover:bg-primary-hover transition-all mt-4 uppercase tracking-widest active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <p className="text-slate-400 font-medium text-sm mb-3">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="text-primary font-bold hover:text-primary-hover transition-colors text-sm underline-offset-4 hover:underline"
          >
            Log in to your account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
