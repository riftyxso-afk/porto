// Every string the reader can see, in English.
//
// This file is the contract. `Dictionary` is derived from it, so a key added
// here without a Bahasa Indonesia counterpart is a type error rather than a
// silently untranslated label on the page.
//
// Structure is flat within each section and commented where the value is not a
// direct translation: proper nouns, dates, and figures stay identical across
// languages on purpose.

export const en = {
  meta: {
    title: "I Wayan Radea — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm working on my own products, Portalink and Whip.",
    keywords: [
      "I Wayan Radea",
      "Portfolio",
      "Junior Full-Stack Developer",
      "Next.js",
      "React",
      "TypeScript",
      "Portalink",
      "Whip",
    ],
  },

  language: {
    // The toggle offers the language you would switch TO, so it is read as an
    // action rather than as the current state.
    switchTo: "Bahasa Indonesia",
    switchAction: "Read this page in Bahasa Indonesia",
    current: "English",
    // Reads "Now: English" in the toggle's accessible name. The trailing colon
    // belongs to the word, so it is part of the value rather than the markup.
    now: "Now:",
  },

  header: {
    titles: [
      "Junior Full-Stack Developer",
      "React & Next.js Specialist",
      "Product Builder (Portalink · Whip)",
      "AI Agent & LLM Developer",
      "Freelance Web Developer",
    ],
    verified: "Verified",
  },

  social: {
    followMe: "follow me",
  },

  info: {
    // Local time in Bali, rendered next to the clock.
    localTime: "WITA local time",
  },

  status: {
    openToWork: "Open to work",
  },

  tagline: "Building web apps from idea to production.",

  story:
    "Junior full-stack developer who builds web apps with React and Next.js. I work on my own products, Portalink and Whip, and take freelance web projects on the side. I build responsive interfaces with a mobile-first approach and connect them to REST APIs and Firebase.",

  intro: [
    [
      {
        text: "I build web apps with React and Next.js — the interface, the API behind it, and everything in between.",
      },
    ],
    [
      { text: "Currently building " },
      {
        text: "Portalink",
        href: "https://portalink.cloud",
        logo: "/images/portalink-logo.png",
      },
      { text: " and " },
      {
        text: "Whip",
        href: "https://whip-app-697.netlify.app",
        logo: "/images/whip-logo.png",
        highlight: true,
      },
      { text: " on my own, and freelancing as a web developer since 2023." },
    ],
    [
      {
        text: "Most of what I know comes from shipping things and fixing what broke. I'm studying Information Systems at Universitas Terbuka, and I care about how a product holds together: clean data, predictable behavior, and an interface that stays out of the way.",
      },
    ],
  ],

  sections: {
    currentlyBuilding: "Currently building",
    experience: "Experience",
    projects: "Projects",
    stack: "Stack",
    education: "Education",
    github: "GitHub",
    contact: "Contact",
  },

  stack: {
    // Category names sit above lists of proper nouns. Nobody says "Node.js dan
    // Python" any more naturally than they say "Node.js and Python", so these
    // stay in English in both files.
    categories: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      cloud: "Cloud",
      ai: "AI",
    },
  },

  building: {
    status: "In active development",
    portalink:
      "Cloud storage aggregator. Google Drive, Dropbox, OneDrive, Mega, and more in one dashboard.",
    whip: "AI super agent for development work, similar in idea to Orca IDE.",
  },

  projects: {
    categories: {
      portalink: "Web app & cloud",
      whip: "AI tooling",
      soil: "Hardware & IoT",
    },
    descriptions: {
      portalink: "Cloud storage aggregator with all your accounts in one dashboard.",
      whip: "AI super agent for development work.",
      soil: "School project (Nov 2025). Designed the system, installed sensors, wrote the code, calibrated and tested it. 2nd place, district-level academic competition.",
    },
  },

  experience: {
    // Dates, durations and job types. The duration is the one place where a
    // literal reading changes the meaning, so it is spelled out rather than
    // abbreviated.
    type: "Freelance",
    period: "Jan 2023 — Present",
    duration: "3 yrs 9 mo",
    points: [
      "Build responsive websites and landing pages with HTML, CSS, JavaScript, React, and Next.js.",
      "Create reusable UI components using a mobile-first approach.",
      "Connect front ends to REST APIs and Firebase (authentication and data storage).",
      "Build and run my own products, Portalink and Whip.",
    ],
  },

  education: {
    degree: {
      terbuka: "Bachelor of Information Systems",
      sma: "Science Program (IPA)",
    },
    courses: {
      "terbuka-software": "Software Development",
      "terbuka-digital": "Digital Systems",
    },
    // Rendered as one string after the school name: "Universitas Terbuka ·
    // Bachelor of Information Systems · 2025 — Present".
    separator: "·",
  },

  company: {
    // Self-employed is the one place where the English phrasing does not carry
    // over. "Self-Employed (Indonesia)" becomes "Mandiri (Indonesia)".
    freelance: {
      name: "Self-Employed (Indonesia)",
      role: "Freelance Web Developer",
    },
  },

  github: {
    months: [
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
    ],
    activityLevel: "Sample activity level",
    contributions: "Sample activity — no live GitHub data",
    less: "Less",
    more: "More",
  },

  contact: {
    blurb:
      "Open to junior full-stack roles and freelance projects. The fastest way to reach me is email.",
    emailMe: "Email me",
    resume: "Resume",
  },

  dock: {
    quickLinks: "Quick links",
    home: "Home",
    playground: "Playground AI",
    benchmark: "Benchmark AI",
    usage: "Usage AI",
    recap: "Recap AI",
  },

  controls: {
    theme: "Toggle theme",
    soundOn: "Turn sound on",
    soundOff: "Mute sound",
    like: "Like",
  },

  notFound: {
    heading: "Page Not Found",
    body: "The page you are looking for does not exist or has been moved.",
    back: "Back to Home",
  },

  playground: {
    title: "Playground",
    description:
      "Type a name. It signs itself in black ink on white paper, then the same signature folds into a card. Each name draws its own hand, so two names never come out signed the same way.",
    nameLabel: "Name to sign",
    placeholder: "Type a name",
    download: "Download PNG",
    preparing: "Preparing...",
    downloaded: "Downloaded",
    failed: "Download failed",
    signAgain: "Sign again",
    yourCard: "Your card",
    signing: "Signing...",
    cardWaiting: "The card appears once a name has been signed.",
    hand: "hand",
    cardAlt: "Holographic card carrying the signature of",
    stageEmpty: "Type a name and it signs here.",
    stageLoading: "Loading the hand...",
    stageErrorTitle: "This browser cannot sign.",
    stageErrorBody:
      "The sheet is drawn with WebGL 2, which this browser does not provide. The card and the download both need it.",
    signatureAlt: "Signature of",
    signatureAltRest: ", black ink on white paper",
    sheetEmpty: "An empty sheet of paper waiting for a name",
  },

  benchmark: {
    title: "Benchmark AI",
    description:
      "Every model here is ranked on one published scale, so the bars are directly comparable. Two of them are models I built a demo against, marked in the chart.",
    source: "Source",
    readOn: "read",
    index: "Intelligence Index",
    scale: "scale 0 to",
    filterLabel: "Filter models",
    filterAll: "All",
    filterOpen: "Open weights",
    filterMine: "Your two",
    openWeights: "open weights",
    yourDemo: "your demo",
    yourDemos: "Your demos",
    openDemo: "Open demo",
    lines: "lines",
    size: "size",
    // The DeepSeek demo's title stays "Simulasi Air" in both languages. That is
    // the name it carries in its own markup, so translating the card but not
    // the file would leave the two disagreeing.
    demoTitles: {
      haiku: "Water Simulation",
      deepseek: "Simulasi Air",
    },
    // What each demo does, in the author's own terms from its own markup.
    features: {
      haiku: [
        "Vertex-displaced water plane with a custom fragment shader",
        "OrbitControls for drag to orbit and scroll to zoom",
        "Two presets, tropical and river, that set every parameter at once",
      ],
      deepseek: [
        "Gerstner wave sum evaluated per vertex",
        "Screen-space refraction through the wave normal",
        "Live vertex count and FPS readout",
        "Falls back with a written notice where WebGL2 is missing",
      ],
    },
  },

  usage: {
    contributions: "Contributions this year",
    activity: "Activity",
    rangeWeekly: "Weekly",
    rangeMonthly: "Monthly",
    rangeYearly: "Yearly",
    share: "Share",
    exporting: "Exporting",
    exportFailed: "Export failed. Try again.",
    agents: "Agents",
    runs: "runs",
    tokens: "Tokens",
    models: "Models",
    today: "Today",
    agentRunsAlt: "agent runs in",
    stats: {
      total: "Total requests",
      input: "Input tokens",
      cached: "Cached tokens",
      output: "Output tokens",
      cost: "Est. cost",
      costNote: "Estimated, not actual billing",
    },
    favoriteProvider: "Top favorite",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },

  recap: {
    title: "Benchmark Recap",
    subtitle:
      "Archive of 10 benchmark builds from /Documents/benchmark. Inspect project architectures, live web viewports, and verification matrices with interactive 3D folders.",
    introText:
      "Ten autonomous benchmarks. Procedural 3D worlds, real-time logistics digital twins, and cinematic web platforms, crafted with modern AI models.",
    nextIntro: "Next",
    ledgerDirectory: "Source directory",
    ledgerDirectoryVal: "/Documents/benchmark",
    ledgerScope: "Archive scope",
    ledgerScopeVal: "10 local projects · 20 web viewports",
    ledgerEngines: "Target engines",
    ledgerEnginesVal: "Three.js · WebGL2 · React · Next.js",
    searchPlaceholder: "Search project name, model, tech stack, or viewport...",
    filterCategory: "Category",
    filterAll: "All Projects",
    viewGrid: "3D Folders",
    viewTable: "Specification",
    inspect: "Inspect",
    livePreview: "Live Preview",
    close: "Close",
    folderHint: "Click folder to toggle · Drag preview viewports · Click to launch live application",
    folderOpenStatus: "Folder open",
    folderClosedStatus: "Folder closed",
    highlights: "Architecture Highlights",
    metrics: "Verified Metrics",
    techStack: "Tech Stack",
    documents: "Web Previews & Architecture",
    documentInspector: "Component & Viewport Inspector",
    documentCount: "viewports bundled",
    pathOnDisk: "Location on disk",
    verified: "Verified",
    production: "Production",
    experimental: "Experimental",
    noResults: "No benchmark projects match your search query.",
    clearSearch: "Clear filter",
    statsProjects: "Total Projects",
    statsVerified: "Verified Runs",
    statsDocs: "Audited Viewports",
    statsEngines: "Game & Web Engines",
    copyPath: "Copy path",
    copied: "Copied!",
  },
};

// Deliberately not `as const`. Narrowing every string to its own literal would
// make the Indonesian file impossible to satisfy, since the two languages cannot
// agree on every value. What matters is the shape: `Dictionary` below is this
// file's type, so a missing key in a translation is a build error and an extra
// key is rejected as unknown.
export type Dictionary = typeof en;