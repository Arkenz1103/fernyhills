import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ContactCta, ServiceAreas } from "@/components/HomeSections";
import { AreasWeService, PageBlocks } from "@/components/Sections";
import type { PageContent } from "@/lib/pages";

export function pageMetadata(page: PageContent): Metadata {
  return { title: page.title, alternates: { canonical: `/${page.slug}/` } };
}

/**
 * homeFooter: end the page with the homepage's Contact box and Areas We Service
 * (the page's own "cta" block supplies the Contact box sentence).
 */
export default function ContentPage({ page, homeFooter = false }: { page: PageContent; homeFooter?: boolean }) {
  const cta = page.blocks.find((b) => b.type === "cta");
  const blocks = homeFooter ? page.blocks.filter((b) => b.type !== "cta") : page.blocks;

  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} image={page.hero.image} />
      <PageBlocks blocks={blocks} />
      {homeFooter ? (
        <>
          <ContactCta text={cta?.paragraphs[0]} />
          <ServiceAreas />
        </>
      ) : (
        <AreasWeService />
      )}
    </>
  );
}
