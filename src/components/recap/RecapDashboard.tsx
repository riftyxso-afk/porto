"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { play } from "cuelume";
import {
  RECAP_CATEGORIES,
  RECAP_PROJECTS,
  type RecapCategory,
  type RecapProject,
  type RecapWebPreview,
} from "@/data/recapData";
import { Folder } from "@/components/folder/Folder";
import { Dock } from "@/components/Dock";
import ScrollReveal from "@/components/ScrollReveal";
import { OpenAILogo, ClaudeLogo, DeepSeekLogo } from "@/components/usage/ModelLogos";
import { useT } from "@/i18n/LanguageProvider";
import {
  Search,
  SlidersHorizontal,
  X,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  FolderOpen,
  Table as TableIcon,
  LayoutGrid,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  Globe,
} from "lucide-react";

export function RecapDashboard() {
  const t = useT();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setIntroComplete(true);
    }
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Finish intro animation and trigger subtle audio feedback
  const handleFinishIntro = useCallback(() => {
    if (!introComplete) {
      setIntroComplete(true);
      play("open", { emphasis: "subtle" });
    }
  }, [introComplete]);

  // Filter & search states
  const [activeCategory, setActiveCategory] = useState<RecapCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Selected project & viewport for inspect modal
  const [inspectedProject, setInspectedProject] = useState<RecapProject | null>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Close modal on Escape key (R-26, R-32)
  useEffect(() => {
    if (!inspectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectedProject(null);
        setActivePreviewIndex(0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inspectedProject]);

  // Folder open state tracking per project
  const [folderOpenStates, setFolderOpenStates] = useState<Record<string, boolean>>({
    capys: true,
    "pear-recreation": true,
    "shopify-editions": true,
  });

  const toggleFolder = useCallback((id: string) => {
    setFolderOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return RECAP_PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.modelName.toLowerCase().includes(q) ||
        project.folderName.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q)) ||
        project.webPreviews.some(
          (prev) =>
            prev.title.toLowerCase().includes(q) ||
            prev.description.toLowerCase().includes(q) ||
            prev.urlBadge.toLowerCase().includes(q)
        ) ||
        project.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  // Copy path handler
  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  // Open inspection modal focused on a web preview
  const openInspector = (
    project: RecapProject,
    previewIndex: number = 0
  ) => {
    setInspectedProject(project);
    setActivePreviewIndex(previewIndex);
  };

  // Close inspector modal
  const closeInspector = () => {
    setInspectedProject(null);
    setActivePreviewIndex(0);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100 transition-colors">
      {/* Intro Stage: Word-by-Word ScrollReveal Animation */}
      {!introComplete && (
        <section
          aria-label="Introduction sequence"
          className="fixed inset-0 z-40 flex flex-col items-center justify-between px-6 py-12 bg-white dark:bg-zinc-950"
        >
          {/* Minimalist Top Bar */}
          <div className="w-full max-w-4xl flex items-center justify-between">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400"
            >
              <Link
                href="/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                radea
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                recap
              </span>
            </nav>

            <button
              type="button"
              onClick={handleFinishIntro}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-mono text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
            >
              <span>{t.recap.nextIntro}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Centered Word-by-Word Reveal */}
          <div className="my-auto flex flex-col items-center justify-center max-w-3xl text-center px-4">
            <ScrollReveal
              playOnLoad={true}
              enableBlur={true}
              baseOpacity={0.04}
              blurStrength={8}
              revealDelay={0.15}
              onRevealComplete={() => setTextRevealed(true)}
              textClassName="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-relaxed"
            >
              {t.recap.introText}
            </ScrollReveal>

            <button
              type="button"
              onClick={handleFinishIntro}
              className={`mt-10 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95 ${
                textRevealed
                  ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  : "bg-zinc-900/90 text-white hover:bg-zinc-800 dark:bg-zinc-100/90 dark:text-zinc-900 dark:hover:bg-zinc-200"
              }`}
            >
              <span>{t.recap.nextIntro}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom Colophon Indicator */}
          <div className="w-full max-w-4xl flex items-center justify-center text-[11px] font-mono text-zinc-400 dark:text-zinc-600">
            <span>10 Autonomous Benchmark Builds</span>
          </div>
        </section>
      )}

      {/* Main Dashboard - Gated by introComplete for smooth transition */}
      <div
        className={`relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-32 transition-[opacity,transform] duration-700 ease-out ${
          introComplete
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {/* Top Header & Navigation Breadcrumb */}
        <header className="mb-8 flex flex-col gap-5 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400"
            >
              <Link
                href="/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                radea
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                recap
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>10 Verified Archives</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {t.recap.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.recap.subtitle}
            </p>
          </div>

          {/* Architectural Dossier Ledger Bar */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:divide-x sm:divide-zinc-200 dark:sm:divide-zinc-800">
              <div className="flex flex-col gap-0.5 sm:px-3 first:pl-0">
                <dt className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {t.recap.ledgerDirectory}
                </dt>
                <dd
                  className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate"
                  title={t.recap.ledgerDirectoryVal}
                >
                  {t.recap.ledgerDirectoryVal}
                </dd>
              </div>

              <div className="flex flex-col gap-0.5 sm:px-3">
                <dt className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {t.recap.ledgerScope}
                </dt>
                <dd className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate">
                  {t.recap.ledgerScopeVal}
                </dd>
              </div>

              <div className="flex flex-col gap-0.5 sm:px-3 last:pr-0">
                <dt className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {t.recap.ledgerEngines}
                </dt>
                <dd className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-200 truncate">
                  {t.recap.ledgerEnginesVal}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* Filter Controls, Search & View Switcher */}
        <section className="mb-8 flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.recap.searchPlaceholder}
                className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-8 pr-7 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-200 dark:focus:ring-zinc-200 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  aria-label={t.recap.clearSearch}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle - Segmented Control */}
            <div
              role="group"
              aria-label="View mode"
              className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-white font-medium text-zinc-900 shadow-2xs dark:bg-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{t.recap.viewGrid}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                aria-pressed={viewMode === "table"}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
                  viewMode === "table"
                    ? "bg-white font-medium text-zinc-900 shadow-2xs dark:bg-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span>{t.recap.viewTable}</span>
              </button>
            </div>
          </div>

          {/* Category Segmented Control Tabs */}
          <div
            role="group"
            aria-label={t.recap.filterCategory}
            className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-100/80 p-1 text-xs dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800"
          >
            {RECAP_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "bg-white font-medium text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  <span>{cat.nameEn}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      active
                        ? "text-zinc-500 dark:text-zinc-300"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Understated Folder Interaction Cue */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 px-0.5">
            <span>{t.recap.folderHint}</span>
            <span>
              {filteredProjects.length} / {RECAP_PROJECTS.length}
            </span>
          </div>
        </section>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-zinc-400" />
            <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t.recap.noResults}
            </h3>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t.recap.clearSearch}
            </button>
          </div>
        )}

        {/* View Mode: 3D Folder Grid with Web Previews */}
        {viewMode === "grid" && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isOpen = folderOpenStates[project.id] ?? true;

              // Convert Web Previews to React Bits Folder items
              const folderItems = project.webPreviews.map((preview, previewIdx) => (
                <div
                  key={preview.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    openInspector(project, previewIdx);
                  }}
                  className="group/sheet flex h-full flex-col justify-between rounded-lg border border-zinc-200/90 bg-white p-2.5 text-left select-none shadow-2xs hover:border-zinc-400 dark:border-zinc-700/80 dark:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <div>
                    {/* Browser Window Chrome Topbar */}
                    <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
                      {/* Traffic light window controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>

                      {/* Mini URL Address Pill */}
                      <div className="flex items-center gap-1 truncate rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{preview.urlBadge}</span>
                      </div>

                      {/* Viewport badge */}
                      <span className="shrink-0 rounded bg-blue-50 px-1 py-0.5 text-[8.5px] font-mono font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {preview.tag}
                      </span>
                    </div>

                    {/* Viewport Title & Description */}
                    <h4 className="truncate font-sans text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 group-hover/sheet:text-blue-600 dark:group-hover/sheet:text-blue-400 transition-colors">
                      {preview.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[9.5px] leading-snug text-zinc-500 dark:text-zinc-400">
                      {preview.description}
                    </p>

                    {/* Mini UI Feature Chips */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {preview.features.slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          className="rounded bg-zinc-50 px-1 py-0.5 font-mono text-[8.5px] text-zinc-600 border border-zinc-200/60 dark:bg-zinc-800/80 dark:border-zinc-700/60 dark:text-zinc-300 truncate max-w-[110px]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sheet Footer */}
                  <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-1.5 text-[9px] font-mono text-zinc-400 dark:border-zinc-800">
                    <span className="truncate text-blue-600 dark:text-blue-400 font-medium">
                      {preview.previewRoute}
                    </span>
                    <span className="shrink-0 flex items-center gap-0.5 text-zinc-500 group-hover/sheet:text-zinc-900 dark:group-hover/sheet:text-zinc-200">
                      <span>Open</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              ));

              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white/90 p-5 backdrop-blur-sm transition-all duration-200 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 shadow-2xs"
                >
                  {/* Card Header: Provider Model Pill + Verification Status */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      {/* AI Provider Model Pill */}
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-mono font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                        <span className="h-3.5 w-3.5 shrink-0 text-zinc-600 dark:text-zinc-400">
                          {project.provider === "openai" && <OpenAILogo />}
                          {project.provider === "claude" && <ClaudeLogo />}
                          {project.provider === "deepseek" && <DeepSeekLogo />}
                        </span>
                        <span>{project.modelName}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono font-medium ${
                            project.status === "verified"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                          }`}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {project.status === "verified"
                            ? t.recap.verified
                            : t.recap.production}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {project.subtitle}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* 3D Folder Interaction Area */}
                  <div className="my-5 flex flex-col items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/50">
                    <div className="relative py-2 flex items-center justify-center">
                      <Folder
                        items={folderItems}
                        open={isOpen}
                        onOpenChange={() => toggleFolder(project.id)}
                        label={project.folderConfig.label}
                        color={project.folderConfig.color}
                        variant={project.folderConfig.variant}
                        tabPosition={project.folderConfig.tabPosition}
                        layout={project.folderConfig.layout}
                        size={1.05}
                        theme={isDark ? "dark" : "light"}
                        draggable={true}
                      />
                    </div>

                    <div className="mt-3 flex w-full items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/50 pt-2 dark:border-zinc-800/50 font-mono">
                      <span className="flex items-center gap-1 text-[10px]">
                        <FolderOpen className="h-3 w-3 text-zinc-400" />
                        {isOpen ? t.recap.folderOpenStatus : t.recap.folderClosedStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFolder(project.id)}
                        className="text-[10px] text-blue-600 hover:underline dark:text-blue-400 font-medium"
                      >
                        {isOpen ? "Fold" : "Expand"}
                      </button>
                    </div>
                  </div>

                  {/* Metrics Badge Strip */}
                  <div className="grid grid-cols-2 gap-2 mb-3 rounded-lg bg-zinc-50 p-2 text-xs font-mono dark:bg-zinc-950/40">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                          {m.label}
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:bg-zinc-800">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyPath(project.pathOnDisk)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors shrink-0"
                      title={project.pathOnDisk}
                    >
                      {copiedPath === project.pathOnDisk ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {t.recap.copied}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{t.recap.copyPath}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                        title={project.previewUrl}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>{t.recap.livePreview}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => openInspector(project, 0)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
                      >
                        <span>{t.recap.inspect}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View Mode: Specification Table */}
        {viewMode === "table" && filteredProjects.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 font-mono text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Project & Title</th>
                  <th className="px-4 py-3 font-semibold">Model Provider</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Primary Stack</th>
                  <th className="px-4 py-3 font-semibold">Verified Metrics</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                {filteredProjects.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {p.title}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        {p.subtitle}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-mono font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                        <span className="h-3.5 w-3.5 shrink-0 text-zinc-600 dark:text-zinc-400">
                          {p.provider === "openai" && <OpenAILogo />}
                          {p.provider === "claude" && <ClaudeLogo />}
                          {p.provider === "deepseek" && <DeepSeekLogo />}
                        </span>
                        <span>{p.modelName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.techStack.slice(0, 3).map((s, i) => (
                          <span
                            key={i}
                            className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      {p.metrics[0]?.label}:{" "}
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {p.metrics[0]?.value}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={p.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                          title={p.previewUrl}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>{t.recap.livePreview}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => openInspector(p, 0)}
                          className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          {t.recap.inspect}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Web Viewport & Architecture Inspector Modal */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 sm:px-6 py-3.5 dark:border-zinc-800">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-3.5 w-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: inspectedProject.folderConfig.color }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {inspectedProject.title}
                    </h3>
                    <div className="hidden sm:inline-flex items-center gap-1 rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 shrink-0">
                      <span className="h-3 w-3">
                        {inspectedProject.provider === "openai" && <OpenAILogo />}
                        {inspectedProject.provider === "claude" && <ClaudeLogo />}
                        {inspectedProject.provider === "deepseek" && <DeepSeekLogo />}
                      </span>
                      <span>{inspectedProject.modelName}</span>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {inspectedProject.pathOnDisk}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={inspectedProject.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.recap.livePreview}</span>
                </a>
                <button
                  type="button"
                  onClick={closeInspector}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                  aria-label={t.recap.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Inspector Navigation Tabs: Web Viewports */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 sm:px-6 py-2 overflow-x-auto dark:border-zinc-800 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                {inspectedProject.webPreviews.map((prev, idx) => (
                  <button
                    key={prev.id}
                    type="button"
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                      activePreviewIndex === idx
                        ? "bg-white text-zinc-900 shadow-2xs border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{prev.title}</span>
                    <span className="rounded bg-zinc-100 px-1 py-0.5 text-[9px] text-zinc-500 dark:bg-zinc-900">
                      {prev.tag}
                    </span>
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-mono text-zinc-400 hidden md:inline">
                Live Embedded Viewport
              </span>
            </div>

            {/* Modal Body: Two column layout with Live Preview and Project Specs */}
            <div className="grid flex-1 grid-cols-1 md:grid-cols-3 overflow-y-auto md:overflow-hidden">
              {/* Primary Content View: Interactive Web Viewport */}
              <div className="col-span-1 md:col-span-2 flex flex-col border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 h-[380px] md:h-full shrink-0 md:shrink overflow-hidden bg-zinc-100/50 dark:bg-zinc-950/50">
                <div className="flex flex-col h-full">
                  {/* Simulated Browser Address Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <div className="flex items-center gap-1.5 flex-1 rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        <Globe className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="truncate">
                          https://{inspectedProject.webPreviews[activePreviewIndex]?.urlBadge || "benchmark.local"}
                        </span>
                      </div>
                    </div>

                    <a
                      href={inspectedProject.webPreviews[activePreviewIndex]?.previewRoute || inspectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-600 hover:underline dark:text-blue-400"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>Open in tab</span>
                    </a>
                  </div>

                  {/* Live Preview Iframe Frame */}
                  <div className="relative flex-1 bg-zinc-900 overflow-hidden">
                    <iframe
                      src={
                        inspectedProject.webPreviews[activePreviewIndex]?.previewRoute ||
                        inspectedProject.previewUrl
                      }
                      className="h-full w-full border-0 bg-white dark:bg-zinc-950"
                      title={inspectedProject.webPreviews[activePreviewIndex]?.title || inspectedProject.title}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </div>
              </div>

              {/* Project Specs & Highlights Sidebar */}
              <div className="col-span-1 overflow-auto p-5 bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col gap-5">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    {t.recap.highlights}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {inspectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5 dark:text-emerald-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    {t.recap.metrics}
                  </h4>
                  <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 font-mono text-xs">
                    {inspectedProject.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-zinc-100 pb-1.5 last:border-0 last:pb-0 dark:border-zinc-800"
                      >
                        <span className="text-zinc-500">{m.label}</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    {t.recap.techStack}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {inspectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-200/80 px-2 py-0.5 font-mono text-[11px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                      Evaluated on {inspectedProject.date}
                    </p>
                    <p className="mt-0.5 truncate" title={inspectedProject.pathOnDisk}>
                      {inspectedProject.pathOnDisk}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Dock Navigation */}
      <Dock visible />
    </div>
  );
}
