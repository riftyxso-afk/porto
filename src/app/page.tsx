import React from "react";
import { Header } from "@/components/Header";
import { SocialNav } from "@/components/SocialNav";
import { InfoBar } from "@/components/InfoBar";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Education } from "@/components/Education";
import { GithubGraph } from "@/components/GithubGraph";
import { ContactFooter } from "@/components/ContactFooter";
import { SectionDivider } from "@/components/SectionDivider";
import { FloatingAskBar } from "@/components/FloatingAskBar";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-x-clip bg-white dark:bg-zinc-950">
      {/* Central 768px Portfolio Column */}
      <main className="w-full max-w-[768px] bg-white dark:bg-zinc-900 border-x-0 sm:border-x border-zinc-200 dark:border-zinc-800 relative flex flex-col my-0 pb-16">
        {/* Profile Header */}
        <Header />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Social Navigation with 'follow me' annotation */}
        <SocialNav />

        {/* Continuous horizontal line between Nav and InfoBar */}
        <div className="hidden sm:block w-screen absolute left-1/2 -translate-x-1/2 h-[1px] bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

        {/* Status & Live Info */}
        <InfoBar />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Experience Section */}
        <Experience />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Projects Showcase */}
        <Projects />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Tech Stack */}
        <Stack />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Education */}
        <Education />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* GitHub Heatmap */}
        <GithubGraph />

        {/* Diagonal Hatch Stripe Bar */}
        <SectionDivider />

        {/* Contact & Footer */}
        <ContactFooter />
      </main>

      {/* Floating Ask Pill */}
      <FloatingAskBar />
    </div>
  );
}
