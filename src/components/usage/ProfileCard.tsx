"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { toPng } from "html-to-image";
import { Check, Share2 } from "lucide-react";
import DitherVeil from "@/components/DitherVeil";
import { CountUp } from "@/components/CountUp";
import { personalInfo } from "@/data/portfolioData";
import { FAVORITE_MODEL, USAGE_STATS } from "@/data/usageData";
import { useT } from "@/i18n/LanguageProvider";
import { OpenAILogo } from "./ModelLogos";
import { SHARE_CARD_SIZE, ShareCard } from "./ShareCard";

// The label is a dictionary key rather than a string, so each button can name
// itself in the language on screen.
const RANGES = [
  { key: "weekly", label: "rangeWeekly", days: 7 },
  { key: "monthly", label: "rangeMonthly", days: 30 },
  { key: "yearly", label: "rangeYearly", days: 371 },
] as const;

// Five intensity steps, from empty to the darkest purple.
const LEVELS = [
  "bg-zinc-100 dark:bg-zinc-800/70",
  "bg-violet-200 dark:bg-violet-900",
  "bg-violet-400 dark:bg-violet-700",
  "bg-violet-600 dark:bg-violet-500",
  "bg-violet-800 dark:bg-violet-300",
];

export function ProfileCard() {
  const t = useT();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [range, setRange] = useState<(typeof RANGES)[number]["key"]>("yearly");
  const shareRef = useRef<HTMLDivElement>(null);
  const shareSignal = useRef<(() => void) | null>(null);
  const [sharing, setSharing] = useState<"idle" | "busy" | "failed">("idle");

  // The export is a dedicated square card rather than a capture of this page:
  // the page is a tall, themed, WebGL-animated column that does not fit a
  // share image, and the avatar here is a canvas a snapshot would lose.
  async function share() {
    if (sharing !== "idle") return;
    setSharing("busy");
    try {
      // The veil reveals itself over a beat, and that finished frame is what an
      // exporter can read, so the capture waits for the signal. The timer is
      // the floor under it: a photo that never loads still yields a picture.
      await Promise.race([
        new Promise<void>((resolve) => {
          shareSignal.current = resolve;
        }),
        new Promise((resolve) => setTimeout(resolve, 4000)),
      ]);
      await document.fonts.ready;

      const card = shareRef.current;
      if (!card) throw new Error("Share card is not mounted");
      const url = await toPng(card, {
        cacheBust: true,
        pixelRatio: 1,
        width: SHARE_CARD_SIZE,
        height: SHARE_CARD_SIZE,
      });
      const link = document.createElement("a");
      link.href = url;
      link.download = "radea-ai-usage.png";
      link.click();
      setSharing("idle");
    } catch {
      setSharing("failed");
    } finally {
      shareSignal.current = null;
    }
  }

  const values = useMemo(() => {
    // Fixed seed, so the server and the browser render the same grid.
    let s = 42;
    const rand = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: 371 }, () => Math.floor(rand() * rand() * 5));
  }, []);

  const active = RANGES.find((r) => r.key === range)!;
  const cells = values.slice(-active.days);
  const columns = Math.ceil(cells.length / 7);
  const total = cells.reduce((sum, v) => sum + v, 0);

  // The change is read off the same cells that are on screen, comparing the
  // second half of the window against the first. Deriving it means the badge
  // cannot claim growth that the grid does not show, and it moves when the
  // range changes. A flat or shrinking window gets no badge at all, because
  // there is no trend to report.
  const midpoint = Math.floor(cells.length / 2);
  const firstHalf = cells.slice(0, midpoint).reduce((sum, v) => sum + v, 0);
  const secondHalf = cells.slice(midpoint).reduce((sum, v) => sum + v, 0);
  const change =
    firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : null;
  const rising = change !== null && change > 0.5;
  const falling = change !== null && change < -0.5;

  return (
    <>
      <section
        className="animate-rise-in overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      >
      <div className="relative h-28 border-b border-zinc-200 bg-zinc-100 sm:h-36 dark:border-zinc-800 dark:bg-zinc-800">
        <Image
          src="/images/usage-banner.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-12 flex items-end justify-between gap-3 sm:-mt-14">
          <div
            role="img"
            aria-label={personalInfo.name}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white ring-4 ring-white sm:h-28 sm:w-28 dark:bg-zinc-950 dark:ring-zinc-900"
          >
            <DitherVeil
              src="/images/usage-avatar.png"
              fit="contain"
              pattern="floyd"
              pixelSize={1.5}
              inkColor={isDark ? "#09090b" : "#18181b"}
              paperColor={isDark ? "#fafafa" : "#ffffff"}
              contrast={1.35}
              revealRadius={70}
              softness={0.7}
              linger={1.2}
              wander
            />
          </div>

          <div className="flex flex-col items-end gap-1 pb-1">
            <button
              type="button"
              onClick={share}
              disabled={sharing === "busy"}
              data-cuelume-tap=""
              className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              {sharing === "busy" ? (
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-300"
                />
              ) : (
                <Share2 className="h-3.5 w-3.5" />
              )}
              {sharing === "busy" ? t.usage.exporting : t.usage.share}
            </button>
            {sharing === "failed" && (
              <p role="status" className="text-[11px] text-red-600 dark:text-red-400">
                {t.usage.exportFailed}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {personalInfo.name}
          </h1>
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-zinc-900 dark:bg-zinc-100">
            <Check className="h-3 w-3 text-white dark:text-zinc-900" strokeWidth={3} />
          </span>
        </div>
        <p className="mt-0.5 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-mono">@radea</span>
          <span className="rounded-md bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white dark:bg-zinc-100 dark:text-zinc-900">
            PRO
          </span>
        </p>

        <div className="mt-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.usage.contributions}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100">
              {total}
            </span>
            {rising || falling ? (
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none ${
                  rising
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {`${change! > 0 ? "+" : ""}${change!.toFixed(1)}%`}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/60">
          <span className="w-4 h-4 shrink-0 text-zinc-700 dark:text-zinc-300">
            <OpenAILogo />
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {FAVORITE_MODEL.label}
          </span>
          <span className="ml-auto text-[11px] text-zinc-500 dark:text-zinc-400">
            {t.usage.favoriteProvider}
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {USAGE_STATS.map((stat) => (
            <div
              key={stat.key}
              className="animate-rise-in rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/60"
            >
              <dd className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                {stat.prefix}
                <CountUp to={stat.value} separator="," duration={2} />
              </dd>
              <dt className="mt-0.5 text-[11px] leading-tight text-zinc-500 dark:text-zinc-400">
                {t.usage.stats[stat.key]}
              </dt>
              {stat.note && (
                <p className="mt-0.5 text-[10px] leading-tight text-zinc-400 dark:text-zinc-500">
                  {t.usage.stats[stat.note]}
                </p>
              )}
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.usage.activity}</p>
          <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800">
            {RANGES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRange(r.key)}
                aria-pressed={range === r.key}
                className={`rounded-md px-2.5 py-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
                  range === r.key
                    ? "bg-white font-medium text-zinc-900 shadow-2xs dark:bg-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t.usage[r.label]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-x-auto no-scrollbar">
          <div
            key={range}
            className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${columns}, 11px)` }}
          >
            {cells.map((v, i) => (
              <span
                key={i}
                className={`animate-cell-in h-[11px] w-[11px] rounded-[2px] ${LEVELS[v]}`}
                style={{ animationDelay: `${Math.floor(i / 7) * 22}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
      </section>

      <ShareCard cardRef={shareRef} onReady={() => shareSignal.current?.()} />
    </>
  );
}