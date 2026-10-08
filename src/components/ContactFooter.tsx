import React from "react";
import { personalInfo } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { Mail, FileText } from "lucide-react";

export function ContactFooter() {
  return (
    <footer className="w-full relative">
      <SectionHeader title="Contact" />

      <div className="p-4 flex flex-col items-start gap-4">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-lg">
          Open to junior full-stack roles and freelance projects. The fastest way to reach
          me is email.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors shadow-2xs"
          >
            <Mail className="w-4 h-4" />
            <span>Email me</span>
          </a>

          <a
            href="/IWayanRadea_CV_Updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors shadow-2xs"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>

          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors shadow-2xs"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.88a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
