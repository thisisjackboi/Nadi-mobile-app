import { Grievance, GrievanceCategory, GrievanceStatus, Language } from './types';

export const TRANSLATIONS = {
  [Language.ENGLISH]: {
    welcome: "Welcome",
    loginSubtitle: "Connect with your government.",
    phoneLabel: "Mobile Number",
    continue: "Continue",
    verify: "Verify OTP",
    otpSent: "Code sent to",
    aadhaarTitle: "Identity Verification",
    aadhaarSubtitle: "Link Aadhaar for priority service.",
    skip: "Skip for now",
    home: "Home",
    profile: "Profile",
    submit: "Submit",
    myGrievances: "My Grievances",
    allGrievances: "All Reports",
    noGrievances: "No active reports.",
    description: "Description",
    location: "Location",
    category: "Category",
    evidence: "Evidence",
    submitSuccess: "Grievance Submitted Successfully",
    namaskar: "Namaskar",
    citizen: "Citizen",
    marketingTitle: "Vision for Development",
    achievements: "Key Achievements",
    newsUpdates: "Latest Updates",
    connect: "Connect"
  },
  [Language.ASSAMESE]: {
    welcome: "স্বাগতম",
    loginSubtitle: "চৰকাৰৰ সৈতে সংযোগ স্থাপন কৰক।",
    phoneLabel: "মোবাইল নম্বৰ",
    continue: "আগবাঢ়ক",
    verify: "OTP সত্য়তা নিৰূপণ",
    otpSent: "ক'ড প্ৰেৰণ কৰা হৈছে",
    aadhaarTitle: "পৰিচয় সত্য়তা",
    aadhaarSubtitle: "অগ্ৰাধিকাৰ সেৱাৰ বাবে আধাৰ সংযোগ কৰক।",
    skip: "এতিয়াৰ বাবে এৰাই চলক",
    home: "গৃহ",
    profile: "আলেখ্য",
    submit: "দাখিল কৰক",
    myGrievances: "মোৰ অভিযোগসমূহ",
    allGrievances: "সকলো প্ৰতিবেদন",
    noGrievances: "কোনো সক্ৰিয় প্ৰতিবেদন নাই।",
    description: "বিৱৰণ",
    location: "স্থান",
    category: "শ্ৰেণী",
    evidence: "প্ৰমাণ",
    submitSuccess: "অভিযোগ সফলভাৱে দাখিল কৰা হ'ল",
    namaskar: "নমস্কাৰ",
    citizen: "নাগৰিক",
    marketingTitle: "উন্নয়নৰ দৰ্শন",
    achievements: "মুখ্য কৃতিত্বসমূহ",
    newsUpdates: "শেহতীয়া আপডেট",
    connect: "সংযোগ"
  }
};

export const MARKETING_UPDATES = [
  {
    id: 1,
    title: { [Language.ENGLISH]: "New Bramhaputra Bridge Project", [Language.ASSAMESE]: "নতুন ব্ৰহ্মপুত্ৰ দলং প্ৰকল্প" },
    image: "https://picsum.photos/seed/bridge/400/200",
    date: "2 days ago"
  },
  {
    id: 2,
    title: { [Language.ENGLISH]: "Free Solar Panels for Villages", [Language.ASSAMESE]: "গাওঁসমূহৰ বাবে বিনামূলীয়া সৌৰ পেনেল" },
    image: "https://picsum.photos/seed/solar/400/200",
    date: "1 week ago"
  },
  {
    id: 3,
    title: { [Language.ENGLISH]: "Youth Skill Development Center", [Language.ASSAMESE]: "যুৱ দক্ষতা বিকাশ কেন্দ্ৰ" },
    image: "https://picsum.photos/seed/skill/400/200",
    date: "2 weeks ago"
  }
];

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'GR-2023-8891',
    title: 'Pothole on Main Market Road',
    description: 'A large pothole has developed near the vegetable market entrance, causing traffic jams.',
    category: GrievanceCategory.ROADS,
    location: 'Guwahati, Market Road',
    status: GrievanceStatus.IN_REVIEW,
    dateSubmitted: '2023-10-25',
    imageUrl: 'https://picsum.photos/seed/road/400/300',
    isAnonymous: false,
    updates: [
      { date: '2023-10-25', title: 'Grievance Submitted', description: 'Your grievance has been received.', author: 'System' },
      { date: '2023-10-26', title: 'Under Review', description: 'Assigned to Municipal Corp reviewer.', author: 'Admin' }
    ]
  },
  {
    id: 'GR-2023-8902',
    title: 'Irregular Water Supply',
    description: 'No water supply in Sector 4 for the last 3 days.',
    category: GrievanceCategory.WATER,
    location: 'Jorhat, Sector 4',
    status: GrievanceStatus.ASSIGNED,
    dateSubmitted: '2023-10-20',
    imageUrl: 'https://picsum.photos/seed/water/400/300',
    isAnonymous: true,
    updates: [
      { date: '2023-10-20', title: 'Submitted', description: 'Received anonymously.', author: 'System' },
      { date: '2023-10-21', title: 'Assigned', description: 'Assigned to Water Works Dept.', author: 'System' },
      { date: '2023-10-22', title: 'Technician Dispatched', description: 'Team is checking the main valve.', author: 'Junior Engineer' }
    ]
  },
  {
    id: 'GR-2023-7721',
    title: 'Street Light Broken',
    description: 'Street light pole #45 is flickering and dangerous.',
    category: GrievanceCategory.ELECTRICITY,
    location: 'Dispur, Lane 2',
    status: GrievanceStatus.RESOLVED,
    dateSubmitted: '2023-09-15',
    imageUrl: 'https://picsum.photos/seed/light/400/300',
    isAnonymous: false,
    updates: [
      { date: '2023-09-15', title: 'Submitted', description: 'Reported via Nadi App.', author: 'User' },
      { date: '2023-09-18', title: 'Resolved', description: 'Bulb replaced and wiring fixed.', author: 'Line Man' }
    ]
  },
  {
    id: 'GR-2023-6612',
    title: 'Garbage not collected',
    description: 'Garbage truck has not visited lane 5 for a week.',
    category: GrievanceCategory.SANITATION,
    location: 'Silchar, Lane 5',
    status: GrievanceStatus.SUBMITTED,
    dateSubmitted: '2023-09-10',
    imageUrl: 'https://picsum.photos/seed/garbage/400/300',
    isAnonymous: true,
    updates: [
      { date: '2023-09-10', title: 'Submitted', description: 'Reported via Nadi App.', author: 'User' }
    ]
  }
];

export const CATEGORY_ICONS: Record<GrievanceCategory, string> = {
  [GrievanceCategory.ROADS]: '🚧',
  [GrievanceCategory.ELECTRICITY]: '⚡',
  [GrievanceCategory.WATER]: '💧',
  [GrievanceCategory.SANITATION]: '🧹',
  [GrievanceCategory.CORRUPTION]: '🚫',
  [GrievanceCategory.OTHER]: '📝',
};

export const STATUS_COLORS: Record<GrievanceStatus, string> = {
  [GrievanceStatus.SUBMITTED]: 'bg-gray-100 text-gray-600',
  [GrievanceStatus.IN_REVIEW]: 'bg-orange-100 text-orange-600',
  [GrievanceStatus.ASSIGNED]: 'bg-blue-100 text-blue-600',
  [GrievanceStatus.RESOLVED]: 'bg-green-100 text-green-600',
};