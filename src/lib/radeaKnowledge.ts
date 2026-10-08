// Knowledge base strictly derived from I Wayan Radea's CV and Portfolio

export const RADEA_KNOWLEDGE = {
  name: "I Wayan Radea",
  title: "Junior Full-Stack Developer",
  location: "Pujungan, Tabanan, Bali, Indonesia",
  email: "radzfoundation@gmail.com",
  phone: "+62 851-5503-1983",
  website: "https://radzzz.my.id",
  linkedin: "https://linkedin.com/in/wayan-radea-82ab63386",
  status: "Open to work (junior full-stack roles and freelance projects)",
  summary:
    "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm actively building my own products, Portalink and Whip, as well as taking freelance web development projects.",
  experience: [
    {
      role: "Freelance Web Developer",
      company: "Self-Employed (Indonesia)",
      period: "Jan 2023 — Present",
      points: [
        "Build responsive websites and landing pages with HTML, CSS, JavaScript, React, and Next.js.",
        "Create reusable UI components using a mobile-first approach.",
        "Connect front ends to REST APIs and Firebase (authentication and data storage).",
        "Build and run my own products, Portalink and Whip.",
      ],
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "REST API", "Firebase"],
    },
  ],
  projects: [
    {
      name: "Portalink",
      link: "https://portalink.cloud",
      period: "2026 — Present",
      description:
        "Cloud storage aggregator that puts Google Drive, Dropbox, OneDrive, Mega, and other accounts in one unified dashboard. Lets users browse files across providers, move files between clouds, and keep folders in sync automatically.",
      tech: ["React", "Next.js", "Cloud APIs"],
    },
    {
      name: "Whip",
      link: "https://whip-app-697.netlify.app",
      period: "2026 — Present",
      description:
        "AI super agent for development work in macOS, multi-pane terminal environment with on-device voice dictation and local-first workflow, similar in idea to Orca IDE.",
      tech: ["AI Agents", "React", "Next.js"],
    },
    {
      name: "Soil Moisture Monitoring System",
      period: "Nov 2025",
      description:
        "Solo school project building a soil moisture monitoring device covering system design, sensor wiring, code, calibration, and testing. Placed 2nd at the regency-level academic competition (Juara 2 Tingkat Kabupaten).",
    },
  ],
  education: [
    {
      institution: "Universitas Terbuka",
      degree: "Bachelor of Information Systems (S1 Sistem Informasi)",
      period: "2025 — Present",
      details: "Active student focusing on software development and digital systems.",
    },
    {
      institution: "SMA Negeri 1 Pupuan, Bali",
      degree: "Science Program (IPA)",
      period: "Jul 2022 — Apr 2025",
    },
  ],
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Astro", "Tailwind CSS"],
    backend: ["Next.js (API routes, server actions)", "Node.js", "FastAPI", "Laravel", "REST API", "MySQL", "Supabase", "Firebase", "Authentication"],
    tools: ["Git", "GitHub", "Linux (Arch)", "CLI", "Claude Code", "Codex", "Hermes Agent"],
    ai: ["LLM API integration", "AI agent development", "Local LLMs with Ollama", "AI-assisted development (Claude Code, Codex)"],
  },
};

