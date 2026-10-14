import type { Dictionary } from "./en";

// Bahasa Indonesia. Typed as Dictionary, so anything missing here fails the
// build rather than reaching the page as an English string under an Indonesian
// flag.
//
// The voice is "Anda". Someone reading a portfolio in Indonesian is being
// addressed as a visitor to a site, not as a client in a job interview, so the
// second person stays formal throughout.
//
// Translation notes worth keeping:
//  - "Open to work" is a status label beside a pulse dot. "Terbuka untuk peluang
//    kerja" runs long in that slot and wraps on a phone, so it is "Terbuka untuk
//    kerja".
//  - Model names, product names, and the phrase "Junior Full-Stack Developer" are
//    left in English. They are the words recruiters search for and the ones the
//    owner already uses; translating them would make the page find nobody.
//  - Numbers keep the English grouping so the two languages share one formatter.

export const id: Dictionary = {
  meta: {
    title: "I Wayan Radea — Junior Full-Stack Developer",
    description:
      "Pengembang full-stack junior dari Bali. Saya membangun aplikasi web dengan React dan Next.js, dan sedang mengerjakan produk saya sendiri, Portalink dan Whip.",
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
    // The toggle offers the language you would switch TO, so it reads as an
    // action rather than as the current state.
    switchTo: "English",
    switchAction: "Baca halaman ini dalam bahasa Inggris",
    current: "Bahasa Indonesia",
    // "Sekarang: Bahasa Indonesia" in the toggle's accessible name.
    now: "Sekarang:",
  },

  header: {
    titles: [
      "Junior Full-Stack Developer",
      "Spesialis React & Next.js",
      "Pembuat Produk (Portalink · Whip)",
      "Pengembang AI Agent & LLM",
      "Web Developer Freelance",
    ],
    verified: "Terverifikasi",
  },

  social: {
    followMe: "ikuti saya",
  },

  info: {
    localTime: "WITA waktu setempat",
  },

  status: {
    openToWork: "Terbuka untuk kerja",
  },

  tagline: "Membangun aplikasi web dari ide sampai jadi.",

  story:
    "Pengembang full-stack junior yang membangun aplikasi web dengan React dan Next.js. Saya mengerjakan produk saya sendiri, Portalink dan Whip, dan menerima proyek web freelance. Saya membangun antarmuka responsif dengan pendekatan mobile-first, lalu menyambungkannya ke REST API dan Firebase.",

  intro: [
    [
      {
        text: "Saya membangun aplikasi web dengan React dan Next.js — dari antarmukanya, API di belakangnya, sampai bagian di antaranya.",
      },
    ],
    [
      { text: "Saat ini saya membangun " },
      {
        text: "Portalink",
        href: "https://portalink.cloud",
        logo: "/images/portalink-logo.png",
      },
      { text: " dan " },
      {
        text: "Whip",
        href: "https://whip-app-697.netlify.app",
        logo: "/images/whip-logo.png",
        highlight: true,
      },
      { text: " secara mandiri, dan bekerja sebagai freelance web developer sejak 2023." },
    ],
    [
      {
        text: "Sebagian besar yang saya tahu berasal dari mengerjakan aplikasi dan memperbaiki yang rusak. Saya kuliah Sistem Informasi di Universitas Terbuka, dan saya peduli pada bagaimana sebuah produk tetap utuh: data yang bersih, perilaku yang bisa diperkirakan, dan antarmuka yang tidak menyulitkan.",
      },
    ],
  ],

  sections: {
    currentlyBuilding: "Sedang Dibangun",
    experience: "Pengalaman",
    projects: "Proyek",
    stack: "Teknologi",
    education: "Pendidikan",
    github: "GitHub",
    contact: "Kontak",
  },

  stack: {
    // Left in English. The items under each heading are proper nouns, and
    // "Node.js dan Python" is not how anyone writes that sentence, so neither
    // side translates the category name either.
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
    status: "Sedang dikembangkan",
    portalink:
      "Agregator penyimpanan cloud. Google Drive, Dropbox, OneDrive, Mega, dan lainnya dalam satu dasbor.",
    whip: "Super agent AI untuk pekerjaan pengembangan, mirip ide dengan Orca IDE.",
  },

  projects: {
    categories: {
      portalink: "Aplikasi web dan cloud",
      whip: "Perkakas AI",
      soil: "Hardware dan IoT",
    },
    descriptions: {
      portalink: "Agregator penyimpanan cloud dengan semua akun Anda dalam satu dasbor.",
      whip: "Super agent AI untuk pekerjaan pengembangan.",
      soil: "Proyek sekolah (Nov 2025). Merancang sistem, memasang sensor, menulis kodenya, lalu mengkalibrasi dan mengujinya. Juara 2 tingkat kabupaten.",
    },
  },

  experience: {
    // Dates, durations, and job types. The duration is the one place where a
    // literal reading changes the meaning, so it is spelled out rather than
    // abbreviated.
    type: "Freelance",
    period: "Jan 2023 — Sekarang",
    duration: "3 thn 9 bln",
    points: [
      "Membangun website responsif dan landing page dengan HTML, CSS, JavaScript, React, dan Next.js.",
      "Membuat komponen UI yang bisa dipakai ulang dengan pendekatan mobile-first.",
      "Menyambungkan front end ke REST API dan Firebase (autentikasi dan penyimpanan data).",
      "Membangun dan menjalankan produk saya sendiri, Portalink dan Whip.",
    ],
  },

  education: {
    degree: {
      terbuka: "Sarjana Sistem Informasi",
      sma: "Program Ilmu Pengetahuan Alam (IPA)",
    },
    courses: {
      "terbuka-software": "Pengembangan Perangkat Lunak",
      "terbuka-digital": "Sistem Digital",
    },
    separator: "·",
  },

  company: {
    freelance: {
      name: "Mandiri (Indonesia)",
      role: "Freelance Web Developer",
    },
  },

  github: {
    months: [
      "Okt",
      "Nov",
      "Des",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
    ],
    activityLevel: "Tingkat aktivitas contoh",
    contributions: "Aktivitas contoh — bukan data GitHub langsung",
    less: "Lebih sedikit",
    more: "Lebih banyak",
  },

  contact: {
    blurb:
      "Terbuka untuk posisi full-stack junior dan proyek freelance. Cara tercepat menghubungi saya adalah email.",
    emailMe: "Kirim email",
    resume: "CV",
  },

  dock: {
    quickLinks: "Tautan cepat",
    home: "Beranda",
    playground: "Playground AI",
    benchmark: "Benchmark AI",
    usage: "Usage AI",
    recap: "Recap AI",
  },

  controls: {
    theme: "Ganti tema",
    soundOn: "Nyalakan suara",
    soundOff: "Matikan suara",
    like: "Suka",
  },

  notFound: {
    heading: "Halaman Tidak Ditemukan",
    body: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    back: "Kembali ke Beranda",
  },

  playground: {
    title: "Playground",
    description:
      "Ketik sebuah nama. Ia menandatangani dirinya dengan tinta hitam di kertas putih, lalu tanda tangan yang sama terlipat menjadi kartu. Setiap nama menggambar tangannya sendiri, jadi dua nama tidak pernah keluar dengan tanda tangan yang sama.",
    nameLabel: "Nama yang ditandatangani",
    placeholder: "Ketik nama",
    download: "Unduh PNG",
    preparing: "Menyiapkan...",
    downloaded: "Terunduh",
    failed: "Gagal mengunduh",
    signAgain: "Tandatangani lagi",
    yourCard: "Kartu Anda",
    signing: "Menandatangani...",
    cardWaiting: "Kartu muncul setelah sebuah nama ditandatangani.",
    hand: "tangan",
    cardAlt: "Kartu holografis memuat tanda tangan milik",
    stageEmpty: "Ketik nama dan ia akan menandatangani di sini.",
    stageLoading: "Memuat tangan...",
    stageErrorTitle: "Browser ini tidak bisa menandatangani.",
    stageErrorBody:
      "Kertas digambar dengan WebGL 2, yang tidak tersedia di browser ini. Kartu dan unduhan keduanya membutuhkannya.",
    signatureAlt: "Tanda tangan dari",
    signatureAltRest: ", tinta hitam di kertas putih",
    sheetEmpty: "Selembar kertas kosong yang menunggu nama",
  },

  benchmark: {
    title: "Benchmark AI",
    description:
      "Setiap model di sini diurutkan pada satu skala terpublikasi, sehingga batang-batang di grafiknya bisa dibandingkan langsung. Dua di antaranya adalah model yang saya jadikan dasar demo, ditandai di grafik.",
    source: "Sumber",
    readOn: "dibaca",
    index: "Intelligence Index",
    scale: "skala 0 sampai",
    filterLabel: "Saring model",
    filterAll: "Semua",
    filterOpen: "Bobot terbuka",
    filterMine: "Dua milik saya",
    openWeights: "bobot terbuka",
    yourDemo: "demo saya",
    yourDemos: "Demo Anda",
    openDemo: "Buka demo",
    lines: "baris",
    size: "ukuran",
    demoTitles: {
      haiku: "Water Simulation",
      deepseek: "Simulasi Air",
    },
    features: {
      haiku: [
        "Permukaan air yang simpulnya digeser shader fragmen khusus",
        "OrbitControls untuk menyeret memutar dan menggulir untuk memperbesar",
        "Dua setelan awal, tropis dan sungai, yang sekaligus mengatur semua parameter",
      ],
      deepseek: [
        "Penjumlahan gelombang Gerstner yang dihitung di setiap simpul",
        "Pembiasan ruang layar melalui normal gelombang",
        "Pembacaan jumlah simpul dan FPS secara langsung",
        "Menampilkan pemberitahuan tertulis bila WebGL2 tidak tersedia",
      ],
    },
  },

  usage: {
    contributions: "Kontribusi tahun ini",
    activity: "Aktivitas",
    rangeWeekly: "Mingguan",
    rangeMonthly: "Bulanan",
    rangeYearly: "Tahunan",
    share: "Bagikan",
    exporting: "Mengekspor",
    exportFailed: "Ekspor gagal. Coba lagi.",
    agents: "Agent",
    runs: "run",
    tokens: "Token",
    models: "Model",
    today: "Hari ini",
    agentRunsAlt: "run agent pada",
    stats: {
      total: "Total permintaan",
      input: "Token input",
      cached: "Token tersimpan",
      output: "Token output",
      cost: "Estimasi biaya",
      costNote: "Estimasi, bukan tagihan sebenarnya",
    },
    favoriteProvider: "Paling sering dipakai",
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    previousMonth: "Bulan sebelumnya",
    nextMonth: "Bulan berikutnya",
  },

  recap: {
    title: "Rekap Benchmark",
    subtitle:
      "Inventaris 10 proyek benchmark dari /Documents/benchmark. Telusuri arsitektur sistem, viewport web interaktif, dan matriks validasi melalui folder 3D interaktif.",
    introText:
      "Sepuluh benchmark otonom. Dunia 3D prosedural, digital twin logistik real-time, dan platform web sinematik yang dibangun dengan model AI mutakhir.",
    nextIntro: "Lanjut",
    ledgerDirectory: "Direktori sumber",
    ledgerDirectoryVal: "/Documents/benchmark",
    ledgerScope: "Cakupan arsip",
    ledgerScopeVal: "10 proyek lokal · 20 viewport web",
    ledgerEngines: "Engine target",
    ledgerEnginesVal: "Three.js · WebGL2 · React · Next.js",
    searchPlaceholder: "Cari nama proyek, model, teknologi, atau viewport...",
    filterCategory: "Kategori",
    filterAll: "Semua Proyek",
    viewGrid: "Folder 3D",
    viewTable: "Spesifikasi",
    inspect: "Inspeksi",
    livePreview: "Buka Preview",
    close: "Tutup",
    folderHint: "Klik folder untuk melipat · Geser viewport preview · Klik untuk membuka aplikasi langsung",
    folderOpenStatus: "Folder terbuka",
    folderClosedStatus: "Folder tertutup",
    highlights: "Sorotan Arsitektur",
    metrics: "Metrik Terverifikasi",
    techStack: "Tech Stack",
    documents: "Preview Web & Arsitektur",
    documentInspector: "Inspektor Komponen & Viewport",
    documentCount: "viewport terlampir",
    pathOnDisk: "Lokasi di penyimpanan",
    verified: "Terverifikasi",
    production: "Produksi",
    experimental: "Eksperimental",
    noResults: "Tidak ada proyek benchmark yang cocok dengan pencarian Anda.",
    clearSearch: "Bersihkan filter",
    statsProjects: "Total Proyek",
    statsVerified: "Uji Lolos",
    statsDocs: "Viewport Terverifikasi",
    statsEngines: "Engine Game & Web",
    copyPath: "Salin path",
    copied: "Tersalin!",
  },
};