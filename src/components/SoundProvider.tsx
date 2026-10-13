"use client";

import { bind, setEnabled } from "cuelume";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "radea-portfolio:sound";

// Cuelume is bound once, at the document root, and its delegated listeners keep
// working as React swaps DOM underneath. Controls announce themselves with
// data-cuelume-* attributes; anything else calls play() directly.
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true);

  useEffect(() => {
    try {
      setEnabledState(window.localStorage.getItem(STORAGE_KEY) !== "off");
    } catch {
      // Storage blocked: sound stays on, and the setting lasts this session only.
    }

    setEnabled(true);
    return bind();
  }, []);

  const toggle = useCallback((next: boolean) => {
    setEnabledState(next);
    setEnabled(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // Nothing to do; the preference is simply not remembered.
    }
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider>
  );
}

const SoundContext = createContext({ enabled: true, toggle: (_next: boolean) => {} });

export function useSound() {
  return useContext(SoundContext);
}