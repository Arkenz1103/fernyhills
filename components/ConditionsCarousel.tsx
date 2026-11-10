"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Block } from "@/lib/pages";
import { cn } from "@/lib/utils";

type Props = Extract<Block, { type: "conditions" }>;

/**
 * "How We Can Help": a horizontal slider of photo cards (swipe, scroll or use the arrows).
 * The track lines up with the page container on the left and runs off the right edge,
 * so the next card always peeks in.
 */
export default function ConditionsCarousel({ heading, intro, items }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  /** Tab the visitor clicked; keeps it highlighted when the slider can't scroll that card to the front (end of the row) */
  const picked = useRef<number | null>(null);

  const updateEnds = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const end = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    setAtStart(t.scrollLeft <= 4);
    setAtEnd(end);

    // Active card = the one closest to the left edge of the row
    const start = t.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    Array.from(t.children).forEach((li, i) => {
      const dist = Math.abs((li as HTMLElement).offsetLeft - parseFloat(getComputedStyle(t).paddingLeft) - start);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    if (end && picked.current !== null && picked.current > nearest) {
      setActive(picked.current);
    } else {
      if (!end) picked.current = null;
      setActive(nearest);
    }
  }, []);

  useEffect(() => {
    updateEnds();
    window.addEventListener("resize", updateEnds);
    return () => window.removeEventListener("resize", updateEnds);
  }, [updateEnds]);

  const goTo = (i: number) => {
    const t = trackRef.current;
    const card = t?.children[i] as HTMLElement | undefined;
    if (!t || !card) return;
    picked.current = i;
    setActive(i);
    t.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(t).paddingLeft), behavior: "smooth" });
  };

  const slide = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector("li");
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    t.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  /** 0-based index → "01", "02", … */
  const pad = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section aria-labelledby="conditions-heading" className="no-reveal bg-brand-ink pt-14 pb-16 sm:pt-16 sm:pb-20">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-teal uppercase">Conditions we treat</p>
          <h2
            id="conditions-heading"
            className="mt-3 font-display text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-[50px]"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg text-white">{intro}</p>
        </div>
        <div className="flex gap-3">
          {(
            [
              [-1, "Previous", ArrowLeft, atStart],
              [1, "Next", ArrowRight, atEnd],
            ] as const
          ).map(([dir, label, Icon, disabled]) => (
            <button
              key={label}
              type="button"
              onClick={() => slide(dir)}
              disabled={disabled}
              aria-label={`${label} conditions`}
              className="grid size-12 place-items-center rounded-full border border-white/40 text-white transition hover:border-white hover:bg-white hover:text-brand-ink disabled:pointer-events-none disabled:opacity-35"
            >
              <Icon className="size-5" aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {/* Every condition at a glance: click a tab to slide to its card */}
      <div className="container-x mt-8">
        <ul aria-label="Conditions" className="flex flex-wrap gap-2.5">
          {items.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                  i === active
                    ? "border-white bg-white text-brand-ink"
                    : "border-white/35 text-white hover:border-white hover:bg-white/10",
                )}
              >
                {item.tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEnds}
        className="relative mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden px-[max(1.5rem,calc((100%-1600px)/2+1.5rem))] scroll-px-[max(1.5rem,calc((100%-1600px)/2+1.5rem))] lg:px-[max(3rem,calc((100%-1600px)/2+3rem))] lg:scroll-px-[max(3rem,calc((100%-1600px)/2+3rem))]"
      >
        {items.map((item, i) => {
          const href = item.href ?? "/contact-us/";
          return (
            <li
              key={item.title}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-6rem)/3.5)] xl:w-[calc((100%-6rem)/3.6)]"
            >
              <Link
                href={href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-brand-blue sm:aspect-square"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 28vw, (min-width:640px) 44vw, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-brand-ink/90 via-brand-ink/25 to-brand-ink/10"
                />
                <div className="absolute top-0 right-0 p-5">
                  <span className="rounded-full bg-brand-ink/70 px-3 py-1.5 font-mono text-xs tracking-[0.2em] text-white backdrop-blur-sm">
                    {pad(i)} / {pad(items.length - 1)}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <h3 className="font-display text-xl leading-snug font-bold text-white sm:text-2xl">{item.title}</h3>
                  <span
                    className={cn(
                      "shrink-0 border-b-2 border-white/70 pb-1 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors",
                      "group-hover:border-brand-teal",
                    )}
                  >
                    {item.href ? "Details" : "Enquire"}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
