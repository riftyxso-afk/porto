"use client";

import { Yellowtail } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import HoloCard from "@/components/holo/HoloCard";
import { Dock } from "@/components/Dock";
import { useT } from "@/i18n/LanguageProvider";
import { renderCardArt } from "./cardArt";
import { MAX_NAME, SignatureStage } from "./SignatureStage";
import type { InkParams } from "./ink";

// A brush script with real thick and thin, because the sheet is revealed along
// the pen's path and a monoline face has nothing for that to travel around. It
// also survives being shrunk into a card frame without turning to mud.
// preloaded off: no other route on this site draws with a script.
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
  preload: false,
});

// The one face on its own, not the full CSS stack the variable carries. The
// variable is "Yellowtail", "Yellowtail Fallback", and asking the font set to
// load that list rejects on the generated fallback face, which used to take the
// real wait down with it and leave the sheet drawing in serif.
const SCRIPT_FAMILY = yellowtail.style.fontFamily;

// The card art is composed from the finished sheet, and composing it costs a
// canvas readback plus two encodes. Running that on every keystroke would make
// typing feel heavy, so it waits for the hand to stop.
const CARD_DELAY = 320;

export function PlaygroundDashboard() {
  const t = useT();
  const [name, setName] = useState("");
  const [replay, setReplay] = useState(0);
  const [sheet, setSheet] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [seedHex, setSeedHex] = useState<string | null>(null);
  const [saved, setSaved] = useState<"idle" | "working" | "done" | "failed">("idle");

  const cardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRun = useRef(0);
  // The card is composed after the delay, by which time the field may have moved
  // on. Reading the name through a ref keeps the composition on the sheet that
  // was actually signed rather than on whatever is typed now.
  const nameRef = useRef(name);
  nameRef.current = name;

  const onSigned = useCallback((dataUrl: string, params: InkParams) => {
    setSheet(dataUrl);
    setSeedHex(params.seedHex);

    const run = ++cardRun.current;
    if (cardTimer.current) clearTimeout(cardTimer.current);
    cardTimer.current = setTimeout(async () => {
      const sans = getComputedStyle(document.body).fontFamily;
      const mono =
        getComputedStyle(document.documentElement).getPropertyValue(
          "--font-geist-mono",
        ) || "monospace";
      try {
        const art = await renderCardArt(
          dataUrl,
          nameRef.current,
          params.seedHex,
          params.seed,
          sans,
          mono,
        );
        // A slower earlier run must not land on top of a newer signature.
        if (run === cardRun.current) setCard(art);
      } catch {
        // The sheet still downloads. Losing the card is not worth putting the
        // whole page into an error state.
      }
    }, CARD_DELAY);
  }, []);

  useEffect(() => {
    return () => {
      if (cardTimer.current) clearTimeout(cardTimer.current);
    };
  }, []);

  const trimmed = name.trim();
  const hasName = trimmed.length > 0;

  function download() {
    if (!sheet || saved === "working") return;
    setSaved("working");
    try {
      const slug =
        trimmed
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || "signature";
      const link = document.createElement("a");
      link.href = sheet;
      link.download = `signature-${slug}.png`;
      link.click();
      setSaved("done");
      setTimeout(() => setSaved("idle"), 2200);
    } catch {
      setSaved("failed");
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {t.playground.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          {t.playground.description}
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_248px] lg:items-start">
        <div className="min-w-0">
          <label htmlFor="playground-name" className="sr-only">
            {t.playground.nameLabel}
          </label>
          <input
            id="playground-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value.slice(0, MAX_NAME));
              setCard(null);
              setSheet(null);
              setSeedHex(null);
              setSaved("idle");
            }}
            placeholder={t.playground.placeholder}
            autoComplete="off"
            spellCheck={false}
            maxLength={MAX_NAME}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:outline-zinc-200"
          />

          <div className="mt-4">
            <SignatureStage
              name={name}
              fontFamily={SCRIPT_FAMILY}
              replay={replay}
              onSigned={onSigned}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={download}
              disabled={!hasName || !sheet || saved === "working"}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:outline-zinc-100"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {saved === "working"
                ? t.playground.preparing
                : saved === "done"
                  ? t.playground.downloaded
                  : saved === "failed"
                    ? t.playground.failed
                    : t.playground.download}
            </button>

            <button
              type="button"
              onClick={() => {
                setSheet(null);
                setCard(null);
                setReplay((n) => n + 1);
              }}
              disabled={!hasName}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t.playground.signAgain}
            </button>

            <p className="font-mono text-xs text-zinc-600 tabular-nums dark:text-zinc-400">
              {trimmed.length}/{MAX_NAME}
            </p>
          </div>
        </div>

        <aside>
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.playground.yourCard}
          </h2>

          <div className="mt-3 flex min-h-[352px] items-center justify-center">
            {card ? (
              <HoloCard
                image={card}
                alt={`${t.playground.cardAlt} ${trimmed}`}
                width={248}
                preset="bursts"
                foilColor="#e2e6ec"
                intensity={0.72}
                glare={0.45}
                frame={4}
                className="text-zinc-900 dark:text-zinc-100"
              />
            ) : (
              <div className="flex h-[352px] w-full max-w-[248px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 px-6 text-center dark:border-zinc-700">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {hasName
                    ? t.playground.signing
                    : t.playground.cardWaiting}
                </p>
              </div>
            )}
          </div>

          <p className="mt-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {t.playground.hand}{" "}
            <span className="text-zinc-900 dark:text-zinc-100">
              {seedHex ? `#${seedHex}` : "#--------"}
            </span>
          </p>
        </aside>
      </div>

      <Dock visible />
    </div>
  );
}