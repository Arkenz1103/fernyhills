import ContentPage, { pageMetadata } from "@/components/ContentPage";
import { arthritis } from "@/lib/pages";

export const metadata = pageMetadata(arthritis);

export default function Page() {
  return <ContentPage page={arthritis} />;
}
