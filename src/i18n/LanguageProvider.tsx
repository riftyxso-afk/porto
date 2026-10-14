"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_LABEL,
  LOCALE_NAME,
  LOCALES,
  otherLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

// One year. A language choice is a preference, not a session: someone who reads
// in Indonesian should not land back on English the next day.
const MAX_AGE = 60 * 60 * 24 * 365;

interface LanguageValue {
  locale: Locale;
  t: Dictionary;
  /** The locale one press of the toggle moves to. */
  target: Locale;
  targetLabel: string;
  targetName: string;
  setLocale: (next: Locale) => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

/**
 * Reads the language once on the client and hands it to every component below.
 *
 * The layout passes the same locale it rendered with, so the first client render
 * agrees with the server HTML and there is no hydration mismatch. After that the
 * toggle changes state in place: no navigation, no remount, so the canvas on the
 * playground page keeps its signature and the decrypt animation is never cut off
 * halfway through.
 */
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);

    // Screen readers pick the voice and pronunciation off this attribute, and a
    // language switch that leaves it behind makes English text read in Indonesian
    // rules or the other way round.
    document.documentElement.lang = next;

    // Written by the reader rather than by a server action, so it must not be
    // httpOnly. One year, site-wide, and not Secure so it survives a plain http
    // visit during development.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${MAX_AGE}; samesite=lax`;

    // The document title and description ship with the server HTML in one
    // language. Leaving them stale after the reader switches would show the old
    // language in the browser tab and in the share sheet, so they follow here.
    const t = getDictionary(next);
    document.title = t.meta.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description) description.content = t.meta.description;
  }, []);

  const value = useMemo<LanguageValue>(() => {
    const target = otherLocale(locale);
    return {
      locale,
      t: getDictionary(locale),
      target,
      targetLabel: LOCALE_LABEL[target],
      targetName: LOCALE_NAME[target],
      setLocale,
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be called inside LanguageProvider");
  }
  return value;
}

/** Shorthand for the common case of only needing the dictionary. */
export function useT(): Dictionary {
  return useLanguage().t;
}

export { DEFAULT_LOCALE, LOCALES, LOCALE_LABEL, LOCALE_NAME, otherLocale };
export type { Locale };