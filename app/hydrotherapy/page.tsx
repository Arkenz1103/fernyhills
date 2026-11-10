import ContentPage, { pageMetadata } from "@/components/ContentPage";
import { hydrotherapy } from "@/lib/pages";

export const metadata = pageMetadata(hydrotherapy);

export default function Page() {
  return <ContentPage page={hydrotherapy} />;
}
