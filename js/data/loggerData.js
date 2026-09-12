/**
 * SAIT CUSAT — Student Activity Logger Data & State
 */

export const activityTypes = [
  { id: "hackathon_winner", label: "Hackathon — Winner / Top 3", points: 50 },
  { id: "hackathon_participant", label: "Hackathon — Participant", points: 20 },
  { id: "paper_published", label: "Research Paper Publication", points: 60 },
  { id: "workshop_attendee", label: "Technical Workshop / Bootcamp", points: 15 },
  { id: "open_source", label: "Open-Source Code Contribution", points: 30 },
  { id: "leadership", label: "Association Lead / Event Organizer", points: 40 },
  { id: "certification", label: "Professional Cloud / AI Certification", points: 25 }
];

export const initialStudentFeed = [
  {
    id: "act-101",
    studentName: "Advaith Pradesh",
    year: "3rd Year",
    eventName: "Smart Campus Hackathon Ideathon",
    category: "Hackathon — Winner / Top 3",
    role: "Team Lead",
    points: 50,
    date: "2025-02-28",
    status: "Verified",
    proofLink: "https://drive.google.com/proof-101"
  },
  {
    id: "act-102",
    studentName: "Niranjan S",
    year: "3rd Year",
    eventName: "Kubernetes Cloud Native Workshop",
    category: "Technical Workshop / Bootcamp",
    role: "Participant",
    points: 15,
    date: "2025-02-15",
    status: "Verified",
    proofLink: "https://drive.google.com/proof-102"
  },
  {
    id: "act-103",
    studentName: "Meera Pillai",
    year: "3rd Year",
    eventName: "National UI/UX Design Sprint",
    category: "Hackathon — Winner / Top 3",
    role: "Lead Designer",
    points: 50,
    date: "2025-02-10",
    status: "Verified",
    proofLink: "https://drive.google.com/proof-103"
  },
  {
    id: "act-104",
    studentName: "Rohit Krishnan",
    year: "2nd Year",
    eventName: "Apache Airflow Open-Source PR Merge",
    category: "Open-Source Code Contribution",
    role: "Contributor",
    points: 30,
    date: "2025-02-04",
    status: "Verified",
    proofLink: "https://github.com/apache/airflow/pulls"
  },
  {
    id: "act-105",
    studentName: "Koiloth Khadeeja Hiba",
    year: "3rd Year",
    eventName: "AWS Certified Solutions Architect Associate",
    category: "Professional Cloud / AI Certification",
    role: "Certified",
    points: 25,
    date: "2025-01-28",
    status: "Verified",
    proofLink: "https://aws.amazon.com/verification"
  },
  {
    id: "act-106",
    studentName: "Farhan Ali",
    year: "2nd Year",
    eventName: "Media & Arts Production Lead — TechFest",
    category: "Association Lead / Event Organizer",
    role: "Coordinator",
    points: 40,
    date: "2025-01-20",
    status: "Under Review",
    proofLink: "https://drive.google.com/proof-106"
  }
];

export const departmentLeaderboard = [
  {
    rank: 1,
    studentName: "Advaith Pradesh",
    year: "3rd Year",
    avatar: "AP",
    activitiesCount: 8,
    totalPoints: 290,
    badge: "Grandmaster",
    badgeColor: "amber"
  },
  {
    rank: 2,
    studentName: "K V Trisha Gautham",
    year: "3rd Year",
    avatar: "TG",
    activitiesCount: 7,
    totalPoints: 265,
    badge: "Innovator",
    badgeColor: "cyan"
  },
  {
    rank: 3,
    studentName: "Niranjan S",
    year: "3rd Year",
    avatar: "NS",
    activitiesCount: 6,
    totalPoints: 235,
    badge: "Pioneer",
    badgeColor: "purple"
  },
  {
    rank: 4,
    studentName: "Meera Pillai",
    year: "3rd Year",
    avatar: "MP",
    activitiesCount: 5,
    totalPoints: 210,
    badge: "Pioneer",
    badgeColor: "emerald"
  },
  {
    rank: 5,
    studentName: "Rohit Krishnan",
    year: "2nd Year",
    avatar: "RK",
    activitiesCount: 5,
    totalPoints: 195,
    badge: "Rising Star",
    badgeColor: "primary"
  }
];
