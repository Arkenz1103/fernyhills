import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

const HERO_IMAGE = "/images/image_3a9a9a.jpg";
// Used only if HERO_IMAGE is missing from /public, so the hero never renders a broken image.
const HERO_FALLBACK = "/images/clinic-1.jpg";
// Focal point for object-cover: keeps the hands-on lower back assessment in frame as the photo crops.
const HERO_FOCUS = "object-[60%_28%]";

/**
 * Light hero: the photo is anchored to the right edge of the screen and dissolves leftwards
 * into the off-white background behind the copy (on small screens it sits on top and fades downwards).
 */
export default function Hero() {
  const heroSrc = existsSync(join(process.cwd(), "public", HERO_IMAGE)) ? HERO_IMAGE : HERO_FALLBACK;

  return (
    <section aria-labelledby="hero-heading" className="hero relative isolate overflow-hidden bg-slate-50">
      {/* Photo + fade */}
      <div className="relative h-80 overflow-hidden sm:h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[68%]">
        <Image
          src={heroSrc}
          alt="A physiotherapist assessing a patient's lower back"
          fill
          preload
          sizes="(min-width:1024px) 68vw, 100vw"
          className={`hero-media size-full object-cover ${HERO_FOCUS}`}
        />
        {/* Small screens: dissolve downwards into the copy */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-slate-50)_0%,rgb(248_250_252/0.75)_22%,rgb(248_250_252/0.15)_50%,transparent_70%)] lg:hidden"
        />
        {/* Large screens: solid off-white at the photo's left edge, fully clear across the right side */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-slate-50)_0%,rgb(248_250_252/0.85)_8%,rgb(248_250_252/0.45)_18%,rgb(248_250_252/0.12)_30%,transparent_42%)] lg:block"
        />
      </div>

      {/* Copy */}
      <div className="container-x relative pt-2 pb-16 sm:pb-20 lg:flex lg:min-h-[min(44rem,calc(100svh-7.5rem))] lg:items-center lg:py-24">
        <div className="hero-enter max-w-xl">
          <p className="flex items-center gap-3 text-lg font-bold tracking-[0.2em] text-brand-blue uppercase">
            <span aria-hidden className="hero-accent h-0.5 w-8 rounded-full bg-brand-cyan" />
            Physiotherapist in Ferny Hills
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.035em] text-brand-ink"
          >
            80 Years of Dedicated Care and{" "}
            <span className="bg-linear-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Treatment.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed font-medium text-brand-ink">
            Our goal is to teach you how to carry out your treatment in the future to maintain your overall wellness.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact-us" className="btn btn-primary group w-full sm:w-auto">
              Contact Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          <p className="mt-7 flex items-center gap-2.5 text-lg font-medium text-brand-ink">
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {keepTogether(site.hours)}
          </p>
        </div>
      </div>

    </section>
  );
}
