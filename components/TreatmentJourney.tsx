import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import type { Block } from "@/lib/pages";

type Props = Extract<Block, { type: "journey" }>;

/**
 * Treatment approach: the four steps listed in order on a numbered rail, beside a photo.
 * Static: no scroll pinning or animation.
 */
export default function TreatmentJourney({ eyebrow, heading, steps, note, cta, image }: Props) {
  const pad = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section aria-labelledby="journey-heading" className="bg-brand-pale py-20 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        {/* Copy + step rail */}
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="journey-heading" className="heading mt-3">
            {heading}
          </h2>

          <ol className="relative mt-9">
            {steps.map((step, i) => (
              <li key={step.label} className="relative pb-6 pl-11 last:pb-0 sm:pb-7 sm:pl-16">
                {/* Connector to the next step */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-8 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-brand-cyan/40 sm:top-10 sm:left-5"
                  />
                )}
                <span className="absolute top-0 left-0 grid size-8 place-items-center rounded-full border-2 border-brand-cyan bg-brand-cyan text-xs font-bold text-white sm:size-10 sm:text-sm">
                  {pad(i)}
                </span>
                <p className="pt-1.5 text-xs font-semibold tracking-[0.18em] text-brand-blue uppercase sm:pt-2">
                  {step.label}
                </p>
                <h3 className="mt-1.5 font-display text-xl leading-snug font-bold text-brand-ink sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-lg leading-[1.7] text-brand-body">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-xl border-l-4 border-brand-cyan pl-4 leading-relaxed font-medium text-brand-blue sm:pl-5">
            {note}
          </p>
          <CtaButton cta={cta} className="mt-7" />
        </div>

        {/* Photo */}
        <div className="relative">
          <div className="absolute -inset-2 rotate-1 rounded-[2rem] bg-linear-to-br from-brand-teal/25 to-brand-blue/10 sm:-inset-3 sm:rotate-2" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-card-hover">
            <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
