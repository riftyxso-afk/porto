import React from "react";
import { SectionHeader } from "./SectionDivider";
import { currentlyBuilding } from "@/data/content";

export function CurrentlyBuilding() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Currently building" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentlyBuilding.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.status}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>

            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors break-all"
              >
                {item.href.replace("https://", "")}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
