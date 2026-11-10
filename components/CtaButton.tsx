import Link from "next/link";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import type { Cta } from "@/lib/pages";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";

// Sizing and shape come from the shared `btn` utility in globals.css; variants only set colour.
const styles: Record<Variant, string> = {
  primary: "btn-primary",
  secondary:
    "border-brand-cyan bg-brand-cyan text-white shadow-lg shadow-brand-cyan/25 hover:border-brand-teal hover:bg-brand-teal",
  light: "btn-white",
  ghost: "btn-ghost",
};

const arrow = <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />;

export function CtaButton({
  cta,
  variant = "primary",
  className,
}: {
  cta: Cta;
  variant?: Variant;
  className?: string;
}) {
  const base = cn("btn group", styles[variant], className);

  if (cta.kind === "book") {
    return (
      <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={base}>
        <CalendarCheck className="size-5" aria-hidden />
        {cta.label}
        {arrow}
      </a>
    );
  }
  if (cta.kind === "call") {
    return (
      <a href={site.phoneHref} className={base}>
        <Phone className="size-4" aria-hidden />
        {cta.label}
      </a>
    );
  }
  return (
    <Link href="/contact-us" className={base}>
      {cta.label}
      {arrow}
    </Link>
  );
}
