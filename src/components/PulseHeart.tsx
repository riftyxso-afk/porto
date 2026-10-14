"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

// The visitor's own gesture, kept in their browser so it survives a reload
// instead of resetting and reading as a control that does nothing.
const STORAGE_KEY = "radea-portfolio:heart";

const BURST_MS = 520;

export function PulseHeart() {
  const t = useT();
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const [bursting, setBursting] = useState(false);
  const burstTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      setLiked(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Storage blocked: the button still works for the rest of the session.
    }
  }, []);

  useEffect(() => () => window.clearTimeout(burstTimer.current), []);

  const toggle = () => {
    const next = !liked;
    setLiked(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Same as above, nothing to clean up.
    }

    // The remount on the next render restarts the burst, so it fires on every
    // click rather than only the first.
    window.clearTimeout(burstTimer.current);
    setBurst((n) => n + 1);
    setBursting(true);
    burstTimer.current = window.setTimeout(() => setBursting(false), BURST_MS);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={t.controls.like}
      data-cuelume-toggle=""
      className={`w-11 h-11 flex items-center justify-center rounded-lg border transition-colors shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400 ${
        liked
          ? "border-[var(--action-green)]/45 bg-[var(--action-green)]/10 text-[var(--action-green)]"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
      }`}
    >
      <span
        key={burst}
        className={`inline-flex motion-reduce:animate-none ${
          bursting ? "animate-heart-burst" : liked ? "animate-heart-beat" : ""
        }`}
      >
        <Heart
          className="w-4 h-4"
          fill={liked ? "currentColor" : "none"}
          strokeWidth={liked ? 2.4 : 2}
        />
      </span>
    </button>
  );
}