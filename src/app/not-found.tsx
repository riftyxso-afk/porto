import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Server-rendered rather than a client component reading the language context:
// there is no toggle on this page, so the only thing the language is needed for
// is these three strings, and there is no reason to ship a bundle to render a
// page nobody reaches on purpose.
export default async function NotFound() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  const t = getDictionary(isLocale(stored) ? stored : DEFAULT_LOCALE);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-md w-full p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center text-center gap-4">
        <span className="text-6xl font-mono font-bold text-zinc-400">404</span>
        <h1 className="text-xl font-medium">{t.notFound.heading}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.notFound.body}
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.notFound.back}</span>
        </Link>
      </div>
    </div>
  );
}