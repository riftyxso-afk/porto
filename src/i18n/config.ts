// Which languages this site carries, and the one it falls back to.
//
// The choice is stored in a cookie rather than in the URL. Two reasons, in
// order of weight:
//
//  1. Changing the language must not tear down the page. A locale segment in the
//     path (app/[lang]) unmounts and remounts the whole tree on every switch,
//     which would cut off the DecryptedText animation mid-scramble and throw away
//     the WebGL signature on the playground. A cookie changes nothing about the
//     route, so the animation plays to the end and the canvas survives.
//
//  2. One URL per page keeps the links people already share working. A prefixed
//     site turns every inbound link into a redirect.
//
// The cost is that the language is not visible in the address bar and there is no
// separate URL to send someone. For a portfolio reached through a name rather
// than through a link, that is the cheaper trade. The server still reads the
// cookie and renders the right language into the first HTML, so there is no flash
// of the wrong language and no hydration mismatch.

export const LOCALES = ["en", "id"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The two-letter code each locale shows on its own toggle. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

/** What each language calls itself, written by its own speakers. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

// Read by the layout on every request. The cookie is not httpOnly because the
// toggle writes it from the browser; it carries nothing but a language code.
export const LOCALE_COOKIE = "radea-portfolio:lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === DEFAULT_LOCALE ? "id" : DEFAULT_LOCALE;
}