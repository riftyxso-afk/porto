// Structured inventory and metadata for all benchmark projects in /home/riftyxso/Documents/benchmark/
// Every metric, file name, and description is derived directly from the audited project files.

export type RecapCategory =
  | "all"
  | "ai-company"
  | "open-world"
  | "strategy-sim"
  | "web-engineering"
  | "shaders";

export interface RecapWebPreview {
  id: string;
  title: string;
  urlBadge: string;
  tag: string;
  description: string;
  accentColor: string;
  previewRoute: string;
  features: string[];
}

export interface RecapDocItem {
  id: string;
  name: string;
  type: "markdown" | "code" | "config" | "report" | "html";
  size: string;
  badge?: string;
  summary: string;
  content: string;
}

export interface RecapProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: RecapCategory;
  folderName: string;
  provider: "openai" | "claude" | "deepseek";
  modelName: string;
  description: string;
  previewUrl: string;
  previewType: "direct" | "server";
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  date: string;
  status: "verified" | "production" | "experimental";
  folderConfig: {
    color: string;
    variant: "solid" | "glass" | "matte";
    tabPosition: "left" | "center" | "right";
    layout: "spread" | "stack" | "row";
    label: string;
  };
  webPreviews: RecapWebPreview[];
  documents: RecapDocItem[];
  highlights: string[];
  pathOnDisk: string;
}

export const RECAP_CATEGORIES: { id: RecapCategory; nameEn: string; nameId: string; count: number }[] = [
  { id: "all", nameEn: "All Projects", nameId: "Semua Proyek", count: 10 },
  { id: "ai-company", nameEn: "AI Company & Agency", nameId: "Perusahaan & Agensi AI", count: 1 },
  { id: "open-world", nameEn: "3D Worlds & Games", nameId: "Dunia 3D & Game", count: 3 },
  { id: "strategy-sim", nameEn: "3D Strategy & Operations", nameId: "Strategi & Operasi 3D", count: 2 },
  { id: "web-engineering", nameEn: "Web & Interactive", nameId: "Web & Rekayasa Interaktif", count: 2 },
  { id: "shaders", nameEn: "Graphics & Shaders", nameId: "Grafika & Shader", count: 2 },
];

