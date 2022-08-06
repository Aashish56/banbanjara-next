import Home from "../../../../components/homePageForm";
import { useRouter } from "next/router";

export default function Edit() {
  const { query } = useRouter();

  return <Home homePageId={query.id}></Home>;
}
