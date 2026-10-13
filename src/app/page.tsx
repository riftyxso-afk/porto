import React from "react";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { SocialNav } from "@/components/SocialNav";
import { InfoBar } from "@/components/InfoBar";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Stack } from "@/components/Stack";
import { Education } from "@/components/Education";
import { GithubGraph } from "@/components/GithubGraph";
import { ContactFooter } from "@/components/ContactFooter";
import { Dock } from "@/components/Dock";
import { StoryGate } from "@/components/StoryGate";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-x-clip bg-white dark:bg-zinc-950">
      {/* Central 600px Portfolio Column */}
      <main className="w-full max-w-[600px] bg-white dark:bg-zinc-950 relative flex flex-col my-0 pb-28">
        {/* Profile Header */}
        <Header />

        {/* Social links with 'follow me' annotation */}
        <SocialNav />

        {/* Status & Live Info */}
        <InfoBar />

        {/* Intro */}
        <Intro />

        {/* Story is read on scroll; the sections below stay hidden until it is read */}
        <StoryGate>
          {/* Sections are separated by spacing alone */}
          <div className="flex flex-col gap-14 mt-6">
            <CurrentlyBuilding />
            <Experience />
            <Projects />
            <Stack />
            <Education />
            <GithubGraph />
            <ContactFooter />
          </div>
        </StoryGate>
      </main>

      {/* Dock of AI tools, hidden until the story has been read */}
      <Dock />
    </div>
  );
}
