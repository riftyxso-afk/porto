import {
  ExperienceItem,
  ProjectItem,
  StackCategory,
  EducationItem,
  BlogPostItem,
} from "@/types/portfolio";

export const personalInfo = {
  name: "I Wayan Radea",
  roleHeadline: "Junior Full-Stack Developer",
  bio: "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm working on my own products, Portalink and Whip.",
  avatarUrl: "/images/profile.jpeg",
  status: "Open to work",
  location: "Indonesia",
  email: "radzfoundation@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/wayan-radea-82ab63386",
    website: "https://radzzz.my.id",
    mail: "mailto:radzfoundation@gmail.com",
  },
};

export const experiences: ExperienceItem[] = [
  {
    id: "freelance-web-dev",
    company: "Self-Employed (Indonesia)",
    role: "Freelance Web Developer",
    type: "Freelance",
    period: "Jan 2023 — Present",
    duration: "3 yrs 9 mo",
    location: "Indonesia",
    points: [
      "Build responsive websites and landing pages with HTML, CSS, JavaScript, React, and Next.js.",
      "Create reusable UI components using a mobile-first approach.",
      "Connect front ends to REST APIs and Firebase (authentication and data storage).",
      "Build and run my own products, Portalink and Whip.",
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "REST API",
      "Firebase",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "portalink",
    title: "Portalink",
    description:
      "Cloud storage aggregator that puts Google Drive, Dropbox, OneDrive, Mega, and other accounts in one dashboard. Browse files across providers, move files between clouds, and keep folders in sync automatically.",
    status: "live",
    technologies: ["React", "Next.js", "Cloud APIs"],
    imageSrc: "/images/portalink.png",
    link: "https://portalink.cloud",
  },
  {
    id: "whip",
    title: "Whip",
    description:
      "AI super agent for development work, similar in idea to Orca IDE.",
    status: "development",
    technologies: ["AI Agents", "React", "Next.js"],
    imageSrc: "/images/whip.png",
    link: "https://whip-app-697.netlify.app",
  },
  {
    id: "eureka-ai",
    title: "Eureka.AI",
    description:
      "Socratic AI tutor for Indonesian students. Turns YouTube links, web articles, and PDFs into per-chapter notes, quiz questions, and flashcards, then guides students to the answer instead of handing it over. Runs across OpenAI, Claude, DeepSeek, and NVIDIA so each task uses the model that fits.",
    status: "live",
    technologies: ["Next.js", "Multi-model AI", "PDF & Video Parsing"],
    imageSrc: "/images/eureka.png",
    link: "https://eureka-ai.web.id",
  },
];

// Stack section left untouched per instructions
export const stackCategories: StackCategory[] = [
  {
    id: "languages",
    number: "01",
    category: "Languages",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "C++" },
    ],
  },
  {
    id: "frontend",
    number: "02",
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Expo" },
      { name: "Tailwind CSS" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "backend",
    number: "03",
    category: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "BullMQ" },
      { name: "Prisma" },
    ],
  },
  {
    id: "data",
    number: "04",
    category: "Data",
    items: [
      { name: "PySpark" },
      { name: "dbt" },
      { name: "Databricks" },
    ],
  },
  {
    id: "cloud",
    number: "05",
    category: "Cloud",
    items: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
    ],
  },
  {
    id: "ai",
    number: "06",
    category: "AI",
    items: [
      { name: "LangChain" },
      { name: "RAG" },
      { name: "Vector Databases" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Universitas Terbuka",
    degree: "Bachelor of Information Systems",
    period: "2025 — Present",
    courses: ["Software Development", "Digital Systems"],
  },
  {
    institution: "SMA Negeri 1 Pupuan, Bali",
    degree: "Science Program (IPA)",
    period: "2022 — 2025",
    courses: [],
  },
];

export const blogPosts: BlogPostItem[] = [];
