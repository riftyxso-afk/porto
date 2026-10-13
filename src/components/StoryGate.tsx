"use client";

import { play } from "cuelume";
import React, { useEffect, useRef, useState } from "react";
import BlurText from "./BlurText";
import { story } from "@/data/content";

// StoryGate writes "ready" onto the document once the story has finished
// animating in. The dock sits outside this component (it has to, so its
// position:fixed is not captured by the fading wrapper), so it watches that
// flag instead of sharing state through context.
export const STORY_READY_ATTRIBUTE = "data-story-ready";

// Two gates, in order:
//  1. "armed" turns on only after the story has scrolled up to the top half of
//     the screen, so the animation never begins on a fresh load.
//  2. "revealed" turns on when the last word finishes animating; only then do
//     the sections below and the dock appear.
export function StoryGate({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Pulling the root's bottom edge up to the mid-line makes the trigger mean
    // "the story has reached the reader", not merely "is somewhere on screen".
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Without motion there is no animation to wait for, so nothing would ever
  // reveal. Show the story and the rest of the page straight away.
  useEffect(() => {
    if (reduced) setRevealed(true);
  }, [reduced]);

  // One cue for the whole reveal, fired once as the last word settles. A cue per
  // word would fire 44 times and wear the sound out.
  const reveal = () => {
    setRevealed(true);
    play("open", { emphasis: "subtle" });
  };

  useEffect(() => {
    document.documentElement.toggleAttribute(STORY_READY_ATTRIBUTE, revealed);
    return () => document.documentElement.removeAttribute(STORY_READY_ATTRIBUTE);
  }, [revealed]);

  return (
    <>
      {/* BlurText stays mounted so its height is reserved and nothing below it
          jumps. While it is not armed its words sit at opacity 0. */}
      <div ref={wrapperRef} className="w-full px-4 pb-8">
        {reduced ? (
          <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            {story}
          </p>
        ) : (
          <BlurText
            text={story}
            enabled={armed}
            delay={90}
            animateBy="words"
            direction="bottom"
            stepDuration={0.45}
            threshold={0}
            className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400"
            onAnimationComplete={reveal}
          />
        )}
      </div>

      <div
        inert={!revealed}
        className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}