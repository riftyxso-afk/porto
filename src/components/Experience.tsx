"use client";

import React, { useState } from "react";
import Image from "next/image";
import { experiences } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { ChevronDown, Code2 } from "lucide-react";

const companyLogos: Record<string, string> = {
  "freelance-web-dev": "/images/SrV1X.png",
};

export function Experience() {
  const [expandedId, setExpandedId] = useState<string>(
    experiences[0]?.id || ""
  );

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="w-full relative">
      <SectionHeader title="Experience" />

      <div className="p-4 flex flex-col gap-6">
        {experiences.map((exp) => {
          const isExpanded = expandedId === exp.id;
          const logoSrc = companyLogos[exp.id];

          return (
            <div key={exp.id} className="relative flex flex-col">
              {/* Company & Location header */}
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                    {logoSrc ? (
                      <Image
                        src={logoSrc}
                        alt={exp.company}
                        width={24}
                        height={24}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-300">
                        {exp.company[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {exp.company}
                  </h3>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {exp.location}
                </span>
              </div>

              {/* Timeline container */}
              <div className="relative">
                {/* Curved tree line: vertical stem that curves 90° right into the tags */}
                <div className="absolute left-[11px] top-0 bottom-[11px] w-4 border-l border-b border-zinc-200 dark:border-zinc-800 rounded-bl-lg pointer-events-none" />

                {/* Role and content indented */}
                <div className="pl-7 flex flex-col">
                  {/* Role button */}
                  <button
                    onClick={() => toggle(exp.id)}
                    className="w-full text-left p-1 rounded-lg hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors flex flex-col gap-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                          <Code2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                          {exp.role}
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-2 pl-8 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>{exp.type}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">|</span>
                      <span>{exp.period}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">|</span>
                      <span>{exp.duration}</span>
                    </div>
                  </button>

                  {/* Bullet points (expanded only) */}
                  {isExpanded && exp.points && (
                    <div className="pl-8 pr-2 pt-2 pb-1">
                      <ul className="flex flex-col gap-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-zinc-400 select-none">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills tags row (curve terminates right here) */}
                  <div className="pl-8 pt-2.5 flex flex-wrap gap-1.5 items-center">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
