
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#0a2e2b] border-t border-white/5 pt-20 pb-12 text-gray-400 font-sans">
            <div className="w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="text-4xl font-black text-white tracking-tighter flex items-center gap-4 mb-6 group">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
                                ⚡
                            </div>
                            LocalBond
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                            Building warmer, safer, and more connected neighborhoods. Your home for community bond.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Buttons */}
                            {['twitter', 'facebook', 'instagram'].map(social => (
                                <button key={social} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-2 border border-white/5">
                                    <span className="sr-only">{social}</span>
                                    {social === 'twitter' && '𝕏'}
                                    {social === 'facebook' && '𝑓'}
                                    {social === 'instagram' && '📷'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-black text-white mb-10 text-sm uppercase tracking-[0.2em] opacity-50">Explore</h4>
                        <ul className="space-y-5 text-lg font-bold">
                            <li><Link to="/" className="hover:text-primary transition-colors inline-block">Home Feed</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors inline-block">Local Services</Link></li>
                            <li><Link to="/mentors" className="hover:text-primary transition-colors inline-block">Find a Mentor</Link></li>
                            <li><Link to="/events" className="hover:text-primary transition-colors inline-block">Community Events</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-black text-white mb-10 text-sm uppercase tracking-[0.2em] opacity-50">Resources</h4>
                        <ul className="space-y-5 text-lg font-bold">
                            <li><Link to="/guidelines" className="hover:text-primary transition-colors inline-block">Guidelines</Link></li>
                            <li><Link to="/safety" className="hover:text-primary transition-colors inline-block">Safety Tips</Link></li>
                            <li><Link to="/support" className="hover:text-primary transition-colors inline-block">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors inline-block">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-black text-white mb-10 text-sm uppercase tracking-[0.2em] opacity-50">Legal</h4>
                        <ul className="space-y-5 text-lg font-bold">
                            <li><Link to="/privacy" className="hover:text-primary transition-colors inline-block">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors inline-block">Terms</Link></li>
                            <li><Link to="/cookies" className="hover:text-primary transition-colors inline-block">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 text-center">
                    <p className="text-base text-gray-500 font-bold">
                        &copy; {new Date().getFullYear()} LocalBond. Designed with 🏠 for your neighborhood.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
