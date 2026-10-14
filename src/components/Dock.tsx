"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coins, FolderGit2, Gamepad2, Gauge, House, type LucideIcon } from "lucide-react";
import { STORY_READY_ATTRIBUTE } from "./StoryGate";
import { useT } from "@/i18n/LanguageProvider";

/** The keys under t.dock that name a destination. */
type DockLabel = "home" | "playground" | "benchmark" | "usage" | "recap";

interface DockItem {
  // Which string in the dictionary names this entry. Resolved at render time,
  // so the tooltip and the accessible name follow the language.
  label: DockLabel;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

const items: DockItem[] = [
  { label: "playground", href: "/playground", icon: Gamepad2 },
  { label: "benchmark", href: "/benchmark", icon: Gauge },
  { label: "usage", href: "/usage", icon: Coins },
  { label: "recap", href: "/recap", icon: FolderGit2 },
];

// The landing page is the dock's own home, so the way back to it is offered
// only on the pages that are not it.
const homeItem: DockItem = { label: "home", href: "/", icon: House };

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
  const t = useT();
  const revealed = useStoryReady();
  const shown = visible ?? revealed;
  const pathname = usePathname();
  const entries = useMemo(
    () => (pathname === "/" ? items : [homeItem, ...items]),
    [pathname],
  );
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>([]);

  // Home changes the entry list, so the growth left over from the previous
  // index would land on the wrong icon.
  useEffect(() => setScales([]), [entries]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setScales(
      entries.map((_, i) => {
        const el = refs.current[i];
        if (!el) return 1;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
        const proximity = Math.max(0, 1 - distance / RANGE);
        return 1 + (MAX_SCALE - 1) * proximity;
      }),
    );
  };

  const onPointerLeave = () => setScales([]);

  return (
    <nav
      aria-label={t.dock.quickLinks}
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
        {entries.map((item, i) => {
          const Icon = item.icon;
          const label = t.dock[item.label];
          const style = {
            transform: `scale(${scales[i] ?? 1})`,
            transformOrigin: "50% 100%",
          };
          const className = "group relative w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-[transform,background-color,color] duration-150 ease-out shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400";
          const children = (
            <>
              <Icon className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {label}
              </span>
            </>
          );

          const ref = (el: HTMLAnchorElement | null) => {
            refs.current[i] = el;
          };

          // Only a real off-site URL earns a new tab. A route of this site
          // navigates in place, so the dock does not spawn a duplicate of the
          // page the reader is already on.
          return item.external ? (
            <a
              key={item.href}
              ref={ref}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cuelume-tap=""
              style={style}
              className={className}
            >
              {children}
            </a>
          ) : (
            <Link
              key={item.href}
              ref={ref}
              href={item.href}
              aria-label={label}
              data-cuelume-tap=""
              style={style}
              className={className}
            >
              {children}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}