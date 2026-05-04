import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Proceed to Home
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden p-10 md:p-12 border border-slate-200 relative">

        {/* Branding Logo */}
        <div className="text-center mb-10 pt-4 relative z-10">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-indigo-100/50 text-white font-black group cursor-default">
            <span className="group-hover:scale-110 transition-transform duration-500">LB</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-base text-slate-500 font-medium">Please sign in to your neighborhood account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[11px] font-bold text-primary hover:text-primary-hover uppercase tracking-wider transition-colors">Forgot?</button>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 text-sm rounded-xl shadow-lg shadow-indigo-100/50 hover:bg-primary-hover transition-all mt-4 uppercase tracking-widest active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <p className="text-slate-400 font-medium text-sm mb-3">
            New to LocalLoop?
          </p>
          <Link
            to="/signup"
            className="text-primary font-bold hover:text-primary-hover transition-colors text-sm underline-offset-4 hover:underline"
          >
            Create an account today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
