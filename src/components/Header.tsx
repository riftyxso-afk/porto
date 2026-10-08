"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { personalInfo } from "@/data/portfolioData";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
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

export function Header() {
  return (
    <header className="w-full pt-12 sm:pt-14 pb-5 px-4 relative">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-start">
        {/* Avatar with face centered */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            width={96}
            height={96}
            unoptimized
            className="w-full h-full object-cover object-[center_35%] scale-125"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1.5 pt-0.5 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-[27px] leading-8 font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
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

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-xl">
            Junior full-stack developer from Bali. I build web apps with React and Next.js,
            and I&apos;m working on my own products,{" "}
            <a
              href="https://portalink.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500 hover:decoration-zinc-800 dark:hover:decoration-zinc-200 font-medium"
            >
              Portalink
            </a>{" "}
            and Whip.
          </p>
        </div>
      </div>
    </header>
  );
}
