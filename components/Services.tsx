import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, Bone, PersonStanding, Waves, type LucideIcon } from "lucide-react";

type Service = {
  title: string;
  href: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

// Excerpts are quoted from each service page on the original site.
const services: Service[] = [
  {
    title: "Arthritis Treatment",
    href: "/arthritis-treatment",
    excerpt: "We want to put an end to the pain causing the struggle in your every-day tasks.",
    image: "/images/arthritis.jpg",
    imageAlt: "A physiotherapist treating a patient's arthritic joint",
    icon: Bone,
  },
  {
    title: "Sports Physio Rehabilitation",
    href: "/sports-physio-rehabilitation",
    excerpt:
      "Our staff can help you heal quickly, improve athletic performance and even prevent injuries before they even happen.",
    image: "/images/sports.jpg",
    imageAlt: "An athlete working through a rehabilitation exercise",
    icon: Activity,
  },
  {
    title: "Back Pain",
    href: "/back-pain",
    excerpt:
      "Physiotherapy for back pain is a less risky alternative to surgery and is often equally as effective.",
    image: "/images/back-pain.jpg",
    imageAlt: "A physiotherapist assessing a patient's lower back",
    icon: PersonStanding,
  },
  {
    title: "Hydrotherapy",
    href: "/hydrotherapy",
    excerpt: "Our hydrotherapy sessions can be tailored to your individual needs.",
    image: "/images/hydro-1.jpg",
    imageAlt: "A patient exercising in a hydrotherapy pool",
    icon: Waves,
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="pt-20 pb-8 sm:pt-24 sm:pb-12">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Our services</p>
            <h2 id="services-heading" className="mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              How We Can Help
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-cyan"
          >
            View all services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, href, excerpt, image, imageAlt, icon: Icon }, i) => (
            <li key={href} className="flex">
              <Link
                href={href}
                className="lift group relative flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold tracking-wider text-brand-blue backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon badge overlaps the image edge */}
                <div className="relative flex flex-1 flex-col px-6 pt-10 pb-6">
                  <span className="absolute -top-7 left-6 flex size-14 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/30 ring-4 ring-white transition-colors duration-300 group-hover:bg-brand-cyan">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="text-xl leading-snug font-bold">{title}</h3>
                  <p className="mt-3 flex-1 text-lg leading-relaxed">{excerpt}</p>
                  <span className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-brand-blue">
                    Learn more
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand-pale transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
