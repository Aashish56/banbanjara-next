import FAQ from "../../../../components/Faq";
import { useRouter } from "next/router";

export default function Add() {
  // const router = useRouter()
  const { query } = useRouter();

  return <FAQ tourId={query.id}></FAQ>;
}
