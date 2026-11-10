import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Clock, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { serviceAreas, site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

/** About block: image (with dotted backdrop and floating caption) on the left, copy on the right. */
export function About() {
  return (
    <section aria-labelledby="about-heading" className="bg-brand-pale py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div aria-hidden className="dot-grid absolute -top-6 -left-6 h-2/3 w-2/3 rounded-3xl" />
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/images/clinic-2.jpg"
              alt="A physiotherapist guiding a patient through a shoulder mobility exercise"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div className="glass absolute right-4 -bottom-6 left-4 flex items-center gap-4 rounded-2xl p-4 sm:right-auto sm:-bottom-8 sm:left-auto sm:-ml-6 sm:max-w-xs lg:-right-8 lg:left-auto">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal text-white">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <p className="text-sm leading-snug">
              <span className="block font-bold text-brand-ink">State-of-the-art equipment</span>
              Expert physiotherapists, one personalised plan
            </p>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <p className="eyebrow">About us</p>
          <h2 id="about-heading" className="mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            The best physio clinic in Ferny&nbsp;Hills
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-ink/85">
            At Ferny Hills Physiotherapy Centre, we have gained an outstanding reputation as the best physio clinic in
            Ferny Hill. This is because we only use state-of-the-art equipment and have expert physiotherapists.
          </p>
          <p className="mt-5 leading-relaxed">
            At our centre, we work with you to help you understand your condition or injury. Together, we will identify
            your therapy needs, assess your pain and develop a treatment plan with you to restore full function to your
            body. Additionally, we will provide you with tools, professional advice and a supplemental plan to help you
            prevent further problems.
          </p>
          <p className="mt-5 leading-relaxed">
            Our goal is to teach you how to carry out your treatment in the future to maintain your overall wellness.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Specialists block: copy on the left, photo on the right with a solid experience badge. */
export function Specialists() {
  return (
    <section aria-labelledby="specialists-heading" className="py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1">
          <p className="eyebrow">Our team</p>
          <h2 id="specialists-heading" className="mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            Our specialists
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-ink/85">
            Our long-established practice was purchased by Marcus Hood, a seasoned physiotherapist who built this clinic
            through his expertise in rehabilitation and private practice during his stay in America. He has added a
            highly qualified team of senior physiotherapists with 80 years of combined experience who share his passion
            for healing.
          </p>
          <p className="mt-5 leading-relaxed">
            This team is trained to treat a wide range of conditions in the Ferny Hill community and surrounding area.
            During the course of your treatment, you will work with one of these specialists to develop a personalised
            plan for you whilst we assist you in working toward your goal.
          </p>
          <p className="mt-5 leading-relaxed">
            Once your initial complaint is treated and pain is manageable again, we provide the tools necessary to
            maintain your healthy condition and prevent future issues.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:order-2 lg:max-w-none">
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/images/clinic-6.jpg"
              alt="A physiotherapist assessing a patient's knee and hip movement"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover object-[40%_50%]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 rounded-2xl bg-brand-blue px-6 py-5 text-white shadow-xl shadow-brand-blue/30 sm:-left-8 sm:py-6">
            <p className="text-5xl leading-none font-bold tracking-tight">80</p>
            <p className="mt-2 max-w-[9rem] text-sm leading-snug text-white/85">years of combined experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Deep-blue call to action with decorative orbit rings. */
export function ContactCta() {
  return (
    <section aria-labelledby="cta-heading" className="container-x pb-20 sm:pb-28">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-blue px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-32 size-[30rem] rounded-full border border-white/10" />
          <div className="absolute -top-24 -right-16 size-[22rem] rounded-full border border-white/10" />
          <div className="absolute -top-8 right-0 size-[14rem] rounded-full border border-white/15" />
          <div className="absolute -bottom-48 -left-24 size-[26rem] rounded-full bg-[radial-gradient(circle,rgb(22_139_180/0.45),transparent_70%)]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="cta-heading" className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl">
              Contact us today
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Whatever you are suffering from—whether it be illness, injury, disability or simply the effects of
              ageing—we want to increase your mobility and help you achieve lasting results. To consult with an expert
              physiotherapist in Ferny Hills, call us today.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact-us" className="btn btn-white">
                <Send className="size-4" aria-hidden />
                Send a message
              </Link>
            </div>
          </div>

          <dl className="space-y-5 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <div className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-white/70" aria-hidden />
              <div>
                <dt className="text-sm text-white/70">Call us</dt>
                <dd className="mt-0.5 text-2xl font-bold">
                  <a href={site.phoneHref} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4 border-t border-white/15 pt-5">
              <Clock className="mt-1 size-5 shrink-0 text-white/70" aria-hidden />
              <div>
                <dt className="text-sm text-white/70">Hours</dt>
                <dd className="mt-0.5 font-semibold">{keepTogether(site.hours)}</dd>
              </div>
            </div>
            <div className="flex gap-4 border-t border-white/15 pt-5">
              <MapPin className="mt-1 size-5 shrink-0 text-white/70" aria-hidden />
              <div>
                <dt className="text-sm text-white/70">Visit</dt>
                <dd className="mt-0.5 font-semibold">{site.address}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Collapsible list of suburbs the clinic services. */
export function ServiceAreas() {
  // The source list repeats some suburbs; show each once.
  const areas = serviceAreas.filter((a, i, all) => all.findIndex((b) => b.href === a.href) === i);

  return (
    <section aria-label="Service areas" className="pb-20 sm:pb-28">
      <div className="container-x">
        <details className="group rounded-2xl border border-slate-200/80 bg-white shadow-card open:shadow-card-hover">
          <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:px-8">
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-pale text-brand-cyan">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span className="text-lg font-bold text-brand-ink">Areas We Service</span>
            </span>
            <ChevronDown
              className="size-5 text-brand-blue transition-transform duration-300 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 border-t border-slate-100 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
            {areas.map((area) => (
              <li key={area.href}>
                <a
                  href={area.href}
                  className="flex items-center gap-2 rounded-lg py-1.5 text-[0.95rem] transition hover:text-brand-blue"
                >
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span className="sr-only">Physiotherapist in </span>
                  {area.name}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