export function answerRadeaQuery(query: string): string {
  const q = query.trim().toLowerCase();

  // Greeting
  if (/^(hai|halo|hello|hi|hey|p|assalamu|selamat)/i.test(q)) {
    return "Halo! Saya asisten AI I Wayan Radea. Anda bisa menanyakan keahlian, pengalaman kerja, proyek (Portalink, Whip), pendidikan, atau kontak Radea. Apa yang ingin Anda ketahui?";
  }

  // Identity / Who is Radea / Summary
  if (
    q.includes("siapa") ||
    q.includes("tentang") ||
    q.includes("profil") ||
    q.includes("who is") ||
    q.includes("about") ||
    q.includes("introduce") ||
    q.includes("bio")
  ) {
    return "I Wayan Radea adalah Junior Full-Stack Developer asal Bali, Indonesia. Radea berfokus membangun aplikasi web modern dengan React dan Next.js, serta sedang mengembangkan produknya sendiri yaitu Portalink dan Whip di samping mengerjakan proyek freelance.";
  }

  // Projects
  if (q.includes("portalink")) {
    return "Portalink (https://portalink.cloud) adalah agregator penyimpanan cloud buatan Radea yang menyatukan Google Drive, Dropbox, OneDrive, Mega, dan akun cloud lainnya dalam satu dashboard. Pengguna dapat menjelajahi file lintas provider, memindahkan file antar-cloud, dan menyinkronkan folder secara otomatis.";
  }

  if (q.includes("whip")) {
    return "Whip (https://whip-app-697.netlify.app) adalah AI super agent untuk kebutuhan development di macOS dengan konsep workspace multi-pane terminal, on-device voice dictation, dan arsitektur local-first (serupa dengan ide Orca IDE).";
  }

  if (q.includes("soil") || q.includes("tanah") || q.includes("lomba") || q.includes("juara")) {
    return "Soil Moisture Monitoring System adalah proyek mandiri Radea semasa sekolah (Nov 2025) yang mencakup perancangan sistem, perakitan sensor, koding, kalibrasi, dan pengujian. Proyek ini meraih Juara 2 di kompetisi akademik tingkat Kabupaten.";
  }

  if (q.includes("project") || q.includes("proyek") || q.includes("karya") || q.includes("portofolio") || q.includes("bikin apa")) {
    return "Proyek utama Radea meliputi:\n1. Portalink (https://portalink.cloud) — Cloud storage aggregator (Google Drive, Dropbox, OneDrive, Mega) dalam 1 dashboard.\n2. Whip — AI super agent untuk developer di macOS.\n3. Soil Moisture Monitoring System — Perangkat pemantau kelembapan tanah (Juara 2 Tingkat Kabupaten).";
  }

  // Skills & Tech Stack
  if (
    q.includes("skill") ||
    q.includes("keahlian") ||
    q.includes("stack") ||
    q.includes("teknologi") ||
    q.includes("bisa apa") ||
    q.includes("bahasa") ||
    q.includes("frontend") ||
    q.includes("backend") ||
    q.includes("framework")
  ) {
    return "Keahlian teknis Radea meliputi:\n• Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Astro.\n• Backend & Database: Node.js, Next.js API Routes/Server Actions, FastAPI, Laravel, REST API, Firebase, Supabase, MySQL.\n• AI: AI agent development, integrasi LLM API, local LLMs dengan Ollama.\n• Tools: Git, GitHub, Linux (Arch), CLI, Claude Code.";
  }

  // Experience & Freelance
  if (
    q.includes("pengalaman") ||
    q.includes("experience") ||
    q.includes("kerja") ||
    q.includes("freelance") ||
    q.includes("karir") ||
    q.includes("kantor")
  ) {
    return "Radea berpengalaman sebagai Freelance Web Developer (Self-Employed) sejak Jan 2023 hingga saat ini. Radea membangun website & landing page responsif dengan React/Next.js, membuat komponen UI reusable mobile-first, mengintegrasikan frontend dengan REST API & Firebase, serta membangun produknya sendiri (Portalink & Whip).";
  }

  // Education
  if (
    q.includes("pendidikan") ||
    q.includes("education") ||
    q.includes("kuliah") ||
    q.includes("sekolah") ||
    q.includes("kampus") ||
    q.includes("universitas") ||
    q.includes("ut") ||
    q.includes("sma")
  ) {
    return "Pendidikan Radea:\n1. Universitas Terbuka — S1 Sistem Informasi (Bachelor of Information Systems), 2025 — Sekarang (fokus pada rekayasa perangkat lunak dan sistem digital).\n2. SMA Negeri 1 Pupuan, Bali — Jurusan MIPA/Science Program (2022 — 2025).";
  }

  // Contact / Hire / Email / Location
  if (
    q.includes("kontak") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hubungi") ||
    q.includes("hire") ||
    q.includes("lokasi") ||
    q.includes("tinggal") ||
    q.includes("domisili") ||
    q.includes("linkedin") ||
    q.includes("resume") ||
    q.includes("cv")
  ) {
    return "Radea berdomisili di Bali, Indonesia, dan saat ini terbuka untuk tawaran junior full-stack roles maupun proyek freelance.\n• Email: radzfoundation@gmail.com\n• LinkedIn: https://linkedin.com/in/wayan-radea-82ab63386\n• Website: https://radzzz.my.id\n• Resume PDF dapat diunduh langsung di tombol Resume pada website ini.";
  }

  // Fallback strictly for questions outside CV
  return "Maaf, saya hanya dapat menjawab pertanyaan seputar profil, keahlian teknis, pengalaman, proyek, dan pendidikan I Wayan Radea sesuai CV. Untuk pertanyaan di luar topik ini atau diskusi kerja sama, silakan tanyakan langsung ke email: radzfoundation@gmail.com.";
}
