export const tagline = "Building web apps from idea to production.";

export const story =
  "Junior full-stack developer who builds web apps with React and Next.js. I work on my own products, Portalink and Whip, and take freelance web projects on the side. I build responsive interfaces with a mobile-first approach and connect them to REST APIs and Firebase.";

export type IntroSegment = { text: string; href?: string; logo?: string };

export const intro: IntroSegment[][] = [
  [
    {
      text: "I build web apps with React and Next.js — the interface, the API behind it, and everything in between.",
    },
  ],
  [
    { text: "Currently building " },
    { text: "Portalink", href: "https://portalink.cloud", logo: "/images/portalink-logo.png" },
    { text: " and " },
    { text: "Whip", href: "https://whip-app-697.netlify.app", logo: "/images/whip-logo.png" },
    { text: " on my own, and freelancing as a web developer since 2023." },
  ],
  [
    {
      text: "Most of what I know comes from shipping things and fixing what broke. I'm studying Information Systems at Universitas Terbuka, and I care about how a product holds together: clean data, predictable behavior, and an interface that stays out of the way.",
    },
  ],
];

export const currentlyBuilding = [
  {
    id: "portalink",
    title: "Portalink",
    description:
      "Cloud storage aggregator. Google Drive, Dropbox, OneDrive, Mega, and more in one dashboard.",
    status: "In active development",
    href: "https://portalink.cloud",
  },
  {
    id: "whip",
    title: "Whip",
    description:
      "AI super agent for development work, similar in idea to Orca IDE.",
    status: "In active development",
    href: "https://whip-app-697.netlify.app",
  },
];

export const projectList = [
  {
    id: "portalink",
    title: "Portalink",
    category: "Web app & cloud",
    description: "Cloud storage aggregator with all your accounts in one dashboard.",
    href: "https://portalink.cloud",
  },
  {
    id: "whip",
    title: "Whip",
    category: "AI tooling",
    description: "AI super agent for development work.",
    href: "https://whip-app-697.netlify.app",
  },
  {
    id: "soil-moisture-monitoring",
    title: "Soil Moisture Monitoring System",
    category: "Hardware & IoT",
    description:
      "School project (Nov 2025). Designed the system, installed sensors, wrote the code, calibrated and tested it. 2nd place, district-level academic competition.",
    // TODO: replace "#" with a project link, or remove the arrow if none exists
    href: "#",
  },
];
