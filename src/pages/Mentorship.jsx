import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import Footer from "../components/layout/Footer";
import MentorCard from "../components/mentorship/MentorCard";
import RequestMentorModal from "../components/mentorship/RequestMentorModal";
import MentorDetailsModal from "../components/mentorship/MentorDetailsModal";

export default function Mentorship() {
    const location = useLocation();
    const [mentors, setMentors] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const currentUserName = user.fullName || "";
        const currentUserMentorProfile = JSON.parse(localStorage.getItem("mentorProfile") || "null");
        const currentUserMentorName = currentUserMentorProfile?.name || currentUserName;
        const currentUserMentorId = currentUserMentorProfile?.id;

        const storedMentors = JSON.parse(localStorage.getItem("allMentors") || "[]");

        let allMentors = storedMentors.map((mentor) => {
            const mentorName = (mentor.name || "").trim();
            const mentorId = mentor.id || "";

            const isOwnProfile =
                (currentUserName && mentorName === currentUserName.trim()) ||
                (currentUserMentorName && mentorName === currentUserMentorName.trim()) ||
                (currentUserMentorId && mentorId === currentUserMentorId);

            return {
                ...mentor,
                isOwnProfile: isOwnProfile
            };
        });

        if (allMentors.length === 0) {
            const sampleMentor = {
                id: "sample-1",
                name: "Dr. Priya Sharma",
                location: "Koramangala, Bangalore",
                expertiseAreas: ["Web Development", "Data Science", "AI/ML"],
                experienceLevel: "3+ Years Experience",
                educationalStatus: "PhD in Computer Science",
                background: "10 years in software development, currently working at Tech Corp",
                helpDescription: "I specialize in helping students with web development projects, data science concepts, and career guidance. My mentoring style is patient and supportive, focusing on practical examples and real-world applications.",
                languagesSpoken: ["English", "Hindi", "Kannada"],
                mentoringModes: ["chat", "video"],
                availability: {
                    days: ["Monday", "Wednesday", "Friday"],
                    timeFrom: "18:00",
                    timeTo: "21:00",
                },
                isVerified: true,
                isOwnProfile: false,
            };
            allMentors = [sampleMentor];
            localStorage.setItem("allMentors", JSON.stringify(allMentors));
        }
        return allMentors;
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Derived State: My Profile vs Others
    const myProfile = mentors.find(m => m.isOwnProfile);
    const otherMentors = mentors.filter(m => !m.isOwnProfile);

    // Filter mentors based on search term
    const filterFn = (mentor) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();

        const nameMatch = mentor.name?.toLowerCase().includes(term);
        const expertiseMatch = mentor.expertiseAreas?.some((area) =>
            area.toLowerCase().includes(term)
        );
        const languageMatch = mentor.languagesSpoken?.some((lang) =>
            lang.toLowerCase().includes(term)
        );
        const educationMatch = mentor.educationalStatus?.toLowerCase().includes(term);
        const helpMatch = mentor.helpDescription?.toLowerCase().includes(term);

        return nameMatch || expertiseMatch || languageMatch || educationMatch || helpMatch;
    };

    const filteredOthers = otherMentors.filter(filterFn);
    const showMyProfile = myProfile && (!searchTerm || filterFn(myProfile));

    const loadMentors = useCallback(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const currentUserName = user.fullName || "";
        const currentUserMentorProfile = JSON.parse(localStorage.getItem("mentorProfile") || "null");
        const currentUserMentorName = currentUserMentorProfile?.name || currentUserName;
        const currentUserMentorId = currentUserMentorProfile?.id;

        const storedMentors = JSON.parse(localStorage.getItem("allMentors") || "[]");

        const mentorsWithOwnership = storedMentors.map((mentor) => {
            const mentorName = (mentor.name || "").trim();
            const mentorId = mentor.id || "";

            const isOwnProfile =
                (currentUserName && mentorName === currentUserName.trim()) ||
                (currentUserMentorName && mentorName === currentUserMentorName.trim()) ||
                (currentUserMentorId && mentorId === currentUserMentorId);

            return {
                ...mentor,
                isOwnProfile: isOwnProfile
            };
        });

        setMentors(mentorsWithOwnership);
    }, []);

    useEffect(() => {
        if (location.state?.profileCreated) {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleRequestMentor = (mentor) => {
        setSelectedMentor(mentor);
        setIsDetailsOpen(true);
    };

    const handleProceedToRequest = () => {
        setIsDetailsOpen(false);
        setIsModalOpen(true);
    };

    const handleSubmitRequest = (purpose) => {
        const requests = JSON.parse(localStorage.getItem("mentorRequests") || "[]");
        const newRequest = {
            id: Date.now().toString(),
            mentorId: selectedMentor.id || selectedMentor.name,
            mentorName: selectedMentor.name,
            purpose: purpose,
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        requests.push(newRequest);
        localStorage.setItem("mentorRequests", JSON.stringify(requests));

        setIsModalOpen(false);
        setSelectedMentor(null);
        alert(`Mentorship request sent to ${selectedMentor.name}! They will review your request soon.`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FCFCFA] font-sans text-slate-800">
            <Navbar />

            <div className="flex-1 w-full px-6 pt-28 pb-12">
                <main className="flex flex-row gap-8 items-start justify-center max-w-[1400px] mx-auto">
                    <Sidebar />

                    <div className="flex-1 space-y-4 min-w-0 max-w-5xl">
                        {/* Status Message */}
                        {showSuccessMessage && (
                            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[24px] flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">✓</div>
                                    <div>
                                        <p className="font-bold text-slate-800 uppercase tracking-tight">Profile Live</p>
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-0.5">Your presence is now active</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowSuccessMessage(false)} className="text-emerald-300 hover:text-emerald-500 transition-colors">✕</button>
                            </div>
                        )}

                        {/* Page Header & Search */}
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-medium text-slate-800 tracking-tight mb-0.5">
                                        Mentorship Community
                                    </h1>
                                    <p className="text-xs text-slate-400 font-medium">
                                        A supportive space for peer-to-peer learning and guidance
                                    </p>
                                </div>

                                <div className="relative w-full md:w-72 group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Find help by skill..."
                                        className="w-full px-4 py-2 pl-9 rounded-xl bg-white border border-slate-100 outline-none focus:border-slate-200 transition-all font-medium text-slate-600 placeholder:text-slate-300 text-[13px] shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Filter Chips */}
                            <div className="flex flex-wrap items-center gap-2">
                                {["Skill", "Experience", "Location"].map((filter) => (
                                    <button
                                        key={filter}
                                        className="px-3 py-1 rounded-lg border border-slate-100 text-[11px] font-medium text-slate-500 hover:bg-slate-50 transition-all"
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Your Presence Section */}
                        {showMyProfile && (
                            <div className="pt-2">
                                <div className="flex items-center gap-2 mb-2 px-1">
                                    <h2 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">How people see you</h2>
                                </div>
                                <MentorCard mentor={myProfile} variant="horizontal" />
                            </div>
                        )}

                        {/* Other Mentors Grid */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2 px-1">
                                <h2 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                    {searchTerm ? `${filteredOthers.length} members found` : "Available for guidance"}
                                </h2>
                            </div>

                            {filteredOthers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredOthers.map((mentor) => (
                                        <MentorCard
                                            key={mentor.id || mentor.name}
                                            mentor={mentor}
                                            onRequestMentor={() => handleRequestMentor(mentor)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
                                    <p className="text-4xl mb-4 grayscale opacity-20">🔍</p>
                                    <h3 className="text-lg font-black text-slate-800 uppercase mb-2">No Mentors Found</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                        Try broadening your search criteria to find more community members.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />

            {/* Details Modal */}
            {isDetailsOpen && selectedMentor && (
                <MentorDetailsModal
                    mentor={selectedMentor}
                    onClose={() => {
                        setIsDetailsOpen(false);
                        setSelectedMentor(null);
                    }}
                    onProceed={handleProceedToRequest}
                />
            )}

            {/* Request Modal */}
            {isModalOpen && selectedMentor && (
                <RequestMentorModal
                    mentor={selectedMentor}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedMentor(null);
                    }}
                    onSubmit={handleSubmitRequest}
                />
            )}
        </div>
    );
}

