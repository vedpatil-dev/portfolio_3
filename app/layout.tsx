import type { Metadata } from "next";
import { EB_Garamond, IM_Fell_English_SC, Caveat } from "next/font/google";
import "./globals.css";
import CursorSerpent from "@/src/components/effects/CursorSerpent";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const imFell = IM_Fell_English_SC({
  variable: "--font-im-fell",
  subsets: ["latin"],
  weight: ["400"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Ved Patil | Developer Portfolio",
  description: "A developer portfolio inspired by an ancient magical diary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${imFell.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CursorSerpent />
        {children}
      </body>
    </html>
  );
}

