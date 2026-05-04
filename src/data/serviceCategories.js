// Comprehensive service category system for LocalLoop
export const SERVICE_CATEGORIES = {
    "Home Services": [
        "Electrician",
        "Plumber",
        "Cleaning",
        "Painting",
        "Carpentry",
        "Pest Control",
        "Home Appliance Repair",
    ],
    "Personal Services": [
        "Beauty/Salon",
        "Tailoring",
        "Mehndi Artist",
        "Babysitting",
        "Personal Shopper",
    ],
    "Medical & Care Services": [
        "Home Nurse",
        "Elder Care",
        "Physiotherapy",
        "Medical Equipment Rental",
    ],
    "Educational & Training": [
        "School Tuition",
        "Home Tutor",
        "Coaching Classes",
        "Skill Training",
        "Language Classes",
    ],
    "Events & Celebrations": [
        "Event Coordinator",
        "Decoration",
        "Catering",
        "DJ/Music",
        "Photography",
        "Videography",
    ],
    "Repair & Technical Services": [
        "Mobile Repair",
        "Laptop/Computer Repair",
        "AC Repair",
        "RO/Water Purifier Repair",
    ],
    "Professional Services": [
        "Accountant",
        "Legal Advisor",
        "Insurance Agent",
        "Tax Consultant",
        "Financial Advisor",
    ],
    "Digital & Freelance Services": [
        "Web Developer",
        "Graphic Designer",
        "Video Editor",
        "Content Writer",
        "Social Media Manager",
    ],
    "Health & Wellness": [
        "Yoga Trainer",
        "Fitness Coach",
        "Nutritionist",
        "Dietician",
        "Meditation Instructor",
    ],
    "Creative & Hobby Services": [
        "Music Teacher",
        "Dance Teacher",
        "Art Classes",
        "Craft Classes",
    ],
    "Logistics & Transport": [
        "Packers & Movers",
        "Local Transport",
        "Courier Services",
    ],
};

// Helper function to get all main categories
export const getMainCategories = () => Object.keys(SERVICE_CATEGORIES);

// Helper function to get subcategories for a main category
export const getSubcategories = (mainCategory) =>
    SERVICE_CATEGORIES[mainCategory] || [];

// Category icons mapping
export const CATEGORY_ICONS = {
    "Home Services": "🏠",
    "Personal Services": "💇",
    "Medical & Care Services": "🏥",
    "Educational & Training": "📚",
    "Events & Celebrations": "🎉",
    "Repair & Technical Services": "🔧",
    "Professional Services": "💼",
    "Digital & Freelance Services": "💻",
    "Health & Wellness": "🧘",
    "Creative & Hobby Services": "🎨",
    "Logistics & Transport": "🚚",
};
