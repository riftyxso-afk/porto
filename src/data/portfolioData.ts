export const personalInfo = {
  name: "I Wayan Radea",
  avatarUrl: "/images/profile.jpeg",
  location: "Indonesia",
  email: "radzfoundation@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/wayan-radea-82ab63386",
    website: "https://radzzz.my.id",
    mail: "mailto:radzfoundation@gmail.com",
  },
};

// What is left here is what a translation cannot change: names, places, URLs,
// and lists of proper nouns. Every sentence lives in the dictionaries, keyed by
// the ids below.
export const experiences = [
  {
    id: "freelance",
    companyKey: "freelance",
    logo: "/images/SrV1X.png",
    location: "Indonesia",
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
] as const;

export const stackCategories = [
  {
    id: "languages",
    number: "01",
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
    items: [
      { name: "PySpark" },
      { name: "dbt" },
      { name: "Databricks" },
    ],
  },
  {
    id: "cloud",
    number: "05",
    items: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
    ],
  },
  {
    id: "ai",
    number: "06",
    items: [
      { name: "LangChain" },
      { name: "RAG" },
      { name: "Vector Databases" },
    ],
  },
] as const;

export const education = [
  {
    id: "terbuka",
    institution: "Universitas Terbuka",
    period: "2025 — Present",
    courses: ["terbuka-software", "terbuka-digital"],
  },
  {
    id: "sma",
    institution: "SMA Negeri 1 Pupuan, Bali",
    period: "2022 — 2025",
    courses: [],
  },
] as const;
