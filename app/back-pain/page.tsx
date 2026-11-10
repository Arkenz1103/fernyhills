import ContentPage, { pageMetadata } from "@/components/ContentPage";
import { backPain } from "@/lib/pages";

export const metadata = pageMetadata(backPain);

export default function Page() {
  return <ContentPage page={backPain} />;
}
