"use client";

import { useState } from "react";
import { play } from "cuelume";
import DecryptedText from "./DecryptedText";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Switches the page between English and Bahasa Indonesia.
 *
 * The button shows the language it would take you to, not the one already on
 * screen, so the label reads as an action. Pressing it scrambles the old code
 * out and the new one in. That scramble is the only motion attached to the
 * button: it runs off a counter the click bumps, so it cannot start on hover,
 * on scroll, or on first paint.
 */
export function LanguageToggle() {
  const { target, targetLabel, setLocale, t } = useLanguage();
  const [presses, setPresses] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setPresses((n) => n + 1);
        play("select", { emphasis: "subtle", volume: 0.35 });
        setLocale(target);
      }}
      // The visible label is a two-letter code, which tells a screen reader
      // nothing about what pressing it does. The sentence carries that, and
      // t.language.current names what is on screen right now.
      aria-label={`${t.language.switchAction}. ${t.language.now} ${t.language.current}`}
      data-cuelume-select=""
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
    >
      <DecryptedText
        text={targetLabel}
        animateOn="replay"
        replayKey={presses}
        speed={45}
        maxIterations={8}
        parentClassName="block font-mono text-[11px] leading-none font-medium tracking-tight"
        className="text-zinc-900 dark:text-zinc-100"
        encryptedClassName="text-zinc-400 dark:text-zinc-600"
      />
    </button>
  );
}