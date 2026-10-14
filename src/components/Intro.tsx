"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DecryptedText from "./DecryptedText";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

// The ring is traced once the text above it has finished, and only then. Hover
// does not exist on touch screens, so the trigger is the text settling rather
// than a pointer. A fresh page load draws it again.
function RingLink({
  href,
  children,
  ready,
  stroke,
}: {
  href: string;
  children: React.ReactNode;
  ready: boolean;
  stroke: "ring" | "highlight";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-tap=""
      className={`link-circle font-medium text-zinc-900 dark:text-zinc-100 ${stroke === "highlight" ? "link-highlight" : ""} ${ready ? "is-drawn" : ""}`}
    >
      <svg
        className="link-circle-ring"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse cx="50" cy="20" rx="48" ry="18" pathLength="1" />
      </svg>
      {children}
    </a>
  );
}

export function Intro() {
  const { locale, t } = useLanguage();
  const intro = t.intro;

  // Paragraphs reveal one after another, so the rings wait for the last one.
  // Each paragraph is recorded by index, so a repeated completion from a re-run
  // cannot count the same paragraph twice and open the rings early.
  const [finished, setFinished] = useState<Set<number>>(() => new Set());
  const allRevealed = finished.size >= intro.length;

  const markFinished = (i: number) =>
    setFinished((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

  // The first load plays the ScrollReveal blur-in. Once the reader switches
  // language, each paragraph is decrypted into the new text instead. `swapped`
  // stays true from then on, so the decrypt is the only motion after a switch.
  const [swaps, setSwaps] = useState(0);
  const swapped = swaps > 0;
  // The locale this component mounted with. The effect below compares against it
  // so the reveal reset only runs on a real switch, not on the first render.
  const firstLocale = useRef(locale);

  // Paragraphs decrypt in reading order, and the segments inside one cascade a
  // little behind each other. The stagger is what makes it read as a wave
  // travelling down the paragraph rather than several blocks blinking at once.
  const PARAGRAPH_STAGGER = 260;
  const SEGMENT_STAGGER = 130;

  // Per-character tick. Sequential reveal is the whole reason this looks slow and
  // smooth: the letters resolve left to right instead of the whole line
  // flickering. At 13ms a 300-character paragraph takes about four seconds, which
  // is the pace that reads as considered rather than glitchy.
  const DECRYPT_SPEED = 13;

  const decryptMs = useMemo(() => {
    const longest = Math.max(
      ...intro.map((p) => Math.max(...p.map((seg) => seg.text.length))),
    );
    const lastDelay = (intro.length - 1) * PARAGRAPH_STAGGER;
    return lastDelay + longest * DECRYPT_SPEED + 400;
  }, [intro]);

  // Switching language starts the rings over, so they wait for the new text the
  // way they waited for the old.
  useEffect(() => {
    if (firstLocale.current === locale) return;
    setFinished(new Set());
    setSwaps((n) => n + 1);
  }, [locale]);

  // DecryptedText does not report when it finishes, so after a switch the rings
  // open once the longest paragraph has had time to decrypt. The timer is
  // cleared on the next switch, so a stale one cannot open the rings on the new
  // text.
  useEffect(() => {
    if (!swapped) return;
    const timer = setTimeout(() => {
      setFinished(new Set(intro.map((_, i) => i)));
    }, decryptMs);
    return () => clearTimeout(timer);
  }, [swaps, swapped, intro, decryptMs]);

  return (
    <div className="w-full px-4 pb-6 flex flex-col gap-4">
      {intro.map((paragraph, i) =>
        swapped ? (
          // The key must not carry the locale. Keying it there remounts the
          // paragraph on every switch, and a fresh DecryptedText swallows its
          // first replay, which is exactly the switch the reader asked for.
          <p
            key={i}
            className="text-[15px] sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl"
          >
            {paragraph.map((seg, j) => (
              <React.Fragment key={j}>
                {seg.href ? (
                  <RingLink
                    href={seg.href}
                    ready={allRevealed}
                    stroke={seg.highlight ? "highlight" : "ring"}
                  >
                    <DecryptedText
                      text={seg.text}
                      animateOn="replay"
                      replayKey={swaps}
                      delay={i * PARAGRAPH_STAGGER + j * SEGMENT_STAGGER}
                      sequential
                      revealDirection="start"
                      speed={DECRYPT_SPEED}
                    />
                  </RingLink>
                ) : (
                  <DecryptedText
                    text={seg.text}
                    animateOn="replay"
                    replayKey={swaps}
                    delay={i * PARAGRAPH_STAGGER + j * SEGMENT_STAGGER}
                    sequential
                    revealDirection="start"
                    speed={DECRYPT_SPEED}
                  />
                )}
                {seg.logo && (
                  <Image
                    src={seg.logo}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="inline-block w-4 h-4 ml-1 align-[-2px] rounded-sm object-contain"
                  />
                )}
              </React.Fragment>
            ))}
          </p>
        ) : (
          <ScrollReveal
            key={i}
            playOnLoad
            revealDelay={i * 1.2}
            baseOpacity={0}
            baseRotation={2}
            blurStrength={6}
            wordAnimationEnd="bottom center"
            onRevealComplete={() => markFinished(i)}
            textClassName="text-[15px] sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl"
          >
            {paragraph.map((seg, j) => (
              <React.Fragment key={j}>
                {seg.href ? (
                  <RingLink
                    href={seg.href}
                    ready={allRevealed}
                    stroke={seg.highlight ? "highlight" : "ring"}
                  >
                    {seg.text}
                  </RingLink>
                ) : (
                  seg.text
                )}
                {seg.logo && (
                  <Image
                    src={seg.logo}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="inline-block w-4 h-4 ml-1 align-[-2px] rounded-sm object-contain"
                  />
                )}
              </React.Fragment>
            ))}
          </ScrollReveal>
        ),
      )}
    </div>
  );
}
