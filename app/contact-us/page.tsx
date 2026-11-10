import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { AreasWeService } from "@/components/Sections";
import { healthFunds, site } from "@/lib/site";
import { keepTogether } from "@/lib/utils";

export const metadata: Metadata = { title: "Contact us", alternates: { canonical: "/contact-us/" } };

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "170 Patricks Road, Ferny Hills QLD 4055",
)}&output=embed`;

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "170 Patricks Road, Ferny Hills QLD 4055",
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us in Ferny Hills"
        title="Let us know what we can do for you"
        image="/images/pages/contact-hero.webp"
        imagePosition="50% 62%"
      />

      <section className="pt-20 pb-12 sm:pt-24 sm:pb-14">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="heading">Let&apos;s talk</h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              If you have experienced any musculoskeletal problems and would like to increase your quality of life,
              don’t hesitate to make an appointment with one of our physiotherapists. Help is only a call away.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Phone, label: "Phone:", value: site.phone, href: site.phoneHref },
                { icon: Mail, label: "Email:", value: site.email, href: site.emailHref },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue to-brand-teal-bright text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-700">{label}</span>
                      <span className="block break-all text-lg font-semibold text-brand-ink group-hover:text-brand-blue">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue to-brand-teal-bright text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Address:</span>
                  <span className="block text-lg font-semibold text-brand-ink">{site.centreName}</span>
                  <span className="block text-lg text-slate-700">{site.address}</span>
                </span>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue to-brand-teal-bright text-white">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-lg font-semibold text-brand-ink">{keepTogether(site.hours)}</span>
              </li>
            </ul>
          </div>

          {/* Form card stretches to the bottom of the contact details beside it */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl bg-white p-6 shadow-card-hover ring-1 ring-slate-100 sm:p-10">
              <ContactForm />
            </div>
          </div>

          {/* Square map under the contact details */}
          <div className="aspect-square overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-100 lg:col-span-5 lg:-mt-4">
            <iframe
              title={`Map to ${site.centreName}`}
              src={mapSrc}
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Beside the map: quick ways to reach the clinic, and the health funds we accept */}
          <div className="flex flex-col justify-between gap-10 rounded-3xl bg-brand-light/60 p-6 ring-1 ring-slate-100 sm:p-10 lg:col-span-7 lg:-mt-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-brand-blue uppercase">Visit the clinic</p>
              <h2 className="heading mt-3">Find us in Ferny Hills</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                We&apos;re at <span className="font-semibold text-brand-ink">{site.address}</span>.{" "}
                {keepTogether(site.hours)}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Navigation className="h-4 w-4" aria-hidden />
                  Get directions
                </a>
                <a href={site.phoneHref} className="btn btn-outline">
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {site.phone}
                </a>
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Book online
                </a>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold tracking-[0.18em] text-brand-blue uppercase">Health funds we accept</p>
              <ul className="mt-4 grid grid-cols-4 gap-3 sm:gap-5">
                {healthFunds.map((fund) => (
                  <li key={fund.name} className="relative h-20 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 sm:h-24">
                    {/* Source logos are square tiles with lots of white padding: fit whole, then enlarge to trim it */}
                    <Image src={fund.src} alt={fund.name} fill sizes="160px" className="scale-[1.5] object-contain" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AreasWeService />
    </>
  );
}
