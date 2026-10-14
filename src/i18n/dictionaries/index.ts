import { DEFAULT_LOCALE, isLocale, type Locale } from "../config";
import { en, type Dictionary } from "./en";
import { id } from "./id";

// Both dictionaries ship to the browser, because switching language must not
// wait on a network round trip: the DecryptedText animation runs on the new text
// the moment the reader presses the toggle, and a fetch would leave it waiting
// with a half-played scramble.
//
// They are small and the site is already shipping WebGL, so the bytes are noise
// next to what is already downloaded. If this ever grows to dozens of languages,
// the switch should go back to fetching from a route handler instead.

const DICTIONARIES: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: string | undefined | null): Dictionary {
  return DICTIONARIES[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export type { Dictionary };