import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/75">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:gap-10 lg:py-20">
        {/* Brand */}
        <div>
          <Link href="/" aria-label={`${site.name} – Home`} className="inline-block rounded-2xl bg-white p-3">
            <Image src="/images/logo.webp" alt={site.name} width={240} height={148} className="h-16 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">{site.footerAbout}</p>
          <a
            href={site.yellowPagesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-white p-1.5 opacity-90 transition hover:opacity-100"
          >
            <Image src="/images/yellow-pages.png" alt="Find us on Yellow Pages" width={88} height={87} className="h-10 w-auto" />
          </a>
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="text-sm font-bold tracking-[0.14em] text-white uppercase">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-bold tracking-[0.14em] text-white uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={site.phoneHref} className="flex gap-3 transition hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
                <span className="font-semibold text-white">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex gap-3 transition hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
                <span className="min-w-0 break-all">{site.email}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
              <address className="not-italic">{site.address}</address>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-sm font-bold tracking-[0.14em] text-white uppercase">Hours</h2>
          <p className="mt-5 flex gap-3 text-sm">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
            <span className="text-white">{keepTogether(site.hours)}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © 2026 Ferny Hills Physiotherapy ·{" "}
            <a href={site.privacyPolicyUrl} className="hover:text-white hover:underline">
              Privacy Policy
            </a>
          </p>
          <p>
            Website design and hosting by{" "}
            <a
              href="https://waynai.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 hover:text-white hover:underline"
            >
              WaynAI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
