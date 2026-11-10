import Image from "next/image";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Block, Cta } from "@/lib/pages";
import { site, serviceAreas } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SplitSection({
  eyebrow,
  heading,
  paragraphs,
  cta,
  image,
  reverse,
  className,
}: Extract<Block, { type: "split" }> & { className?: string }) {
  return (
    <section className={cn("py-20 sm:py-24", className)}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={cn("relative", reverse && "lg:order-2")}>
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-linear-to-br from-brand-teal/25 to-brand-blue/10" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
            <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {heading && <h2 className={cn("heading", eyebrow && "mt-3")}>{heading}</h2>}
          <div className={cn("prose-body", heading && "mt-6")}>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {cta && <CtaButton cta={cta} className="mt-8" />}
        </div>
      </div>
    </section>
  );
}

export function BannerSection({
  heading,
  cta,
  image,
  children,
}: {
  heading: string;
  cta: Cta;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-x py-6">
      <div className="relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center shadow-card-hover sm:px-12 sm:py-20">
        <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-brand-teal/85 via-brand-teal-bright/75 to-brand-blue/85" />
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {heading}
        </h2>
        {children}
        <CtaButton cta={cta} variant="light" className="mt-8" />
      </div>
    </section>
  );
}

export function CtaSection({ heading, paragraphs, cta }: { heading: string; paragraphs: string[]; cta: Cta }) {
  return (
    <section className="pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-blue px-6 py-14 shadow-card-hover sm:px-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-teal-bright/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl" />
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{heading}</h2>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-white/85">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <CtaButton cta={cta} variant="light" />
            <a
              href={site.phoneHref}
              className="btn btn-ghost"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConditionsGrid({ heading, intro, items }: Extract<Block, { type: "conditions" }>) {
  return (
    <section className="bg-brand-light py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading">{heading}</h2>
          <p className="mt-4 text-lg text-slate-700">{intro}</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="group flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-3 shadow-card ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="flex flex-1 items-start gap-2 pr-2 font-display font-bold text-brand-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-bright" aria-hidden />
                {item.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PageBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "split":
            return <SplitSection key={i} {...block} />;
          case "banner":
            return <BannerSection key={i} {...block} />;
          case "cta":
            return <CtaSection key={i} {...block} />;
          case "conditions":
            return <ConditionsGrid key={i} {...block} />;
        }
      })}
    </>
  );
}

export function AreasWeService() {
  return (
    <section className="border-t border-slate-100 bg-white pt-12 pb-16 sm:pt-14">
      <div className="container-x">
        <div className="text-center">
          <h2 className="heading">Areas We Service</h2>
          <p className="eyebrow mt-3 justify-center">Physiotherapy</p>
        </div>
        <ul className="reveal-group mt-10 flex flex-wrap justify-center gap-2.5">
          {serviceAreas.map((area, i) => (
            <li key={`${area.name}-${i}`}>
              <a
                href={area.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-teal-bright hover:bg-brand-light hover:text-brand-blue"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-teal-bright" aria-hidden />
                {area.name} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
