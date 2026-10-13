"use client";

import React, { useState, useEffect, useRef } from "react";
import { play } from "cuelume";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "./SoundToggle";
import DitherVeil from "./DitherVeil";
import { personalInfo } from "@/data/portfolioData";
import { tagline } from "@/data/content";

const titles = [
  "Junior Full-Stack Developer",
  "React & Next.js Specialist",
  "Product Builder (Portalink · Whip)",
  "AI Agent & LLM Developer",
  "Freelance Web Developer",
];

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);

        // The title swaps every 2.8s forever, so it stays silent. One faint cue
        // on the first swap is enough to notice the rotation without nagging.
        if (first.current) first.current = false;
        else play("select", { emphasis: "subtle", volume: 0.35 });
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-5 overflow-hidden flex items-center">
      <span
        className={`text-xs sm:text-sm font-normal text-zinc-500 dark:text-zinc-400 transition-all duration-300 ease-out transform truncate ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {titles[index]}
      </span>
    </div>
  );
}

function DitherAvatar() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      role="img"
      aria-label={personalInfo.name}
      className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950"
    >
      <DitherVeil
        src="/images/avatar-dither.png"
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
  );
}

export function Header() {
  return (
    <header className="w-full pt-12 sm:pt-14 pb-5 px-4 relative">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <SoundToggle />
        <ThemeToggle />
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-start">
        {/* Avatar with face centered */}
        <DitherAvatar />

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1.5 pt-0.5 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] sm:text-[42px] leading-tight font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {personalInfo.name}
            </h1>
            {/* Verified checkmark badge */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-zinc-900 dark:text-zinc-100 fill-current shrink-0"
              aria-label="Verified"
            >
              <path d="M24 12c-0.05-1.68-1.04-3.2-2.56-3.91 0.58-1.58 0.21-3.36-0.95-4.58-1.22-1.16-3-1.53-4.58-0.95-0.71-1.53-2.23-2.52-3.91-2.56-1.68 0.04-3.19 1.04-3.9 2.56-0.78-0.29-1.62-0.35-2.43-0.18-0.81 0.17-1.56 0.56-2.16 1.13-0.57 0.6-0.96 1.35-1.12 2.16-0.17 0.81-0.1 1.65 0.18 2.42-1.53 0.71-2.53 2.23-2.58 3.91 0.05 1.68 1.05 3.2 2.58 3.91-0.58 1.58-0.22 3.35 0.94 4.58 1.22 1.15 2.99 1.52 4.58 0.95 0.71 1.53 2.23 2.52 3.91 2.56 1.68-0.04 3.2-1.04 3.91-2.56 1.58 0.62 3.38 0.25 4.58-0.95 1.2-1.2 1.57-3 0.95-4.58 1.53-0.71 2.52-2.23 2.56-3.91zm-13.71 4.92l-4.38-4.38 1.65-1.66 2.65 2.65 5.62-6.12 1.72 1.59-7.26 7.92z" />
            </svg>
          </div>

          {/* Smoothly Rotating Title */}
          <RotatingTitle />

          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
