import Image from "next/image";
import { BadgeCheck, HeartHandshake, type LucideIcon } from "lucide-react";
import { healthFunds } from "@/lib/site";

const highlights: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "80 years", text: "of combined experience" },
  { icon: HeartHandshake, title: "Customised Care", text: "Our Personalised Treatment approach" },
];

/** Short vertical rule between groups (horizontal rule when stacked on small screens). */
function Divider() {
  return <span aria-hidden className="h-px w-full shrink-0 bg-slate-200 xl:h-12 xl:w-px" />;
}

/** Flat trust strip under the hero: experience, approach and the health funds accepted. */
export default function TrustBar() {
  return (
    <section aria-label="Why patients choose us" className="border-b border-slate-200 bg-white">
      <div className="container-x flex flex-col gap-6 py-7 xl:flex-row xl:items-center xl:gap-10 xl:py-8">
        {highlights.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="contents">
            {i > 0 && <Divider />}
            <div className="flex items-center gap-4 xl:flex-1">
              <Icon className="size-9 shrink-0 text-brand-teal" strokeWidth={1.5} aria-hidden />
              <p>
                <span className="block font-semibold text-brand-blue">{title}</span>
                <span className="mt-0.5 block text-sm">{text}</span>
              </p>
            </div>
          </div>
        ))}

        <Divider />

        <div className="xl:flex-[1.1]">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-brand-body uppercase">Health funds</h2>
          <ul className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 sm:gap-x-4 xl:gap-x-2 2xl:gap-x-4">
            {healthFunds.map((fund) => (
              // The source logos are square tiles with lots of white padding; a wide crop enlarges the artwork.
              <li key={fund.name} className="relative h-10 w-16 sm:h-14 sm:w-24 xl:h-12 xl:w-20 2xl:h-14 2xl:w-24">
                <Image src={fund.src} alt={fund.name} fill sizes="96px" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
