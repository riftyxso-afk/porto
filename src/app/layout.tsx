import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Figtree, Bricolage_Grotesque, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/i18n/config";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Static, and deliberately not `generateMetadata`. The language lives in a
// cookie, and asking `generateMetadata` to read one would make Next stream the
// metadata into the body after the initial HTML, which is exactly where a
// link-preview scraper that does not run JavaScript will not look. The share
// preview is therefore always the English one, which is the page's primary
// language anyway. The provider updates the title in the visitor's own tab
// after they switch.
export const metadata: Metadata = {
  title: "I Wayan Radea — Junior Full-Stack Developer",
  description:
    "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm working on my own products, Portalink and Whip.",
  keywords: [
    "I Wayan Radea",
    "Portfolio",
    "Junior Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portalink",
    "Whip",
  ],
  authors: [{ name: "I Wayan Radea", url: "https://radzzz.my.id" }],
  metadataBase: new URL("https://radzzz.my.id"),
  openGraph: {
    title: "I Wayan Radea — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm working on my own products, Portalink and Whip.",
    url: "https://radzzz.my.id",
    siteName: "I Wayan Radea",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner_share.png",
        width: 2048,
        height: 768,
        alt: "I Wayan Radea — Junior Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Wayan Radea — Junior Full-Stack Developer",
    description:
      "Junior full-stack developer from Bali. I build web apps with React and Next.js, and I'm working on my own products, Portalink and Whip.",
    images: ["/banner_share.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read once per request so the first HTML is already in the visitor's
  // language. Without this the page would render English, the reader would
  // press the toggle, and the text they saw first would have been wrong for as
  // long as the bundle took to hydrate.
  //
  // Reading a request-time API is what opts these routes into dynamic
  // rendering. On a portfolio of four pages that costs nothing worth measuring.
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${figtree.variable} ${bricolage.variable} ${caveat.variable} ${geistMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-zinc-50/50 dark:bg-zinc-950 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <LanguageProvider initialLocale={locale}>
              {children}
            </LanguageProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
