"use client";

import React, { useEffect, useRef, useState } from "react";
import { Gamepad2, Gauge, Coins, type LucideIcon } from "lucide-react";
import { STORY_READY_ATTRIBUTE } from "./StoryGate";

interface DockItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// TODO: replace each "#" with the real URL for the playground, benchmark, and usage pages.
const items: DockItem[] = [
  { label: "Playground AI", href: "#", icon: Gamepad2 },
  { label: "Benchmark AI", href: "#", icon: Gauge },
  { label: "Usage AI", href: "#", icon: Coins },
];

// Icons grow toward the pointer within RANGE px, peaking at MAX_SCALE. The
// hover-only growth is skipped for touch so a tap never leaves a scaled icon.
const MAX_SCALE = 1.4;
const RANGE = 110;

// StoryGate marks the document once the story has finished animating; the dock
// is mounted outside StoryGate so its fixed positioning is not captured by the
// fading wrapper around the sections, so it watches that flag.
function useStoryReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setReady(root.hasAttribute(STORY_READY_ATTRIBUTE));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: [STORY_READY_ATTRIBUTE],
    });
    return () => observer.disconnect();
  }, []);

  return ready;
}

export function Dock({ visible }: { visible?: boolean }) {
  const revealed = useStoryReady();
  const shown = visible ?? revealed;
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setScales(
      refs.current.map((el) => {
        if (!el) return 1;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
        const proximity = Math.max(0, 1 - distance / RANGE);
        return 1 + (MAX_SCALE - 1) * proximity;
      }),
    );
  };

  const onPointerLeave = () => setScales(items.map(() => 1));

  return (
    <nav
      aria-label="AI tools"
      aria-hidden={!shown}
      inert={!shown}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),12px)] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="pointer-events-auto flex items-end gap-2 px-3 py-2 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-lg"
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              data-cuelume-tap=""
              style={{
                transform: `scale(${scales[i]})`,
                transformOrigin: "50% 100%",
              }}
              className="group relative w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-[transform,background-color,color] duration-150 ease-out shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400"
            >
              <Icon className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
