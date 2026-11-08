import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chizz Bizz — Burger Atelier · Lahore",
  description:
    "Chizz Bizz is a burger atelier in Gulberg, Lahore. Dry-aged beef, hand-cut truffle fries, stone-baked pizza and midnight shakes — plated like couture.",
  keywords: [
    "Chizz Bizz",
    "luxury burger Lahore",
    "burger atelier",
    "MM Alam Road restaurant",
    "gourmet pizza Lahore",
  ],
  openGraph: {
    title: "Chizz Bizz — Burger Atelier",
    description:
      "Dry-aged beef, hand-cut truffle fries and stone-baked pizza. The art of indulgence, in Gulberg, Lahore.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070605",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}
