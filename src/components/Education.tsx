import React from "react";
import { education } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Education" />

      <div className="p-4 flex flex-col gap-6">
        {education.map((edu, idx) => (
          <div key={idx} className="flex flex-col gap-2">
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

            {/* Degree & Field */}
            <div className="pl-8 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span>{edu.degree}</span>
              {edu.field && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span>{edu.field}</span>
                </>
              )}
            </div>

            {/* Course tags (only if courses exist) */}
            {edu.courses && edu.courses.length > 0 && (
              <div className="pl-8 flex flex-wrap gap-1.5 pt-1">
                {edu.courses.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                  >
                    {course}
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
