import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { AreasWeService, PageBlocks } from "@/components/Sections";
import type { PageContent } from "@/lib/pages";

export function pageMetadata(page: PageContent): Metadata {
  return { title: page.title, alternates: { canonical: `/${page.slug}/` } };
}

export default function ContentPage({ page }: { page: PageContent }) {
  return (
    <>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} image={page.hero.image} crumb={page.title} />
      <PageBlocks blocks={page.blocks} />
      <AreasWeService />
    </>
  );
}
