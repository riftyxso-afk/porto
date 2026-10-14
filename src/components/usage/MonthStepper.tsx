"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function MonthStepper({
  month,
  onChange,
}: {
  month: number;
  onChange: (month: number) => void;
}) {
  const t = useT();
  // Wraps at both ends, so the chart can always be walked either direction.
  const step = (delta: number) => onChange((month + delta + 12) % 12);

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label={t.usage.previousMonth}
        className="grid h-7 w-7 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-[6.5rem] text-center text-xs font-medium text-zinc-700 dark:text-zinc-200">
        {t.usage.months[month]}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label={t.usage.nextMonth}
        className="grid h-7 w-7 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}