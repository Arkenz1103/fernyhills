import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  image,
  imagePosition = "0% 31%",
}: {
  eyebrow: string;
  title: string;
  image: string;
  /** CSS object-position: which part of the photo stays in view as it crops */
  imagePosition?: string;
}) {
  return (
    <section className="hero relative isolate flex min-h-[300px] items-center overflow-hidden sm:min-h-[400px]">
      <Image src={image} alt="" fill priority unoptimized className="hero-media -z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      {/* Soft fade behind the text only; the rest of the photo stays light */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-ink/45 via-brand-ink/15 to-transparent" />
      <div className="hero-enter container-x py-16 [text-shadow:0_1px_12px_rgba(11,42,66,0.35)]">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <span aria-hidden className="hero-accent mt-6 block h-1 w-16 rounded-full bg-white/90" />
        <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white sm:text-xl">{eyebrow}</p>
      </div>
    </section>
  );
}
