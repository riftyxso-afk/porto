import React from "react";

// Junction mark where a full-bleed rule meets the column border. Four short
// arms sit over the crossing, so the corner reads as a deliberate tick rather
// than two lines that happen to touch.
const SIDE_STYLES = {
  left: "left-0 -translate-x-1/2",
  right: "right-0 translate-x-1/2",
} as const;

export function Crosshair({ side }: { side: keyof typeof SIDE_STYLES }) {
  return (
    <span
      aria-hidden="true"
      className={`hidden sm:block absolute top-0 w-[9px] h-[9px] -translate-y-1/2 pointer-events-none select-none ${SIDE_STYLES[side]}`}
    >
      <span className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-zinc-300 dark:bg-zinc-700" />
      <span className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-zinc-300 dark:bg-zinc-700" />
    </span>
  );
}