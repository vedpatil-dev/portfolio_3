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
  title: "Ved Patil | Developer Portfolio",
  description: `I'm Ved Patil, a Full Stack Developer who enjoys building software and continuously learning how great products are designed and engineered.

My journey into software development started with a curiosity about how applications work behind the scenes. Over time, that curiosity evolved into a passion for creating reliable, scalable, and user-focused solutions.

Throughout my experience, I have worked across the frontend, backend, databases, deployment, and development workflows. More importantly, I have learned that software engineering is not just about writing code—it's about solving problems, collaborating with people, understanding requirements, and continuously improving through feedback and experience.

I enjoy exploring new technologies, optimizing existing solutions, and taking on challenges that push me to grow as a developer. Whether it's building features, debugging complex issues, improving performance, or learning a new concept, I see every project as an opportunity to become a better engineer.

Currently, I am focused on strengthening my expertise in full-stack development, software architecture, and building applications that create meaningful value for users.`,
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
              "@type": "Person",
              "name": "Ved Patil",
              "jobTitle": "Full Stack Developer",
              "url": "https://vedpatil.in",
              "sameAs": [
                "https://github.com/vedpatil-dev",
                "https://linkedin.com/in/vedpatil-dev"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Madhuben And Bhanubhai Patel Institute of Technology"
              }
            })
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
