"use client";

import { ExternalLink } from "lucide-react";
import { Dock } from "@/components/Dock";
import { INDEX_SOURCE, LOCAL_DEMOS, type LocalDemo } from "@/data/benchmarkData";
import { Leaderboard } from "./Leaderboard";
import { ProviderLogo } from "./ProviderLogo";
import { useT } from "@/i18n/LanguageProvider";

function formatBytes(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function DemoCard({ demo }: { demo: LocalDemo }) {
  const t = useT();
  const logo = demo.provider === "Anthropic" ? "anthropic.svg" : "deepseek.svg";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start gap-3 border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
        <ProviderLogo file={logo} size={32} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {demo.model}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {demo.provider} · {t.benchmark.demoTitles[demo.id]}
          </p>
        </div>
        <a
          href={demo.file}
          target="_blank"
          rel="noopener noreferrer"
          data-cuelume-tap=""
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400"
        >
          {t.benchmark.openDemo}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <ul className="flex flex-1 flex-col gap-2 px-4 py-4 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {t.benchmark.features[demo.id].map((feature) => (
          <li key={feature} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <dl className="flex items-baseline gap-4">
          <div className="flex items-baseline gap-1.5">
            <dt className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {t.benchmark.lines}
            </dt>
            <dd className="font-mono text-xs text-zinc-900 tabular-nums dark:text-zinc-100">
              {demo.lines.toLocaleString("en-US")}
            </dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {t.benchmark.size}
            </dt>
            <dd className="font-mono text-xs text-zinc-900 tabular-nums dark:text-zinc-100">
              {formatBytes(demo.bytes)}
            </dd>
          </div>
        </dl>
        <ul className="ml-auto flex flex-wrap gap-1.5">
          {demo.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] leading-none text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function BenchmarkDashboard() {
  const t = useT();

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4">
        <header className="px-1 pt-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
            {t.benchmark.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t.benchmark.description}
          </p>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {t.benchmark.source}:{" "}
            <a
              href={INDEX_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-200 dark:decoration-zinc-700 dark:hover:decoration-zinc-500 dark:focus-visible:outline-zinc-400"
            >
              {INDEX_SOURCE.label}
            </a>
            , {t.benchmark.readOn} {INDEX_SOURCE.readOn}.
          </p>
        </header>

        <Leaderboard />

        <section className="mt-2">
          <h2 className="mb-3 px-1 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.benchmark.yourDemos}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {LOCAL_DEMOS.map((demo) => (
              <DemoCard key={demo.model} demo={demo} />
            ))}
          </div>
        </section>
      </div>

      <Dock visible />
    </>
  );
}