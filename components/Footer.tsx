import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/75">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.25fr] lg:gap-16 lg:py-20">
        {/* Brand: logo, about, directory badge */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} – Home`} className="inline-block rounded-2xl bg-white p-3">
            <Image src="/images/logo.webp" alt={site.name} width={240} height={148} className="h-24 w-auto" />
          </Link>
          <p className="mt-6 max-w-md text-lg leading-relaxed">{site.footerAbout}</p>
          <a
            href={site.yellowPagesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Find us on Yellow Pages"
            className="mt-6 inline-flex size-16 items-center justify-center overflow-hidden rounded-full bg-white transition hover:scale-105"
          >
            <Image src="/images/yellow-pages.png" alt="" width={88} height={87} className="size-full scale-125 object-contain" />
          </a>
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="text-2xl font-bold tracking-tight text-white">
            Quick Links
          </h2>
          <ul className="mt-6 space-y-3.5 text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact details: label above value */}
        <dl className="space-y-6 text-lg">
          <div>
            <dt className="text-white/85">Phone:</dt>
            <dd className="mt-0.5">
              <a href={site.phoneHref} className="font-bold text-sky-300 transition hover:text-white hover:underline hover:underline-offset-4">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/85">Address:</dt>
            <dd className="mt-0.5 font-bold text-white">
              <address className="not-italic">{site.address}</address>
            </dd>
          </div>
          <div>
            <dt className="text-white/85">Email:</dt>
            <dd className="mt-0.5">
              <a href={site.emailHref} className="font-bold break-all text-sky-300 transition hover:text-white hover:underline hover:underline-offset-4">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/85">Hours:</dt>
            <dd className="mt-0.5 font-bold text-white">{keepTogether(site.hours)}</dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            Copyright © 2026 Ferny Hills Physiotherapy ·{" "}
            <a href={site.privacyPolicyUrl} className="hover:text-white hover:underline">
              Privacy Policy
            </a>
          </p>
          <p className="text-sm">
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
