import type { Metadata } from "next";
import { Figtree, Bricolage_Grotesque, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
