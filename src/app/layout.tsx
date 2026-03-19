import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import ThemeToggle from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Teknamin Labs",
    template: "%s — Teknamin Labs"
  },
  description: SITE.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    title: "Teknamin Labs",
    description: SITE.description,
    url: SITE.url
  }
};

const themeInitScript = `
(() => {
  try {
    const key = "teknamin-theme";
    const stored = window.localStorage.getItem(key);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark"
      ? stored
      : (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    // no-op
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE.url}/#teknamin-labs`,
              name: SITE.name,
              url: SITE.url,
              foundingDate: "2015",
              description: SITE.description,
              founder: {
                "@type": "Person",
                "@id": `${SITE.founderUrl}/#aravind-ravi`,
                name: SITE.founderName,
                url: SITE.founderUrl
              },
              sameAs: SITE.sameAs
            })
          }}
        />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
