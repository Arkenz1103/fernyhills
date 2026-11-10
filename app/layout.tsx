import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

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
    <html lang="en-AU" className={dmSans.variable}>
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
      </body>
    </html>
  );
}
