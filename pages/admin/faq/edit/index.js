import FAQ from "../../../../components/Faq";
import { useRouter } from "next/router";

export default function Edit() {
  const { query } = useRouter();

  return <FAQ tourId={query.tourId} faqId={query.faqId}></FAQ>;
}
