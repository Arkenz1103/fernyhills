import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import { About, ContactCta, ServiceAreas, Specialists } from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <Specialists />
      <ContactCta />
      <ServiceAreas />
    </>
  );
}
