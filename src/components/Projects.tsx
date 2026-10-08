import React from "react";
import Image from "next/image";
import { projects } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Projects" count={projects.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`p-4 flex flex-col gap-3 group relative ${
              idx >= 2 ? "border-t border-zinc-200 dark:border-zinc-800" : ""
            }`}
          >
            {/* Outer container with padding & perspective */}
            <div className="w-full h-52 sm:h-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-3 overflow-hidden relative shadow-2xs flex items-center justify-center [perspective:1000px]">
              {/* Floating tilted browser window mockup */}
              <div className="w-[108%] h-[115%] bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-zinc-900/5 dark:shadow-black/40 flex flex-col transition-all duration-500 ease-out [transform:rotateX(10deg)_rotateY(-10deg)_rotateZ(1.5deg)_scale(1.02)] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)_rotateZ(0.5deg)_scale(1.06)]">
                {/* Browser window top bar */}
                <div className="h-5 px-2.5 bg-zinc-100/90 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-[140px]">
                    {proj.link ? proj.link.replace("https://", "") : proj.title.toLowerCase() + ".app"}
                  </span>
                  <div className="w-6" />
                </div>

                {/* Screenshot inside mockup */}
                <div className="w-full flex-1 relative bg-white dark:bg-zinc-950 overflow-hidden">
                  {proj.imageSrc ? (
                    <Image
                      src={proj.imageSrc}
                      alt={proj.title}
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xl text-zinc-400">
                      {proj.title}
                    </div>
                  )}
                </div>
              </div>

              {/* External link button */}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${proj.title}`}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-700/90 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors z-20 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Project Details */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {proj.title}
                  </h3>
                  {proj.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                </div>

                {proj.metric && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                    {proj.metric}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {proj.description}
              </p>

              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-500 pt-1">
                {proj.technologies.join(" · ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
