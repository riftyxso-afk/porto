import React from "react";
import { Briefcase, MapPin, Clock, Mail } from "lucide-react";
import { LiveTime } from "./LiveTime";
import { personalInfo } from "@/data/portfolioData";

export function InfoBar() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
        {/* Row 1 Left: Status */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300 font-normal">
              {personalInfo.status}
            </span>
          </div>
        </div>

        {/* Row 1 Right: Location */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm text-zinc-900 dark:text-zinc-100 font-normal">
            {personalInfo.location}
          </span>
        </div>

        {/* Row 2 Left: Local time */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <LiveTime />
        </div>

        {/* Row 2 Right: Email */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-zinc-900 dark:text-zinc-100 hover:underline font-normal"
          >
            {personalInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
