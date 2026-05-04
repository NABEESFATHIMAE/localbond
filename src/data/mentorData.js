// Mentor-specific data for LocalLoop community app

export const EXPERTISE_AREAS = {
    Academic: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "History",
        "Geography",
    ],
    Programming: [
        "Web Development",
        "Mobile Development",
        "AI/ML",
        "Data Science",
        "DevOps",
        "Cybersecurity",
    ],
    Design: [
        "UI/UX Design",
        "Graphic Design",
        "Product Design",
        "Animation",
    ],
    Business: [
        "Marketing",
        "Finance",
        "Entrepreneurship",
        "Sales",
    ],
    Skills: [
        "Communication",
        "Leadership",
        "Aptitude",
        "Interview Prep",
        "Resume Building",
    ],
};

export const EXPERIENCE_LEVELS = [
    "Student",
    "1–3 Years Experience",
    "3+ Years Experience",
];

export const EDUCATIONAL_STATUS = [
    "Currently Studying",
    "Undergraduate",
    "Postgraduate",
    "PhD / Research Scholar",
    "Professional Certification",
];

export const LANGUAGES = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Urdu",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Arabic",
];

// Get all expertise areas as flat array
export const getAllExpertiseAreas = () => {
    return Object.entries(EXPERTISE_AREAS).flatMap(([category, items]) =>
        items.map((item) => ({ category, name: item }))
    );
};

// Get expertise areas grouped by category
export const getGroupedExpertiseAreas = () => EXPERTISE_AREAS;
