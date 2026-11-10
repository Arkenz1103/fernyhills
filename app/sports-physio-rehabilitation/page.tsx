import ContentPage, { pageMetadata } from "@/components/ContentPage";
import { sports } from "@/lib/pages";

export const metadata = pageMetadata(sports);

export default function Page() {
  return <ContentPage page={sports} />;
}
