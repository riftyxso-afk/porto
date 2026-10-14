"use client";

import { Volume2, VolumeX } from "lucide-react";
import { unlock } from "cuelume";
import { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";
import { useT } from "@/i18n/LanguageProvider";

// Sits beside the theme toggle. Waves mean sound is on, a cross means muted.
export function SoundToggle() {
  const { enabled, toggle } = useSound();
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleToggle = async () => {
    const next = !enabled;
    toggle(next);

    // Browsers hold audio until a gesture unlocks it. Trust the result over the
    // toggle's state: if unlock is refused, there is no sound to turn back on.
    if (next) {
      const ready = await unlock();
      if (!ready) toggle(false);
    }
  };

  const className =
    "w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400";

  if (!mounted) {
    return (
      <button aria-label="Sound" className={className} disabled>
        <VolumeX className="w-4 h-4" />
      </button>
    );
  }

  const Icon = enabled ? Volume2 : VolumeX;

  return (
    <button
      onClick={handleToggle}
      aria-pressed={enabled}
      aria-label={enabled ? t.controls.soundOff : t.controls.soundOn}
      data-cuelume-select=""
      className={className}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}