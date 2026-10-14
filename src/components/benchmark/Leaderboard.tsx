"use client";

import { useMemo, useState } from "react";
import { INTELLIGENCE_INDEX, SCORE_CEILING, type BenchmarkModel } from "@/data/benchmarkData";
import { ProviderLogo } from "./ProviderLogo";
import { useT } from "@/i18n/LanguageProvider";

type Filter = "all" | "open" | "mine";

// The label is a dictionary key rather than a string, so each button can name
// itself in the language on screen.
const FILTERS: { key: Filter; label: "filterAll" | "filterOpen" | "filterMine" }[] = [
  { key: "all", label: "filterAll" },
  { key: "open", label: "filterOpen" },
  { key: "mine", label: "filterMine" },
];

// Every bar is tinted with its creator's colour so a provider reads the same on
// each of its rows. The tint is mixed toward one mid grey first: three of the
// published brand colours are near black, and on a dark page a bar painted in
// raw near-black is a bar nobody can see. The mix pulls all of them into one
// readable band and lets the hue still carry.
function barColor(color: string) {
  return `color-mix(in oklab, ${color} 78%, #8b8b93)`;
}

function ModelRow({ model, rank }: { model: BenchmarkModel; rank: number }) {
  const t = useT();

  return (
    <li
      className={`animate-rise-in grid grid-cols-[1.25rem_1.75rem_minmax(0,1fr)_2.75rem] items-center gap-x-3 gap-y-1.5 rounded-lg px-2 py-2 transition-colors sm:grid-cols-[1.75rem_1.75rem_minmax(0,17rem)_minmax(0,1fr)_2.75rem] sm:gap-x-4 ${
        model.localDemo
          ? "bg-violet-50 ring-1 ring-violet-200 dark:bg-violet-500/[0.07] dark:ring-violet-500/25"
          : "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40"
      }`}
    >
      <span
        aria-hidden="true"
        className="text-right font-mono text-xs leading-none text-zinc-500 tabular-nums dark:text-zinc-400"
      >
        {rank}
      </span>

      <ProviderLogo file={model.logo} />

      <div className="col-start-3 row-start-1 flex min-w-0 items-center gap-2 sm:col-start-3">
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium leading-tight text-zinc-900 dark:text-zinc-100">
            {model.name}
          </span>
          <span className="mt-0.5 block text-[11px] leading-tight text-zinc-500 dark:text-zinc-400">
            {model.provider}
            {model.openWeights && (
              <>
                {" · "}
                <span className="font-mono text-[10px] uppercase tracking-wide">
                  {t.benchmark.openWeights}
                </span>
              </>
            )}
          </span>
        </span>
        {model.localDemo && (
          <span className="shrink-0 rounded-md bg-violet-600 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white dark:bg-violet-400 dark:text-zinc-950">
            {t.benchmark.yourDemo}
          </span>
        )}
      </div>

      <div className="col-start-3 row-start-2 sm:col-start-4 sm:row-start-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="animate-bar-grow-x h-full rounded-full"
            style={{
              width: `${(model.score / SCORE_CEILING) * 100}%`,
              backgroundColor: barColor(model.color),
            }}
          />
        </div>
      </div>

      <span className="col-start-4 row-start-1 text-right font-mono text-sm font-medium leading-none text-zinc-900 tabular-nums sm:col-start-5 dark:text-zinc-100">
        {model.score.toFixed(1)}
      </span>
    </li>
  );
}

export function Leaderboard() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(() => {
    if (filter === "open") return INTELLIGENCE_INDEX.filter((m) => m.openWeights);
    if (filter === "mine") return INTELLIGENCE_INDEX.filter((m) => m.localDemo);
    return INTELLIGENCE_INDEX;
  }, [filter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 sm:px-5 dark:border-zinc-800">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.benchmark.index}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {rows.length} / {INTELLIGENCE_INDEX.length} · {t.benchmark.scale}{" "}
            {SCORE_CEILING}
          </p>
        </div>

        <div
          role="group"
          aria-label={t.benchmark.filterLabel}
          className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-md px-2.5 py-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400 ${
                filter === f.key
                  ? "bg-white font-medium text-zinc-900 shadow-2xs dark:bg-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t.benchmark[f.label]}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-0.5 p-2 sm:p-3">
        {rows.map((model, i) => (
          <ModelRow key={model.name} model={model} rank={INTELLIGENCE_INDEX.indexOf(model) + 1} />
        ))}
      </ul>
    </section>
  );
}