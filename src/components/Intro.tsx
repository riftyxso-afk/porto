"use client";

import React, { useState } from "react";
import Image from "next/image";
import { intro } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

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
  // Paragraphs reveal one after another, so the rings wait for the last one.
  // Each paragraph is recorded by index, so a repeated completion from a re-run
  // cannot count the same paragraph twice and open the rings early.
  const [finished, setFinished] = useState<Set<number>>(() => new Set());
  const allRevealed = finished.size >= intro.length;

  const markFinished = (i: number) =>
    setFinished((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

  return (
    <div className="w-full px-4 pb-6 flex flex-col gap-4">
      {intro.map((paragraph, i) => (
        <ScrollReveal
          key={i}
          playOnLoad
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
                  stroke={seg.text === "Whip" ? "highlight" : "ring"}
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
      ))}
    </div>
  );
}
