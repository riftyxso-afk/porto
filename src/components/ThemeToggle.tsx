"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Reveal the new theme as a circle growing from the toggle button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement.style;
    root.setProperty("--theme-x", `${x}px`);
    root.setProperty("--theme-y", `${y}px`);
    root.setProperty("--theme-r", `${radius}px`);

    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      data-cuelume-select=""
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
    >
      <svg
        viewBox="0 0 31 31"
        className="w-4 h-4 fill-current transition-transform duration-300"
      >
        <path d="M15.5 0c-8.6 0-15.5 6.9-15.5 15.5 0 8.6 6.9 15.5 15.5 15.5 8.6 0 15.5-6.9 15.5-15.5 0-8.6-6.9-15.5-15.5-15.5m0 28.1l0-25.2c7 0 12.6 5.6 12.6 12.6 0 7-5.6 12.6-12.6 12.6" />
      </svg>
    </button>
  );
}
