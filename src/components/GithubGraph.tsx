"use client";

import React, { useMemo } from "react";
import { SectionHeader } from "./SectionDivider";

export function GithubGraph() {
  const months = [
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];

  // Deterministic contribution grid mimicking the exact pattern
  const grid = useMemo(() => {
    const weeks = 52;
    const days = 7;
    const data: number[][] = [];

    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let w = 0; w < weeks; w++) {
      const weekDays: number[] = [];
      for (let d = 0; d < days; d++) {
        const r = rand();
        let level = 0;
        if (r > 0.8) level = 4;
        else if (r > 0.6) level = 3;
        else if (r > 0.4) level = 2;
        else if (r > 0.2) level = 1;
        weekDays.push(level);
      }
      data.push(weekDays);
    }
    return data;
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-zinc-200 dark:bg-zinc-800";
      case 2:
        return "bg-zinc-400 dark:bg-zinc-600";
      case 3:
        return "bg-zinc-600 dark:bg-zinc-400";
      case 4:
        return "bg-zinc-900 dark:bg-zinc-100";
      default:
        return "bg-zinc-100 dark:bg-zinc-800/40";
    }
  };

  return (
    <section className="w-full relative">
      <SectionHeader title="GitHub" />

      <div className="p-4 flex flex-col gap-3">
        {/* Overflow scroll container for the heatmap with smooth touch scrolling */}
        <div className="w-full overflow-x-auto pb-2 scroll-smooth [overscroll-behavior-x:contain]">
          <div className="min-w-[660px] flex flex-col gap-2">
            {/* Months row */}
            <div className="flex justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500 pr-2 select-none">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {grid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      title={`Activity level: ${level}`}
                      className={`w-[9px] h-[9px] rounded-[2px] transition-colors ${getCellColor(
                        level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-normal">550 contributions in the last year</span>

          <div className="flex items-center gap-1.5 font-mono">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-200 dark:bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-600 dark:bg-zinc-400" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900 dark:bg-zinc-100" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
