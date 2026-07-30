import type { Metadata } from "next";
import { Caveat, Pirata_One } from "next/font/google";
import "./globals.css";
import CursorSerpent from "@/src/components/effects/CursorSerpent";
import Preloader from "@/src/components/layout/Preloader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

// ── Pirate map font — headings, chapter titles, nav labels ──
const pirataOne = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// ── Handwriting font — body text, notes, descriptions ──
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vedpatil.in"),
  title: {
    default: "Ved Patil | Full Stack Developer",
    template: "%s | Ved Patil",
  },
  description:
    "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL. Explore his projects, experience, and software development work.",
  keywords: [
    "Ved Patil",
    "Ved Patil developer",
    "Ved Patil full stack developer",
    "Ved Patil software developer",
    "Ved Patil portfolio",
    "Ved Patil React developer",
    "Ved Patil Java developer",
    "Ved Patil Spring Boot developer",
    "Ved Patil GitHub",
    "Ved Patil Emgage",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Spring Boot",
    "Java",
    "PostgreSQL",
  ],
  authors: [{ name: "Ved Patil", url: "https://vedpatil.in" }],
  creator: "Ved Patil",
  publisher: "Ved Patil",
  alternates: {
    canonical: "https://vedpatil.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vedpatil.in",
    title: "Ved Patil | Full Stack Developer",
    description:
      "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL. Explore his projects, experience, and software development work.",
    siteName: "Ved Patil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Patil | Full Stack Developer",
    description:
      "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${pirataOne.variable} ${caveat.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://vedpatil.in/#person",
                  "name": "Ved Patil",
                  "url": "https://vedpatil.in/",
                  "jobTitle": "Full Stack Developer",
                  "description":
                    "Ved Patil is a Full Stack Developer specializing in React, Next.js, Java, Spring Boot, and PostgreSQL.",
                  "sameAs": [
                    "https://github.com/vedpatil-dev",
                    "https://linkedin.com/in/vedpatil-dev"
                  ],
                  "knowsAbout": [
                    "Full Stack Development",
                    "React",
                    "Next.js",
                    "Java",
                    "Spring Boot",
                    "PostgreSQL",
                    "TypeScript",
                    "JavaScript",
                    "Docker",
                    "REST APIs"
                  ],
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Madhuben And Bhanubhai Patel Institute of Technology"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://vedpatil.in/#website",
                  "url": "https://vedpatil.in/",
                  "name": "Ved Patil",
                  "alternateName": "Ved Patil Portfolio",
                  "publisher": {
                    "@id": "https://vedpatil.in/#person"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="flex flex-col unselectable">
        <Preloader />
        {children}
        <Analytics />
        <SpeedInsights />
        <CursorSerpent />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
