import React from "react";

export function SectionDivider() {
  return (
    <div className="w-full sm:w-screen relative sm:left-1/2 sm:-translate-x-1/2 h-8 shrink-0 border-y border-zinc-200 dark:border-zinc-800 overflow-hidden select-none pointer-events-none">
      {/* Repeating diagonal hatch pattern */}
      <div
        className="w-full h-full opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 7px)",
        }}
      />
    </div>
  );
}

export function SectionHeader({
  title,
  count,
}: {
  title: string;
  count?: number | string;
}) {
  return (
    <div className="w-full px-4 py-3.5 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 relative bg-transparent">
      {/* Subtle full-width extension line on desktop */}
      <div className="hidden sm:block w-screen absolute -top-[1px] left-1/2 -translate-x-1/2 h-[1px] bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

      <div className="flex items-center gap-2">
        <h2 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ({count})
          </span>
        )}
      </div>

      {/* Subtle full-width extension line on desktop */}
      <div className="hidden sm:block w-screen absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[1px] bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
    </div>
  );
}
