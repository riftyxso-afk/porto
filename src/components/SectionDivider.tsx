import React from "react";

export function SectionHeader({
  title,
  count,
}: {
  title: string;
  count?: number | string;
}) {
  return (
    <div className="w-full px-4 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-[20px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ({count})
          </span>
        )}
      </div>
    </div>
  );
}
