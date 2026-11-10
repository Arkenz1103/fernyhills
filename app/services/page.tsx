import ContentPage, { pageMetadata } from "@/components/ContentPage";
import { services } from "@/lib/pages";

export const metadata = pageMetadata(services);

export default function Page() {
  return <ContentPage page={services} homeFooter />;
}
