"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const W = 1200;
const H = 120;
const STEPS = 96;

/** Back to front: wavelength, height, how fast it rolls, colour and strength */
const LAYERS = [
  { len: 520, amp: 12, speed: -1.1, color: "var(--color-brand-blue)", opacity: 0.14 },
  { len: 380, amp: 9, speed: 1.6, color: "var(--color-brand-teal-bright)", opacity: 0.22 },
  { len: 300, amp: 7, speed: -2.2, color: "var(--color-brand-cyan)", opacity: 0.3 },
];

/** Small bubbles: x position, size, and where in their rise they start */
const BUBBLES = [
  { x: 140, r: 3, o: 0.1 },
  { x: 310, r: 2, o: 0.55 },
  { x: 470, r: 3.5, o: 0.3 },
  { x: 640, r: 2.5, o: 0.8 },
  { x: 790, r: 3, o: 0.05 },
  { x: 950, r: 2, o: 0.45 },
  { x: 1080, r: 3, o: 0.7 },
];

/**
 * Hydrotherapy scroll transition between two sections: soft, layered water waves that roll
 * sideways and rise like a pool filling as you scroll, with a few bubbles drifting up through
 * them, fading out at the edges into the page. Tied to scroll both ways; no pinning.
 * Reduced motion: shown filled and still.
 */
export default function WaveTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const waves = Array.from(el.querySelectorAll<SVGPathElement>("[data-wave]"));
    const crest = el.querySelector<SVGPathElement>("[data-crest]");
    const bubbles = Array.from(el.querySelectorAll<SVGCircleElement>("[data-bubble]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts once the strip is a little way up the screen, finishes a little above the middle
      const p = reduced ? 1 : clamp((vh * 0.85 - rect.top) / (vh * 0.55));
      // The water rises from the bottom of the strip to just above its middle
      const level = H - 10 - ease(p) * 62;
      const phase = p * Math.PI * 2;

      const surface = (layer: (typeof LAYERS)[number], i: number, x: number) =>
        level + i * 7 + layer.amp * Math.sin((x / layer.len) * Math.PI * 2 + phase * layer.speed + i);

      let front = "";
      waves.forEach((path, i) => {
        const layer = LAYERS[i];
        let d = "";
        for (let s = 0; s <= STEPS; s++) {
          const x = (s / STEPS) * W;
          d += `${s ? "L" : "M"}${x.toFixed(1)},${surface(layer, i, x).toFixed(2)}`;
        }
        if (i === LAYERS.length - 1) front = d;
        path.setAttribute("d", `${d}L${W},${H}L0,${H}Z`);
      });
      crest?.setAttribute("d", front);

      bubbles.forEach((b, i) => {
        const { x, o } = BUBBLES[i];
        // Each bubble rises from the bottom towards the surface, then starts again
        const k = (p * 1.8 + o) % 1;
        const top = level + 12;
        b.setAttribute("cy", (H - k * (H - top)).toFixed(1));
        b.setAttribute("cx", (x + Math.sin(k * Math.PI * 2) * 6).toFixed(1));
        b.style.opacity = String(p > 0.02 ? Math.sin(k * Math.PI) * 0.8 : 0);
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
    <div ref={ref} aria-hidden className="container-x py-2">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="h-24 w-full sm:h-28">
        <defs>
          {/* Soften the left, right and bottom edges into the page */}
          <linearGradient id="wave-fade-x" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.12" stopColor="white" />
            <stop offset="0.88" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-fade-y" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0.7" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </linearGradient>
          <mask id="wave-mask-x" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill="url(#wave-fade-x)" />
          </mask>
          <mask id="wave-mask-y" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill="url(#wave-fade-y)" />
          </mask>
        </defs>
        <g mask="url(#wave-mask-x)">
        <g mask="url(#wave-mask-y)">
          {LAYERS.map((layer, i) => (
            <path key={i} data-wave fill={layer.color} fillOpacity={layer.opacity} />
          ))}
          {/* Bright line along the front wave's surface */}
          <path
            data-crest
            fill="none"
            stroke="var(--color-brand-cyan)"
            strokeOpacity={0.8}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          {BUBBLES.map((b, i) => (
            <circle
              key={i}
              data-bubble
              cx={b.x}
              cy={H}
              r={b.r}
              fill="white"
              stroke="var(--color-brand-cyan)"
              strokeOpacity={0.9}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              style={{ opacity: 0 }}
            />
          ))}
        </g>
        </g>
      </svg>
    </div>
  );
}
