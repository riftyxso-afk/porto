import React from "react";
import { stackCategories } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { TechIcon } from "./TechIcon";

export function Stack() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Stack" />

      <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
        {stackCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col sm:flex-row items-stretch border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
          >
            {/* Category title column with dashed border on the right */}
            <div className="w-full sm:w-44 shrink-0 px-4 py-3 sm:py-3.5 flex items-center gap-2.5 border-b sm:border-b-0 sm:border-r sm:border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent">
              <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500">
                {cat.number}
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {cat.category}
              </span>
            </div>

            {/* Badges container */}
            <div className="flex-1 p-3 sm:py-3 sm:px-4 flex flex-wrap gap-2 items-center">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-50/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <TechIcon name={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