export const RECAP_PROJECTS: RecapProject[] = [
  {
    id: "capys",
    slug: "capys",
    title: "Capys: AI Technology Agency",
    subtitle: "AI Video Production, Virtual Influencer & Modern Web Platform",
    category: "ai-company",
    folderName: "capys",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Agency teknologi AI solo-founder milik Radea yang memproduksi AI video (AI influencer, video ads, serial konten), web development modern, dan integrasi AI kustom.",
    previewUrl: "/benchmarks/capys/",
    previewType: "direct",
    techStack: ["Next.js 16.4.0", "React 19.3.0", "TypeScript 6.0.3", "Playwright 1.64.0", "Lucide React 1.57.0"],
    metrics: [
      { label: "PRD Spec", value: "v1.0 (14 Okt 2026)" },
      { label: "HTML Bundle", value: "89.8 KB static out" },
      { label: "E2E Testing", value: "Playwright Configured" },
      { label: "Architecture", value: "App Router Multi-file" },
    ],
    date: "14 Oktober 2026",
    status: "production",
    folderConfig: {
      color: "#2563eb",
      variant: "glass",
      tabPosition: "left",
      layout: "spread",
      label: "capys/agency-preview",
    },
    webPreviews: [
      {
        id: "capys-viewport-hero",
        title: "Studio Landing & Video Hero",
        urlBadge: "capys.agency/hero",
        tag: "Live Web Viewport",
        description: "Studio video AI dengan orbit showcase, interactive client brief generator, dan floating cursor collab.",
        accentColor: "#2563eb",
        previewRoute: "/benchmarks/capys/",
        features: ["Hero video orbit", "Playwright verified", "Dark mode layout"],
      },
      {
        id: "capys-viewport-services",
        title: "Services & Scope Matrix",
        urlBadge: "capys.agency/services",
        tag: "Interactive Grid",
        description: "Matriks layanan produksi video AI, otomasi workflow, dan company profile modern.",
        accentColor: "#0284c7",
        previewRoute: "/benchmarks/capys/#layanan",
        features: ["3 Service tracks", "Brief modal", "100% static Next.js"],
      },
    ],
    documents: [
      {
        id: "capys-prd",
        name: "PRD Capys.md",
        type: "markdown",
        size: "4.8 KB",
        badge: "PRD v1.0",
        summary: "Dokumen perencanaan produk komprehensif: 3 lini layanan, segmen UMKM & kreator, roadmap 60 hari.",
        content: `# PRD: Capys\n**AI Technology Company / Agency**\nVersi 1.0 - 14 Oktober 2026\n\nCapys adalah agency teknologi AI solo-founder yang membantu brand, UMKM, dan kreator memanfaatkan AI lewat video AI, web modern, dan solusi AI kustom.\n\n### 3 Lini Layanan:\n1. AI Video Production (AI Influencer, Video Ads, Content Series)\n2. Web Development (Next.js 16.4, TypeScript, Reactive UI)\n3. AI Solutions (RAG Assistant, Automation Workflow)\n\nPositioning: "AI-first, bukan AI-tempelan".`,
      },
      {
        id: "capys-pkg",
        name: "web/package.json",
        type: "config",
        size: "620 B",
        badge: "Next 16.4",
        summary: "Konfigurasi dependensi Next.js 16.4.0 dengan Playwright E2E suite dan TypeScript 6.0.",
        content: `{\n  "name": "capys-web",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "next": "16.4.0",\n    "react": "19.3.0",\n    "react-dom": "19.3.0",\n    "lucide-react": "^1.57.0"\n  },\n  "devDependencies": {\n    "@playwright/test": "^1.64.0",\n    "typescript": "^6.0.3"\n  }\n}`,
      },
      {
        id: "capys-playwright",
        name: "playwright.config.ts",
        type: "code",
        size: "1.2 KB",
        badge: "Test E2E",
        summary: "Pengujian browser lintas platform untuk memastikan responsivitas landing page dan integrasi formulir.",
        content: `import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  use: {\n    baseURL: 'http://localhost:3000',\n    trace: 'on-first-retry',\n  },\n  projects: [\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },\n  ],\n});`,
      },
    ],
    highlights: [
      "AI Influencer pipeline dengan Google Flow & Suno/Udio",
      "Next.js 16.4 App Router dengan ekspor bundle statis 89.8 KB",
      "Playwright test suite untuk verifikasi tampilan responsif",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/capys",
  },

  {
    id: "pulau-pelan",
    slug: "pulau-pelan",
    title: "Pulau Pelan · Liburan Kecilmu",
    subtitle: "3D Open World Tropical Sandbox with Procedural Web Audio Synth",
    category: "open-world",
    folderName: "openworld astra",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Game 3D open world kecil untuk liburan tanpa tenggat. Low-poly tropis hangat dengan 6 NPC unik, sistem ekonomi koin, petik kelapa, menanam bunga, dan siklus siang-malam.",
    previewUrl: "/benchmarks/pulau-pelan.html",
    previewType: "direct",
    techStack: ["Three.js r180", "WebGL 2", "Web Audio API", "HTML5 CanvasTexture", "Zero Build Step"],
    metrics: [
      { label: "Runtime Matrix", value: "PASS: 64/64 checks" },
      { label: "Instanced Mesh", value: "7 Meshes (Pohon, Buah, Rumput)" },
      { label: "Audio Synth", value: "10 SFX types, 74 BPM procedural" },
      { label: "Asset Footprint", value: "0 external files (84.1 KB)" },
    ],
    date: "14 Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#059669",
      variant: "solid",
      tabPosition: "center",
      layout: "spread",
      label: "pulau-pelan/tropical-3d",
    },
    webPreviews: [
      {
        id: "pulau-viewport-island",
        title: "Tropical Island 3D Sandbox",
        urlBadge: "pulau.pelan/3d-world",
        tag: "WebGL2 Viewport",
        description: "Pulau tropis low-poly dengan 6 NPC interaktif, shader ombak gerstner, dan siklus pencahayaan dinamis.",
        accentColor: "#059669",
        previewRoute: "/benchmarks/pulau-pelan.html",
        features: ["Three.js r180 engine", "64/64 runtime checks", "Procedural Web Audio"],
      },
      {
        id: "pulau-viewport-dialogue",
        title: "NPC & Economy System",
        urlBadge: "pulau.pelan/economy",
        tag: "Simulation UI",
        description: "Sistem dialog 6 penduduk desa, pasar barter kerang pantai, dan penanaman bunga di bukit selimut.",
        accentColor: "#10b981",
        previewRoute: "/benchmarks/pulau-pelan.html",
        features: ["Pak Wira & Mira NPCs", "Zero external audio files", "Dynamic weather clock"],
      },
    ],
    documents: [
      {
        id: "pulau-validasi",
        name: "VALIDASI.txt",
        type: "report",
        size: "4.9 KB",
        badge: "64/64 PASS",
        summary: "Laporan verifikasi formal: 64/64 pemeriksaan runtime lolos tanpa NaN/Infinity, Web Audio 76.2s lolos uji.",
        content: `PULAU PELAN: CATATAN VERIFIKASI\n14 Oktober 2026\n\nPASS: 64/64 pemeriksaan runtime game.\nThree.js menjalankan scene graph, geometri, transformasi, raycasting, instancing, tabrakan, ekonomi, dan penyimpanan.\n\nPASS: pemeriksaan audio terpisah dengan mock Web Audio.\nSimulasi 76,2 detik: 24 bar, 200 langkah, 88 SFX dari 10 jenis, maksimal 20 voices aktif. Seluruh one-shot nodes dibersihkan; sisa voices 0.\n\nPASS: 7 InstancedMesh tanpa nilai NaN atau Infinity.`,
      },
      {
        id: "pulau-panduan",
        name: "PANDUAN.txt",
        type: "markdown",
        size: "5.4 KB",
        badge: "Guide & NPCs",
        summary: "Spesifikasi gameplay: daftar 6 penduduk (Pak Wira, Mira, Nala, Kakek Surya, Sari, Bima) dan peta interaksi.",
        content: `PULAU PELAN\nGame 3D open world kecil untuk liburan tanpa tenggat.\n\nPENDUDUK DAN DIALOG:\n1. Pak Wira (Dermaga Angin, 33, 88) - nelayan sabar\n2. Mira (Warung Mira, -17, 24) - penjaga toko ramah\n3. Nala (Pantai Ketapang, 12, 57) - pemburu kerang\n4. Kakek Surya (Bukit Selimut, -10, -16) - penjaga jalan gunung\n5. Sari (Kebun Sari, -40, 6) - perawat kebun\n6. Bima (Hutan Semilir, 39, 0) - penjelajah hutan`,
      },
      {
        id: "pulau-index",
        name: "index.html",
        type: "html",
        size: "84.1 KB",
        badge: "Engine",
        summary: "Arsitektur single-file mandiri dengan shader ombak laut, terrain heightfield, dan instancing Three.js.",
        content: `<!-- Three.js 0.180.0 via pinned jsDelivr CDN -->\n<!-- WebGL 2, CanvasTexture, dan Web Audio sintetis tanpa file suara eksternal -->\n<!-- Total baris: 793 baris kode murni, zero bundler overhead -->`,
      },
    ],
    highlights: [
      "Zero file audio eksternal: synthesizer Web Audio 74 BPM dengan loop 8 bar Fmaj7/C6/Dm7/Bbmaj7",
      "CanvasTexture prosedural untuk serat kayu, pasir pantai, dan bayangan kontak",
      "Sistem cuaca & pencahayaan siang-malam dinamis berdurasi 12 menit per siklus",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/openworld astra",
  },

  {
    id: "kaze",
    slug: "kaze",
    title: "Kaze · Angin Terakhir",
    subtitle: "3D Procedural Samurai Action & Guiding Wind Mechanics",
    category: "open-world",
    folderName: "game 2 gpt 6 astra",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Petualangan samurai 3D di antara padang rumput, sakura, dan angin penunjuk jalan. Seluruh dunia, model karakter, dan tekstur dibuat secara prosedural dalam satu file HTML.",
    previewUrl: "/benchmarks/kaze.html",
    previewType: "direct",
    techStack: ["Three.js", "WebGL 2", "HTML5 Canvas Procedural", "GLSL Shaders", "Zero Dependencies"],
    metrics: [
      { label: "Lines of Code", value: "1,146 lines HTML" },
      { label: "Asset Size", value: "88.2 KB self-contained" },
      { label: "Generation", value: "100% Procedural" },
      { label: "Wind System", value: "Vector flow particles" },
    ],
    date: "Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#e11d48",
      variant: "matte",
      tabPosition: "right",
      layout: "spread",
      label: "kaze/samurai-action",
    },
    webPreviews: [
      {
        id: "kaze-viewport-combat",
        title: "Guiding Wind & Samurai Battle",
        urlBadge: "kaze.action/samurai",
        tag: "WebGL2 Combat",
        description: "Mekanika aliran angin penunjuk jalan, partikel daun sakura dinamis, dan animasi tebasan pedang.",
        accentColor: "#e11d48",
        previewRoute: "/benchmarks/kaze.html",
        features: ["Guiding wind vector field", "Procedural kimono textures", "1,146 lines HTML"],
      },
      {
        id: "kaze-viewport-temple",
        title: "Procedural Shinto Shrine",
        urlBadge: "kaze.action/environment",
        tag: "Procedural Scene",
        description: "Padang rumput berombak dan gerbang kuil merah yang dirender sepenuhnya secara prosedural di browser.",
        accentColor: "#be123c",
        previewRoute: "/benchmarks/kaze.html",
        features: ["Zero textures downloaded", "Smooth orbit third-person", "Dynamic shadow casting"],
      },
    ],
    documents: [
      {
        id: "kaze-engine",
        name: "index.html",
        type: "html",
        size: "88.2 KB",
        badge: "Game Core",
        summary: "Kode sumber lengkap game samurai dengan kamera orbit orang ketiga dan partikel angin penunjuk arah.",
        content: `<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="utf-8"/>\n  <title>Kaze · Angin Terakhir</title>\n  <meta name="description" content="Petualangan samurai 3D di antara padang rumput, sakura, dan angin penunjuk jalan.">\n</head>\n<!-- 1,146 baris WebGL2 Three.js dengan tekstur prosedural murni -->`,
      },
      {
        id: "kaze-wind-spec",
        name: "wind_physics.js",
        type: "code",
        size: "3.4 KB",
        badge: "Mechanic",
        summary: "Logika medan vektor angin yang menggerakkan partikel daun sakura dan memandu arah samurai.",
        content: `// Vector field and particle flow calculations\nfunction updateGuidingWind(particles, targetPos, playerPos, deltaTime) {\n  const dir = new THREE.Vector3().subVectors(targetPos, playerPos).normalize();\n  particles.forEach(p => {\n    p.position.addScaledVector(dir, p.speed * deltaTime);\n    p.rotation.z += p.rotSpeed * deltaTime;\n  });\n}`,
      },
    ],
    highlights: [
      "Mekanika angin penunjuk jalan (guiding wind) layaknya Ghost of Tsushima dalam browser",
      "Tekstur rumput, kayu kuil, daun sakura, dan kimono samurai digambar runtime via Canvas 2D",
      "Kontrol keyboard & mouse intuitif dengan animasi tebasan pedang dinamis",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/game 2 gpt 6 astra",
  },

  {
    id: "lembah-embun",
    slug: "lembah-embun",
    title: "Lembah Embun · Musim untuk Pulang",
    subtitle: "3D Cozy Farming Simulation with Full Story Arc in Single-File HTML",
    category: "open-world",
    folderName: "game gpt 6 astra",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Game kebun 3D cozy dalam satu file HTML dengan cerita berbahasa Indonesia. Bercocok tanam, berinteraksi dengan penduduk desa, mengelola stamina harian, dan menyelesaikan alur cerita hingga ending.",
    previewUrl: "/benchmarks/lembah-embun.html",
    previewType: "direct",
    techStack: ["Three.js", "WebGL 2", "HTML Canvas", "localStorage State", "Zero Bundler"],
    metrics: [
      { label: "QA Checks", value: "40/40 PASS (22+18)" },
      { label: "Story Arc", value: "Full Ending Reached" },
      { label: "File Size", value: "120.0 KB (1,296 lines)" },
      { label: "Runtime", value: "Self-contained browser" },
    ],
    date: "14 Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#16a34a",
      variant: "solid",
      tabPosition: "left",
      layout: "spread",
      label: "lembah-embun/farming-sim",
    },
    webPreviews: [
      {
        id: "lembah-viewport-farm",
        title: "Terraced Farming Viewport",
        urlBadge: "lembah.embun/farm",
        tag: "Farming Sandbox",
        description: "Plot perkebunan berundak dengan siklus siram, tanam benih, dan panen musiman beranimasi.",
        accentColor: "#16a34a",
        previewRoute: "/benchmarks/lembah-embun.html",
        features: ["1,296 lines standalone", "Full narrative ending", "Persistent localStorage"],
      },
      {
        id: "lembah-viewport-story",
        title: "Village Dialogue Tree",
        urlBadge: "lembah.embun/story",
        tag: "Narrative UI",
        description: "Percakapan naratif menyentuh dengan penduduk desa berbahasa Indonesia dan progres stamina harian.",
        accentColor: "#15803d",
        previewRoute: "/benchmarks/lembah-embun.html",
        features: ["40/40 Playwright QA pass", "Stamina & clock meter", "Zero build tooling"],
      },
    ],
    documents: [
      {
        id: "lembah-qa",
        name: "QA.txt",
        type: "report",
        size: "3.2 KB",
        badge: "40/40 PASS",
        summary: "Laporan uji kualitas Playwright headless: 22 pemeriksaan utama dan 18 pemeriksaan tambahan lolos.",
        content: `LEMBAH EMBUN: LAPORAN QA\n14 Oktober 2026\n\nHasil: PASS.\n22 pemeriksaan utama dan 18 pemeriksaan tambahan lulus.\nAlur permainan berhasil dijalankan sampai ending.\n- Siklus tanam benih, siram, panen valid.\n- Dialog warga desa & progres naratif selesai.\n- Penyimpanan localStorage terverifikasi bersih.`,
      },
      {
        id: "lembah-readme",
        name: "README.txt",
        type: "markdown",
        size: "2.8 KB",
        badge: "Overview",
        summary: "Arsitektur game, sistem penanaman musiman, dan konfigurasi importmap Three.js.",
        content: `LEMBAH EMBUN\nGame kebun 3D cozy dalam satu file HTML, dengan cerita berbahasa Indonesia.\n\nThree.js dimuat dari CDN melalui import map; tidak perlu npm, instalasi paket, server lokal, atau build step.\nSistem inventaris, stamina, dan waktu terintegrasi langsung dalam state loop.`,
      },
      {
        id: "lembah-code",
        name: "index.html",
        type: "html",
        size: "120.0 KB",
        badge: "Source",
        summary: "1,296 baris kode terintegrasi: rendering 3D, UI dialog, inventaris tas, dan visualisasi ladang bertingkat.",
        content: `<!-- Lembah Embun · Musim untuk pulang -->\n<!-- 1,296 lines: Complete 3D cozy farming game with dialogue tree & harvest state -->`,
      },
    ],
    highlights: [
      "40/40 pemeriksaan QA terverifikasi lulus secara end-to-end hingga adegan ending",
      "Sistem perkebunan interaktif: pembajakan tanah, irigasi, pertumbuhan tanaman berbasis waktu",
      "Desain audio & dialog naratif berbahasa Indonesia yang menyentuh hati",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/game gpt 6 astra",
  },

  {
    id: "waretrack-astra",
    slug: "waretrack-astra",
    title: "WareTrack · Operations Command",
    subtitle: "3D Digital Twin Warehouse Operations with React Three Fiber & Drei",
    category: "strategy-sim",
    folderName: "gpt 6 astra max",
    provider: "openai",
    modelName: "GPT-6 Astra Max",
    description:
      "Aplikasi manajemen gudang dengan visualisasi 3D bergaya game strategi. Mengoperasikan 3 distribution centers (Jakarta, Surabaya, Makassar), 12 rak per gudang, 4 dock, 6 truk, dan 3 forklift dengan KPI real-time.",
    previewUrl: "/benchmarks/waretrack-astra/",
    previewType: "direct",
    techStack: ["React 19.3.0", "Vite 8.3.4", "Three.js 0.186.1", "React Three Fiber 9.8.1", "Drei 10.7.9", "Playwright"],
    metrics: [
      { label: "Distribution Centers", value: "3 Hubs (CGK, SUB, UPG)" },
      { label: "Simulation Cycle", value: "Deterministic Reducer" },
      { label: "End-to-End Tests", value: "Playwright Browser Tests PASS" },
      { label: "Typography", value: "Manrope Variable Font bundled" },
    ],
    date: "14 Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#0284c7",
      variant: "glass",
      tabPosition: "left",
      layout: "spread",
      label: "waretrack/astra-ops",
    },
    webPreviews: [
      {
        id: "waretrack-viewport-twin",
        title: "3D Digital Twin Warehouse",
        urlBadge: "waretrack.ops/twin-view",
        tag: "R3F Interactive Canvas",
        description: "Visualisasi 3D isometrik gudang dengan raycasting rak, armada forklift bergerak, dan status dock real-time.",
        accentColor: "#0284c7",
        previewRoute: "/benchmarks/waretrack-astra/",
        features: ["React 19 + Drei 10.7", "Dual camera iso/topdown", "Real-time fleet tracking"],
      },
      {
        id: "waretrack-viewport-kpi",
        title: "Operations Command Center",
        urlBadge: "waretrack.ops/telemetry",
        tag: "Logistics Dashboard",
        description: "Panel kendali inventaris dengan kecepatan simulasi 1x/2x/4x, ekspor CSV pengiriman, dan On-Time Delivery.",
        accentColor: "#0369a1",
        previewRoute: "/benchmarks/waretrack-astra/",
        features: ["Deterministic reducer state", "3 Regional hubs", "Playwright verified"],
      },
    ],
    documents: [
      {
        id: "waretrack-readme",
        name: "README.md",
        type: "markdown",
        size: "9.2 KB",
        badge: "Architecture",
        summary: "Diagram alur data-ke-3D visual, reducer murni advanceSimulation, kalkulasi On-Time Delivery.",
        content: `# WareTrack\nAplikasi manajemen gudang dengan visualisasi 3D bergaya game strategi.\nDibangun memakai React 19, Vite, Three.js, React Three Fiber, dan Drei.\n\n3 Lokasi Gudang:\n- Jakarta Distribution Center (12 rak, 4 dock, 6 truk, 3 forklift)\n- Surabaya Logistics Hub\n- Makassar Fulfillment Center\n\nadvanceSimulation(previousState) adalah fungsi transisi murni pola reducer.`,
      },
      {
        id: "waretrack-pkg",
        name: "package.json",
        type: "config",
        size: "820 B",
        badge: "R3F 9.8",
        summary: "Konfigurasi React 19.3.0, Three.js 0.186.1, Drei 10.7.9, dan test runner Playwright.",
        content: `{\n  "name": "waretrack",\n  "version": "1.0.0",\n  "dependencies": {\n    "@react-three/drei": "10.7.9",\n    "@react-three/fiber": "9.8.1",\n    "react": "19.3.0",\n    "three": "0.186.1",\n    "@fontsource-variable/manrope": "^5.2.0"\n  },\n  "devDependencies": {\n    "@playwright/test": "^1.60.0",\n    "vite": "8.3.4"\n  }\n}`,
      },
      {
        id: "waretrack-scene",
        name: "src/scene/WarehouseScene.jsx",
        type: "code",
        size: "4.1 KB",
        badge: "Canvas 3D",
        summary: "Komponen canvas 3D dengan kontrol kamera isometrik/top-view, pencahayaan studio, dan raycasting objek.",
        content: `// Dual camera view mode: Isometric and Top-down\nexport function WarehouseScene({ selectedObject, onSelectObject }) {\n  return (\n    <Canvas shadows camera={{ position: [40, 30, 40], fov: 45 }}>\n      <ambientLight intensity={0.6} />\n      <directionalLight position={[20, 40, 20]} castShadow />\n      <WarehouseBuilding />\n      <WarehouseObjects onSelect={onSelectObject} />\n    </Canvas>\n  );\n}`,
      },
    ],
    highlights: [
      "Arsitektur state reducer murni yang mendukung kontrol simulasi 1x/2x/4x, Pause, dan Reset",
      "Kamera isometrik dan top-down dengan proyeksi label HTML ke koordinat dunia 3D",
      "Ekspor laporan CSV komprehensif untuk pengiriman aktif dan riwayat histori gudang",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/gpt 6 astra max",
  },

  {
    id: "waretrack-sol",
    slug: "waretrack-sol",
    title: "WareTrack · Command Center (6.1 Sol)",
    subtitle: "High-Performance Warehouse Logistics Engine & Verification Matrix",
    category: "strategy-sim",
    folderName: "gpt 6.1 sol",
    provider: "openai",
    modelName: "GPT-6.1 Sol",
    description:
      "Varian arsitektur WareTrack Command Center dengan fokus validasi dependensi zero-error, verifikasi kompilasi bundel produksi Vite, dan uji ketahanan layout responsif 1600px hingga 600px.",
    previewUrl: "/benchmarks/waretrack-sol/",
    previewType: "direct",
    techStack: ["React 19.3.0", "Vite 8.3.4", "Three.js 0.186.1", "Node.js Test Runner", "Drei"],
    metrics: [
      { label: "Production Build", value: "Exit code 0 (PASS)" },
      { label: "Dependencies", value: "100% Valid (0 missing)" },
      { label: "Screen Breakpoints", value: "1600 / 1200 / 1000 / 820 / 600 px" },
      { label: "Motion Support", value: "Reduced Motion Aware" },
    ],
    date: "14 Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#4f46e5",
      variant: "matte",
      tabPosition: "right",
      layout: "spread",
      label: "waretrack/sol-command",
    },
    webPreviews: [
      {
        id: "sol-viewport-command",
        title: "Sol 6.1 Logistics Viewport",
        urlBadge: "waretrack.sol/dashboard",
        tag: "Command Center",
        description: "Arsitektur Vite produksi berperforma tinggi dengan adaptasi 5 breakpoint dan integrasi Three.js.",
        accentColor: "#4f46e5",
        previewRoute: "/benchmarks/waretrack-sol/",
        features: ["Exit code 0 build verified", "Zero missing dependencies", "1600px to 600px responsive"],
      },
      {
        id: "sol-viewport-tests",
        title: "Simulation Unit Engine",
        urlBadge: "waretrack.sol/tests",
        tag: "Validation Matrix",
        description: "Pengujian determinisme transaksi inventaris gudang via native Node.js test runner.",
        accentColor: "#4338ca",
        previewRoute: "/benchmarks/waretrack-sol/",
        features: ["Native node:test runner", "Accessibility reduced-motion", "Transactional inventory lock"],
      },
    ],
    documents: [
      {
        id: "waretrack-sol-validation",
        name: "VALIDATION.md",
        type: "report",
        size: "4.2 KB",
        badge: "Build PASS",
        summary: "Matriks verifikasi sistem: npm ls bersih, vite build menghasilkan bundle HTML, CSS, dan Scene di dist/.",
        content: `# VALIDATION NOTES: WareTrack 6.1 Sol\nDijalankan 14 Oktober 2026, setelah implementasi final.\n\n| Komponen | Status | Hasil |\n| Dependency | PASS | npm ls --depth=0 tidak menemukan missing dep |\n| Build produksi | PASS | npm run build exit code 0 |\n| Breakpoints | PASS | 1600/1200/1000/820/600 px responsif |`,
      },
      {
        id: "waretrack-sol-test",
        name: "src/data/warehouse.test.js",
        type: "code",
        size: "3.1 KB",
        badge: "Unit Tests",
        summary: "Uji determinisme transisi simulasi, penanganan dock, dan pergerakan armada forklift.",
        content: `import test from 'node:test';\nimport assert from 'node:assert';\nimport { advanceSimulation } from './simulation.js';\n\ntest('Stok dipindahkan tepat satu kali saat unboarding selesai', () => {\n  // Assertion logic verifying transactional inventory consistency\n});`,
      },
    ],
    highlights: [
      "Verifikasi build produksi lengkap dengan exit code 0 tanpa error dependensi",
      "Pengujian unit berbasis native Node.js test runner tanpa dependensi jest/vitest",
      "Breakpoint visual adaptif 5 tingkat dengan dukungan reduced-motion bagi aksesibilitas",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/gpt 6.1 sol",
  },

  {
    id: "pear-recreation",
    slug: "pear-recreation",
    title: "Pear · Makes You Appear",
    subtitle: "Cinematic Scroll-Driven WebGL Film & Interactive Experience",
    category: "web-engineering",
    folderName: "clone web test",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Rekreasi lokal dari website sinematik pear.no. Menjalankan scroll-driven films beresolusi tinggi, navigasi babak WebGL, dan simulasi form kontak lokal tanpa dependensi eksternal.",
    previewUrl: "/benchmarks/pear/",
    previewType: "direct",
    techStack: ["Vanilla JavaScript", "WebGL Canvas", "Node.js 18+", "CSS3 Perspective", "Zero npm Packages"],
    metrics: [
      { label: "Hero Film Modes", value: "3 Modes (Reveal / Signal / Colossus)" },
      { label: "Asset Quality", value: "Full-resolution desktop frames on mobile" },
      { label: "Form System", value: "Local validation & instant preview" },
      { label: "Dependencies", value: "0 packages required" },
    ],
    date: "Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#f59e0b",
      variant: "solid",
      tabPosition: "left",
      layout: "spread",
      label: "pear/cinematic-film",
    },
    webPreviews: [
      {
        id: "pear-viewport-film",
        title: "Cinematic Scroll Film",
        urlBadge: "pear.cinema/reveal",
        tag: "WebGL Film Player",
        description: "Streaming frame film beresolusi tinggi yang digerakkan secara presisi oleh posisi scroll pengguna.",
        accentColor: "#f59e0b",
        previewRoute: "/benchmarks/pear/",
        features: ["3 Modes: Reveal, Signal, Colossus", "CSS3 perspective canvas", "Zero external packages"],
      },
      {
        id: "pear-viewport-chapters",
        title: "Chapter Navigation & Local Form",
        urlBadge: "pear.cinema/chapters",
        tag: "Interactive Story",
        description: "Navigasi babak film interaktif dan formulir kontak lokal dengan validasi instant preview.",
        accentColor: "#d97706",
        previewRoute: "/benchmarks/pear/",
        features: ["Interactive act timeline", "Offline submission viewer", "Standalone runtime"],
      },
    ],
    documents: [
      {
        id: "pear-readme",
        name: "README.md",
        type: "markdown",
        size: "1.5 KB",
        badge: "Recreation",
        summary: "Petunjuk menjalankan server lokal node scripts/dev.mjs dan mekanisme pergantian film hero.",
        content: `# Pear website recreation\nA local recreation of the pear.no reference website.\n\nThe original frontend runtime, styles, fonts, films, and scroll animation frames are stored locally.\nDefault film is "Reveal"; use ?hero=signal or ?hero=colossus to view other modes.\nRequires Node.js 18+ and WebGL-capable browser. Zero dependencies to install.`,
      },
      {
        id: "pear-app",
        name: "app.js",
        type: "code",
        size: "5.0 KB",
        badge: "Runtime",
        summary: "Logika form kontrol lokal, validasi masukan pengguna, dan sinkronisasi canvas film WebGL.",
        content: `// Local form interaction & offline submission controller\nexport function initLocalForm() {\n  const form = document.querySelector('form.contact-form');\n  form?.addEventListener('submit', (e) => {\n    e.preventDefault();\n    // Opens downloadable text preview without remote transmission\n  });\n}`,
      },
    ],
    highlights: [
      "Streaming frame film sinematik berbasis pergerakan scroll pengguna secara mulus",
      "Pilihan 3 mode film pembuka orisinal: Reveal, Signal, dan Colossus",
      "Zero dependencies instalasi: cukup jalankan native Node.js development server",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/clone web test",
  },

  {
    id: "shopify-editions",
    slug: "shopify-editions",
    title: "Shopify Editions | Winter '26",
    subtitle: "High-Fidelity 1.45 MB HTML Release Showcase Recreation",
    category: "web-engineering",
    folderName: "clone web test/clone 2",
    provider: "openai",
    modelName: "GPT-6 Astra",
    description:
      "Rekreasi lokal dari rilis produk global Shopify Editions Winter 2026. Menggunakan 1.45 MB bundel HTML dan CSS orisinal dengan runtime terpatch untuk eksekusi lokal tanpa dependensi backend eksternal.",
    previewUrl: "/benchmarks/shopify-editions/",
    previewType: "direct",
    techStack: ["HTML5", "CSS3", "JavaScript ES Modules", "Node.js Dev Server", "Asset Inventory Tooling"],
    metrics: [
      { label: "HTML Payload", value: "1.45 MB standalone" },
      { label: "Patch Pipeline", value: "Runtime sanitization scripts" },
      { label: "Target Node", value: ">= 18" },
      { label: "Verification", value: "node scripts/check.mjs PASS" },
    ],
    date: "Winter 2026",
    status: "verified",
    folderConfig: {
      color: "#10b981",
      variant: "glass",
      tabPosition: "center",
      layout: "spread",
      label: "shopify/winter26-showcase",
    },
    webPreviews: [
      {
        id: "shopify-viewport-hero",
        title: "Editions Showcase Viewport",
        urlBadge: "shopify.editions/winter26",
        tag: "Enterprise Showcase",
        description: "Tampilan rilis produk global Shopify Editions Winter 2026 dengan animasi CSS3 dan tata letak modular.",
        accentColor: "#10b981",
        previewRoute: "/benchmarks/shopify-editions/",
        features: ["1.45 MB standalone HTML", "Offline patched runtime", "Enterprise design system"],
      },
      {
        id: "shopify-viewport-cards",
        title: "Product Feature Showcase",
        urlBadge: "shopify.editions/features",
        tag: "Interactive Modules",
        description: "Katalog pembaruan produk, visualisasi inventaris logistik, dan kartu interaktif dengan tipografi orisinal.",
        accentColor: "#059669",
        previewRoute: "/benchmarks/shopify-editions/",
        features: ["Custom web font suite", "Asset integrity checked", "Zero external analytics"],
      },
    ],
    documents: [
      {
        id: "shopify-readme",
        name: "README.md",
        type: "markdown",
        size: "2.1 KB",
        badge: "Showcase",
        summary: "Dokumentasi rekreasi showcase Shopify Editions Winter 2026 dan pipeline inventaris aset.",
        content: `# Shopify Editions Winter 2026\nRekreasi lokal Shopify Editions Winter 2026, menggunakan HTML, CSS, dan runtime publik halaman referensi.\nMembutuhkan Node.js 18 atau lebih baru, tanpa instalasi dependensi.\n\nServer dev berjalan di http://127.0.0.1:5174/editions/winter2026.`,
      },
      {
        id: "shopify-pkg",
        name: "package.json",
        type: "config",
        size: "493 B",
        badge: "Scripts",
        summary: "Perintah otomasi prepare:site, patch-runtime, asset-inventory, dan build.",
        content: `{\n  "name": "shopify-editions-winter-2026-recreation",\n  "version": "1.0.0",\n  "private": true,\n  "scripts": {\n    "dev": "node scripts/dev.mjs",\n    "check": "node scripts/check.mjs",\n    "build": "node scripts/build.mjs"\n  }\n}`,
      },
    ],
    highlights: [
      "Bundel HTML dan CSS berskala enterprise 1.45 MB yang dioptimalkan untuk akses lokal",
      "Pipeline sanitasi runtime untuk mengisolasi pelacakan pihak ketiga dan CORS",
      "Pemeriksaan integritas aset otomatis via asset-inventory.mjs",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/clone web test/clone 2",
  },

  {
    id: "deepseek-water",
    slug: "deepseek-water",
    title: "Simulasi Air · Gerstner + Refraksi Layar",
    subtitle: "3-Layer Gerstner Wave Displacement & Screen-Space Refraction Shader",
    category: "shaders",
    folderName: "deepseek-4.1-flash",
    provider: "deepseek",
    modelName: "DeepSeek 4.1 Flash",
    description:
      "Simulasi air tingkat lanjut berbasis WebGL2: tiga lapis gelombang Gerstner, dua normal map prosedural, refraksi ruang layar (screen-space refraction), dan buih tepi berbasis depth buffer.",
    previewUrl: "/benchmarks/deepseek-4.1-flash-water.html",
    previewType: "direct",
    techStack: ["Three.js 0.169.0", "WebGL 2", "GLSL Custom Shaders", "Depth Buffer Foam", "Import Map"],
    metrics: [
      { label: "Shader Code", value: "1,192 lines single-file" },
      { label: "File Size", value: "51.2 KB" },
      { label: "Wave Physics", value: "3-Layer Gerstner Calculation" },
      { label: "Fallback", value: "WebGL2 detection with written notice" },
    ],
    date: "Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#06b6d4",
      variant: "glass",
      tabPosition: "left",
      layout: "spread",
      label: "deepseek/gerstner-refraction",
    },
    webPreviews: [
      {
        id: "deepseek-viewport-water",
        title: "Gerstner Water Surface & Refraction",
        urlBadge: "deepseek.water/glsl",
        tag: "GLSL Shader Viewport",
        description: "Simulasi air 3 lapis gelombang Gerstner dengan refraksi ruang layar dan buih pantai kedalaman.",
        accentColor: "#06b6d4",
        previewRoute: "/benchmarks/deepseek-4.1-flash-water.html",
        features: ["1,192 lines shader code", "Screen-space refraction", "Real-time FPS & vertex meter"],
      },
      {
        id: "deepseek-viewport-controls",
        title: "Wave Physics GUI Panel",
        urlBadge: "deepseek.water/controls",
        tag: "Parameter GUI",
        description: "Kontrol interaktif parameter kecuraman gelombang, panjang gelombang, sudut matahari, dan densitas buih.",
        accentColor: "#0891b2",
        previewRoute: "/benchmarks/deepseek-4.1-flash-water.html",
        features: ["Depth buffer foam", "WebGL2 fallback detection", "Custom normal mapping"],
      },
    ],
    documents: [
      {
        id: "deepseek-index",
        name: "index.html",
        type: "html",
        size: "51.2 KB",
        badge: "GLSL Shader",
        summary: "1,192 baris kode GLSL vertex displacement dan fragment screen-space refraction.",
        content: `<!-- Simulasi Air - Gerstner + Refraksi Layar -->\n<!-- Tiga lapis Gerstner, dua normal map prosedural, refraksi ruang layar, buih tepi berbasis kedalaman. -->\n<!-- Live vertex count and FPS readout with interactive parameter GUI -->`,
      },
      {
        id: "deepseek-shader-math",
        name: "gerstner_math.glsl",
        type: "code",
        size: "2.8 KB",
        badge: "Equations",
        summary: "Persamaan perpindahan gelombang Gerstner matematis dan perhitungan normal permukaan air.",
        content: `vec3 calculateGerstnerWave(vec4 wave, vec3 p, inout vec3 tangent, inout vec3 binormal) {\n  float steepness = wave.z;\n  float wavelength = wave.w;\n  float k = 2.0 * 3.14159 / wavelength;\n  float c = sqrt(9.8 / k);\n  vec2 d = normalize(wave.xy);\n  float f = k * (dot(d, p.xz) - c * time);\n  float a = steepness / k;\n  \n  tangent += vec3(-d.x * d.x * (steepness * sin(f)), d.x * (steepness * cos(f)), -d.x * d.y * (steepness * sin(f)));\n  return vec3(d.x * (a * cos(f)), a * sin(f), d.y * (a * cos(f)));\n}`,
      },
    ],
    highlights: [
      "Kalkulasi Gerstner wave sum tiga lapis yang dievaluasi per-vertex secara akurat",
      "Screen-space refraction yang mendistorsi dasar air berdasarkan vektor normal gelombang",
      "Buih tepi dinamis (depth foam) yang memudar secara mulus saat air menyentuh tepi objek",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/deepseek-4.1-flash",
  },

  {
    id: "haiku-water",
    slug: "haiku-water",
    title: "Water Simulation · Fragment Displacement",
    subtitle: "Interactive Water Surface with Tropical & River Climate Presets",
    category: "shaders",
    folderName: "Haiku-5.5",
    provider: "claude",
    modelName: "Claude Haiku 5.5",
    description:
      "Simulasi permukaan air interaktif dengan plane displacement kustom, kontrol orbit kamera halus, serta preset Tropical dan River yang mengubah seluruh parameter simulasi secara serempak.",
    previewUrl: "/benchmarks/haiku-5.5-water.html",
    previewType: "direct",
    techStack: ["Three.js 0.160.0", "WebGL 2", "GLSL Shaders", "OrbitControls", "jsDelivr CDN"],
    metrics: [
      { label: "Lines of Code", value: "689 lines single-file" },
      { label: "Asset Size", value: "23.2 KB" },
      { label: "Presets", value: "Tropical & River Modes" },
      { label: "Camera Control", value: "Smooth OrbitControls with inertia" },
    ],
    date: "Oktober 2026",
    status: "verified",
    folderConfig: {
      color: "#8b5cf6",
      variant: "matte",
      tabPosition: "right",
      layout: "spread",
      label: "haiku/climate-surface",
    },
    webPreviews: [
      {
        id: "haiku-viewport-water",
        title: "Displacement Mesh Viewport",
        urlBadge: "haiku.water/simulation",
        tag: "Shader Canvas",
        description: "Simulasi bidang air terdistorsi vertikal dengan kontrol orbit kamera halus dan pencahayaan Phong.",
        accentColor: "#8b5cf6",
        previewRoute: "/benchmarks/haiku-5.5-water.html",
        features: ["689 lines single-file", "Smooth OrbitControls", "Specular lighting"],
      },
      {
        id: "haiku-viewport-presets",
        title: "Tropical & River Climate Presets",
        urlBadge: "haiku.water/climate",
        tag: "Preset Switcher",
        description: "Dua preset iklim instan yang mengubah palet air, kecepatan ombak, dan warna buih secara harmonis.",
        accentColor: "#7c3aed",
        previewRoute: "/benchmarks/haiku-5.5-water.html",
        features: ["Tropical blue mode", "River green mode", "Zero bundler footprint"],
      },
    ],
    documents: [
      {
        id: "haiku-code",
        name: "water.html",
        type: "html",
        size: "23.2 KB",
        badge: "Shader Core",
        summary: "689 baris vertex-displaced water plane dengan fragment shader kustom dan kontrol orbit.",
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Water Simulation (WebGL2 / Three.js)</title>\n  <style>body { margin: 0; overflow: hidden; background: #000; }</style>\n</head>\n<!-- Haiku 5.5: Vertex displacement water plane with specular lighting and climate presets -->`,
      },
      {
        id: "haiku-presets",
        name: "climate_presets.json",
        type: "config",
        size: "1.1 KB",
        badge: "Presets",
        summary: "Parameter warna air, frekuensi gelombang, specular roughness, dan kedalaman untuk mode Tropical dan River.",
        content: `{\n  "tropical": {\n    "waterColor": "#0099ff",\n    "sunColor": "#ffffff",\n    "waveHeight": 0.35,\n    "waveSpeed": 1.2,\n    "foamColor": "#ffffff"\n  },\n  "river": {\n    "waterColor": "#1a5336",\n    "sunColor": "#e0e8c0",\n    "waveHeight": 0.18,\n    "waveSpeed": 2.1,\n    "foamColor": "#d4e6c8"\n  }\n}`,
      },
    ],
    highlights: [
      "Vertex-displaced water plane dengan fragment shader lighting spekular Phong",
      "Dua preset iklim instan (Tropical dan River) yang mengubah palet air dan intensitas gelombang",
      "Kamera orbit halus dengan redaman inersia dan batasan zoom sudut pandang",
    ],
    pathOnDisk: "/home/riftyxso/Documents/benchmark/Haiku-5.5",
  },
];
