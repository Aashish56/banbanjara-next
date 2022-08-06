import Home from "../../../../components/homePageForm";
import { useRouter } from "next/router";

export default function View() {
  const { query } = useRouter();

  return <Home view={true} homePageId={query.id}></Home>;
}
