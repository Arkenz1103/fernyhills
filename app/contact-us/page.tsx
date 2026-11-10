import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { AreasWeService, BannerSection } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact us", alternates: { canonical: "/contact-us/" } };

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "170 Patricks Road, Ferny Hills QLD 4055",
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us in Ferny Hills"
        title="Let us know what we can do for you"
        image="/images/clinic-2.jpg"
        crumb="Contact"
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="heading">Let&apos;s talk</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
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
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                      <span className="block break-all font-semibold text-brand-ink group-hover:text-brand-blue">
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
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Address:</span>
                  <span className="block font-semibold text-brand-ink">{site.centreName}</span>
                  <span className="block text-slate-600">{site.address}</span>
                </span>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue to-brand-teal-bright text-white">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-semibold text-brand-ink">{site.hours}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 shadow-card-hover ring-1 ring-slate-100 sm:p-10">
              <ContactForm />
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-100">
              <iframe
                title={`Map to ${site.centreName}`}
                src={mapSrc}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16">
        <BannerSection
          heading="We use the best equipment for clients"
          cta={{ label: `Call ${site.phone}`, kind: "call" }}
          image="/images/equipment.jpg"
        />
      </div>

      <AreasWeService />
    </>
  );
}
