"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Small scroll transition between two sections (after the opening line of consider.digital/story):
 * a single hairline crosses the page with a ripple in the middle, drawing itself left to right
 * as the strip scrolls up the screen, with a dot riding its tip. No pinning, so it never holds
 * up the next section. Reduced motion: drawn straight away.
 */
export default function LineTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const line = el?.querySelector<SVGPathElement>("[data-line]");
    const dot = el?.querySelector<SVGGElement>("[data-dot]");
    if (!el || !line || !dot) return;
    const len = line.getTotalLength();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Draws while the strip travels from the bottom of the screen to just above the middle
      const t = reduced ? 1 : clamp((vh - rect.top) / (vh * 0.65));
      line.style.strokeDashoffset = String(1 - t);
      const pt = line.getPointAtLength(t * len);
      dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      dot.style.opacity = t > 0.01 && t < 0.995 ? "1" : "0";
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
    <div ref={ref} aria-hidden className="container-x py-4 sm:py-6">
      <svg
        viewBox="0 0 1200 100"
        className="w-full overflow-visible"
        fill="none"
      >
        {/* Faint guide the line draws over */}
        <path
          d="M0,50 H1200"
          stroke="var(--color-brand-blue)"
          strokeOpacity={0.12}
          strokeWidth={1}
        />
        <path
          data-line
          pathLength={1}
          d="M0,50 H470 C505,50 512,20 540,20 C568,20 576,80 604,80 C632,80 640,20 668,20 C696,20 704,50 734,50 H1200"
          stroke="var(--color-brand-cyan)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="1 2"
          strokeDashoffset={1}
        />
        <g data-dot style={{ opacity: 0 }}>
          <circle r={9} fill="var(--color-brand-cyan)" fillOpacity={0.18} />
          <circle r={4} fill="var(--color-brand-cyan)" />
        </g>
      </svg>
    </div>
  );
}
