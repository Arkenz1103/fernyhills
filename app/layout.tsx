import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import "./globals.css";

/**
 * Turns on the scroll/load reveal before first paint, so content waiting to animate in never
 * flashes first. Skipped with reduced motion, or if JavaScript is off, so content always shows.
 */
const revealScript = `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-reveal","")`;

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fernyhillsphysiotherapy.com.au"),
  title: {
    default: "Homepage - fernyhillsphysiotherapy",
    template: "%s - fernyhillsphysiotherapy",
  },
  description:
    "Ferny Hills Physiotherapy is a physiotherapy clinic located at 170 Patricks Road, Ferny Hills QLD, Australia, offering services such as sports rehabilitation, arthritis treatment, back pain management, and hydrotherapy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the reveal script adds data-reveal to <html> before React hydrates
    <html lang="en-AU" className={dmSans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-blue focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
