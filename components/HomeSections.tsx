import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone, Send } from "lucide-react";
import { serviceAreas, site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

/** About block: image (with dotted backdrop) on the left, copy on the right; on desktop the photo stretches to the copy's height so both columns line up top and bottom. */
export function About() {
  return (
    <section aria-labelledby="about-heading" className="bg-brand-pale py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div aria-hidden className="dot-grid absolute -top-6 -left-6 h-2/3 w-2/3 rounded-3xl" />
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-card lg:aspect-auto lg:h-full lg:min-h-[32rem]">
            <Image
              src="/images/about-trio.jpg"
              alt="A group of smiling older adults laughing together outdoors"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover object-[25%_45%]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:py-4">
          <p className="eyebrow">About us</p>
          <h2
            id="about-heading"
            className="mt-3 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-[50px]"
          >
            Physiotherapist in Ferny&nbsp;Hills
          </h2>
          <span aria-hidden className="mt-6 block h-1 w-14 rounded-full bg-brand-cyan" />

          <div className="mt-7 max-w-xl space-y-5 text-lg leading-[1.8] text-brand-body">
            <p className="text-lg leading-relaxed font-medium text-brand-ink">
              Have you ever had a stroke, joint injury or other condition that resulted in a loss of physical movement?
              If so, you were likely referred to a physiotherapy centre. A physiotherapy clinic is an establishment that
              aims to restore and maintain functional movement to their clients.
            </p>
            <p>
              At Ferny Hills Physiotherapy Centre, we have gained an outstanding reputation as the best physio clinic in
              Ferny Hill. This is because we only use the latest equipment and have expert physiotherapists.
            </p>
            <p>
              At our centre, we work with you to help you understand your condition or injury. Together, we will
              identify your therapy needs, assess your pain and develop a treatment plan with you to restore full
              function to your body. Additionally, we will provide you with tools, professional advice and a
              supplemental plan to help you prevent further problems.
            </p>
            <p className="border-l-4 border-brand-cyan pl-5 font-semibold text-brand-blue">
              Book a consultation today and take the first step towards moving freely again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Specialists block: copy on the left, photo on the right. */
export function Specialists() {
  return (
    <section aria-labelledby="specialists-heading" className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-20">
        <div className="flex flex-col justify-center lg:order-1 lg:py-4">
          <p className="eyebrow">Our team</p>
          <h2
            id="specialists-heading"
            className="mt-3 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-[50px]"
          >
            Our specialists
          </h2>
          <span aria-hidden className="mt-6 block h-1 w-14 rounded-full bg-brand-cyan" />

          <div className="mt-7 max-w-xl space-y-5 text-lg leading-[1.8] text-brand-body">
            <p className="text-lg leading-relaxed font-medium text-brand-ink">
              Our established practice was purchased by Marcus Hood, a seasoned physiotherapist who built this
              clinic through his expertise in rehabilitation and private practice during his stay in America. He has
              added a highly qualified team of senior physiotherapists with 80 years of combined experience who share
              his passion for healing.
            </p>
            <p>
              This team is trained to treat a wide range of conditions in the Ferny Hill community and surrounding area.
              During the course of your treatment, you will work with one of these specialists to develop a
              personalised plan for you whilst we assist you in working toward your goal.
            </p>
            <p>
              Once your initial complaint is treated and pain is manageable again, we provide the tools necessary to
              maintain your healthy condition and prevent future issues.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:order-2 lg:max-w-none">
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-card lg:aspect-auto lg:h-full lg:min-h-[32rem]">
            <Image
              src="/images/specialists.jpg"
              alt="A physiotherapist guiding a patient through a shoulder stretch"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultCtaText =
  "Whatever you are suffering from, whether it be illness, injury, disability or simply the effects of ageing, we want to increase your mobility and help you achieve lasting results. To consult with an expert physiotherapist in Ferny Hills, call us today.";

/** Deep-blue call to action with decorative orbit rings. Inner pages can pass their own sentence. */
export function ContactCta({ text = defaultCtaText }: { text?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="container-x pb-12 sm:pb-16">
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
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact-us" className="btn btn-white">
                <Send className="size-4" aria-hidden />
                Send a message
              </Link>
            </div>
          </div>

          <dl className="space-y-5 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <div className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-white/90" aria-hidden />
              <div>
                <dt className="text-sm text-white/90">Call us</dt>
                <dd className="mt-0.5 text-2xl font-bold">
                  <a href={site.phoneHref} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4 border-t border-white/15 pt-5">
              <Clock className="mt-1 size-5 shrink-0 text-white/90" aria-hidden />
              <div>
                <dt className="text-sm text-white/90">Hours</dt>
                <dd className="mt-0.5 text-lg font-semibold">{keepTogether(site.hours)}</dd>
              </div>
            </div>
            <div className="flex gap-4 border-t border-white/15 pt-5">
              <MapPin className="mt-1 size-5 shrink-0 text-white/90" aria-hidden />
              <div>
                <dt className="text-sm text-white/90">Visit</dt>
                <dd className="mt-0.5 text-lg font-semibold">{site.address}</dd>
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
    <section aria-labelledby="areas-heading" className="border-t border-slate-100 pt-12 pb-20 sm:pt-14 sm:pb-24">
      <div className="container-x text-center">
        <h2 id="areas-heading" className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Areas We Service
        </h2>
        <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-brand-cyan uppercase sm:text-sm">Physiotherapy</p>

        <ul className="reveal-group mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-2.5 sm:gap-3">
          {areas.map((area) => (
            <li key={area.href}>
              <a
                href={area.href}
                className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[0.95rem] text-brand-ink transition hover:border-brand-cyan hover:text-brand-blue"
              >
                <MapPin className="size-4 shrink-0 text-brand-cyan" aria-hidden />
                <span className="sr-only">Physiotherapist in </span>
                {area.name}
                <ArrowRight
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
