"use client";

import React from "react";
import { education } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { GraduationCap } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function Education() {
  const t = useT();

  return (
    <section className="w-full relative">
      <SectionHeader title={t.sections.education} />

      <div className="p-4 flex flex-col gap-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex flex-col gap-2">
            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {edu.institution}
                </h3>
              </div>
              <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                {edu.period}
              </span>
            </div>

            {/* Degree */}
            <div className="pl-8 text-sm text-zinc-600 dark:text-zinc-400">
              {t.education.degree[edu.id]}
            </div>

            {/* Course tags (only if courses exist) */}
            {edu.courses.length > 0 && (
              <div className="pl-8 flex flex-wrap gap-1.5 pt-1">
                {edu.courses.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary)]"
                  >
                    {t.education.courses[course]}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}