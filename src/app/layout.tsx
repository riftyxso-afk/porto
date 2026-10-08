import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-zinc-50/50 dark:bg-zinc-950 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
