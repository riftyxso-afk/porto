"use client";

import { useMemo, useState } from "react";
import { Dock } from "@/components/Dock";
import { FAVORITE_MODEL } from "@/data/usageData";
import { useT } from "@/i18n/LanguageProvider";
import { MonthStepper } from "./MonthStepper";
import { ClaudeLogo, DeepSeekLogo, OpenAILogo } from "./ModelLogos";
import { ProfileCard } from "./ProfileCard";

// Sample figures, generated from a fixed seed so the server and the browser
// render the same markup. Swap the generator for real usage data when it exists.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS_IN_BAR_CHART = 30;

function smoothPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const mx = (a.x + b.x) / 2;
    d += ` C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  }
  return d;
}

function AgentsCard() {
  const t = useT();
  const [month, setMonth] = useState(9);
  const bars = useMemo(() => {
    const rand = seeded(100 + month);
    return Array.from({ length: DAYS_IN_BAR_CHART }, () => Math.round(rand() * 24) + 2);
  }, [month]);
  const max = Math.max(...bars);
  const total = bars.reduce((sum, v) => sum + v, 0);

  return (
    <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.usage.agents}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
              {total}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.usage.runs}</span>
          </div>
        </div>
        <MonthStepper month={month} onChange={setMonth} />
      </div>

      <div
        key={month}
        className="mt-6 flex h-40 items-end gap-[5px]"
        role="img"
        aria-label={`${total} ${t.usage.agentRunsAlt} ${t.usage.months[month]}`}
      >
        {bars.map((v, i) => (
          <span
            key={i}
            className="animate-bar-grow flex-1 rounded-t-[3px] bg-violet-300 dark:bg-violet-500/80"
            style={{
              height: `${(v / max) * 100}%`,
              animationDelay: `${i * 18}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
        <span>{t.usage.months[month].slice(0, 3)} 1</span>
        <span>{t.usage.today}</span>
      </div>
    </section>
  );
}

function TokensCard() {
  const t = useT();
  const [month, setMonth] = useState(9);
  const series = useMemo(() => {
    const rand = seeded(300 + month);
    // Daily totals, kept alongside the running total. The curve draws the
    // running total because that is the shape a month of usage makes; the
    // change badge reads the daily totals, because the running total only ever
    // climbs and comparing its ends would report hundreds of percent growth on
    // data that never actually grew.
    let running = 0;
    return Array.from({ length: DAYS_IN_BAR_CHART }, () => {
      const day = rand() * 1.4 + 0.2;
      running += day;
      return { running, day };
    });
  }, [month]);

  const W = 640;
  const H = 130;
  const totals = series.map((p) => p.running);
  const peak = totals[totals.length - 1];
  const points = totals.map((v, i) => ({
    x: (i / (totals.length - 1)) * W,
    y: H - (v / peak) * (H - 10),
  }));
  const line = smoothPath(points);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const totalMillions = (peak * 4.2).toFixed(1);

  // Change in the daily rate over the last third of the window against the third
  // before it. Derived from the same days the curve is drawn from, so the badge
  // cannot claim a trend the chart does not show.
  const third = Math.floor(series.length / 3);
  const mean = (list: { day: number }[]) =>
    list.reduce((sum, p) => sum + p.day, 0) / list.length;
  const earlier = mean(series.slice(0, third));
  const later = mean(series.slice(-third));
  const growth = earlier > 0 ? ((later - earlier) / earlier) * 100 : null;

  return (
    <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.usage.tokens}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
              {totalMillions}M
            </span>
            {growth !== null && Math.abs(growth) > 0.5 ? (
              <span
                className={`text-xs font-medium ${
                  growth > 0
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {`${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`}
              </span>
            ) : null}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1 text-xs dark:bg-zinc-800/60">
            <span className="w-3.5 h-3.5 shrink-0 text-zinc-700 dark:text-zinc-300">
              <OpenAILogo />
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {FAVORITE_MODEL.label}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {t.usage.favoriteProvider}
            </span>
          </div>
        </div>
        <MonthStepper month={month} onChange={setMonth} />
      </div>

      <div key={month} className="mt-6 h-40">
        {/* Scaled uniformly rather than stretched to the box: a non-uniform
           scale would make the stroke thin on shallow segments of the curve. */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          <defs>
            <linearGradient id="tokens-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#tokens-area)" className="animate-area-fade" />
          <path
            d={line}
            pathLength={1}
            fill="none"
            stroke="#a855f7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={1}
            className="animate-line-draw"
          />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
        <span>{t.usage.months[month].slice(0, 3)} 1</span>
        <span>{t.usage.today}</span>
      </div>
    </section>
  );
}

const MODEL_GROUPS = [
  { provider: "OpenAI", logo: OpenAILogo, models: ["GPT-6 Astra", "GPT-6.1 Sol", "GPT-5.6 Luna"] },
  { provider: "Claude", logo: ClaudeLogo, models: ["Haiku 5.5", "Opus 5.5", "Fable 5.1"] },
  { provider: "DeepSeek", logo: DeepSeekLogo, models: ["DeepSeek 4.1 Flash"] },
];

// index runs across all providers so the chips stagger as one sequence instead
// of restarting inside each group.
let runIndex = 0;
const MODELS = MODEL_GROUPS.map((group) => ({
  ...group,
  models: group.models.map((label) => ({ label, index: runIndex++ })),
}));
const MODEL_TOTAL = runIndex;

function ModelsCard() {
  const t = useT();

  return (
    <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.usage.models}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
          {MODEL_TOTAL}
        </p>
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {MODELS.map((group) => {
          const Logo = group.logo;
          return (
            <li key={group.provider} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 shrink-0 text-zinc-700 dark:text-zinc-300">
                  <Logo />
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {group.provider}
                </span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {group.models.map((name) => (
                  <li
                    key={name.label}
                    className="animate-model-in rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 text-[13px] text-zinc-700 dark:text-zinc-200"
                    style={{ animationDelay: `${name.index * 70}ms` }}
                  >
                    {name.label}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function UsageDashboard() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <ProfileCard />
        <AgentsCard />
        <TokensCard />
        <ModelsCard />
      </div>

      {/* The dock reaches every page now. Here it shows straight away: the
          story gate that holds it back on the landing page has nothing to
          wait for on this one. */}
      <Dock visible />
    </>
  );
}