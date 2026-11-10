"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Every section below the banner, except ones with their own animation */
const S = "main section:not(.hero):not(.no-reveal)";

/**
 * What eases in. Keep in step with the "Reveal" rules in globals.css, which hide these
 * from first paint and choose how each one arrives.
 */
const TARGETS = [
  `${S} .container-x > *`,
  `${S}.container-x > *`,
  `${S} li:not(.reveal-group > li)`,
  `${S} .heading`,
  `${S} h2`,
  `${S} img:not(.object-contain)`,
  `${S} .rounded-3xl:has(> img)`,
];

/**
 * Smooth reveal on scroll and on page load: each element eases in once, when it first comes
 * into view, including whatever is already on screen after a refresh. Only runs when the
 * inline script in the layout has set html[data-reveal] (never with reduced motion).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-reveal")) return;

    // Parts of the page can finish hydrating after this layout-level effect runs. Marking an
    // element before React has hydrated it is reported as a hydration mismatch, so wait until
    // every target carries React's fiber key (or stop waiting after ~2s and go ahead).
    let stop = () => {};
    let tries = 0;
    let frame = requestAnimationFrame(function wait() {
      const els = collect();
      if (els.every(isHydrated) || ++tries > 120) stop = watch(els);
      else frame = requestAnimationFrame(wait);
    });
    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, [pathname]);

  return null;
}

const isHydrated = (el: Element) =>
  Object.keys(el).some((k) => k.startsWith("__reactFiber"));

/** Everything on the page still waiting to reveal */
function collect(): HTMLElement[] {
  const els = new Set<HTMLElement>();
  for (const selector of TARGETS) {
    try {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!el.hasAttribute("data-in")) els.add(el);
      });
    } catch {
      // Selector not supported by this browser (e.g. :has): those elements are never hidden
    }
  }
  return [...els];
}

/** Reveal each element as it comes into view; returns a cleanup */
function watch(els: HTMLElement[]): () => void {
  // Items side by side in a row arrive one after another
  els.forEach((el) => {
    if (el.tagName !== "LI" || !el.parentElement) return;
    const i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--reveal-delay", `${(i % 3) * 50}ms`);
  });

  // A data attribute, not a class, so React re-renders and hydration never strip or flag it
  const show = (el: Element) => el.setAttribute("data-in", "");
  if (!("IntersectionObserver" in window)) {
    els.forEach(show);
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        show(e.target);
        io.unobserve(e.target);
      }
    },
    // Start just before an element reaches the screen, so it is already arriving as it appears
    { rootMargin: "0px 0px 5% 0px" },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
