import type { Metadata } from "next";
import { Caveat, Pirata_One } from "next/font/google";
import "./globals.css";
import CursorSerpent from "@/src/components/effects/CursorSerpent";

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
  description: "A full stack developer portfolio — built like an ancient pirate map.",
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
      <body className="flex flex-col">
        
        {children}
      </body>
    </html>
  );
}
