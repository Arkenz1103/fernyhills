"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

const W = 1200;
const STEPS = 160; // points used to draw the curve
const DOTS = 24; // small vertebra dots spaced along it
const AMP = 16; // how bent the line is before it is straightened
const SOFT = 0.12; // width of the bend that eases out just ahead of the tip

/** The spine's resting wave at x (0..1): soft and uneven, flat at both ends */
const wave = (x: number) => AMP * Math.sin(x * Math.PI) * Math.sin(x * Math.PI * 3.2);

/**
 * Back Pain scroll transition between two sections. A faint wavy line with hollow dots (a spine
 * seen from the side) lies across the page. As you scroll, a solid line draws across it from left
 * to right, straightening the spine behind its tip and filling in each dot it passes, led by a
 * glowing dot. Fully tied to scroll in both directions; no pinning. Reduced motion: shown done.
 */
export default function SpineTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const done = el?.querySelector<SVGPathElement>("[data-done]");
    const rest = el?.querySelector<SVGPathElement>("[data-rest]");
    const tip = el?.querySelector<SVGGElement>("[data-tip]");
    const dots = el ? Array.from(el.querySelectorAll<SVGCircleElement>("[data-dot]")) : [];
    if (!el || !done || !rest || !tip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts once the strip is a little way up the screen, finishes a little above the middle
      const p = reduced ? 1 : clamp((vh * 0.85 - rect.top) / (vh * 0.55));
      // Straight behind the tip, easing back into the wave just ahead of it
      const y = (x: number) => wave(x) * smooth(clamp((x - p) / SOFT));

      let dDone = "";
      let dRest = "";
      for (let i = 0; i <= STEPS; i++) {
        const x = i / STEPS;
        const pt = `${(x * W).toFixed(1)},${y(x).toFixed(2)}`;
        if (x <= p) dDone += `${dDone ? "L" : "M"}${pt}`;
        if (x >= p - 1 / STEPS) dRest += `${dRest ? "L" : "M"}${pt}`;
      }
      done.setAttribute("d", dDone || "M0,0");
      rest.setAttribute("d", dRest || `M${W},0`);

      tip.setAttribute("transform", `translate(${(p * W).toFixed(1)} ${y(p).toFixed(2)})`);
      tip.style.opacity = p > 0.005 && p < 0.995 ? "1" : "0";

      dots.forEach((dot, i) => {
        const x = (i + 0.5) / DOTS;
        dot.setAttribute("cy", y(x).toFixed(2));
        dot.dataset.on = x <= p ? "1" : "0";
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="container-x py-4">
      <svg viewBox={`0 -30 ${W} 60`} className="w-full overflow-visible" fill="none">
        {/* Not yet straightened: faint wave */}
        <path
          data-rest
          stroke="var(--color-brand-blue)"
          strokeOpacity={0.22}
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Straightened: solid line drawn by scrolling */}
        <path
          data-done
          stroke="var(--color-brand-cyan)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {Array.from({ length: DOTS }, (_, i) => (
          <circle
            key={i}
            data-dot
            cx={((i + 0.5) / DOTS) * W}
            cy={0}
            r={4}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="origin-center fill-white stroke-brand-blue/30 transition-[fill,stroke,scale] duration-300 [transform-box:fill-box] data-[on='1']:scale-125 data-[on='1']:fill-brand-cyan data-[on='1']:stroke-brand-cyan"
          />
        ))}
        {/* Glowing dot leading the line */}
        <g data-tip style={{ opacity: 0 }}>
          <circle r={11} fill="var(--color-brand-cyan)" fillOpacity={0.18} />
          <circle r={5} fill="var(--color-brand-cyan)" />
        </g>
      </svg>
    </div>
  );
}
