import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
        {children}
      </body>
    </html>
  );
}
