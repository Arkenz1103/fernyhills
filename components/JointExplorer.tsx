"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Block } from "@/lib/pages";
import { cn } from "@/lib/utils";

type Props = Extract<Block, { type: "joints" }>;

const CYCLE_MS = 5000;

/** 0-based index → "01", "02", … */
const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * "Where does it hurt?": pick a joint to see its common signs and how physio helps.
 * A real clinic photo for each joint crossfades in beside the details.
 * Until the visitor picks one, it slowly cycles through the joints by itself.
 */
export default function JointExplorer({ eyebrow, heading, intro, joints, cta }: Props) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % joints.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [touched, joints.length]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const joint = joints[active];

  return (
    <section aria-labelledby="joints-heading" className="no-reveal container-x py-6">
      <div className="relative isolate overflow-hidden rounded-3xl bg-brand-light px-4 py-12 shadow-card sm:px-12 sm:py-16 lg:px-16">
        <div aria-hidden className="dot-grid absolute -top-10 -left-10 -z-10 h-56 w-56 opacity-70" />
        <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-brand-teal/20 blur-3xl" />

        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="joints-heading" className="heading mt-3">
            {heading}
          </h2>
          <p className="mt-5 leading-relaxed text-brand-body">{intro}</p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo for the selected joint */}
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-linear-to-br from-brand-teal/25 to-brand-blue/10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-blue shadow-card-hover lg:aspect-[5/4]">
              {joints.map((j, i) => (
                <Image
                  key={j.id}
                  src={j.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-700 ease-out",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-ink/80 via-brand-ink/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
                <p key={joint.id} className="joint-swap font-display text-2xl font-bold text-white sm:text-3xl">
                  {joint.name}
                </p>
                <span className="shrink-0 rounded-full bg-brand-ink/70 px-3 py-1.5 font-mono text-xs tracking-[0.2em] text-white backdrop-blur-sm">
                  {pad(active)} / {pad(joints.length - 1)}
                </span>
              </div>

              {/* Countdown to the next joint while it is cycling on its own */}
              {!touched && (
                <span
                  key={`bar-${active}`}
                  aria-hidden
                  className="joint-timer absolute motion-reduce:hidden inset-x-0 bottom-0 h-1 origin-left bg-brand-cyan"
                  style={{ animationDuration: `${CYCLE_MS}ms` }}
                />
              )}
            </div>
          </div>

          {/* Details for the selected joint */}
          <div>
            <ul aria-label="Joints" className="flex flex-wrap gap-2.5">
              {joints.map((j, i) => (
                <li key={j.id}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      i === active
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-brand-blue/25 bg-white text-brand-ink hover:border-brand-blue",
                    )}
                  >
                    {j.name}
                  </button>
                </li>
              ))}
            </ul>

            <div key={joint.id} aria-live="polite" className="joint-swap mt-6 rounded-2xl bg-white p-5 shadow-card sm:p-9">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{joint.name}</h3>
              <p className="mt-3 leading-relaxed text-brand-body">
                <span className="font-semibold text-brand-ink">Common signs: </span>
                {joint.signs}
              </p>

              <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-brand-cyan uppercase">How physio helps</p>
              <ul className="mt-3 space-y-3">
                {joint.helps.map((h) => (
                  <li key={h} className="flex gap-3 text-lg leading-snug text-brand-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-cyan text-white">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              {joint.link && (
                <Link
                  href={joint.link.href}
                  className="group mt-6 inline-flex items-center gap-2 border-b-2 border-brand-cyan pb-0.5 font-semibold text-brand-blue transition-colors hover:border-brand-blue"
                >
                  {joint.link.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </div>

            <CtaButton cta={cta} className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
