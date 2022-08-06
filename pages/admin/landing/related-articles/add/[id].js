import RelatedArticles from "components/Landing/RelatedArticles/relatedArticles";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddThemes = (props) => {
  useEffect(() => {
    props.setTitle("Add Related Articles");
  }, []);
  const router = useRouter();
  return <RelatedArticles id={router.query.id} goBack={() => {}} />;
};

export default AddThemes;
