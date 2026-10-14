"use client";

import React from "react";
import { stackCategories } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { TechIcon } from "./TechIcon";
import { useT } from "@/i18n/LanguageProvider";

export function Stack() {
  const t = useT();

  return (
    <section className="w-full relative">
      <SectionHeader title={t.sections.stack} />

      <div className="flex flex-col gap-4">
        {stackCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 px-4"
          >
            {/* Category title column */}
            <div className="w-full sm:w-44 shrink-0 py-1 flex items-center gap-2.5">
              <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500">
                {cat.number}
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {t.stack.categories[cat.id]}
              </span>
            </div>

            {/* Badges container */}
            <div className="flex-1 py-1 flex flex-wrap gap-2 items-center">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
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