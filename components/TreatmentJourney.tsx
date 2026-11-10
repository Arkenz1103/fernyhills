"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import type { Block, JourneyArt } from "@/lib/pages";
import { cn } from "@/lib/utils";

type Props = Extract<Block, { type: "journey" }>;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Share of the pinned scroll spent wiping the photo away (0.12 = first half of step 1) */
const WIPE_END = 0.12;

/**
 * Scroll-driven treatment story.
 * Desktop: the section pins in place; as you scroll, a line drops down the step rail,
 * the active step's text opens out, and that step's line drawing sketches itself in.
 * Mobile: steps stack normally and the rail fills as you scroll past them.
 */
export default function TreatmentJourney({ eyebrow, heading, steps, note, cta, image }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const artRefs = useRef<(SVGGElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const n = steps.length;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      let wipe = 0;
      if (desktop.matches) {
        // Progress through the pinned scroll distance (the stage pins below the sticky header)
        const stage = section.querySelector<HTMLElement>("[data-stage]");
        const pinTop = stage ? parseFloat(getComputedStyle(stage).top) || 0 : 0;
        const travel = rect.height - (stage?.offsetHeight ?? vh);
        p = travel > 0 ? clamp((pinTop - rect.top) / travel) : 1;
        // The photo wipes away over the first part of step 1, revealing the drawings
        wipe = clamp(p / WIPE_END);
      } else {
        p = clamp((vh * 0.65 - rect.top) / rect.height);
      }
      section.style.setProperty("--p", p.toFixed(4));
      section.style.setProperty("--wipe", wipe.toFixed(4));

      const idx = Math.min(n - 1, Math.floor(p * n));
      setActive(idx);
      artRefs.current.forEach((g, i) => {
        if (!g) return;
        // Step 1 draws while the photo wipes away; later steps sketch in over the
        // first 70% of their own scroll, then hold.
        const t = reduced
          ? 1
          : i === 0
            ? clamp((p - WIPE_END * 0.3) / (1 / n - WIPE_END * 0.3))
            : clamp((p - i / n) / (0.7 / n));
        g.style.setProperty("--t", t.toFixed(4));
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
    };
  }, [steps.length]);

  const pad = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="no-reveal relative bg-brand-pale lg:h-[420svh]"
      style={{ "--p": 0, "--wipe": 0 } as CSSProperties}
    >
      <div
        data-stage
        className="py-20 sm:py-24 lg:sticky lg:top-24 lg:flex lg:h-[calc(100svh-6rem)] lg:items-center lg:py-8"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
          {/* Copy + step rail */}
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="journey-heading" className="heading mt-3">
              {heading}
            </h2>

            <ol className="relative mt-9">
              {steps.map((step, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={step.label} className="relative pb-6 pl-11 last:pb-0 sm:pb-5 sm:pl-16">
                    {/* Connector to the next step: a cyan line drops down it as you scroll through this step */}
                    {i < steps.length - 1 && (
                      <>
                        <span aria-hidden className="absolute top-8 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-brand-blue/15 sm:top-10 sm:left-5" />
                        <span
                          aria-hidden
                          className="absolute top-8 bottom-0 left-4 w-0.5 origin-top -translate-x-1/2 bg-brand-cyan sm:top-10 sm:left-5"
                          style={{ scale: `1 clamp(0, calc(var(--p) * ${steps.length} - ${i}), 1)` }}
                        />
                      </>
                    )}
                    <span
                      className={cn(
                        "absolute top-0 left-0 grid size-8 place-items-center rounded-full border-2 text-xs font-bold transition-colors duration-500 sm:size-10 sm:text-sm",
                        on || done
                          ? "border-brand-cyan bg-brand-cyan text-white"
                          : "border-brand-blue/25 bg-white text-brand-blue",
                      )}
                    >
                      {pad(i)}
                    </span>
                    <p
                      className={cn(
                        "pt-1.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-500 sm:pt-2",
                        on ? "text-brand-cyan" : "text-brand-blue",
                      )}
                    >
                      {step.label}
                    </p>
                    {/* Dropdown: the active step opens out (all open on mobile) */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] lg:grid-rows-[0fr] lg:opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <h3 className="mt-1.5 font-display text-xl leading-snug font-bold text-brand-ink sm:text-2xl">{step.title}</h3>
                        <p className="mt-2 max-w-xl text-lg leading-[1.7] text-brand-body">{step.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-8 max-w-xl border-l-4 border-brand-cyan pl-4 font-medium sm:pl-5 leading-relaxed text-brand-blue">
              {note}
            </p>
            <CtaButton cta={cta} className="mt-7" />
          </div>

          {/* One frame: the photo shows first, then wipes away on scroll to reveal the line drawings (desktop) */}
          <div className="relative">
            <div className="absolute -inset-2 rotate-1 rounded-[2rem] bg-linear-to-br sm:-inset-3 sm:rotate-2 from-brand-teal/25 to-brand-blue/10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-card-hover">
              {/* Line art layer (sits under the photo) */}
              <div aria-hidden className="dot-grid absolute inset-0 hidden opacity-40 lg:block" />
              <svg
                viewBox="0 0 520 420"
                className="draw-art absolute inset-x-0 top-4 bottom-14 hidden h-[calc(100%-4.5rem)] w-full lg:block"
                role="img"
                aria-label={`${steps[active].label} illustration`}
              >
                {steps.map((step, i) => (
                  <g
                    key={step.art}
                    ref={(el) => {
                      artRefs.current[i] = el;
                    }}
                    className={cn("transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")}
                    style={{ "--t": 0 } as CSSProperties}
                  >
                    {ART[step.art]}
                  </g>
                ))}
              </svg>
              {/* Chapter label + scrubber, like a story timeline */}
              <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between gap-6 border-t border-brand-blue/10 px-7 py-4 lg:flex">
                <p className="font-mono text-xs tracking-[0.2em] text-brand-blue uppercase">
                  {pad(active)} · {steps[active].label}
                </p>
                <div aria-hidden className="relative h-1 w-40 overflow-hidden rounded-full bg-brand-blue/10">
                  <span className="absolute inset-0 origin-left scale-x-(--p) rounded-full bg-brand-cyan" />
                </div>
              </div>

              {/* Photo layer: wipes upward as --wipe goes 0 → 1 */}
              <div className="absolute inset-0 [clip-path:inset(0_0_calc(var(--wipe,0)*100%)_0)]">
                <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              {/* Soft cyan edge riding the wipe line */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 hidden h-1 bg-brand-cyan shadow-[0_0_18px_rgba(22,139,180,0.6)] lg:block"
                style={{
                  bottom: "calc(var(--wipe, 0) * 100%)",
                  opacity: "calc(min(var(--wipe, 0) * 20, 1) * min((1 - var(--wipe, 0)) * 20, 1))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Line drawings (viewBox 520 x 420) ----------
   Every shape uses pathLength=1; --d staggers when it starts drawing. */

function D({ d, delay = 0, accent }: { d: string; delay?: number; accent?: boolean }) {
  return <path d={d} pathLength={1} className={accent ? "acc" : undefined} style={{ "--d": delay } as CSSProperties} />;
}
function C({ cx, cy, r, delay = 0, accent }: { cx: number; cy: number; r: number; delay?: number; accent?: boolean }) {
  return (
    <circle cx={cx} cy={cy} r={r} pathLength={1} className={accent ? "acc" : undefined} style={{ "--d": delay } as CSSProperties} />
  );
}
function R(props: { x: number; y: number; w: number; h: number; rx?: number; delay?: number; accent?: boolean }) {
  const { x, y, w, h, rx = 8, delay = 0, accent } = props;
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      pathLength={1}
      className={accent ? "acc" : undefined}
      style={{ "--d": delay } as CSSProperties}
    />
  );
}

/** Spine: vertebrae following a gentle S-curve */
const VERTEBRAE = Array.from({ length: 8 }, (_, i) => {
  const y = 62 + i * 40;
  const x = 260 + 18 * Math.sin(((y - 40) / 360) * Math.PI * 2);
  return { x: Math.round(x), y };
});
/** Smooth line through the centre of every vertebra (midpoint quadratic curves) */
const SPINE_LINE = (() => {
  const pts = [{ x: 260, y: 30 }, ...VERTEBRAE, { x: 260, y: 400 }];
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q${pts[i].x},${pts[i].y} ${mx},${my}`;
  }
  return d + ` L${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
})();
/** Therapy arcs either side of the spine (hands-on mobilisation) */
const arc = (r: number, side: 1 | -1) => {
  const dx = Math.round(r * Math.cos(Math.PI / 6));
  const dy = Math.round(r * Math.sin(Math.PI / 6));
  return `M${260 + side * dx},${220 - dy} A${r},${r} 0 0 ${side === 1 ? 1 : 0} ${260 + side * dx},${220 + dy}`;
};

const ART: Record<JourneyArt, ReactNode> = {
  // 01 Assessment: clipboard checklist + magnifier
  assess: (
    <>
      <R x={140} y={70} w={220} h={300} rx={20} />
      <D d="M205,70 V54 a12,12 0 0 1 12,-12 h66 a12,12 0 0 1 12,12 V70" delay={0.08} />
      {[150, 220, 290].map((y, i) => (
        <g key={y}>
          <R x={176} y={y - 15} w={30} h={30} rx={7} delay={0.14 + i * 0.1} />
          <D d={`M183,${y} l7,8 l13,-16`} delay={0.3 + i * 0.1} accent />
          <D d={`M228,${y - 5} H322 M228,${y + 8} H290`} delay={0.2 + i * 0.1} />
        </g>
      ))}
      <C cx={372} cy={292} r={46} delay={0.36} accent />
      <D d="M405,325 L448,368" delay={0.46} accent />
    </>
  ),
  // 02 Collaboration: you, your physio and your health team, connected
  team: (
    <>
      <C cx={260} cy={190} r={34} />
      <D d="M184,310 Q260,196 336,310" delay={0.06} />
      <C cx={110} cy={206} r={26} delay={0.12} />
      <D d="M56,300 Q110,208 164,300" delay={0.18} />
      <C cx={410} cy={206} r={26} delay={0.16} />
      <D d="M356,300 Q410,208 464,300" delay={0.22} />
      <D d="M60,334 H460" delay={0.28} />
      <D d="M142,190 Q182,150 222,172" delay={0.34} accent />
      <D d="M298,172 Q338,150 378,190" delay={0.38} accent />
      <D d="M260,92 V128 M242,110 H278" delay={0.44} accent />
    </>
  ),
  // 03 Treatment: spine with hands-on mobilisation
  treat: (
    <>
      <D d={SPINE_LINE} />
      {VERTEBRAE.map((v, i) => (
        <R key={v.y} x={v.x - 34} y={v.y - 14} w={68} h={28} rx={12} delay={0.06 + i * 0.04} />
      ))}
      {[100, 140, 180].map((r, i) => (
        <g key={r}>
          <D d={arc(r, -1)} delay={0.36 + i * 0.05} accent />
          <D d={arc(r, 1)} delay={0.36 + i * 0.05} accent />
        </g>
      ))}
    </>
  ),
  // 04 Recovery: climbing back up, arms raised
  recover: (
    <>
      <D d="M60,380 H150 V320 H240 V260 H330 V200 H440" />
      <C cx={392} cy={84} r={20} delay={0.14} />
      <D d="M392,104 L388,160" delay={0.2} />
      <D d="M360,120 L390,116 L420,92" delay={0.26} />
      <D d="M388,160 L372,200 M388,160 L408,200" delay={0.3} />
      <D d="M80,300 Q200,190 320,120" delay={0.38} accent />
      <D d="M302,114 L322,119 L314,138" delay={0.48} accent />
    </>
  ),
};
