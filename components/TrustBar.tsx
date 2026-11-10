import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { healthFunds } from "@/lib/site";

/** Flat trust strip under the hero: our approach on the left, the health funds we accept on the right. */
export default function TrustBar() {
  return (
    <section aria-label="Why patients choose us" className="border-b border-slate-200 bg-white">
      <div className="container-x flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:gap-10 lg:py-8">
        <div className="flex items-center gap-4 lg:flex-1">
          <HeartHandshake className="size-9 shrink-0 text-brand-teal" strokeWidth={1.5} aria-hidden />
          <p>
            <span className="block font-semibold text-brand-blue">Customised Care</span>
            <span className="mt-0.5 block text-lg">Our Personalised Treatment approach</span>
          </p>
        </div>

        <span aria-hidden className="h-px w-full shrink-0 bg-slate-200 lg:h-16 lg:w-px" />

        <div className="lg:flex-[1.5]">
          <h2 className="relative z-10 text-sm font-semibold tracking-[0.18em] text-brand-blue uppercase">Health funds</h2>
          <ul className="mt-4 flex items-center justify-between gap-3 sm:gap-6">
            {healthFunds.map((fund) => (
              <li key={fund.name} className="relative h-16 w-full max-w-40 overflow-hidden sm:h-24">
                {/* The source logos are square tiles with lots of white padding: fit whole, then enlarge to trim the padding. */}
                <Image src={fund.src} alt={fund.name} fill sizes="(min-width:640px) 160px, 25vw" className="scale-[1.7] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
