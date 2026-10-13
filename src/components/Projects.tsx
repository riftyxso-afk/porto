import React from "react";
import { projectList } from "@/data/content";
import { SectionHeader } from "./SectionDivider";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Projects" count={projectList.length} />

      <ul className="flex flex-col gap-1">
        {projectList.map((proj) => (
          <li key={proj.id}>
            <a
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-tap=""
              className="group p-4 flex items-start justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {proj.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/80">
                    {proj.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {proj.description}
                </p>
              </div>

              <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
