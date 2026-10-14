"use client";

import Image from "next/image";
import DitherVeil from "@/components/DitherVeil";
import { personalInfo } from "@/data/portfolioData";
import { FAVORITE_MODEL, USAGE_STATS, formatUsage } from "@/data/usageData";
import { useT } from "@/i18n/LanguageProvider";
import { OpenAILogo } from "./ModelLogos";

// Square, because a square is the one shape every platform crops safely, and a
// stats card has no tall subject to fill a 9:16 frame. The card is authored at
// its final pixel size so the export never depends on the screen it ran on.
export const SHARE_CARD_SIZE = 1080;

const counts = USAGE_STATS.filter((stat) => !stat.footer);
const cost = USAGE_STATS.find((stat) => stat.footer);

// The card is mounted off-screen for its whole life so its photos are already
// decoded when Share is pressed. It is aria-hidden and inert to pointer events,
// so it is never announced and never hit-tested.
export function ShareCard({
  cardRef,
  onReady,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  onReady: () => void;
}) {
  const t = useT();

  return (
    <div
      aria-hidden="true"
      style={{
        // Parked off-screen, never shown. The wrapper carries the offset so the
        // capture root itself stays free of positioning: html-to-image copies
        // the root's own left/top into the image, and a parked root would land
        // outside the exported frame.
        position: "fixed",
        left: -SHARE_CARD_SIZE * 10,
        top: 0,
        pointerEvents: "none",
      }}
    >
      <div
        ref={cardRef}
        style={{ width: SHARE_CARD_SIZE, height: SHARE_CARD_SIZE }}
        className="flex flex-col overflow-hidden bg-zinc-950 text-zinc-100"
      >
        <div className="relative h-80 shrink-0">
          <Image
            src="/images/usage-banner.webp"
            alt=""
            fill
            unoptimized
            priority
            sizes={`${SHARE_CARD_SIZE}px`}
            className="object-cover"
          />
          {/* The banner hands off to the body without a hard seam. */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-zinc-950" />
        </div>

        <div className="flex flex-1 flex-col px-20 pb-14">
          <div className="-mt-[100px] flex items-end gap-10">
            <div className="h-[220px] w-[220px] shrink-0 overflow-hidden rounded-full bg-zinc-900 ring-[10px] ring-zinc-950">
              <DitherVeil
                src="/images/usage-avatar.png"
                fit="contain"
                pattern="floyd"
                pixelSize={1.5}
                inkColor="#09090b"
                paperColor="#fafafa"
                contrast={1.35}
                revealRadius={70}
                softness={0.7}
                linger={1.2}
                capture
                onReady={onReady}
              />
            </div>

            <div className="min-w-0 flex-1 pb-6">
              <p className="text-[56px] font-semibold leading-[1.05] tracking-tight">
                {personalInfo.name}
              </p>
              <p className="mt-3 flex items-center gap-4 text-[26px] text-zinc-400">
                <span className="font-mono">@radea</span>
                <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-[18px] leading-none text-zinc-950">
                  PRO
                </span>
              </p>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-5 rounded-2xl bg-zinc-900 px-7 py-5">
            <span className="h-8 w-8 shrink-0 text-zinc-100">
              <OpenAILogo />
            </span>
            <span className="text-[30px] font-medium leading-none">
              {FAVORITE_MODEL.label}
            </span>
            <span className="ml-auto text-[22px] leading-none text-zinc-500">
              {t.usage.favoriteProvider}
            </span>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-5">
            {counts.map((stat) => (
              <div key={stat.key} className="rounded-2xl bg-zinc-900 px-7 py-5">
                <dd className="text-[40px] font-semibold leading-none tabular-nums">
                  {stat.prefix}
                  {formatUsage(stat.value)}
                </dd>
                <dt className="mt-3 text-[22px] leading-none text-zinc-500">
                  {t.usage.stats[stat.key]}
                </dt>
              </div>
            ))}
          </dl>

          {/* The cost is the number people repeat, so it closes the card on the
              widest row instead of competing with the counts. */}
          {cost && (
            <div className="mt-auto flex items-end justify-between gap-8 border-t border-zinc-800 pt-10">
              <div>
                <p className="text-[24px] leading-none text-zinc-500">
                  {t.usage.stats[cost.key]}
                </p>
                {cost.note && (
                  <p className="mt-3 text-[18px] leading-none text-zinc-600">
                    {t.usage.stats[cost.note]}
                  </p>
                )}
              </div>
              <p className="text-[64px] font-semibold leading-none tabular-nums">
                {cost.prefix}
                {cost.value.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}