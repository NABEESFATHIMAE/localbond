import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CategorySelector from "../components/ui/CategorySelector";
import AvailabilityScheduler from "../components/ui/AvailabilityScheduler";
import ServiceModeSelector from "../components/ui/ServiceModeSelector";
import PriceRangeInput from "../components/ui/PriceRangeInput";
import FileUpload from "../components/ui/FileUpload";
import MultiSelect from "../components/ui/MultiSelect";
import MentoringModeSelector from "../components/ui/MentoringModeSelector";
import Footer from "../components/layout/Footer";
import { EXPERTISE_AREAS, EXPERIENCE_LEVELS, EDUCATIONAL_STATUS, LANGUAGES } from "../data/mentorData";

export default function Profile() {
  const locationHook = useLocation();
  const navigate = useNavigate();
  const { fullName = "", location: city = "", tab = "about", mode = null, action = null } = locationHook.state || {};

  // Load user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const defaultName = fullName || user.fullName || "";
  const defaultLocation = city || user.location || "";

  const [activeTab, setActiveTab] = useState(tab);
  const [contributionMode, setContributionMode] = useState(mode); // 'service' | 'mentor' | null
  const [name, setName] = useState(defaultName);
  const [userLocation, setUserLocation] = useState(defaultLocation);

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    serviceTitle: "",
    category: "",
    description: "",
    location: city || "",
    serviceRadius: 5,
    serviceMode: "home-visit",
    availability: {
      days: [],
      timeFrom: "09:00",
      timeTo: "18:00",
    },
    experience: "",
    proofOfWork: [],
    contactPreferences: ["chat", "call"],
    hideContactUntilApproved: true,
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    serviceDetails: false,
    professional: false,
    privacy: false,
  });

  const [formErrors, setFormErrors] = useState({});

  // Mentor Form State
  const [mentorForm, setMentorForm] = useState({
    expertiseAreas: [],
    experienceLevel: "",
    educationalStatus: "",
    background: "",
    helpDescription: "",
    languagesSpoken: [],
    mentoringModes: [],
    availability: {
      days: [],
      timeFrom: "09:00",
      timeTo: "18:00",
    },
    isVerified: false,
  });

  const [mentorFormErrors, setMentorFormErrors] = useState({});

  // Business Form State
  const [businessForm, setBusinessForm] = useState({
    shopName: "",
    category: "Retail",
    description: "",
    location: defaultLocation || "",
    contact: ""
  });

  // Load existing shops
  const allShops = JSON.parse(localStorage.getItem("shops") || "[]");
  const myShops = allShops.filter(s => s.userId === (user.id || "user-1"));
  const [isCreatingShop, setIsCreatingShop] = useState(false);

  // Load existing mentor profile from localStorage when editing or if profile exists
  useEffect(() => {
    if (mode === "mentor" || contributionMode === "mentor") {
      const savedProfile = JSON.parse(localStorage.getItem("mentorProfile") || "null");
      if (savedProfile) {
        // Remove metadata fields that shouldn't be in the form
        const formData = { ...savedProfile };
        delete formData.name;
        delete formData.location;
        delete formData.createdAt;
        delete formData.updatedAt;
        setMentorForm(formData);
      }
    }
  }, [mode, contributionMode]);

  // Set active tab and mode from navigation state
  useEffect(() => {
    if (tab) setActiveTab(tab);
    if (mode) setContributionMode(mode);
  }, [tab, mode, action]);

  const handleSave = () => {
    // TODO: Save profile data to backend
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-700 antialiased">
      <Navbar />

      <div className="flex-1 w-full px-4 pt-28 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative max-w-4xl mx-auto">

          {/* Header Content */}
          <div className="relative p-8 md:p-10 flex flex-col items-center text-center gap-6 border-b border-slate-100">
            <div className="w-24 h-24 rounded-full bg-slate-50 p-1.5 border border-slate-100 shadow-sm relative group">
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-3xl font-black text-white group-hover:scale-105 transition-transform duration-500">
                {name ? name.charAt(0) : "U"}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-xs shadow-sm hover:bg-slate-50 transition-colors">
                📸
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{name || user.fullName || "User"}</h1>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="text-primary font-bold text-[11px] px-3 py-1.5 bg-indigo-50/50 rounded-full border border-indigo-100 uppercase tracking-widest">
                  📍 {userLocation || user.location || "Community Member"}
                </span>
                <span className="text-slate-500 font-bold text-[11px] px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 uppercase tracking-widest">
                  Joined 2025
                </span>
              </div>
            </div>

            <div className="absolute top-10 right-10 hidden md:block">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-primary text-white font-bold text-[11px] rounded-full hover:bg-primary-hover transition-all shadow-lg shadow-indigo-100/50 uppercase tracking-widest"
              >
                Save Changes
              </button>
            </div>

            {/* Mobile Save Button */}
            <div className="md:hidden w-full pt-4">
              <button
                onClick={handleSave}
                className="w-full py-4 bg-[#0F766E] text-white font-bold text-sm rounded-full shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Tabs - Underline Style */}
          <div className="flex justify-center px-6 border-b border-slate-100 bg-white sticky top-0 z-20">
            {[
              { id: "about", label: "Identity" },
              { id: "services", label: "Contributions" },
              { id: "settings", label: "Preferences" }
            ].map(tabItem => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tabItem.id
                  ? "text-primary"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tabItem.label}
                {activeTab === tabItem.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in slide-in-from-bottom-1 duration-300"></div>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-10">
            {activeTab === "about" && (
              <div className="space-y-10 max-w-2xl mx-auto py-4">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Location</label>
                      <input
                        type="text"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                        placeholder="City, Area"
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Public Biography</label>
                    <textarea
                      rows="4"
                      placeholder="Tell your neighbors about yourself, your hobbies, or what you love about the community..."
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400 shadow-sm"
                    ></textarea>
                    <p className="text-[10px] text-slate-400 mt-2 italic px-1">This bio will be visible to your neighbors when you post or offer services.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-8">

                {/* Selection Mode */}
                {!contributionMode && (
                  <div className="py-2">
                    <div className="mb-12 text-center">
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Neighborhood Node</h3>
                      <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm">Contribute to your local community by offering expertise or services.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Service Card */}
                      <div
                        onClick={() => setContributionMode('service')}
                        className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                      >
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          🛠️
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight">Service Presence</h4>
                        <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">
                          Offer technical repairs, daily assistance, or creative skills.
                        </p>
                        <button className="mt-auto px-6 py-2.5 bg-slate-50 text-primary hover:bg-primary hover:text-white text-[10px] font-bold rounded-lg transition-all border border-slate-200 group-hover:border-transparent uppercase tracking-widest">
                          Initialize
                        </button>
                      </div>

                      {/* Mentor Card */}
                      <div
                        onClick={() => setContributionMode('mentor')}
                        className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                      >
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          🎓
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight">Guide Presence</h4>
                        <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">
                          Guide the next generation with professional or academic mentorship.
                        </p>
                        <button className="mt-auto px-6 py-2.5 bg-slate-50 text-primary hover:bg-primary hover:text-white text-[10px] font-bold rounded-lg transition-all border border-slate-200 group-hover:border-transparent uppercase tracking-widest">
                          Initialize
                        </button>
                      </div>

                      {/* Local Business Card */}
                      <div
                        onClick={() => setContributionMode('business')}
                        className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                      >
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          🏪
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight">Business Node</h4>
                        <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed">
                          Promote your shop, products, or established professional ventures.
                        </p>
                        <button className="mt-auto px-6 py-2.5 bg-slate-50 text-primary hover:bg-primary hover:text-white text-[10px] font-bold rounded-lg transition-all border border-slate-200 group-hover:border-transparent uppercase tracking-widest">
                          Initialize
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Form */}
                {contributionMode === 'service' && (
                  <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <button
                      onClick={() => setContributionMode(null)}
                      className="mb-8 text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-2 transition-colors group"
                    >
                      <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to options
                    </button>
                    <div className="bg-slate-900 p-8 rounded-2xl mb-10 text-white shadow-xl shadow-slate-200">
                      <h3 className="text-2xl font-extrabold mb-1 tracking-tight">List a Service Presence</h3>
                      <p className="text-slate-400 text-xs font-medium">Broadcast your expertise to the neighborhood network.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Section 1: Basic Information */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setExpandedSections({ ...expandedSections, basic: !expandedSections.basic })}
                          className="w-full flex items-center justify-between mb-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">📝</span>
                            <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Identity Details</h4>
                          </div>
                          <span className={`text-slate-300 transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`}>▾</span>
                        </button>

                        {expandedSections.basic && (
                          <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Service Title */}
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                                Service Title *
                              </label>
                              <input
                                type="text"
                                value={serviceForm.serviceTitle}
                                onChange={(e) => setServiceForm({ ...serviceForm, serviceTitle: e.target.value })}
                                placeholder="e.g., Professional Home Tutoring"
                                maxLength={60}
                                className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm`}
                              />
                            </div>

                            {/* Category Placeholder (Assuming Component matches) */}
                            <CategorySelector
                              category={serviceForm.category}
                              onCategoryChange={(val) => setServiceForm((prev) => ({ ...prev, category: val }))}
                              error={formErrors.category}
                            />

                            {/* Description */}
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                                Intel & Description *
                              </label>
                              <textarea
                                value={serviceForm.description}
                                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                rows="5"
                                placeholder="Describe the essence of your service and your professional background..."
                                maxLength={500}
                                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400 shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Section 2: Service Details */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setExpandedSections({ ...expandedSections, serviceDetails: !expandedSections.serviceDetails })}
                          className="w-full flex items-center justify-between mb-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">📍</span>
                            <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Geographic & Logistics</h4>
                          </div>
                          <span className={`text-slate-300 transition-transform ${expandedSections.serviceDetails ? 'rotate-180' : ''}`}>▾</span>
                        </button>

                        {expandedSections.serviceDetails && (
                          <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                                Operational Base *
                              </label>
                              <input
                                type="text"
                                value={serviceForm.location}
                                onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                                placeholder="Area, City"
                                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                              />
                            </div>

                            <ServiceModeSelector
                              mode={serviceForm.serviceMode}
                              onChange={(val) => setServiceForm({ ...serviceForm, serviceMode: val })}
                            />

                            <AvailabilityScheduler
                              availability={serviceForm.availability}
                              onChange={(val) => setServiceForm({ ...serviceForm, availability: val })}
                            />
                          </div>
                        )}
                      </div>

                      {/* Section 3: Professional Details */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setExpandedSections({ ...expandedSections, professional: !expandedSections.professional })}
                          className="w-full flex items-center justify-between mb-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">💼</span>
                            <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Professional Intel</h4>
                          </div>
                          <span className={`text-slate-300 transition-transform ${expandedSections.professional ? 'rotate-180' : ''}`}>▾</span>
                        </button>

                        {expandedSections.professional && (
                          <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                                Experience Milestone (Years)
                              </label>
                              <input
                                type="number"
                                value={serviceForm.experience}
                                onChange={(e) => setServiceForm({ ...serviceForm, experience: e.target.value })}
                                placeholder="Year(s)"
                                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                              />
                            </div>

                            <FileUpload
                              files={serviceForm.proofOfWork}
                              onChange={(files) => setServiceForm({ ...serviceForm, proofOfWork: files })}
                              maxFiles={5}
                              accept="image/*,application/pdf"
                              label="Certificates & Portfolio (Optional)"
                            />
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={() => {
                          const errors = {};
                          if (!serviceForm.serviceTitle.trim()) errors.serviceTitle = "Required";
                          if (!serviceForm.category) errors.category = "Required";
                          if (!serviceForm.description.trim()) errors.description = "Required";
                          if (!serviceForm.location.trim()) errors.location = "Required";

                          if (Object.keys(errors).length > 0) {
                            setFormErrors(errors);
                            return;
                          }

                          setFormErrors({});
                          alert("Service initialized in the network.");
                        }}
                        className="w-full py-5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-indigo-100 mt-6 uppercase tracking-[0.2em]"
                      >
                        Publish Presence
                      </button>
                    </div>
                  </div>
                )}

                {/* Business Manager (List or Form) */}
                {contributionMode === 'business' && (
                  <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <button
                      onClick={() => {
                        setContributionMode(null);
                        setIsCreatingShop(false);
                      }}
                      className="mb-8 text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-2 transition-colors group"
                    >
                      <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to options
                    </button>

                    <div className="bg-slate-900 p-8 rounded-2xl mb-10 text-white shadow-xl shadow-slate-200">
                      <h3 className="text-2xl font-extrabold mb-1 tracking-tight">Business Node Management</h3>
                      <p className="text-slate-400 text-xs font-medium">Manage your mercantile presence in the local network.</p>
                    </div>

                    {/* CONTENT: CREATE FORM OR LIST */}
                    {isCreatingShop || myShops.length === 0 ? (
                      /* CREATE NEW SHOP FORM */
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">🏪</span>
                            <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Initialize Shop</h4>
                          </div>
                          {myShops.length > 0 && (
                            <button onClick={() => setIsCreatingShop(false)} className="text-primary hover:text-primary-hover font-bold text-[11px] uppercase tracking-widest">Cancel</button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Shop Name *</label>
                            <input
                              type="text"
                              value={businessForm.shopName}
                              onChange={(e) => setBusinessForm({ ...businessForm, shopName: e.target.value })}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                              placeholder="e.g. Acme Local Goods"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Classification *</label>
                            <select
                              value={businessForm.category}
                              onChange={(e) => setBusinessForm({ ...businessForm, category: e.target.value })}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 shadow-sm"
                            >
                              <option value="Retail">Retail & Grocery</option>
                              <option value="Food">Food & Bakery</option>
                              <option value="Fashion">Fashion & Clothing</option>
                              <option value="Electronics">Electronics & Repair</option>
                              <option value="Handmade">Art & Handmade</option>
                              <option value="Services">Professional Services</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Insight & Description</label>
                          <textarea
                            value={businessForm.description}
                            onChange={(e) => setBusinessForm({ ...businessForm, description: e.target.value })}
                            rows="4"
                            placeholder="Describe your mercantile focus..."
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400 shadow-sm"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Base Location</label>
                            <input
                              type="text"
                              value={businessForm.location}
                              onChange={(e) => setBusinessForm({ ...businessForm, location: e.target.value })}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Contact Intel</label>
                            <input
                              type="text"
                              value={businessForm.contact}
                              onChange={(e) => setBusinessForm({ ...businessForm, contact: e.target.value })}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                              placeholder="+91 0000000000"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!businessForm.shopName) return alert("Shop Name is required");

                            const newShop = {
                              /* eslint-disable-next-line react-hooks/purity */
                              id: `shop-${Date.now()}`,
                              ...businessForm,
                              userId: user.id || "user-1",
                              createdAt: new Date().toISOString()
                            };

                            const updatedShops = [...allShops, newShop];
                            localStorage.setItem("shops", JSON.stringify(updatedShops));

                            if (myShops.length === 0) {
                              localStorage.setItem("businessProfile", JSON.stringify(newShop));
                            }

                            alert("Shop initialized successfully.");
                            setIsCreatingShop(false);
                            window.location.reload();
                          }}
                          className="w-full py-5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-indigo-100 uppercase tracking-[0.2em]"
                        >
                          Initialize Node
                        </button>
                      </div>
                    ) : (
                      /* LIST OF SHOPS */
                      <div className="grid grid-cols-1 gap-6">
                        {myShops.map((shop) => (
                          <div key={shop.id} className="bg-white border border-border-light rounded-2xl p-6 hover:shadow-card transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl border border-emerald-100">
                                🏪
                              </div>
                              <div>
                                <h4 className="text-xl font-extrabold text-gray-800 mb-1">{shop.shopName}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-md uppercase tracking-wide">{shop.category}</span>
                                  <span className="text-gray-400 text-xs font-bold">•</span>
                                  <span className="text-gray-500 text-xs font-bold">{shop.location}</span>
                                </div>
                                <span className="text-primary bg-emerald-50 px-2 py-1 rounded text-xs font-bold">Active</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                              <Link
                                to="/marketplace"
                                className="px-5 py-2.5 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 border border-gray-200 text-sm transition-all"
                              >
                                View Page
                              </Link>
                              <button
                                onClick={() => navigate("/marketplace/dashboard", { state: { shopId: shop.id } })}
                                className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md hover-lift text-sm transition-all flex items-center gap-2"
                              >
                                <span>📦</span> Manage Products
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Mentor Form */}
                {contributionMode === 'mentor' && (
                  <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => setContributionMode(null)}
                        className="text-sm font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-2 transition-colors"
                      >
                        &larr; Back to options
                      </button>
                      {localStorage.getItem("mentorProfile") && (
                        <Link
                          to="/mentor-profile"
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition-all hover:translate-x-1"
                        >
                          View Profile →
                        </Link>
                      )}
                    </div>
                    <div className="bg-slate-900 p-8 rounded-2xl mb-10 text-white shadow-xl shadow-slate-200">
                      <h3 className="text-2xl font-extrabold mb-1 tracking-tight">
                        {localStorage.getItem("mentorProfile") ? "Refine Mentor Profile" : "Become a Mentor"}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium">Share your knowledge and guide the next generation in the local network.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Section 1: Core Information */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">🎓</span>
                          <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Core Information</h4>
                        </div>

                        <div className="space-y-6">
                          {/* Expertise Areas */}
                          <div>
                            <MultiSelect
                              label="Expertise Areas"
                              options={EXPERTISE_AREAS}
                              selected={mentorForm.expertiseAreas}
                              onChange={(val) => setMentorForm({ ...mentorForm, expertiseAreas: val })}
                              grouped={true}
                              placeholder="Select your areas of expertise"
                              required={true}
                              helperText="💡 Select all that apply"
                            />
                            {mentorFormErrors.expertiseAreas && (
                              <p className="mt-2 px-4 text-xs font-medium text-rose-500">{mentorFormErrors.expertiseAreas}</p>
                            )}
                          </div>

                          {/* Experience Level */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                              Mentor Experience Level *
                            </label>
                            <div className="relative">
                              <select
                                value={mentorForm.experienceLevel || ""}
                                onChange={(e) => setMentorForm({ ...mentorForm, experienceLevel: e.target.value })}
                                className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border ${mentorFormErrors.experienceLevel ? 'border-rose-400' : 'border-slate-200'
                                  } focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 appearance-none cursor-pointer shadow-sm`}
                                style={{ zIndex: 10 }}
                              >
                                <option value="">Select experience level</option>
                                {EXPERIENCE_LEVELS.map((level) => (
                                  <option key={level} value={level}>{level}</option>
                                ))}
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" style={{ zIndex: 0 }}>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                                </svg>
                              </div>
                            </div>
                            {mentorFormErrors.experienceLevel && (
                              <p className="mt-2 px-4 text-xs font-medium text-rose-500">{mentorFormErrors.experienceLevel}</p>
                            )}
                          </div>

                          {/* Educational Status */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                              Educational Status / Degree *
                            </label>
                            <input
                              type="text"
                              value={mentorForm.educationalStatus}
                              onChange={(e) => setMentorForm({ ...mentorForm, educationalStatus: e.target.value })}
                              placeholder="e.g., B.Tech in Computer Science, MBA"
                              className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border ${mentorFormErrors.educationalStatus ? 'border-rose-400' : 'border-slate-200'
                                } focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm`}
                            />
                            <div className="flex justify-between items-center mt-2 px-4">
                              {mentorFormErrors.educationalStatus && (
                                <p className="text-xs font-medium text-rose-500">{mentorFormErrors.educationalStatus}</p>
                              )}
                              <p className="text-xs font-medium text-gray-400 ml-auto leading-relaxed">
                                💡 Enter your current degree or educational qualification
                              </p>
                            </div>
                          </div>

                          {/* Background Summary */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                              Background Summary (Optional)
                            </label>
                            <input
                              type="text"
                              value={mentorForm.background}
                              onChange={(e) => setMentorForm({ ...mentorForm, background: e.target.value })}
                              placeholder="e.g., 3 years in web development"
                              maxLength={100}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
                            />
                            <p className="text-xs font-medium text-gray-400 mt-2 px-4 text-right">
                              {mentorForm.background.length}/100
                            </p>
                          </div>

                          {/* How Can You Help */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                              How Can You Help? *
                            </label>
                            <textarea
                              value={mentorForm.helpDescription}
                              onChange={(e) => setMentorForm({ ...mentorForm, helpDescription: e.target.value })}
                              rows="4"
                              placeholder="Describe your teaching style and what you can offer..."
                              maxLength={300}
                              className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border ${mentorFormErrors.helpDescription ? 'border-rose-400' : 'border-slate-200'
                                } focus:border-primary/40 focus:bg-white outline-none transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400 shadow-sm`}
                            />
                            <div className="flex justify-between items-center mt-2 px-4">
                              {mentorFormErrors.helpDescription && (
                                <p className="text-xs font-medium text-rose-500">{mentorFormErrors.helpDescription}</p>
                              )}
                              <p className="text-xs font-medium text-gray-400 ml-auto">
                                {mentorForm.helpDescription.length}/300
                              </p>
                            </div>
                          </div>

                          {/* Languages Spoken */}
                          <div>
                            <MultiSelect
                              label="Languages Spoken"
                              options={LANGUAGES}
                              selected={mentorForm.languagesSpoken}
                              onChange={(val) => setMentorForm({ ...mentorForm, languagesSpoken: val })}
                              grouped={false}
                              placeholder="Select languages you speak"
                              required={true}
                            />
                            {mentorFormErrors.languagesSpoken && (
                              <p className="mt-2 px-4 text-xs font-medium text-rose-500">{mentorFormErrors.languagesSpoken}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Mentoring Preferences */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-100">⚙️</span>
                          <h4 className="text-base font-bold text-slate-900 tracking-tight uppercase">Mentoring Preferences</h4>
                        </div>

                        <div className="space-y-6">
                          {/* Mentoring Mode */}
                          <div>
                            <MentoringModeSelector
                              modes={mentorForm.mentoringModes}
                              onChange={(val) => setMentorForm({ ...mentorForm, mentoringModes: val })}
                            />
                            {mentorFormErrors.mentoringModes && (
                              <p className="mt-2 px-4 text-xs font-medium text-rose-500">{mentorFormErrors.mentoringModes}</p>
                            )}
                          </div>

                          {/* Availability */}
                          <div>
                            <AvailabilityScheduler
                              availability={mentorForm.availability}
                              onChange={(val) => setMentorForm({ ...mentorForm, availability: val })}
                            />
                            {mentorFormErrors.availability && (
                              <p className="mt-2 px-4 text-xs font-medium text-rose-500">{mentorFormErrors.availability}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6 px-1">Trust & Credibility</h4>

                        {mentorForm.isVerified ? (
                          <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-100">
                              ✓
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 uppercase text-xs tracking-widest">Verified Mentor</div>
                                <p className="text-sm text-slate-500 font-medium">Your profile has been verified by our team</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-slate-100">
                                 ⏳
                               </div>
                               <div>
                                 <div className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">Verification Pending</div>
                                 <p className="text-[13px] text-slate-500 font-medium leading-relaxed tracking-tight">
                                   Your profile will be reviewed after activation.
                                 </p>
                               </div>
                             </div>

                             <div className="p-4 bg-white border border-slate-100 rounded-xl">
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
                                 💫 <span className="text-primary/60">Coming Soon:</span> Ratings and reviews will build your credibility
                               </p>
                             </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={() => {
                          // Validation
                          const errors = {};
                          if (mentorForm.expertiseAreas.length === 0) errors.expertiseAreas = "Select at least one expertise area";
                          if (!mentorForm.experienceLevel) errors.experienceLevel = "Experience level is required";
                          if (!mentorForm.educationalStatus) errors.educationalStatus = "Educational status is required";
                          if (!mentorForm.helpDescription.trim()) errors.helpDescription = "Please describe how you can help";
                          if (mentorForm.languagesSpoken.length === 0) errors.languagesSpoken = "Select at least one language";
                          if (mentorForm.mentoringModes.length === 0) errors.mentoringModes = "Select at least one mentoring mode";
                          if (mentorForm.availability.days.length === 0) errors.availability = "Select at least one day";

                          if (Object.keys(errors).length > 0) {
                            setMentorFormErrors(errors);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            return;
                          }

                          setMentorFormErrors({});

                          // Get user info for mentor profile
                          const user = JSON.parse(localStorage.getItem("user") || "{}");

                          // Save mentor profile to localStorage
                          const mentorProfileData = {
                            ...mentorForm,
                            id: `mentor-${Date.now()}`,
                            name: name || user.fullName || "Mentor",
                            location: userLocation || user.location || "",
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                          };

                          localStorage.setItem("mentorProfile", JSON.stringify(mentorProfileData));

                          // Add to allMentors list for display on Mentorship page
                          const allMentors = JSON.parse(localStorage.getItem("allMentors") || "[]");
                          // Check if this mentor already exists (by id or name)
                          const existingIndex = allMentors.findIndex(m =>
                            (m.id && m.id === mentorProfileData.id) ||
                            m.name === mentorProfileData.name
                          );
                          if (existingIndex >= 0) {
                            // Update existing mentor
                            allMentors[existingIndex] = mentorProfileData;
                          } else {
                            // Add new mentor
                            allMentors.push(mentorProfileData);
                          }
                          localStorage.setItem("allMentors", JSON.stringify(allMentors));

                          // Navigate to mentorship page with success state
                          navigate("/mentorship", { state: { profileCreated: true } });
                        }}
                        className="w-full py-5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-indigo-100 uppercase tracking-[0.2em]"
                      >
                        Activate Mentor Presence
                      </button>

                      <p className="text-center text-xs text-gray-400 font-medium leading-relaxed">
                        By activating, you agree to responsibly guide and support students with care and respect
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-8 max-w-2xl mx-auto py-4">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-8 px-1 uppercase tracking-widest">Account Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-100 shadow-sm font-outfit">
                      <div>
                        <h4 className="font-bold text-slate-900 tracking-tight underline decoration-primary/20 decoration-2 underline-offset-4">Email Notifications</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-1">Updates & Alerts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-50 shadow-sm opacity-60 font-outfit">
                      <div>
                        <h4 className="font-bold text-slate-900 tracking-tight">Push Alerts</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-1">Real-time sync</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-not-allowed">
                        <input type="checkbox" className="sr-only peer" disabled />
                        <div className="w-11 h-6 bg-slate-100 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5"></div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <button className="flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors text-[11px] uppercase tracking-widest px-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      Delete Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
