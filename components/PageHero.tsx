import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";

export default function PageHero({
  eyebrow,
  title,
  image,
  crumb,
}: {
  eyebrow: string;
  title: string;
  image: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-navy/95 via-brand-blue/85 to-brand-teal/60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,154,178,0.5),transparent_60%)]" />
      <div className="container-x py-20 sm:py-28">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span className="text-white">{crumb}</span>
        </nav>
        <p className="mt-6 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaButton cta={{ label: "Book Online", kind: "book" }} variant="secondary" />
          <CtaButton cta={{ label: "Contact us", kind: "contact" }} variant="ghost" />
        </div>
      </div>
    </section>
  );
}
